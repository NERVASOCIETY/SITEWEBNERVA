/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Flame, 
  Briefcase,
  Award,
  Linkedin,
  ExternalLink,
  Cpu,
  Globe2,
  TrendingUp,
  LineChart,
  Code2,
  RefreshCw,
  Zap,
  Terminal,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { PageId } from '../types';
import { motion, AnimatePresence } from 'motion/react';

import mourtalaImg from '../assets/images/talla-1.jpg';
import seidouImg from '../assets/images/sei-1.jpg';
import abdoulayeImg from '../assets/images/laye-1.jpg';
import youKnowImg from '../assets/images/youknow-1.jpg';

interface AProposProps {
  onNavigate: (pageId: PageId) => void;
}

export const APropos: React.FC<AProposProps> = ({ onNavigate }) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [activeStatTab, setActiveStatTab] = useState<'nerve' | 'telemetry'>('nerve');
  const [timeState, setTimeState] = useState<string>('');

  // Local clock to show realtime telemetry matching Senegal time (UTC)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeState(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const teamData = [
    {
      name: 'Mourtala GUEYE',
      role: 'Développeur Mobile',
      desc: 'Architecte spécialiste du développement cross-platform iOS & Android. Conçoit des applications mobiles fluides, réactives et sécurisées, connectées aux passerelles de paiement locales.',
      tag: 'Pôle Mobile',
      avatarLetters: 'MG',
      image: mourtalaImg,
      linkedin: 'https://www.linkedin.com/in/mourtala-gueye-nerva',
      portfolio: 'https://mourtala-gueye.dev',
      stats: { mobile: 98, localPay: 95, speed: 96, design: 92 }
    },
    {
      name: 'Seidou MANGANE',
      role: 'Développeur Fullstack',
      desc: 'Expert en ingénierie logicielle globale, APIs robustes et intégrations système complexes. Maîtrise toute la chaîne de production du front-end au serveur.',
      tag: 'Pôle Engineering',
      avatarLetters: 'SM',
      image: seidouImg,
      linkedin: 'https://www.linkedin.com/in/seidou-mangane-nerva',
      portfolio: 'https://seidou-mangane.dev',
      stats: { backEnd: 99, cloudNative: 94, postgres: 97, optimization: 95 }
    },
    {
      name: 'Abdoulaye SALL',
      role: 'Gestionnaire de Base de Données',
      desc: "Architecte de l'intégrité et de la haute performance des flux d'informations. Expert en bases de données SQL/NoSQL pour des services applicatifs hôteliers et de facturation.",
      tag: 'Pôle Data',
      avatarLetters: 'AS',
      image: abdoulayeImg,
      linkedin: 'https://www.linkedin.com/in/abdoulaye-sall-nerva',
      portfolio: 'https://abdoulaye-sall.dev',
      stats: { dbArch: 98, ddlDml: 96, latency: 99, replication: 94 }
    },
    {
      name: 'You KNOW',
      role: 'Responsable Technique Web',
      desc: "Pilote stratégique des architectures web d'impact. Garant de la robustesse des solutions SaaS, du SEO avancé, des performances d'affichage et de l'intégration technique.",
      tag: 'Direction Web',
      avatarLetters: 'YK',
      image: youKnowImg,
      linkedin: 'www.linkedin.com/in/mamadon-d-b05681367',
      portfolio: 'https://mamadou-diop.dev',
      stats: { webEngine: 99, cloudDeploy: 96, seoTech: 95, response: 97 }
    }
  ];

  const faqData = [
    {
      q: 'Quels types de sites web concevez-vous pour les entreprises du Sénégal ?',
      a: 'Nous programmons des sites vitrines modernes pour valoriser votre établissement, mais également des sites de vente en ligne (e-commerce) et des solutions métier très spécifiques : comme les moteurs de réservation directe pour hôtels ne prélevant aucune commission.'
    },
    {
      q: "Est-il possible d'intégrer Wave et Orange Money comme moyens de paiement ?",
      a: "Absolument ! C'est l'une de nos grandes spécialités. Nous connectons directement vos comptes marchands officiels Wave ou Orange Money (via API ou webpay sécurisé) pour que vos clients puissent réserver et acheter leurs produits d'un simple clic en toute conformité (Sénégal et Côte d'Ivoire)."
    },
    {
      q: "Prenez-vous en charge le nom de domaine internet (.sn) et l'hébergement ?",
      a: "Oui. De l'enregistrement réglementaire auprès de l'autorité de régulation nationale (.sn) ou d'extensions mondiales (.com, .net, .org) jusqu'au déploiement sur serveurs cloud optimisés haut débit, nous nous occupons de l'ensemble de l'infrastructure."
    },
    {
      q: 'Puis-je commander uniquement de la conception d\'affiches ou un CV ?',
      a: 'Tout à fait. Nos prestations sont entièrement modulaires comme illustré sur notre flyer officiel. Pour les candidats, notre pôle CV élabore des mises en pages haut de gamme de standard international qui doublent vos taux de rappel par les départements RH.'
    }
  ];

  const toggleFAQ = (idx: number) => {
    setOpenFAQ(openFAQ === idx ? null : idx);
  };

  // SVG dynamic nodes background helper
  const renderFloatingNodes = () => {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 overflow-hidden" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cyberLineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#2563eb" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Intricated node paths reproducing flyer tech map */}
        <motion.path 
          d="M 100 200 L 400 150 L 500 400 L 900 350 L 1200 600" 
          fill="none" 
          stroke="url(#cyberLineGlow)" 
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.path 
          d="M 50 630 L 300 700 L 700 500 L 1100 800" 
          fill="none" 
          stroke="url(#cyberLineGlow)" 
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5, delay: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />

        {/* Pulsating network junctions */}
        {[
          { x: 100, y: 200, delay: 0 },
          { x: 400, y: 150, delay: 0.8 },
          { x: 500, y: 400, delay: 1.5 },
          { x: 900, y: 350, delay: 0.3 },
          { x: 1200, y: 600, delay: 2 },
          { x: 300, y: 700, delay: 1.2 },
          { x: 700, y: 500, delay: 2.5 }
        ].map((node, nIdx) => (
          <g key={nIdx}>
            <circle cx={node.x} cy={node.y} r="3" fill="#06b6d4" />
            <motion.circle 
              cx={node.x} 
              cy={node.y} 
              r="12" 
              fill="none" 
              stroke="#06b6d4" 
              strokeWidth="1"
              initial={{ scale: 0.3, opacity: 0.8 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 2.4, delay: node.delay, repeat: Infinity, ease: "easeOut" }}
            />
          </g>
        ))}
      </svg>
    );
  };

  return (
    <div className="w-full bg-[#030a1c] text-slate-100 min-h-screen py-10 md:py-20 font-sans relative overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Decorative cyber backdrop highlights */}
      <div className="absolute top-[-250px] right-[-10%) w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-150px] left-[-5%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[35%] left-[45%] w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Cyber floating map */}
      {renderFloatingNodes()}

      {/* Realtime Telemetry Grid Widget at the very top */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-4 flex justify-between items-center text-[10px] uppercase font-mono tracking-widest text-[#00A3E0]/70">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span>NERVA CORE V1.4 // LIVE</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>PORTAL_ACTIVE: DA_0x77F</span>
          <span className="text-cyan-400 font-bold">{timeState}</span>
        </div>
      </div>

      {/* Section 1: Hero Header Description */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-16 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="border-l-2 border-cyan-400 pl-4 md:pl-8 max-w-4xl"
        >
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2">
            <Cpu size={14} className="animate-spin text-cyan-400 [animation-duration:8s]" />
            <span>Qui est Nerva ? // Profil & ADN technologique</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-400 leading-tight">
            NOTRE SYNERGIE.<br />
            <span className="text-cyan-400">VOTRE RÉUSSITE.</span>
          </h1>
          
          <p className="text-slate-400 text-xs sm:text-sm md:text-base mt-4 max-w-2xl leading-relaxed">
            Nous sommes un collectif sénégalais de développeurs passionnés, d'architectes et de designers spécialisés dans la numérisation complète, combinant robustesse technique et designs futuristes saisissants.
          </p>
        </motion.div>
      </div>

      {/* Section 2: Split Cyber Editorial Block & Bento HUD Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-24 z-10 relative">
        
        {/* Left column: Editorial Manifest text with integrated glow brackets */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 flex flex-col justify-between space-y-8 bg-slate-900/40 border border-slate-800/80 p-6 md:p-8 rounded-2xl backdrop-blur-md relative overflow-hidden"
        >
          {/* Diagnostic background accent */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/5 to-transparent pointer-events-none" />

          <div className="space-y-4">
            <span className="text-cyan-400 text-xs font-mono font-bold tracking-widest block uppercase">// ACCÉLÉRATION DE L'AFRIQUE DE L'OUEST</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
              Démocratiser la programmation haut de gamme et sans frontières
            </h2>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
              De Dakar au reste du monde hôtelier et entrepreneurial, <strong>NERVA</strong> est née d'un constat : les organisations locales méritent d'exposer leur superbe valeur sans être bridées par des solutions obsolètes ou des intermédiaires gourmands en commissions. 
            </p>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
              Nous injectons du code de pointe pour moderniser et sécuriser vos workflows. Que ce soit à travers des intégrations de passerelles de paiement locales en temps réel (<strong>Wave, Orange Money</strong>), de la planification d'infrastructure, ou de la modélisation visuelle immersive.
            </p>
          </div>

          {/* Interactive micro value checklist (Hover triggers specific cyan focus feedback) */}
          <div className="border-t border-slate-800/80 pt-6 space-y-4">
            <span className="text-[10px] font-mono uppercase text-slate-500 tracking-widest">// Charte d'Excellence Interactive</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Zéro Commission", desc: "Propriétaire exclusif de vos bénéfices" },
                { title: "Design Cyber-Ultra", desc: "Aura futuriste & modernité d'impact" },
                { title: "Code d'Architecte", desc: "Temps d'affichage record & SEO blindé" },
                { title: "Agilité Terrain", desc: "Soutien local direct à Dakar & régions" }
              ].map((val, vIdx) => (
                <motion.div 
                  key={vIdx}
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-2.5 p-2 rounded hover:bg-cyan-500/5 transition-colors group cursor-default"
                >
                  <div className="w-5 h-5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-cyan-400/60 transition-colors">
                    <CheckCircle size={10} className="text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-white group-hover:text-cyan-400 transition-colors">{val.title}</h4>
                    <p className="text-[10px] text-slate-500">{val.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right column: The interactive Cyber-Metric Terminal */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex flex-col justify-between bg-[#050e24] border border-cyan-500/20 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.05)]"
        >
          {/* Laser Scanner animation effect line */}
          <motion.div 
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(6,182,212,0.8)] z-20 pointer-events-none"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-500/10 pb-4">
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-cyan-400 animate-pulse" />
                <span className="text-xs font-mono font-black uppercase tracking-widest text-cyan-400">TELEMETRY_DATAFEED</span>
              </div>
              <div className="flex gap-1.5">
                <button 
                  onClick={() => setActiveStatTab('nerve')}
                  className={`px-2.5 py-1 rounded text-[9px] font-mono border uppercase tracking-wider transition-all cursor-pointer ${activeStatTab === 'nerve' ? 'bg-cyan-950 text-cyan-400 border-cyan-500/40' : 'bg-slate-900/50 text-slate-500 border-transparent hover:text-slate-350'}`}
                >
                  Système
                </button>
                <button 
                  onClick={() => setActiveStatTab('telemetry')}
                  className={`px-2.5 py-1 rounded text-[9px] font-mono border uppercase tracking-wider transition-all cursor-pointer ${activeStatTab === 'telemetry' ? 'bg-cyan-950 text-cyan-400 border-cyan-500/40' : 'bg-slate-900/50 text-slate-500 border-transparent hover:text-slate-350'}`}
                >
                  Logs
                </button>
              </div>
            </div>

            <AnimatePresence mode="out-in">
              {activeStatTab === 'nerve' ? (
                <motion.div 
                  key="nerve"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 pt-2"
                >
                  <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                    // Nerva orchestre l'ensemble de la conception numérique. Vous trouverez ci-dessous les données moyennes des interfaces sous notre pavillon :
                  </p>

                  <div className="grid grid-cols-2 gap-3 font-mono">
                    <div className="bg-slate-950/60 p-3 rounded border border-slate-800 hover:border-cyan-500/30 transition-colors">
                      <span className="text-[9px] text-slate-500 block uppercase tracking-widest">Temps de réponse de base</span>
                      <span className="text-lg font-black text-cyan-400">&lt;15ms</span>
                    </div>
                    <div className="bg-slate-950/60 p-3 rounded border border-slate-800 hover:border-cyan-500/30 transition-colors">
                      <span className="text-[9px] text-slate-500 block uppercase tracking-widest">Souveraineté Géographique</span>
                      <span className="text-lg font-black text-white">100% .SN</span>
                    </div>
                    <div className="bg-slate-950/60 p-3 rounded border border-slate-800 hover:border-cyan-500/30 transition-colors">
                      <span className="text-[9px] text-slate-500 block uppercase tracking-widest">Taux de Commission tierce</span>
                      <span className="text-lg font-black text-emerald-400">0% HT</span>
                    </div>
                    <div className="bg-slate-950/60 p-3 rounded border border-slate-800 hover:border-cyan-500/30 transition-colors">
                      <span className="text-[9px] text-slate-500 block uppercase tracking-widest">Fiabilité d'Hébergement</span>
                      <span className="text-lg font-black text-cyan-400">99.99%</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="telemetry"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-mono text-[10px] text-cyan-200/80 space-y-2 pt-2 h-[178px] overflow-y-auto bg-slate-950/80 p-3.5 rounded border border-slate-900/90"
                >
                  <p className="text-slate-500">// Terminal local active stream</p>
                  <div>&gt; Loading team_nerva_assets... OK</div>
                  <div>&gt; Host context binding "http://0.0.0.0:3000"</div>
                  <div>&gt; Supabase project bound successfully.</div>
                  <div className="text-emerald-400 animate-pulse">&gt; Wave integration framework connected. SECURE</div>
                  <div>&gt; Orange Money core API connection established.</div>
                  <div className="text-cyan-400">&gt; Frame buffer rendering complete (0.33ms)</div>
                  <p className="text-slate-500">// Fin de transmission.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border-t border-slate-900 pt-5 mt-4 text-center">
            <span className="text-[10px] font-mono tracking-widest text-[#00A3E0]/60 block">// SIGNATURE CORPORATE</span>
            <p className="text-xs italic text-cyan-400/90 mt-1 uppercase font-bold tracking-tight">
              "Votre vision, Notre expertise, Votre réussite."
            </p>
          </div>
        </motion.div>

      </div>

      {/* Section 3: THE TEAM MATRIX OF CORES */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 border-t border-slate-900 relative">
        <div className="text-center max-w-2xl mx-auto mb-16 relative">
          <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          <span className="text-[#00A3E0] text-xs font-mono font-extrabold uppercase tracking-widest block mb-2">// L'INTELLIGENCE OPÉRATIONNELLE</span>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">LES PILOTES DU DISPOSITIF</h2>
          <p className="text-slate-400 text-xs mt-2 leading-relaxed">
            Chaque pôle est architecturé par un spécialiste de premier plan dédié à façonner un écosystème hautement performant.
          </p>
        </div>

        {/* Outer Team Grid holding dynamic elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {teamData.map((member, idx) => {
            const isHovered = hoveredMember === idx;

            return (
              <motion.div 
                key={idx} 
                onMouseEnter={() => setHoveredMember(idx)}
                onMouseLeave={() => setHoveredMember(null)}
                whileHover={{ y: -8 }}
                className="bg-[#050e24]/75 border border-slate-800 rounded-xl p-5 hover:border-cyan-500/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all flex flex-col justify-between h-full relative group overflow-hidden"
              >
                {/* Horizontal high-tech ambient glow strip across hovered card */}
                {isHovered && (
                  <motion.div 
                    layoutId="glowingStrip"
                    className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_1px_10px_#06b6d4]"
                  />
                )}

                <div className="space-y-4">
                  
                  {/* High Quality Portrait/Fallback with elegant vertical rectangular frame */}
                  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-slate-800 bg-[#020714] shadow-[0_10px_30px_rgba(0,0,0,0.6)] group-hover:border-cyan-500/50 transition-colors duration-300 z-10">
                    {/* Glowing ring/outline layer on hover */}
                    <div className={`absolute inset-0 border-2 border-cyan-500/35 rounded-xl transition-all duration-300 pointer-events-none z-20 ${isHovered ? 'opacity-100 scale-[1.01]' : 'opacity-0 scale-100'}`} />
                    
                    {/* High-tech scanner laser effect line on hover */}
                    {isHovered && (
                      <motion.div 
                        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_rgba(6,182,212,0.8)] z-30 pointer-events-none"
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}

                    {member.image ? (
                      <div className="w-full h-full relative">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Elegant dark ambient shadow fade on the portrait */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050e24] via-transparent to-transparent opacity-80 z-10" />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-slate-950 text-cyan-400 font-mono font-bold text-3xl flex items-center justify-center border border-cyan-500/20">
                        {member.avatarLetters}
                      </div>
                    )}
                  </div>

                  {/* Header identity with high-tech badge above name */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex">
                      <span className="bg-cyan-950/80 text-cyan-400 text-[8.5px] font-mono font-black tracking-widest uppercase px-2.5 py-1 rounded border border-cyan-500/30 shadow-[0_2px_8px_rgba(6,182,212,0.05)]">
                        {member.tag}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-white text-base group-hover:text-cyan-300 transition-colors uppercase tracking-tight">{member.name}</h3>
                    <p className="text-xs text-cyan-400 font-mono font-bold uppercase">{member.role}</p>
                  </div>

                  {/* Text Description / Stats Flip Panel */}
                  <div className="relative min-h-[110px] overflow-hidden">
                    <AnimatePresence mode="out-in">
                      {!isHovered ? (
                        <motion.p 
                          key="text"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-xs text-slate-400 leading-relaxed font-sans"
                        >
                          {member.desc}
                        </motion.p>
                      ) : (
                        <motion.div 
                          key="stats"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          className="font-mono text-[9.5px] text-cyan-200/90 space-y-2 bg-slate-950/80 p-3 rounded-lg border border-cyan-500/10"
                        >
                          <div className="text-slate-500 uppercase tracking-widest border-b border-slate-900 pb-1 font-bold flex items-center gap-1.5 justify-between">
                            <span>// CHARGEMENT HUD</span>
                            <span className="text-[7.5px] text-cyan-500 animate-pulse">OPTIMIZED</span>
                          </div>
                          {Object.entries(member.stats).map(([key, val], sIdx) => (
                            <div key={sIdx} className="space-y-0.5">
                              <div className="flex justify-between">
                                <span className="uppercase tracking-wide text-slate-400">{key}</span>
                                <span className="text-cyan-400 font-bold">{val}%</span>
                              </div>
                              <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${val}%` }}
                                  transition={{ duration: 0.8, ease: "easeOut" }}
                                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" 
                                />
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>

                {/* Footer and dynamic interactive social anchors */}
                <div className="mt-8 pt-3 border-t border-slate-900 flex items-center justify-between gap-2 text-[10.5px] font-mono font-bold text-slate-400">
                  {member.portfolio ? (
                    <a
                      href={member.portfolio.startsWith('http') ? member.portfolio : `https://${member.portfolio}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-cyan-400 hover:text-white transition-all bg-cyan-950/50 hover:bg-cyan-900 border border-cyan-500/20 px-2.5 py-1 rounded-md"
                      title={`Visiter le portfolio de ${member.name}`}
                    >
                      <ExternalLink size={10} className="shrink-0 text-cyan-400" />
                      <span>Portfolio</span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <MapPin size={10} className="text-cyan-400" />
                      <span>Dakar-SN</span>
                    </div>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin.startsWith('http') ? member.linkedin : `https://${member.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-blue-400 hover:text-white transition-all bg-blue-950/50 hover:bg-blue-900 border border-blue-500/20 px-2.5 py-1 rounded-md"
                      title={`Visiter le profil LinkedIn de ${member.name}`}
                    >
                      <Linkedin size={10} className="shrink-0 text-blue-400" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Section 4: LES QUESTIONS FRÉQUENTES DES HÔTELS ET ENTREPRISES (ACCORDEON SLA) */}
      <div className="max-w-4xl mx-auto px-4 mt-20 z-10 relative" id="faq-section">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-6 md:p-8 bg-[#050e24]/85 border border-slate-800 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-md relative"
        >
          {/* Cyber accents corners */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400 rounded-tl" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400 rounded-tr" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400 rounded-bl" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400 rounded-br" />

          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="text-cyan-400 w-6 h-6 shrink-0" />
            <div className="leading-tight">
              <span className="text-[9.5px] font-mono uppercase text-cyan-400 block tracking-widest">// FAQ & TRANSPARENCE</span>
              <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-tight">FOIRE AUX QUESTIONS HAUT DE GAMME</h2>
            </div>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, fIdx) => {
              const isOpen = openFAQ === fIdx;
              return (
                <div 
                  key={fIdx} 
                  className="border border-slate-900 rounded-xl overflow-hidden transition-all bg-slate-950/60 hover:border-cyan-500/20"
                >
                  
                  {/* Header/Question Trigger button */}
                  <button
                    onClick={() => toggleFAQ(fIdx)}
                    className="w-full p-4.5 text-left font-bold text-white text-xs md:text-sm flex justify-between items-center bg-slate-950/40 hover:bg-slate-900/40 transition-colors cursor-pointer select-none"
                  >
                    <span className="pr-4 leading-normal flex items-center gap-3">
                      <span className={`w-1.5 h-1.5 rounded-full transition-all ${isOpen ? 'bg-cyan-400 shadow-[0_0_8px_#06b6d4]' : 'bg-slate-700'}`} />
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp size={14} className="text-cyan-400 shrink-0" />
                    ) : (
                      <ChevronDown size={14} className="text-slate-500 shrink-0" />
                    )}
                  </button>

                  {/* Content block with smooth height motion */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-4.5 bg-slate-950/90 border-t border-slate-900 font-sans text-xs md:text-sm text-slate-450 leading-relaxed text-slate-400">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="text-xs font-mono font-bold text-white">Vous souhaitez concrétiser votre diagnostic ?</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Notre équipe basée au Sénégal vous répond instantanément en moins de 2 heures.</p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white font-mono font-black text-[11px] uppercase tracking-wider rounded-lg flex items-center gap-2 transition-all cursor-pointer shadow-[0_4px_15px_rgba(6,182,212,0.2)]"
            >
              Initier une discussion
              <ArrowRight size={13} className="text-white shrink-0" />
            </button>
          </div>

        </motion.div>

      </div>

    </div>
  );
};

export default APropos;
