/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PageId } from './types';
import { BrandLogo } from './components/BrandLogo';
import { Accueil } from './pages/Accueil';
import { Services } from './pages/Services';
import { APropos } from './pages/APropos';
import { Contact } from './pages/Contact';
import { 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUpRight, 
  Globe, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>(() => {
    // 1. Try to get page from URL hash first
    const hash = window.location.hash.replace('#', '') as PageId;
    if (['accueil', 'services', 'apropos', 'contact'].includes(hash)) {
      return hash;
    }
    // 2. Fallback to localStorage
    const saved = localStorage.getItem('nerva_activePage');
    if (saved && ['accueil', 'services', 'apropos', 'contact'].includes(saved)) {
      return saved as PageId;
    }
    return 'accueil';
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const [activeServiceTab, setActiveServiceTab] = useState<number>(() => {
    const saved = localStorage.getItem('nerva_activeServiceTab');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  const [selectedContactService, setSelectedContactService] = useState<string>(() => {
    const saved = localStorage.getItem('nerva_selectedContactService');
    return saved || 'web';
  });

  const [contactInitialMessage, setContactInitialMessage] = useState<string>(() => {
    const saved = localStorage.getItem('nerva_contactInitialMessage');
    return saved || '';
  });

  // Effect to handle navigation via browser back / forward buttons (hashchange event)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (['accueil', 'services', 'apropos', 'contact'].includes(hash)) {
        setActivePage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync state to localStorage & browser hash
  useEffect(() => {
    localStorage.setItem('nerva_activePage', activePage);
    if (window.location.hash !== `#${activePage}`) {
      window.location.hash = activePage;
    }
  }, [activePage]);

  useEffect(() => {
    localStorage.setItem('nerva_activeServiceTab', activeServiceTab.toString());
  }, [activeServiceTab]);

  useEffect(() => {
    localStorage.setItem('nerva_selectedContactService', selectedContactService);
  }, [selectedContactService]);

  useEffect(() => {
    localStorage.setItem('nerva_contactInitialMessage', contactInitialMessage);
  }, [contactInitialMessage]);

  // Helper to change page seamlessly
  const handlePageChange = (pageId: PageId, options?: { serviceTab?: number; contactService?: string; contactMessage?: string }) => {
    setActivePage(pageId);
    if (options?.serviceTab !== undefined) {
      setActiveServiceTab(options.serviceTab);
    }
    if (options?.contactService !== undefined) {
      setSelectedContactService(options.contactService);
    }
    if (options?.contactMessage !== undefined) {
      setContactInitialMessage(options.contactMessage);
    } else {
      setContactInitialMessage('');
    }
    setMobileMenuOpen(false);
    
    // Smooth scroll to top, except if we are refreshing or history navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between" id="app-container">
      
      {/* 1. HEADER / NAVIGATION BAR: STICKY MODERNE */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo area */}
            <div className="cursor-pointer" onClick={() => handlePageChange('accueil')}>
              <BrandLogo showText={true} />
            </div>

            {/* Desktop Navigation links */}
            <nav className="hidden md:flex items-center gap-1.5 lg:gap-3">
              <button
                id="nav-accueil"
                onClick={() => handlePageChange('accueil')}
                className={`px-3 py-2 text-xs font-black tracking-widest uppercase rounded transition-colors cursor-pointer ${
                  activePage === 'accueil' 
                    ? 'text-[#00A3E0] bg-slate-100' 
                    : 'text-slate-600 hover:text-[#00A3E0] hover:bg-slate-50'
                }`}
              >
                Accueil
              </button>
              <button
                id="nav-services"
                onClick={() => handlePageChange('services')}
                className={`px-3 py-2 text-xs font-black tracking-widest uppercase rounded transition-colors cursor-pointer ${
                  activePage === 'services' 
                    ? 'text-[#00A3E0] bg-slate-100' 
                    : 'text-slate-600 hover:text-[#00A3E0] hover:bg-slate-50'
                }`}
              >
                Services
              </button>
              <button
                id="nav-apropos"
                onClick={() => handlePageChange('apropos')}
                className={`px-3 py-2 text-xs font-black tracking-widest uppercase rounded transition-colors cursor-pointer ${
                  activePage === 'apropos' 
                    ? 'text-[#00A3E0] bg-slate-100' 
                    : 'text-slate-600 hover:text-[#00A3E0] hover:bg-slate-50'
                }`}
              >
                À Propos
              </button>
              <button
                id="nav-contact"
                onClick={() => handlePageChange('contact')}
                className={`px-3 py-2 text-xs font-black tracking-widest uppercase rounded transition-colors cursor-pointer ${
                  activePage === 'contact' 
                    ? 'text-[#00A3E0] bg-slate-100' 
                    : 'text-slate-600 hover:text-[#00A3E0] hover:bg-slate-50'
                }`}
              >
                Contact
              </button>
            </nav>

            {/* Right Action CTA */}
            <div className="hidden md:flex items-center gap-4">
              <button
                id="btn-nav-devis"
                onClick={() => handlePageChange('contact')}
                className="px-5 py-2.5 bg-[#07152B] hover:bg-slate-800 text-white text-xs font-extrabold rounded-lg uppercase tracking-widest border-b-2 border-[#00A3E0] hover:border-cyan-400 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-cyan-500/10"
              >
                Demander un devis
                <ArrowUpRight size={14} className="text-[#00A3E0]" />
              </button>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors focus:outline-none"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay that closes the mobile menu when clicked anywhere else */}
            <div 
              className="fixed inset-0 top-20 bg-slate-950/40 backdrop-blur-xs z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Mobile drawer body */}
            <div className="relative z-50 md:hidden bg-white border-t border-slate-200 animate-slide-down shadow-xl">
              <div className="px-4 py-6 space-y-2">
                <button
                  onClick={() => handlePageChange('accueil')}
                  className={`w-full text-left px-4 py-3 rounded-lg text-xs font-extrabold uppercase tracking-widest cursor-pointer ${
                    activePage === 'accueil' ? 'bg-[#07152B] text-white' : 'text-slate-700 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  Accueil
                </button>
                <button
                  onClick={() => handlePageChange('services')}
                  className={`w-full text-left px-4 py-3 rounded-lg text-xs font-extrabold uppercase tracking-widest cursor-pointer ${
                    activePage === 'services' ? 'bg-[#07152B] text-white' : 'text-slate-700 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  Services
                </button>
                <button
                  onClick={() => handlePageChange('apropos')}
                  className={`w-full text-left px-4 py-3 rounded-lg text-xs font-extrabold uppercase tracking-widest cursor-pointer ${
                    activePage === 'apropos' ? 'bg-[#07152B] text-white' : 'text-slate-700 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  À Propos
                </button>
                <button
                  onClick={() => handlePageChange('contact')}
                  className={`w-full text-left px-4 py-3 rounded-lg text-xs font-extrabold uppercase tracking-widest cursor-pointer ${
                    activePage === 'contact' ? 'bg-[#07152B] text-white' : 'text-slate-700 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  Contact
                </button>
                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handlePageChange('contact')}
                    className="w-full py-3 bg-[#07152B] text-[#00A3E0] font-black text-xs uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    Demander un devis
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      {/* 2. DYNAMIC MAIN BODY CONTENT */}
      <main className="flex-grow">
        {activePage === 'accueil' && <Accueil onNavigate={handlePageChange} />}
        {activePage === 'services' && (
          <Services 
            onNavigate={handlePageChange} 
            activeTab={activeServiceTab} 
            setActiveTab={setActiveServiceTab} 
          />
        )}
        {activePage === 'apropos' && <APropos onNavigate={handlePageChange} />}
        {activePage === 'contact' && (
          <Contact 
            selectedService={selectedContactService} 
            setSelectedService={setSelectedContactService} 
            initialMessage={contactInitialMessage}
          />
        )}
      </main>

      {/* 3. SOLID FOOTER: BALANCED, RICH IN HIGH BRAND COLOR CONTRAST, FROM THE FLYER */}
      <footer className="bg-[#07152B] text-white border-t-4 border-[#00A3E0]" id="main-footer">
        
        {/* Core elements of contact detail listed in flyer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Logo & Dakar details col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="cursor-pointer" onClick={() => handlePageChange('accueil')}>
              <BrandLogo showText={true} />
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-sans pt-1">
              Solutions digitales d'impact pour particuliers et entreprises au Sénégal. Innovation, Performance et Fiabilité.
            </p>

            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <MapPin size={15} className="text-[#00A3E0] shrink-0" />
              <span>Dakar, Sénégal / Hub d'Afrique de l'Ouest</span>
            </div>
          </div>

          {/* Practical Navigation Links col */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#00A3E0]">NAVIGATION RAPIDE</h4>
            <div className="grid grid-cols-1 gap-2.5 text-xs select-none">
              <button 
                onClick={() => handlePageChange('accueil')} 
                className="text-slate-400 hover:text-white transition-colors text-left font-bold"
              >
                Accueil Principal
              </button>
              <button 
                onClick={() => handlePageChange('services')} 
                className="text-slate-400 hover:text-white transition-colors text-left font-bold"
              >
                Nos Services Phares
              </button>
              <button 
                onClick={() => handlePageChange('apropos')} 
                className="text-slate-400 hover:text-white transition-colors text-left font-bold"
              >
                Notre Pôle d'Expertise
              </button>
              <button 
                onClick={() => handlePageChange('contact')} 
                className="text-slate-400 hover:text-white transition-colors text-left font-bold"
              >
                Nous Contacter / WhatsApp
              </button>
            </div>
          </div>

          {/* Quick contact list from flyer bottom labels */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#00A3E0]">NOUS JOINDRE DIRECTEMENT</h4>
            <div className="space-y-3.5 text-xs">
              
              <div className="flex items-start gap-2.5 text-slate-300">
                <Phone size={14} className="text-[#00A3E0] mt-0.5 shrink-0" />
                <div className="font-mono leading-tight">
                  <p className="text-[10px] text-slate-500 font-sans font-extrabold uppercase tracking-wide">Mobile direct / Orange & Wave</p>
                  <p className="text-white font-bold mt-1">+221 70 200 72 85</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300">
                <Phone size={14} className="text-[#00A3E0] mt-0.5 shrink-0" />
                <div className="font-mono leading-tight">
                  <p className="text-[10px] text-slate-500 font-sans font-extrabold uppercase tracking-wide">Développement / WhatsApp Pro</p>
                  <p className="text-white font-bold mt-1">+221 76 244 25 30</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300">
                <Mail size={14} className="text-[#00A3E0] mt-0.5 shrink-0" />
                <div className="font-mono leading-tight">
                  <p className="text-[10px] text-slate-500 font-sans font-extrabold uppercase tracking-wide">Courrier Électronique</p>
                  <p className="text-white font-bold mt-1">nerva.society@gmail.com</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom clean branding line & credits */}
        <div className="bg-slate-950/60 py-6 text-center select-none text-[11px] text-slate-500 border-t border-slate-900">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
            <p>© 2026 NERVA DIGITALIZATION. Tous droits réservés.</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-slate-400">
                <ShieldCheck size={13} className="text-emerald-500" />
                <span>Hébergé au Sénégal 🇸🇳 (Wave & Orange Money intégrés)</span>
              </span>
              <span>•</span>
              <span className="text-[#00A3E0]">Socio-Digital Excellence</span>
            </div>
          </div>
        </div>

      </footer>

    </div>
  );
}
