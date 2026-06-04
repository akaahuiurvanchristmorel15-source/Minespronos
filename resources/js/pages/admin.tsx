import { Head, router, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Crown, Users, Wifi, CreditCard, Trash2, Shield, Search, ArrowLeft, Plus, Pencil, X, ChevronDown, ChevronUp, Power, PowerOff } from 'lucide-react';

interface Stats {
    connected_users: number;
    total_users: number;
    vip_users: number;
    total_credits: number;
}

interface Payment {
    id: number;
    user_name: string;
    user_email: string;
    amount: number;
    plan: string;
    status: string;
    date: string;
}

interface User {
    id: number;
    name: string;
    account_number: string;
    credits: number;
    is_vip: boolean;
    vip_expires_at: string | null;
    is_admin: boolean;
    is_active: boolean;
    plain_password: string | null;
    joined: string;
}

interface Props {
    stats: Stats;
    payments: Payment[];
    users: User[];
}

type Tab = 'users' | 'payments';

function UserFormModal({ user, newAccount, onClose }: { user?: User | null; newAccount?: { name: string; account_number: string; password: string } | null; onClose: () => void }) {
    const isEdit = !!user;

    if (newAccount) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                <div className="w-full max-w-md bg-zinc-900 border border-emerald-500/30 rounded-3xl p-6 shadow-2xl animate-in fade-in duration-300">
                    <div className="text-center mb-6">
                        <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">✅</span>
                        </div>
                        <h2 className="text-lg font-black text-white mb-1">Compte créé !</h2>
                        <p className="text-zinc-400 text-xs">Transmettez ces identifiants à l'utilisateur. Le mot de passe ne sera plus affiché.</p>
                    </div>
                    <div className="space-y-3 mb-6">
                        <div className="bg-zinc-950 rounded-2xl p-4 border border-zinc-800">
                            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">Nom</p>
                            <p className="text-white font-bold">{newAccount.name}</p>
                        </div>
                        <div className="bg-zinc-950 rounded-2xl p-4 border border-emerald-500/20">
                            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">Numéro de compte</p>
                            <p className="text-emerald-400 font-mono text-xl font-black tracking-widest">{newAccount.account_number}</p>
                        </div>
                        <div className="bg-zinc-950 rounded-2xl p-4 border border-orange-500/20">
                            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">Mot de passe (une seule fois)</p>
                            <p className="text-orange-400 font-mono text-xl font-black tracking-widest">{newAccount.password}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm transition-all">Fermer</button>
                </div>
            </div>
        );
    }

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: user?.name ?? '',
        credits: String(user?.credits ?? 0),
        is_admin: user?.is_admin ? '1' : '0',
        vip_days: '',
        reset_password: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(`/admin/users/${user!.id}`, { onSuccess: () => { reset(); onClose(); } });
        } else {
            post('/admin/users', { onSuccess: () => { reset(); } });
        }
    };

    const inputCls = 'w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500 transition-colors placeholder-zinc-600';
    const labelCls = 'block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-black text-white">{isEdit ? `Modifier — ${user!.name}` : 'Créer un utilisateur'}</h2>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
                </div>

                {!isEdit && (
                    <div className="mb-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl px-4 py-3">
                        <p className="text-emerald-400 text-xs font-bold">🔐 Le numéro de compte et le mot de passe seront <span className="underline">générés automatiquement</span>.</p>
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className={labelCls}>Nom de l'utilisateur</label>
                        <input className={inputCls} value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Ex: Kouassi Jean" required />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelCls}>Crédits</label>
                            <input type="number" min="0" className={inputCls} value={data.credits} onChange={e => setData('credits', e.target.value)} placeholder="0" />
                        </div>
                        <div>
                            <label className={labelCls}>VIP (jours)</label>
                            <input type="number" min="0" max="365" className={inputCls} value={data.vip_days} onChange={e => setData('vip_days', e.target.value)} placeholder="Ex: 30" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <input type="checkbox" id="is_admin_modal" checked={data.is_admin === '1'} onChange={e => setData('is_admin', e.target.checked ? '1' : '0')} className="w-4 h-4 accent-orange-500" />
                        <label htmlFor="is_admin_modal" className="text-sm text-zinc-300 font-medium">Compte Administrateur</label>
                    </div>
                    {isEdit && (
                        <div className="flex items-center gap-3 bg-orange-500/5 border border-orange-500/20 rounded-xl px-3 py-2.5">
                            <input type="checkbox" id="reset_pwd" checked={data.reset_password} onChange={e => setData('reset_password', e.target.checked)} className="w-4 h-4 accent-orange-500" />
                            <label htmlFor="reset_pwd" className="text-sm text-orange-300 font-medium">Générer un nouveau mot de passe</label>
                        </div>
                    )}
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 font-bold text-sm transition-all">Annuler</button>
                        <button type="submit" disabled={processing} className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm transition-all disabled:opacity-50 shadow-lg shadow-emerald-900/30">
                            {processing ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Créer le compte'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

/* ── Mobile user card ─────────────────────────────── */
function UserCard({ user, onEdit, onDelete, onToggleActive, deleting }: {
    user: User;
    onEdit: (u: User) => void;
    onDelete: (u: User) => void;
    onToggleActive: (u: User) => void;
    deleting: boolean;
}) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`bg-zinc-900/60 border rounded-2xl overflow-hidden transition-all ${user.is_active ? 'border-zinc-800' : 'border-red-900/40 opacity-75'}`}>
            {/* Card header — always visible */}
            <div
                className="flex items-center gap-3 px-4 py-3.5 cursor-pointer"
                onClick={() => setExpanded(v => !v)}
            >
                {/* Avatar */}
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 ${user.is_active ? 'bg-zinc-800 border-zinc-700' : 'bg-red-900/20 border-red-900/30'}`}>
                    <span className={`text-sm font-black ${user.is_active ? 'text-zinc-400' : 'text-red-400'}`}>{user.name.charAt(0).toUpperCase()}</span>
                </div>

                <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm truncate ${user.is_active ? 'text-white' : 'text-zinc-500 line-through'}`}>{user.name}</p>
                    <p className="text-zinc-500 font-mono text-[11px] truncate">{user.account_number}</p>
                </div>

                {/* Status badge */}
                <div className="flex-shrink-0 flex gap-1">
                    {!user.is_active && (
                        <span className="text-[10px] font-black uppercase bg-red-500/15 text-red-500 border border-red-500/30 px-2 py-0.5 rounded-full">Banni</span>
                    )}
                    {user.is_admin && (
                        <span className="text-[10px] font-black uppercase bg-orange-500/15 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full">Admin</span>
                    )}
                    {user.is_vip && !user.is_admin && (
                        <span className="text-[10px] font-black uppercase bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Crown className="w-2.5 h-2.5" /> VIP
                        </span>
                    )}
                </div>

                {expanded
                    ? <ChevronUp className="w-4 h-4 text-zinc-600 flex-shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-zinc-600 flex-shrink-0" />
                }
            </div>

            {/* Expanded details */}
            {expanded && (
                <div className="px-4 pb-4 border-t border-zinc-800/70 pt-3 space-y-3">
                    {/* Info grid */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-zinc-950/60 rounded-xl p-3 border border-zinc-800">
                            <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">N° Compte</p>
                            <p className="text-emerald-400 font-mono text-xs font-bold tracking-widest">{user.account_number}</p>
                        </div>
                        <div className="bg-zinc-950/60 rounded-xl p-3 border border-zinc-800">
                            <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Crédits</p>
                            <p className="text-emerald-400 font-extrabold text-lg leading-none">{user.credits}</p>
                        </div>
                        <div className="bg-zinc-950/60 rounded-xl p-3 border border-zinc-800">
                            <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Inscription</p>
                            <p className="text-zinc-300 font-mono text-xs">{user.joined}</p>
                        </div>
                        <div className="bg-zinc-950/60 rounded-xl p-3 border border-orange-500/10">
                            <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Mot de passe</p>
                            {user.plain_password
                                ? <p className="text-orange-400 font-mono text-xs font-bold">{user.plain_password}</p>
                                : <p className="text-zinc-700 text-xs">—</p>
                            }
                        </div>
                    </div>

                    {user.is_vip && user.vip_expires_at && (
                        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl px-3 py-2 flex items-center gap-2">
                            <Crown className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                            <p className="text-yellow-400 text-xs font-bold">VIP jusqu'au {user.vip_expires_at}</p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-1">
                        <button
                            onClick={() => onEdit(user)}
                            className="flex-1 flex items-center justify-center gap-1.5 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10 text-xs font-bold py-2.5 rounded-xl transition-all border border-zinc-800 hover:border-emerald-500/20"
                        >
                            <Pencil className="w-3.5 h-3.5" /> Modifier
                        </button>
                        <button
                            onClick={() => onToggleActive(user)}
                            className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 rounded-xl transition-all border ${user.is_active 
                                ? 'text-orange-400 border-zinc-800 hover:bg-orange-500/10 hover:border-orange-500/20' 
                                : 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10'}`}
                        >
                            {user.is_active ? <PowerOff className="w-3.5 h-3.5" /> : <Power className="w-3.5 h-3.5" />}
                            {user.is_active ? 'Désactiver' : 'Activer'}
                        </button>
                        {!user.is_admin && (
                            <button
                                onClick={() => onDelete(user)}
                                disabled={deleting}
                                className="w-full flex items-center justify-center gap-1.5 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 text-xs font-bold py-2.5 rounded-xl transition-all disabled:opacity-40 border border-zinc-800 hover:border-red-500/20"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                {deleting ? '...' : 'Supprimer'}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ── Mobile payment card ──────────────────────────── */
function PaymentCard({ payment }: { payment: Payment }) {
    return (
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl px-4 py-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <p className="font-bold text-white text-sm truncate">{payment.user_name}</p>
                    <p className="text-zinc-500 text-xs truncate">{payment.user_email}</p>
                </div>
                <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border flex-shrink-0 ${payment.status === 'completed' || payment.status === 'success'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : payment.status === 'pending'
                            ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                            : 'bg-red-500/10 text-red-400 border-red-500/30'
                    }`}>
                    {payment.status}
                </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
                <div className="bg-zinc-950/60 rounded-xl p-2.5 border border-zinc-800">
                    <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Pack</p>
                    <p className="text-zinc-300 font-mono text-xs font-bold">{payment.plan}</p>
                </div>
                <div className="bg-zinc-950/60 rounded-xl p-2.5 border border-zinc-800">
                    <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Montant</p>
                    <p className="text-white font-extrabold text-sm">{payment.amount.toLocaleString()} <span className="text-zinc-500 font-normal text-[10px]">FCFA</span></p>
                </div>
                <div className="bg-zinc-950/60 rounded-xl p-2.5 border border-zinc-800">
                    <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Date</p>
                    <p className="text-zinc-400 font-mono text-[11px]">{payment.date}</p>
                </div>
            </div>
        </div>
    );
}

export default function AdminPanel({ stats, payments, users }: Props) {
    const [tab, setTab] = useState<Tab>('users');
    const [search, setSearch] = useState('');
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [newAccount, setNewAccount] = useState<{ name: string; account_number: string; password: string } | null>(null);

    const handleDelete = (user: User) => {
        if (!confirm(`Supprimer "${user.name}" ? Cette action est irréversible.`)) return;
        setDeletingId(user.id);
        router.delete(`/admin/users/${user.id}`, {
            onFinish: () => setDeletingId(null),
        });
    };

    const handleToggleActive = (user: User) => {
        const action = user.is_active ? 'Désactiver' : 'Activer';
        if (!confirm(`${action} « ${user.name} » ?`)) return;
        router.post(`/admin/users/${user.id}/toggle-active`, {}, {
            preserveScroll: true
        });
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        (u.account_number ?? '').includes(search)
    );

    const filteredPayments = payments.filter(p =>
        p.user_name.toLowerCase().includes(search.toLowerCase()) ||
        (p.user_email ?? '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            {showCreateModal && <UserFormModal newAccount={newAccount} onClose={() => { setShowCreateModal(false); setNewAccount(null); }} />}
            {editingUser && <UserFormModal user={editingUser} onClose={() => setEditingUser(null)} />}

            <Head title="Administration — Mines Vision" />

            <div className="flex-1 bg-transparent text-white py-6 sm:py-10 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">

                {/* Back link */}
                <div className="max-w-7xl mx-auto mb-6 sm:mb-8 flex items-center justify-between">
                    <Link href="/dashboard" className="inline-flex items-center text-zinc-400 hover:text-emerald-400 transition-colors text-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour
                    </Link>
                    <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-orange-500" />
                        <span className="text-[11px] font-black uppercase tracking-widest text-orange-500/80 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
                            Panneau Admin
                        </span>
                    </div>
                </div>

                {/* Title */}
                <div className="max-w-7xl mx-auto text-center mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2 sm:mb-3">Vue d'ensemble</h1>
                    <p className="text-zinc-400 text-xs sm:text-sm">Gérez vos utilisateurs et suivez l'activité en temps réel.</p>
                </div>

                {/* Stats Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8 sm:mb-12">
                    <div className="bg-zinc-900 rounded-3xl p-5 sm:p-6 border-2 border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.1)] flex flex-col gap-2 sm:gap-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
                        <div className="flex items-center gap-2">
                            <div className="relative w-3 h-3">
                                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75" />
                                <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                            </div>
                            <span className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">En ligne</span>
                        </div>
                        <p className="text-4xl sm:text-5xl font-extrabold text-emerald-400">{stats.connected_users}</p>
                        <p className="text-xs text-zinc-500">actifs ces 5 dernières min.</p>
                    </div>
                    <div className="bg-zinc-900/50 rounded-3xl p-5 sm:p-6 border border-zinc-800 flex flex-col gap-2 sm:gap-3">
                        <div className="flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 text-zinc-400" />
                            <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">Inscrits</span>
                        </div>
                        <p className="text-4xl sm:text-5xl font-extrabold text-white">{stats.total_users}</p>
                        <p className="text-xs text-zinc-500">utilisateurs au total</p>
                    </div>
                    <div className="bg-zinc-900/50 rounded-3xl p-5 sm:p-6 border border-yellow-900/40 shadow-[0_0_20px_rgba(234,179,8,0.06)] flex flex-col gap-2 sm:gap-3">
                        <div className="flex items-center gap-2">
                            <Crown className="w-3.5 h-3.5 text-yellow-500" />
                            <span className="text-[10px] text-yellow-500/80 font-black uppercase tracking-widest">VIP Actifs</span>
                        </div>
                        <p className="text-4xl sm:text-5xl font-extrabold text-yellow-400">{stats.vip_users}</p>
                        <p className="text-xs text-zinc-500">abonnements en cours</p>
                    </div>
                    <div className="bg-zinc-900/50 rounded-3xl p-5 sm:p-6 border border-zinc-800 flex flex-col gap-2 sm:gap-3">
                        <div className="flex items-center gap-2">
                            <CreditCard className="w-3.5 h-3.5 text-zinc-400" />
                            <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">Transactions</span>
                        </div>
                        <p className="text-4xl sm:text-5xl font-extrabold text-white">{payments.length}</p>
                        <p className="text-xs text-zinc-500">paiements enregistrés</p>
                    </div>
                </div>

                {/* Tabs + Search */}
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-6">
                    <div className="inline-flex items-center bg-zinc-900 rounded-full p-1 border border-zinc-800 self-center w-full sm:w-auto">
                        <button
                            onClick={() => setTab('users')}
                            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${tab === 'users' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'}`}
                        >
                            Utilisateurs ({users.length})
                        </button>
                        <button
                            onClick={() => setTab('payments')}
                            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${tab === 'payments' ? 'bg-zinc-800 text-yellow-400 shadow-sm' : 'text-zinc-400 hover:text-yellow-400/80'}`}
                        >
                            <Crown className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Historique Packs</span>
                            <span className="sm:hidden">Packs</span>
                            ({payments.length})
                        </button>
                    </div>

                    <div className="flex gap-2 items-center">
                        {tab === 'users' && (
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-4 py-2.5 rounded-full transition-all shadow-lg shadow-emerald-900/20 whitespace-nowrap flex-shrink-0"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Créer un utilisateur</span>
                                <span className="sm:hidden">Créer</span>
                            </button>
                        )}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-zinc-900 border border-zinc-800 rounded-full pl-9 pr-4 py-2 text-sm text-white outline-none focus:border-emerald-500/50 w-full placeholder-zinc-600 transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* ── USERS ─────────────────────────────────────── */}
                {tab === 'users' && (
                    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">

                        {/* Mobile: card list */}
                        <div className="lg:hidden space-y-2">
                            {filteredUsers.length === 0 ? (
                                <div className="text-center py-16 text-zinc-600 text-sm">Aucun utilisateur trouvé.</div>
                            ) : filteredUsers.map(user => (
                                <UserCard
                                    key={user.id}
                                    user={user}
                                    onEdit={u => setEditingUser(u)}
                                    onDelete={handleDelete}
                                    onToggleActive={handleToggleActive}
                                    deleting={deletingId === user.id}
                                />
                            ))}
                        </div>

                        {/* Desktop: table */}
                        <div className="hidden lg:block bg-zinc-900/50 rounded-3xl border border-zinc-800 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-zinc-800 text-[10px] text-zinc-500 uppercase tracking-widest font-black">
                                            <th className="text-left px-6 py-4">Utilisateur</th>
                                            <th className="text-left px-4 py-4">N° Compte</th>
                                            <th className="text-center px-4 py-4">Mot de passe</th>
                                            <th className="text-center px-4 py-4">Crédits</th>
                                            <th className="text-center px-4 py-4">Statut</th>
                                            <th className="text-center px-4 py-4">Inscription</th>
                                            <th className="text-center px-4 py-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.map((user, i) => (
                                            <tr key={user.id} className={`border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors ${i === filteredUsers.length - 1 ? 'border-b-0' : ''}`}>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                                                            <span className="text-xs font-black text-zinc-400">{user.name.charAt(0).toUpperCase()}</span>
                                                        </div>
                                                        <div>
                                                            <p className={`font-bold ${user.is_active ? 'text-white' : 'text-zinc-500 line-through'}`}>{user.name}</p>
                                                            <p className="text-zinc-500 text-xs">ID #{user.id}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className="text-zinc-400 font-mono text-xs bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-full tracking-widest">{user.account_number}</span>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    {user.plain_password
                                                        ? <span className="text-orange-400 font-mono text-xs bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full">{user.plain_password}</span>
                                                        : <span className="text-zinc-700 text-xs">—</span>
                                                    }
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <span className="font-extrabold text-emerald-400 text-lg">{user.credits}</span>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <div className="flex flex-col items-center gap-1">
                                                        {user.is_admin && (
                                                            <span className="text-[10px] font-black uppercase bg-orange-500/15 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full">Admin</span>
                                                        )}
                                                        {user.is_vip && !user.is_admin && (
                                                            <span className="text-[10px] font-black uppercase bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded-full flex items-center justify-center gap-1">
                                                                <Crown className="w-2.5 h-2.5" /> VIP
                                                            </span>
                                                        )}
                                                        {!user.is_active && (
                                                            <span className="text-[10px] font-black uppercase bg-red-500/15 text-red-500 border border-red-500/30 px-2 py-0.5 rounded-full">Banni</span>
                                                        )}
                                                        {user.is_active && !user.is_admin && !user.is_vip && (
                                                            <span className="text-[10px] font-black uppercase bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full">Standard</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <span className="text-zinc-500 text-xs font-mono whitespace-nowrap">{user.joined}</span>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => setEditingUser(user)}
                                                            className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/10 text-xs font-bold px-3 py-1.5 rounded-full transition-all border border-transparent hover:border-emerald-500/20"
                                                        >
                                                            <Pencil className="w-3 h-3" /> Modifier
                                                        </button>
                                                        <button
                                                            onClick={() => handleToggleActive(user)}
                                                            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-all border border-transparent ${user.is_active 
                                                                ? 'text-orange-400 hover:bg-orange-500/10 hover:border-orange-500/20' 
                                                                : 'text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/20 bg-emerald-500/5'}`}
                                                            title={user.is_active ? 'Désactiver' : 'Activer'}
                                                        >
                                                            {user.is_active ? <PowerOff className="w-3 h-3" /> : <Power className="w-3 h-3" />}
                                                            {user.is_active ? 'Désactiver' : 'Activer'}
                                                        </button>
                                                        {!user.is_admin && (
                                                            <button
                                                                onClick={() => handleDelete(user)}
                                                                disabled={deletingId === user.id}
                                                                className="inline-flex items-center gap-1.5 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 text-xs font-bold px-3 py-1.5 rounded-full transition-all disabled:opacity-40 border border-transparent hover:border-red-500/20"
                                                            >
                                                                <Trash2 className="w-3 h-3" />
                                                                {deletingId === user.id ? '...' : 'Suppr.'}
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredUsers.length === 0 && (
                                            <tr>
                                                <td colSpan={7} className="text-center py-16 text-zinc-600 text-sm">Aucun utilisateur trouvé.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── PAYMENTS ──────────────────────────────────── */}
                {tab === 'payments' && (
                    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">

                        {payments.length === 0 ? (
                            <div className="bg-zinc-900/50 rounded-3xl border border-zinc-800 text-center py-20">
                                <Crown className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                                <p className="text-zinc-500 text-sm mb-1">Aucun paiement enregistré</p>
                                <p className="text-zinc-700 text-xs">Les achats de crédits et VIP apparaîtront ici.</p>
                            </div>
                        ) : (
                            <>
                                {/* Mobile: card list */}
                                <div className="lg:hidden space-y-2">
                                    {filteredPayments.length === 0 ? (
                                        <div className="text-center py-16 text-zinc-600 text-sm">Aucun paiement trouvé.</div>
                                    ) : filteredPayments.map(payment => (
                                        <PaymentCard key={payment.id} payment={payment} />
                                    ))}
                                </div>

                                {/* Desktop: table */}
                                <div className="hidden lg:block bg-zinc-900/50 rounded-3xl border border-zinc-800 overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-zinc-800 text-[10px] text-zinc-500 uppercase tracking-widest font-black">
                                                    <th className="text-left px-6 py-4">Utilisateur</th>
                                                    <th className="text-left px-4 py-4">Pack</th>
                                                    <th className="text-center px-4 py-4">Montant</th>
                                                    <th className="text-center px-4 py-4">Statut</th>
                                                    <th className="text-center px-4 py-4">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredPayments.map((payment, i) => (
                                                    <tr key={payment.id} className={`border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors ${i === filteredPayments.length - 1 ? 'border-b-0' : ''}`}>
                                                        <td className="px-6 py-4">
                                                            <div>
                                                                <p className="font-bold text-white">{payment.user_name}</p>
                                                                <p className="text-zinc-500 text-xs">{payment.user_email}</p>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <span className="text-zinc-300 font-mono text-xs bg-zinc-800 border border-zinc-700 px-2.5 py-1 rounded-full">{payment.plan}</span>
                                                        </td>
                                                        <td className="px-4 py-4 text-center">
                                                            <span className="font-extrabold text-white">{payment.amount.toLocaleString()}<span className="text-zinc-500 font-normal text-xs ml-1">FCFA</span></span>
                                                        </td>
                                                        <td className="px-4 py-4 text-center">
                                                            <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${payment.status === 'completed' || payment.status === 'success'
                                                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                                                    : payment.status === 'pending'
                                                                        ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                                                                        : 'bg-red-500/10 text-red-400 border-red-500/30'
                                                                }`}>
                                                                {payment.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-4 text-center">
                                                            <span className="text-zinc-500 text-xs font-mono whitespace-nowrap">{payment.date}</span>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {filteredPayments.length === 0 && (
                                                    <tr>
                                                        <td colSpan={5} className="text-center py-16 text-zinc-600 text-sm">Aucun paiement trouvé.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

AdminPanel.layout = {
    breadcrumbs: [{ title: 'Admin Panel', href: '/admin' }],
};