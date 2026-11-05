import React, { useState } from 'react';
import { Cpu, Zap, Layers, PlaySquare, Award, Ticket, ArrowUpRight, DollarSign, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function LabCoinApp() {
  const [activeTab, setActiveTab] = useState('claim');
  const [balance, setBalance] = useState('0.00500000');
  const [tickets, setTickets] = useState(12);
  const [userEmail] = useState('minero@labcoin.io');

  // Estados simulados para logros diarios manuales
  const [ptcClaimed, setPtcClaimed] = useState(false);
  const [shortlinksClaimed, setShortlinksClaimed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Barra de Navegación Superior */}
      <header className="border-b border-blue-900/30 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-lg shadow-blue-950/20">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600/20 p-2.5 rounded-2xl border border-blue-500/30 shadow-inner flex items-center justify-center">
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

        {/* Balance y Tickets */}
        <div className="flex items-center space-x-4">
          <div className="bg-slate-900/90 border border-blue-900/40 px-4 py-2.5 rounded-2xl flex items-center space-x-3 shadow-md">
            <div className="bg-blue-600/20 p-1.5 rounded-xl border border-blue-500/30">
              <DollarSign className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Balance USDT</p>
              <p className="text-sm font-mono font-bold text-blue-400">${balance}</p>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-blue-900/40 px-4 py-2.5 rounded-2xl flex items-center space-x-3 shadow-md hidden sm:flex">
            <div className="bg-amber-500/20 p-1.5 rounded-xl border border-amber-500/30">
              <Ticket className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Tickets Lotería</p>
              <p className="text-sm font-mono font-bold text-amber-400">{tickets}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-6 gap-6">
        
        {/* Menú Lateral Estilizado */}
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
                className={`w-full flex items-center space-x-3.5 px-5 py-3.5 rounded-2xl font-semibold transition-all duration-300 shadow-sm ${
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

        {/* Panel Central Dinámico (Suave y Redondeado) */}
        <main className="flex-1 bg-slate-900/30 border border-blue-900/20 rounded-3xl p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
          
          {/* Faucet Claim */}
          {activeTab === 'claim' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white tracking-wide">Reclamo Faucet LabCoin</h2>
                <p className="text-sm text-slate-400">Resuelve el sistema y obtén tu recompensa respaldada en CoreCoin / USDT.</p>
              </div>

              <div className="bg-slate-900/80 border border-blue-900/30 rounded-3xl p-8 text-center space-y-6 shadow-inner">
                <div className="inline-block bg-blue-600/10 border border-blue-500/30 px-5 py-2.5 rounded-full text-blue-400 font-mono text-xs font-bold tracking-wider shadow-sm">
                  Recompensa: $0.00100 USDT + 1 Ticket Opcional
                </div>
                
                <div className="max-w-md mx-auto bg-slate-950/80 border border-blue-900/30 p-6 rounded-2xl flex flex-col items-center justify-center space-y-4 shadow-md">
                  <p className="text-xs text-slate-400 font-medium">[ Verificación de Seguridad / Captcha ]</p>
                  
                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-blue-600/20 border border-blue-400/30 active:scale-95">
                    Reclamar Recompensa
                  </button>

                  <div className="flex items-center space-x-2 pt-2">
                    <input type="checkbox" id="bonusAd" className="rounded border-slate-800 bg-slate-900 text-blue-600 focus:ring-blue-500" />
                    <label htmlFor="bonusAd" className="text-xs text-slate-300 cursor-pointer">Ver anuncio rápido al reclamar para ganar <span className="text-amber-400 font-bold">+1 Ticket extra</span></label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Shortlinks & Lotería */}
          {activeTab === 'shortlinks' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white tracking-wide">Acortadores (Shortlinks) & Lotería</h2>
                <p className="text-sm text-slate-400">Visita enlaces limpios para acumular CoreCoin y boletos automáticos para el pozo.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/80 border border-blue-900/30 p-6 rounded-2xl flex justify-between items-center shadow-md">
                  <div>
                    <h3 className="font-bold text-white text-sm">ShrinkMe Enlace #1</h3>
                    <p className="text-xs text-slate-400 mt-1">Recompensa: $0.0005 + <span className="text-amber-400 font-semibold">2 Tickets</span></p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 transition-all">
                    Visitar Enlace
                  </button>
                </div>

                <div className="bg-slate-900/80 border border-blue-900/30 p-6 rounded-2xl flex justify-between items-center shadow-md">
                  <div>
                    <h3 className="font-bold text-white text-sm">ShrinkMe Enlace #2</h3>
                    <p className="text-xs text-slate-400 mt-1">Recompensa: $0.0005 + <span className="text-amber-400 font-semibold">2 Tickets</span></p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 transition-all">
                    Visitar Enlace
                  </button>
                </div>
              </div>

              {/* Widget del Pozo de Lotería */}
              <div className="bg-gradient-to-r from-blue-950/60 to-slate-900/80 border border-blue-500/30 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
                <div>
                  <div className="flex items-center space-x-2">
                    <Ticket className="w-5 h-5 text-amber-400" />
                    <h3 className="font-extrabold text-white text-lg">Pozo Acumulado Lotería LabCoin</h3>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">Tienes <strong className="text-amber-400">{tickets} tickets</strong> participando en el sorteo semanal en USDT.</p>
                </div>
                <div className="bg-blue-600/20 border border-blue-500/40 px-5 py-3 rounded-2xl text-center">
                  <p className="text-[10px] text-blue-300 font-bold uppercase">Pozo Actual</p>
                  <p className="text-xl font-mono font-extrabold text-white">$15.50 USDT</p>
                </div>
              </div>
            </div>
          )}

          {/* Videos Recompensados */}
          {activeTab === 'videos' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white tracking-wide">Videos Recompensados (Mini-App Style)</h2>
                <p className="text-sm text-slate-400">Mira videos cortos patrocinados por Adsterra & Monetag y gana al instante.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/80 border border-blue-900/30 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-md">
                  <div>
                    <span className="bg-blue-600/20 text-blue-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-500/30">Adsterra Video Play</span>
                    <h3 className="font-bold text-white text-base mt-2">Clip Publicitario Rápido (30s)</h3>
                    <p className="text-xs text-slate-400 mt-1">Reproduce el clip completo para sumar CoreCoin directo a tu balance.</p>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-600/20 transition-all">
                    Reproducir Video
                  </button>
                </div>

                <div className="bg-slate-900/80 border border-blue-900/30 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-md">
                  <div>
                    <span className="bg-blue-600/20 text-blue-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-500/30">Monetag Reward Stream</span>
                    <h3 className="font-bold text-white text-base mt-2">Secuencia Multimedia (15s)</h3>
                    <p className="text-xs text-slate-400 mt-1">Formato ligero optimizado para teléfonos y dispositivos móviles.</p>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-600/20 transition-all">
                    Reproducir Video
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Anuncios PTC */}
          {activeTab === 'ptc' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white tracking-wide">Módulo de Anuncios PTC</h2>
                <p className="text-sm text-slate-400">Haz clic en los anuncios disponibles, espera el temporizador y gana recompensas.</p>
              </div>

              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-slate-900/80 border border-blue-900/30 p-5 rounded-2xl flex justify-between items-center shadow-sm hover:border-blue-500/40 transition-all">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-600/20 p-3 rounded-xl border border-blue-500/30">
                        <Cpu className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">Anunciante Patrocinado #{item}</h4>
                        <p className="text-xs text-slate-400">10 Segundos • Recompensa: $0.0003 USDT + <span className="text-amber-400 font-semibold">1 Ticket</span></p>
                      </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 transition-all">
                      Ver Anuncio
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Logros Diarios (Manuales) */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white tracking-wide">Logros y Tareas Diarias</h2>
                <p className="text-sm text-slate-400">Completa tus metas diarias y entra aquí a reclamar manualmente tus boletos.</p>
              </div>

              <div className="space-y-4">
                {/* Logro de PTC */}
                <div className="bg-slate-900/80 border border-blue-900/30 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-md">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-blue-400" />
                      <h3 className="font-bold text-white text-base">Meta Diaria: Ver 10 Anuncios PTC</h3>
                    </div>
                    <p className="text-xs text-slate-400">Progreso actual: <span className="text-blue-400 font-mono font-bold">10 / 10 Vistos</span></p>
                  </div>
                  {ptcClaimed ? (
                    <span className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Reclamado
                    </span>
                  ) : (
                    <button 
                      onClick={() => { setPtcClaimed(true); setTickets(tickets + 1); }}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md shadow-amber-500/20 transition-all"
                    >
                      Reclamar +1 Ticket
                    </button>
                  )}
                </div>

                {/* Logro de Shortlinks */}
                <div className="bg-slate-900/80 border border-blue-900/30 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-md">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-blue-400" />
                      <h3 className="font-bold text-white text-base">Meta Diaria: Ronda de Shortlinks</h3>
                    </div>
                    <p className="text-xs text-slate-400">Progreso actual: <span className="text-blue-400 font-mono font-bold">Completados</span></p>
                  </div>
                  {shortlinksClaimed ? (
                    <span className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Reclamado
                    </span>
                  ) : (
                    <button 
                      onClick={() => { setShortlinksClaimed(true); setTickets(tickets + 2); }}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md shadow-amber-500/20 transition-all"
                    >
                      Reclamar +2 Tickets
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Retirar USDT */}
          {activeTab === 'withdraw' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white tracking-wide">Retirar Fondos en USDT</h2>
                <p className="text-sm text-slate-400">Envía tus CoreCoin convertidos instantáneamente a tu cuenta de FaucetPay.</p>
              </div>

              <div className="bg-slate-900/80 border border-blue-900/30 rounded-3xl p-8 max-w-lg space-y-5 shadow-lg">
                <div>
                  <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase tracking-wider">Correo o Billetera FaucetPay (USDT)</label>
                  <input 
                    type="text" 
                    placeholder="tucorreo@gmail.com" 
                    className="w-full bg-slate-950 border border-blue-900/40 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-blue-500 shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase tracking-wider">Monto a Retirar (Mínimo $1.00 USDT)</label>
                  <input 
                    type="number" 
                    placeholder="1.00" 
                    className="w-full bg-slate-950 border border-blue-900/40 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-blue-500 font-mono shadow-inner"
                  />
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-blue-600/30 border border-blue-400/30">
                  Procesar Retiro FaucetPay
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
