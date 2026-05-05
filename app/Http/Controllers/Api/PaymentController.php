<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Payment;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    public function initiate(Request $request)
    {
        $request->validate([
            'plan' => 'required|string',
            'amount' => 'required|numeric'
        ]);

        $user = $request->user();
        
        $prefix = str_starts_with($request->plan, 'vip') ? 'VIP-' : 'CRED-';
        
        $payment = $user->payments()->create([
            'amount' => $request->amount,
            'status' => 'pending',
            'transaction_ref' => $prefix . strtoupper(Str::random(10)),
        ]);

        // Ici, on appellerait l'API CinetPay/FedaPay et on retournerait l'URL de paiement
        return response()->json([
            'success' => true,
            'payment_url' => '/mock-payment/' . $payment->transaction_ref, // Placeholder
            'transaction_ref' => $payment->transaction_ref
        ]);
    }

    public function webhook(Request $request)
    {
        // Exemple basique de webhook
        $transactionRef = $request->input('transaction_ref');
        $status = $request->input('status'); // ex: 'success'

        $payment = Payment::where('transaction_ref', $transactionRef)->first();

        if ($payment && $payment->status === 'pending' && $status === 'success') {
            $payment->update(['status' => 'success']);
            
            $user = $payment->user;

            if (str_starts_with($transactionRef, 'VIP-')) {
                // Déterminer la durée en fonction du montant ou du plan
                $days = 7; // Par défaut hebdo
                if ($payment->amount == 15000) $days = 30;
                if ($payment->amount == 40000) $days = 90;
                
                // Prolonger ou initier
                $newExpiry = $user->isVip() 
                    ? clone $user->vip_expires_at->addDays($days) 
                    : now()->addDays($days);
                
                $user->update(['vip_expires_at' => $newExpiry]);
            } else {
                // Créditer l'utilisateur (+20 pour standard, +60 pour max)
                $credits = $payment->amount == 5000 ? 60 : 20;
                $user->increment('credits', $credits);
            }
            
            return response()->json(['status' => 'ok']);
        }

        return response()->json(['status' => 'ignored']);
    }
}
