import React, { useState } from 'react';
import { Cpu, Zap, Layers, PlaySquare, Award, Ticket, ArrowUpRight, DollarSign, CheckCircle2, ShieldAlert, Activity, Server, Check } from 'lucide-react';

export default function LabCoinApp() {
  const [activeTab, setActiveTab] = useState('claim');
  const [balance, setBalance] = useState('0.00500000');
  const [tickets, setTickets] = useState(12);
  const [ptcClaimed, setPtcClaimed] = useState(false);
  const [bonusChecked, setBonusChecked] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans flex flex-col selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      
      {/* 1. IMAGEN DE FONDO DE LA SALA DE MINERÍA (Con capa oscura y desenfoque sutil para que los textos resalten) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0 opacity-75"
        style={{ 
          backgroundImage: `url('/Gemini_Generated_Image_p86cf5p86cf5p86c.jfif')`,
          filter: 'brightness(0.65) contrast(1.1)' 
        }}
      ></div>

      {/* Capa de brillo ambiental azul neón superpuesta */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-transparent to-blue-900/30 pointer-events-none z-0"></div>

      {/* 2. BARRA SUPERIOR / STATION CONTROL */}
      <header className="border-b border-cyan-500/30 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-3 flex justify-between items-center shadow-[0_4px_25px_rgba(6,182,212,0.25)]">
        <div className="flex items-center space-x-3">
          <div className="bg-cyan-500/20 p-2 rounded-xl border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.6)]">
            <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-wider text-white flex items-center gap-2">
              CoreCoin <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.9)]">Engine</span>
            </h1>
          </div>
        </div>

        {/* WIDGETS DE BALANCE Y TICKETS (Estilo Referencia) */}
        <div className="flex items-center space-x-4">
          <div className="bg-slate-950/90 border border-cyan-400/50 px-4 py-2 rounded-2xl flex items-center space-x-3 shadow-[0_0_20px_rgba(6,182,212,0.3)] backdrop-blur-lg">
            <div className="bg-cyan-500/30 p-1.5 rounded-xl border border-cyan-400/60">
              <DollarSign className="w-4 h-4 text-cyan-300" />
            </div>
            <div>
              <p className="text-[9px] text-cyan-300 uppercase font-mono tracking-wider">Balance (USDT)</p>
              <p className="text-sm font-mono font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">${balance}</p>
            </div>
          </div>
        </div>
      </header>

      {/* 3. CONTENEDOR PRINCIPAL FLOTANTE SOBRE EL FONDO */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-6 gap-6 relative z-10 my-auto">
        
        {/* PANEL IZQUIERDO: System Modules */}
        <aside className="w-full md:w-72 space-y-2.5">
          <div className="px-4 py-1 text-[11px] font-mono text-cyan-300 uppercase tracking-widest font-bold drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
            System Modules
          </div>
          {[
            { id: 'claim', label: 'Laboratorio Faucet', icon: Zap },
            { id: 'shortlinks', label: 'Shortlinks & Lotería', icon: Layers },
            { id: 'videos', label: 'Videos Recompensados', icon: PlaySquare },
            { id: 'ptc', label: 'Reactor PTC', icon: Server },
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
                className={`w-full flex items-center space-x-3.5 px-5 py-3 rounded-2xl font-semibold transition-all duration-300 group relative overflow-hidden backdrop-blur-xl ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-600/90 to-cyan-600/90 text-white shadow-[0_0_25px_rgba(6,182,212,0.7)] scale-[1.02] border border-cyan-300' 
                    : 'bg-slate-950/70 hover:bg-slate-900/90 text-slate-200 border border-cyan-500/30 hover:border-cyan-400 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                <span className="tracking-wide text-xs">{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* PANEL CENTRAL: Reclamo Faucet LabCoin con Doble Marco Neón */}
        <main className="flex-1 bg-slate-950/80 border-2 border-cyan-400/60 rounded-3xl p-8 backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.35)] relative overflow-hidden flex flex-col justify-between">
          
          {/* Brillo interno ambiental */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            <div className="text-center mb-8 border-b border-cyan-500/30 pb-4">
              <h2 className="text-xl font-black text-white tracking-widest uppercase drop-shadow-[0_0_12px_rgba(6,182,212,0.8)]">
                Reclamo Faucet LabCoin
              </h2>
            </div>

            {activeTab === 'claim' && (
              <div className="space-y-8 relative z-10 text-center py-4">
                
                {/* Cuadro Central de Recompensa */}
                <div className="space-y-3">
                  <h3 className="text-4xl md:text-5xl font-black text-white font-mono tracking-wider drop-shadow-[0_0_20px_rgba(6,182,212,0.9)]">
                    $0.00100 USDT
                  </h3>
                  <p className="text-cyan-300 font-mono text-sm tracking-widest drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
                    + 1 Ticket
                  </p>
                </div>

                {/* Botón Principal Neón Estilo Imagen */}
                <div className="max-w-md mx-auto pt-4">
                  <button className="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold py-4 px-8 rounded-2xl transition-all shadow-[0_0_30px_rgba(6,182,212,0.7)] tracking-wider text-base border-2 border-cyan-300/80 cursor-pointer active:scale-95">
                    Reclamar Recompensa
                  </button>
                </div>
              </div>
            )}

            {activeTab !== 'claim' && (
              <div className="py-12 text-center text-slate-300 font-mono">
                <p className="text-sm">Módulo <span className="text-cyan-400 uppercase">{activeTab}</span> cargado en la estación de control.</p>
              </div>
            )}
          </div>

          {/* CHECKBOX INFERIOR: Bonus video ad (Idéntico a la referencia) */}
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
