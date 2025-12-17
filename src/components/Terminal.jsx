import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon, Play, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Terminal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  
  // MENSAGEM DE BOAS-VINDAS JÁ INCLUÍDA NO INÍCIO
  const [history, setHistory] = useState([
    { type: 'system', content: 'Initializing MatheusOS Kernel v1.0.4...' },
    { type: 'system', content: 'Loading Python 3.12 Environment... Done.' },
    { type: 'success', content: 'System Ready. Interactive Shell Active.' },
    { type: 'response', content: '---------------------------------------------------' },
    { type: 'warning', content: 'AVAILABLE COMMANDS:' },
    { type: 'response', content: '  > print(about)       # Resumo sobre mim' },
    { type: 'response', content: '  > print(skills)      # Ver tecnologias' },
    { type: 'response', content: '  > import cv          # Baixar Curriculo PDF' },
    { type: 'response', content: '  > send_message("oi") # Enviar email rápido' },
    { type: 'response', content: '  > clear()            # Limpar tela' },
    { type: 'response', content: '---------------------------------------------------' },
  ]);
  
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = async (cmd) => {
    const originalCmd = cmd;
    cmd = cmd.trim();
    
    const newHistory = [...history, { type: 'user', content: originalCmd }];

    // --- COMANDOS ---

    if (cmd === 'help()' || cmd === 'dir()') {
        newHistory.push({ type: 'warning', content: "Available functions:" });
        newHistory.push({ type: 'response', content: "  print(about)         # Who am I?" });
        newHistory.push({ type: 'response', content: "  print(skills)        # Tech stack" });
        newHistory.push({ type: 'response', content: "  import cv            # Download Resume" });
        newHistory.push({ type: 'response', content: "  send_message('msg')  # Contact me" });
        newHistory.push({ type: 'response', content: "  clear()              # Clear screen" });
    }
    
    else if (cmd === 'clear()' || cmd === 'cls') {
        setHistory([]);
        setInput('');
        return;
    }

    else if (cmd === 'print(about)') {
        newHistory.push({ type: 'response', content: "Matheus Marafon, 23 anos." });
        newHistory.push({ type: 'response', content: "Engenheiro de Software focado em resolver problemas reais." });
        newHistory.push({ type: 'response', content: "Foco principal em Python, Automação e Dados." });
    }

    else if (cmd === 'print(skills)') {
        newHistory.push({ type: 'success', content: "['Python', 'SQL', 'Web', 'Git']" });
    }

    else if (cmd === 'import cv') {
        newHistory.push({ type: 'warning', content: "Resolving dependency 'curriculo.pdf'..." });
        newHistory.push({ type: 'success', content: "Download started." });
        const link = document.createElement('a');
        link.href = '/assets/curriculo.pdf';
        link.download = 'Curriculo_Matheus_Marafon.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    else if (cmd === 'sudo hire' || cmd === 'sudo_hire()') {
        newHistory.push({ type: 'success', content: "ROOT ACCESS GRANTED." });
        newHistory.push({ type: 'response', content: "Please initiate contract protocol at: marafonmatheus1@gmail.com" });
    }

    else if (cmd.startsWith('send_message(')) {
        const match = cmd.match(/send_message\(["'](.+)["']\)/);
        if (match) {
            const message = match[1];
            newHistory.push({ type: 'warning', content: 'Sending packet to server...' });
            try {
                const formData = new FormData();
                formData.append('message', `PYTHON TERMINAL: ${message}`);
                formData.append('email', 'terminal@python.shell'); 
                await fetch("https://formspree.io/f/xrbyayjl", { method: "POST", body: formData, headers: { 'Accept': 'application/json' } });
                newHistory.push({ type: 'success', content: 'True (Message Sent)' });
            } catch (e) {
                newHistory.push({ type: 'error', content: 'ConnectionError: Failed.' });
            }
        } else {
            newHistory.push({ type: 'error', content: 'SyntaxError. Try: send_message("Hello")' });
        }
    }
    else if (cmd !== '') {
        newHistory.push({ type: 'error', content: `NameError: name '${cmd}' is not defined` });
        newHistory.push({ type: 'system', content: `Tip: Type 'help()' to see commands.` });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          className="fixed inset-0 md:inset-auto md:bottom-32 md:left-8 z-50 md:w-[600px] h-[450px] md:h-[400px] bg-[#0f111a] rounded-xl border border-gray-700 shadow-2xl flex flex-col overflow-hidden font-mono text-sm"
        >
          <div className="bg-[#1f2233] px-4 py-2 flex items-center justify-between border-b border-gray-700 cursor-move">
            <div className="flex gap-2">
              <div onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer transition"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-gray-400 text-xs flex items-center gap-2">
                <Play size={10} fill="currentColor" /> Python Shell
            </div>
            <div className="text-gray-500 text-[10px]">v3.12.1</div>
          </div>

          <div 
            className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 text-gray-300 selection:bg-blue-500/30"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((line, idx) => (
              <div key={idx} className="mb-1 break-words font-mono">
                {line.type === 'user' && <span className="text-blue-400 mr-2">{">>>"}</span>}
                <span className={`
                    ${line.type === 'error' ? 'text-red-400' : ''}
                    ${line.type === 'success' ? 'text-green-400' : ''}
                    ${line.type === 'warning' ? 'text-yellow-400' : ''}
                    ${line.type === 'system' ? 'text-gray-500' : ''}
                    ${line.type === 'response' ? 'text-blue-200' : ''}
                `}>{line.content}</span>
              </div>
            ))}
            <div className="flex items-center mt-2">
              <span className="text-blue-400 mr-2">{">>>"}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none flex-1 text-gray-100 caret-blue-400"
                autoComplete="off"
                autoFocus
                placeholder="tente: import cv" // PLACEHOLDER PARA AJUDAR
              />
            </div>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;