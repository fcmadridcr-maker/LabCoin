
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
    <div className="relative w-full overflow-hidden rounded-[28px] border border-cyan-200/20 bg-[#10283e] shadow-[0_15px_45px_rgba(0,0,0,.35)]">
      <svg
        viewBox="0 0 900 510"
        className="block w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Laboratorio de minería con pequeños hámsteres ingenieros"
      >
        <defs>
          <linearGradient id="labWall" x2="0" y2="1">
            <stop stopColor="#d5eff7" />
            <stop offset=".48" stopColor="#648fae" />
            <stop offset="1" stopColor="#193b59" />
          </linearGradient>

          <linearGradient id="labFloor" x2="0" y2="1">
            <stop stopColor="#477b98" />
            <stop offset="1" stopColor="#10263e" />
          </linearGradient>

          <linearGradient id="labGlass" x2="1" y2="1">
            <stop stopColor="#e6ffff" stopOpacity=".65" />
            <stop offset=".5" stopColor="#58ddeb" stopOpacity=".12" />
            <stop offset="1" stopColor="#b4f5ff" stopOpacity=".3" />
          </linearGradient>

          <linearGradient id="labMetal" x2="1" y2="1">
            <stop stopColor="#f1fbff" />
            <stop offset=".45" stopColor="#91b8cb" />
            <stop offset="1" stopColor="#456d89" />
          </linearGradient>

          <linearGradient id="labBlue" x2="0" y2="1">
            <stop stopColor="#8df5ff" />
            <stop offset=".5" stopColor="#29c5e7" />
            <stop offset="1" stopColor="#0876ad" />
          </linearGradient>

          <linearGradient id="labGold" x2="0" y2="1">
            <stop stopColor="#fff1a9" />
            <stop offset=".5" stopColor="#f5c45b" />
            <stop offset="1" stopColor="#c47c27" />
          </linearGradient>

          <radialGradient id="labCore">
            <stop stopColor="#ffffff" />
            <stop offset=".35" stopColor="#b9ffff" />
            <stop offset="1" stopColor="#23bddd" />
          </radialGradient>

          <radialGradient id="labLight">
            <stop stopColor="#c6ffff" stopOpacity=".5" />
            <stop offset="1" stopColor="#42d9f0" stopOpacity="0" />
          </radialGradient>

          <filter id="labGlow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="labSoftShadow">
            <feGaussianBlur stdDeviation="9" />
          </filter>

          {/* HÁMSTER INGENIERO */}
          <g id="labHamster">
            {/* Sombra */}
            <ellipse cx="0" cy="130" rx="42" ry="8" fill="#061827" opacity=".3" />

            {/* Orejas */}
            <circle cx="-23" cy="28" r="16" fill="#d99c77" />
            <circle cx="23" cy="28" r="16" fill="#d99c77" />
            <circle cx="-23" cy="28" r="9" fill="#f5c5bc" />
            <circle cx="23" cy="28" r="9" fill="#f5c5bc" />

            {/* Cuerpo */}
            <ellipse cx="0" cy="96" rx="37" ry="38" fill="#d99e76" />
            <ellipse cx="0" cy="102" rx="29" ry="30" fill="#fff1df" />

            {/* Bata */}
            <path d="M-29 78 Q-42 91 -36 125 Q0 140 36 125 L29 78 Q0 64 -29 78Z"
              fill="#f7fcff" stroke="#d3e9f1" strokeWidth="2" />
            <path d="M-10 75 L0 94 L10 75 L6 116 L-6 116Z"
              fill="#d8f0f6" />
            <path d="M-10 76 L0 94 L10 76" fill="none" stroke="#b5dce9" strokeWidth="2" />

            {/* Cabeza */}
            <ellipse cx="0" cy="55" rx="37" ry="35" fill="#d99e76" />
            <ellipse cx="0" cy="65" rx="29" ry="22" fill="#fff0dc" />

            {/* Mejillas */}
            <ellipse cx="-21" cy="65" rx="10" ry="8" fill="#f4b9b2" opacity=".8" />
            <ellipse cx="21" cy="65" rx="10" ry="8" fill="#f4b9b2" opacity=".8" />

            {/* Ojos */}
            <ellipse cx="-12" cy="48" rx="5.5" ry="7" fill="#243449" />
            <ellipse cx="12" cy="48" rx="5.5" ry="7" fill="#243449" />
            <circle cx="-14" cy="45" r="2" fill="white" />
            <circle cx="10" cy="45" r="2" fill="white" />

            {/* Nariz y boca */}
            <ellipse cx="0" cy="62" rx="5" ry="3.5" fill="#bd777c" />
            <path d="M0 66 Q-5 73 -10 69 M0 66 Q5 73 10 69"
              fill="none" stroke="#a86c68" strokeWidth="1.5" strokeLinecap="round" />

            {/* Casco */}
            <path d="M-30 37 Q-28 5 0 7 Q28 5 30 37 Q0 29 -30 37Z"
              fill="#54cce9" stroke="#d9faff" strokeWidth="2" />
            <path d="M-35 36 Q0 26 35 36 L31 43 Q0 36 -31 43Z"
              fill="#249bc8" />
            <path d="M-13 17 Q0 11 13 17" fill="none" stroke="#d9ffff" strokeWidth="2" opacity=".8" />

            {/* Brazos y manos */}
            <path d="M-28 87 Q-43 88 -40 105" fill="none" stroke="#f6e6d7" strokeWidth="11" strokeLinecap="round" />
            <path d="M28 87 Q43 88 40 105" fill="none" stroke="#f6e6d7" strokeWidth="11" strokeLinecap="round" />
            <circle cx="-40" cy="106" r="7" fill="#d99e76" />
            <circle cx="40" cy="106" r="7" fill="#d99e76" />

            {/* Botones de bata */}
            <circle cx="0" cy="105" r="2" fill="#7ab6cb" />
            <circle cx="0" cy="115" r="2" fill="#7ab6cb" />
          </g>
        </defs>

        {/* AMBIENTE */}
        <rect width="900" height="510" fill="url(#labWall)" />

        <circle cx="450" cy="180" r="300" fill="url(#labLight)" />

        {/* VENTANA PANORÁMICA */}
        <rect x="175" y="42" width="550" height="175" rx="24"
          fill="#183d5d" stroke="#c0eff7" strokeWidth="5" />

        <rect x="186" y="53" width="528" height="153" rx="17"
          fill="#173b64" />

        <circle cx="620" cy="98" r="52" fill="#8eb8d2" opacity=".2" />
        <circle cx="620" cy="98" r="34" fill="#c1eaff" opacity=".12" />

        {Array.from({ length: 34 }, (_, i) => (
          <circle
            key={i}
            cx={(i * 83 + 31) % 520 + 190}
            cy={(i * 47 + 17) % 140 + 58}
            r={i % 3 === 0 ? 2 : 1}
            fill="#e5ffff"
            opacity=".8"
          />
        ))}

        {/* PANELES LATERALES */}
        {[25, 770].map((x, i) => (
          <g key={i}>
            <rect x={x} y="90" width="105" height="155" rx="18"
              fill="#315c79" stroke="#a6d7e8" strokeWidth="3" />
            <rect x={x + 10} y="102" width="85" height="90" rx="12"
              fill="#102e49" stroke="#69cfe3" strokeWidth="2" />
            <rect x={x + 22} y="120" width="60" height="7" rx="3" fill="#6be6f1" />
            <rect x={x + 22} y="138" width="45" height="5" rx="2" fill="#8cb9ce" />
            <rect x={x + 22} y="151" width="55" height="5" rx="2" fill="#8cb9ce" />
            <circle cx={x + 52} cy="215" r="9" fill="#7deaf1" filter="url(#labGlow)" />
          </g>
        ))}

        {/* TUBERÍAS */}
        <path d="M0 255 H180 Q200 255 200 235 V215"
          fill="none" stroke="#d5f4fa" strokeWidth="17" opacity=".8" />
        <path d="M0 255 H180 Q200 255 200 235 V215"
          fill="none" stroke="#76b3ce" strokeWidth="9" />

        <path d="M900 255 H720 Q700 255 700 235 V215"
          fill="none" stroke="#d5f4fa" strokeWidth="17" opacity=".8" />
        <path d="M900 255 H720 Q700 255 700 235 V215"
          fill="none" stroke="#76b3ce" strokeWidth="9" />

        {/* REACTOR CENTRAL */}
        <ellipse cx="450" cy="418" rx="175" ry="28"
          fill="#061726" opacity=".35" filter="url(#labSoftShadow)" />

        <rect x="315" y="350" width="270" height="75" rx="25"
          fill="url(#labMetal)" stroke="#e0faff" strokeWidth="4" />

        <rect x="330" y="362" width="240" height="48" rx="17"
          fill="#214965" stroke="#78c9de" strokeWidth="3" />

        <rect x="355" y="382" width="190" height="9" rx="4"
          fill="url(#labBlue)" filter="url(#labGlow)" />

        <rect x="370" y="120" width="160" height="245" rx="75"
          fill="url(#labGlass)" stroke="#d7ffff" strokeWidth="5" />

        <rect x="385" y="135" width="130" height="210" rx="62"
          fill="#32c9e5" opacity=".10" />

        <ellipse cx="450" cy="135" rx="80" ry="17"
          fill="url(#labMetal)" stroke="#e8ffff" strokeWidth="4" />

        <ellipse cx="450" cy="345" rx="80" ry="17"
          fill="url(#labMetal)" stroke="#e8ffff" strokeWidth="4" />

        <circle cx="450" cy="235" r="75"
          fill="#62eaff" opacity=".16" filter="url(#labGlow)" />

        <circle cx="450" cy="235" r="49"
          fill="url(#labCore)" stroke="#e5ffff" strokeWidth="4" />

        <circle cx="450" cy="235" r="35"
          fill="url(#labGold)" stroke="#fff1bb" strokeWidth="3" />

        <text x="450" y="250" textAnchor="middle"
          fontSize="42" fontWeight="bold" fill="#fff8d5">₿</text>

        <ellipse cx="450" cy="235" rx="67" ry="15"
          fill="none" stroke="#fff3b6" strokeWidth="4" opacity=".8" />

        {/* DETALLES DEL REACTOR */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i}
            cx={450 + Math.cos(i * Math.PI / 3) * 94}
            cy={235 + Math.sin(i * Math.PI / 3) * 94}
            r="4" fill="#b9ffff" />
        ))}

        {/* MÁQUINAS LATERALES */}
        <g>
          <rect x="65" y="320" width="160" height="92" rx="22"
            fill="url(#labMetal)" stroke="#d8f7ff" strokeWidth="3" />
          <rect x="80" y="333" width="130" height="62" rx="15"
            fill="#183c58" />
          <circle cx="111" cy="364" r="19" fill="#0b253e"
            stroke="#7deaf2" strokeWidth="4" />
          <circle cx="111" cy="364" r="10" fill="url(#labCore)" />
          <rect x="145" y="347" width="47" height="7" rx="3" fill="#7deaf2" />
          <rect x="145" y="363" width="35" height="5" rx="2" fill="#a7c9d9" />
          <rect x="145" y="376" width="42" height="5" rx="2" fill="#a7c9d9" />
        </g>

        <g>
          <rect x="675" y="320" width="160" height="92" rx="22"
            fill="url(#labMetal)" stroke="#d8f7ff" strokeWidth="3" />
          <rect x="690" y="333" width="130" height="62" rx="15"
            fill="#183c58" />
          <circle cx="721" cy="364" r="19" fill="#0b253e"
            stroke="#7deaf2" strokeWidth="4" />
          <circle cx="721" cy="364" r="10" fill="url(#labCore)" />
          <rect x="755" y="347" width="47" height="7" rx="3" fill="#7deaf2" />
          <rect x="755" y="363" width="35" height="5" rx="2" fill="#a7c9d9" />
          <rect x="755" y="376" width="42" height="5" rx="2" fill="#a7c9d9" />
        </g>

        {/* CINTA TRANSPORTADORA */}
        <path d="M520 390 H870" stroke="#244d6b" strokeWidth="28" strokeLinecap="round" />
        <path d="M520 379 H870" stroke="#d0f4fa" strokeWidth="5" opacity=".8" />
        <path d="M520 401 H870" stroke="#5e9bb8" strokeWidth="5" />

        {[550, 610, 670, 730, 790, 850].map((x, i) => (
          <circle key={i} cx={x} cy="390" r="8"
            fill="url(#labMetal)" stroke="#d9faff" strokeWidth="2" />
        ))}

        {/* MONEDAS */}
        {[570, 630, 690, 750, 810].map((x, i) => (
          <g key={i}>
            <ellipse cx={x} cy={365 - (i % 2) * 9} rx="15" ry="5"
              fill="#a56c24" />
            <ellipse cx={x} cy={360 - (i % 2) * 9} rx="15" ry="6"
              fill="url(#labGold)" stroke="#fff1b4" strokeWidth="2" />
            <text x={x} y={364 - (i % 2) * 9} textAnchor="middle"
              fontSize="10" fontWeight="bold" fill="#a66a20">₿</text>
          </g>
        ))}

        {/* HÁMSTER 1: SUPERVISOR */}
        <g transform="translate(270 225) scale(.88)">
          <use href="#labHamster" />
          <rect x="-24" y="90" width="48" height="27" rx="5"
            fill="#173d5c" stroke="#a6eff5" strokeWidth="2" />
          <rect x="-19" y="95" width="38" height="16" rx="3"
            fill="#4bd8ee" />
          <path d="M-15 106 L-5 100 L2 104 L12 98"
            fill="none" stroke="#ffffff" strokeWidth="2" />
        </g>

        {/* HÁMSTER 2: OPERARIO */}
        <g transform="translate(155 285) scale(.88)">
          <use href="#labHamster" />
          <path d="M-37 112 Q-55 108 -58 90"
            fill="none" stroke="#d99e76" strokeWidth="8" strokeLinecap="round" />
        </g>

        {/* HÁMSTER 3: TRANSPORTISTA */}
        <g transform="translate(745 260) scale(.85)">
          <use href="#labHamster" />
          <path d="M-30 92 L-49 108" stroke="#d99e76"
            strokeWidth="8" strokeLinecap="round" />
        </g>

        {/* CRISTALES DECORATIVOS */}
        <g>
          <path d="M20 420 L35 365 L50 420Z"
            fill="#8deaff" stroke="#d9ffff" strokeWidth="2" />
          <path d="M45 420 L62 382 L80 420Z"
            fill="#4bc9ee" stroke="#c8faff" strokeWidth="2" />
          <path d="M840 420 L860 360 L880 420Z"
            fill="#8deaff" stroke="#d9ffff" strokeWidth="2" />
        </g>

        {/* SUELO */}
        <rect x="0" y="430" width="900" height="80" fill="url(#labFloor)" />
        <path d="M0 430 H900" stroke="#c8faff" strokeWidth="3" opacity=".65" />

        {[100, 300, 500, 700].map((x, i) => (
          <path key={i} d={`M${x} 450 L${x + 40} 450 L${x + 70} 510`}
            stroke="#75cde1" strokeWidth="2" opacity=".25" fill="none" />
        ))}

        {/* IDENTIFICACIÓN */}
        <rect x="350" y="446" width="200" height="34" rx="12"
          fill="#123450" stroke="#9ceefa" strokeWidth="2" />
        <text x="450" y="468" textAnchor="middle"
          fontSize="14" fontWeight="bold" fill="#c8faff">
          LABCOIN MINING
        </text>
      </svg>

      {/* ETIQUETA SUPERIOR */}
      <div className="absolute top-3 left-3 md:top-5 md:left-5">
        <div className="px-3 py-2 rounded-xl bg-[#102d45]/85 border border-cyan-100/40 backdrop-blur-md shadow-lg">
          <p className="text-[8px] md:text-[10px] font-black text-cyan-100 tracking-[.2em]">
            HAMSTER MINING LAB
          </p>
          <p className="text-[8px] text-slate-200 mt-1">
            CORE REACTOR 01
          </p>
        </div>
      </div>

      {/* ESTADO */}
      <div className="absolute top-3 right-3 md:top-5 md:right-5">
        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#102d45]/85 border border-emerald-200/40 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
          <span className="text-[8px] md:text-[10px] font-bold text-emerald-100">
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
