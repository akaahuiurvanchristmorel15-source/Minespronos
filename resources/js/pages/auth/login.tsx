import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Eye, EyeOff, Hash, Mail, Shield, User } from 'lucide-react';
import { useForm, Head } from '@inertiajs/react';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isAdminLogin, setIsAdminLogin] = useState(false);
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        account_number: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    const toggleMode = () => {
        setIsAdminLogin(!isAdminLogin);
        setData('account_number', '');
        clearErrors();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFDFB] p-6 selection:bg-orange-200 selection:text-orange-900 bg-gradient-to-b from-orange-50/50 to-transparent">
            <Head title="Se connecter" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[450px] bg-white rounded-[40px] shadow-2xl shadow-orange-500/5 border border-orange-100 p-8 md:p-12 z-10"
            >
                <div className="text-center mb-10">
                    <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg shadow-orange-200 mx-auto mb-6">M</div>
                    <h2 className="text-3xl font-black text-stone-900 tracking-tight">Bon retour</h2>
                    <p className="text-stone-500 mt-2 font-medium">
                        {isAdminLogin ? "Connexion sécurisée pour les administrateurs." : "Connectez-vous avec votre numéro de compte."}
                    </p>
                </div>

                <form className="space-y-5" onSubmit={submit}>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">
                            {isAdminLogin ? "Email administrateur" : "Numéro de compte"}
                        </label>
                        <div className="relative group">
                            {isAdminLogin ? (
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                            ) : (
                                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                            )}
                            <input
                                type={isAdminLogin ? "email" : "text"}
                                inputMode={isAdminLogin ? "email" : "numeric"}
                                maxLength={isAdminLogin ? undefined : 12}
                                value={data.account_number}
                                onChange={e => {
                                    if (isAdminLogin) {
                                        setData('account_number', e.target.value);
                                    } else {
                                        setData('account_number', e.target.value.replace(/\D/g, '').slice(0, 12));
                                    }
                                }}
                                placeholder={isAdminLogin ? "admin@example.com" : "000000000000"}
                                required
                                className={`w-full bg-stone-50 border border-stone-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/5 transition-all text-stone-800 ${isAdminLogin ? 'font-medium' : 'font-mono text-lg tracking-widest'}`}
                            />
                        </div>
                        {errors.account_number && <p className="text-red-500 text-xs font-semibold ml-1">{errors.account_number}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-stone-400 ml-1">Mot de passe</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
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

                    <div className="flex items-center ml-1 mt-2">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="w-4 h-4 text-orange-500 bg-stone-50 border-stone-200 rounded focus:ring-orange-500"
                        />
                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-stone-500">
                            Se souvenir de moi
                        </label>
                    </div>

                    <button
                        disabled={processing}
                        className={`w-full ${isAdminLogin ? 'bg-stone-900 hover:bg-stone-800 shadow-stone-900/20' : 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20'} text-white font-black py-4 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2 mt-4 group disabled:opacity-50`}
                    >
                        {processing ? 'Connexion...' : 'Se connecter'} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button
                        type="button"
                        onClick={toggleMode}
                        className="inline-flex items-center justify-center gap-2 text-sm font-bold text-stone-400 hover:text-stone-700 transition-colors"
                    >
                        {isAdminLogin ? (
                            <><User size={16} /> Retour à la connexion utilisateur</>
                        ) : (
                            <><Shield size={16} /> Je suis administrateur</>
                        )}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
