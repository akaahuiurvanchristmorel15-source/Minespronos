import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Copy, Check } from 'lucide-react';
import { useForm, Link, Head, router } from '@inertiajs/react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        password: '',
        password_confirmation: '',
    });

    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [generatedId, setGeneratedId] = useState('');
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        if (!generatedId) return;
        navigator.clipboard.writeText(generatedId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register', {
            onSuccess: (page) => {
                // On récupère le compte généré depuis les props auth de la nouvelle page (dashboard)
                const user = (page.props.auth as any)?.user;
                if (user?.account_number) {
                    setGeneratedId(user.account_number);
                    setRegistrationSuccess(true);
                }
            }
        });
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

            {/* ── Modal de succès avec ID ───────────────────────── */}
            {registrationSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-stone-950/60 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-[400px] bg-white rounded-[40px] shadow-2xl p-8 md:p-10 text-center"
                    >
                        <div className="w-20 h-20 bg-orange-500 rounded-[30px] flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-orange-500/20">
                            <Lock size={40} />
                        </div>
                        <h3 className="text-3xl font-black text-stone-900 mb-4">Bienvenue !</h3>
                        <p className="text-stone-500 font-medium mb-8 leading-relaxed">
                            Votre compte a été créé avec succès. Voici votre numéro de compte unique pour vous connecter :
                        </p>
                        
                        <div className="bg-stone-50 border-2 border-dashed border-orange-200 rounded-3xl p-6 mb-8 relative group">
                            <p className="text-xs font-black text-orange-500 uppercase tracking-[0.2em] mb-2">Numéro de compte</p>
                            <p className="text-3xl font-black text-stone-900 font-mono tracking-[0.3em] mb-4">{generatedId}</p>
                            
                            <button 
                                onClick={copyToClipboard}
                                className="flex items-center gap-2 mx-auto bg-white border border-stone-100 shadow-sm px-4 py-2 rounded-xl text-stone-600 hover:text-orange-500 hover:border-orange-200 transition-all active:scale-95"
                            >
                                {copied ? (
                                    <><Check size={16} className="text-green-500" /> <span className="text-xs font-bold uppercase">Copié !</span></>
                                ) : (
                                    <><Copy size={16} /> <span className="text-xs font-bold uppercase">Copier</span></>
                                )}
                            </button>
                        </div>

                        <p className="text-stone-400 text-xs font-bold uppercase mb-8 italic">⚠️ Notez-le bien, il est indispensable pour vos futures connexions.</p>

                        <button 
                            onClick={() => router.post('/logout')}
                            className="w-full bg-stone-900 hover:bg-stone-800 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-stone-900/20 block"
                        >
                            Aller à la Connexion
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
}