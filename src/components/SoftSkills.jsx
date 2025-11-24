import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Puzzle, Users, RefreshCw, TrendingUp } from 'lucide-react';

const icons = [<Puzzle />, <Users />, <RefreshCw />, <TrendingUp />];
const colors = ["text-orange-400", "text-blue-400", "text-green-400", "text-purple-400"];
const bgColors = ["bg-orange-500/10", "bg-blue-500/10", "bg-green-500/10", "bg-purple-500/10"];

const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative rounded-3xl border border-white/10 bg-gray-900/50 overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

const SoftSkills = () => {
  const { t } = useLanguage();

  // Fallback de segurança caso a tradução não carregue
  if (!t.softskills) return null;

  return (
    <section id="softskills" className="relative z-10 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
        >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.softskills.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">{t.softskills.title_highlight}</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{t.softskills.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.softskills.items.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="h-full"
                >
                    <SpotlightCard className="h-full">
                        <div className="p-6 flex flex-col items-center text-center h-full">
                            <div className={`p-4 rounded-full mb-6 ${bgColors[index]} ${colors[index]} border border-white/5`}>
                                {React.cloneElement(icons[index], { size: 32 })}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                        </div>
                    </SpotlightCard>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default SoftSkills;