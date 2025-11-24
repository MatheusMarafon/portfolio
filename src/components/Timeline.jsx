import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { GraduationCap, Briefcase, Lightbulb, Smartphone, School } from 'lucide-react';

const icons = [<GraduationCap />, <Briefcase />, <Lightbulb />, <Smartphone />, <School />];
const colors = ["text-blue-400", "text-purple-400", "text-yellow-400", "text-green-400", "text-gray-400"];

const Timeline = () => {
  const { t } = useLanguage();

  return (
    <section id="sobre" className="relative z-10 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
        >
             <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.timeline.title} <span className="text-gradient">{t.timeline.title_highlight}</span>
            </h2>
            <div className="w-24 h-1 bg-gray-800 mx-auto rounded-full overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
            </div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-gradient-to-b from-blue-500 via-purple-500 to-transparent opacity-30"></div>

          <div className="space-y-12">
            {t.timeline.items.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 w-full">
                    <div className="glass-panel p-6 rounded-2xl hover:border-blue-500/30 transition duration-300 relative group">
                        <span className="absolute top-4 right-4 text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">{item.year}</span>
                        <div className={`mb-2 ${colors[index]}`}>{React.cloneElement(icons[index], { size: 20 })}</div>
                        <h3 className="text-lg font-bold text-white">{item.title}</h3>
                        <p className="text-blue-400 text-sm font-mono mb-2">{item.subtitle}</p>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                </div>
                <div className="relative flex items-center justify-center z-10">
                    <div className="w-4 h-4 rounded-full bg-black border-2 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                </div>
                <div className="flex-1 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;