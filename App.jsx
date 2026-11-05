import React, { useState } from 'react';
import { Cpu, Zap, Layers, PlaySquare, Award, Ticket, ArrowUpRight, DollarSign, CheckCircle2 } from 'lucide-react';

export default function LabCoinApp() {
  const [activeTab, setActiveTab] = useState('claim');
  const [balance, setBalance] = useState('0.00500000');
  const [tickets, setTickets] = useState(12);

  const [ptcClaimed, setPtcClaimed] = useState(false);
  const [shortlinksClaimed, setShortlinksClaimed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Barra Superior */}
      <header className="border-b border-blue-900/30 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600/20 p-2.5 rounded-2xl border border-blue-500/30">
            <Cpu className="w-6 h-6 text-blue-400 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-wide text-white flex items-center gap-1.5">
              LAB<span className="text-blue-500">COIN</span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30 font-medium">CoreCoin Engine</span>
            </h1>
            <p className="text-xs text-slate-400">Laboratorio Minero Minimalista</p>
          </div>
        </div>

        {/* Balance */}
        <div className="flex items-center space-x-4">
          <div className="bg-slate-900/90 border border-blue-900/40 px-4 py-2.5 rounded-2xl flex items-center space-x-3 shadow-md">
            <div className="bg-blue-600/20 p-1.5 rounded-xl border border-blue-500/30">
              <DollarSign className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Balance USDT</p>
              <p className="text-sm font-mono font-bold text-blue-400">${balance}</p>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-blue-900/40 px-4 py-2.5 rounded-2xl flex items-center space-x-3 shadow-md hidden sm:flex">
            <div className="bg-amber-500/20 p-1.5 rounded-xl border border-amber-500/30">
              <Ticket className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Tickets Lotería</p>
              <p className="text-sm font-mono font-bold text-amber-400">{tickets}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-6 gap-6">
        
        {/* Menú Lateral */}
        <aside className="w-full md:w-72 space-y-2.5">
          {[
            { id: 'claim', label: 'Faucet Claim', icon: Zap },
            { id: 'shortlinks', label: 'Shortlinks & Lotería', icon: Layers },
            { id: 'videos', label: 'Videos Recompensados', icon: PlaySquare },
            { id: 'ptc', label: 'Anuncios PTC', icon: Cpu },
            { id: 'achievements', label: 'Logros Diarios', icon: Award },
            { id: 'withdraw', label: 'Retirar (USDT)', icon: ArrowUpRight },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3.5 px-5 py-3.5 rounded-2xl font-semibold transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-[1.02] border border-blue-400/30' 
                    : 'bg-slate-900/50 hover:bg-slate-900 text-slate-300 border border-slate-800/80'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                <span className="tracking-wide text-sm">{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Panel Central */}
        <main className="flex-1 bg-slate-900/30 border border-blue-900/20 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
          {activeTab === 'claim' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-white">Reclamo Faucet LabCoin</h2>
              <div className="bg-slate-900/80 border border-blue-900/30 rounded-3xl p-8 text-center space-y-6">
                <div className="inline-block bg-blue-600/10 border border-blue-500/30 px-5 py-2.5 rounded-full text-blue-400 font-mono text-xs font-bold">
                  Recompensa: $0.00100 USDT + 1 Ticket Opcional
                </div>
                <div className="max-w-md mx-auto bg-slate-950/80 border border-blue-900/30 p-6 rounded-2xl space-y-4">
                  <p className="text-xs text-slate-400">[ Verificación de Seguridad / Captcha ]</p>
                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-blue-600/20">
                    Reclamar Recompensa
                  </button>
                  <div className="flex items-center space-x-2 pt-2 justify-center">
                    <input type="checkbox" id="bonusAd" className="rounded border-slate-800 bg-slate-900 text-blue-600" />
                    <label htmlFor="bonusAd" className="text-xs text-slate-300 cursor-pointer">Ver anuncio rápido para ganar <span className="text-amber-400 font-bold">+1 Ticket extra</span></label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shortlinks' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-white">Acortadores & Lotería</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/80 border border-blue-900/30 p-6 rounded-2xl flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-white text-sm">ShrinkMe Enlace #1</h3>
                    <p className="text-xs text-slate-400 mt-1">Recompensa: $0.0005 + <span className="text-amber-400">2 Tickets</span></p>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold">Visitar</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-white">Logros y Tareas Diarias</h2>
              <div className="space-y-4">
                <div className="bg-slate-900/80 border border-blue-900/30 p-6 rounded-2xl flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-white text-base">Meta Diaria: Ver 10 PTC</h3>
                    <p className="text-xs text-slate-400">Progreso: <span className="text-blue-400 font-bold">10 / 10 Vistos</span></p>
                  </div>
                  {ptcClaimed ? (
                    <span className="text-emerald-400 text-xs font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Reclamado</span>
                  ) : (
                    <button onClick={() => { setPtcClaimed(true); setTickets(tickets + 1); }} className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-extrabold">
                      Reclamar +1 Ticket
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'withdraw' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold text-white">Retirar Fondos en USDT</h2>
              <div className="bg-slate-900/80 border border-blue-900/30 rounded-3xl p-8 max-w-lg space-y-5">
                <input type="text" placeholder="tucorreo@gmail.com (FaucetPay)" className="w-full bg-slate-950 border border-blue-900/40 rounded-2xl px-4 py-3 text-sm text-white" />
                <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-2xl">Procesar Retiro</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
