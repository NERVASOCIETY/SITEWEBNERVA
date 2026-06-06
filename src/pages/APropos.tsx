/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
  ShieldAlert,
  Award,
  Linkedin,
  ExternalLink
} from 'lucide-react';
import { PageId } from '../types';

import mourtalaImg from '../assets/images/team_mourtala_1780702431838.png';
import seidouImg from '../assets/images/team_seidou_1780702445537.png';
import abdoulayeImg from '../assets/images/team_abdoulaye_1780702457981.png';
import youKnowImg from '../assets/images/team_you_know_1780702470680.png';

interface AProposProps {
  onNavigate: (pageId: PageId) => void;
}

export const APropos: React.FC<AProposProps> = ({ onNavigate }) => {
  // Accordion state for FAQ
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const teamData = [
    {
      name: 'Mourtala GUEYE',
      role: 'Développeur Mobile',
      desc: 'Architecte spécialiste du développement cross-platform iOS & Android. Conçoit des applications mobiles fluides, réactives et sécurisées, connectées aux passerelles de paiement locales.',
      tag: 'Pôle Mobile',
      avatarLetters: 'MG',
      image: mourtalaImg,
      linkedin: 'https://www.linkedin.com/in/mourtala-gueye-nerva',
      portfolio: 'https://mourtala-gueye.dev'
    },
    {
      name: 'Seidou MANGANE',
      role: 'Développeur Fullstack',
      desc: 'Expert en ingénierie logicielle globale, APIs robustes et intégrations système complexes. Maîtrise toute la chaîne de production du front-end au serveur.',
      tag: 'Pôle Engineering',
      avatarLetters: 'SM',
      image: seidouImg,
      linkedin: 'https://www.linkedin.com/in/seidou-mangane-nerva',
      portfolio: 'https://seidou-mangane.dev'
    },
    {
      name: 'Abdoulaye SALL',
      role: 'Gestionnaire de Base de Données',
      desc: 'Architecte de l\'intégrité et de la haute performance des flux d\'informations. Expert en bases de données SQL/NoSQL pour des services applicatifs hôteliers et de facturation.',
      tag: 'Pôle Data',
      avatarLetters: 'AS',
      image: abdoulayeImg,
      linkedin: 'https://www.linkedin.com/in/abdoulaye-sall-nerva',
      portfolio: 'https://abdoulaye-sall.dev'
    },
    {
      name: 'You KNOW',
      role: 'Responsable Technique Web',
      desc: 'Pilote stratégique des architectures web d\'impact. Garant de la robustesse des solutions SaaS, du SEO avancé, des performances d\'affichage et de l\'intégration technique.',
      tag: 'Direction Web',
      avatarLetters: 'YK',
      image: youKnowImg,
      linkedin: 'www.linkedin.com/in/mamadon-d-b05681367',
      portfolio: 'https://mamadou-diop.dev'
    }
  ];

  const faqData = [
    {
      q: 'Quels types de sites web concevez-vous pour les entreprises du Sénégal ?',
      a: 'Nous programmons des sites vitrines modernes pour valoriser votre établissement, mais également des sites de vente en ligne (e-commerce) et des solutions métier très spécifiques : comme les moteurs de réservation directe pour hôtels ne prélevant aucune commission.'
    },
    {
      q: 'Est-il possible d\'intégrer Wave et Orange Money comme moyens de paiement ?',
      a: 'Absolument ! C\'est l\'une de nos grandes spécialités. Nous connectons directement vos comptes marchands officiels Wave ou Orange Money (via API ou webpay sécurisé) pour que vos clients puissent réserver et acheter leurs produits d\'un simple clic en toute conformité.'
    },
    {
      q: 'Prenez-vous en charge le nom de domaine internet (.sn) et l\'hébergement ?',
      a: 'Oui. De l\'enregistrement réglementaire auprès de l\'autorisé nationale (.sn) ou d\'extensions mondiales (.com, .net) jusqu\'au déploiement sur serveurs cloud optimisés, nous nous occupons de l\'ensemble de l\'infrastructure sans fardeau technique pour vous.'
    },
    {
      q: 'Puis-je commander uniquement de la conception d\'affiches ou un CV ?',
      a: 'Tout à fait. Nos prestations sont entièrement modulaires comme illustré sur notre flyer officiel. Pour les candidats, notre pôle CV élabore des mises en pages haut de gamme de standard international qui doublent vos taux de rappel par les départements RH.'
    }
  ];

  const toggleFAQ = (idx: number) => {
    setOpenFAQ(openFAQ === idx ? null : idx);
  };

  return (
    <div className="w-full bg-slate-50 py-10 md:py-16 font-sans">
      
      {/* Title & Banner Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-12">
        <div className="border-l-4 border-[#00A3E0] pl-4 md:pl-6 max-w-2xl">
          <span className="text-[#00A3E0] text-xs font-extrabold uppercase tracking-widest block mb-1">PROFIL D'ENTREPRISE</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#07152B] leading-tight">
            QUI EST NERVA ?
          </h1>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            Une synergie d'ingénierie et de design établie au Sénégal pour faire passer vos projets à l'échelle supérieure.
          </p>
        </div>
      </div>

      {/* Main Core Identity Block (Split Image/Description mimicking flyer split layout) */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        
        {/* Left Side: Editorial Mission Text */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <span className="text-xs text-[#00A3E0] uppercase font-bold tracking-wider">// L'IMAGE DE NOTRE ENGAGEMENT</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Unerésolution résolue de moderniser les interfaces en Afrique de l'Ouest
            </h2>
          </div>

          <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
            Née du constat que de nombreuses entreprises et hôteliers au Sénégal disposent d'un superbe potentiel mais souffrent d'outils digitaux vieillissants ou d'intermédiaires onéreux, <strong>NERVA</strong> démocratise le développement de haute facture. 
          </p>

          <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
            Nous ne nous contentons pas de livrer du code ou de simples affiches. Notre équipe construit une véritable <strong>identité technologique et visuelle</strong> pérenne, sécurisée, et directement connectée aux comportements de paiement réels des consommateurs locaux (Wave, Orange Money, Cash).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            
            <div className="bg-white p-4.5 rounded-lg border border-slate-200 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-100 text-[#00A3E0] flex items-center justify-center shrink-0">
                <Flame size={16} />
              </div>
              <div className="leading-tight">
                <p className="text-xs font-extrabold uppercase text-slate-800">Cadrage Rapide</p>
                <p className="text-[10.5px] text-slate-500 mt-1">Lancement des prototypes en moins d'une semaine.</p>
              </div>
            </div>

            <div className="bg-white p-4.5 rounded-lg border border-slate-200 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center shrink-0">
                <Briefcase size={16} />
              </div>
              <div className="leading-tight">
                <p className="text-xs font-extrabold uppercase text-slate-800">Support 24h/7j</p>
                <p className="text-[10.5px] text-slate-500 mt-1">Intervention locale technique directe en cas d'urgence.</p>
              </div>
            </div>

          </div>

          {/* Core Values highlight from flyer visual checklist inside white container */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xs uppercase font-extrabold text-slate-900 tracking-wider mb-4 h-fit border-b pb-2">
              VALEURS COUCHÉES SUR NOTRE CHARTE :
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs text-slate-700">
              <li className="flex items-center gap-2.5">
                <CheckCircle size={15} className="text-[#00A3E0] shrink-0" />
                <span><strong>Solutions sur mesure</strong> : Pas de copier-coller.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle size={15} className="text-[#00A3E0] shrink-0" />
                <span><strong>Accompagnement personnalisé</strong> : Réunions régulières.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle size={15} className="text-[#00A3E0] shrink-0" />
                <span><strong>Sécurité & Confidentialité</strong> : Données cryptées.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle size={15} className="text-[#00A3E0] shrink-0" />
                <span><strong>Résultats concrets</strong> : Augmentation de vos ventes.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side: Visual graphic block mimicking the deep blue elegant cards */}
        <div className="lg:col-span-5 relative">
          
          <div className="bg-[#07152B] hover:shadow-cyan-500/10 transition-all border border-cyan-500/30 rounded-2xl p-6 md:p-8 text-white space-y-6 relative overflow-hidden">
            
            {/* Glowing circle and vector art details */}
            <div className="absolute top-[-40px] left-[-40px] w-32 h-32 bg-cyan-400 opacity-10 rounded-full blur-2xl" />
            <div className="absolute bottom-[-30px] right-[-35px] w-40 h-40 bg-blue-600 opacity-20 rounded-full blur-3xl" />

            <div className="space-y-2">
              <Award className="text-[#00A3E0] w-8 h-8" />
              <h3 className="text-lg font-bold uppercase tracking-wider">LABELLISÉ DE CONFANCE</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Notre démarche s'aligne d'abord sur la réussite commerciale. Les solutions logicielles d'aujourd'hui ne doivent pas être compliquées à utiliser.
              </p>
            </div>

            <div className="space-y-4 border-t border-slate-800 pt-4 text-xs font-mono">
              <p className="text-slate-400">// Chiffres du réseau NERVA :</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/60 p-3 rounded border border-slate-800">
                  <p className="text-xl font-bold text-white">100%</p>
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">Conçu au Sénégal</p>
                </div>

                <div className="bg-slate-900/60 p-3 rounded border border-slate-800">
                  <p className="text-xl font-bold text-white">&lt;10ms</p>
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">Temps de réponse site</p>
                </div>

                <div className="bg-slate-900/60 p-3 rounded border border-slate-800">
                  <p className="text-xl font-bold text-emerald-400">0%</p>
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">Commissions Hôtelières</p>
                </div>

                <div className="bg-slate-900/60 p-3 rounded border border-slate-800">
                  <p className="text-xl font-bold text-white">24/7</p>
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">Système monitoring</p>
                </div>
              </div>

            </div>

            <div className="text-center pt-2">
              <p className="text-[10px] text-slate-400 italic">"Votre vision, Notre expertise, Votre réussite."</p>
            </div>

          </div>

        </div>

      </div>

      {/* SECTION 3: REPRÉSENTANTS DES PÔLES CLÉS DE LA SOCIÉTÉ */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 border-t border-slate-200">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[#00A3E0] text-xs font-extrabold uppercase tracking-widest block mb-2">NOTRE ÉQUIPE D'EXPERTS</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">UNE COLLABORATION COMPLÈTE</h2>
          <p className="text-slate-500 text-xs mt-1">Chaque pôle est piloté par un spécialiste prêt à transposer vos idées dans des supports irréprochables.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamData.map((member, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all flex flex-col justify-between h-full group">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  
                  {/* High Quality Portrait Avatar/Fallback Concept */}
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      referrerPolicy="no-referrer"
                      className="w-24 h-24 rounded-full object-cover border-2 border-[#00A3E0] bg-[#07152B] shrink-0 group-hover:scale-105 transition-transform shadow-md"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-[#07152B] text-[#00A3E0] font-sans font-bold text-2xl flex items-center justify-center border-2 border-[#00A3E0] shrink-0 group-hover:scale-105 transition-transform">
                      {member.avatarLetters}
                    </div>
                  )}

                  <span className="bg-slate-100 text-slate-800 text-[9px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full border border-slate-200">
                    {member.tag}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-900 text-base">{member.name}</h3>
                  <p className="text-xs text-[#00A3E0] font-bold uppercase">{member.role}</p>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {member.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[10.5px] font-bold text-slate-700">
                {member.portfolio ? (
                  <a
                    href={member.portfolio.startsWith('http') ? member.portfolio : `https://${member.portfolio}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-800 transition-colors bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-200/50"
                    title={`Visiter le portfolio de ${member.name}`}
                  >
                    <ExternalLink size={12} className="shrink-0 text-emerald-500" />
                    <span>Portfolio</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-[#00A3E0]" />
                    <span>Axe-Sénégal</span>
                  </div>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin.startsWith('http') ? member.linkedin : `https://${member.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sky-600 hover:text-sky-800 transition-colors bg-sky-50 hover:bg-sky-100 px-2.5 py-1 rounded-md border border-sky-200/50"
                    title={`Visiter le profil LinkedIn de ${member.name}`}
                  >
                    <Linkedin size={11} className="shrink-0 text-sky-500" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: LES QUESTIONS FRÉQUENTES DES HÔTELS ET ENTREPRISES (ACCORDEON SLA) */}
      <div className="max-w-4xl mx-auto px-4 mt-16" id="faq-section">
        
        <div className="p-6 md:p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
          
          <div className="flex items-center gap-2.5 mb-6">
            <HelpCircle className="text-[#00A3E0] w-6 h-6 shrink-0" />
            <h2 className="text-xl font-extrabold text-slate-900 uppercase">QUESTIONS FRÉQUENTES • TRANSPARENCE</h2>
          </div>

          <div className="space-y-3.5">
            {faqData.map((faq, fIdx) => (
              <div 
                key={fIdx} 
                className="border border-slate-200 rounded-lg overflow-hidden transition-all bg-slate-50/20"
              >
                
                {/* Header/Question Trigger button */}
                <button
                  onClick={() => toggleFAQ(fIdx)}
                  className="w-full p-4 text-left font-bold text-slate-800 text-xs md:text-sm flex justify-between items-center bg-slate-50 hover:bg-slate-100/80 transition-colors cursor-pointer select-none"
                >
                  <span className="pr-4 leading-tight">{faq.q}</span>
                  {openFAQ === fIdx ? (
                    <ChevronUp size={16} className="text-[#00A3E0] shrink-0" />
                  ) : (
                    <ChevronDown size={16} className="text-slate-400 shrink-0" />
                  )}
                </button>

                {/* Content block */}
                {openFAQ === fIdx && (
                  <div className="p-4 bg-white border-t border-slate-200 font-sans text-xs md:text-sm text-slate-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}

              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-150 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="text-xs font-bold text-slate-900">Vous avez un autre type d'interrogation ?</p>
              <p className="text-[11px] text-slate-500">Notre équipe sénégalaise vous répond en moins de 2 heures en général.</p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="px-4 py-2.5 bg-[#07152B] hover:bg-slate-800 text-[#00A3E0] font-extrabold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              Envoyer une question directe
              <ArrowRight size={14} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
export default APropos;
