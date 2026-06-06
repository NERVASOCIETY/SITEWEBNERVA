/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  HelpCircle,
  Share2,
  ThumbsUp,
  MapPin,
  Laptop
} from 'lucide-react';

interface ContactProps {
  selectedService: string;
  setSelectedService: (service: string) => void;
  initialMessage?: string;
}

export const Contact: React.FC<ContactProps> = ({ selectedService, setSelectedService, initialMessage = '' }) => {
  // Form State
  const [formData, setFormData] = React.useState(() => {
    const saved = localStorage.getItem('nerva_contact_form');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          name: parsed.name || '',
          email: parsed.email || '',
          phone: parsed.phone || '',
          company: parsed.company || '',
          service: selectedService || parsed.service || 'web',
          message: initialMessage || parsed.message || ''
        };
      } catch (e) {
        // ignore
      }
    }
    return {
      name: '',
      email: '',
      phone: '',
      company: '',
      service: selectedService,
      message: initialMessage
    };
  });

  // Save changes to localStorage
  React.useEffect(() => {
    localStorage.setItem('nerva_contact_form', JSON.stringify(formData));
  }, [formData]);

  // Sync prop changes into local state
  React.useEffect(() => {
    setFormData(prev => ({
      ...prev,
      service: selectedService,
      message: initialMessage || prev.message
    }));
  }, [selectedService, initialMessage]);

  // Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sqlNeeded, setSqlNeeded] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSqlNeeded(null);
    setIsCopied(false);
    
    // Check if we are running in a static web hosting environment (like GitHub Pages) without a functioning Express backend
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    try {
      let useDirectClient = isGitHubPages;
      
      // Look for public client-side env variables configured in Vite
      const publicSbUrl = import.meta.env.VITE_SUPABASE_URL || '';
      const publicSbKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
      
      if (!useDirectClient) {
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          // If GitHub Pages or similar static hosting, this route will yield a 404 HTML, or network error.
          const contentType = response.headers.get('content-type') || '';
          if (response.status === 404 || !contentType.includes('application/json')) {
            if (publicSbUrl && publicSbKey) {
              useDirectClient = true;
            } else {
              throw new Error("Le serveur d'API (/api/contact) est introuvable (route non démarrée ou hébergement statique type GitHub Pages détecté). Veuillez renseigner VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY pour permettre l'envoi direct.");
            }
          } else {
            const result = await response.json();

            if (!response.ok || result.success === false) {
              setErrorMessage(result.error || "Une erreur s'est produite lors de l'envoi.");
              if (result.sqlNeeded) {
                setSqlNeeded(result.sqlNeeded);
              }
              setIsSubmitting(false);
              return;
            }

            // Successful submission via backend route API
            onSuccess();
            return;
          }
        } catch (fetchError: any) {
          // Fallback if the fetch fails completely (example: server offline or network failure)
          if (publicSbUrl && publicSbKey) {
            useDirectClient = true;
          } else {
            throw fetchError;
          }
        }
      }

      if (useDirectClient) {
        if (!publicSbUrl || !publicSbKey) {
          throw new Error("Pour transmettre des formulaires en direct depuis un hébergement statique (comme GitHub Pages), vous devez configurer les variables d'environnement VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.");
        }

        const supabase = createClient(publicSbUrl, publicSbKey);
        const { error: insertError } = await supabase
          .from('contacts')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              company: formData.company,
              service: formData.service,
              message: formData.message,
            }
          ]);

        if (insertError) {
          throw new Error(`Échec de communication directe avec Supabase : ${insertError.message}`);
        }

        onSuccess();
        return;
      }

    } catch (error: any) {
      console.error(error);
      setIsSubmitting(false);
      setErrorMessage(error.message || "Impossible de joindre le serveur. Veuillez vérifier votre connexion réseau.");
    }
  };

  const onSuccess = () => {
    setIsSubmitting(false);
    setIsSubmitted(true);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: selectedService,
      message: ''
    });
    localStorage.removeItem('nerva_contact_form');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'service') {
      setSelectedService(value);
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full bg-slate-50 py-10 md:py-16 font-sans">
      
      {/* Title block */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-12">
        <div className="border-l-4 border-[#00A3E0] pl-4 md:pl-6 max-w-2xl">
          <span className="text-[#00A3E0] text-xs font-extrabold uppercase tracking-widest block mb-1">PRENDONS ATTACHE</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#07152B] leading-tight mb-2">
            PARLONS DE VOTRE PROJET
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            Bénéficiez d'un devis gratuit et personnalisé pour votre entreprise sous 24 heures. Nos équipes sont basées à Dakar et mobiles dans tout le Sénégal.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Column: Direct Call, WhatsApp & Social Channels (Matching Flyer details) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          {/* Main Senegal Focus Card with deep midnight blue */}
          <div className="bg-[#07152B] border border-cyan-500/30 rounded-2xl p-6 text-white space-y-6 relative overflow-hidden flex-1">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500 opacity-5 blur-3xl pointer-events-none" />
            
            <div className="space-y-2">
              <span className="text-xs text-[#00A3E0] uppercase font-bold tracking-widest block mb-1">RÉALITÉS LOCALES</span>
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-wide">BASÉS AU SÉNÉGAL</h2>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-sans">
                Nous comprenons vos besoins et proposons des solutions technologiques haut de gamme adaptées aux réalités économiques et d'usages de votre clientèle.
              </p>
            </div>

            {/* Direct Lines of Communication from flyer */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">NUMÉROS D'URGENCE PROJETS :</p>
              
              <div className="space-y-3 font-mono text-xs md:text-sm">
                
                {/* Line 1 */}
                <a 
                  href="tel:+221702007285" 
                  className="flex items-center gap-3.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-[#00A3E0]/50 hover:bg-slate-950 transition-all select-none group"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-804 bg-[#00A3E0]/20 flex items-center justify-center text-[#00A3E0] shrink-0 group-hover:scale-105 transition-transform">
                    <Phone size={14} />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[9.5px] text-slate-400 uppercase tracking-widest">Ligne Mobile Directe 1</p>
                    <p className="text-xs font-extrabold text-white mt-0.5">+221 70 200 72 85</p>
                  </div>
                </a>

                {/* Line 2 */}
                <a 
                  href="tel:+221762442530" 
                  className="flex items-center gap-3.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-[#00A3E0]/50 hover:bg-slate-950 transition-all select-none group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#00A3E0]/25 flex items-center justify-center text-[#00A3E0] shrink-0 group-hover:scale-105 transition-transform">
                    <Phone size={14} />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[9.5px] text-slate-400 uppercase tracking-widest">Ligne Mobile / WhatsApp 2</p>
                    <p className="text-xs font-extrabold text-white mt-0.5">+221 76 244 25 30</p>
                  </div>
                </a>

                {/* Line 3 */}
                <a 
                  href="tel:+221764644597" 
                  className="flex items-center gap-3.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-[#00A3E0]/50 hover:bg-slate-950 transition-all select-none group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#00A3E0]/25 flex items-center justify-center text-[#00A3E0] shrink-0 group-hover:scale-105 transition-transform">
                    <Phone size={14} />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[9.5px] text-slate-400 uppercase tracking-widest">Ligne Mobile Technique 3</p>
                    <p className="text-xs font-extrabold text-white mt-0.5">+221 76 464 45 97</p>
                  </div>
                </a>

                {/* Email */}
                <a 
                  href="mailto:nerva.society@gmail.com" 
                  className="flex items-center gap-3.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-[#00A3E0]/50 hover:bg-slate-950 transition-all select-none group"
                >
                  <div className="w-8 h-8 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail size={14} />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[9.5px] text-slate-400 uppercase tracking-widest">Email Corporatif principal</p>
                    <p className="text-xs font-extrabold text-white mt-0.5">nerva.society@gmail.com</p>
                  </div>
                </a>

              </div>
            </div>

            {/* Social channels layout exactly as flyer */}
            <div className="space-y-3 pt-4 border-t border-slate-800 text-center lg:text-left">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">SUIVEZ-NOUS EN LIGNE</p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs">
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-bold text-cyan-400">#NervaDigital</span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Facebook</span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">Instagram</span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">LinkedIn</span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">YouTube</span>
              </div>
            </div>

          </div>

          {/* Quick response commitment banner */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 shadow-sm hover:border-[#00A3E0] transition-colors">
            <Clock className="text-[#00A3E0] w-6 h-6 shrink-0" />
            <div className="leading-tight">
              <h4 className="text-xs font-extrabold uppercase text-slate-800 tracking-wider">Délai de Réponse Certifié</h4>
              <p className="text-[11px] text-slate-500 mt-1">Nous analysons votre demande et émettons un devis sous 2 hours ouvrées par e-mail.</p>
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Form UI with user interactions */}
        <div className="lg:col-span-7">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm h-full flex flex-col justify-between">
            
            {isSubmitted ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-center space-y-6">
                
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center animate-bounce shadow-lg">
                  <CheckCircle size={32} />
                </div>

                <div className="space-y-2 max-w-sm">
                  <h3 className="text-xl font-extrabold text-slate-900 uppercase">DEMANDE BIEN REÇUE !</h3>
                  <p className="text-slate-500 text-xs md:text-sm">
                    Votre message a été transmis à notre équipe technique. Un conseiller NERVA vous appellera d'ici peu pour valider les jalons d'estimation.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 border rounded-xl border-slate-200 text-xs text-slate-600 space-y-2 mt-4 text-left w-full">
                  <p className="font-bold uppercase text-slate-800 flex items-center gap-1">
                    <Laptop size={13} className="text-[#00A3E0]" />
                    Récapitulatif de la soumission :
                  </p>
                  <p>● Type de projet : Analyse en direct</p>
                  <p>● Statut SLA : Prioritaire (Sénégal Hub)</p>
                  <p>● Heure de prise en charge : Immédiate</p>
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 bg-[#07152B] hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-lg cursor-pointer transition-transform duration-300"
                >
                  Envoyer une autre demande
                </button>

              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col justify-between">
                
                <div className="space-y-4">
                  
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <MessageSquare size={18} className="text-[#00A3E0]" />
                    <h2 className="text-sm md:text-base font-extrabold text-slate-900 uppercase tracking-wide">ÉCRIVEZ-NOUS EN DIRECT</h2>
                  </div>

                  {errorMessage && (
                    <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs space-y-2">
                      <p className="font-extrabold uppercase flex items-center gap-1">
                        <HelpCircle size={14} className="text-rose-500 animate-pulse" />
                        Alerte de configuration base de données
                      </p>
                      <p className="font-medium text-slate-700">{errorMessage}</p>
                      
                      {sqlNeeded && (
                        <div className="mt-3 space-y-2 pt-3 border-t border-rose-200/50">
                          <p className="font-sans font-extrabold text-slate-800">
                            👉 Résolution : Créez la table dans votre console Supabase :
                          </p>
                          <p className="text-[10.5px] text-slate-600 leading-normal">
                            Allez sur votre tableau de bord Supabase, ouvrez l'onglet <strong className="text-slate-800">SQL Editor</strong>, créez une nouvelle requête, collez le code suivant, puis cliquez sur <strong className="text-slate-804 font-extrabold text-[#00A3E0]">Run</strong> :
                          </p>
                          <div className="relative bg-[#07152B] border border-slate-800 rounded-lg p-3 text-slate-100 font-mono text-[10px] leading-relaxed overflow-x-auto max-h-48 mt-1">
                            <pre className="text-[#00A3E0] font-bold">{sqlNeeded}</pre>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(sqlNeeded);
                                setIsCopied(true);
                                setTimeout(() => setIsCopied(false), 2000);
                              }}
                              className="absolute top-2 right-2 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-[9.5px] rounded text-white font-sans transition-colors cursor-pointer border border-slate-700/50 font-extrabold"
                            >
                              {isCopied ? "Copié !" : "Copier"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Input 1: Name */}
                  <div>
                    <label className="block text-[10.5px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Nom complet / Nom d'entreprise *</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ex: Hôtellerie de Saly, Cabinet Sow & Fils"
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 font-medium focus:bg-white focus:outline-none focus:border-[#00A3E0] focus:ring-1 focus:ring-[#00A3E0] transition-all"
                    />
                  </div>

                  {/* Inputs in Group (Email & Phone) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div>
                      <label className="block text-[10.5px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Adresse de messagerie (E-mail) *</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Ex: contact@votre-entreprise.sn"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 font-medium focus:bg-white focus:outline-none focus:border-[#00A3E0] focus:ring-1 focus:ring-[#00A3E0] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10.5px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Téléphone Sénégal / WhatsApp *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Ex: +221 77 XXX XX XX"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 font-medium focus:bg-white focus:outline-none focus:border-[#00A3E0] focus:ring-1 focus:ring-[#00A3E0] transition-all"
                      />
                    </div>

                  </div>

                  {/* Select Service Dropdown */}
                  <div>
                    <label className="block text-[10.5px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Quel service requiert votre attention ?</label>
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 font-bold focus:bg-white focus:outline-none focus:border-[#00A3E0]"
                    >
                      <option value="web">Création de site internet moderne (Vitrine / Boutique)</option>
                      <option value="hotel">Digitalisation d'hôtel / Module de réservation locale</option>
                      <option value="design">Conception d'affiches publicitaires & Chartes</option>
                      <option value="cv">Réalisation de CV Professionnel Premium d'impact</option>
                      <option value="it">Prestation informatique sur mesure / Infogérance</option>
                      <option value="custom">Projet spécialisé 100% sur mesure (Cahier des charges libre)</option>
                    </select>
                  </div>

                  {/* Textarea: Brief Details */}
                  <div>
                    <label className="block text-[10.5px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Décrivez brièvement les objectifs de votre projet *</label>
                    <textarea 
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Indiquez vos besoins, votre budget ou le délai espéré pour nous aider à préparer votre premier prototype lors de notre appel..."
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 font-medium focus:bg-white focus:outline-none focus:border-[#00A3E0] focus:ring-1 focus:ring-[#00A3E0] transition-all"
                    />
                  </div>

                </div>

                {/* Submit button with loader */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#07152B] hover:bg-[#122c54] text-[#00A3E0] font-black text-xs uppercase tracking-widest rounded-lg transition-all shadow-md mt-6 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full border-2 border-[#00A3E0] border-t-transparent animate-spin" />
                      Transmission de vos consignes...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Proposer mon projet à NERVA</span>
                      <Send size={13} className="text-[#00A3E0]" />
                    </div>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>

      </div>

      {/* Searchable / Interactive Localization Map Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-12 md:mt-16">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#00A3E0]/10 border border-[#00A3E0]/20 text-[#00A3E0] text-[10px] font-extrabold uppercase tracking-widest">
                <MapPin size={11} /> Notre Siège Régional
              </div>
              <h3 className="text-xl md:text-2xl font-black text-[#07152B] uppercase">
                MBOUR, PETITE CÔTE
              </h3>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                Notre agence principale est idéalement implantée à <strong>Mbour, Sénégal</strong>, carrefour stratégique d'innovation numérique et pôle à forte croissance près de Saly Portudal et de Somone.
              </p>
              
              <div className="space-y-3 font-sans text-xs pt-4 border-t border-slate-100">
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 font-bold">1</div>
                  <p className="text-slate-600">
                    <strong className="text-slate-800 block">Adresse & Quartier :</strong>
                    Avenue Demba Diop, Zone administrative, Mbour, Sénégal.
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 font-bold">2</div>
                  <p className="text-slate-600">
                    <strong className="text-slate-800 block">Zone d'intervention :</strong>
                    Mbour, Saly, Somone, Joal, Thiès, Dakar et dans toutes les régions du Sénégal.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 border rounded-xl border-slate-200 text-[11px] text-slate-600">
              <span className="font-extrabold text-[#07152B] block uppercase mb-1">PROXIMITÉ COMMERCIALE</span>
              Nous organisons des rencontres de cadrage dans vos locaux partout sur l'axe Dakar - Mbour sous 24 heures.
            </div>
          </div>

          <div className="lg:col-span-8 min-h-[300px] md:min-h-[400px] rounded-xl overflow-hidden border border-slate-200 relative group shadow-sm bg-slate-100">
            {/* Embedded Interactive High-Accuracy OpenStreetMap */}
            <iframe 
              title="NERVA Mbour Senegal Location Map"
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight={0} 
              marginWidth={0} 
              src="https://www.openstreetmap.org/export/embed.html?bbox=-16.985%2C14.395%2C-16.945%2C14.435&amp;layer=mapnik&amp;marker=14.4140%2C-16.9635"
              className="absolute inset-0 w-full h-full grayscale-[15%] contrast-[105%] group-hover:grayscale-0 transition-all duration-700"
              style={{ border: 0 }}
            />
            {/* Interactive directions quick badge */}
            <div className="absolute bottom-4 left-4 right-4 md:right-auto bg-[#07152B] text-white p-3 rounded-xl border border-[#00A3E0]/35 shadow-xl flex items-center justify-between md:justify-start gap-3 backdrop-blur-md transition-opacity duration-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#00A3E0] flex items-center justify-center text-white shrink-0 font-extrabold animate-pulse">
                  <MapPin size={14} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-[#00A3E0]">Mbour, Sénégal</p>
                  <p className="text-[9.5px] text-slate-300">Coordonnées : 14.4140° N, 16.9635° W</p>
                </div>
              </div>
              <a 
                href="https://www.openstreetmap.org/?mlat=14.4140&amp;mlon=-16.9635#map=15/14.4140/-16.9635" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-7 h-7 rounded bg-slate-800 text-white flex items-center justify-center hover:bg-[#00A3E0] hover:text-white transition-colors"
                title="Ouvrir sur OpenStreetMap"
              >
                <ArrowRight size={12} />
              </a>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
export default Contact;
