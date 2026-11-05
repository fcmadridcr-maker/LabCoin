
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
    <div className="relative w-full h-[205px] sm:h-[245px] md:h-[285px] overflow-hidden rounded-[24px] border border-cyan-200/20 bg-[#10283e] shadow-[0_12px_35px_rgba(0,0,0,.30)]">
      <svg
  viewBox="0 0 900 510"
  className="block w-full h-full"
  preserveAspectRatio="xMidYMid meet"
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
  <defs>
    <radialGradient id="hamsterFur" cx="35%" cy="25%" r="75%">
      <stop offset="0%" stopColor="#fff0d8" />
      <stop offset="42%" stopColor="#e9bd91" />
      <stop offset="78%" stopColor="#c98b61" />
      <stop offset="100%" stopColor="#925b43" />
    </radialGradient>

    <radialGradient id="hamsterCream" cx="45%" cy="25%" r="75%">
      <stop offset="0%" stopColor="#fffdf3" />
      <stop offset="75%" stopColor="#f5dfc7" />
      <stop offset="100%" stopColor="#d9b99c" />
    </radialGradient>

    <radialGradient id="hamsterEar" cx="50%" cy="35%" r="70%">
      <stop offset="0%" stopColor="#ffd8d0" />
      <stop offset="100%" stopColor="#bd7774" />
    </radialGradient>

    <linearGradient id="hamsterCoat" x2="0" y2="1">
      <stop stopColor="#ffffff" />
      <stop offset=".55" stopColor="#eaf7fc" />
      <stop offset="1" stopColor="#b9d7e5" />
    </linearGradient>

    <linearGradient id="hamsterHelmet" x2="0" y2="1">
      <stop stopColor="#d9ffff" />
      <stop offset=".35" stopColor="#63dff5" />
      <stop offset="1" stopColor="#1689bd" />
    </linearGradient>

    <filter id="hamsterShadow" x="-40%" y="-30%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="5" />
    </filter>

    <filter id="hamsterFurTexture">
      <feTurbulence
        type="fractalNoise"
        baseFrequency=".8"
        numOctaves="2"
        seed="8"
        result="noise"
      />
      <feColorMatrix
        in="noise"
        type="saturate"
        values="0"
        result="grayNoise"
      />
      <feComponentTransfer in="grayNoise" result="softNoise">
        <feFuncA type="table" tableValues="0 .12" />
      </feComponentTransfer>
      <feBlend in="SourceGraphic" in2="softNoise" mode="soft-light" />
    </filter>
  </defs>

  {/* Sombra de contacto */}
  <ellipse cx="0" cy="130" rx="43" ry="9"
    fill="#061827" opacity=".38" filter="url(#hamsterShadow)" />

  {/* Patitas traseras */}
  <ellipse cx="-20" cy="119" rx="13" ry="8" fill="#bd805f" />
  <ellipse cx="20" cy="119" rx="13" ry="8" fill="#bd805f" />
  <ellipse cx="-20" cy="117" rx="8" ry="4" fill="#f4c9b0" />
  <ellipse cx="20" cy="117" rx="8" ry="4" fill="#f4c9b0" />

  {/* Orejas */}
  <ellipse cx="-25" cy="29" rx="17" ry="19"
    fill="url(#hamsterFur)" />
  <ellipse cx="25" cy="29" rx="17" ry="19"
    fill="url(#hamsterFur)" />
  <ellipse cx="-25" cy="29" rx="10" ry="12"
    fill="url(#hamsterEar)" />
  <ellipse cx="25" cy="29" rx="10" ry="12"
    fill="url(#hamsterEar)" />

  {/* Cuerpo */}
  <ellipse cx="0" cy="96" rx="39" ry="39"
    fill="url(#hamsterFur)" filter="url(#hamsterFurTexture)" />
  <ellipse cx="0" cy="105" rx="29" ry="27"
    fill="url(#hamsterCream)" />

  {/* Pelaje lateral */}
  <path d="M-32 82 Q-44 88 -39 104 Q-35 116 -25 119
    M32 82 Q44 88 39 104 Q35 116 25 119"
    fill="none" stroke="#f5d5b4" strokeWidth="5"
    strokeLinecap="round" opacity=".7" />

  {/* Bata */}
  <path d="M-27 79 Q-39 83 -38 119
    Q0 137 38 119 L27 79
    Q0 68 -27 79Z"
    fill="url(#hamsterCoat)" stroke="#c5e2ed" strokeWidth="2" />

  <path d="M-11 75 L0 94 L11 75 L7 119 L-7 119Z"
    fill="#d7edf4" />
  <path d="M-11 75 L0 94 L11 75"
    fill="none" stroke="#a9cfdf" strokeWidth="2" />

  {/* Bolsillo de la bata */}
  <path d="M12 98 L27 98 L27 113 L12 113Z"
    fill="#d5edf5" stroke="#b5d8e5" strokeWidth="1.5" />
  <path d="M16 102 L23 102"
    stroke="#69b5ce" strokeWidth="2" strokeLinecap="round" />

  {/* Brazos */}
  <path d="M-28 88 Q-43 91 -42 106"
    fill="none" stroke="#f4dfc8" strokeWidth="13"
    strokeLinecap="round" />
  <path d="M28 88 Q43 91 42 106"
    fill="none" stroke="#f4dfc8" strokeWidth="13"
    strokeLinecap="round" />

  <circle cx="-42" cy="108" r="8" fill="url(#hamsterFur)" />
  <circle cx="42" cy="108" r="8" fill="url(#hamsterFur)" />

  {/* Cabeza */}
  <ellipse cx="0" cy="54" rx="39" ry="37"
    fill="url(#hamsterFur)" filter="url(#hamsterFurTexture)" />

  {/* Reflejo superior del pelaje */}
  <ellipse cx="-10" cy="30" rx="19" ry="7"
    fill="#fff4df" opacity=".3" />

  {/* Zona blanca del rostro */}
  <ellipse cx="0" cy="66" rx="30" ry="23"
    fill="url(#hamsterCream)" />

  {/* Mejillas */}
  <ellipse cx="-23" cy="66" rx="12" ry="10"
    fill="#f6b8ae" opacity=".65" />
  <ellipse cx="23" cy="66" rx="12" ry="10"
    fill="#f6b8ae" opacity=".65" />

  {/* Ojos brillantes */}
  <ellipse cx="-13" cy="49" rx="6" ry="8"
    fill="#342b2a" />
  <ellipse cx="13" cy="49" rx="6" ry="8"
    fill="#342b2a" />
  <ellipse cx="-14.5" cy="46" rx="2.3" ry="2.8"
    fill="#ffffff" />
  <ellipse cx="11.5" cy="46" rx="2.3" ry="2.8"
    fill="#ffffff" />
  <circle cx="-10" cy="52" r="1.2" fill="#ffffff" />
  <circle cx="16" cy="52" r="1.2" fill="#ffffff" />

  {/* Hocico */}
  <ellipse cx="0" cy="65" rx="13" ry="9"
    fill="#fff9ee" />
  <ellipse cx="0" cy="62" rx="5.5" ry="4"
    fill="#c87e82" />
  <path d="M0 66 Q-2 72 -8 71 M0 66 Q2 72 8 71"
    fill="none" stroke="#9b625e" strokeWidth="1.6"
    strokeLinecap="round" />

  {/* Bigotes */}
  <path d="M-12 67 L-29 64 M-12 71 L-28 75
    M12 67 L29 64 M12 71 L28 75"
    fill="none" stroke="#d6b49c" strokeWidth="1"
    strokeLinecap="round" />

  {/* Casco */}
  <path d="M-32 39 Q-30 5 0 5 Q30 5 32 39
    Q0 29 -32 39Z"
    fill="url(#hamsterHelmet)" stroke="#e4ffff" strokeWidth="2" />

  <path d="M-37 37 Q0 27 37 37 L32 45
    Q0 38 -32 45Z"
    fill="#1689bd" stroke="#b7f5ff" strokeWidth="1.5" />

  <path d="M-19 19 Q-8 9 5 12"
    fill="none" stroke="#ffffff" strokeWidth="3"
    strokeLinecap="round" opacity=".8" />

  {/* Insignia del casco */}
  <circle cx="0" cy="25" r="5" fill="#fff0a6" />
  <circle cx="0" cy="25" r="2.5" fill="#f3b944" />

  {/* Botones */}
  <circle cx="0" cy="104" r="2.2" fill="#71b9d0" />
  <circle cx="0" cy="114" r="2.2" fill="#71b9d0" />
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

              <div className="p-3 md:p-5">

                {/* ESCENARIO 3D */}
                <MiningLaboratory />

                {/* RECOMPENSA */}
                <div className="mt-3 text-center">

                  <p className="text-[10px] uppercase tracking-[.3em] text-cyan-300 font-black">
                    Mining Reward Available
                  </p>

                  <div className="mt-3">
                    <h3 className="text-3xl md:text-5xl font-black font-mono text-white tracking-tight drop-shadow-[0_0_20px_rgba(34,211,238,.35)]">
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
                <div className="max-w-md mx-auto mt-4">

                  <button className="w-full rounded-2xl bg-gradient-to-b from-[#66f1f3] via-[#18badb] to-[#0873b4] border-b-[5px] border-[#07517e] py-3 px-6 text-white font-black uppercase tracking-widest text-sm shadow-[0_8px_25px_rgba(14,165,233,.25)] hover:brightness-110 active:translate-y-1 active:border-b-0 transition-all">
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
