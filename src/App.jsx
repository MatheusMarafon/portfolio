import React, { useState, useEffect } from 'react';
import Background3D from './components/Background3D';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import SoftSkills from './components/SoftSkills';
import Contact from './components/Contact';
import Dock from './components/Dock';
import Chatbot from './components/Chatbot';
import Terminal from './components/Terminal'; // Importação essencial
import LanguageSwitcher from './components/LanguageSwitcher';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const [loading, setLoading] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false); // Estado do Terminal

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
        <div className="h-screen w-full bg-[#050505] flex items-center justify-center text-white font-mono">
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="animate-pulse text-blue-400">Loading System...</p>
            </div>
        </div>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
        <Background3D />
        
        {/* Elementos Flutuantes */}
        <LanguageSwitcher />
        <Chatbot />
        
        {/* O Terminal precisa estar aqui para aparecer na tela */}
        <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
        
        <div className="relative z-10 pb-32 flex flex-col gap-10">
          <Hero />
          <Timeline />
          <SoftSkills />
          <Projects />
          <Contact />
          
          {/* Passamos a função de abrir o terminal para o Dock */}
          <Dock toggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)} />
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;