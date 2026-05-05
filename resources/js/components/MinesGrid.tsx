import { cn } from '@/lib/utils';

interface MinesGridProps {
    pattern?: number[];
    mines?: number[];
    isLoading?: boolean;
}

// Composant Étoile (style 1win - bleue lumineuse)
function StarCell() {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-blue-500/10 rounded-xl"></div>
            <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-[0_0_12px_rgba(96,165,250,0.9)] animate-in zoom-in duration-300">
                <defs>
                    <radialGradient id="starGrad" cx="40%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="#e0f2fe" />
                        <stop offset="40%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                    </radialGradient>
                    <filter id="starGlow">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                </defs>
                <polygon
                    points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
                    fill="url(#starGrad)"
                    filter="url(#starGlow)"
                    stroke="#93c5fd"
                    strokeWidth="1"
                />
            </svg>
        </div>
    );
}

// Composant Bombe (style 1win - orange/rouge)
function BombCell() {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-red-900/20 rounded-xl"></div>
            <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-[0_0_10px_rgba(249,115,22,0.7)] animate-in zoom-in duration-300">
                <defs>
                    <radialGradient id="bombGrad" cx="35%" cy="25%" r="70%">
                        <stop offset="0%" stopColor="#fdba74" />
                        <stop offset="50%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#7c2d12" />
                    </radialGradient>
                    <radialGradient id="bombShine" cx="30%" cy="25%" r="40%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </radialGradient>
                </defs>
                {/* Body */}
                <circle cx="50" cy="58" r="32" fill="url(#bombGrad)" />
                {/* Shine */}
                <circle cx="50" cy="58" r="32" fill="url(#bombShine)" />
                {/* Fuse */}
                <path d="M50 26 Q55 18 62 14 Q68 10 72 16" stroke="#78350f" strokeWidth="4" fill="none" strokeLinecap="round"/>
                {/* Spark */}
                <circle cx="72" cy="15" r="5" fill="#fef08a" opacity="0.9"/>
                <circle cx="72" cy="15" r="3" fill="#fde047"/>
                {/* Highlight */}
                <circle cx="38" cy="47" r="9" fill="rgba(255,255,255,0.12)" />
                <circle cx="36" cy="45" r="4" fill="rgba(255,255,255,0.2)" />
            </svg>
        </div>
    );
}

// Cellule neutre (style 1win - bleue sombre)
function NeutralCell({ isLoading }: { isLoading: boolean }) {
    if (isLoading) {
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#1e3a5f]/60 animate-pulse"></div>
            </div>
        );
    }
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-10 h-10 opacity-30">
                <defs>
                    <radialGradient id="neutralGrad" cx="40%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="#93c5fd" />
                        <stop offset="100%" stopColor="#1e40af" />
                    </radialGradient>
                </defs>
                <polygon
                    points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
                    fill="url(#neutralGrad)"
                />
            </svg>
        </div>
    );
}

export function MinesGrid({ pattern = [], mines = [], isLoading = false }: MinesGridProps) {
    const cells = Array.from({ length: 25 }, (_, i) => i);
    const hasPattern = pattern.length > 0 || mines.length > 0;

    return (
        <div className="w-full max-w-sm mx-auto">
            {/* Grid container - style 1win */}
            <div className="grid grid-cols-5 gap-2 p-3 bg-[#0f1923] rounded-2xl shadow-2xl border border-[#1a2d42]/80">
                {cells.map((cellIndex) => {
                    const isSafe = pattern.includes(cellIndex);
                    const isMine = mines.includes(cellIndex);

                    return (
                        <div
                            key={cellIndex}
                            className={cn(
                                "relative aspect-square rounded-xl transition-all duration-400 overflow-hidden cursor-default",
                                isLoading
                                    ? "bg-[#1a2d42] animate-pulse"
                                    : isSafe
                                        ? "bg-[#0a2044] border border-blue-500/60 shadow-[0_0_18px_rgba(59,130,246,0.35)]"
                                        : isMine
                                            ? "bg-[#2d1010] border border-red-900/60 shadow-[0_0_12px_rgba(239,68,68,0.2)]"
                                            : hasPattern
                                                ? "bg-[#141f2b] border border-[#1e3a5f]/50"
                                                : "bg-[#1a2d42] border border-[#1e3a5f]/40 hover:bg-[#1e3550] hover:border-[#2a4a6b]/60"
                            )}
                        >
                            {isSafe && !isLoading && <StarCell />}
                            {isMine && !isLoading && <BombCell />}
                            {!isSafe && !isMine && <NeutralCell isLoading={isLoading} />}
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            {hasPattern && !isLoading && (
                <div className="flex items-center justify-center gap-6 mt-4 text-xs text-zinc-500 font-mono animate-in fade-in duration-500">
                    <span className="flex items-center gap-1.5">
                        <span className="text-blue-400">★</span>
                        <span>{pattern.length} case{pattern.length > 1 ? 's' : ''} sûre{pattern.length > 1 ? 's' : ''}</span>
                    </span>
                    <span className="text-zinc-700">·</span>
                    <span className="flex items-center gap-1.5">
                        <span className="text-orange-500">💣</span>
                        <span>{mines.length} mine{mines.length > 1 ? 's' : ''}</span>
                    </span>
                </div>
            )}
        </div>
    );
}
