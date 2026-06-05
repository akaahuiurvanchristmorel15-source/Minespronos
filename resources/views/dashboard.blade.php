@extends('layouts.app')

@section('title', 'Dashboard - Mines Vision')

@section('content')
<div class="p-8">
    <div class="mb-8">
        <h1 class="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p class="text-zinc-400">Générez vos prédictions Mines</p>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <!-- Prediction Section -->
        <div class="lg:col-span-2">
            <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <h2 class="text-2xl font-bold text-white mb-6">Générateur de Prédictions</h2>
                
                <!-- Grid Section -->
                <div class="mb-8 relative bg-zinc-800/50 rounded-xl p-6 min-h-[300px] flex items-center justify-center">
                    <div id="minesGrid" class="grid grid-cols-3 gap-2 w-full max-w-[300px]">
                        @for ($i = 0; $i < 9; $i++)
                            <button class="mine-cell aspect-square bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-lg border-2 border-zinc-600 hover:border-orange-500 hover:from-zinc-600 hover:to-zinc-700 transition-all font-bold text-2xl text-white cursor-pointer" data-index="{{ $i }}">
                                {{ $i + 1 }}
                            </button>
                        @endfor
                    </div>
                </div>

                <!-- Controls -->
                <div class="space-y-4 mb-6">
                    <div>
                        <label class="block text-sm font-semibold text-zinc-300 mb-2">Nombre de Mines</label>
                        <input type="range" id="minesCount" min="1" max="7" value="2" class="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-orange-500">
                        <div class="flex justify-between text-xs text-zinc-500 mt-1">
                            <span>1</span>
                            <span id="minesValue" class="text-orange-400 font-bold">2 Mines</span>
                            <span>7</span>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-zinc-300 mb-2">Montant du Pari</label>
                        <div class="flex gap-2">
                            <input type="number" id="betAmount" placeholder="1000" class="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none">
                            <span class="flex items-center text-zinc-400 font-semibold">FCFA</span>
                        </div>
                    </div>

                    <button id="generateBtn" class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-orange-500/30">
                        Générer Prédiction
                    </button>
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-3 gap-4 text-center">
                    <div class="bg-zinc-800/50 rounded-lg p-4">
                        <p class="text-zinc-500 text-xs uppercase mb-1">Confiance</p>
                        <p id="confidenceValue" class="text-2xl font-bold text-orange-400">--</p>
                    </div>
                    <div class="bg-zinc-800/50 rounded-lg p-4">
                        <p class="text-zinc-500 text-xs uppercase mb-1">Gain Potentiel</p>
                        <p id="gainValue" class="text-2xl font-bold text-emerald-400">--</p>
                    </div>
                    <div class="bg-zinc-800/50 rounded-lg p-4">
                        <p class="text-zinc-500 text-xs uppercase mb-1">État</p>
                        <p id="statusValue" class="text-2xl font-bold text-zinc-400">PRÊT</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
            <!-- Credits Balance -->
            <div class="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-2xl p-6">
                <p class="text-zinc-300 text-sm mb-2">Solde de Crédits</p>
                <p class="text-5xl font-black text-orange-400">{{ auth()->user()?->credits ?? 0 }}</p>
                <a href="{{ route('pricing') }}" class="mt-4 w-full block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg text-center transition-all text-sm">
                    Acheter Crédits
                </a>
            </div>

            <!-- Account Info -->
            <div class="bg-zinc-800 border border-zinc-700 rounded-2xl p-6">
                <h3 class="text-lg font-bold text-white mb-4">Mon Compte</h3>
                <div class="space-y-3 text-sm">
                    <div>
                        <p class="text-zinc-500 mb-1">Nom</p>
                        <p class="text-white font-semibold">{{ auth()->user()?->name }}</p>
                    </div>
                    <div>
                        <p class="text-zinc-500 mb-1">Email</p>
                        <p class="text-white font-semibold">{{ auth()->user()?->email }}</p>
                    </div>
                    <div>
                        <p class="text-zinc-500 mb-1">ID 1win</p>
                        <p class="text-white font-semibold">{{ auth()->user()?->onewin_id ?? 'Non lié' }}</p>
                    </div>
                </div>

                @if(!auth()->user()?->onewin_id)
                <button onclick="document.getElementById('linkModal').showModal()" class="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-all text-sm">
                    Lier ID 1win
                </button>
                @endif
            </div>

            <!-- Recent Predictions -->
            <div class="bg-zinc-800 border border-zinc-700 rounded-2xl p-6">
                <h3 class="text-lg font-bold text-white mb-4">Prédictions Récentes</h3>
                <div class="space-y-2 max-h-[300px] overflow-y-auto">
                    @forelse($predictions ?? [] as $prediction)
                        <div class="bg-zinc-700/50 rounded-lg p-3 text-sm">
                            <div class="flex justify-between items-start">
                                <div>
                                    <p class="text-zinc-200 font-semibold">{{ $prediction->mines_count }} Mines</p>
                                    <p class="text-zinc-500 text-xs">{{ $prediction->created_at?->format('d M H:i') }}</p>
                                </div>
                                <span class="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs font-bold">
                                    @if($prediction->confidence)
                                        {{ $prediction->confidence }}%
                                    @else
                                        -
                                    @endif
                                </span>
                            </div>
                        </div>
                    @empty
                        <p class="text-zinc-500 text-sm text-center py-4">Aucune prédiction</p>
                    @endforelse
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Link 1win Modal -->
<dialog id="linkModal" class="rounded-lg backdrop:bg-black/50">
    <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md">
        <h2 class="text-2xl font-bold text-white mb-4">Lier votre ID 1win</h2>
        <p class="text-zinc-400 mb-6">Entrez votre ID 1win pour activer les prédictions améliorées.</p>
        
        <form id="linkForm" method="POST" onsubmit="linkOneWin(event)" class="space-y-4">
            @csrf
            <input type="text" id="onewinIdInput" name="onewin_id" placeholder="Votre ID 1win" required class="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none">
            
            <div class="flex gap-3">
                <button type="button" onclick="document.getElementById('linkModal').close()" class="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-2 rounded-lg transition-all">
                    Annuler
                </button>
                <button type="submit" class="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition-all">
                    Lier
                </button>
            </div>
        </form>
    </div>
