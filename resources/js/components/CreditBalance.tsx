import { Coins, Crown } from 'lucide-react';
import { usePage } from '@inertiajs/react';

export function CreditBalance() {
    const { user, is_vip } = usePage().props.auth as any;
    const credits = user?.credits || 0;
    const is_admin = user?.is_admin || false;

    if (is_admin) {
        return (
            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-950 border border-orange-500/50 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                <Crown className="w-5 h-5 text-orange-500" />
                <span className="font-bold text-orange-500 text-lg leading-none">∞</span>
                <span className="text-sm text-zinc-400 font-medium ml-1">Admin</span>
            </div>
        );
    }

    if (is_vip) {
        return (
            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-950 border border-yellow-500/50 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                <Crown className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-yellow-400 text-lg leading-none">VIP</span>
                <span className="text-sm text-zinc-400 font-medium ml-1">Illimité</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-950 border border-emerald-900/50 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <Coins className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-emerald-400 text-lg leading-none">{String(credits)}</span>
            <span className="text-sm text-zinc-400 font-medium ml-1">Crédits</span>
        </div>
    );
}
