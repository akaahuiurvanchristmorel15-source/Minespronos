<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Dashboard - Mines Vision')</title>
    @vite(['resources/css/app.css'])
</head>
<body class="antialiased bg-zinc-950">
    <div class="flex h-screen">
        <!-- Sidebar -->
        <aside class="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
            <div class="p-6 border-b border-zinc-800">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-black text-white">M</div>
                    <span class="text-lg font-bold tracking-tighter uppercase text-white">Mines <span class="text-orange-500">Vision</span></span>
                </div>
            </div>

            <nav class="flex-1 p-6 space-y-2">
                <a href="{{ route('dashboard') }}" class="block px-4 py-3 rounded-lg font-semibold text-white hover:bg-zinc-800 transition-colors {{ request()->routeIs('dashboard') ? 'bg-orange-500/10 text-orange-400 border-l-4 border-orange-500' : '' }}">
                    Dashboard
                </a>
                <a href="{{ route('pricing') }}" class="block px-4 py-3 rounded-lg font-semibold text-zinc-400 hover:bg-zinc-800 transition-colors {{ request()->routeIs('pricing') ? 'bg-orange-500/10 text-orange-400 border-l-4 border-orange-500' : '' }}">
                    Tarifs & Crédits
                </a>
                @if(auth()->user()?->is_admin)
                <hr class="my-4 border-zinc-800">
                <a href="{{ route('admin.index') }}" class="block px-4 py-3 rounded-lg font-semibold text-orange-400 hover:bg-zinc-800 transition-colors {{ request()->routeIs('admin.*') ? 'bg-orange-500/10 border-l-4 border-orange-500' : '' }}">
                    Admin Panel
                </a>
                @endif
            </nav>

            <!-- User Profile -->
            <div class="p-6 border-t border-zinc-800">
                <div class="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer group">
                    <div class="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                        <span class="text-white font-bold text-sm">{{ substr(auth()->user()?->name ?? 'U', 0, 1) }}</span>
                    </div>
                    <div class="flex-1">
                        <p class="text-sm font-semibold text-white">{{ auth()->user()?->name }}</p>
                        <p class="text-xs text-zinc-400">{{ auth()->user()?->email }}</p>
                    </div>
                    <button onclick="document.getElementById('logoutForm').submit()" class="opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg class="w-5 h-5 text-zinc-400 hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                    </button>
                </div>
                <form id="logoutForm" action="{{ route('logout') }}" method="POST" style="display:none;">
                    @csrf
                </form>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 overflow-auto">
            <div class="max-w-7xl mx-auto">
                @yield('content')
            </div>
        </main>
    </div>
</body>
</html>
