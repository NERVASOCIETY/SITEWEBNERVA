/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Globe, 
  Hotel, 
  Palette, 
  FileText, 
  Cpu, 
  Check, 
  ArrowRight, 
  Calculator, 
  Star, 
  Settings, 
  Layers, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { PageId } from '../types';

interface ServicesProps {
  onNavigate: (pageId: PageId, options?: { serviceTab?: number; contactService?: string; contactMessage?: string }) => void;
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigate, activeTab, setActiveTab }) => {
  // Interactive Hotel Digitization Simulator State
  const [roomType, setRoomType] = useState<string>('suite-ocean');
  const [hasMobileMoney, setHasMobileMoney] = useState<boolean>(true);
  const [bookedStatus, setBookedStatus] = useState<boolean>(false);

  // Web Development Quote Simulator State
  const [webSiteType, setWebSiteType] = useState<string>('vitrine');
  const [includeSeo, setIncludeSeo] = useState<boolean>(true);
  const [includeInteractive, setIncludeInteractive] = useState<boolean>(false);

  const calculateWebQuote = () => {
    let base = 200000;
    if (webSiteType === 'ecommerce') base = 420000;
    if (webSiteType === 'app') base = 600000;
    if (includeSeo) base += 30000;
    if (includeInteractive) base += 50000;
    return base;
  };

  // General pricing customizer state
  const [selectedServices, setSelectedServices] = useState<string[]>(['web']);
  const [estimatedHosting, setEstimatedHosting] = useState<boolean>(true);

  // Customized Project State for range calculation (dynamic interval)
  const [customProjectActive, setCustomProjectActive] = useState<boolean>(false);
  const [customProjectType, setCustomProjectType] = useState<string>('web-app');
  const [customProjectComplexity, setCustomProjectComplexity] = useState<string>('standard');
  const [customProjectSize, setCustomProjectSize] = useState<string>('medium');
  const [customProjectFeatures, setCustomProjectFeatures] = useState<string[]>(['db', 'payment']);

  const calculateCustomProjectInterval = () => {
    let baseMin = 150000;
    let baseMax = 250000;

    // Project type factor
    if (customProjectType === 'web-app') {
      baseMin = 400000;
      baseMax = 600000;
    } else if (customProjectType === 'mobile') {
      baseMin = 650000;
      baseMax = 950000;
    } else if (customProjectType === 'ecommerce_adv') {
      baseMin = 350000;
      baseMax = 550000;
    } else if (customProjectType === 'marketplace') {
      baseMin = 700000;
      baseMax = 1200000;
    } else if (customProjectType === 'other') {
      baseMin = 200000;
      baseMax = 350000;
    }

    // Complexity multiplier
    let multMin = 1.0;
    let multMax = 1.0;
    if (customProjectComplexity === 'basic') {
      multMin = 0.85;
      multMax = 0.95;
    } else if (customProjectComplexity === 'standard') {
      multMin = 1.1;
      multMax = 1.35;
    } else if (customProjectComplexity === 'advanced') {
      multMin = 1.5;
      multMax = 1.9;
    }

    // Size / pages factor
    let sizeAddMin = 0;
    let sizeAddMax = 0;
    if (customProjectSize === 'small') {
      sizeAddMin = 0;
      sizeAddMax = 40000;
    } else if (customProjectSize === 'medium') {
      sizeAddMin = 50000;
      sizeAddMax = 120000;
    } else if (customProjectSize === 'large') {
      sizeAddMin = 150000;
      sizeAddMax = 300000;
    }

    // Extras/features factor
    let featuresAddMin = 0;
    let featuresAddMax = 0;
    if (customProjectFeatures.includes('db')) {
      featuresAddMin += 50000;
      featuresAddMax += 80000;
    }
    if (customProjectFeatures.includes('payment')) {
      featuresAddMin += 40000;
      featuresAddMax += 70000;
    }
    if (customProjectFeatures.includes('auth')) {
      featuresAddMin += 30000;
      featuresAddMax += 60000;
    }
    if (customProjectFeatures.includes('sms')) {
      featuresAddMin += 40000;
      featuresAddMax += 90000;
    }

    const minTotal = Math.round((baseMin * multMin) + sizeAddMin + featuresAddMin);
    const maxTotal = Math.round((baseMax * multMax) + sizeAddMax + featuresAddMax);

    return { min: minTotal, max: maxTotal };
  };

  const toggleCustomFeature = (featureKey: string) => {
    if (customProjectFeatures.includes(featureKey)) {
      setCustomProjectFeatures(customProjectFeatures.filter(f => f !== featureKey));
    } else {
      setCustomProjectFeatures([...customProjectFeatures, featureKey]);
    }
  };

  const servicesData = [
    {
      id: 0,
      title: 'Création de sites web',
      badge: 'B2B/B2C',
      flyerDesc: 'Sites vitrines, e-commerce, portails web et solutions sur mesure.',
      longDesc: 'Dotez votre structure d\'une visibilité d\'exception 24h/24. Nous développons des plateformes rapides, optimisées pour le SEO Google et parfaitement lisibles sur smartphone et tablette.',
      icon: <Globe className="w-5 h-5" />,
      colorClass: 'from-[#00A3E0] to-blue-600',
      textColor: 'text-[#00A3E0]',
      bgColor: 'bg-cyan-50/50',
      bullets: [
        'Vitesse de chargement ultra-rapide (Vite / React/ Edge Delivery)',
        'Optimisation SEO naturelle au Sénégal et à l\'étranger',
        'Intégration de formulaires de devis et liaison directe WhatsApp/Email',
        'Designs sur mesure haut de gamme (Pas de templates génériques)'
      ],
      techBadge: ['React', 'Next.js', 'Tailwind', 'Cloud Run']
    },
    {
      id: 1,
      title: 'Digitalisation des hôtels',
      badge: 'Tourisme / Tech',
      flyerDesc: 'Boostez votre visibilité, facilitez les réservations et améliorez l\'expérience de vos clients.',
      longDesc: 'Conçu spécialement pour les hôtels, résidences et Guest-Houses du Sénégal (Dakar, Saly, Casamance, Saint-Louis). Remplacez les intermédiaires coûteux (Booking, Airbnb) par votre propre moteur de réservation intégré directe sans commission.',
      icon: <Hotel className="w-5 h-5" />,
      colorClass: 'from-emerald-500 to-green-600',
      textColor: 'text-emerald-500',
      bgColor: 'bg-emerald-50/50',
      bullets: [
        'Moteur de réservation de chambres en temps réel sans commission',
        'Passerelles de paiements mobiles intégrées (Wave, Orange Money, Cartes)',
        'Tableau de bord de gestion pour le personnel de réception',
        'Rapports automatiques des check-ins et facturation simplifiée'
      ],
      techBadge: ['Wave API', 'Orange Money Webpay', 'Room Engine', 'Email Alerts']
    },
    {
      id: 2,
      title: 'Conception d\'affiches & Design',
      badge: 'Visual Identity',
      flyerDesc: 'Affiches, flyers, bannières, identités visuelles et tous supports de communication.',
      longDesc: 'Vos réseaux sociaux et vos locaux méritent le meilleur impact. Nos designers conçoivent des visuels modernes basés sur une étude sémiotique fine de votre public cible pour maximiser les conversions d\'achats.',
      icon: <Palette className="w-5 h-5" />,
      colorClass: 'from-amber-400 to-amber-600',
      textColor: 'text-amber-500',
      bgColor: 'bg-amber-50/50',
      bullets: [
        'Affiches publicitaires, flyers promotionnels et bannières web',
        'Identité de marque complète : Logo moderne, charte colorimétrique guidée',
        'Formats parfaits et optimisés pour Instagram, LinkedIn, Facebook et WhatsApp Status',
        'Exportation en très haute définition prête pour impression offset locale'
      ],
      techBadge: ['Illustrator', 'Figma Creative', 'Vector Export', 'BrandBook']
    },
    {
      id: 3,
      title: 'Réalisation de CV professionnels',
      badge: 'Carrière',
      flyerDesc: 'Des CV modernes, efficaces et adaptés pour vous aider à vous démarquer.',
      longDesc: 'Optimisez vos chances d\'intégrer de grandes structures au Sénégal ou à l\'international. Nous réécrivons votre parcours pour mettre en exergue vos accomplissements réels à l\'aide d\'une mise en page séduisante et lisible par les robots de recrutement (ATS-compatible).',
      icon: <FileText className="w-5 h-5" />,
      colorClass: 'from-violet-500 to-indigo-600',
      textColor: 'text-violet-500',
      bgColor: 'bg-violet-50/50',
      bullets: [
        'Rédaction hautement professionnelle orientée "Résultats"',
        'Mise en page épurée recommandée par les recruteurs du Sénégal',
        'Garantie de compatibilité avec les logiciels de tri automatique (ATS)',
        'Accompagnement et conseils d\'entretien inclus'
      ],
      techBadge: ['ATS Optimizer', 'Interactive PDF', 'LinkedIn Review', 'QR Code']
    },
    {
      id: 4,
      title: 'Autres prestations informatiques',
      badge: 'IT Backbone',
      flyerDesc: 'Applications web, maintenance, infogérance, développement sur mesure et bien plus.',
      longDesc: 'Un support technique permanent pour sécuriser et assister vos équipes. Du développement personnalisé d\'applications internes, à l\'audit complet de sécurité ou la configuration de serveurs d\'entreprise.',
      icon: <Cpu className="w-5 h-5" />,
      colorClass: 'from-slate-700 to-slate-900',
      textColor: 'text-slate-800',
      bgColor: 'bg-slate-50',
      bullets: [
        'Applications métiers internes sur mesure pour automatiser vos processus',
        'Infogérance et maintenance corrective rapide de vos serveurs de données',
        'Audit de sécurité réseau et sauvegarde cloud cryptée de vos fichiers',
        'Conseil et assistance au déploiement de logiciels collaboratifs'
      ],
      techBadge: ['Cloud Storage', 'Server Monitoring', 'API Integration', 'Security Audit']
    }
  ];

  // Price Calculation Logic
  const calculateTotal = () => {
    let total = 0;
    if (selectedServices.includes('web')) total += 250000; // CFA estimated baseline
    if (selectedServices.includes('hotel')) total += 450000;
    if (selectedServices.includes('design')) total += 75000;
    if (selectedServices.includes('cv')) total += 15000;
    if (selectedServices.includes('it')) total += 150000;
    
    if (estimatedHosting && selectedServices.includes('web')) total += 35000;
    return total;
  };

  const toggleServiceSelection = (serviceKey: string) => {
    if (selectedServices.includes(serviceKey)) {
      setSelectedServices(selectedServices.filter(s => s !== serviceKey));
    } else {
      setSelectedServices([...selectedServices, serviceKey]);
    }
  };

  return (
    <div className="w-full bg-slate-50 py-10 md:py-16 font-sans">
      
      {/* Header section with brand colors */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-12">
        <div className="border-l-4 border-[#00A3E0] pl-4 md:pl-6 max-w-2xl">
          <span className="text-[#00A3E0] text-xs font-extrabold uppercase tracking-widest block mb-1">CATALOGUE OFFICIEL</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#07152B] leading-tight">
            NOTRE EXPERTISE TECHNIQUE
          </h1>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            Cinq pôles d'excellence structurés pour subvenir aux besoins logiciels et graphiques des professionnels et candidats au Sénégal.
          </p>
        </div>
      </div>

      {/* Main interactive Tab grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* Left Side: Buttons Selector */}
        <div className="lg:col-span-4 space-y-3.5 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs uppercase font-extrabold text-slate-400 px-2 tracking-widest pb-2 border-b border-slate-100">
            Fiches d'intervention
          </div>
          
          {servicesData.map((svc) => (
            <button
              key={svc.id}
              onClick={() => setActiveTab(svc.id)}
              className={`w-full flex items-center gap-3.5 p-4 rounded-lg text-left transition-all cursor-pointer ${
                activeTab === svc.id 
                  ? 'bg-[#07152B] text-white shadow-md border-l-4 border-[#00A3E0]' 
                  : 'bg-slate-50/50 hover:bg-slate-100 text-slate-700 border border-slate-200/60'
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                activeTab === svc.id ? 'bg-[#00A3E0] text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {svc.icon}
              </div>
              <div className="leading-tight">
                <p className="text-xs font-extrabold uppercase tracking-wide">{svc.title}</p>
                <p className="text-[10.5px] text-slate-400 mt-0.5 mt-0.5 line-clamp-1">{svc.flyerDesc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Right Side: Detailed and Interactive Visualizer */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[500px]">
          
          {/* Accent lighting based on the active tab */}
          <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-b ${servicesData[activeTab].colorClass} opacity-5 blur-2xl rounded-full pointer-events-none`} />

          <div className="space-y-6">
            
            {/* Title & Badge block */}
            <div className="flex flex-wrap justify-between items-center gap-2 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 uppercase font-mono tracking-wider">Service d'excellence • Pôle {activeTab + 1}</span>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 uppercase">
                  {servicesData[activeTab].title}
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#07152B] text-[#00A3E0] text-[10px] font-extrabold tracking-widest uppercase">
                {servicesData[activeTab].badge}
              </span>
            </div>

            {/* Flyer sentence description */}
            <blockquote className="border-l-4 border-[#00A3E0] pl-4 italic text-slate-600 text-sm bg-slate-50 py-3.5 pr-2 rounded-r-lg">
              "{servicesData[activeTab].flyerDesc}"
            </blockquote>

            {/* Long extensive information */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-extrabold text-slate-800 tracking-wider">Description de notre prestation</h3>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                {servicesData[activeTab].longDesc}
              </p>
            </div>

            {/* Core bullets detail checklist */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-extrabold text-slate-800 tracking-wider">Ce qui est inclus par défaut</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                {servicesData[activeTab].bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-600">
                    <span className="p-0.5 rounded-full bg-emerald-100 text-emerald-600 mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </span>
                    <span className="font-medium leading-normal">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical environment framework tags */}
            <div className="space-y-2">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Stack logicielle typologique</p>
              <div className="flex flex-wrap gap-2">
                {servicesData[activeTab].techBadge.map((tech, tIdx) => (
                  <span key={tIdx} className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded font-mono border border-slate-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Interactive Live Service Simulator according to state (Makes the site extraordinary) */}
          <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50/70 p-4 rounded-xl border border-slate-200">
            
            {activeTab === 1 && (
              /* Hôtel Digitalisation simulation panel */
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-[#07152B] p-2.5 rounded-lg text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider">Simulation Réservation Directe</span>
                  </div>
                  <span className="text-[9px] text-[#00A3E0] font-bold">Sans Commission</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2.5">
                    <div>
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide block mb-1">Catégorie Hébergement</label>
                      <select 
                        value={roomType} 
                        onChange={(e) => setRoomType(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#00A3E0]"
                      >
                        <option value="suite-ocean">Suite Vue Océan (Dakar)</option>
                        <option value="chambre-standard">Chambre Standard (Saly Portudal)</option>
                        <option value="campement">Éco-Lodge Nature (Casamance)</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="check-wave" 
                        checked={hasMobileMoney} 
                        onChange={(e) => setHasMobileMoney(e.target.checked)}
                        className="rounded border-slate-300 text-[#00A3E0] focus:ring-[#00A3E0]"
                      />
                      <label htmlFor="check-wave" className="text-[10px] font-bold text-slate-700 cursor-pointer select-none">
                        Activer instantanément Wave & Orange Money
                      </label>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-lg p-3 flex flex-col justify-between">
                    <div className="text-[11px] leading-tight space-y-1">
                      <p className="text-slate-400 font-mono">// Aperçu Terminal Client :</p>
                      <p className="font-extrabold text-slate-800 uppercase">
                        {roomType === 'suite-ocean' ? 'Suite Vue Océan - 75 000 FCFA / nuit' : roomType === 'chambre-standard' ? 'Standard Saly - 45 000 FCFA / nuit' : 'Éco-Lodge Casamance - 30 000 FCFA / nuit'}
                      </p>
                      <p className="text-emerald-500 text-[10px] font-bold flex items-center gap-1">
                        ✓ {hasMobileMoney ? 'Paiement Wave/Orange Money activé' : 'Paiement par carte uniquement'}
                      </p>
                    </div>

                    <button 
                      onClick={() => {
                        setBookedStatus(true);
                        setTimeout(() => setBookedStatus(false), 3500);
                      }}
                      className="w-full py-1.5 bg-[#00A3E0] hover:bg-cyan-600 text-white font-extrabold text-[10px] uppercase rounded tracking-widest mt-3 transition-colors cursor-pointer"
                    >
                      {bookedStatus ? 'COMMISSION ÉCONOMISÉE ! 💸' : 'Tester le tunnel client'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 0 && (
              /* Web Development customizer panel */
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-center bg-[#07152B] p-2.5 rounded-lg text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00A3E0] animate-pulse" />
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider">Simulateur & Estimateur de Site sur mesure</span>
                  </div>
                  <span className="text-[9px] text-[#00A3E0] font-bold">Devis Instantané</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Side: Parameters Customizer */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide block mb-1.5">Catégorie de Site Web</label>
                      <select 
                        value={webSiteType} 
                        onChange={(e) => setWebSiteType(e.target.value)}
                        className="w-full bg-white border border-slate-350 rounded p-2 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#00A3E0] cursor-pointer"
                      >
                        <option value="vitrine">Site Vitrine Professionnel (1-5 pages) ~200.000 FCFA</option>
                        <option value="ecommerce">Boutique E-commerce (Wave/OM/Cartes) ~420.000 FCFA</option>
                        <option value="app">Application Métier / Portail Web sur mesure ~600.000 FCFA</option>
                      </select>
                    </div>

                    <div className="space-y-2.5 pt-1">
                      <div className="flex items-center gap-2.5">
                        <input 
                          type="checkbox" 
                          id="web-seo" 
                          checked={includeSeo} 
                          onChange={(e) => setIncludeSeo(e.target.checked)}
                          className="rounded border-slate-350 text-[#00A3E0] focus:ring-[#00A3E0] cursor-pointer"
                        />
                        <label htmlFor="web-seo" className="text-[11px] font-bold text-slate-700 cursor-pointer select-none">
                          Optimisation SEO Locale avancée (+30 000 FCFA)
                        </label>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <input 
                          type="checkbox" 
                          id="web-interactive" 
                          checked={includeInteractive} 
                          onChange={(e) => setIncludeInteractive(e.target.checked)}
                          className="rounded border-slate-350 text-[#00A3E0] focus:ring-[#00A3E0] cursor-pointer"
                        />
                        <label htmlFor="web-interactive" className="text-[11px] font-bold text-slate-700 cursor-pointer select-none">
                          Module WhatsApp Pro & Devis direct (+50 000 FCFA)
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Smart Preview and Action button */}
                  <div className="bg-white border border-slate-200 rounded-lg p-3.5 flex flex-col justify-between shadow-sm">
                    <div className="space-y-3">
                      <div className="flex justify-between items-baseline">
                        <span className="text-[9.5px] uppercase font-bold text-slate-400 font-sans">Total Estimé :</span>
                        <span className="text-base md:text-lg font-black text-rose-600 font-mono">
                          {calculateWebQuote().toLocaleString()} FCFA
                        </span>
                      </div>
                      
                      <div className="border-t border-slate-100 pt-2.5 space-y-1 text-[10px] text-slate-600">
                        <div className="flex justify-between">
                          <span>Technologie :</span>
                          <span className="font-bold text-slate-800">React • Tailwind CSS</span>
                        </div>
                        <div className="flex justify-between">
                          <span>SEO Sénégal Google :</span>
                          <span className="font-semibold text-emerald-600">{includeSeo ? 'Oui (Inclus)' : 'Standard'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Moteur interactif :</span>
                          <span className="font-semibold text-slate-800">{includeInteractive ? 'WhatsApp & Formulaire' : 'Formulaire par défaut'}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        onNavigate('contact', { contactService: 'web' });
                      }}
                      className="w-full py-2 bg-[#00A3E0] hover:bg-cyan-600 text-white font-extrabold text-[10px] uppercase rounded tracking-widest mt-4 transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      Prendre un devis sur ce modèle
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>

                {/* Aesthetic Web Preview Panel representation to keep the nice visuals */}
                <div className="bg-slate-100 rounded-lg p-3 flex flex-col justify-center items-center border border-slate-200/50">
                  <div className="w-full max-w-[260px] border border-slate-300 rounded-lg overflow-hidden bg-slate-50 shadow-md">
                    <div className="bg-slate-200 p-1.5 text-[8px] font-mono text-slate-500 flex justify-between select-none">
                      <span>🔒 https://devis-nerva.sn</span>
                      <span>📱 Aperçu Mobile</span>
                    </div>
                    <div className="p-3 space-y-2 bg-white text-center">
                      <div className="w-6 h-6 rounded-full bg-cyan-100 text-[#00A3E0] mx-auto flex items-center justify-center font-black text-[9px]">N</div>
                      <h4 className="text-[9.5px] font-black text-[#07152B] uppercase tracking-wider">
                        {webSiteType === 'vitrine' ? 'Site Vitrine Haute Performance' : webSiteType === 'ecommerce' ? 'E-Commerce Wave / OM' : 'Portail Web Métier'}
                      </h4>
                      <div className="h-1 w-20 bg-slate-200 rounded mx-auto animate-pulse" />
                      <div className="flex justify-center gap-1.5 pt-1.5">
                        <span className="bg-[#00A3E0] text-white text-[6.5px] px-1.5 py-0.5 rounded font-bold">
                          {webSiteType === 'ecommerce' ? 'Wave Direct' : 'Prendre Devis'}
                        </span>
                        {includeInteractive && (
                          <span className="bg-emerald-500 text-white text-[6.5px] px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5">
                            💬 WhatsApp
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 1 && activeTab !== 0 && (
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-100 text-[#00A3E0] flex items-center justify-center animate-bounce">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Prêt à propulser votre entreprise ?</h4>
                    <p className="text-[10.5px] text-slate-500">Demandez votre étude gratuite dès aujourd'hui auprès de NERVA.</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const servicesKeys = ['web', 'hotel', 'design', 'cv', 'it'];
                    onNavigate('contact', { contactService: servicesKeys[activeTab] || 'web' });
                  }}
                  className="px-4 py-2 bg-[#07152B] hover:bg-[#0f284e] text-white font-bold text-xs rounded uppercase tracking-wider flex items-center gap-1 px-4 cursor-pointer"
                >
                  Choisir ce service
                  <ChevronRight size={14} />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* SECTION B: ESTIMATEUR DE BUDGET SÉNÉGALAIS (CONCRET, ACCUEILLANT, ET EXCLUSIF A L'IMAGE DE NERVA) */}
      <div className="max-w-4xl mx-auto px-4 mt-20" id="budget-estimator">
        <div className="bg-gradient-to-r from-[#07152B] to-[#0a2347] rounded-2xl shadow-xl border border-cyan-500/30 p-6 md:p-8 text-white relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400 opacity-5 blur-3xl rounded-full pointer-events-none" />

          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Calculator className="text-[#00A3E0] w-6 h-6 shrink-0" />
              <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-wide">ESTIMATEUR DE BUDGET CLIENT APPRÉCIATIF</h2>
            </div>
            
            {/* Interactive Mode Selector: Standard vs Custom Range */}
            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                type="button"
                onClick={() => setCustomProjectActive(false)}
                className={`py-1.5 px-3 rounded text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${!customProjectActive ? 'bg-[#00A3E0] text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
              >
                Forfaits Prédéfinis
              </button>
              <button
                type="button"
                onClick={() => setCustomProjectActive(true)}
                className={`py-1.5 px-3 rounded text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${customProjectActive ? 'bg-[#00A3E0] text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}
              >
                Projet Sur-Mesure (Intervalle)
              </button>
            </div>
          </div>
          
          <p className="text-slate-300 text-xs md:text-sm mb-6 max-w-2xl leading-relaxed">
            {customProjectActive 
              ? "Structurez votre cahier des charges libre ci-dessous. Notre algorithme calcule une estimation budgétaire sous forme d'intervalle basé sur l'envergure, la complexité et les technologies souhaitées."
              : "Nous valorisons la transparence absolue. Cochez les options souhaitées pour simuler un estimatif de réalisation. À la validation, cela enverra une synthèse à notre équipe technique."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Options Selection column */}
            <div className="space-y-4">
              
              {!customProjectActive ? (
                /* Mode 1: Standard predefined packages selection */
                <div className="space-y-2.5">
                  <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Prestations à inclure :</label>
                  
                  <div 
                    onClick={() => toggleServiceSelection('web')}
                    className={`p-3.5 rounded-lg border cursor-pointer select-none transition-all flex justify-between items-center ${selectedServices.includes('web') ? 'bg-[#00A3E0]/20 border-[#00A3E0] text-white' : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-600'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-4 h-4 text-cyan-400 animate-pulse" />
                      <span className="text-xs font-bold font-sans">Création de Site Web Vitrine</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-white">~250 000 FCFA</span>
                  </div>

                  <div 
                    onClick={() => toggleServiceSelection('hotel')}
                    className={`p-3.5 rounded-lg border cursor-pointer select-none transition-all flex justify-between items-center ${selectedServices.includes('hotel') ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-600'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Hotel className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold font-sans">Digitalisation de Résidence / Hôtel</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-white">~450 000 FCFA</span>
                  </div>

                  <div 
                    onClick={() => toggleServiceSelection('design')}
                    className={`p-3.5 rounded-lg border cursor-pointer select-none transition-all flex justify-between items-center ${selectedServices.includes('design') ? 'bg-amber-500/20 border-amber-500 text-white' : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-600'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Palette className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold font-sans">Pack Affiches & Com Réseaux Sociaux</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-white">~75 000 FCFA</span>
                  </div>

                  <div 
                    onClick={() => toggleServiceSelection('cv')}
                    className={`p-3.5 rounded-lg border cursor-pointer select-none transition-all flex justify-between items-center ${selectedServices.includes('cv') ? 'bg-violet-500/20 border-violet-500 text-white' : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-600'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-violet-400" />
                      <span className="text-xs font-bold font-sans">Réalisation de CV Professionnel Premium</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-white">~15 000 FCFA</span>
                  </div>

                  {selectedServices.includes('web') && (
                    <div className="flex items-center gap-2.5 pt-2 bg-slate-900/30 p-2.5 rounded-lg">
                      <input 
                        type="checkbox" 
                        id="host-est" 
                        checked={estimatedHosting} 
                        onChange={(e) => setEstimatedHosting(e.target.checked)}
                        className="rounded border-slate-700 text-[#00A3E0]" 
                      />
                      <label htmlFor="host-est" className="text-xs text-slate-300 font-medium cursor-pointer select-none">
                        Inclure le nom de domaine 🇸🇳 (.sn / .com) & hébergement cloud d'un an (+35 000 FCFA)
                      </label>
                    </div>
                  )}
                </div>
              ) : (
                /* Mode 2: Custom personalized project configurer */
                <div className="space-y-4 animate-fade-in text-white">
                  
                  {/* Parameter 1: Project nature */}
                  <div>
                    <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Type de projet souhaité :</label>
                    <select
                      value={customProjectType}
                      onChange={(e) => setCustomProjectType(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white font-bold focus:outline-none focus:border-[#00A3E0] cursor-pointer"
                    >
                      <option value="web-app">💻 Application Web Métier (Portail, SaaS, CRM)</option>
                      <option value="mobile">📱 Application Mobile hybride (iOS & Android)</option>
                      <option value="ecommerce_adv">🛒 Boutique E-Commerce Avancée sur-mesure</option>
                      <option value="marketplace">🌐 Plateforme Multi-vendeurs / Marketplace</option>
                      <option value="other">⚙️ Autre Projet Informatique Spécifique</option>
                    </select>
                  </div>

                  {/* Parameter 2: Scale scope */}
                  <div>
                    <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Échelle / Pages de l'application :</label>
                    <div className="flex gap-2">
                      {[
                        { key: 'small', label: '1 - 5 écrans', d: 'MVP ciblé' },
                        { key: 'medium', label: '6 - 15 écrans', d: 'Standard robuste' },
                        { key: 'large', label: '15+ écrans', d: 'Grande envergure' }
                      ].map((sz) => (
                        <button
                          key={sz.key}
                          type="button"
                          onClick={() => setCustomProjectSize(sz.key)}
                          className={`flex-1 p-2 rounded text-left border transition-all cursor-pointer ${customProjectSize === sz.key ? 'bg-cyan-950/40 border-[#00A3E0] text-white' : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                        >
                          <p className="text-[10px] font-extrabold uppercase leading-none">{sz.label}</p>
                          <p className="text-[8px] text-slate-400 mt-1 leading-none">{sz.d}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Parameter 3: Complexity level */}
                  <div>
                    <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Complexité et Finition :</label>
                    <div className="flex gap-2">
                      {[
                        { key: 'basic', label: 'Simple', d: 'Basique & efficace' },
                        { key: 'standard', label: 'Recommandé', d: 'Finition complète' },
                        { key: 'advanced', label: 'Avancée', d: 'Temps réel & Sécurité' }
                      ].map((c) => (
                        <button
                          key={c.key}
                          type="button"
                          onClick={() => setCustomProjectComplexity(c.key)}
                          className={`flex-1 p-2 rounded text-left border transition-all cursor-pointer ${customProjectComplexity === c.key ? 'bg-indigo-950/40 border-indigo-500 text-white' : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                        >
                          <p className="text-[10px] font-extrabold uppercase leading-none">{c.label}</p>
                          <p className="text-[8px] text-slate-400 mt-1 leading-none">{c.d}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Parameter 4: Specific components checkboxes */}
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Modules requis :</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { key: 'db', label: 'Base de données active' },
                        { key: 'payment', label: 'Intégration Wave/OM' },
                        { key: 'auth', label: 'Espace client sécurisé' },
                        { key: 'sms', label: 'SMS & WhatsApp automatisés' }
                      ].map((feat) => {
                        const active = customProjectFeatures.includes(feat.key);
                        return (
                          <div
                            key={feat.key}
                            onClick={() => toggleCustomFeature(feat.key)}
                            className={`p-2 rounded border text-[10px] font-semibold cursor-pointer select-none transition-all flex items-center gap-2 ${active ? 'bg-[#00A3E0]/15 border-[#00A3E0] text-white' : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                          >
                            <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${active ? 'bg-[#00A3E0] border-[#00A3E0] text-slate-950' : 'border-slate-600 bg-transparent'}`}>
                              {active && <Check size={11} strokeWidth={4} />}
                            </div>
                            <span>{feat.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

            </div>
 
            {/* Price Result display block */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-850 flex flex-col justify-between h-full min-h-[260px]">
              <div>
                
                <span className="text-[10px] text-[#00A3E0] font-extrabold uppercase block tracking-wider mb-2">
                  {customProjectActive ? "ESTIMATION INDICATIVE (INTERVALLE) :" : "SYNTHÈSE DE VOTRE DEVIS ESTIMATIF :"}
                </span>
                
                <div className="space-y-1.5">
                  <p className="text-[8px] text-slate-500 font-mono">// Nerva Estimation Algorithm</p>
                  
                  {!customProjectActive ? (
                    <p className="text-2xl md:text-3xl font-black text-white font-mono flex items-baseline gap-1.5">
                      {calculateTotal().toLocaleString()} 
                      <span className="text-xs text-[#00A3E0]">FCFA</span>
                    </p>
                  ) : (
                    <div>
                      <p className="text-xl md:text-2xl font-black text-rose-500 font-mono leading-none">
                        {calculateCustomProjectInterval().min.toLocaleString()} • {calculateCustomProjectInterval().max.toLocaleString()}
                      </p>
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase mt-1 inline-block bg-rose-950/40 text-rose-400 px-2 py-0.5 rounded border border-rose-900/30">
                        FCFA (Fourchette Estimée)
                      </span>
                    </div>
                  )}
                </div>

                {!customProjectActive ? (
                  <div className="mt-4 space-y-1.5 text-[10px] text-slate-300 border-t border-slate-900 pt-3">
                    <p className="flex justify-between">
                      <span>Prestations sélectionnées :</span> 
                      <span className="font-extrabold text-[#00A3E0]">{selectedServices.length}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Hébergement cloud inclus :</span> 
                      <span className="font-extrabold">{estimatedHosting ? 'Oui' : 'Non'}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Délai moyen d'exécution :</span> 
                      <span className="text-emerald-400 font-bold">12-25 jours</span>
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 space-y-1.5 text-[10px] text-slate-300 border-t border-slate-900 pt-3">
                    <p className="flex justify-between">
                      <span>Structure :</span> 
                      <span className="font-extrabold text-cyan-400 uppercase">
                        {customProjectType === 'web-app' ? 'Web App' : customProjectType === 'mobile' ? 'Mobile iOS/Android' : customProjectType === 'ecommerce_adv' ? 'E-Commerce Adv' : customProjectType === 'marketplace' ? 'Marketplace' : 'Spécifique'}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span>Envergure screens :</span> 
                      <span className="font-extrabold">
                        {customProjectSize === 'small' ? '1 - 5 (Simple)' : customProjectSize === 'medium' ? '6 - 15 (Standard)' : '15+ (Complexe)'}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span>Finition / Complexité :</span> 
                      <span className="font-bold text-indigo-400 uppercase">
                        {customProjectComplexity === 'basic' ? 'Essentielle' : customProjectComplexity === 'standard' ? 'SLA Standard' : 'Premium robuste'}
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span>Modules de données :</span> 
                      <span className="font-extrabold text-emerald-400">{customProjectFeatures.length} actif(s)</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Délai prévu d'évaluation :</span> 
                      <span className="text-amber-400 font-bold">15-30 jours ouvrables</span>
                    </p>
                  </div>
                )}
              </div>

              {!customProjectActive ? (
                <button
                  type="button"
                  onClick={() => {
                    const selectedLabels = selectedServices.map(key => {
                      if (key === 'web') return 'Site Web Vitrine (~250k FCFA)';
                      if (key === 'hotel') return 'Digitalisation d\'Hôtel (~450k FCFA)';
                      if (key === 'design') return 'Pack Design & Affiches (~75k FCFA)';
                      if (key === 'cv') return 'Réalisation de CV Premium (~15k FCFA)';
                      if (key === 'it') return 'Prestation informatique sur mesure (~150k FCFA)';
                      return key;
                    });
                    const msg = `Bonjour NERVA, j'ai réalisé une simulation budgétaire en ligne et je souhaite soumettre ma requête de devis pour les prestations suivantes :\n\n` +
                      `● Prestations sélectionnées : ${selectedLabels.join(', ')}\n` +
                      `● Option hébergement + .sn d'un an : ${estimatedHosting && selectedServices.includes('web') ? 'Oui (+35 000 FCFA)' : 'Non'}\n\n` +
                      `● Budget estimatif simulé : ${calculateTotal().toLocaleString()} FCFA\n\n` +
                      `Merci d'étudier mon besoin de manière prioritaire.`;
                    onNavigate('contact', { contactService: selectedServices[0] || 'web', contactMessage: msg });
                  }}
                  className="w-full py-3 bg-[#00A3E0] hover:bg-cyan-600 text-slate-950 text-xs font-extrabold rounded-lg uppercase tracking-wider transition-all mt-6 shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Proposer ce devis estimatif à NERVA
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const projectTypeName = 
                      customProjectType === 'web-app' ? 'Application Web Métier (SaaS/CRM)' :
                      customProjectType === 'mobile' ? 'Application Mobile iOS/Android' :
                      customProjectType === 'ecommerce_adv' ? 'Site E-Commerce Premium sur-mesure' :
                      customProjectType === 'marketplace' ? 'Marketplace / Plateforme à forte audience' : 'Projet Spécifique sur-mesure';

                    const complexityName = 
                      customProjectComplexity === 'basic' ? 'Simple / MVP' :
                      customProjectComplexity === 'standard' ? 'Standard complet' : 'Avancée haute performance';

                    const sizeName = 
                      customProjectSize === 'small' ? '1 à 5 écrans (Petite envergure)' :
                      customProjectSize === 'medium' ? '6 à 15 écrans (Écosystème robuste)' : '15+ écrans (Envergure globale)';

                    const selectedAddons: string[] = [];
                    if (customProjectFeatures.includes('db')) selectedAddons.push('Base de données persistante');
                    if (customProjectFeatures.includes('payment')) selectedAddons.push('Paiement direct Wave/OrangeMoney/Cartes');
                    if (customProjectFeatures.includes('auth')) selectedAddons.push('Comptes utilisateurs & Sessions');
                    if (customProjectFeatures.includes('sms')) selectedAddons.push('Système d\'alertes SMS & WhatsApp');

                    const range = calculateCustomProjectInterval();
                    const msg = `Bonjour NERVA, je souhaite obtenir un devis définitif pour un projet 100% personnalisé basé sur les estimateurs tarifaires du site : \n\n` +
                      `● Type de projet : ${projectTypeName}\n` +
                      `● Niveau de complexité : ${complexityName}\n` +
                      `● Envergure estimée : ${sizeName}\n` +
                      `● Modules intégrés : ${selectedAddons.length > 0 ? selectedAddons.join(', ') : 'Aucun module spécifique'}\n\n` +
                      `● Tranche budgétaire indicative calculée : ${range.min.toLocaleString()} FCFA - ${range.max.toLocaleString()} FCFA\n\n` +
                      `Veuillez me recontacter pour que l'on commence l'analyse de nos spécifications fonctionnelles jointes.`;

                    onNavigate('contact', { contactService: 'custom', contactMessage: msg });
                  }}
                  className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white text-xs font-extrabold rounded-lg uppercase tracking-wider transition-all mt-6 shadow-lg hover:shadow-rose-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Prendre devis sur cet intervalle
                  <ArrowRight size={14} />
                </button>
              )}
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
export default Services;
