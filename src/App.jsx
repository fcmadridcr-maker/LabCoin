
import React, { useState } from 'react';
import {
  Cpu,
  Zap,
  Layers,
  PlaySquare,
  Award,
  Ticket,
  ArrowUpRight,
  DollarSign,
  Check,
  X,
  Pickaxe,
  Gem,
  Activity,
  Gauge,
  Sparkles,
  CircleDollarSign,
  ShieldCheck
} from 'lucide-react';

export default function LabCoinApp() {
  const [activeTab, setActiveTab] = useState('claim');
  const [balance] = useState('0.00500000');
  const [bonusChecked, setBonusChecked] = useState(false);

  const tabs = [
    { id: 'claim', label: 'Laboratorio Faucet', icon: Zap },
    { id: 'shortlinks', label: 'Shortlinks & Lotería', icon: Layers },
    { id: 'videos', label: 'Videos Recompensados', icon: PlaySquare },
    { id: 'ptc', label: 'Reactor PTC', icon: Cpu },
    { id: 'achievements', label: 'Logros Diarios', icon: Award },
    { id: 'withdraw', label: 'Terminal de Retiro', icon: ArrowUpRight },
    { id: 'bonus', label: 'Bonus Control', icon: Check },
  ];

  return (
    <div className="min-h-screen bg-[#07111f] text-white font-sans relative overflow-hidden">

      {/* AMBIENTE DEL LABORATORIO */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-[#101e35] via-[#07111f] to-[#030914]" />

        <div className="absolute top-20 left-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px]" />

        {/* Luces ambientales */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

        <div className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(56,189,248,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,.5) 1px, transparent 1px)',
            backgroundSize: '45px 45px'
          }}
        />
      </div>

      {/* CABECERA */}
      <header className="relative z-20 border-b border-cyan-400/20 bg-[#07111f]/85 backdrop-blur-xl">

        <div className="max-w-[1450px] mx-auto px-4 md:px-7 py-3 flex justify-between items-center">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-300/40 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,.2)]">
              <Cpu className="w-5 h-5 text-cyan-300" />
            </div>

            <div>
              <p className="text-[9px] text-cyan-400 uppercase tracking-[.25em] font-bold">
                Mining Station
              </p>

              <h1 className="font-black text-sm md:text-lg tracking-wider">
                CoreCoin <span className="text-cyan-400">Engine</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">

            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-cyan-400/20">
              <CircleDollarSign className="w-4 h-4 text-cyan-400" />

              <div>
                <p className="text-[8px] text-slate-400 uppercase">Balance</p>
                <p className="text-xs font-mono font-bold text-cyan-300">
                  ${balance}
                </p>
              </div>
            </div>

            <button
              aria-label="Cerrar"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
            >
              <X size={19} />
            </button>

          </div>
        </div>
      </header>

      {/* CUERPO PRINCIPAL */}
      <div className="relative z-10 max-w-[1450px] mx-auto p-4 md:p-7">

        <div className="grid grid-cols-1 md:grid-cols-[250px_minmax(0,1fr)] gap-5">

          {/* NAVEGACIÓN */}
          <aside className="bg-[#101e30]/90 backdrop-blur-xl rounded-3xl border border-white/10 p-4 shadow-xl h-fit">

            <div className="flex justify-between items-center px-2 pb-4 border-b border-white/10 mb-3">

              <span className="text-[10px] font-bold uppercase tracking-[.2em] text-cyan-300">
                System Modules
              </span>

              <Activity size={15} className="text-emerald-400" />
            </div>

            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-1">

              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-3 px-3 py-3 rounded-xl
                      min-w-max md:min-w-0 w-full text-left
                      transition-all duration-200
                      ${isActive
                        ? 'bg-gradient-to-r from-cyan-500/25 to-blue-500/10 border border-cyan-400/50 text-white shadow-[0_0_18px_rgba(34,211,238,.12)]'
                        : 'bg-white/[0.025] border border-transparent text-slate-400 hover:text-white hover:bg-white/[0.06]'
                      }
                    `}
                  >

                    <Icon
                      size={17}
                      className={isActive ? 'text-cyan-300' : 'text-slate-500'}
                    />

                    <span className="text-xs font-semibold">
                      {tab.label}
                    </span>

                    {isActive && (
                      <span className="hidden md:block ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                    )}

                  </button>
                );
              })}

            </div>

            {/* ESTADO DEL SISTEMA */}
            <div className="hidden md:block mt-6 p-3 rounded-2xl bg-[#071522] border border-emerald-400/15">

              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] uppercase tracking-widest text-emerald-300 font-bold">
                  System Online
                </span>
              </div>

              <p className="text-[10px] text-slate-500 leading-relaxed">
                CoreCoin mining infrastructure operational.
              </p>

            </div>

          </aside>

          {/* PANEL PRINCIPAL */}
          <main className="min-w-0 rounded-3xl border border-cyan-400/25 bg-[#0b1929]/90 backdrop-blur-xl shadow-[0_15px_60px_rgba(0,0,0,.3)] overflow-hidden">

            {/* BARRA DEL PANEL */}
            <div className="px-5 md:px-8 py-4 border-b border-white/10 flex items-center justify-between">

              <div>
                <p className="text-[9px] text-cyan-400 uppercase tracking-[.25em] font-bold">
                  Mining Interface / 01
                </p>

                <h2 className="text-sm md:text-base font-black uppercase tracking-wider mt-1">
                  {tabs.find(t => t.id === activeTab)?.label}
                </h2>
              </div>

              <div className="flex items-center gap-2 text-[9px] text-emerald-400 font-bold uppercase">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Operational
              </div>

            </div>

            {activeTab === 'claim' ? (

              <div className="p-4 md:p-8">

                {/* ESCENA DEL LABORATORIO */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#142d46] via-[#0c2035] to-[#071321] border border-cyan-400/20 min-h-[230px] md:min-h-[280px] flex items-center justify-center">

                  {/* Luces de fondo */}
                  <div className="absolute top-0 left-1/4 w-40 h-40 bg-cyan-400/20 rounded-full blur-[70px]" />
                  <div className="absolute bottom-0 right-1/4 w-48 h-32 bg-blue-500/20 rounded-full blur-[60px]" />

                  {/* Decoración de laboratorio */}
                  <div className="absolute top-5 left-5 flex items-center gap-2">
                    <Activity size={13} className="text-cyan-400" />
                    <span className="text-[9px] font-mono text-cyan-300/70 tracking-widest">
                      EXTRACTION CHAMBER
                    </span>
                  </div>

                  <div className="absolute top-5 right-5 text-[9px] font-mono text-slate-400">
                    UNIT 01 / ACTIVE
                  </div>

                  {/* Máquina central */}
                  <div className="relative z-10 flex flex-col items-center">

                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-[35px] bg-gradient-to-br from-[#294c67] to-[#0b1c30] border-4 border-cyan-300/40 shadow-[0_0_45px_rgba(34,211,238,.25)] flex items-center justify-center">

                      <div className="absolute inset-3 rounded-[25px] border border-cyan-300/20" />

                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-cyan-300/70 shadow-[0_0_10px_#22d3ee]" />

                      <div className="w-20 h-20 rounded-full bg-[#071321] border-4 border-cyan-400/50 flex items-center justify-center shadow-[inset_0_0_25px_rgba(34,211,238,.25)]">

                        <Gem
                          size={42}
                          className="text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,.9)]"
                          strokeWidth={1.5}
                        />

                      </div>

                      <div className="absolute -bottom-2 px-4 py-1 rounded-full bg-cyan-500 text-[#041321] text-[9px] font-black tracking-widest shadow-lg">
                        CORE ACTIVE
                      </div>

                    </div>

                    {/* Base de la máquina */}
                    <div className="w-44 md:w-56 h-4 rounded-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent blur-[3px] mt-5" />

                  </div>

                  {/* Módulos laterales */}
                  <div className="absolute bottom-7 left-5 md:left-12 flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-[#193750] border border-cyan-400/30 flex items-center justify-center">
                      <Gauge size={22} className="text-cyan-300" />
                    </div>
                    <span className="text-[8px] text-slate-400 uppercase">Energy</span>
                  </div>

                  <div className="absolute bottom-7 right-5 md:right-12 flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-[#193750] border border-violet-400/30 flex items-center justify-center">
                      <Pickaxe size={22} className="text-violet-300" />
                    </div>
                    <span className="text-[8px] text-slate-400 uppercase">Mining</span>
                  </div>

                  {/* Partículas */}
                  <Sparkles className="absolute top-1/3 left-[20%] text-cyan-300/50 w-5 h-5" />
                  <Sparkles className="absolute top-1/3 right-[20%] text-blue-300/50 w-4 h-4" />

                </div>

                {/* INFORMACIÓN DE RECOMPENSA */}
                <div className="text-center py-8 md:py-10">

                  <p className="text-[10px] uppercase tracking-[.3em] text-cyan-400 font-bold mb-4">
                    Available Mining Reward
                  </p>

                  <h3 className="text-4xl md:text-6xl font-black tracking-tight font-mono text-white drop-shadow-[0_0_20px_rgba(34,211,238,.35)]">
                    $0.00100
                  </h3>

                  <p className="text-sm font-bold text-cyan-300 tracking-widest mt-2">
                    USDT
                  </p>

                  <div className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/25">
                    <Ticket size={15} className="text-amber-300" />
                    <span className="text-xs font-bold text-amber-300">
                      + 1 Mining Ticket
                    </span>
                  </div>

                </div>

                {/* BOTÓN DE RECLAMO */}
                <div className="max-w-md mx-auto">

                  <button className="w-full relative overflow-hidden group rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 p-[1px] shadow-[0_8px_30px_rgba(34,211,238,.2)] active:scale-[.98] transition-all">

                    <span className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 group-hover:brightness-110 transition">

                      <Zap size={19} className="text-white" />

                      <span className="text-sm font-black uppercase tracking-widest text-white">
                        Claim Reward
                      </span>

                      <ArrowUpRight size={17} />

                    </span>

                  </button>

                  <p className="text-center text-[9px] text-slate-500 mt-3 tracking-wider">
                    CORECOIN MINING SYSTEM · REWARD STATION
                  </p>

                </div>

              </div>

            ) : (

              <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8">

                <div className="w-20 h-20 rounded-3xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-5">
                  {React.createElement(
                    tabs.find(t => t.id === activeTab)?.icon || Cpu,
                    { size: 35, className: 'text-cyan-300' }
                  )}
                </div>

                <h3 className="font-black text-lg uppercase tracking-wider">
                  {tabs.find(t => t.id === activeTab)?.label}
                </h3>

                <p className="text-xs text-slate-400 mt-3 max-w-sm leading-relaxed">
                  Mining module selected. This station is ready for its corresponding functionality.
                </p>

              </div>

            )}

            {/* BONUS INFERIOR */}
            <div className="mx-4 md:mx-8 mb-5 p-4 rounded-2xl bg-[#071522] border border-white/10 flex items-center gap-3">

              <input
                type="checkbox"
                id="bonusAd"
                checked={bonusChecked}
                onChange={(e) => setBonusChecked(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />

              <label htmlFor="bonusAd" className="flex-1 cursor-pointer">

                <span className="block text-xs font-bold text-cyan-200">
                  Bonus Video Ad
                </span>

                <span className="block text-[10px] text-slate-500 mt-1">
                  Enable additional video reward option
                </span>

              </label>

              <PlaySquare size={19} className="text-cyan-400" />

            </div>

          </main>
        </div>

        {/* PIE DE PÁGINA */}
        <footer className="text-center py-6">
          <p className="text-[9px] text-slate-600 uppercase tracking-[.25em]">
            CoreCoin Engine · Mining Infrastructure
          </p>
        </footer>

      </div>
    </div>
  );
}
