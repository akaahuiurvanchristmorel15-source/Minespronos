@extends('layouts.main')

@section('title', 'Mines Vision - Analyse Prédictive')

@section('content')
<div class="bg-[#FFFDFB] text-stone-800 selection:bg-orange-200 selection:text-orange-900 min-h-screen">
    <!-- Header -->
    <nav class="fixed top-0 w-full z-50 border-b border-orange-100 bg-white/70 backdrop-blur-xl">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-black text-white shadow-lg shadow-orange-200">M</div>
                <span class="text-xl font-bold tracking-tighter uppercase text-stone-800">Mines <span class="text-orange-500">Vision</span></span>
            </div>
            <div class="hidden md:flex items-center gap-8 text-sm font-semibold text-stone-500">
                <a href="#features" class="hover:text-orange-600 transition-colors">Fonctionnalités</a>
                <a href="#pricing" class="hover:text-orange-600 transition-colors">Tarifs</a>
                <a href="#" class="hover:text-orange-600 transition-colors">Aide</a>
            </div>
            <div class="flex items-center gap-4">
                @auth
                    <a href="{{ route('dashboard') }}" class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md shadow-orange-100">
                        Dashboard
                    </a>
                @else
                    <a href="{{ route('login') }}" class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md shadow-orange-100">
                        Se connecter
                    </a>
                @endauth
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-gradient-to-b from-orange-50/50 to-transparent pt-20">
        <div class="text-center z-10">
            <h1 class="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-stone-900 leading-[0.9]">
                DOMINEZ LE <br /> <span class="text-orange-500">TERRAIN.</span>
            </h1>
            <p class="text-stone-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
                Visualisez les probabilités comme jamais auparavant. Une interface claire pour des décisions brillantes.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                @auth
                    <a href="{{ route('dashboard') }}" class="bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-10 rounded-2xl transition-all flex items-center justify-center gap-2 group text-lg shadow-xl shadow-orange-500/20">
                        Aller au Dashboard
                        <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    </a>
                @else
                    <a href="{{ route('login') }}" class="bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-10 rounded-2xl transition-all flex items-center justify-center gap-2 group text-lg shadow-xl shadow-orange-500/20">
                        Se connecter
                        <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    </a>
                @endauth
                <a href="#pricing" class="bg-white border border-orange-200 hover:bg-orange-50 text-stone-700 py-4 px-10 rounded-2xl font-bold transition-all shadow-sm flex items-center justify-center">
                    Tarifs & Crédits
                </a>
            </div>
        </div>

        <!-- Effets de lumière -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-200/20 blur-[120px] rounded-full pointer-events-none" />

        <div class="absolute bottom-10 text-orange-300 animate-bounce">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-32 px-6 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Feature 1 -->
            <div class="p-10 rounded-[32px] bg-white border border-stone-100 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/5 transition-all group">
                <div class="mb-6 p-4 bg-orange-50 text-orange-500 w-fit rounded-2xl group-hover:scale-110 transition-transform">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 class="text-2xl font-bold mb-4 text-stone-900">Analyse Live</h3>
                <p class="text-stone-500 leading-relaxed font-medium">Des prédictions basées sur des algorithmes de probabilités chauds.</p>
            </div>

            <!-- Feature 2 -->
            <div class="p-10 rounded-[32px] bg-white border border-stone-100 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/5 transition-all group">
                <div class="mb-6 p-4 bg-orange-50 text-orange-500 w-fit rounded-2xl group-hover:scale-110 transition-transform">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m7.5-3.5a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 class="text-2xl font-bold mb-4 text-stone-900">Transactions Safe</h3>
                <p class="text-stone-500 leading-relaxed font-medium">Paiements sécurisés via Mobile Money sans tracas.</p>
            </div>

            <!-- Feature 3 -->
            <div class="p-10 rounded-[32px] bg-white border border-stone-100 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/5 transition-all group">
                <div class="mb-6 p-4 bg-orange-50 text-orange-500 w-fit rounded-2xl group-hover:scale-110 transition-transform">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                </div>
                <h3 class="text-2xl font-bold mb-4 text-stone-900">Design Épuré</h3>
                <p class="text-stone-500 leading-relaxed font-medium">Une interface claire pensée pour le confort visuel prolongé.</p>
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-32 px-6 bg-stone-50/50">
        <div class="max-w-xl mx-auto text-center">
            <div class="p-12 rounded-[48px] border-2 border-orange-500 bg-white shadow-2xl shadow-orange-500/10 relative overflow-hidden">
                <div class="absolute top-0 right-0 bg-orange-500 text-white px-6 py-2 rounded-bl-2xl font-black text-xs uppercase">
                    Plus Populaire
                </div>
                <h2 class="text-xl font-bold mb-6 text-stone-500 uppercase tracking-widest">Pack Essentiel</h2>
                <div class="flex items-baseline justify-center gap-2 mb-10">
                    <span class="text-7xl font-black text-stone-900">2000</span>
                    <span class="text-2xl font-bold text-orange-500">FCFA</span>
                </div>

                <ul class="text-left space-y-4 mb-10 max-w-[240px] mx-auto">
                    <li class="flex items-center gap-3 text-stone-600 font-bold">
                        <svg class="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L5.707 10.707a1 1 0 01-1.414-1.414l6-6z" clip-rule="evenodd"></path></svg>
                        20 Utilisations
                    </li>
                    <li class="flex items-center gap-3 text-stone-600 font-bold">
                        <svg class="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L5.707 10.707a1 1 0 01-1.414-1.414l6-6z" clip-rule="evenodd"></path></svg>
                        Grille Interactive
                    </li>
                    <li class="flex items-center gap-3 text-stone-600 font-bold">
                        <svg class="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L5.707 10.707a1 1 0 01-1.414-1.414l6-6z" clip-rule="evenodd"></path></svg>
                        Support Premium
                    </li>
                </ul>

                @auth
                    <a href="{{ route('dashboard') }}" class="w-full bg-orange-500 text-white font-black py-5 rounded-2xl hover:bg-orange-600 transition-all text-lg shadow-lg shadow-orange-500/30 inline-block text-center mt-6">
                        COMMENCER MAINTENANT
                    </a>
                @else
                    <a href="{{ route('login') }}" class="w-full bg-orange-500 text-white font-black py-5 rounded-2xl hover:bg-orange-600 transition-all text-lg shadow-lg shadow-orange-500/30 inline-block text-center mt-6">
                        SE CONNECTER MAINTENANT
                    </a>
                @endauth
            </div>

            <!-- 1win Promo Block -->
            <div class="mt-12 p-1 rounded-[32px] bg-[#111621] border border-[#3476e1]/30 shadow-[0_0_40px_rgba(52,118,225,0.1)] overflow-hidden relative group">
                <div class="absolute top-0 right-0 p-4">
                    <div class="w-12 h-12 bg-[#3476e1]/10 rounded-full flex items-center justify-center">
                        <svg class="text-[#3476e1] w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                </div>

                <div class="p-8 text-center sm:text-left sm:flex items-center justify-between gap-6">
                    <div class="mb-6 sm:mb-0">
                        <div class="flex items-center gap-2 mb-2 justify-center sm:justify-start">
                            <span class="text-[#3476e1] font-black text-2xl tracking-tighter italic">1win</span>
                            <span class="bg-[#3476e1] text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase">Partner</span>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">Bonus Spécial +500%</h3>
                        <p class="text-zinc-500 text-sm max-w-xs mx-auto sm:mx-0">Utilisez ce code lors de votre inscription sur 1win pour booster vos dépôts.</p>
                    </div>

                    <div class="flex flex-col gap-3 min-w-[200px]">
                        <label class="text-[10px] font-black uppercase tracking-[0.2em] text-[#3476e1] text-center">Code Promo</label>
                        <div id="promoCode" class="relative cursor-pointer group/code bg-[#1a2130] border-2 border-dashed border-[#3476e1]/50 rounded-2xl p-4 flex items-center justify-between hover:border-[#3476e1] transition-all">
                            <span class="text-2xl font-black text-white tracking-widest leading-none">ARGENT444</span>
                            <svg class="copyIcon text-[#3476e1] w-5 h-5 group-hover/code:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                            <svg class="checkIcon hidden text-emerald-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                        </div>
                    </div>
                </div>

                <!-- Gloss effect -->
                <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-stone-50 border-t border-orange-100 pt-20 pb-10 px-6">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div>
                    <div class="flex items-center gap-2 mb-6">
                        <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-black text-white">M</div>
                        <span class="text-xl font-bold tracking-tighter uppercase text-stone-800">Mines Vision</span>
                    </div>
                    <p class="text-stone-500 text-sm leading-relaxed">
                        L'analyse prédictive nouvelle génération. Simple, clair et performant pour vos sessions de jeu.
                    </p>
                </div>
                <div>
                    <h4 class="text-stone-800 font-bold mb-6 uppercase text-xs tracking-widest">Navigation</h4>
                    <ul class="space-y-4 text-sm text-stone-500 font-medium">
                        <li><a href="#" class="hover:text-orange-600 transition-colors">Dashboard</a></li>
                        <li><a href="#" class="hover:text-orange-600 transition-colors">Historique</a></li>
                        <li><a href="#" class="hover:text-orange-600 transition-colors">Affiliation</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-stone-800 font-bold mb-6 uppercase text-xs tracking-widest">Légal</h4>
                    <ul class="space-y-4 text-sm text-stone-500 font-medium">
                        <li><a href="#" class="hover:text-orange-600">Conditions</a></li>
                        <li><a href="#" class="hover:text-orange-600">Confidentialité</a></li>
                        <li><a href="#" class="hover:text-orange-600 flex items-center gap-2">Statut <div class="w-2 h-2 bg-green-500 rounded-full" /></a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-stone-800 font-bold mb-6 uppercase text-xs tracking-widest">Newsletter</h4>
                    <div class="relative">
                        <input type="email" placeholder="Email" class="w-full bg-white border border-orange-100 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none" />
                        <button class="absolute right-2 top-2 p-1.5 bg-orange-500 text-white rounded-lg shadow-sm">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="pt-8 border-t border-orange-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <p class="text-stone-400 text-[10px] uppercase tracking-widest text-center md:text-left">
                    Jouez de manière responsable. Mines Vision est un simulateur statistique.
                </p>
                <div class="text-stone-400 text-xs font-medium">© 2026 Mines Vision. Fait avec passion.</div>
            </div>
        </div>
    </footer>
</div>

<script>
    document.getElementById('promoCode').addEventListener('click', function() {
        const code = 'ARGENT444';
        navigator.clipboard.writeText(code).then(() => {
            const copyIcon = this.querySelector('.copyIcon');
            const checkIcon = this.querySelector('.checkIcon');
            copyIcon.classList.add('hidden');
            checkIcon.classList.remove('hidden');
            setTimeout(() => {
                copyIcon.classList.remove('hidden');
                checkIcon.classList.add('hidden');
            }, 2000);
        });
    });
</script>
@endsection
