export default function AppLogo() {
    return (
        <>
            {/* Logo icon: green hexagon / mine shape */}
            <div className="flex aspect-square size-8 items-center justify-center rounded-xl bg-emerald-600 shadow-lg shadow-emerald-900/40">
                <svg viewBox="0 0 24 24" className="size-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="14" r="7" fill="white" opacity="0.9" />
                    <circle cx="12" cy="14" r="4.5" fill="#059669" />
                    <circle cx="10.5" cy="12.5" r="1.5" fill="rgba(255,255,255,0.4)" />
                    <line x1="12" y1="3" x2="12" y2="7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M14 5.5 Q16 4 17 6" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <circle cx="17" cy="5.5" r="1.5" fill="#fde047" />
                </svg>
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-black tracking-tighter uppercase">
                    Mines <span className="text-emerald-500">Vision</span>
                </span>
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Admin Panel</span>
            </div>
        </>
    );
}
