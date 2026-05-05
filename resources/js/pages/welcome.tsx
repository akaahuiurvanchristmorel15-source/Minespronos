import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    ShieldCheck, Zap, Menu, Facebook, Twitter,
    Instagram, Mail, ArrowRight, MousePointer2,
    Smartphone, ChevronRight
} from 'lucide-react';

// --- COMPOSANT HEADER (Version Claire) ---
const Header = ({ auth }: { auth: any }) => (
    <nav className="fixed top-0 w-full z-50 border-b border-orange-100 bg-white/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-black text-white shadow-lg shadow-orange-200">M</div>
                <span className="text-xl font-bold tracking-tighter uppercase text-stone-800">Mines <span className="text-orange-500">Vision</span></span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-stone-500">
                <a href="#features" className="hover:text-orange-600 transition-colors">Fonctionnalités</a>
                <a href="#pricing" className="hover:text-orange-600 transition-colors">Tarifs</a>
                <a href="#" className="hover:text-orange-600 transition-colors">Aide</a>
            </div>
            <div className="flex items-center gap-4">
                {auth.user ? (
                    <Link href="/dashboard" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md shadow-orange-100">
                        Dashboard
                    </Link>
                ) : (
                    <Link href="/login" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md shadow-orange-100">
                        Se connecter
                    </Link>
                )}
            </div>
        </div>
    </nav>
);

// --- COMPOSANT FOOTER (Version Chaude) ---
const Footer = () => (
    <footer className="bg-stone-50 border-t border-orange-100 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-black text-white">M</div>
                        <span className="text-xl font-bold tracking-tighter uppercase text-stone-800">Mines Vision</span>
                    </div>
                    <p className="text-stone-500 text-sm leading-relaxed">
                        L'analyse prédictive nouvelle génération. Simple, clair et performant pour vos sessions de jeu.
                    </p>
                </div>
                <div>
                    <h4 className="text-stone-800 font-bold mb-6 uppercase text-xs tracking-widest">Navigation</h4>
                    <ul className="space-y-4 text-sm text-stone-500 font-medium">
                        <li><a href="#" className="hover:text-orange-600 transition-colors">Dashboard</a></li>
                        <li><a href="#" className="hover:text-orange-600 transition-colors">Historique</a></li>
                        <li><a href="#" className="hover:text-orange-600 transition-colors">Affiliation</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-stone-800 font-bold mb-6 uppercase text-xs tracking-widest">Légal</h4>
                    <ul className="space-y-4 text-sm text-stone-500 font-medium">
                        <li><a href="#" className="hover:text-orange-600">Conditions</a></li>
                        <li><a href="#" className="hover:text-orange-600">Confidentialité</a></li>
                        <li><a href="#" className="hover:text-orange-600 flex items-center gap-2">Statut <div className="w-2 h-2 bg-green-500 rounded-full" /></a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-stone-800 font-bold mb-6 uppercase text-xs tracking-widest">Newsletter</h4>
                    <div className="relative">
                        <input type="email" placeholder="Email" className="w-full bg-white border border-orange-100 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none" />
                        <button className="absolute right-2 top-2 p-1.5 bg-orange-500 text-white rounded-lg shadow-sm"><Mail size={16} /></button>
                    </div>
                </div>
            </div>
            <div className="pt-8 border-t border-orange-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-stone-400 text-[10px] uppercase tracking-widest text-center md:text-left">
                    Jouez de manière responsable. Mines Vision est un simulateur statistique.
                </p>
                <div className="text-stone-400 text-xs font-medium">© 2026 Mines Vision. Fait avec passion.</div>
            </div>
        </div>
    </footer>
);

export default function WelcomePage() {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const { auth } = usePage().props as any;

    const features = [
        { icon: <Zap />, title: "Analyse Live", desc: "Des prédictions basées sur des algorithmes de probabilités chauds." },
        { icon: <ShieldCheck />, title: "Transactions Safe", desc: "Paiements sécurisés via Mobile Money sans tracas." },
        { icon: <Smartphone />, title: "Design Épuré", desc: "Une interface claire pensée pour le confort visuel prolongé." },
    ];

    return (
        <div className="bg-[#FFFDFB] text-stone-800 selection:bg-orange-200 selection:text-orange-900">
            <Header auth={auth} />

            {/* Hero Section */}
            <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-gradient-to-b from-orange-50/50 to-transparent">
                <motion.div style={{ opacity }} className="text-center z-10">

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-stone-900 leading-[0.9]">
                        DOMINEZ LE <br /> <span className="text-orange-500">TERRAIN.</span>
                    </h1>
                    <p className="text-stone-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
                        Visualisez les probabilités comme jamais auparavant. Une interface claire pour des décisions brillantes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={auth.user ? "/dashboard" : "/login"} className="bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-10 rounded-2xl transition-all flex items-center justify-center gap-2 group text-lg shadow-xl shadow-orange-500/20">
                            Se connecter <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="#pricing" className="bg-white border border-orange-200 hover:bg-orange-50 text-stone-700 py-4 px-10 rounded-2xl font-bold transition-all shadow-sm flex items-center justify-center">
                            Tarifs & Crédits
                        </a>
                    </div>
                </motion.div>

                {/* Effets de lumière chaude */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-200/20 blur-[120px] rounded-full pointer-events-none" />

                <motion.div
                    animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 text-orange-300"
                >
                    <MousePointer2 size={24} />
                </motion.div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="p-10 rounded-[32px] bg-white border border-stone-100 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/5 transition-all group"
                        >
                            <div className="mb-6 p-4 bg-orange-50 text-orange-500 w-fit rounded-2xl group-hover:scale-110 transition-transform">
                                {f.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-stone-900">{f.title}</h3>
                            <p className="text-stone-500 leading-relaxed font-medium">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Pricing Section (Version Claire & Chaude) */}
            <section id="pricing" className="py-32 px-6 bg-stone-50/50">
                <div className="max-w-xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="p-12 rounded-[48px] border-2 border-orange-500 bg-white shadow-2xl shadow-orange-500/10 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 bg-orange-500 text-white px-6 py-2 rounded-bl-2xl font-black text-xs uppercase">
                            Plus Populaire
                        </div>
                        <h2 className="text-xl font-bold mb-6 text-stone-500 uppercase tracking-widest">Pack Essentiel</h2>
                        <div className="flex items-baseline justify-center gap-2 mb-10">
                            <span className="text-7xl font-black text-stone-900">2000</span>
                            <span className="text-2xl font-bold text-orange-500">FCFA</span>
                        </div>

                        <ul className="text-left space-y-4 mb-10 max-w-[240px] mx-auto">
                            <li className="flex items-center gap-3 text-stone-600 font-bold">
                                <ChevronRight size={18} className="text-orange-500" /> 20 Utilisations
                            </li>
                            <li className="flex items-center gap-3 text-stone-600 font-bold">
                                <ChevronRight size={18} className="text-orange-500" /> Grille Interactive
                            </li>
                            <li className="flex items-center gap-3 text-stone-600 font-bold">
                                <ChevronRight size={18} className="text-orange-500" /> Support Premium
                            </li>
                        </ul>

                        <Link href="/login" className="w-full bg-orange-500 text-white font-black py-5 rounded-2xl hover:bg-orange-600 transition-all text-lg shadow-lg shadow-orange-500/30 inline-block text-center mt-6">
                            SE CONNECTER MAINTENANT
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}