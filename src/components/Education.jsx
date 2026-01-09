import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { GraduationCap, Map, CheckCircle2, CircleDashed, ExternalLink } from 'lucide-react';

const Education = () => {
  const { t } = useLanguage();
  
  // Proteção contra tela preta: se a tradução não carregar, retorna vazio
  if (!t.education) return null;

  return (
    <section id="education" className="py-20 relative overflow-hidden">
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Título */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 font-mono text-sm tracking-wider uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            {t.education.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4">
            {t.education.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t.education.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* COLUNA 1: Projetos/Cursos (Clicáveis) */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="text-blue-400" size={28} />
              <h3 className="text-2xl font-bold text-white">Cursos & Projetos</h3>
            </div>

            <div className="space-y-6">
              {t.education.academic.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="block glass-panel p-6 rounded-2xl border border-white/5 bg-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group cursor-pointer relative"
                >
                  <div className="absolute top-6 right-6 text-gray-500 group-hover:text-blue-400 transition-colors">
                    <ExternalLink size={20} />
                  </div>
                  
                  <div className="flex justify-between items-start mb-2 pr-8">
                    <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {item.course}
                    </h4>
                  </div>
                  <span className="text-xs font-mono bg-blue-500/10 text-blue-300 px-2 py-1 rounded border border-blue-500/20 mb-3 inline-block">
                      {item.year}
                  </span>
                  <p className="text-gray-300 text-sm font-medium mb-1">{item.institution}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>

          {/* COLUNA 2: Roadmap Visual (Timeline) */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Map className="text-purple-400" size={28} />
              <h3 className="text-2xl font-bold text-white">Skill Roadmap</h3>
            </div>

            <div className="relative pl-8 border-l-2 border-white/10 space-y-10">
              {t.education.roadmap.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Bolinha Indicadora */}
                  <span className={`absolute -left-[41px] top-0 w-5 h-5 rounded-full border-4 border-[#050505] ${
                    step.status === 'completed' ? 'bg-green-500' : 
                    step.status === 'progress' ? 'bg-blue-500 animate-pulse' : 'bg-gray-600'
                  }`} />

                  <div className="flex items-center gap-3 mb-2">
                    <h4 className={`text-lg font-bold ${
                      step.status === 'completed' ? 'text-green-400' : 
                      step.status === 'progress' ? 'text-blue-400' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </h4>
                    {step.status === 'completed' && <CheckCircle2 size={16} className="text-green-500" />}
                    {step.status === 'progress' && <CircleDashed size={16} className="text-blue-500 animate-spin-slow" />}
                  </div>

                  <p className="text-gray-400 text-sm mb-3">{step.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {step.stack.map((tech, i) => (
                      <span key={i} className="text-[10px] px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Education;