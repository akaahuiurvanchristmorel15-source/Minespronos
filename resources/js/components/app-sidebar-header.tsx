import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Shield } from 'lucide-react';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    return (
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-zinc-800/60 px-4 md:px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-zinc-950/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 flex-1">
                <SidebarTrigger className="-ml-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors" />
                <div className="w-px h-4 bg-zinc-800 hidden sm:block" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            {/* Admin badge */}
            <div className="hidden sm:flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-orange-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-500/80">
                    Administration
                </span>
            </div>
        </header>
    );
}
