import { Link, usePage } from '@inertiajs/react';
import { Menu, Shield } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import type { BreadcrumbItem } from '@/types';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
};

export function AppHeader({ breadcrumbs = [] }: Props) {
    const page = usePage();
    const { auth } = page.props;
    const getInitials = useInitials();

    return (
        <>
            {/* Top navbar */}
            <div className="border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-sm">
                <div className="mx-auto flex h-14 items-center px-4 md:max-w-7xl">

                    {/* Mobile Menu */}
                    <div className="lg:hidden mr-3">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex h-full w-60 flex-col bg-zinc-950 border-r border-zinc-800">
                                <SheetTitle className="sr-only">Navigation</SheetTitle>
                                <SheetHeader className="flex justify-start text-left mb-6">
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center">
                                            <span className="text-white font-black text-xs">M</span>
                                        </div>
                                        <span className="font-black text-white tracking-tighter uppercase text-sm">
                                            Mines <span className="text-emerald-500">Vision</span>
                                        </span>
                                    </div>
                                </SheetHeader>
                                <div className="flex flex-col gap-1">
                                    <Link
                                        href="/admin"
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                                    >
                                        <Shield className="w-4 h-4" />
                                        Admin Panel
                                    </Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Logo */}
                    <Link href="/admin" prefetch className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-900/40">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                                <circle cx="12" cy="14" r="7" fill="white" opacity="0.9"/>
                                <circle cx="12" cy="14" r="4.5" fill="#059669"/>
                                <circle cx="10.5" cy="12.5" r="1.5" fill="rgba(255,255,255,0.4)"/>
                                <line x1="12" y1="3" x2="12" y2="7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                <circle cx="16.5" cy="5.5" r="1.5" fill="#fde047"/>
                            </svg>
                        </div>
                        <div>
                            <span className="font-black text-white tracking-tighter uppercase text-sm hidden sm:block">
                                Mines <span className="text-emerald-500">Vision</span>
                            </span>
                        </div>
                        <span className="hidden sm:inline text-[9px] font-black uppercase tracking-widest text-orange-500/80 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full">
                            Admin
                        </span>
                    </Link>

                    {/* Right side */}
                    <div className="ml-auto flex items-center gap-2">
                        {/* Live indicator */}
                        <div className="hidden sm:flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1.5">
                            <div className="relative w-1.5 h-1.5">
                                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                            </div>
                            <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">Système</span>
                        </div>

                        {/* Avatar dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="size-9 rounded-full p-0.5 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900 transition-all">
                                    <Avatar className="size-7 overflow-hidden rounded-full">
                                        <AvatarImage src={auth.user?.avatar} alt={auth.user?.name} />
                                        <AvatarFallback className="rounded-full bg-emerald-600 text-white text-xs font-black">
                                            {getInitials(auth.user?.name ?? '')}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-zinc-900 border-zinc-800" align="end">
                                {auth.user && <UserMenuContent user={auth.user} />}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* Breadcrumbs bar */}
            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-zinc-800/60 bg-zinc-950/50">
                    <div className="mx-auto flex h-10 w-full items-center justify-start px-4 text-zinc-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