</dialog>

<script>
    // Mines count slider
    document.getElementById('minesCount').addEventListener('input', function() {
        document.getElementById('minesValue').textContent = this.value + ' Mines';
    });

    // Link 1win function
    async function linkOneWin(event) {
        event.preventDefault();
        const onewinId = document.getElementById('onewinIdInput').value;

        if (!onewinId) {
            alert('Veuillez entrer un ID 1win');
            return;
        }

        try {
            const response = await fetch('/api/user/link-1win', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || 
                                   document.querySelector('input[name="_token"]')?.value || ''
                },
                body: JSON.stringify({ onewin_id: onewinId })
            });

            const data = await response.json();

            if (response.ok) {
                alert('ID 1win lié avec succès !');
                document.getElementById('linkModal').close();
                location.reload();
            } else {
                alert(data.message || 'Erreur lors de la liaison');
            }
        } catch (error) {
            alert('Erreur: ' + error.message);
        }
    }

    // Generate prediction
    document.getElementById('generateBtn').addEventListener('click', async function() {
        const minesCount = document.getElementById('minesCount').value;
        const betAmount = document.getElementById('betAmount').value;

        if (!betAmount) {
            alert('Veuillez entrer un montant de pari');
            return;
        }

        this.disabled = true;
        this.textContent = 'Génération...';

        try {
            const response = await fetch('/api/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content || 
                                   document.querySelector('input[name="_token"]')?.value || ''
                },
                body: JSON.stringify({
                    mines_count: minesCount,
                    bet_amount: betAmount
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                document.getElementById('confidenceValue').textContent = data.confidence + '%';
                document.getElementById('gainValue').textContent = Math.round(data.potential_gain || 0) + ' FCFA';
                document.getElementById('statusValue').textContent = 'GÉNÉRÉE';

                // Highlight safe cells
                const cells = document.querySelectorAll('.mine-cell');
                cells.forEach((cell) => {
                    cell.classList.remove('bg-emerald-500/30', 'border-emerald-500');
                });
                
                data.pattern.forEach((index) => {
                    const cell = document.querySelector(`[data-index="${index}"]`);
                    if (cell) {
                        cell.classList.add('bg-emerald-500/30', 'border-emerald-500');
                    }
                });
            } else {
                alert(data.message || data.error || 'Erreur lors de la génération');
            }
        } catch (error) {
            alert('Erreur: ' + error.message);
        } finally {
            this.disabled = false;
            this.textContent = 'Générer Prédiction';
        }
    });
</script>
@endsection
