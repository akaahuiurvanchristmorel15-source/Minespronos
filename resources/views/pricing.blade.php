@extends('layouts.app')

@section('title', 'Tarifs & Crédits - Mines Vision')

@section('content')
<div class="p-8">
    <div class="mb-8">
        <h1 class="text-4xl font-bold text-white mb-2">Crédits & Tarifs</h1>
        <p class="text-zinc-400">Choisissez le plan qui vous convient</p>
    </div>

    <!-- Pricing Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <!-- Basic Plan -->
        <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-orange-500/50 transition-all">
            <h3 class="text-xl font-bold text-white mb-2">Découverte</h3>
            <p class="text-zinc-500 text-sm mb-6">Pour débuter</p>
            <div class="mb-6">
                <span class="text-4xl font-black text-white">500</span>
                <span class="text-orange-400 ml-2">FCFA</span>
            </div>
            <ul class="space-y-3 mb-8 text-sm text-zinc-300">
                <li class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    5 Utilisations
                </li>
                <li class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    Support basique
                </li>
            </ul>
            <button class="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-lg transition-all">
                Acheter
            </button>
        </div>

        <!-- Popular Plan -->
        <div class="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-2 border-orange-500 rounded-2xl p-8 relative overflow-hidden transform scale-105">
            <div class="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 rounded-bl-lg font-black text-xs uppercase">
                Populaire
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Pack Essentiel</h3>
            <p class="text-zinc-300 text-sm mb-6">Le plus choisi</p>
            <div class="mb-6">
                <span class="text-4xl font-black text-white">2000</span>
                <span class="text-orange-400 ml-2">FCFA</span>
            </div>
            <ul class="space-y-3 mb-8 text-sm text-zinc-200">
                <li class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    20 Utilisations
                </li>
                <li class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    Grille Interactive
                </li>
                <li class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    Support Premium
                </li>
            </ul>
            <button class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-orange-500/30">
                Acheter Maintenant
            </button>
        </div>

        <!-- Pro Plan -->
        <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-orange-500/50 transition-all">
            <h3 class="text-xl font-bold text-white mb-2">Premium</h3>
            <p class="text-zinc-500 text-sm mb-6">Pour les pro</p>
            <div class="mb-6">
                <span class="text-4xl font-black text-white">5000</span>
                <span class="text-orange-400 ml-2">FCFA</span>
            </div>
            <ul class="space-y-3 mb-8 text-sm text-zinc-300">
                <li class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    100 Utilisations
                </li>
                <li class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    Support 24/7
                </li>
                <li class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    VIP Status
                </li>
            </ul>
            <button class="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-lg transition-all">
                Acheter
            </button>
        </div>
    </div>

    <!-- 1win Promo -->
    <div class="bg-gradient-to-r from-[#111621] to-[#1a2130] border border-[#3476e1]/30 rounded-2xl p-8 mb-12">
        <div class="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
                <div class="flex items-center gap-2 mb-3">
                    <span class="text-[#3476e1] font-black text-2xl italic">1win</span>
                    <span class="bg-[#3476e1] text-white text-xs font-black px-3 py-1 rounded-md">PARTENAIRE</span>
                </div>
                <h3 class="text-2xl font-bold text-white mb-2">Bonus de Bienvenue +500%</h3>
                <p class="text-zinc-400">Inscrivez-vous sur 1win avec notre code promo pour recevoir un bonus massif sur votre premier dépôt.</p>
            </div>
            <div class="flex flex-col gap-3 text-center">
                <label class="text-[#3476e1] font-black text-xs uppercase">Code Promo</label>
                <div class="bg-[#0f1419] border-2 border-dashed border-[#3476e1]/50 rounded-lg px-6 py-4 flex items-center gap-4 cursor-pointer hover:border-[#3476e1] transition-all" onclick="copyPromo()">
                    <span class="text-2xl font-black text-white tracking-widest">ARGENT444</span>
                    <svg class="w-6 h-6 text-[#3476e1]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                </div>
            </div>
        </div>
    </div>

    <!-- FAQ Section -->
    <div class="max-w-2xl">
        <h2 class="text-2xl font-bold text-white mb-6">Questions Fréquentes</h2>
        <div class="space-y-4">
            <details class="bg-zinc-800 border border-zinc-700 rounded-lg p-4 group">
                <summary class="flex items-center justify-between cursor-pointer font-bold text-white">
                    Comment fonctionnent les crédits ?
                    <svg class="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                </summary>
                <p class="text-zinc-400 mt-3">Chaque prédiction consomme des crédits. Vous recevez un nombre de prédictions selon le pack choisi. Les crédits ne sont pas remboursables.</p>
            </details>

            <details class="bg-zinc-800 border border-zinc-700 rounded-lg p-4 group">
                <summary class="flex items-center justify-between cursor-pointer font-bold text-white">
                    Peut-on demander un remboursement ?
                    <svg class="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                </summary>
                <p class="text-zinc-400 mt-3">Les crédits sont définitifs et non remboursables. Cependant, contactez notre support pour les problèmes techniques.</p>
            </details>

            <details class="bg-zinc-800 border border-zinc-700 rounded-lg p-4 group">
                <summary class="flex items-center justify-between cursor-pointer font-bold text-white">
                    Quels sont les modes de paiement ?
                    <svg class="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                </summary>
                <p class="text-zinc-400 mt-3">Nous acceptons les paiements via Mobile Money (Orange Money, Moov, Airtel Money) et les cartes bancaires.</p>
            </details>
        </div>
    </div>
</div>

<script>
    function copyPromo() {
        navigator.clipboard.writeText('ARGENT444').then(() => {
            alert('Code copié !');
        });
    }
</script>
@endsection
