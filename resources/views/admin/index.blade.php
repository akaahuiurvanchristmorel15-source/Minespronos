@extends('layouts.app')

@section('title', 'Admin Panel - Mines Vision')

@section('content')
<div class="p-8">
    <div class="mb-8">
        <h1 class="text-4xl font-bold text-white mb-2">Panel Administrateur</h1>
        <p class="text-zinc-400">Gérez les utilisateurs et le système</p>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <p class="text-zinc-400 text-sm mb-2">Total Utilisateurs</p>
            <p class="text-4xl font-bold text-white">{{ $totalUsers ?? 0 }}</p>
        </div>
        <div class="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <p class="text-zinc-400 text-sm mb-2">Utilisateurs Actifs</p>
            <p class="text-4xl font-bold text-emerald-400">{{ $activeUsers ?? 0 }}</p>
        </div>
        <div class="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <p class="text-zinc-400 text-sm mb-2">Administrateurs</p>
            <p class="text-4xl font-bold text-orange-400">{{ $adminCount ?? 0 }}</p>
        </div>
        <div class="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <p class="text-zinc-400 text-sm mb-2">Utilisateurs VIP</p>
            <p class="text-4xl font-bold text-purple-400">{{ $vipUsers ?? 0 }}</p>
        </div>
    </div>

    <!-- Users Management -->
    <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-white">Utilisateurs</h2>
            <button onclick="document.getElementById('addUserModal').showModal()" class="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-lg transition-all">
                + Ajouter Utilisateur
            </button>
        </div>

        <!-- Users Table -->
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead>
                    <tr class="border-b border-zinc-700">
                        <th class="text-left py-3 px-4 text-zinc-300 font-semibold">Utilisateur</th>
                        <th class="text-left py-3 px-4 text-zinc-300 font-semibold">Email</th>
                        <th class="text-left py-3 px-4 text-zinc-300 font-semibold">Crédits</th>
                        <th class="text-left py-3 px-4 text-zinc-300 font-semibold">Statut</th>
                        <th class="text-left py-3 px-4 text-zinc-300 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($users ?? [] as $user)
                    <tr class="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                        <td class="py-4 px-4 text-white">
                            <div>
                                <p class="font-semibold">{{ $user->name }}</p>
                                @if($user->is_admin)
                                <span class="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">Admin</span>
                                @endif
                            </div>
                        </td>
                        <td class="py-4 px-4 text-zinc-300">{{ $user->email }}</td>
                        <td class="py-4 px-4">
                            <span class="text-emerald-400 font-bold">{{ $user->credits ?? 0 }}</span>
                        </td>
                        <td class="py-4 px-4">
                            <span class="px-3 py-1 rounded-full text-xs font-bold {{ $user->is_active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400' }}">
                                {{ $user->is_active ? 'Actif' : 'Inactif' }}
                            </span>
                        </td>
                        <td class="py-4 px-4 text-sm">
                            <div class="flex gap-2">
                                <button onclick="openEditModal({{ $user->id }})" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-all">
                                    Éditer
                                </button>
                                <form method="POST" action="{{ route('admin.toggleActive', $user->id) }}" style="display:inline;">
                                    @csrf
                                    <button type="submit" class="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-xs transition-all">
                                        {{ $user->is_active ? 'Désactiver' : 'Activer' }}
                                    </button>
                                </form>
                                <form method="POST" action="{{ route('admin.toggleAdmin', $user->id) }}" style="display:inline;">
                                    @csrf
                                    <button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs transition-all">
                                        {{ $user->is_admin ? 'User' : 'Admin' }}
                                    </button>
                                </form>
                                <form method="POST" action="{{ route('admin.deleteUser', $user->id) }}" onsubmit="return confirm('Êtes-vous sûr ?')" style="display:inline;">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-all">
                                        Supprimer
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="5" class="py-8 text-center text-zinc-400">Aucun utilisateur</td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Add User Modal -->
<dialog id="addUserModal" class="rounded-lg backdrop:bg-black/50">
    <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md">
        <h2 class="text-2xl font-bold text-white mb-4">Ajouter Utilisateur</h2>
        
        <form method="POST" action="{{ route('admin.createUser') }}" class="space-y-4">
            @csrf
            <input type="text" name="name" placeholder="Nom" required class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none">
            <input type="email" name="email" placeholder="Email" required class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none">
            <input type="password" name="password" placeholder="Mot de passe" required class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none">
            <input type="number" name="credit_balance" placeholder="Crédits" value="0" class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none">
            
            <div class="flex gap-3">
                <button type="button" onclick="document.getElementById('addUserModal').close()" class="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-2 rounded-lg transition-all">
                    Annuler
                </button>
                <button type="submit" class="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition-all">
                    Ajouter
                </button>
            </div>
        </form>
    </div>
</dialog>

<!-- Edit User Modal -->
<dialog id="editUserModal" class="rounded-lg backdrop:bg-black/50">
    <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md">
        <h2 class="text-2xl font-bold text-white mb-4">Éditer Utilisateur</h2>
        
        <form id="editForm" method="POST" class="space-y-4">
            @csrf
            @method('PUT')
            <input type="text" name="name" placeholder="Nom" required class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none">
            <input type="email" name="email" placeholder="Email" required class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none">
            <input type="number" name="credit_balance" placeholder="Crédits" class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none">
            
            <div class="flex gap-3">
                <button type="button" onclick="document.getElementById('editUserModal').close()" class="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-2 rounded-lg transition-all">
                    Annuler
                </button>
                <button type="submit" class="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition-all">
                    Sauvegarder
                </button>
            </div>
        </form>
    </div>
</dialog>

<script>
    function openEditModal(userId) {
        const form = document.getElementById('editForm');
        form.action = '/admin/users/' + userId;
        document.getElementById('editUserModal').showModal();
    }
</script>
@endsection
