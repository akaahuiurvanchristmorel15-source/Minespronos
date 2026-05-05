interface Prediction {
    id: number;
    mines_count: number;
    pattern_result: number[];
    bet_amount?: number;
    confidence?: number;
    created_at: string;
}

export function PredictionHistory({ predictions = [] }: { predictions: Prediction[] }) {
    if (predictions.length === 0) return null;

    return (
        <div className="mt-8 w-full max-w-sm mx-auto">
            <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4 px-2">Dernières prédictions</h3>
            <div className="flex gap-3 overflow-x-auto pb-4 snap-x hide-scrollbar px-2">
                {predictions.map(pred => (
                    <div key={pred.id} className="min-w-[110px] snap-center shrink-0 flex flex-col items-center bg-zinc-900 p-3 rounded-2xl border border-zinc-800">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold text-emerald-500">{pred.mines_count} mines</span>
                            {pred.confidence && (
                                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                                    pred.confidence >= 80 ? 'bg-emerald-500/10 text-emerald-400' :
                                    pred.confidence >= 60 ? 'bg-yellow-500/10 text-yellow-400' :
                                    'bg-orange-500/10 text-orange-400'
                                }`}>
                                    {pred.confidence}%
                                </span>
                            )}
                        </div>
                        <div className="grid grid-cols-5 gap-1 w-full px-1">
                            {Array.from({length: 25}).map((_, i) => (
                                <div 
                                    key={i} 
                                    className={`aspect-square rounded-sm ${pred.pattern_result.includes(i) ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]' : 'bg-zinc-800'}`}
                                />
                            ))}
                        </div>
                        {pred.bet_amount !== undefined && pred.bet_amount > 0 && (
                            <p className="text-[9px] text-zinc-600 font-mono mt-2">{pred.bet_amount.toLocaleString()} FCFA</p>
                        )}
                    </div>
                ))}
            </div>
            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}
            </style>
        </div>
    );
}
