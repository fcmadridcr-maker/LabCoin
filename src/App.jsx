
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
// Limite diario: 20 claims
// Reinicio: 00:00 UTC
//
// DEMO FRONTEND.
// La validacion real se implementara en Supabase.
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

  // Estado temporal de demostración
  const [claimsToday, setClaimsToday] = useState(0);
  const [nextClaimAt, setNextClaimAt] = useState(0);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Ventana de bonus después del claim
  const [showBonusOffer, setShowBonusOffer] = useState(false);

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

  // ====================================================
  // RECLAMAR Y MOSTRAR OFERTA DE TICKET
  // ====================================================

  const handleClaim = () => {
    if (!canClaim) return;

    setClaimsToday((previous) => previous + 1);
    setNextClaimAt(Date.now() + COOLDOWN_MS);

    // Mostrar oferta de ticket adicional
    setShowBonusOffer(true);
  };

  const handleWatchVideo = () => {
    setShowBonusOffer(false);
    setActiveTab('videos');
  };

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

            {/* FAUCET CLAIM STATION */}
            {activeTab === 'claim' ? (

              <div className="p-3 md:p-4">

                <div className="relative max-w-xl mx-auto overflow-hidden rounded-[20px] border border-cyan-300/20 bg-[#0b1c2d] shadow-[0_10px_30px_rgba(0,0,0,.25)]">

                  {/* EFECTOS DE LUZ */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-cyan-400/10 blur-[75px]" />
                    <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-blue-500/10 blur-[60px]" />
                  </div>

                  <div className="relative z-10 p-3 sm:p-4">

                    {/* ENCABEZADO */}
                    <div className="flex items-center justify-between mb-3">

                      <div>
                        <div className="flex items-center gap-2">
                          <Sparkles size={12} className="text-cyan-300" />
                          <p className="text-[8px] text-cyan-300 font-black tracking-[.2em]">
                            LABCOIN REWARD STATION
                          </p>
                        </div>

                        <h3 className="text-base font-black mt-0.5">
                          Claim Station
                        </h3>
                      </div>

                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-400/10 border border-emerald-300/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[8px] text-emerald-300 font-black tracking-wider">
                          ONLINE
                        </span>
                      </div>
                    </div>

                    {/* RECOMPENSA COMPACTA */}
                    <div className="rounded-2xl border border-cyan-300/20 bg-gradient-to-r from-[#163d56] to-[#0c2035] px-3 py-3 text-center">

                      <p className="text-[8px] uppercase tracking-[.2em] text-slate-300 font-bold">
                        Your available reward
                      </p>

                      <div className="flex items-baseline justify-center gap-2 mt-1">
                        <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                          {CLAIM_REWARD}
                        </span>
                        <span className="text-sm font-black text-cyan-300">
                          USDT
                        </span>
                      </div>
                    </div>

                    {/* BOTÓN CLAIM */}
                    <div className="max-w-sm mx-auto mt-3">

                      <button
                        onClick={handleClaim}
                        disabled={!canClaim}
                        className={`group relative w-full overflow-hidden rounded-xl border-b-[3px] py-3 px-3 transition-all duration-200 ${
                          canClaim
                            ? 'bg-gradient-to-b from-[#70f4f4] via-[#20c5df] to-[#0879b9] border-[#07517e] shadow-[0_5px_18px_rgba(34,211,238,.2)] hover:brightness-110 active:translate-y-1 active:border-b-0 cursor-pointer'
                            : 'bg-gradient-to-b from-slate-600 to-slate-700 border-slate-800 opacity-80 cursor-not-allowed'
                        }`}
                      >

                        {canClaim && (
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        )}

                        <span className="relative flex items-center justify-center gap-2">

                          {canClaim ? (
                            <>
                              <Zap size={17} className="text-[#07324b]" />
                              <span className="text-xs font-black text-[#06263d] tracking-[.12em]">
                                CLAIM {CLAIM_REWARD} USDT
                              </span>
                              <ArrowUpRight size={16} className="text-[#07324b]" />
                            </>
                          ) : dailyLimitReached ? (
                            <>
                              <Check size={17} />
                              <span className="text-xs font-black tracking-widest">
                                DAILY LIMIT REACHED
                              </span>
                            </>
                          ) : (
                            <>
                              <Timer size={17} />
                              <span className="text-xs font-black tracking-widest">
                                WAIT {formatCountdown(cooldownRemaining)}
                              </span>
                            </>
                          )}

                        </span>
                      </button>

                      {/* ESTADO */}
                      <div className="flex items-center justify-center gap-2 mt-2">
                        {canClaim ? (
                          <ShieldCheck size={11} className="text-emerald-400" />
                        ) : (
                          <Timer size={11} className="text-amber-300" />
                        )}

                        <p className={`text-[8px] font-black tracking-[.15em] ${
                          canClaim ? 'text-emerald-300' : 'text-amber-300'
                        }`}>
                          {claimStatus}
                        </p>
                      </div>
                    </div>

                    {/* TEMPORIZADOR Y CONTADOR */}
                    <div className="grid grid-cols-2 gap-2 mt-3">

                      {/* NEXT CLAIM */}
                      <div className="rounded-xl bg-[#071725]/80 border border-white/5 p-2.5">

                        <div className="flex items-center gap-1.5">
                          <Timer size={12} className="text-cyan-300" />
                          <p className="text-[8px] text-slate-400 uppercase font-bold tracking-wider">
                            Next claim
                          </p>
                        </div>

                        <p className="text-lg font-mono font-black text-cyan-300 mt-1 tabular-nums">
                          {dailyLimitReached
                            ? '--:--'
                            : cooldownRemaining > 0
                              ? formatCountdown(cooldownRemaining)
                              : '00:00'}
                        </p>

                        <div className="mt-1.5 h-1 rounded-full bg-[#1b3448] overflow-hidden">
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

                      {/* DAILY CLAIMS */}
                      <div className="rounded-xl bg-[#071725]/80 border border-white/5 p-2.5">

                        <div className="flex items-center gap-1.5">
                          <Ticket size={12} className="text-amber-300" />
                          <p className="text-[8px] text-slate-400 uppercase font-bold tracking-wider">
                            Daily claims
                          </p>
                        </div>

                        <p className="text-lg font-black text-white mt-1 tabular-nums">
                          {claimsToday}
                          <span className="text-xs text-slate-400">
                            {' '}/ {DAILY_LIMIT}
                          </span>
                        </p>

                        <div className="mt-1.5 h-1 rounded-full bg-[#1b3448] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-amber-300 to-yellow-500 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                    </div>

                    {/* PROGRESO DE LOS 20 CLAIMS */}
                    <div className="grid grid-cols-10 gap-1 mt-2.5">
                      {Array.from({ length: DAILY_LIMIT }, (_, index) => (
                        <div
                          key={index}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            index < claimsToday
                              ? 'bg-cyan-400 shadow-[0_0_7px_rgba(34,211,238,.4)]'
                              : 'bg-[#294257]'
                          }`}
                        />
                      ))}
                    </div>

                    {/* INFORMACIÓN */}
                    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mt-3">
                      <span className="text-[7px] text-slate-400 font-bold tracking-wider">
                        5 MIN COOLDOWN
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-600" />
                      <span className="text-[7px] text-slate-400 font-bold tracking-wider">
                        20 CLAIMS DAILY
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-600" />
                      <span className="text-[7px] text-slate-400 font-bold tracking-wider">
                        UTC RESET
                      </span>
                    </div>

                  </div>
                </div>

                {/* AVISO DE DEMOSTRACIÓN */}
                <div className="max-w-xl mx-auto mt-3 p-2.5 rounded-xl bg-amber-400/5 border border-amber-300/20">
                  <p className="text-[8px] text-amber-200 text-center leading-relaxed">
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

          </main>
        </div>

        {/* FOOTER */}
        <footer className="text-center py-6">
          <p className="text-[9px] text-slate-500 tracking-[.25em] uppercase">
            LabCoin Faucet · Reward Universe
          </p>
        </footer>

      </div>

      {/* =================================================
          VENTANA BONUS: TICKET ADICIONAL POR VIDEO
      ================================================= */}

      {showBonusOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* FONDO OSCURO */}
          <button
            type="button"
            aria-label="Cerrar aviso"
            onClick={() => setShowBonusOffer(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* MODAL */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="bonus-title"
            className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-amber-300/30 bg-gradient-to-b from-[#193c54] to-[#091a2b] shadow-[0_20px_80px_rgba(0,0,0,.65)]"
          >

            {/* LUZ DECORATIVA */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-56 h-56 bg-amber-300/10 blur-[70px] rounded-full pointer-events-none" />

            <div className="relative p-5 text-center">

              {/* ICONO */}
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-amber-300/20 to-yellow-500/10 border border-amber-300/30 flex items-center justify-center shadow-[0_0_25px_rgba(251,191,36,.12)]">
                <Ticket size={29} className="text-amber-300" />
              </div>

              {/* MENSAJE */}
              <p className="text-[9px] text-amber-300 font-black tracking-[.22em] mt-4 uppercase">
                LabCoin Bonus Opportunity
              </p>

              <h3
                id="bonus-title"
                className="text-xl font-black mt-2"
              >
                ¡Tu claim fue realizado!
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed mt-3">
                ¿Quieres conseguir un
                <span className="text-amber-300 font-black"> ticket adicional </span>
                para la lotería de LabCoin?
              </p>

              <div className="mt-4 p-3 rounded-2xl bg-amber-300/5 border border-amber-300/15">
                <div className="flex items-center justify-center gap-2">
                  <PlaySquare size={17} className="text-amber-300" />
                  <span className="text-xs text-white font-bold">
                    Mira un video y obtén un ticket extra
                  </span>
                </div>
                <p className="text-[9px] text-slate-400 mt-2">
                  Es opcional. Puedes continuar sin ver el video.
                </p>
              </div>

              {/* ACCIONES */}
              <button
                onClick={handleWatchVideo}
                className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-amber-300 to-yellow-500 text-[#30200a] font-black text-xs tracking-wider shadow-[0_5px_18px_rgba(251,191,36,.2)] hover:brightness-110 active:scale-[.98] transition-all flex items-center justify-center gap-2"
              >
                <PlaySquare size={17} />
                VER VIDEO Y OBTENER TICKET
              </button>

              <button
                onClick={() => setShowBonusOffer(false)}
                className="w-full mt-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-[10px] font-bold hover:bg-white/10 transition-colors"
              >
                AHORA NO, GRACIAS
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
