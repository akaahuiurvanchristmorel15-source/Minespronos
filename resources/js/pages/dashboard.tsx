import { Head, router, Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { MinesGrid } from '@/components/MinesGrid';
import { CreditBalance } from '@/components/CreditBalance';
import { PredictionHistory } from '@/components/PredictionHistory';
import { NoCreditsModal } from '@/components/NoCreditsModal';
import AppLayout from '@/layouts/app-layout';

interface Prediction {
    id: number;
    mines_count: number;
    pattern_result: number[];
    bet_amount?: number;
    confidence?: number;
    created_at: string;
}

const CONNECTION_STEPS = [
    { label: 'Connexion aux serveurs 1win...', duration: 900 },
    { label: 'Authentification du compte...', duration: 700 },
    { label: 'Récupération des données de mise...', duration: 800 },
    { label: 'Analyse du contexte de jeu...', duration: 600 },
    { label: 'Calcul des zones à risque...', duration: 900 },
    { label: 'Optimisation du pattern selon la mise...', duration: 700 },
    { label: 'Pronostic généré ✓', duration: 400 },
];

function LiveConnectionOverlay({ onDone }: { onDone: () => void }) {
    const [stepIndex, setStepIndex] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        let elapsed = 0;
        CONNECTION_STEPS.forEach((step, i) => {
            setTimeout(() => setStepIndex(i), elapsed);
            elapsed += step.duration;
        });
        setTimeout(() => {
            setDone(true);
            setTimeout(onDone, 500);
        }, elapsed);
    }, []);

    return (
        <div className="absolute inset-0 z-50 bg-zinc-950/95 backdrop-blur-sm flex flex-col items-center justify-center rounded-[28px] p-8 border border-emerald-500/20">
            <div className="relative w-32 h-32 mb-8">
                <div className={`absolute inset-0 rounded-full border-2 ${done ? 'border-emerald-500' : 'border-emerald-500/30'} transition-colors duration-500`}></div>
                {!done && <div className="absolute inset-0 rounded-full border-t-2 border-emerald-500 animate-spin"></div>}
                <div className={`absolute inset-4 rounded-full border ${done ? 'border-emerald-500/60' : 'border-emerald-500/20'} transition-colors`}></div>
                <div className={`absolute inset-0 flex items-center justify-center text-3xl transition-all duration-500 ${done ? 'scale-110' : ''}`}>
                    {done ? '✅' : '🔗'}
                </div>
                {!done && (
                    <>
                        <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-ping"></div>
                        <div className="absolute -inset-4 rounded-full border border-emerald-500/10 animate-ping" style={{ animationDelay: '0.3s' }}></div>
                    </>
                )}
            </div>

            <p className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-6">
                {done ? 'CONNECTÉ AU JEU' : 'LIAISON LIVE 1WIN'}
            </p>

            <div className="w-full max-w-xs space-y-2 font-mono">
                {CONNECTION_STEPS.map((step, i) => (
                    <div key={i} className={`flex items-center gap-2 text-xs transition-all duration-300 ${i < stepIndex ? 'text-emerald-500 opacity-70' : i === stepIndex ? 'text-white' : 'text-zinc-700'}`}>
                        <span className="w-3 shrink-0">{i < stepIndex ? '✓' : i === stepIndex ? '›' : '·'}</span>
                        <span>{step.label}</span>
                        {i === stepIndex && !done && (
                            <span className="ml-auto flex gap-0.5">
                                <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-6 w-full max-w-xs">
                <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{ width: `${Math.min(100, ((stepIndex + 1) / CONNECTION_STEPS.length) * 100)}%` }}></div>
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-zinc-600 font-mono">
                    <span>0kb</span>
                    <span className="text-emerald-600 animate-pulse">LIVE</span>
                    <span>~{Math.round(((stepIndex + 1) / CONNECTION_STEPS.length) * 4800)}b</span>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard({ predictions }: { predictions: Prediction[] }) {
    const { user } = usePage().props.auth as any;
    const isOneWinLinked = !!user?.onewin_id;
    const isAdmin = !!user?.is_admin;

    const [pattern, setPattern] = useState<number[]>([]);
    const [mines, setMines] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showLiveOverlay, setShowLiveOverlay] = useState(false);
    const [minesCount, setMinesCount] = useState(2);
    const [betAmount, setBetAmount] = useState('');
    const [confidence, setConfidence] = useState<number | null>(null);
    const [potentialGain, setPotentialGain] = useState<number | null>(null);

    const [oneWinId, setOneWinId] = useState('');
    const [isLinking, setIsLinking] = useState(false);
    const [showLinkAnimation, setShowLinkAnimation] = useState(false);
    const [showNoCredits, setShowNoCredits] = useState(false);

    const [ping, setPing] = useState(12);
    useEffect(() => {
        if (!isOneWinLinked) return;
        const interval = setInterval(() => setPing(Math.floor(Math.random() * 30) + 8), 2000);
        return () => clearInterval(interval);
    }, [isOneWinLinked]);

    const [dataBytes, setDataBytes] = useState(0);
    
    // Recurring reminders for linking 1win account
    useEffect(() => {
        if (isOneWinLinked) return;

        const messages = [
            "Liez votre ID 1win pour une précision maximale ! 🔗",
            "Utilisez le code promo ARGENT444 pour +500% de bonus sur 1win ! 💰"
        ];
        let index = 0;

        const interval = setInterval(() => {
            toast(messages[index % messages.length], {
                description: "Optimisez vos sessions de jeu dès maintenant.",
                action: {
                    label: "Lier ID",
                    onClick: () => {
                        const input = document.querySelector('input[placeholder="Entrez votre ID 1win..."]') as HTMLInputElement;
                        if (input) input.focus();
                    }
                },
            });
            index++;
        }, 50000);

        return () => clearInterval(interval);
    }, [isOneWinLinked]);

    useEffect(() => {
        if (!isOneWinLinked) return;
        const interval = setInterval(() => setDataBytes(prev => prev + Math.floor(Math.random() * 200) + 50), 1000);
        return () => clearInterval(interval);
    }, [isOneWinLinked]);

    const linkOneWin = async () => {
        if (!oneWinId || oneWinId.length < 4) return;
        setIsLinking(true);
        setShowLinkAnimation(true);
        try {
            await axios.post('/api/user/link-1win', { onewin_id: oneWinId });
            setTimeout(() => router.reload({ only: ['auth'] }), 2000);
        } catch (e) {
            console.error(e);
            alert("Erreur lors de la liaison.");
            setIsLinking(false);
            setShowLinkAnimation(false);
        }
    };

    const runPrediction = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('/api/predict', {
                mines_count: minesCount,
                bet_amount: betAmount ? parseFloat(betAmount) : 0,
            });
            if (response.data.success) {
                setPattern(response.data.pattern);
                setMines(response.data.mines || []);
                setConfidence(response.data.confidence || null);
                setPotentialGain(response.data.potential_gain || null);
                router.reload({ only: ['auth', 'predictions'] });
            }
        } catch (error: any) {
            console.error(error);
            if (error.response?.status === 402) {
                setShowNoCredits(true);
            } else if (error.response?.status === 429) {
                alert("Veuillez patienter avant de refaire une prédiction (anti-spam).");
            } else {
                alert("Une erreur est survenue.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const generatePrediction = async () => await runPrediction();

    const content = (
        <div className={isAdmin
            ? 'bg-zinc-950 text-white p-4 sm:p-6 lg:p-8 min-h-screen selection:bg-emerald-500/30 selection:text-emerald-200'
            : 'min-h-screen bg-zinc-950 flex flex-col p-4 sm:p-6 lg:p-8 selection:bg-emerald-500/30 selection:text-emerald-200'
        }>
            <Head title="Mines Vision - Dashboard" />

            <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col">

                {/* ── Header ─────────────────────────────────── */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-zinc-900/50 p-4 sm:p-5 rounded-[28px] border border-zinc-800 gap-4 sm:gap-3">
                    <div className="flex justify-between items-center w-full sm:w-auto">
                        <div className="min-w-0">
                            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tighter uppercase">
                                Mines <span className="text-emerald-500">Vision</span>
                            </h1>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold hidden sm:block">Predictor Intelligence</p>
                        </div>
                        <button
                            onClick={() => router.post('/logout')}
                            className="sm:hidden text-zinc-600 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors bg-zinc-800/50 px-3 py-1.5 rounded-full"
                        >
                            Quitter
                        </button>
                    </div>

                    <div className="flex justify-between items-center w-full sm:w-auto gap-2 sm:gap-4 flex-shrink-0 border-t border-zinc-800 pt-4 sm:border-0 sm:pt-0 mt-1 sm:mt-0">
                        {/* Live badge — desktop only */}
                        {isOneWinLinked && (
                            <div className="hidden sm:flex items-center gap-2 bg-emerald-500/5 border border-emerald-500/20 rounded-full px-3 py-1.5">
                                <div className="relative w-2 h-2">
                                    <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                </div>
                                <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">Live</span>
                                <span className="text-zinc-600 text-[10px] font-mono">{ping}ms</span>
                            </div>
                        )}

                        <CreditBalance />

                        {/* ✅ Packs button — visible sur mobile ET desktop */}
                        <Link
                            href="/pricing"
                            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 sm:px-5 py-2 rounded-full text-xs transition shadow-lg shadow-emerald-900/20 whitespace-nowrap"
                        >
                            <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            {/* Texte court sur mobile, complet sur desktop */}
                            <span className="sm:hidden">Packs</span>
                            <span className="hidden sm:inline">Packs</span>
                        </Link>

                        <button
                            onClick={() => router.post('/logout')}
                            className="hidden sm:block text-zinc-600 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
                        >
                            Quitter
                        </button>
                    </div>
                </div>

                {/* ── Main content ────────────────────────────── */}
                <div className="flex flex-col items-center justify-center flex-1 w-full space-y-10 py-6">

                    {/* 1win link / live banner */}
                    {!isOneWinLinked ? (
                        <div className="w-full max-w-md">
                            {showLinkAnimation ? (
                                <div className="bg-zinc-900 border border-emerald-500/30 rounded-2xl p-5 flex flex-col items-center gap-3">
                                    <div className="relative w-12 h-12">
                                        <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30"></div>
                                        <div className="absolute inset-0 rounded-full border-t-2 border-emerald-500 animate-spin"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-xl">🔗</span>
                                        </div>
                                    </div>
                                    <p className="text-emerald-400 text-xs font-black uppercase tracking-widest">Liaison en cours...</p>
                                    <p className="text-zinc-500 text-[10px] font-mono">Connexion à 1win · ID #{oneWinId}</p>
                                </div>
                            ) : (
                                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                        <span className="text-zinc-400 text-xs font-black uppercase tracking-widest">Compte 1win non lié — Précision réduite</span>
                                    </div>
                                    <p className="text-zinc-600 text-xs">Liez votre compte pour activer l'analyse <span className="text-emerald-500 font-bold">LIVE</span> et maximiser la précision des prédictions.</p>
                                    <div className="flex gap-2 mt-1">
                                        <input
                                            type="text"
                                            placeholder="Entrez votre ID 1win..."
                                            value={oneWinId}
                                            onChange={(e) => setOneWinId(e.target.value)}
                                            className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white w-full outline-none focus:border-emerald-500 transition-colors placeholder-zinc-700"
                                        />
                                        <button
                                            onClick={linkOneWin}
                                            disabled={isLinking || oneWinId.length < 4}
                                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-5 rounded-xl text-xs whitespace-nowrap disabled:opacity-40 shadow-md shadow-emerald-900/20 transition-all"
                                        >
                                            Lier
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="w-full max-w-md">
                            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-8 h-8 flex items-center justify-center">
                                        <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping"></div>
                                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <p className="text-emerald-400 text-xs font-black uppercase tracking-widest">1win · Session Live Active</p>
                                        <p className="text-zinc-500 text-[10px] font-mono">ID: #{user?.onewin_id} · Syncing...</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-emerald-500 text-xs font-black font-mono">{dataBytes.toLocaleString()}b</p>
                                    <p className="text-zinc-600 text-[10px] font-mono">reçus</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Grid */}
                    <div className="w-full relative">
                        <div className="relative rounded-[28px] overflow-hidden">
                            {showLiveOverlay && (
                                <LiveConnectionOverlay onDone={async () => {
                                    setShowLiveOverlay(false);
                                    await runPrediction();
                                }} />
                            )}
                            <MinesGrid pattern={pattern} mines={mines} isLoading={isLoading} />
                        </div>

                        <div className="mt-10 flex flex-col items-center justify-center gap-5">
                            {/* Confidence + Gain */}
                            {confidence !== null && pattern.length > 0 && (
                                <div className="w-full max-w-sm flex gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center">
                                        <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">Confiance</p>
                                        <p className={`text-2xl font-black ${confidence >= 80 ? 'text-emerald-400' : confidence >= 60 ? 'text-yellow-400' : 'text-orange-400'}`}>{confidence}%</p>
                                        <div className="mt-2 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full transition-all duration-1000 ${confidence >= 80 ? 'bg-emerald-500' : confidence >= 60 ? 'bg-yellow-500' : 'bg-orange-500'}`} style={{ width: `${confidence}%` }}></div>
                                        </div>
                                    </div>
                                    {potentialGain !== null && potentialGain > 0 && (
                                        <div className="flex-1 bg-zinc-900 border border-emerald-500/20 rounded-2xl p-4 text-center">
                                            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">Gain potentiel</p>
                                            <p className="text-2xl font-black text-emerald-400">{potentialGain.toLocaleString()}</p>
                                            <p className="text-[10px] text-zinc-600 font-mono mt-1">FCFA</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Mines selector */}
                            <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3">
                                <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Mines</span>
                                <div className="flex gap-2">
                                    {[2, 3, 5, 7].map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => setMinesCount(num)}
                                            className={`w-10 h-10 rounded-xl font-black text-sm transition-all ${minesCount === num ? 'bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/30' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Bet amount — 1win only */}
                            {isOneWinLinked && (
                                <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3 animate-in fade-in duration-300">
                                    <label className="text-zinc-500 text-[10px] font-black uppercase tracking-widest block mb-2">Montant de la mise (FCFA)</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            placeholder="Ex: 1000"
                                            value={betAmount}
                                            onChange={(e) => setBetAmount(e.target.value)}
                                            className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white w-full outline-none focus:border-emerald-500 transition-colors placeholder-zinc-700 font-mono"
                                        />
                                        <div className="flex gap-1">
                                            {[500, 1000, 5000].map(val => (
                                                <button
                                                    key={val}
                                                    onClick={() => setBetAmount(String(val))}
                                                    className={`px-2.5 py-2 rounded-xl text-[10px] font-bold transition-all whitespace-nowrap ${betAmount === String(val) ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'}`}
                                                >
                                                    {val >= 1000 ? `${val / 1000}k` : val}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Generate button */}
                            <button
                                onClick={generatePrediction}
                                disabled={isLoading || showLiveOverlay}
                                className="w-full max-w-sm py-5 font-black rounded-[24px] transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-base uppercase tracking-wider relative overflow-hidden bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_20px_50px_rgba(5,150,105,0.4)]"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                        </svg>
                                        Analyse en cours...
                                    </span>
                                ) : isOneWinLinked ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                        </span>
                                        Analyser en Live
                                    </span>
                                ) : 'Générer Prédiction'}
                            </button>
                        </div>
                    </div>

                    {/* History */}
                    <div className="w-full max-w-3xl">
                        <PredictionHistory predictions={predictions || []} />
                    </div>
                </div>

                <NoCreditsModal 
                    isOpen={showNoCredits} 
                    onClose={() => setShowNoCredits(false)} 
                />
            </div>
        </div>
    );

    if (isAdmin) {
        return <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}>{content}</AppLayout>;
    }

    return content;
}