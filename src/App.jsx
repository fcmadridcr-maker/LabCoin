import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Wallet, Clock, CheckCircle2, 
  ArrowUpRight, ShieldCheck, RefreshCw, Coins, 
  ExternalLink, MousePointerClick, ListTodo, Gift, LayoutDashboard, PlaySquare, X, Cpu, Zap, Download, Activity, Sparkles 
} from 'lucide-react';

export default function FaucetDashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Balance en USDT
  const [balanceUSDT, setBalanceUSDT] = useState(24.5000);

  // Misiones diarias
  const [dailyVideoClaims, setDailyVideoClaims] = useState(5);
  const [dailyTotalClaims, setDailyTotalClaims] = useState(12);
  const [shortlinksDone, setShortlinksDone] = useState(3);
  const [ptcDone, setPtcDone] = useState(4);
  const [dailyBonusClaimed, setDailyBonusClaimed] = useState(false);

  // Estado del Farming (Activado por defecto en Nivel 1)
  const [farmingLevel, setFarmingLevel] = useState(1); 
  const [farmedEarnings, setFarmedEarnings] = useState(0.01250); 

  // Redes disponibles para USDT
  const networks = [
    { id: 'sol', name: 'Solana (SPL)', fee: 'Ultra bajo', waitTime: 30, baseReward: 0.00050, bonusReward: 0.00065, icon: '🟣' },
    { id: 'bnb', name: 'BNB Smart Chain (BEP-20)', fee: 'Muy bajo', waitTime: 45, baseReward: 0.00050, bonusReward: 0.00065, icon: '🟡' }
  ];

  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isClaiming, setIsClaiming] = useState(false);

  // Estados para modales
  const [showCaptchaModal, setShowCaptchaModal] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [adTimer, setAdTimer] = useState(15);
  const [isAdPlaying, setIsAdPlaying] = useState(false);
  const [activeAdType, setActiveAdType] = useState('faucet');

  // Historial
  const [claims, setClaims] = useState([
    { id: 1, asset: 'USDT (Solana)', amount: '0.00065 USDT (+30%)', type: 'Faucet (Video Ad)', status: 'Completado', time: 'Hace 5 min' },
  ]);

  // Temporizadores
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Simulación de acumulación pasiva basada en multiplicadores (1.0x y 1.2x)
  useEffect(() => {
    let farmInterval;
    if (farmingLevel > 0) {
      farmInterval = setInterval(() => {
        // Tasa base (Nivel 1 = 1.0x -> 0.00002) y (Nivel 2 = 1.2x -> 0.000024)
        const baseRate = 0.00002;
        const multiplier = farmingLevel === 1 ? 1.0 : 1.2;
        const currentRate = baseRate * multiplier;
        
        setFarmedEarnings(prev => prev + currentRate);
      }, 1000);
    }
    return () => clearInterval(farmInterval);
  }, [farmingLevel]);

  // Temporizador de Video Ad
  useEffect(() => {
    let adInterval;
    if (isAdPlaying && adTimer > 0) {
      adInterval = setInterval(() => {
        setAdTimer(prev => prev - 1);
      }, 1000);
    } else if (adTimer === 0 && isAdPlaying) {
      setIsAdPlaying(false);
      if (activeAdType === 'faucet') executeFinalClaim('bonus');
      else if (activeAdType === 'bonus') executeBonusClaim();
      else if (activeAdType === 'ptc') executePtcClaim();
      else if (activeAdType === 'shortlink') executeShortlinkClaim();
    }
    return () => clearInterval(adInterval);
  }, [isAdPlaying, adTimer, activeAdType]);

  // Faucet Handlers
  const handleClaimClick = () => {
    if (timeLeft > 0 || isClaiming) return;
    setCaptchaVerified(false);
    setShowCaptchaModal(true);
  };

  const handleCaptchaPassed = () => {
    setShowCaptchaModal(false);
    setActiveAdType('faucet');
    setShowAdModal(true);
  };

  const handleNormalClaim = () => {
    setShowAdModal(false);
    executeFinalClaim('base');
  };

  const startVideoAd = () => {
    setAdTimer(15);
    setShowAdModal(false);
    setIsAdPlaying(true);
  };

  const executeFinalClaim = (type) => {
    setIsClaiming(true);
    const earnedAmount = type === 'bonus' ? selectedNetwork.bonusReward : selectedNetwork.baseReward;
    const typeLabel = type === 'bonus' ? 'Faucet (Video Ad +30%)' : 'Faucet Base';

    if (type === 'bonus') setDailyVideoClaims(prev => prev + 1);
    setDailyTotalClaims(prev => prev + 1);

    setTimeout(() => {
      setIsClaiming(false);
      setTimeLeft(selectedNetwork.waitTime);
      setBalanceUSDT(prev => prev + earnedAmount);
      setClaims(prev => [
        { id: Date.now(), asset: `USDT (${selectedNetwork.name.split(' ')[0]})`, amount: `${earnedAmount.toFixed(5)} USDT`, type: typeLabel, status: 'Completado', time: 'Ahora mismo' },
        ...prev
      ]);
    }, 1000);
  };

  const handleBonusClick = () => {
    if (dailyBonusClaimed) return;
    setActiveAdType('bonus');
    setAdTimer(15);
    setIsAdPlaying(true);
  };

  const executeBonusClaim = () => {
    setDailyBonusClaimed(true);
    const bonusAmount = 0.00500;
    setBalanceUSDT(prev => prev + bonusAmount);
    setClaims(prev => [
      { id: Date.now(), asset: 'USDT (Global)', amount: `${bonusAmount.toFixed(5)} USDT`, type: 'Bono Diario (Video Ad)', status: 'Completado', time: 'Ahora mismo' },
      ...prev
    ]);
  };

  const triggerPtcView = () => {
    setActiveAdType('ptc');
    setAdTimer(10);
    setIsAdPlaying(true);
  };

  const executePtcClaim = () => {
    setPtcDone(prev => prev + 1);
    setBalanceUSDT(prev => prev + 0.0005);
  };

  const triggerShortlinkView = () => {
    setActiveAdType('shortlink');
    setAdTimer(10);
    setIsAdPlaying(true);
  };

  const executeShortlinkClaim = () => {
    setShortlinksDone(prev => prev + 1);
    setBalanceUSDT(prev => prev + 0.001);
  };

  const toggleFarmingLevel = (level) => {
    setFarmingLevel(farmingLevel === level ? 0 : level);
  };

  const handleClaimFarm = () => {
    if (farmedEarnings <= 0) return;
    const collected = farmedEarnings;
    setBalanceUSDT(prev => prev + collected);
    setFarmedEarnings(0);
    setClaims(prev => [
      { id: Date.now(), asset: 'USDT (Farming Bot)', amount: `${collected.toFixed(5)} USDT`, type: 'Cosecha de Farming', status: 'Completado', time: 'Ahora mismo' },
      ...prev
    ]);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Estilos CSS para animaciones */}
      <style>{`
        @keyframes neonScan {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        .neon-line-anim {
          animation: neonScan 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        .pulse-core {
          animation: pulseGlow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Barra Superior */}
      <header className={`border-b px-6 py-4 flex justify-between items-center ${darkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white/50'} backdrop-blur-md sticky top-0 z-50`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-emerald-500/20">
            L
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">LabCoin Faucet</h1>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Plataforma Exclusiva USDT</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${darkMode ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
            <ShieldCheck size={14} /> Redes: Solana & BEP-20
          </div>
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-xl transition-all ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-amber-400' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* Navegación por Pestañas */}
      <nav className={`border-b px-6 flex gap-2 overflow-x-auto ${darkMode ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-white/30'}`}>
        {[
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'faucet', label: 'Faucet USDT', icon: Coins },
          { id: 'farming', label: 'Farming Bot', icon: Cpu },
          { id: 'shortlinks', label: 'Shortlinks', icon: ExternalLink },
          { id: 'ptc', label: 'Anuncios PTC', icon: MousePointerClick },
          { id: 'tasks', label: 'Tareas', icon: ListTodo },
          { id: 'bonus', label: 'Bono Diario', icon: Gift },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-3 px-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                isActive 
                  ? 'border-cyan-500 text-cyan-400' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon size={16} /> {tab.label} {tab.id === 'farming' && farmingLevel > 0 && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>}
            </button>
          );
        })}
      </nav>

      {/* Contenido Principal */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* VISTA 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Balance Disponible</p>
                <h2 className="text-3xl font-extrabold mt-2 tracking-tight text-emerald-400">{balanceUSDT.toFixed(5)} <span className="text-sm font-normal text-slate-400">USDT</span></h2>
                <div className="mt-4 flex items-center gap-2 text-xs text-emerald-500 font-semibold">
                  <ArrowUpRight size={14} /> Listo para retiro inmediato
                </div>
              </div>

              {/* Estado de Farming en Dashboard */}
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Estado Bot de Farming</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className={`w-3 h-3 rounded-full ${farmingLevel > 0 ? 'bg-cyan-400 animate-pulse' : 'bg-amber-500'}`}></span>
                  <span className="font-bold text-sm">{farmingLevel > 0 ? `Activo (Nivel ${farmingLevel} - ${farmingLevel === 1 ? '1.0x' : '1.2x'})` : 'Inactivo'}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Cosecha acumulada:</span>
                  <strong className="text-cyan-400">{farmedEarnings.toFixed(5)} USDT</strong>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Bono Diario</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className={`w-3 h-3 rounded-full ${dailyBonusClaimed ? 'bg-slate-500' : 'bg-amber-500 animate-pulse'}`}></span>
                  <span className="font-bold text-sm">{dailyBonusClaimed ? 'Reclamado hoy' : 'Disponible'}</span>
                </div>
                <p className={`mt-3 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Renovación diaria</p>
              </div>
            </div>

            {/* Billetera USDT */}
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Wallet className="text-cyan-400" size={20} /> Billetera de Tether (USDT)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border flex items-center justify-between ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">Red Solana (SPL)</span>
                    <p className="text-xl font-bold mt-2 text-emerald-400">{balanceUSDT.toFixed(5)} USDT</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all">
                    Retirar
                  </button>
                </div>
                <div className={`p-4 rounded-xl border flex items-center justify-between ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">Red BNB (BEP-20)</span>
                    <p className="text-xl font-bold mt-2 text-emerald-400">{balanceUSDT.toFixed(5)} USDT</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all">
                    Retirar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VISTA 2: FAUCET */}
        {activeTab === 'faucet' && (
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Coins className="text-cyan-400" size={20} /> Reclamo Faucet de USDT
            </h3>
            <p className={`text-xs mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Gana <strong className="text-emerald-400">0.00050 USDT</strong> base o mira un video de 15s para obtener un <strong className="text-amber-400">+30% extra</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {networks.map((net) => (
                <button
                  key={net.id}
                  onClick={() => setSelectedNetwork(net)}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    selectedNetwork.id === net.id 
                      ? (darkMode ? 'border-cyan-500 bg-cyan-500/10' : 'border-cyan-600 bg-cyan-50') 
                      : (darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-slate-50')
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-2xl">{net.icon}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">Comisión: {net.fee}</span>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-bold text-sm">{net.name}</h4>
                    <p className="text-sm font-bold mt-1 text-emerald-400">Normal: {net.baseReward.toFixed(5)} USDT</p>
                    <p className="text-xs font-semibold text-amber-400 mt-0.5">Con Video (15s): {net.bonusReward.toFixed(5)} USDT (+30%)</p>
                  </div>
                </button>
              ))}
            </div>

            <div className={`p-6 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
              <div>
                <h4 className="font-bold text-base">Reclamar en {selectedNetwork.name}</h4>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Reclamos hoy: <strong className="text-cyan-400">{dailyTotalClaims}/50</strong>
                </p>
              </div>

              <button
                disabled={timeLeft > 0 || isClaiming || dailyTotalClaims >= 50}
                onClick={handleClaimClick}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                  timeLeft > 0 || isClaiming || dailyTotalClaims >= 50
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-70'
                    : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950'
                }`}
              >
                {isClaiming ? <><RefreshCw className="animate-spin" size={16} /> Procesando...</> : 
                 dailyTotalClaims >= 50 ? 'Límite diario alcanzado (50/50)' :
                 timeLeft > 0 ? <><Clock size={16} /> Espera {timeLeft}s</> : 
                 <><CheckCircle2 size={16} /> Claim Faucet</>}
              </button>
            </div>
          </div>
        )}

        {/* VISTA 3: PESTAÑA DE FARMING (NIVEL 1 = 1.0x | NIVEL 2 = 1.2x) */}
        {activeTab === 'farming' && (
          <div className={`p-8 rounded-2xl border space-y-8 relative overflow-hidden ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            
            {/* LÍNEA NEÓN ANIMADA TIPO REANIMADOR */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800 overflow-hidden">
              <div className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent neon-line-anim shadow-[0_0_15px_#22d3ee]"></div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b pb-6 border-slate-800">
              <div className="flex items-center gap-4 text-left">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 relative">
                  <div className="absolute inset-0 rounded-2xl bg-cyan-400/20 animate-ping"></div>
                  <Cpu className="text-slate-950 z-10" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold flex items-center gap-2">
                    LabCoin Auto-Farming Bot 
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Modo Test Libre</span>
                  </h3>
                  <p className={`text-xs mt-0.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Estado: <strong className="text-cyan-400">{farmingLevel === 0 ? 'Inactivo' : `Nivel ${farmingLevel} (${farmingLevel === 1 ? '1.0x' : '1.2x'}) Operativo`}</strong>
                  </p>
                </div>
              </div>

              {/* Botón de Recoger Cosecha */}
              <div className={`p-4 rounded-xl border flex items-center gap-4 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Cosecha Disponible:</p>
                  <p className="text-lg font-extrabold text-cyan-400">{farmedEarnings.toFixed(5)} USDT</p>
                </div>
                <button
                  disabled={farmedEarnings <= 0}
                  onClick={handleClaimFarm}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shadow-lg ${
                    farmedEarnings <= 0 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 text-slate-950 active:scale-95 cursor-pointer shadow-cyan-500/20'
                  }`}
                >
                  <Download size={14} /> Recoger
                </button>
              </div>
            </div>

            {/* CAJA INTERACTIVA ANIMADA DE MINERÍA */}
            <div className={`p-6 rounded-2xl border relative overflow-hidden text-center transition-all ${
              farmingLevel > 0 
                ? (darkMode ? 'bg-slate-950/90 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)]' : 'bg-cyan-50/50 border-cyan-400 shadow-md')
                : (darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200')
            }`}>
              
              {farmingLevel > 0 && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-emerald-500/5 to-cyan-500/5 animate-pulse pointer-events-none"></div>
              )}

              <div className="relative z-10 flex flex-col items-center space-y-4">
                
                <div className="relative flex items-center justify-center">
                  <div className={`absolute w-28 h-28 rounded-full border border-cyan-500/30 ${farmingLevel > 0 ? 'animate-ping' : ''}`}></div>
                  <div className={`absolute w-36 h-36 rounded-full border border-emerald-500/20 ${farmingLevel > 0 ? 'animate-pulse' : ''}`}></div>
                  
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-tr from-cyan-500 to-emerald-500 shadow-xl shadow-cyan-500/30 ${farmingLevel > 0 ? 'pulse-core' : 'opacity-50'}`}>
                    <Sparkles className="text-slate-950 animate-spin" style={{ animationDuration: '6s' }} size={36} />
                  </div>
                </div>

                <div>
                  <h4 className="font-extrabold text-lg flex items-center justify-center gap-2">
                    {farmingLevel > 0 ? (
                      <>
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                        Minando USDT (Multiplicador {farmingLevel === 1 ? '1.0x' : '1.2x'})...
                      </>
                    ) : (
                      <span className="text-slate-500">Bot de Minería en Pausa</span>
                    )}
                  </h4>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {farmingLevel > 0 
                      ? `Potencia de extracción actual: ${farmingLevel === 1 ? '1.0x (Estándar)' : '1.2x (+20% Velocidad)'}`
                      : 'Activa un nivel de minería abajo para comenzar la extracción pasiva.'}
                  </p>
                </div>

                <div className={`px-6 py-3 rounded-2xl border font-mono text-2xl font-black tracking-wider ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-cyan-400 shadow-inner' : 'bg-white border-slate-200 text-cyan-600 shadow-sm'
                }`}>
                  +{farmedEarnings.toFixed(6)} <span className="text-xs font-sans font-normal text-slate-400">USDT</span>
                </div>

              </div>
            </div>

            {/* Selector de Niveles (1.0x y 1.2x) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* NIVEL 1 (1.0x) */}
              <div className={`p-6 rounded-2xl border flex flex-col justify-between space-y-4 ${
                farmingLevel === 1 
                  ? (darkMode ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/5' : 'border-cyan-600 bg-cyan-50') 
                  : (darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200')
              }`}>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">FARMING NIVEL 1</span>
                    <span className="text-xs text-cyan-400 font-mono font-bold">Poder: 1.0x</span>
                  </div>
                  <h4 className="font-bold text-base">Tasa Base Estándar</h4>
                  <p className={`text-xs mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Velocidad inicial de minería pasiva para acumulación constante.
                  </p>
                </div>

                <button
                  onClick={() => toggleFarmingLevel(1)}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-md ${
                    farmingLevel === 1 
                      ? 'bg-cyan-500 text-slate-950 shadow-cyan-500/20' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  {farmingLevel === 1 ? '⚡ Nivel 1 (1.0x) Activo' : 'Activar Nivel 1 (1.0x)'}
                </button>
              </div>

              {/* NIVEL 2 (1.2x) */}
              <div className={`p-6 rounded-2xl border flex flex-col justify-between space-y-4 ${
                farmingLevel === 2 
                  ? (darkMode ? 'border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/5' : 'border-cyan-600 bg-cyan-50') 
                  : (darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200')
              }`}>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 flex items-center gap-1">
                      <Activity size={14} /> NIVEL 2 (ÉLITE)
                    </span>
                    <span className="text-xs text-cyan-300 font-mono font-bold">Poder: 1.2x (+20%)</span>
                  </div>
                  <h4 className="font-bold text-base">Núcleo de Minería Acelerado</h4>
                  <p className={`text-xs mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Incrementa la velocidad de recolección pasiva un 20% adicional.
                  </p>
                </div>

                <button
                  onClick={() => toggleFarmingLevel(2)}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-md ${
                    farmingLevel === 2 
                      ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-cyan-400/20' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  {farmingLevel === 2 ? '⚡ Nivel 2 (1.2x) Activo' : 'Activar Nivel 2 (1.2x)'}
                </button>
              </div>

            </div>
          </div>
        )}

        {/* VISTA 4: SHORTLINKS */}
        {activeTab === 'shortlinks' && (
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2"><ExternalLink className="text-cyan-400" size={20} /> Enlaces Cortos (Shortlinks)</span>
              <span className="text-xs font-normal text-cyan-400">Progreso hoy: {shortlinksDone}/10</span>
            </h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`p-4 rounded-xl border flex items-center justify-between ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div>
                    <h4 className="font-bold text-sm">Shortlink Wall #{i}</h4>
                    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Recompensa: 0.001 USDT</p>
                  </div>
                  <button onClick={triggerShortlinkView} className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all">
                    Visitar Enlace
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VISTA 5: PTC */}
        {activeTab === 'ptc' && (
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2"><MousePointerClick className="text-cyan-400" size={20} /> Anuncios Patrocinados (PTC)</span>
              <span className="text-xs font-normal text-purple-400">Progreso hoy: {ptcDone}/15</span>
            </h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`p-4 rounded-xl border flex items-center justify-between ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div>
                    <h4 className="font-bold text-sm">Anuncio PTC #{i} (10s)</h4>
                    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Recompensa: 0.0005 USDT</p>
                  </div>
                  <button onClick={triggerPtcView} className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all">
                    Ver Anuncio
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VISTA 6: TAREAS */}
        {activeTab === 'tasks' && (
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <ListTodo className="text-cyan-400" size={20} /> Muro de Tareas USDT
            </h3>
            <div className={`p-6 rounded-xl border text-center ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Completa ofertas especiales para recibir pagos directos en USDT.</p>
              <button className="mt-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm">
                Ver Tareas
              </button>
            </div>
          </div>
        )}

        {/* VISTA 7: BONO DIARIO */}
        {activeTab === 'bonus' && (
          <div className={`p-6 rounded-2xl border text-center ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <Gift className="mx-auto text-amber-400 mb-2 animate-bounce" size={44} />
            <h3 className="text-xl font-bold">Bono Diario en USDT</h3>
            <p className={`text-xs mt-1 max-w-md mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Mira un breve video de 15 segundos para reclamar tu bono diario de <strong className="text-emerald-400">0.00500 USDT</strong>.
            </p>
            <button 
              disabled={dailyBonusClaimed}
              onClick={handleBonusClick}
              className={`mt-6 px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${
                dailyBonusClaimed 
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-60' 
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-orange-500/20 active:scale-95'
              }`}
            >
              {dailyBonusClaimed ? '✓ Bono Diario Reclamado' : '▶ Ver Video & Reclamar Bono USDT'}
            </button>
          </div>
        )}

        {/* Tabla de Historial */}
        <div className={`p-6 rounded-2xl border overflow-hidden ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <h3 className="text-lg font-bold mb-4">Historial de Transacciones USDT</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className={`border-b ${darkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
                  <th className="py-3 px-4 font-semibold">Activo / Red</th>
                  <th className="py-3 px-4 font-semibold">Tipo</th>
                  <th className="py-3 px-4 font-semibold">Monto</th>
                  <th className="py-3 px-4 font-semibold">Estado</th>
                  <th className="py-3 px-4 font-semibold text-right">Tiempo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {claims.map((item) => (
                  <tr key={item.id} className={`transition-colors ${darkMode ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'}`}>
                    <td className="py-3.5 px-4 font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span> {item.asset}
                    </td>
                    <td className={`py-3.5 px-4 text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{item.type}</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-medium">{item.amount}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${item.status === 'Completado' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className={`py-3.5 px-4 text-right text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* MODAL CAPTCHA */}
      {showCaptchaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <ShieldCheck className="text-emerald-400" size={22} /> Verificación Anti-Bot
            </h3>
            <p className={`text-xs mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Resuelve la verificación para continuar en <strong className="text-cyan-400">{selectedNetwork.name}</strong>.
            </p>
            <div className={`p-4 rounded-xl border mb-6 flex items-center justify-between ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="captcha"
                  checked={captchaVerified}
                  onChange={(e) => setCaptchaVerified(e.target.checked)}
                  className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                />
                <label htmlFor="captcha" className="text-sm font-medium cursor-pointer select-none">No soy un robot</label>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-1 bg-slate-800 text-cyan-400 rounded">reCAPTCHA</span>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowCaptchaModal(false)} className="w-1/2 py-2.5 rounded-xl font-bold text-xs border border-slate-700">Cancelar</button>
              <button disabled={!captchaVerified} onClick={handleCaptchaPassed} className={`w-1/2 py-2.5 rounded-xl font-bold text-xs ${!captchaVerified ? 'bg-slate-700 opacity-50 cursor-not-allowed' : 'bg-emerald-500 text-slate-950'}`}>Continuar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL VIDEO AD */}
      {showAdModal && !isAdPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <PlaySquare className="text-amber-400" size={22} /> ¡Gana un 30% Extra!
              </h3>
              <button onClick={() => setShowAdModal(false)} className="text-slate-400"><X size={20} /></button>
            </div>
            <div className="space-y-3 mb-6">
              <button
                onClick={startVideoAd}
                className="w-full p-4 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:border-amber-500 text-left transition-all flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500 text-slate-950">¡Recomendado! +30%</span>
                  <h4 className="font-bold text-sm mt-2 text-amber-400">Ver Video Ad (15s)</h4>
                  <p className="text-xs text-slate-400">Recibirás: <strong>{selectedNetwork.bonusReward.toFixed(5)} USDT</strong></p>
                </div>
                <PlaySquare className="text-amber-400" size={28} />
              </button>
              <button
                onClick={handleNormalClaim}
                className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-left transition-all"
              >
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">Estándar</span>
                <h4 className="font-bold text-sm mt-2">Reclamar sin Ver Video</h4>
                <p className="text-xs text-slate-400">Recibirás: {selectedNetwork.baseReward.toFixed(5)} USDT</p>
              </button>
            </div>
            <button onClick={() => setShowAdModal(false)} className="w-full py-2.5 rounded-xl font-bold text-xs border border-slate-700">Cancelar</button>
          </div>
        </div>
      )}

      {/* REPRODUCTOR DE VIDEO AD */}
      {isAdPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="w-full max-w-lg p-8 rounded-2xl border border-slate-800 bg-slate-950 text-center space-y-6 shadow-2xl">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Reproduciendo Anuncio Patrocinado ({activeAdType.toUpperCase()})
              </span>
              <span className="text-sm font-bold text-slate-400">Cierre en <strong className="text-cyan-400">{adTimer}s</strong></span>
            </div>
            <div className="w-full h-48 rounded-xl bg-gradient-to-br from-slate-900 to-slate-900 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
              <PlaySquare className="text-cyan-400 mb-2 animate-bounce" size={48} />
              <h4 className="font-bold text-base text-slate-200">LabCoin Patrocinios</h4>
              <p className="text-xs text-slate-400 mt-1">Completa el tiempo para sumar tu progreso y recompensa</p>
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-1000" style={{ width: `${(adTimer / 15) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
