/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowRight, 
  Layers, 
  UserCheck, 
  ShieldCheck, 
  TrendingUp, 
  Cpu, 
  MapPin, 
  Phone, 
  Mail, 
  Sparkles,
  Laptop,
  CheckCircle2,
  Code
} from 'lucide-react';
import { PageId } from '../types';

interface AccueilProps {
  onNavigate: (pageId: PageId, options?: { serviceTab?: number; contactService?: string }) => void;
}

export const Accueil: React.FC<AccueilProps> = ({ onNavigate }) => {
  // Mini Project Planner State
  const [selectedCategory, setSelectedCategory] = useState<string>('web');
  const [projectSize, setProjectSize] = useState<'petite' | 'moyenne' | 'grande'>('moyenne');

  // Dynamic blueprint generator data
  const getBlueprintDetails = () => {
    switch (selectedCategory) {
      case 'web':
        return {
          title: 'Site Web Optimisé',
          tech: ['React.js', 'Tailwind CSS', 'Vite', 'Node.js'],
          duration: projectSize === 'petite' ? '1-2 semaines' : projectSize === 'moyenne' ? '3-5 semaines' : '6-10 semaines',
          steps: ['Design UI/UX', 'Développement Responsive', 'Optimisation SEO Référencement', 'Mise en ligne & Hébergement'],
          accent: '#00A3E0'
        };
      case 'hotel':
        return {
          title: 'Système Hôtelier Intelligent',
          tech: ['Moteur de Réservation PMS', 'Paiement Wave/Orange Money', 'Dashboard Admin', 'Suivi de l\'Expérience Client'],
          duration: projectSize === 'petite' ? '2-3 semaines' : projectSize === 'moyenne' ? '4-7 semaines' : '8-12 semaines',
          steps: ['Audit de l\'établissement', 'Intégration du module de réservation', 'Configuration des passerelles locales', 'Formation des équipes hôtelières'],
          accent: '#10B981'
        };
      case 'design':
        return {
          title: 'Identité Visuelle & Affiches',
          tech: ['Adobe Suite', 'Vector Crafting', 'Brand Guidelines', 'Fichiers Haute Résolution'],
          duration: projectSize === 'petite' ? '3-5 jours' : projectSize === 'moyenne' ? '1-2 semaines' : '3 semaines',
          steps: ['Exploration créative & Moodboard', 'Conception des concepts', 'Révisions illimitées (Pack Premium)', 'Livraison tous formats (Web, Impression)'],
          accent: '#F59E0B'
        };
      case 'cv':
        return {
          title: 'CV Professionnel Premium',
          tech: ['Mise en page ATS-friendly', 'Rédaction copywriting moderne', 'Version PDF interactive', 'Code QR pour portfolio'],
          duration: projectSize === 'petite' ? '2 jours' : projectSize === 'moyenne' ? '4 jours' : '7 jours',
          steps: ['Analyse de votre parcours', 'Optimisation des mots-clés métiers', 'Design élégant & épuré', 'Version finale prête à l\'envoi'],
          accent: '#8B5CF6'
        };
      default:
        return {
          title: 'Solutions Informatiques Sur Mesure',
          tech: ['Infogérance', 'Cloud VPS Sénégal', 'Sécurité Réseau', 'Maintenance Applicative'],
          duration: 'Sur rendez-vous',
          steps: ['Audit d\'infrastructure', 'Proposition de plan de sécurisation', 'Déploiement solutions cloud', 'Support 24/7 de vos systèmes'],
          accent: '#00A3E0'
        };
    }
  };

  const blueprint = getBlueprintDetails();

  return (
    <div className="w-full relative overflow-hidden bg-slate-50 font-sans" id="accueil-page">
      
      {/* SECTION 1: HERO AVEC TRANSITION DIAGONALE (REPRÉSENTANT L'IMAGE DU LOGO ET DU FLYER) */}
      <div className="relative w-full min-h-[640px] md:min-h-[700px] bg-white flex flex-col justify-between overflow-hidden">
        
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-60 pointer-events-none" />

        {/* Diagonal Wave / Separator styling matching the flyer */}
        <div 
          className="absolute right-0 top-0 w-full lg:w-[50%] h-full bg-[#07152B] hidden lg:block z-10"
          style={{
            clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)'
          }}
        >
          {/* Subtle Cyber Grid in Right Dark area */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,163,224,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,163,224,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-50" />
          
          {/* Cyan Glow Arc representing the flyer's design swoops */}
          <div className="absolute top-0 bottom-0 left-[-4px] w-[8px] bg-gradient-to-b from-[#00A3E0] via-cyan-400 to-[#00A3E0] opacity-90 shadow-[0_0_20px_#00A3E0]" />
        </div>

        {/* Dynamic Mobile and Tablet background section */}
        <div className="absolute right-0 bottom-0 w-full h-[320px] bg-[#07152B] block lg:hidden z-10 border-t-4 border-[#00A3E0]">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(0,163,224,0.15)_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />
        </div>

        {/* Main Hero Container */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 md:space-y-8 animate-fade-in">
            
            {/* Senegal Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold w-fit">
              <span className="w-2 h-2 rounded-full bg-[#00A3E0] animate-pulse"></span>
              Sénégal & International • Solutions Sur Mesure
            </div>

            {/* Title from flyer */}
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                VOTRE VISION,<br />
                <span className="text-[#00A3E0] bg-clip-text">NOTRE EXPERTISE,</span><br />
                VOTRE RÉUSSITE.
              </h1>
              <p className="text-slate-600 text-lg md:text-xl max-w-xl font-medium mt-4">
                Nerva accompagne particuliers, entreprises et organisations au <span className="text-[#00A3E0] font-bold">Sénégal</span> avec des solutions digitales innovantes et sur mesure.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                id="btn-devis-hero"
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 bg-[#07152B] hover:bg-[#0c2850] text-white font-bold rounded-lg shadow-lg hover:shadow-cyan-500/10 border-b-4 border-[#00A3E0] transition-all flex items-center gap-2 cursor-pointer"
              >
                Parlons de votre projet
                <ArrowRight size={18} className="text-[#00A3E0]" />
              </button>
              <button 
                id="btn-services-hero"
                onClick={() => onNavigate('services')}
                className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg hover:shadow-md transition-all flex items-center gap-2 cursor-pointer border border-slate-300"
              >
                Voir nos services
              </button>
            </div>

            {/* Highlights from Flyer Footer */}
            <div className="grid grid-cols-2 gap-4 pt-6 max-w-lg border-t border-slate-200">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-[#00A3E0] mt-0.5 shrink-0" />
                <span className="text-sm font-semibold text-slate-700">Accompagnement de A à Z</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-[#00A3E0] mt-0.5 shrink-0" />
                <span className="text-sm font-semibold text-slate-700">Technologies Modernes</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-[#00A3E0] mt-0.5 shrink-0" />
                <span className="text-sm font-semibold text-slate-700">Paiements Locaux Intégrés</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-[#00A3E0] mt-0.5 shrink-0" />
                <span className="text-sm font-semibold text-slate-700">Support Client Réactif</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visuals - Interactive CSS/SVG replication of three developers collaborating on laptop */}
          <div className="lg:col-span-5 relative z-20 flex justify-center items-center h-[340px] md:h-[450px]">
            
            {/* High-Fi visual laptop framing */}
            <div className="relative w-full max-w-[420px] aspect-square rounded-2xl bg-gradient-to-tr from-[#0a2347] to-[#0d3466] shadow-[0_20px_50px_rgba(0,163,224,0.3)] border border-cyan-500/30 p-6 flex flex-col justify-between overflow-hidden">
              
              {/* Dynamic decorative light curves */}
              <div className="absolute top-[-50px] right-[-50px] w-48 h-48 rounded-full bg-cyan-400 opacity-20 blur-3xl" />
              <div className="absolute bottom-[-55px] left-[-40px] w-48 h-48 rounded-full bg-[#00A3E0] opacity-30 blur-3xl" />

              {/* Header inside mockup */}
              <div className="flex justify-between items-center border-b border-cyan-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
                    <span className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
                  </div>
                  <span className="text-xs font-mono text-cyan-300 ml-2">nerva_hub.ts</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Digital Engine</span>
              </div>

              {/* Middle Section: Abstract SVG Representation of the team collaborating */}
              <div className="flex-1 my-4 flex flex-col justify-center items-center relative gap-4">
                
                {/* Outer concentric pulsing ring */}
                <div className="absolute inset-0 flex justify-center items-center">
                  <div className="w-48 h-48 rounded-full border border-cyan-500/20 animate-spin-slow" />
                  <div className="w-36 h-36 rounded-full border border-[#00A3E0]/30 border-dashed absolute animate-reverse-spin" />
                </div>

                {/* Central digital circuit hub structure */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-slate-900 border-2 border-[#00A3E0] shadow-[0_0_25px_rgba(0,163,224,0.4)] flex flex-col items-center justify-center p-2 text-center group transition-transform duration-500 hover:rotate-6">
                    <Cpu className="text-cyan-400 w-8 h-8 animate-pulse mb-1" />
                    <span className="text-[9px] font-mono tracking-wider font-extrabold text-white">INNOVATION</span>
                    <span className="text-[7px] text-cyan-400 font-semibold font-sans tracking-wide">PERFORMANCE</span>
                  </div>
                </div>

                {/* Left side node: Web Design */}
                <div className="absolute top-4 left-6 bg-slate-900/95 border border-cyan-500/40 rounded-lg p-2.5 shadow-lg flex items-center gap-2 hover:scale-105 transition-all">
                  <Code size={16} className="text-[#00A3E0]" />
                  <div className="leading-tight">
                    <p className="text-[9px] font-bold text-white uppercase tracking-wider">Web Design</p>
                    <p className="text-[8px] text-cyan-300 font-mono">100% Responsive</p>
                  </div>
                </div>

                {/* Right side node: Integration Senegal */}
                <div className="absolute bottom-6 right-2 bg-slate-900/95 border border-green-500/40 rounded-lg p-2.5 shadow-lg flex items-center gap-2 hover:scale-105 transition-all">
                  <MapPin size={16} className="text-green-400" />
                  <div className="leading-tight">
                    <p className="text-[9px] font-bold text-white uppercase tracking-wider">Sénégal Hub</p>
                    <p className="text-[8px] text-green-300 font-mono">Wave & Orange Money</p>
                  </div>
                </div>

                {/* Floating nodes */}
                <div className="absolute top-10 right-4 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <div className="absolute bottom-12 left-10 w-2 h-2 rounded-full bg-white animate-bounce" />

              </div>

              {/* Footer inside mockup */}
              <div className="border-t border-cyan-500/20 pt-3 flex justify-between items-center text-xs font-mono">
                <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                  <Laptop size={12} className="text-[#00A3E0]" />
                  <span>NERVA Ecosystem</span>
                </div>
                <span className="text-[#00A3E0] font-bold text-[10px] animate-pulse">● FIABILITÉ</span>
              </div>

            </div>

            {/* Decorative background badges matching flyer elements */}
            <div className="absolute bottom-[-16px] right-[-10px] md:bottom-2 bg-white/95 text-slate-900 shadow-xl rounded-xl p-4 border-l-4 border-[#00A3E0] flex items-center gap-3 z-30 max-w-[200px] hover:-translate-y-1 transition-transform">
              <Sparkles className="text-amber-500 shrink-0" size={24} />
              <div className="leading-tight">
                <p className="text-xs font-extrabold uppercase text-slate-800">Extraordinaire</p>
                <p className="text-[10px] text-slate-500">Qualité de code irréprochable & design d\'impact</p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* SECTION 2: LES 4 PILIERS DE MARQUE DE NERVA (FROM THE DEEP BLUE SIDEBAR OF THE FLYER) */}
      <div className="w-full bg-[#07152B] py-12 text-white relative border-y border-cyan-500/20" id="values-pillars">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,163,224,0.05)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[#00A3E0] text-xs uppercase font-extrabold tracking-widest block mb-2">NOTRE PROMESSE</span>
            <h2 className="text-2xl md:text-3xl font-extrabold">POURQUOI CHOISIR NERVA ?</h2>
            <p className="text-slate-400 text-sm mt-2">Nous unissons rigueur commerciale et designs modernes pour propulser votre entreprise plus loin.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-[#00A3E0]/50 transition-all group flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-cyan-950/80 border border-cyan-500/20 flex items-center justify-center text-[#00A3E0]">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold group-hover:text-[#00A3E0] transition-colors">SOLUTIONS SUR MESURE</h3>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  Chaque entreprise a des spécificités uniques. Nous concevons vos outils sur mesure en fonction de vos cibles réelles.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-[#00A3E0]/50 transition-all group flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-cyan-950/80 border border-cyan-500/20 flex items-center justify-center text-[#00A3E0]">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold group-hover:text-[#00A3E0] transition-colors">ACCOMPAGNEMENT PERSONNALISÉ</h3>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  Basés à Dakar, nous sommes à votre écoute immédiate. Des réunions de suivi et de pilotage régulières pour tout comprendre.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-[#00A3E0]/50 transition-all group flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-cyan-950/80 border border-cyan-500/20 flex items-center justify-center text-[#00A3E0]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold group-hover:text-[#00A3E0] transition-colors">SÉCURITÉ & CONFIDENTIALITÉ</h3>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  Vos bases de données, paiements et fichiers confidentiels profitent des protocoles sécurisés les plus fiables du marché.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-[#00A3E0]/50 transition-all group flex flex-col gap-4">
              <div className="w-12 h-12 rounded-lg bg-cyan-950/80 border border-cyan-500/20 flex items-center justify-center text-[#00A3E0]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold group-hover:text-[#00A3E0] transition-colors">RÉSULTATS CONCRETS</h3>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  Plus de visites, de meilleures notes de satisfaction client, des automatisations clés pour maximiser votre chiffre d'affaires.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 3: NOS SERVICES DE BASE (MATCHING FLYER LAYOUT BUT INTERACTIVE) */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16" id="services-summary">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <span className="text-[#00A3E0] font-extrabold text-xs uppercase tracking-widest">DÉCOUVRIR LE SAVOIR-FAIRE</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">NOS SERVICES PHARES</h2>
          </div>
          <button 
            onClick={() => onNavigate('services')}
            className="text-[#00A3E0] hover:text-[#0581b3] font-bold text-sm tracking-wide flex items-center gap-1.5 transition-colors cursor-pointer group"
          >
            Explorer tous nos services en détail
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 5 Quick grids representing the exact services on the flyer */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          
          {/* Service 1 */}
          <div 
            onClick={() => onNavigate('services', { serviceTab: 0, contactService: 'web' })}
            className="bg-white border border-slate-200 hover:border-[#00A3E0] rounded-xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between h-full group cursor-pointer hover:scale-[1.02]"
          >
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-lg bg-cyan-50 text-[#00A3E0] flex items-center justify-center font-bold text-lg border border-cyan-100">
                &lt;/&gt;
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-[#00A3E0] transition-colors uppercase flex items-center gap-1.5">
                  SITES WEB
                  <ArrowRight size={14} className="text-[#00A3E0] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                  Sites vitrines, e-commerce, portails web et solutions performantes sur mesure pour valoriser votre marque.
                </p>
              </div>
            </div>
            <div className="w-8 h-1 bg-[#00A3E0] mt-6 group-hover:w-full transition-all duration-300" />
          </div>

          {/* Service 2 */}
          <div 
            onClick={() => onNavigate('services', { serviceTab: 1, contactService: 'hotel' })}
            className="bg-white border border-slate-200 hover:border-emerald-500 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between h-full group cursor-pointer hover:scale-[1.02]"
          >
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-lg bg-green-50 text-green-600 flex items-center justify-center font-bold text-lg border border-green-100">
                🏨
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-green-600 transition-colors uppercase flex items-center gap-1.5">
                  HÔTELS DIGITAUX
                  <ArrowRight size={14} className="text-green-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                  Boostez votre visibilité, facilitez les réservations en ligne Wave/Orange Money et soignez l'expérience client.
                </p>
              </div>
            </div>
            <div className="w-8 h-1 bg-green-500 mt-6 group-hover:w-full transition-all duration-300" />
          </div>

          {/* Service 3 */}
          <div 
            onClick={() => onNavigate('services', { serviceTab: 2, contactService: 'design' })}
            className="bg-white border border-slate-200 hover:border-amber-500 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between h-full group cursor-pointer hover:scale-[1.02]"
          >
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg border border-amber-100">
                🎨
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-amber-500 transition-colors uppercase flex items-center gap-1.5">
                  AFFICHES & DESIGN
                  <ArrowRight size={14} className="text-amber-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                  Affiches, prospectus, identité visuelle moderne, chartes graphiques complètes pour vos réseaux.
                </p>
              </div>
            </div>
            <div className="w-8 h-1 bg-amber-500 mt-6 group-hover:w-full transition-all duration-300" />
          </div>

          {/* Service 4 */}
          <div 
            onClick={() => onNavigate('services', { serviceTab: 3, contactService: 'cv' })}
            className="bg-white border border-slate-200 hover:border-violet-500 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between h-full group cursor-pointer hover:scale-[1.02]"
          >
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center font-bold text-lg border border-violet-100">
                👔
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-violet-600 transition-colors uppercase flex items-center gap-1.5">
                  CV PROFESSIONNELS
                  <ArrowRight size={14} className="text-violet-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                  Des designs de CV percutants, modernes et optimisés pour séduire les recruteurs locaux et internationaux.
                </p>
              </div>
            </div>
            <div className="w-8 h-1 bg-violet-500 mt-6 group-hover:w-full transition-all duration-300" />
          </div>

          {/* Service 5 */}
          <div 
            onClick={() => onNavigate('services', { serviceTab: 4, contactService: 'it' })}
            className="bg-white border border-slate-200 hover:border-slate-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between h-full group cursor-pointer hover:scale-[1.02]"
          >
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-lg border border-slate-200">
                💻
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-slate-800 transition-colors uppercase flex items-center gap-1.5">
                  AUTRE IT & DEV
                  <ArrowRight size={14} className="text-slate-800 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                  Applications web, maintenance, infogérance sénégalaise et développements sur mesure fiables.
                </p>
              </div>
            </div>
            <div className="w-8 h-1 bg-slate-800 mt-6 group-hover:w-full transition-all duration-300" />
          </div>

        </div>
      </div>

      {/* SECTION 4: EXTRAORDINARY INTERACTIVE PROJECT BLUEPRINT GENERATOR (INNOVATION DE PREMIER RANG) */}
      <div className="bg-slate-100 border-y border-slate-200 py-16" id="blueprint-generator">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center mb-8">
            <span className="text-[#00A3E0] font-extrabold text-xs tracking-widest uppercase">PILOTAGE EN DIRECT</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">PLANIFICATEUR DE PROJET INTERACTIF</h2>
            <p className="text-slate-500 text-sm mt-2">Sélectionnez vos critères pour obtenir instantanément une idée claire de l'architecture logicielle proposée par NERVA.</p>
          </div>

          {/* Selector UI Block */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-stretch">
            
            {/* Control Panel (Left Side of Card) */}
            <div className="w-full md:w-1/2 flex flex-col gap-6 justify-between border-b md:border-b-0 md:border-r border-slate-200 pb-6 md:pb-0 md:pr-6">
              
              {/* Factor 1: Domain category */}
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-500 tracking-wider mb-2.5">Type de Prestation</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setSelectedCategory('web')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold text-left transition-all cursor-pointer ${selectedCategory === 'web' ? 'bg-[#07152B] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                  >
                    &lt;/&gt; Sites Web
                  </button>
                  <button 
                    onClick={() => setSelectedCategory('hotel')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold text-left transition-all cursor-pointer ${selectedCategory === 'hotel' ? 'bg-[#07152B] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                  >
                    🏨 Digitalisation Hôtels
                  </button>
                  <button 
                    onClick={() => setSelectedCategory('design')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold text-left transition-all cursor-pointer ${selectedCategory === 'design' ? 'bg-[#07152B] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                  >
                    🎨 Conception d'affiches
                  </button>
                  <button 
                    onClick={() => setSelectedCategory('cv')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold text-left transition-all cursor-pointer ${selectedCategory === 'cv' ? 'bg-[#07152B] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                  >
                    👔 CV Professionnels
                  </button>
                </div>
              </div>

              {/* Factor 2: Timeline scale / Complexity */}
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-500 tracking-wider mb-2.5">Ampleur du Projet</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setProjectSize('petite')}
                    className={`flex-1 py-2 text-center text-xs font-extrabold rounded-lg capitalize cursor-pointer transition-all ${projectSize === 'petite' ? 'bg-[#00A3E0] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                  >
                    Simple
                  </button>
                  <button 
                    onClick={() => setProjectSize('moyenne')}
                    className={`flex-1 py-2 text-center text-xs font-extrabold rounded-lg capitalize cursor-pointer transition-all ${projectSize === 'moyenne' ? 'bg-[#00A3E0] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                  >
                    Moyen
                  </button>
                  <button 
                    onClick={() => setProjectSize('grande')}
                    className={`flex-1 py-2 text-center text-xs font-extrabold rounded-lg capitalize cursor-pointer transition-all ${projectSize === 'grande' ? 'bg-[#00A3E0] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                  >
                    Complexe
                  </button>
                </div>
              </div>

              {/* Action and call to contact */}
              <div className="pt-4 mt-auto">
                <button 
                  onClick={() => onNavigate('contact')}
                  className="w-full py-3 bg-[#07152B] hover:bg-[#122B4D] text-[#00A3E0] text-xs font-extrabold rounded-lg tracking-widest uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  Valider ce plan • Devis Offert
                  <ArrowRight size={14} />
                </button>
              </div>

            </div>

            {/* Simulated Live Architecture Screen (Right Side of Card) */}
            <div className="w-full md:w-1/2 bg-slate-950 rounded-xl p-5 text-slate-300 font-mono text-xs flex flex-col justify-between border border-slate-800 shadow-inner">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-[10px] text-emerald-400 font-bold tracking-widest">● CONFIGURATION OPTIMALE</span>
                  <span className="text-[9px] text-slate-500">NERVA Engine v1.2</span>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[10px] text-slate-500">// Solutions architecturales</p>
                  <p className="text-sm font-bold text-white uppercase">{blueprint.title}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] text-slate-500">// Technologies clés conseillées</p>
                  <div className="flex flex-wrap gap-1.5">
                    {blueprint.tech.map((t, idx) => (
                      <span key={idx} className="bg-slate-900 border border-slate-800 text-[#00A3E0] text-[9px] px-2 py-0.5 rounded font-mono font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] text-slate-500">// Jalons de livraison du projet</p>
                  <ul className="space-y-1 text-[10px]">
                    {blueprint.steps.map((st, sIdx) => (
                      <li key={sIdx} className="flex gap-2 items-center">
                        <span className="text-emerald-400 font-bold">{sIdx + 1}.</span>
                        <span className="text-slate-300 font-sans">{st}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-900 pt-3 flex justify-between items-center">
                <span className="text-[10px] text-slate-500">Délai estimé de réalisation :</span>
                <span className="text-white text-xs font-bold font-sans px-2.5 py-1 rounded bg-[#07152B] border border-cyan-500/20">
                  {blueprint.duration}
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* SECTION 5: BANNIÈRE SÉNÉGAL (EXACT DESIGN MATCH WITH MAP OUTLINE IN BLUE FOOTER) */}
      <div className="w-full bg-[#07152B] py-14 relative text-white border-t-2 border-[#00A3E0] overflow-hidden" id="senegal-banner">
        
        {/* Glowing visual lines */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 opacity-5 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Detailed Senegal Map and Text layout */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            
            {/* Senegal Vector design mirroring the flyer's Senegal map icon */}
            <div className="relative w-48 h-48 flex items-center justify-center bg-slate-900/60 rounded-full border border-cyan-500/20 p-2 shadow-inner group">
              <svg 
                viewBox="0 0 100 100" 
                className="w-36 h-36 drop-shadow-[0_0_12px_rgba(0,163,224,0.4)] transition-transform duration-500 group-hover:scale-105"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Senegal Outline Path */}
                <path 
                  d="M10 50 C20 40, 25 35, 35 32 C45 30, 55 35, 65 30 C75 25, 80 20, 88 15 C92 20, 95 35, 88 45 C82 50, 85 58, 80 65 C75 70, 68 62, 60 68 C52 74, 45 78, 38 75 C30 72, 22 74, 15 65 C10 60, 8 55, 10 50 Z" 
                  fill="#00A3E0" 
                  stroke="#FFFFFF" 
                  strokeWidth="1.5" 
                />
                {/* Senegal Star in center */}
                <polygon 
                  points="45,45 48,51 54,51 50,55 52,61 45,58 38,61 40,55 36,51 42,51" 
                  fill="#FFFFFF" 
                  className="animate-pulse"
                />
                
                {/* Mbour location pinpoint */}
                <circle cx="21" cy="58" r="3.5" fill="#FFFFFF" />
                <circle cx="21" cy="58" r="6" stroke="#FFFFFF" strokeWidth="1" className="animate-ping" />
              </svg>

              {/* Marker text */}
              <div className="absolute bottom-2 bg-slate-900 border border-cyan-500/30 px-3 py-1 rounded text-[10px] font-extrabold uppercase text-slate-100 tracking-wider">
                Mbour, Sénégal
              </div>
            </div>

          </div>

          {/* Senegal detailed message from flyer */}
          <div className="lg:col-span-8 flex flex-col space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-xs font-semibold text-cyan-400 w-fit">
              <MapPin size={13} />
              DISPONIBLES ET PROCHES DE VOUS
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              BASÉS AU <span className="text-[#00A3E0]">SÉNÉGAL</span>
            </h2>
            
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
              Nous comprenons parfaitement les dynamiques de votre marché, vos défis de communication et proposons des solutions technologiques adaptées à votre réalité économique locale et internationale.
            </p>

            {/* Quick contact direct values for instant reachability */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-[#00A3E0]">
                  <Phone size={15} />
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">Équipe mobile / Call</p>
                  <p className="text-xs font-bold text-white font-mono">+221 70 200 72 85</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-[#00A3E0]">
                  <Phone size={15} />
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">Développement / WhatsApp</p>
                  <p className="text-xs font-bold text-white font-mono">+221 76 244 25 30</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-[#00A3E0]">
                  <Mail size={15} />
                </div>
                <div className="leading-tight">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">E-mail corporatif</p>
                  <p className="text-xs font-bold text-white font-mono">nerva.society@gmail.com</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
export default Accueil;
