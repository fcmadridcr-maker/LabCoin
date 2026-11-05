import React, { useState } from 'react';
import { Cpu, Zap, Layers, PlaySquare, Award, Ticket, ArrowUpRight, DollarSign, CheckCircle2, ShieldAlert, Activity, Server } from 'lucide-react';

export default function LabCoinApp() {
  const [activeTab, setActiveTab] = useState('claim');
  const [balance, setBalance] = useState('0.00500000');
  const [tickets, setTickets] = useState(12);
  const [miningActive, setMiningActive] = useState(true);

  const [ptcClaimed, setPtcClaimed] = useState(false);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Barra Superior - Estilo Estación de Control */}
      <header className="border-b border-blue-500/20 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-[0_4px_20px_rgba(37,99,235,0.15)]">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600/20 p-2.5 rounded-2xl border border-blue-500/40 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <Cpu className="w-6 h-6 text-blue-400 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wider text-white flex items-center gap-2">
              LAB<span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">COIN</span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-500/40 font-mono">CoreCoin Engine v2.0</span>
            </h1>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> 
              Estación Minera Activa
            </p>
          </div>
        </div>

        {/* Indicadores de Balance y Tickets en Vivo */}
        <div className="flex items-center space-x-4">
          <div className="bg-slate-900/90 border border-blue-500/30 px-4 py-2 rounded-2xl flex items-center space-x-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <div className="bg-blue-600/20 p-1.5 rounded-xl border border-blue-500/40">
              <DollarSign className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Balance USDT</p>
              <p className="text-sm font-mono font-bold text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">${balance}</p>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-blue-500/30 px-4 py-2 rounded-2xl flex items-center space-x-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hidden sm:flex">
            <div className="bg-amber-500/20 p-1.5 rounded-xl border border-amber-500/40">
              <Ticket className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Tickets Lotería</p>
              <p className="text-sm font-mono font-bold text-amber-400">{tickets}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido Principal con Diseño de Laboratorio */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-6 gap-6">
        
        {/* Menú Lateral Estilo Rack */}
        <aside className="w-full md:w-72 space-y-2.5">
          <div className="px-4 py-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">Módulos del Sistema</div>
          {[
            { id: 'claim', label: 'Laboratorio Faucet', icon: Zap },
            { id: 'shortlinks', label: 'Shortlinks & Lotería', icon: Layers },
            { id: 'videos', label: 'Videos Recompensados', icon: PlaySquare },
            { id: 'ptc', label: 'Reactor PTC', icon: Server },
            { id: 'achievements', label: 'Logros y Tareas', icon: Award },
            { id: 'withdraw', label: 'Terminal de Retiro', icon: ArrowUpRight },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3.5 px-5 py-3.5 rounded-2xl font-semibold transition-all duration-300 group ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] scale-[1.02] border border-blue-400/50' 
                    : 'bg-slate-900/40 hover:bg-slate-900/80 text-slate-300 border border-slate-800/80 hover:border-blue-500/30'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                <span className="tracking-wide text-sm">{tab.label}</span>
              </button>
            );
          })}

          {/* Tarjeta de Estado del Reactor */}
          <div className="mt-8 bg-gradient-to-b from-blue-950/40 to-slate-900/60 border border-blue-500/20 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-blue-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 animate-pulse" /> Estado Hash
              </span>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">ONLINE</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-blue-500/20">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-400 h-full w-3/4 animate-pulse"></div>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">Velocidad: 45.8 GH/s (Stable)</p>
          </div>
        </aside>

        {/* Panel Central Dinámico */}
        <main className="flex-1 bg-slate-900/20 border border-blue-500/20 rounded-3xl p-8 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] relative overflow-hidden">
          
          {/* Brillo de fondo neón */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

          {activeTab === 'claim' && (
            <div className="space-y-6 relative z-10">
              <div>
                <h2 className="text-2xl font-black text-white tracking-wide">Reclamo Faucet LabCoin</h2>
                <p className="text-sm text-slate-400">Extrae micro-recompensas estables directamente a tu balance en USDT.</p>
              </div>

              <div className="bg-slate-950/60 border border-blue-500/30 rounded-3xl p-8 text-center space-y-6 shadow-[0_0_25px_rgba(37,99,235,0.1)]">
                <div className="inline-block bg-blue-600/10 border border-blue-500/40 px-5 py-2 rounded-full text-blue-400 font-mono text-xs font-bold shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                  Recompensa por Ciclo: $0.00100 USDT + 1 Ticket Opcional
                </div>

                <div className="max-w-md mx-auto bg-slate-900/80 border border-blue-500/20 p-6 rounded-2xl space-y-5">
                  <div className="flex items-center justify-center space-x-2 text-xs text-slate-400 font-mono bg-slate-950 py-3 rounded-xl border border-slate-800">
                    <ShieldAlert className="w-4 h-4 text-blue-400" />
                    <span>[ Verificación Antibot de Laboratorio ]</span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-extrabold py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] tracking-wide">
                    Iniciar Extracción de Recompensa
                  </button>

                  <div className="flex items-center space-x-3 pt-2 justify-center bg-blue-950/20 p-3 rounded-xl border border-blue-500/10">
                    <input type="checkbox" id="bonusAd" className="rounded border-slate-800 bg-slate-900 text-blue-600 w-4 h-4 accent-blue-500 cursor-pointer" />
                    <label htmlFor="bonusAd" className="text-xs text-slate-300 cursor-pointer select-none">
                      Ver pulso publicitario para ganar <span className="text-amber-400 font-bold drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]">+1 Ticket extra</span>
