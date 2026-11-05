
import React, { useState } from 'react';
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
  Hammer,
  Activity,
  Settings,
  Coins,
  Factory
} from 'lucide-react';

// ======================================================
// CORECOIN MINING LABORATORY
// Escenario original de minería caricaturesca 3D.
// La lógica económica y de recompensas no se modifica.
// ======================================================

const modules = [
  { id: 'claim', label: 'Laboratorio', icon: Factory },
  { id: 'shortlinks', label: 'Shortlinks & Lotería', icon: Layers },
  { id: 'videos', label: 'Videos', icon: PlaySquare },
  { id: 'ptc', label: 'Reactor PTC', icon: Cpu },
  { id: 'achievements', label: 'Logros', icon: Award },
  { id: 'withdraw', label: 'Retiros', icon: ArrowUpRight },
  { id: 'bonus', label: 'Bonus', icon: Check },
];

// ------------------------------------------------------
// ESCENARIO PRINCIPAL: LABORATORIO ILUSTRADO
// ------------------------------------------------------

function MiningLaboratory() {
  return (
    <div className="relative w-full overflow-hidden rounded-[28px] border border-[#477d9b] bg-[#102b43] shadow-[0_15px_45px_rgba(0,0,0,.4)]">

      <svg
        viewBox="0 0 900 510"
        className="block w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Laboratorio futurista de minería con reactor central y cristales"
      >
        <defs>
          <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#315a77" />
            <stop offset="1" stopColor="#122b43" />
          </linearGradient>

          <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#254962" />
            <stop offset="1" stopColor="#0b1d30" />
          </linearGradient>

          <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#b3d0d8" />
            <stop offset=".35" stopColor="#567f98" />
            <stop offset="1" stopColor="#203c57" />
          </linearGradient>

          <linearGradient id="goldMetal" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#ffe39a" />
            <stop offset=".5" stopColor="#d99a35" />
            <stop offset="1" stopColor="#88521c" />
          </linearGradient>

          <linearGradient id="cyan" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#b7ffff" />
            <stop offset=".4" stopColor="#39ddeb" />
            <stop offset="1" stopColor="#087cae" />
          </linearGradient>

          <radialGradient id="core">
            <stop stopColor="#ffffff" />
            <stop offset=".25" stopColor="#b5ffff" />
            <stop offset=".65" stopColor="#28cfe9" />
            <stop offset="1" stopColor="#0878b4" />
          </radialGradient>

          <linearGradient id="purpleCrystal" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#e8c5ff" />
            <stop offset=".5" stopColor="#a46bff" />
            <stop offset="1" stopColor="#5235ad" />
          </linearGradient>

          <linearGradient id="greenCrystal" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#d3ffb5" />
            <stop offset=".5" stopColor="#5bdc98" />
            <stop offset="1" stopColor="#147d68" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="shadow">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* PAREDES DEL LABORATORIO */}
        <rect width="900" height="510" fill="url(#wall)" />

        {/* Paneles arquitectónicos */}
        <path d="M0 0 H900 V55 H0Z" fill="#183950" />
        <path d="M0 58 H900" stroke="#77b3c8" strokeWidth="2" opacity=".35" />

        {Array.from({ length: 9 }, (_, i) => (
          <g key={i}>
            <rect
              x={i * 110 + 10}
              y="75"
              width="94"
              height="170"
              rx="9"
              fill="#10263c"
              stroke="#507c94"
              strokeWidth="3"
            />
            <path
              d={`M${i * 110 + 25} 90 V225`}
              stroke="#81b5c9"
              opacity=".12"
              strokeWidth="3"
            />
          </g>
        ))}

        {/* VENTANA CENTRAL */}
        <rect x="285" y="76" width="330" height="140" rx="18"
          fill="#071a30" stroke="#82d9e9" strokeWidth="5" />

        <rect x="295" y="86" width="310" height="120" rx="12"
          fill="#142f53" />

        {/* Espacio exterior */}
        <circle cx="430" cy="132" r="53" fill="#435a92" opacity=".45" />
        <circle cx="430" cy="132" r="38" fill="#7184c2" opacity=".25" />
        <circle cx="430" cy="132" r="4" fill="white" />

        {[[335,110],[510,115],[550,175],[370,180],[575,110]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="#d6ffff" />
        ))}

        {/* CONDUCTOS SUPERIORES */}
        <path d="M30 40 V270 Q30 290 50 290 H165"
          fill="none" stroke="#a5c8d6" strokeWidth="13" />
        <path d="M30 40 V270 Q30 290 50 290 H165"
          fill="none" stroke="#527d97" strokeWidth="8" />

        <path d="M870 40 V270 Q870 290 850 290 H735"
          fill="none" stroke="#a5c8d6" strokeWidth="13" />
        <path d="M870 40 V270 Q870 290 850 290 H735"
          fill="none" stroke="#527d97" strokeWidth="8" />

        {/* LUCES */}
        {[100,250,450,650,800].map((x,i) => (
          <g key={i}>
            <rect x={x-16} y="18" width="32" height="7" rx="3" fill="#49e5ee" />
            <ellipse cx={x} cy="28" rx="25" ry="12" fill="#45e8f1" opacity=".15" filter="url(#glow)" />
          </g>
        ))}

        {/* MÁQUINA LATERAL IZQUIERDA */}
        <g>
          <ellipse cx="150" cy="380" rx="100" ry="24" fill="#061727" opacity=".6" />

          <rect x="55" y="265" width="190" height="112" rx="20"
            fill="#244e68" stroke="#79b4ca" strokeWidth="4" />

          <rect x="68" y="280" width="164" height="82" rx="13"
            fill="#102c43" stroke="#497e99" strokeWidth="3" />

          <circle cx="110" cy="322" r="27"
            fill="#0b1b2b" stroke="#e0b55c" strokeWidth="7" />

          <circle cx="110" cy="322" r="17"
            fill="url(#core)" />

          <rect x="155" y="295" width="56" height="10" rx="4" fill="#4bdce8" />
          <rect x="155" y="315" width="42" height="7" rx="3" fill="#7eacc0" />
          <rect x="155" y="331" width="52" height="7" rx="3" fill="#7eacc0" />

          <rect x="78" y="370" width="144" height="18" rx="6"
            fill="url(#metal)" />

          <circle cx="90" cy="385" r="5" fill="#f7c66a" />
          <circle cx="210" cy="385" r="5" fill="#f7c66a" />
        </g>

        {/* MÁQUINA LATERAL DERECHA */}
        <g>
          <ellipse cx="750" cy="380" rx="105" ry="24" fill="#061727" opacity=".6" />

          <rect x="650" y="265" width="195" height="112" rx="20"
            fill="#244e68" stroke="#79b4ca" strokeWidth="4" />

          <rect x="664" y="279" width="167" height="84" rx="13"
            fill="#102c43" stroke="#497e99" strokeWidth="3" />

          <rect x="683" y="294" width="65" height="55" rx="8"
            fill="#071b2b" stroke="#4b94a8" strokeWidth="3" />

          <path d="M692 337 L708 309 L722 330 L736 302"
            fill="none" stroke="#4ce6d9" strokeWidth="4" />

          <rect x="765" y="294" width="49" height="10" rx="4" fill="#e9b85d" />
          <rect x="765" y="314" width="38" height="7" rx="3" fill="#7eacc0" />
          <rect x="765" y="330" width="48" height="7" rx="3" fill="#7eacc0" />

          <rect x="675" y="370" width="145" height="18" rx="6"
            fill="url(#metal)" />
        </g>

        {/* CRISTALES IZQUIERDOS */}
        <g filter="url(#glow)">
          <path d="M255 370 L265 325 L280 305 L294 325 L306 370Z"
            fill="url(#purpleCrystal)" stroke="#e4c5ff" strokeWidth="2" />
          <path d="M265 325 L280 305 L280 360 L255 370Z"
            fill="#e8c5ff" opacity=".45" />

          <path d="M300 370 L310 337 L324 322 L337 339 L344 370Z"
            fill="url(#greenCrystal)" stroke="#a8ffd6" strokeWidth="2" />
        </g>

        {/* CRISTALES DERECHOS */}
        <g filter="url(#glow)">
          <path d="M595 370 L610 310 L626 292 L642 316 L650 370Z"
            fill="url(#greenCrystal)" stroke="#b3ffda" strokeWidth="2" />

          <path d="M625 370 L643 335 L660 315 L676 342 L683 370Z"
            fill="url(#purpleCrystal)" stroke="#dfc5ff" strokeWidth="2" />
        </g>

        {/* REACTOR CENTRAL - SOMBRA */}
        <ellipse cx="450" cy="420" rx="170" ry="35"
          fill="#020b16" opacity=".7" filter="url(#shadow)" />

        {/* BASE DEL REACTOR */}
        <path d="M340 385 H560 L585 430 H315Z"
          fill="#254c65" stroke="#8bc4d3" strokeWidth="4" />

        <path d="M360 398 H540 L550 418 H350Z"
          fill="#10283c" />

        <rect x="372" y="421" width="156" height="17" rx="7"
          fill="url(#goldMetal)" />

        <rect x="390" y="426" width="120" height="5" rx="2"
          fill="#fff1b8" opacity=".8" />

        {/* SOPORTES DEL REACTOR */}
        {[345,540].map((x,i) => (
          <g key={i}>
            <rect x={x} y="310" width="24" height="88" rx="8"
              fill="url(#metal)" stroke="#8bb6c9" strokeWidth="2" />
            <rect x={x+5} y="325" width="14" height="52" rx="4"
              fill="#35d8e8" opacity=".7" />
          </g>
        ))}

        {/* REACTOR PRINCIPAL */}
        <g>
          <ellipse cx="450" cy="300" rx="117" ry="24"
            fill="#071827" stroke="#b0d5dc" strokeWidth="5" />

          <path d="M333 300 V370 Q333 396 450 396 Q567 396 567 370 V300Z"
            fill="url(#metal)" stroke="#b5d9e0" strokeWidth="5" />

          <path d="M345 308 V367 Q345 383 450 383 Q555 383 555 367 V308Z"
            fill="#18364d" stroke="#6b9aaf" strokeWidth="3" />

          <ellipse cx="450" cy="310" rx="103" ry="22"
            fill="#456d86" stroke="#a6d3dd" strokeWidth="5" />

          <ellipse cx="450" cy="308" rx="78" ry="15"
            fill="#071b30" stroke="#39d8e8" strokeWidth="3" />

          {/* Núcleo energético */}
          <circle cx="450" cy="296" r="55"
            fill="#22d5e8" opacity=".2" filter="url(#glow)" />

          <circle cx="450" cy="296" r="44"
            fill="#0a263e" stroke="#4be4ef" strokeWidth="5" />

          <circle cx="450" cy="296" r="34"
            fill="url(#core)" filter="url(#glow)" />

          <path d="M450 264 L465 292 L450 323 L435 292Z"
            fill="#e5ffff" opacity=".75" />

          {/* Detalles de reactor */}
          {[0,1,2,3,4,5].map((i) => (
            <circle
              key={i}
              cx={450 + Math.cos(i * Math.PI / 3) * 91}
              cy={309 + Math.sin(i * Math.PI / 3) * 15}
              r="5"
              fill="#ffe39a"
              stroke="#9e6b28"
              strokeWidth="2"
            />
          ))}

          {/* Indicadores frontales */}
          <rect x="376" y="352" width="148" height="21" rx="7"
            fill="#0a1b2d" stroke="#6c9db0" strokeWidth="2" />

          <rect x="389" y="359" width="35" height="7" rx="3" fill="#43e1e8" />
          <rect x="431" y="359" width="35" height="7" rx="3" fill="#5ee3a3" />
          <rect x="473" y="359" width="35" height="7" rx="3" fill="#e9bd63" />

        </g>

        {/* PLATAFORMA INFERIOR */}
        <path d="M0 440 H900 V510 H0Z" fill="url(#floor)" />
        <path d="M0 440 H900" stroke="#65b4c9" strokeWidth="4" opacity=".5" />

        <path d="M40 460 H860" stroke="#4a829a" strokeWidth="2" opacity=".4" />

        {/* PANELES DEL SUELO */}
        {[100,300,500,700].map((x,i) => (
          <g key={i}>
            <path d={`M${x} 455 L${x+35} 455 L${x+60} 510 L${x-25} 510Z`}
              fill="#24475d" opacity=".65" />
            <path d={`M${x} 470 H${x+20}`}
              stroke="#4bdde8" strokeWidth="3" />
          </g>
        ))}

        {/* DETALLES LUMINOSOS */}
        <circle cx="450" cy="450" r="5" fill="#f7d17a" />
        <circle cx="450" cy="450" r="16" stroke="#e4b65b" fill="none" opacity=".5" />

      </svg>

      {/* ETIQUETA SUPERIOR */}
      <div className="absolute top-3 left-3 md:top-5 md:left-5">
        <div className="px-3 py-2 rounded-xl bg-[#071a2d]/85 border border-cyan-300/30 backdrop-blur-md">
          <p className="text-[8px] md:text-[10px] font-black text-cyan-300 tracking-[.2em]">
            MINING CHAMBER
          </p>
          <p className="text-[8px] text-slate-300 mt-1">
            CORE REACTOR 01
          </p>
        </div>
      </div>

      {/* ESTADO */}
      <div className="absolute top-3 right-3 md:top-5 md:right-5">
        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#071a2d]/85 border border-emerald-400/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[8px] md:text-[10px] font-bold text-emerald-300">
            REACTOR ONLINE
          </span>
        </div>
      </div>

    </div>
  );
}

