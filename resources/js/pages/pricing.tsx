import { Head, Link } from '@inertiajs/react';
import { Check, ArrowLeft, Crown, X, MessageCircle, QrCode } from 'lucide-react';
import { useState } from 'react';

export default function Pricing() {
    const [activeTab, setActiveTab] = useState<'credits' | 'vip'>('credits');
    const [selectedPlan, setSelectedPlan] = useState<{ url: string, name: string, amount: number } | null>(null);

    const initiatePayment = (plan: string, amount: number) => {
        let planName = "";
        switch (plan) {
            case 'standard': planName = "Standard (20 prédictions)"; break;
            case 'max': planName = "Max (60 prédictions)"; break;
            case 'vip_weekly': planName = "VIP Hebdomadaire (7 Jours)"; break;
            case 'vip_monthly': planName = "VIP Mensuel (30 Jours)"; break;
            case 'vip_quarterly': planName = "VIP Trimestriel (90 Jours)"; break;
            default: planName = plan;
        }

        const message = `Bonjour, je souhaite faire le paiement de ${amount} FCFA pour l'abonnement au pack *${planName}*.`;
        const url = `https://wa.me/2250150663744?text=${encodeURIComponent(message)}`;
        
        setSelectedPlan({ url, name: planName, amount });
    };

    return (
        <>
            <Head title="Acheter des Crédits" />
            <div className="min-h-screen bg-zinc-950 text-white py-12 px-4 sm:px-6 lg:px-8">
                
                <div className="max-w-7xl mx-auto mb-10">
                    <Link href="/dashboard" className="inline-flex items-center text-zinc-400 hover:text-emerald-400 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour au Dashboard
                    </Link>
                </div>

                <div className="max-w-7xl mx-auto text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6">
                        Des forfaits qui évoluent avec vous
                    </h2>
                    
                    {/* Toggle */}
                    <div className="inline-flex items-center bg-zinc-900 rounded-full p-1 border border-zinc-800">
                        <button 
                            onClick={() => setActiveTab('credits')}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'credits' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'}`}
                        >
                            Packs de Crédits
                        </button>
                        <button 
                            onClick={() => setActiveTab('vip')}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'vip' ? 'bg-zinc-800 text-yellow-400 shadow-sm' : 'text-zinc-400 hover:text-yellow-400/80'}`}
                        >
                            <Crown className="w-4 h-4" />
                            Abonnements VIP
                        </button>
                    </div>
                </div>

                {activeTab === 'credits' && (
                    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Plan 1: Free */}
                        <div className="bg-zinc-900/50 rounded-3xl p-8 border border-zinc-800 flex flex-col h-full">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold mb-1">Découverte</h3>
                                <p className="text-zinc-400 text-sm h-10">Testez Mines Vision sans engagement.</p>
                            </div>
                            <div className="mb-6 flex items-baseline gap-1">
                                <span className="text-4xl font-extrabold">0</span>
                                <span className="text-xl text-zinc-400">FCFA</span>
                            </div>
                            <button className="w-full py-3 px-4 bg-transparent border border-zinc-700 hover:border-zinc-500 rounded-xl font-medium transition-colors mb-8 cursor-default">
                                Inclus à l'inscription
                            </button>
                            <ul className="space-y-4 text-sm text-zinc-300 flex-1">
                                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-zinc-500 shrink-0" /><span>3 prédictions offertes</span></li>
                                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-zinc-500 shrink-0" /><span>Accès à la grille 5x5 basique</span></li>
                            </ul>
                        </div>

                        {/* Plan 2: Pro */}
                        <div className="bg-zinc-900 rounded-3xl p-8 border-2 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col h-full relative transform md:-translate-y-4">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-zinc-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                Le plus populaire
                            </div>
                            <div className="mb-6">
                                <h3 className="text-xl font-bold mb-1 text-emerald-400">Standard</h3>
                                <p className="text-zinc-400 text-sm h-10">Optimisez vos chances avec notre algorithme.</p>
                            </div>
                            <div className="mb-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold">2 000</span>
                                    <span className="text-xl text-zinc-400">FCFA</span>
                                </div>
                                <p className="text-sm text-emerald-500 mt-1">/ pack de 20 prédictions</p>
                            </div>
                            <button 
                                onClick={() => initiatePayment('standard', 2000)}
                                className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] mb-8"
                            >
                                Obtenir le pack Standard
                            </button>
                            <ul className="space-y-4 text-sm text-zinc-300 flex-1">
                                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /><span>Algorithme Heatmap avancé</span></li>
                                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /><span>20 Crédits d'utilisation instantanés</span></li>
                                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-emerald-500 shrink-0" /><span>Historique complet persistant</span></li>
                            </ul>
                        </div>

                        {/* Plan 3: Max */}
                        <div className="bg-zinc-900/50 rounded-3xl p-8 border border-zinc-800 flex flex-col h-full">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold mb-1">Max</h3>
                                <p className="text-zinc-400 text-sm h-10">Limites plus élevées, accès prioritaire.</p>
                            </div>
                            <div className="mb-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold">5 000</span>
                                    <span className="text-xl text-zinc-400">FCFA</span>
                                </div>
                                <p className="text-sm text-zinc-500 mt-1">/ pack de 60 prédictions</p>
                            </div>
                            <button 
                                onClick={() => initiatePayment('max', 5000)}
                                className="w-full py-3 px-4 bg-zinc-100 hover:bg-white text-zinc-950 rounded-xl font-bold transition-colors mb-8"
                            >
                                Obtenir le pack Max
                            </button>
                            <ul className="space-y-4 text-sm text-zinc-300 flex-1">
                                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-zinc-500 shrink-0" /><span>Jusqu'à 60 utilisations (Bonus +10)</span></li>
                                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-zinc-500 shrink-0" /><span>Recommandé pour les joueurs réguliers</span></li>
                            </ul>
                        </div>
                    </div>
                )}

                {activeTab === 'vip' && (
                    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* VIP 1: Hebdomadaire */}
                        <div className="bg-zinc-900/50 rounded-3xl p-8 border border-yellow-900/30 flex flex-col h-full">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold mb-1 text-yellow-500">Hebdomadaire</h3>
                                <p className="text-zinc-400 text-sm h-10">Un essai intensif sur 7 jours.</p>
                            </div>
                            <div className="mb-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold">5 000</span>
                                    <span className="text-xl text-zinc-400">FCFA</span>
                                </div>
                                <p className="text-sm text-yellow-500/70 mt-1">/ 7 Jours</p>
                            </div>
                            <button 
                                onClick={() => initiatePayment('vip_weekly', 5000)}
                                className="w-full py-3 px-4 bg-transparent border border-yellow-600 hover:bg-yellow-600/10 text-yellow-500 rounded-xl font-bold transition-colors mb-8"
                            >
                                Devenir VIP (7 Jours)
                            </button>
                            <ul className="space-y-4 text-sm text-zinc-300 flex-1">
                                <li className="flex items-start gap-3"><Crown className="w-5 h-5 text-yellow-600 shrink-0" /><span>Prédictions 100% illimitées</span></li>
                                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-yellow-600 shrink-0" /><span>Accès prioritaire aux serveurs</span></li>
                            </ul>
                        </div>

                        {/* VIP 2: Mensuel */}
                        <div className="bg-gradient-to-b from-yellow-900/40 to-zinc-900 rounded-3xl p-8 border-2 border-yellow-500 shadow-[0_0_40px_rgba(234,179,8,0.15)] flex flex-col h-full relative transform md:-translate-y-4">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-zinc-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                <Crown className="w-3 h-3" /> Rentabilité Max
                            </div>
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold mb-1 text-yellow-400">Mensuel</h3>
                                <p className="text-zinc-300 text-sm h-10">La meilleure offre pour dominer le jeu.</p>
                            </div>
                            <div className="mb-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-white">15 000</span>
                                    <span className="text-xl text-zinc-300">FCFA</span>
                                </div>
                                <p className="text-sm text-yellow-400 mt-1">/ 30 Jours</p>
                            </div>
                            <button 
                                onClick={() => initiatePayment('vip_monthly', 15000)}
                                className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-400 text-zinc-950 rounded-xl font-extrabold transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)] mb-8"
                            >
                                Devenir VIP (30 Jours)
                            </button>
                            <ul className="space-y-4 text-sm text-zinc-200 flex-1">
                                <li className="flex items-start gap-3"><Crown className="w-5 h-5 text-yellow-400 shrink-0 fill-yellow-400" /><span>Prédictions 100% illimitées</span></li>
                                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-yellow-400 shrink-0" /><span>Rentabilisé en 7 jours de jeu régulier</span></li>
                                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-yellow-400 shrink-0" /><span>Support prioritaire 24/7</span></li>
                            </ul>
                        </div>

                        {/* VIP 3: Trimestriel */}
                        <div className="bg-zinc-900/50 rounded-3xl p-8 border border-yellow-900/30 flex flex-col h-full">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold mb-1 text-yellow-500">Trimestriel</h3>
                                <p className="text-zinc-400 text-sm h-10">Tranquillité d'esprit totale.</p>
                            </div>
                            <div className="mb-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold">40 000</span>
                                    <span className="text-xl text-zinc-400">FCFA</span>
                                </div>
                                <p className="text-sm text-yellow-500/70 mt-1">/ 90 Jours</p>
                            </div>
                            <button 
                                onClick={() => initiatePayment('vip_quarterly', 40000)}
                                className="w-full py-3 px-4 bg-transparent border border-yellow-600 hover:bg-yellow-600/10 text-yellow-500 rounded-xl font-bold transition-colors mb-8"
                            >
                                Devenir VIP (90 Jours)
                            </button>
                            <ul className="space-y-4 text-sm text-zinc-300 flex-1">
                                <li className="flex items-start gap-3"><Crown className="w-5 h-5 text-yellow-600 shrink-0" /><span>Prédictions 100% illimitées</span></li>
                                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-yellow-600 shrink-0" /><span>Économisez 5 000 FCFA</span></li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            {/* QR Code Modal */}
            {selectedPlan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <button 
                            onClick={() => setSelectedPlan(null)}
                            className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 rounded-full transition-colors z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        
                        <div className="text-center mb-6 mt-2">
                            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                <QrCode className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">Paiement via WhatsApp</h3>
                            <p className="text-zinc-400 text-sm">Scannez ce QR Code pour finaliser l'achat du pack <strong className="text-white">{selectedPlan.name}</strong> ({selectedPlan.amount} FCFA).</p>
                        </div>

                        <div className="bg-white p-3 rounded-2xl mx-auto w-fit mb-6 shadow-inner">
                            <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(selectedPlan.url)}&margin=10`} 
                                alt="QR Code WhatsApp" 
                                className="w-48 h-48 rounded-xl"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 py-2">
                                <div className="h-px bg-zinc-800 flex-1"></div>
                                <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Ou sur mobile</span>
                                <div className="h-px bg-zinc-800 flex-1"></div>
                            </div>
                            
                            <a 
                                href={selectedPlan.url}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold transition-colors shadow-lg shadow-[#25D366]/20"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Ouvrir WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
