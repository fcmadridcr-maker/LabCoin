
import React, { useEffect, useState } from 'react';
import {
  Cpu,
  Zap,
  Layers,
  PlaySquare,
  Award,
  Ticket,
  ArrowUpRight,
  Check,
  X,
  Activity,
  Settings,
  Coins,
  Timer,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

// ======================================================
// LABCOIN FAUCET
// Recompensa: 0.0005 USDT
// Cooldown: 5 minutos
// Límite diario: 20 claims
// Reinicio: 00:00 UTC
//
// DEMO FRONTEND.
// La validación real se implementará en Supabase.
// ======================================================

const CLAIM_REWARD = '0.0005';
const DAILY_LIMIT = 20;
const COOLDOWN_MS = 5 * 60 * 1000;

const modules = [
  { id: 'claim', label: 'Faucet', icon: Ticket },
  { id: 'shortlinks', label: 'Shortlinks & Lotería', icon: Layers },
  { id: 'videos', label: 'Videos', icon: PlaySquare },
  { id: 'ptc', label: 'Reactor PTC', icon: Cpu },
  { id: 'achievements', label: 'Logros', icon: Award },
  { id: 'withdraw', label: 'Retiros', icon: ArrowUpRight },
  { id: 'bonus', label: 'Bonus', icon: Check },
];

// ======================================================
// APLICACIÓN PRINCIPAL
// ======================================================

export default function LabCoinApp() {
  const [activeTab, setActiveTab] = useState('claim');
  const [balance] = useState('0.00500000');
  const [bonusChecked, setBonusChecked] = useState(false);

  // Estado temporal de demostración
  const [claimsToday, setClaimsToday] = useState(0);
  const [nextClaimAt, setNextClaimAt] = useState(0);
  const [currentTime, setCurrentTime] = useState(Date.now());

  const [utcDay, setUtcDay] = useState(
    new Date().toISOString().slice(0, 10)
  );

  // Actualizar reloj y reiniciar contador al cambiar el día UTC
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const today = new Date(now).toISOString().slice(0, 10);

      setCurrentTime(now);

      if (today !== utcDay) {
        setUtcDay(today);
        setClaimsToday(0);
        setNextClaimAt(0);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [utcDay]);

  const cooldownRemaining = Math.max(
    0,
    nextClaimAt - currentTime
  );

  const dailyLimitReached = claimsToday >= DAILY_LIMIT;
  const canClaim = !dailyLimitReached && cooldownRemaining === 0;

  const progress = Math.min(
    (claimsToday / DAILY_LIMIT) * 100,
    100
  );

  const formatCountdown = (milliseconds) => {
    const totalSeconds = Math.ceil(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleClaim = () => {
    if (!canClaim) return;

    setClaimsToday((previous) => previous + 1);
    setNextClaimAt(Date.now() + COOLDOWN_MS);
  };

  // Estado del sistema
  const claimStatus = dailyLimitReached
    ? 'DAILY LIMIT REACHED'
    : cooldownRemaining > 0
      ? 'RECHARGE IN PROGRESS'
      : 'READY TO CLAIM';

  return (
    <div className="min-h-screen bg-[#081725] text-white font-sans overflow-x-hidden">

      {/* FONDO AMBIENTAL */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1b4260_0%,#0a1a2b_55%,#06101c_100%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-400/5 blur-[120px] rounded-full" />
      </div>

      {/* HEADER */}
      <header className="relative z-20 bg-[#0c1e30]/95 border-b border-cyan-300/20 shadow-lg">
        <div className="max-w-[1400px] mx-auto px-4 md:px-7 py-3 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-300 to-blue-600 flex items-center justify-center shadow-[0_5px_18px_rgba(34,211,238,.3)] border border-cyan-100/50">
              <Coins size={23} className="text-white" />
            </div>

            <div>
              <p className="text-[9px] text-cyan-300 tracking-[.25em] uppercase font-black">
                Faucet Universe
              </p>
              <h1 className="text-base md:text-xl font-black tracking-wide">
                LabCoin <span className="text-cyan-300">Faucet</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#142e44] border border-cyan-300/20">
              <Coins size={17} className="text-amber-300" />
              <div>
                <p className="text-[8px] text-slate-400 uppercase">My Balance</p>
                <p className="text-xs text-cyan-200 font-mono font-bold">
                  ${balance}
                </p>
              </div>
            </div>

            <button
              aria-label="Cerrar"
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10"
            >
              <X size={19} />
            </button>
          </div>
        </div>
      </header>

      {/* CONTENIDO */}
      <div className="relative z-10 max-w-[1400px] mx-auto p-3 md:p-5">

        <div className="grid grid-cols-1 lg:grid-cols-[235px_minmax(0,1fr)] gap-5">

          {/* MENÚ LATERAL */}
          <aside className="bg-gradient-to-b from-[#19364e] to-[#102439] border border-[#47738c] rounded-[25px] p-4 shadow-[0_10px_30px_rgba(0,0,0,.25)] h-fit">

            <div className="flex justify-between items-center px-2 pb-4 border-b border-white/10 mb-3">
              <span className="text-[10px] text-cyan-200 font-black tracking-[.2em] uppercase">
                LabCoin Menu
              </span>
              <Settings size={15} className="text-slate-400" />
            </div>

            <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-1">
              {modules.map((tab) => {
                const Icon = tab.icon;
                const selected = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-2xl min-w-max lg:min-w-0 w-full transition-all ${
                      selected
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-[#062036] shadow-lg font-black border-b-4 border-blue-700'
                        : 'bg-[#0b1d2d]/50 text-slate-300 border border-white/5 hover:bg-[#25465e]'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-xs font-bold">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="hidden lg:block mt-6 p-4 rounded-2xl bg-[#0b1c2d] border border-emerald-400/20">
              <div className="flex items-center gap-2">
                <Activity size={15} className="text-emerald-400" />
                <span className="text-[9px] text-emerald-300 font-black tracking-widest">
                  SYSTEM ONLINE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">
                LabCoin faucet interface operational.
              </p>
            </div>
          </aside>

          {/* PANEL CENTRAL */}
          <main className="min-w-0 bg-gradient-to-b from-[#17344b] to-[#0d2033] rounded-[28px] border border-[#47758e] shadow-[0_15px_50px_rgba(0,0,0,.3)] overflow-hidden">

            {/* BARRA DE CONTROL */}
            <div className="px-5 md:px-7 py-4 border-b border-white/10 flex justify-between items-center">
              <div>
                <p className="text-[9px] text-cyan-300 font-black tracking-[.2em] uppercase">
                  Faucet Control / 01
                </p>
                <h2 className="text-sm md:text-lg font-black uppercase mt-1">
                  {modules.find(t => t.id === activeTab)?.label}
                </h2>
              </div>

              <div className="flex items-center gap-2 text-[9px] text-emerald-300 font-bold">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                OPERATIONAL
              </div>
            </div>

            {/* ==================================================
                FAUCET CLAIM STATION
            ================================================== */}

            {activeTab === 'claim' ? (

              <div className="p-4 md:p-7">

                {/* PANEL PRINCIPAL */}
                <div className="relative max-w-3xl mx-auto overflow-hidden rounded-[30px] border border-cyan-300/20 bg-[#0b1c2d] shadow-[0_15px_55px_rgba(0,0,0,.35)]">

                  {/* EFECTOS DE LUZ */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-cyan-400/10 blur-[90px]" />
                    <div className="absolute bottom-0 left-0 w-52 h-52 rounded-full bg-blue-500/10 blur-[80px]" />
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-cyan-300/5 blur-[70px]" />
                  </div>

                  <div className="relative z-10 p-5 sm:p-8 md:p-10">

                    {/* ENCABEZADO DE ESTACIÓN */}
                    <div className="flex items-center justify-between gap-3 mb-8">

                      <div>
                        <div className="flex items-center gap-2">
                          <Sparkles size={15} className="text-cyan-300" />
                          <p className="text-[9px] sm:text-[10px] text-cyan-300 font-black tracking-[.25em]">
                            LABCOIN REWARD STATION
                          </p>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-black mt-2">
                          Claim Station
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-400/10 border border-emerald-300/20">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[8px] sm:text-[9px] text-emerald-300 font-black tracking-wider">
                          ONLINE
                        </span>
                      </div>
                    </div>

                    {/* RECOMPENSA */}
                    <div className="relative rounded-[25px] border border-cyan-300/20 bg-gradient-to-br from-[#163d56] via-[#102d44] to-[#0c2035] p-6 sm:p-9 text-center overflow-hidden">

                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,.12),transparent_70%)] pointer-events-none" />

                      <div className="relative">

                        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-300/20 to-blue-500/20 border border-cyan-200/30 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,.12)]">
                          <Coins size={27} className="text-cyan-300" />
                        </div>

                        <p className="text-[9px] sm:text-[10px] uppercase tracking-[.3em] text-slate-300 font-bold">
                          Your available reward
                        </p>

                        <div className="flex items-baseline justify-center gap-2 mt-3">
                          <span className="text-4xl sm:text-6xl md:text-7xl font-black font-mono tracking-tight text-white drop-shadow-[0_0_25px_rgba(34,211,238,.25)]">
                            {CLAIM_REWARD}
                          </span>
                          <span className="text-lg sm:text-2xl font-black text-cyan-300">
                            USDT
                          </span>
                        </div>

                        <p className="text-[9px] text-slate-400 mt-3 tracking-widest">
                          FIXED FAUCET REWARD
                        </p>

                      </div>
                    </div>

                    {/* BOTÓN CLAIM */}
                    <div className="max-w-lg mx-auto mt-6">

                      <button
                        onClick={handleClaim}
                        disabled={!canClaim}
                        className={`group relative w-full overflow-hidden rounded-2xl border-b-[5px] py-5 px-5 transition-all duration-200 ${
                          canClaim
                            ? 'bg-gradient-to-b from-[#70f4f4] via-[#20c5df] to-[#0879b9] border-[#07517e] shadow-[0_8px_30px_rgba(34,211,238,.25)] hover:brightness-110 active:translate-y-1 active:border-b-0 cursor-pointer'
                            : 'bg-gradient-to-b from-slate-600 to-slate-700 border-slate-800 opacity-80 cursor-not-allowed'
                        }`}
                      >

                        {canClaim && (
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        )}

                        <span className="relative flex items-center justify-center gap-3">

                          {canClaim ? (
                            <>
                              <Zap size={23} className="text-[#07324b]" />
                              <span className="text-sm sm:text-base font-black text-[#06263d] tracking-[.15em]">
                                CLAIM {CLAIM_REWARD} USDT
                              </span>
                              <ArrowUpRight size={21} className="text-[#07324b]" />
                            </>
                          ) : dailyLimitReached ? (
                            <>
                              <Check size={22} />
                              <span className="text-sm font-black tracking-widest">
                                DAILY LIMIT REACHED
                              </span>
                            </>
                          ) : (
                            <>
                              <Timer size={22} />
                              <span className="text-sm font-black tracking-widest">
                                WAIT {formatCountdown(cooldownRemaining)}
                              </span>
                            </>
                          )}

                        </span>
                      </button>

                      {/* ESTADO DEL CLAIM */}
                      <div className="flex items-center justify-center gap-2 mt-4">

                        {canClaim ? (
                          <ShieldCheck size={14} className="text-emerald-400" />
                        ) : dailyLimitReached ? (
                          <Check size={14} className="text-amber-300" />
                        ) : (
                          <Timer size={14} className="text-amber-300" />
                        )}

                        <p className={`text-[9px] sm:text-[10px] font-black tracking-[.18em] ${
                          canClaim
                            ? 'text-emerald-300'
                            : 'text-amber-300'
                        }`}>
                          {claimStatus}
                        </p>

                      </div>

                      {/* TEMPORIZADOR */}
                      <div className="mt-5 rounded-2xl bg-[#071725]/80 border border-white/5 p-4">

                        <div className="flex items-center justify-between gap-3">

                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-300/10 flex items-center justify-center">
                              <Timer size={19} className="text-cyan-300" />
                            </div>

                            <div>
                              <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">
                                Next claim
                              </p>
                              <p className="text-xs text-white font-bold mt-1">
                                {dailyLimitReached
                                  ? 'Daily limit completed'
                                  : cooldownRemaining > 0
                                    ? 'Recharge in progress'
                                    : 'Available now'}
                              </p>
                            </div>
                          </div>

                          <span className="text-xl sm:text-2xl font-mono font-black text-cyan-300 tabular-nums">
                            {dailyLimitReached
                              ? '--:--'
                              : cooldownRemaining > 0
                                ? formatCountdown(cooldownRemaining)
                                : '00:00'}
                          </span>

                        </div>

                        <div className="mt-4 h-1.5 rounded-full bg-[#1b3448] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-1000"
                            style={{
                              width: cooldownRemaining > 0
                                ? `${100 - (cooldownRemaining / COOLDOWN_MS) * 100}%`
                                : '100%'
                            }}
                          />
                        </div>

                      </div>
                    </div>

                    {/* PROGRESO DIARIO */}
                    <div className="mt-7 rounded-2xl bg-[#10283d]/90 border border-white/10 p-4 sm:p-5">

                      <div className="flex items-center justify-between gap-3">

                        <div>
                          <p className="text-[9px] text-slate-400 uppercase tracking-[.18em] font-bold">
                            Daily claims
                          </p>

                          <div className="flex items-baseline gap-1 mt-1">
                            <span className="text-2xl font-black text-white tabular-nums">
                              {claimsToday}
                            </span>
                            <span className="text-sm text-slate-400 font-bold">
                              / {DAILY_LIMIT}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">
                            Daily reward cap
                          </p>
                          <p className="text-base sm:text-lg font-black text-amber-300 mt-1">
                            0.0100 USDT
                          </p>
                        </div>

                      </div>

                      {/* BARRA DE PROGRESO */}
                      <div className="mt-4">

                        <div className="flex justify-between text-[8px] text-slate-500 font-bold mb-2">
                          <span>DAILY PROGRESS</span>
                          <span>{Math.round(progress)}%</span>
                        </div>

                        <div className="h-2.5 rounded-full bg-[#071725] border border-white/5 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 shadow-[0_0_12px_rgba(34,211,238,.35)] transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>

                      </div>

                      {/* INDICADORES DE CLAIMS */}
                      <div className="grid grid-cols-10 gap-1.5 mt-4">
                        {Array.from({ length: DAILY_LIMIT }, (_, index) => (
                          <div
                            key={index}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              index < claimsToday
                                ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,.4)]'
                                : 'bg-[#294257]'
                            }`}
                          />
                        ))}
                      </div>

                    </div>

                    {/* INFORMACIÓN INFERIOR */}
                    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-6">

                      <div className="flex items-center gap-2">
                        <Timer size={12} className="text-cyan-300" />
                        <span className="text-[8px] sm:text-[9px] text-slate-400 font-bold tracking-wider">
                          5 MIN COOLDOWN
                        </span>
                      </div>

                      <div className="w-1 h-1 rounded-full bg-slate-600" />

                      <div className="flex items-center gap-2">
                        <Ticket size={12} className="text-cyan-300" />
                        <span className="text-[8px] sm:text-[9px] text-slate-400 font-bold tracking-wider">
                          20 CLAIMS DAILY
                        </span>
                      </div>

                      <div className="w-1 h-1 rounded-full bg-slate-600" />

                      <div className="flex items-center gap-2">
                        <ShieldCheck size={12} className="text-emerald-300" />
                        <span className="text-[8px] sm:text-[9px] text-slate-400 font-bold tracking-wider">
                          UTC RESET
                        </span>
                      </div>

                    </div>

                  </div>
                </div>

                {/* AVISO DE DEMOSTRACIÓN */}
                <div className="max-w-3xl mx-auto mt-5 p-3 rounded-xl bg-amber-400/5 border border-amber-300/20">
                  <p className="text-[9px] text-amber-200 text-center leading-relaxed">
                    DEMO MODE: claims are simulated in this browser.
                    Real USDT crediting, cooldown validation and daily
                    limits will be secured through Supabase.
                  </p>
                </div>

              </div>

            ) : (

              /* MÓDULOS PENDIENTES */
              <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center">

                <div className="w-20 h-20 rounded-3xl bg-cyan-400/10 border border-cyan-300/20 flex items-center justify-center">
                  {React.createElement(
                    modules.find(t => t.id === activeTab)?.icon || Cpu,
                    { size: 36, className: 'text-cyan-300' }
                  )}
                </div>

                <h3 className="mt-5 text-lg font-black uppercase">
                  {modules.find(t => t.id === activeTab)?.label}
                </h3>

                <p className="text-xs text-slate-400 mt-3">
                  LabCoin module selected.
                </p>

              </div>
            )}

            {/* BONUS */}
            <div className="mx-4 md:mx-7 mb-6 p-4 rounded-2xl bg-[#0a1c2c] border border-white/10 flex items-center gap-3">

              <input
                type="checkbox"
                id="bonusAd"
                checked={bonusChecked}
                onChange={(e) => setBonusChecked(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />

              <label htmlFor="bonusAd" className="flex-1 cursor-pointer">
                <span className="block text-xs text-cyan-200 font-black">
                  Bonus Video Ad
                </span>
                <span className="block text-[10px] text-slate-400 mt-1">
                  Additional video reward option
                </span>
              </label>

              <PlaySquare size={20} className="text-cyan-300" />
            </div>

          </main>
        </div>

        {/* FOOTER */}
        <footer className="text-center py-6">
          <p className="text-[9px] text-slate-500 tracking-[.25em] uppercase">
            LabCoin Faucet · Reward Universe
          </p>
        </footer>

      </div>
    </div>
  );
}
