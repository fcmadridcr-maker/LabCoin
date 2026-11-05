import React, { useState } from 'react';
import { Cpu, Zap, Layers, PlaySquare, Award, Ticket, ArrowUpRight, DollarSign, CheckCircle2, ShieldAlert, Activity, Server, Database } from 'lucide-react';

export default function LabCoinApp() {
  const [activeTab, setActiveTab] = useState('claim');
  const [balance, setBalance] = useState('0.00500000');
  const [tickets, setTickets] = useState(12);
  const [ptcClaimed, setPtcClaimed] = useState(false);
  const [bonusChecked, setBonusChecked] = useState(false);

  return (
    <div className="min-h-screen bg-[#060b19] text-slate-100 font-sans flex flex-col selection:bg-blue-600 selection:text-white relative overflow-hidden">
      
      {/* Fondo técnico con retícula de laboratorio estilizada */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1d4ed810_1px,transparent_1px),linear-gradient(to_bottom,#1d4ed810_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>

      {/* EFECTOS VISUALES DE LA SALA DE MINERÍA (Racks de servidores, cristales y brazos mecánicos laterales) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden xl:block z-0 opacity-40">
        {/* Rack Servidores Izquierdo */}
        <div className="absolute left-6 top-28 w-40 bg-slate-950/90 border border-blue-500/40 rounded-2xl p-4 shadow-[0_0_25px_rgba(37,99,235,0.3)]">
          <div className="flex justify-between items-center mb-3 border-b border-blue-500/20 pb-2">
            <span className="text-[10px] font-mono text-cyan-400 font-bold">RACK-SRV 01</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-blue-600/40 rounded-full w-full animate-pulse"></div>
            <div className="h-2 bg-cyan-400/40 rounded-full w-3/4"></div>
            <div className="h-2 bg-blue-500/40 rounded-full w-5/6"></div>
            <div className="h-2 bg-blue-700/40 rounded-full w-2/3"></div>
          </div>
          <div className="mt-4 pt-3 border-t border-blue-500/20 text-center">
            <span className="text-xl">💻</span>
          </div>
        </div>

        {/* Cristales Energéticos Inferiores Izquierdos */}
        <div className="absolute left-10 bottom-12 p-5 bg-blue-600/10 border border-blue-500/40 rounded-3xl text-center shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-md">
          <span className="text-4xl animate-pulse">💎</span>
          <p className="text-[10px] font-mono text-cyan-300 mt-1 uppercase tracking-widest">Core Crystal Active</p>
        </div>

        {/* Rack y Brazo Mecánico Derecho */}
        <div className="absolute right-6 top-28 w-40 bg-slate-950/90 border border-blue-500/40 rounded-2xl p-4 shadow-[0_0_25px_rgba(37,99,235,0.3)]">
          <div className="flex justify-between items-center mb-3 border-b border-blue-500/20 pb-2">
            <span className="text-[10px] font-mono text-cyan-400 font-bold">ROBOT-ARM 02</span>
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          </div>
          <div className="font-mono text-[10px] text-slate-300 space-y-1 bg-slate-900 p-2 rounded border border-blue-500/20">
            <p className="text-blue-400">[===o===]</p>
            <p>Status: Mining</p>
            <p className="text-emerald-400">Sync: 100%</p>
          </div>
        </div>
      </div>

      {/* BARRA SUPERIOR - Estilo Estación de Control */}
      <header className="border-b border-blue-500/40 bg-slate-950/95 backdrop-blur-2xl sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-[0_4px_30px_rgba(37,99,235,0.4)]">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600/20 p-2.5 rounded-2xl border border-blue-500/60 shadow-[0_0_20px_rgba(59,130,246,0.7)]">
            <Cpu className="w-6 h-6 text-blue-400 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wider text-white flex items-center gap-2">
              LAB<span className="text-blue-500 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">COIN</span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-500/60 font-mono shadow-[inset_0_0_10px_rgba(59,130,246,0.4)]">CoreCoin Engine v2.0</span>
            </h1>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> 
              Estación Minera Activa
            </p>
          </div>
        </div>

        {/* WIDGETS DE BALANCE Y TICKETS (Superior Derecha) */}
        <div className="flex items-center space-x-4">
          <div className="bg-slate-900/90 border border-blue-500/50 px-4 py-2.5 rounded-2xl flex items-center space-x-3 shadow-[0_0_20px_rgba(37,99,235,0.25)]">
            <div className="bg-blue-600/30 p-1.5 rounded-xl border border-blue-500/60">
              <DollarSign className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-[9px] text-blue-300 uppercase font-mono tracking-wider">Balance USDT</p>
              <p className="text-sm font-mono font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]">${balance}</p>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-blue-500/50 px-4 py-2.5 rounded-2xl flex items-center space-x-3 shadow-[0_0_20px_rgba(37,99,235,0.25)] hidden sm:flex">
            <div className="bg-amber-500/20 p-1.5 rounded-xl border border-amber-500/50">
              <Ticket className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-[9px] text-amber-300 uppercase font-mono tracking-wider">Tickets Lotería</p>
              <p className="text-sm font-mono font-bold text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">{tickets}</p>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENEDOR PRINCIPAL FLOTANTE */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-6 gap-6 relative z-10 my-auto">
        
        {/* PANEL IZQUIERDO: Módulos del Sistema */}
        <aside className="w-full md:w-72 space-y-2.5">
          <div className="px-4 py-2 text-[10px] font-mono text-blue-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> System Modules
          </div>
          {[
            { id: 'claim', label: 'Laboratorio Faucet', icon: Zap },
            { id: 'shortlinks', label: 'Shortlinks & Lotería', icon: Layers },
            { id: 'videos', label: 'Videos Recompensados', icon: PlaySquare },
            { id: 'ptc', label: 'Reactor PTC', icon: Server },
            { id: 'achievements', label: 'Logros Diarios', icon: Award },
            { id: 'withdraw', label: 'Terminal de Retiro', icon: ArrowUpRight },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3.5 px-5 py-3.5 rounded-2xl font-semibold transition-all duration-300 group relative overflow-hidden ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.8)] scale-[1.02] border border-blue-300/80' 
                    : 'bg-slate-900/85 hover:bg-slate-900 text-slate-300 border border-blue-500/30 hover:border-blue-500/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                <span className="tracking-wide text-sm">{tab.label}</span>
              </button>
            );
          })}

          {/* Tarjeta Monitor Hash Rate */}
          <div className="mt-6 bg-slate-950/90 border border-blue-500/50 rounded-2xl p-4 space-y-3 shadow-[0_0_25px_rgba(37,99,235,0.25)] backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-blue-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 animate-pulse" /> Hash Rate Status
              </span>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/50">ONLINE</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-blue-500/40">
              <div className="bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-400 h-full w-4/5 animate-pulse"></div>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">Velocidad: 45.8 GH/s (Stable)</p>
          </div>
        </aside>

        {/* PANEL CENTRAL DINÁMICO CON ESTÉTICA DE CRISTAL ESMERILADO Y NEÓN */}
        <main className="flex-1 bg-slate-950/90 border-2 border-blue-500/60 rounded-3xl p-8 backdrop-blur-2xl shadow-[0_0_60px_rgba(37,99,235,0.4)] relative overflow-hidden">
          
          {/* Brillo neón ambiental interno */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

          {activeTab === 'claim' && (
            <div className="space-y-6 relative z-10">
              <div>
                <h2 className="text-2xl font-black text-white tracking-wide drop-shadow-[0_0_12px_rgba(59,130,246,0.7)]">Reclamo Faucet LabCoin</h2>
                <p className="text-sm text-slate-400">Extrae micro-recompensas estables directamente a tu balance en USDT mediante la estación central.</p>
              </div>

              {/* Contenedor Interno Estilo Consola */}
              <div className="bg-slate-900/95 border border-blue-500/50 rounded-3xl p-8 text-center space-y-6 shadow-[0_0_40px_rgba(37,99,235,0.25)]">
                <div className="inline-block bg-blue-600/25 border border-blue-500/60 px-6 py-2.5 rounded-full text-blue-300 font-mono text-xs font-bold shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                  Recompensa por Ciclo: $0.00100 USDT + 1 Ticket Opcional
                </div>

                <div className="max-w-md mx-auto bg-slate-950 border border-blue-500/40 p-6 rounded-2xl space-y-5 shadow-[inset_0_0_30px_rgba(37,99,235,0.2)]">
                  <div className="flex items-center justify-center space-x-2 text-xs text-slate-300 font-mono bg-slate-900 py-3 rounded-xl border border-blue-500/30">
                    <ShieldAlert className="w-4 h-4 text-blue-400 animate-bounce" />
                    <span>[ Verificación de Seguridad / Captcha ]</span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold py-4 rounded-2xl transition-all shadow-[0_0_35px_rgba(37,99,235,0.8)] tracking-wide text-base border border-blue-300/60 cursor-pointer active:scale-95">
                    Reclamar Recompensa
                  </button>

                  <div className="flex items-center space-x-3 pt-2 justify-center bg-blue-950/50 p-3 rounded-xl border border-blue-500/40">
                    <input 
                      type="checkbox" 
                      id="bonusAd" 
                      checked={bonusChecked}
                      onChange={(e) => setBonusChecked(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-900 text-blue-600 w-4 h-4 accent-blue-500 cursor-pointer" 
                    />
                    <label htmlFor="bonusAd" className="text-xs text-slate-300 cursor-pointer select-none">
                      Ver anuncio rápido para ganar <span className="text-amber-400 font-bold drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]">+1 Ticket extra</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shortlinks' && (
            <div className="space-y-6 relative z-10">
              <div>
                <h2 className="text-2xl font-black text-white tracking-wide">Acortadores & Lotería</h2>
                <p className="text-sm text-slate-400">Completa enlaces limpios para potenciar tus tickets en el pozo de lotería.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-slate-900/90 border border-blue-500/40 p-6 rounded-2xl flex justify-between items-center hover:border-blue-500/80 transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                    <div>
                      <h3 className="font-bold text-white text-sm">ShrinkMe Conexión #{item}</h3>
                      <p className="text-xs text-slate-400 mt-1">Recompensa: $0.0005 + <span className="text-amber-400 font-bold">+2 Tickets</span></p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.5)] border border-blue-400/50 cursor-pointer">
                      Visitar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6 relative z-10">
              <div>
                <h2 className="text-2xl font-black text-white tracking-wide">Logros y Tareas Diarias</h2>
                <p className="text-sm text-slate-400">Alcanza las metas operativas del día para reclamar bonificaciones automáticas.</p>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-900/90 border border-blue-500/40 p-6 rounded-2xl flex justify-between items-center shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                  <div>
                    <h3 className="font-bold text-white text-base">Meta Diaria: Ver 10 Anuncios PTC</h3>
                    <p className="text-xs text-slate-400 mt-1">Progreso del Reactor: <span className="text-blue-400 font-bold font-mono">10 / 10 Completado</span></p>
                  </div>
                  {ptcClaimed ? (
                    <span className="text-emerald-400 text-xs font-bold flex items-center gap-1.5 bg-emerald-500/20 px-4 py-2 rounded-xl border border-emerald-500/50">
                      <CheckCircle2 className="w-4 h-4"/> Reclamado
                    </span>
                  ) : (
                    <button 
                      onClick={() => { setPtcClaimed(true); setTickets(tickets + 1); }} 
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all shadow-[0_0_25px_rgba(251,191,36,0.6)] border border-amber-300 cursor-pointer"
                    >
                      Reclamar +1 Ticket
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'withdraw' && (
            <div className="space-y-6 relative z-10">
              <div>
                <h2 className="text-2xl font-black text-white tracking-wide">Terminal de Retiro en USDT</h2>
                <p className="text-sm text-slate-400">Envía tus fondos instantáneamente a tu cuenta vinculada mediante FaucetPay.</p>
              </div>
              <div className="bg-slate-900/90 border border-blue-500/50 rounded-3xl p-8 max-w-lg space-y-5 shadow-[0_0_35px_rgba(37,99,235,0.25)]">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-blue-300 uppercase">Correo electrónico de FaucetPay</label>
                  <input 
                    type="text" 
                    placeholder="tucorreo@gmail.com" 
                    className="w-full bg-slate-950 border border-blue-500/50 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 font-mono shadow-[inset_0_0_15px_rgba(0,0,0,0.6)]" 
                  />
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold py-4 rounded-2xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.7)] border border-blue-300/50 cursor-pointer">
                  Procesar Retiro Inmediato
                </button>
              </div>
            </div>
          )}

          {activeTab === 'ptc' && (
            <div className="space-y-6 relative z-10">
              <div>
                <h2 className="text-2xl font-black text-white tracking-wide">Reactor PTC</h2>
                <p className="text-sm text-slate-400">Visualiza los anuncios patrocinados para generar micro-rendimientos en USDT.</p>
              </div>
              <div className="bg-slate-900/90 border border-blue-500/40 p-10 rounded-3xl text-center space-y-4 shadow-[0_0_25px_rgba(37,99,235,0.2)]">
                <p className="text-sm text-slate-400 font-mono">No hay anuncios PTC activos en este momento. Vuelve en unas horas para nuevos pulsos.</p>
              </div>
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="space-y-6 relative z-10">
              <div>
                <h2 className="text-2xl font-black text-white tracking-wide">Videos Recompensados</h2>
                <p className="text-sm text-slate-400">Reproduce contenido patrocinado corto optimizado para dispositivos móviles.</p>
              </div>
              <div className="bg-slate-900/90 border border-blue-500/40 p-10 rounded-3xl text-center space-y-4 shadow-[0_0_25px_rgba(37,99,235,0.2)]">
                <p className="text-sm text-slate-400 font-mono">Canales de video en sincronización con Adsterra y Monetag.</p>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
