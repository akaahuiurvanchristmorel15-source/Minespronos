import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useForm, Link, Head } from '@inertiajs/react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFDFB] p-6 selection:bg-orange-200 selection:text-orange-900 bg-gradient-to-b from-orange-50/50 to-transparent">
            <Head title="Créer un compte" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[450px] bg-white rounded-[40px] shadow-2xl shadow-orange-500/5 border border-orange-100 p-8 md:p-12 z-10"
            >
                <div className="text-center mb-10">
                    <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg shadow-orange-200 mx-auto mb-6">M</div>
                    <h2 className="text-3xl font-black text-stone-900 tracking-tight">Créer un compte</h2>
                    <p className="text-stone-500 mt-2 font-medium">Rejoignez la communauté Mines Vision.</p>
                </div>

                <form className="space-y-5" onSubmit={submit}>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">Nom complet</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                            <input 
                                type="text" 
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="John Doe" 
                                required
                                className="w-full bg-stone-50 border border-stone-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 transition-all text-stone-800 font-medium" 
                            />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs font-semibold ml-1">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                            <input 
                                type="email" 
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                placeholder="votre@email.com" 
                                required
                                className="w-full bg-stone-50 border border-stone-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 transition-all text-stone-800 font-medium" 
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs font-semibold ml-1">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">Mot de passe</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                            <input 
                                type={showPassword ? "text" : "password"} 
                                value={data.password}
                                onChange={e => {
                                    setData('password', e.target.value);
                                    // Laravel requiert confirmation par défaut
                                    setData('password_confirmation', e.target.value);
                                }}
                                placeholder="••••••••" 
                                required
                                className="w-full bg-stone-50 border border-stone-100 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 transition-all text-stone-800 font-medium" 
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs font-semibold ml-1">{errors.password}</p>}
                    </div>

                    <button 
                        disabled={processing}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 mt-4 group disabled:opacity-50"
                    >
                        {processing ? 'Création...' : 'Créer mon compte'} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <p className="text-center mt-10 text-stone-500 text-sm font-medium">
                    Déjà inscrit ?
                    <Link href="/login" className="ml-2 text-orange-500 font-black hover:underline">Se connecter</Link>
                </p>
            </motion.div>
        </div>
    );
}