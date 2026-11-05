import React, { useState } from 'react';
import { Cpu, Zap, Layers, PlaySquare, Award, Ticket, ArrowUpRight, DollarSign, Check, X } from 'lucide-react';

export default function LabCoinApp() {
  const [activeTab, setActiveTab] = useState('claim');
  const [balance, setBalance] = useState('0.00500000');
  const [bonusChecked, setBonusChecked] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans flex flex-col selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden select-none">
      
      {/* 1. IMAGEN DE FONDO DE LA SALA DE MINERÍA */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0 opacity-80"
        style={{ 
          backgroundImage: `url('/Gemini_Generated_Image_p86cf5p86cf5p86c_2.jfif')`,
          filter: 'brightness(0.8) contrast(1.1)' 
        }}
      ></div>

      {/* Capa de viñeta oscura para realzar el brillo neón */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,6,23,0.8)_100%)] pointer-events-none z-0"></div>

      {/* 2. BARRA SUPERIOR DE VENTANA ("Station Control") */}
      <header className="border-b border-cyan-500/30 bg-slate-950/85 backdrop-blur-md sticky top-0 z-50 px-6 py-2 flex justify-between items-center shadow-[0_4px_20px_rgba(6,182,212,0.3)]">
        <div className="text-[11px] font-mono text-cyan-300 tracking-widest uppercase opacity-80">
          Station Control
        </div>

        {/* TÍTULO CENTRAL CON LOGO HEXAGONAL */}
        <div className="flex items-center space-x-2.5">
          <div className="bg-cyan-500/20 p-1.5 rounded-lg border border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.8)]">
            <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
          </div>
          <h1 className="text-sm md:text-base font-black tracking-wider text-white drop-shadow-[0_0_12px_rgba(6,182,212,0.9)]">
            CoreCoin Engine
          </h1>
        </div>

        {/* BOTÓN CERRAR / X (Estilo Ventana de Referencia) */}
        <div className="flex items-center space-x-3">
          <div className="bg-slate-900/90 border border-cyan-400/40 px-3 py-1 rounded-xl hidden sm:flex items-center space-x-2 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            <DollarSign className="w-3 h-3 text-cyan-300" />
            <span className="text-xs font-mono font-bold text-cyan-400">${balance}</span>
          </div>
          <button className="text-slate-400 hover:text-white p-1 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 3. CONTENEDOR PRINCIPAL FLOTANTE */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-6 gap-6 relative z-10 my-auto">
        
        {/* PANEL IZQUIERDO: System Modules */}
        <aside className="w-full md:w-72 space-y-2 bg-slate-950/70 backdrop-blur-xl p-4 rounded-3xl border border-cyan-500/40 shadow-[0_0_35px_rgba(6,182,212,0.2)]">
          <div className="px-2 py-1 text-xs font-mono text-cyan-300 uppercase tracking-widest font-bold border-b border-cyan-500/30 mb-2">
            System Modules
          </div>
          {[
            { id: 'claim', label: 'Laboratorio Faucet', icon: Zap },
            { id: 'shortlinks', label: 'Shortlinks & Lotería', icon: Layers },
            { id: 'videos', label: 'Videos Recompensados', icon: PlaySquare },
            { id: 'ptc', label: 'Reactor PTC', icon: Cpu },
            { id: 'achievements', label: 'Logros Diarios', icon: Award },
            { id: 'withdraw', label: 'Terminal de Retiro', icon: ArrowUpRight },
            { id: 'bonus', label: 'Bonus Control', icon: Check },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-2xl font-semibold transition-all duration-300 group relative overflow-hidden backdrop-blur-md cursor-pointer ${
                  isActive 
                    ? 'bg-gradient-to-r from-cyan-600/90 to-blue-600/90 text-white shadow-[0_0_25px_rgba(6,182,212,0.8)] scale-[1.01] border border-cyan-300' 
                    : 'bg-slate-900/50 hover:bg-slate-900/80 text-slate-200 border border-cyan-500/20 hover:border-cyan-400/60'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                <span className="tracking-wide text-xs">{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* PANEL CENTRAL: Consola con doble marco neón idéntico */}
        <main className="flex-1 bg-slate-950/80 border-2 border-cyan-400/70 rounded-3xl p-8 backdrop-blur-2xl shadow-[0_0_60px_rgba(6,182,212,0.4)] relative overflow-hidden flex flex-col justify-between">
          
          {/* Brillo interno ambiental */}
          <div className="absolute -top-24 -right-24.w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            {/* TÍTULO DEL PANEL */}
            <div className="text-center mb-8 border-b border-cyan-500/40 pb-3">
              <h2 className="text-base md:text-lg font-black text-white tracking-widest uppercase drop-shadow-[0_0_12px_rgba(6,182,212,0.9)]">
                Reclamo Faucet LabCoin
              </h2>
            </div>

            {activeTab === 'claim' && (
              <div className="space-y-8 relative z-10 text-center py-6">
                
                {/* CANTIDAD GRANDE USDT */}
                <div className="space-y-2">
                  <h3 className="text-4xl md:text-6xl font-black text-white font-mono tracking-wider drop-shadow-[0_0_30px_rgba(6,182,212,0.9)]">
                    $0.00100 USDT
                  </h3>
                  <p className="text-cyan-300 font-mono text-sm tracking-widest drop-shadow-[0_0_10px_rgba(6,182,212,0.7)]">
                    + 1 Ticket
                  </p>
                </div>

                {/* BOTÓN NEÓN PRINCIPAL */}
                <div className="max-w-md mx-auto pt-2">
                  <button className="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold py-4 px-8 rounded-2xl transition-all shadow-[0_0_35px_rgba(6,182,212,0.8)] tracking-wider text-base border-2 border-cyan-300/90 cursor-pointer active:scale-95">
                    Reclamar Recompensa
                  </button>
                </div>
              </div>
            )}

            {activeTab !== 'claim' && (
              <div className="py-16 text-center text-cyan-200 font-mono">
                <p className="text-sm">Panel de <span className="text-cyan-400 uppercase font-bold">{activeTab}</span> activo.</p>
              </div>
            )}
          </div>

          {/* CHECKBOX INFERIOR: Bonus video ad */}
          <div className="pt-6 border-t border-cyan-500/30 flex items-center justify-start space-x-3">
            <input 
              type="checkbox" 
              id="bonusAd" 
              checked={bonusChecked}
              onChange={(e) => setBonusChecked(e.target.checked)}
              className="rounded border-cyan-500 bg-slate-900 text-cyan-500 w-4 h-4 accent-cyan-400 cursor-pointer" 
            />
            <label htmlFor="bonusAd" className="text-xs text-cyan-200 cursor-pointer select-none font-mono tracking-wide">
              Bonus video ad <span className="text-slate-400 ml-1">Bonus video</span>
            </label>
          </div>

        </main>
      </div>
    </div>
  );
}
