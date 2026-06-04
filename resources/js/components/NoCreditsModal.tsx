import React from 'react';
import { Link } from '@inertiajs/react';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription,
    DialogFooter,
    DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Zap, AlertCircle, ArrowRight } from 'lucide-react';

interface NoCreditsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NoCreditsModal({ isOpen, onClose }: NoCreditsModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-zinc-950 border-zinc-800 p-0 overflow-hidden max-w-sm rounded-[32px] sm:rounded-[32px]">
                {/* Header with gradient effect */}
                <div className="relative h-32 bg-gradient-to-br from-emerald-600/20 to-zinc-950 flex items-center justify-center border-b border-zinc-800/50">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full animate-pulse"></div>
                    </div>
                    <div className="relative w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center border border-emerald-500/30 shadow-2xl shadow-emerald-500/10 transform rotate-3">
                        <Zap className="w-8 h-8 text-emerald-500 fill-emerald-500/20" />
                    </div>
                </div>

                <div className="p-8 text-center">
                    <DialogHeader className="space-y-4">
                        <DialogTitle className="text-2xl font-black text-white tracking-widest uppercase text-center">
                            Crédits Épuisés
                        </DialogTitle>
                        <DialogDescription className="text-zinc-500 text-sm leading-relaxed">
                            Vous avez utilisé toutes vos prédictions disponibles. Rechargez votre compte pour continuer à profiter de l'analyse <span className="text-emerald-500 font-bold">Mines Vision</span>.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mt-8 space-y-3">
                        <Link href="/pricing" className="block">
                            <Button 
                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-7 rounded-2xl text-base uppercase tracking-wider transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg shadow-emerald-900/20 border-none"
                            >
                                <span className="flex items-center gap-2">
                                    Voir les Packs
                                    <ArrowRight className="w-5 h-5" />
                                </span>
                            </Button>
                        </Link>
                        
                        <DialogClose asChild>
                            <Button 
                                variant="ghost" 
                                className="w-full text-zinc-600 hover:text-white hover:bg-white/5 font-bold uppercase tracking-widest text-[10px] py-4 transition-colors"
                            >
                                Plus tard
                            </Button>
                        </DialogClose>
                    </div>
                </div>

                {/* Footer deco */}
                <div className="h-1 w-full bg-emerald-600/30">
                    <div className="h-full bg-emerald-500 animate-pulse w-full"></div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
