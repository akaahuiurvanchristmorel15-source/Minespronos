<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    public function index()
    {
        $connectedUsers = DB::table('sessions')
            ->whereNotNull('user_id')
            ->where('last_activity', '>=', now()->subMinutes(5)->timestamp)
            ->distinct('user_id')
            ->count('user_id');

        $totalUsers = User::count();
        $totalCreditsDistributed = User::sum('credits');
        $vipUsers = User::whereNotNull('vip_expires_at')
            ->where('vip_expires_at', '>', now())
            ->count();

        $payments = Payment::with('user')
            ->orderBy('created_at', 'desc')
            ->take(50)
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'user_name' => $p->user?->name ?? 'Inconnu',
                'user_email' => $p->user?->account_number ?? '—',
                'amount' => $p->amount,
                'plan' => $p->plan ?? $p->transaction_ref ?? '—',
                'status' => $p->status,
                'date' => $p->created_at->format('d/m/Y H:i'),
            ]);

        $users = User::orderBy('created_at', 'desc')
            ->get()
            ->map(fn($u) => [
                'id' => $u->id,
                'name' => $u->name,
                'account_number' => $u->account_number,
                'credits' => $u->credits,
                'is_vip' => $u->isVip(),
                'vip_expires_at' => $u->vip_expires_at?->format('d/m/Y'),
                'is_admin' => $u->is_admin,
                'plain_password' => $u->plain_password,
                'joined' => $u->created_at->format('d/m/Y'),
            ]);

        return inertia('admin', [
            'stats' => [
                'connected_users' => $connectedUsers,
                'total_users' => $totalUsers,
                'vip_users' => $vipUsers,
                'total_credits' => $totalCreditsDistributed,
            ],
            'payments' => $payments,
            'users' => $users,
        ]);
    }

    public function createUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'credits' => 'nullable|integer|min:0',
            'is_admin' => 'nullable|boolean',
            'vip_days' => 'nullable|integer|min:1|max:365',
        ]);

        // Générer numéro de compte unique (12 chiffres)
        $accountNumber = User::generateAccountNumber();

        // Générer un mot de passe aléatoire sécurisé de 8 caractères
        $plainPassword = strtoupper(Str::random(4)) . random_int(1000, 9999);

        $user = User::create([
            'name' => $request->name,
            'account_number' => $accountNumber,
            'password' => Hash::make($plainPassword),
            'plain_password' => $plainPassword,
            'credits' => $request->credits ?? 0,
            'is_admin' => $request->boolean('is_admin', false),
            'vip_expires_at' => $request->vip_days
                ? now()->addDays((int) $request->vip_days)
                : null,
        ]);

        // Retourner le mot de passe en clair UNE SEULE FOIS via flash
        return back()->with([
            'success' => "Compte créé avec succès.",
            'new_account' => [
                'name' => $user->name,
                'account_number' => $accountNumber,
                'password' => $plainPassword,
            ],
        ]);
    }

    public function updateUser(int $id, Request $request)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'credits' => 'nullable|integer|min:0',
            'is_admin' => 'nullable|boolean',
            'vip_days' => 'nullable|integer|min:0|max:365',
            'reset_password' => 'nullable|boolean',
        ]);

        $data = [
            'name' => $request->name,
            'credits' => $request->credits ?? $user->credits,
            'is_admin' => $request->boolean('is_admin', false),
        ];

        $newPassword = null;
        if ($request->boolean('reset_password')) {
            $newPassword = strtoupper(Str::random(4)) . random_int(1000, 9999);
            $data['password'] = Hash::make($newPassword);
            $data['plain_password'] = $newPassword;
        }

        if ($request->filled('vip_days')) {
            $days = (int) $request->vip_days;
            $data['vip_expires_at'] = $days > 0 ? now()->addDays($days) : null;
        }

        $user->update($data);

        $flash = ['success' => "Compte \"{$user->name}\" mis à jour."];
        if ($newPassword) {
            $flash['new_account'] = [
                'name' => $user->name,
                'account_number' => $user->account_number,
                'password' => $newPassword,
            ];
        }

        return back()->with($flash);
    }

    public function deleteUser(int $id, Request $request)
    {
        $user = User::findOrFail($id);

        if ($user->id === $request->user()->id) {
            return back()->with('error', 'Vous ne pouvez pas supprimer votre propre compte.');
        }

        $user->delete();

        return back()->with('success', "Utilisateur {$user->name} supprimé.");
    }

    public function toggleAdmin(int $id, Request $request)
    {
        $user = User::findOrFail($id);
        if ($user->id === $request->user()->id) {
            return back();
        }
        $user->update(['is_admin' => !$user->is_admin]);
        return back();
    }
}