// ------------------------------------------------------
// APLICACIÓN PRINCIPAL
// ------------------------------------------------------

export default function LabCoinApp() {
  const [activeTab, setActiveTab] = useState('claim');
  const [balance] = useState('0.00500000');
  const [bonusChecked, setBonusChecked] = useState(false);

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
              <Hammer size={23} className="text-white" />
            </div>

            <div>
              <p className="text-[9px] text-cyan-300 tracking-[.25em] uppercase font-black">
                Mining Universe
              </p>
              <h1 className="text-base md:text-xl font-black tracking-wide">
                CoreCoin <span className="text-cyan-300">Laboratory</span>
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

            <button aria-label="Cerrar" className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10">
              <X size={19} />
            </button>

          </div>
        </div>
      </header>

      {/* CONTENIDO */}
      <div className="relative z-10 max-w-[1400px] mx-auto p-4 md:p-7">

        <div className="grid grid-cols-1 lg:grid-cols-[235px_minmax(0,1fr)] gap-5">

          {/* MENÚ */}
          <aside className="bg-gradient-to-b from-[#19364e] to-[#102439] border border-[#47738c] rounded-[25px] p-4 shadow-[0_10px_30px_rgba(0,0,0,.25)] h-fit">

            <div className="flex justify-between items-center px-2 pb-4 border-b border-white/10 mb-3">
              <span className="text-[10px] text-cyan-200 font-black tracking-[.2em] uppercase">
                Laboratory
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
                Mining infrastructure operational.
              </p>
            </div>

          </aside>

          {/* PANEL CENTRAL */}
          <main className="min-w-0 bg-gradient-to-b from-[#17344b] to-[#0d2033] rounded-[28px] border border-[#47758e] shadow-[0_15px_50px_rgba(0,0,0,.3)] overflow-hidden">

            {/* BARRA DE CONTROL */}
            <div className="px-5 md:px-7 py-4 border-b border-white/10 flex justify-between items-center">

              <div>
                <p className="text-[9px] text-cyan-300 font-black tracking-[.2em] uppercase">
                  Station Control / 01
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

            {activeTab === 'claim' ? (

              <div className="p-4 md:p-7">

                {/* ESCENARIO 3D */}
                <MiningLaboratory />

                {/* RECOMPENSA */}
                <div className="mt-7 text-center">

                  <p className="text-[10px] uppercase tracking-[.3em] text-cyan-300 font-black">
                    Mining Reward Available
                  </p>

                  <div className="mt-3">
                    <h3 className="text-4xl md:text-6xl font-black font-mono text-white tracking-tight drop-shadow-[0_0_20px_rgba(34,211,238,.35)]">
                      $0.00100
                    </h3>
                    <p className="text-sm text-cyan-300 font-black tracking-[.3em] mt-2">
                      USDT
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-400/10 border border-amber-300/40">
                    <Ticket size={16} className="text-amber-300" />
                    <span className="text-xs text-amber-200 font-black">
                      + 1 MINING TICKET
                    </span>
                  </div>

                </div>

                {/* BOTÓN PRINCIPAL */}
                <div className="max-w-md mx-auto mt-7">

                  <button className="w-full rounded-2xl bg-gradient-to-b from-[#66f1f3] via-[#18badb] to-[#0873b4] border-b-[5px] border-[#07517e] py-4 px-6 text-white font-black uppercase tracking-widest text-sm shadow-[0_8px_25px_rgba(14,165,233,.25)] hover:brightness-110 active:translate-y-1 active:border-b-0 transition-all">
                    <span className="flex items-center justify-center gap-3">
                      <Zap size={20} />
                      Extract Reward
                      <ArrowUpRight size={18} />
                    </span>
                  </button>

                  <p className="text-center text-[9px] text-slate-500 mt-3 tracking-widest">
                    CORECOIN MINING TECHNOLOGY
                  </p>

                </div>

              </div>

            ) : (

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
                  Mining module selected.
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

        <footer className="text-center py-6">
          <p className="text-[9px] text-slate-500 tracking-[.25em] uppercase">
            CoreCoin Mining Laboratory · Mining Universe
          </p>
        </footer>

      </div>
    </div>
  );
}
