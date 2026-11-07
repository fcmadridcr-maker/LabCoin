import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Wallet, Clock, CheckCircle2, 
  ArrowUpRight, ShieldCheck, RefreshCw, Coins, 
  ExternalLink, MousePointerClick, ListTodo, Gift, LayoutDashboard, PlaySquare, X 
} from 'lucide-react';

export default function FaucetDashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Balance en USDT
  const [balanceUSDT, setBalanceUSDT] = useState(24.5000);

  // Contadores de límites diarios
  const [dailyVideoClaims, setDailyVideoClaims] = useState(3);
  const [dailyTotalClaims, setDailyTotalClaims] = useState(12);

  // Estado del Bono Diario
  const [dailyBonusClaimed, setDailyBonusClaimed] = useState(false);

  // Redes disponibles para USDT
  const networks = [
    { id: 'sol', name: 'Solana (SPL)', fee: 'Ultra bajo', waitTime: 30, baseReward: 0.00050, bonusReward: 0.00065, icon: '🟣' },
    { id: 'bnb', name: 'BNB Smart Chain (BEP-20)', fee: 'Muy bajo', waitTime: 45, baseReward: 0.00050, bonusReward: 0.00065, icon: '🟡' }
  ];

  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isClaiming, setIsClaiming] = useState(false);

  // Estados para el Captcha y Video Ad de Faucet
  const [showCaptchaModal, setShowCaptchaModal] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [adTimer, setAdTimer] = useState(15);
  const [isAdPlaying, setIsAdPlaying] = useState(false);
  const [activeAdType, setActiveAdType] = useState('faucet'); // 'faucet' o 'bonus'

  // Historial de reclamos
  const [claims, setClaims] = useState([
    { id: 1, asset: 'USDT (Solana)', amount: '0.00065 USDT (+30%)', type: 'Faucet (Video Ad)', status: 'Completado', time: 'Hace 5 min' },
    { id: 2, asset: 'USDT (BEP-20)', amount: '0.00050 USDT', type: 'Faucet Base', status: 'Completado', time: 'Hace 24 min' },
  ]);

  // Temporizador de Faucet principal
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Temporizador del Video Ad (15 segundos)
  useEffect(() => {
    let adInterval;
    if (isAdPlaying && adTimer > 0) {
      adInterval = setInterval(() => {
        setAdTimer(prev => prev - 1);
      }, 1000);
    } else if (adTimer === 0 && isAdPlaying) {
      setIsAdPlaying(false);
      if (activeAdType === 'faucet') {
        executeFinalClaim('bonus');
      } else if (activeAdType === 'bonus') {
        executeBonusClaim();
      }
    }
    return () => clearInterval(adInterval);
  }, [isAdPlaying, adTimer, activeAdType]);

  // Faucet: Paso 1
  const handleClaimClick = () => {
    if (timeLeft > 0 || isClaiming) return;
    if (dailyTotalClaims >= 50) {
      alert("Has alcanzado el límite máximo de 50 reclamos totales por hoy.");
      return;
    }
    setCaptchaVerified(false);
    setShowCaptchaModal(true);
  };

  // Faucet: Paso 2
  const handleCaptchaPassed = () => {
    setShowCaptchaModal(false);
    setActiveAdType('faucet');
    setShowAdModal(true);
  };

  // Faucet: Reclamo Normal
  const handleNormalClaim = () => {
    setShowAdModal(false);
    executeFinalClaim('base');
  };

  // Faucet: Iniciar Video Ad
  const startVideoAd = () => {
    if (dailyVideoClaims >= 10) {
      alert("Has alcanzado el límite diario de 10 videos con bonificación.");
      return;
    }
    setAdTimer(15);
    setShowAdModal(false);
    setIsAdPlaying(true);
  };

  // Ejecución final del reclamo de Faucet
  const executeFinalClaim = (type) => {
    setIsClaiming(true);

    const earnedAmount = type === 'bonus' ? selectedNetwork.bonusReward : selectedNetwork.baseReward;
    const typeLabel = type === 'bonus' ? 'Faucet (Video Ad +30%)' : 'Faucet Base';

    if (type === 'bonus') {
      setDailyVideoClaims(prev => prev + 1);
    }
    setDailyTotalClaims(prev => prev + 1);

    setTimeout(() => {
      setIsClaiming(false);
      setTimeLeft(selectedNetwork.waitTime);
      setBalanceUSDT(prev => prev + earnedAmount);
      
      setClaims(prev => [
        { 
          id: Date.now(), 
          asset: `USDT (${selectedNetwork.name.split(' ')[0]})`, 
          amount: `${earnedAmount.toFixed(5)} USDT`, 
          type: typeLabel, 
          status: 'Completado', 
          time: 'Ahora mismo' 
        },
        ...prev
      ]);
    }, 1000);
  };

  // Bono Diario: Al hacer clic en reclamar bono
  const handleBonusClick = () => {
    if (dailyBonusClaimed) return;
    setActiveAdType('bonus');
    setAdTimer(15);
    setIsAdPlaying(true);
  };

  // Ejecución final del Bono Diario tras ver el video
  const executeBonusClaim = () => {
    setDailyBonusClaimed(true);
    const bonusAmount = 0.00500; // Ejemplo de bono diario en USDT

    setBalanceUSDT(prev => prev + bonusAmount);
    setClaims(prev => [
      { 
        id: Date.now(), 
        asset: 'USDT (Global)', 
        amount: `${bonusAmount.toFixed(5)} USDT`, 
        type: 'Bono Diario (Video Ad)', 
        status: 'Completado', 
        time: 'Ahora mismo' 
      },
      ...prev
    ]);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
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
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Contenido Principal */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* VISTA 1: DASHBOARD & BILLETERA USDT */}
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

              {/* Tarjeta de Límites Diarios */}
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Límites Diarios de Faucet</p>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Reclamos Totales:</span>
                    <span className="font-bold">{dailyTotalClaims} / 50</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full" style={{ width: `${(dailyTotalClaims / 50) * 100}%` }}></div>
                  </div>

                  <div className="flex justify-between text-xs pt-1">
                    <span className="text-slate-400">Videos con +30%:</span>
                    <span className="font-bold text-amber-400">{dailyVideoClaims} / 10</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full" style={{ width: `${(dailyVideoClaims / 10) * 100}%` }}></div>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Bono Diario</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className={`w-3 h-3 rounded-full ${dailyBonusClaimed ? 'bg-slate-500' : 'bg-amber-500 animate-pulse'}`}></span>
                  <span className="font-bold text-sm">{dailyBonusClaimed ? 'Reclamado hoy' : 'Disponible para ver video'}</span>
                </div>
                <p className={`mt-3 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Renovación cada 24 horas</p>
              </div>
            </div>

            {/* Resumen de Billetera USDT */}
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
              Gana <strong className="text-emerald-400">0.00050 USDT</strong> base o mira un video de 15s para obtener un <strong className="text-amber-400">+30% extra (0.00065 USDT)</strong>. (Disponibles hoy: {10 - dailyVideoClaims} videos restantes).
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

        {/* VISTA 3: SHORTLINKS */}
        {activeTab === 'shortlinks' && (
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <ExternalLink className="text-cyan-400" size={20} /> Enlaces Cortos (Gana USDT Extra)
            </h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`p-4 rounded-xl border flex items-center justify-between ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div>
                    <h4 className="font-bold text-sm">Shortlink Wall #{i}</h4>
                    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Recompensa: 0.001 USDT</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all">
                    Visitar Enlace
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VISTA 4: PTC */}
        {activeTab === 'ptc' && (
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MousePointerClick className="text-cyan-400" size={20} /> Anuncios Patrocinados USDT (PTC)
            </h3>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className={`p-4 rounded-xl border flex items-center justify-between ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div>
                    <h4 className="font-bold text-sm">Ver anuncio publicitario ({i * 15}s)</h4>
                    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Recompensa: 0.0005 USDT</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all">
                    Ver Anuncio
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VISTA 5: TAREAS */}
        {activeTab === 'tasks' && (
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <ListTodo className="text-cyan-400" size={20} /> Muro de Tareas USDT
            </h3>
            <div className={`p-6 rounded-xl border text-center ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Completa ofertas y tareas especiales para recibir pagos directos en USDT.</p>
              <button className="mt-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm">
                Ver Tareas
              </button>
            </div>
          </div>
        )}

        {/* VISTA 6: BONO DIARIO CON VIDEO AD DE 15s */}
        {activeTab === 'bonus' && (
          <div className={`p-6 rounded-2xl border text-center ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <Gift className="mx-auto text-amber-400 mb-2 animate-bounce" size={44} />
            <h3 className="text-xl font-bold">Bono Diario en USDT</h3>
            <p className={`text-xs mt-1 max-w-md mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Mira un breve video patrocinado de 15 segundos para reclamar tu bonificación diaria acumulativa de <strong className="text-emerald-400">0.00500 USDT</strong>.
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
              {dailyBonusClaimed ? '✓ Bono Diario Reclamado (Vuelve mañana)' : '▶ Ver Video & Reclamar Bono USDT'}
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
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'Completado' 
                          ? (darkMode ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-100 text-emerald-700')
                          : (darkMode ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-amber-100 text-amber-700')
                      }`}>
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

      {/* MODAL 1: CAPTCHA */}
      {showCaptchaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <ShieldCheck className="text-emerald-400" size={22} /> Verificación Anti-Bot
            </h3>
            <p className={`text-xs mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Resuelve la verificación para continuar con tu reclamo en <strong className="text-cyan-400">{selectedNetwork.name}</strong>.
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
                <label htmlFor="captcha" className="text-sm font-medium cursor-pointer select-none">
                  No soy un robot
                </label>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-1 bg-slate-800 text-cyan-400 rounded">reCAPTCHA</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCaptchaModal(false)}
                className={`w-1/2 py-2.5 rounded-xl font-bold text-xs border transition-all ${darkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-300 hover:bg-slate-100 text-slate-700'}`}
              >
                Cancelar
              </button>
              <button
                disabled={!captchaVerified}
                onClick={handleCaptchaPassed}
                className={`w-1/2 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg ${
                  !captchaVerified 
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-50' 
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                }`}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: OPCIÓN DE VIDEO AD DE 15s (+30%) O RECLAMO NORMAL */}
      {showAdModal && !isAdPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <PlaySquare className="text-amber-400" size={22} /> ¡Gana un 30% Extra!
              </h3>
              <button onClick={() => setShowAdModal(false)} className="text-slate-400 hover:text-slate-200">
                <X size={20} />
              </button>
            </div>
            
            <p className={`text-xs mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Videos bonificados disponibles hoy: <strong className="text-amber-400">{10 - dailyVideoClaims} / 10</strong>
            </p>

            <div className="space-y-3 mb-6">
              <button
                disabled={dailyVideoClaims >= 10}
                onClick={startVideoAd}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between group ${
                  dailyVideoClaims >= 10 
                    ? 'opacity-50 cursor-not-allowed border-slate-800 bg-slate-950' 
                    : 'border-amber-500/40 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:border-amber-500'
                }`}
              >
                <div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                    {dailyVideoClaims >= 10 ? 'Límite diario alcanzado' : '¡Recomendado! +30%'}
                  </span>
                  <h4 className="font-bold text-sm mt-2 text-amber-400">Ver Video Ad (15s)</h4>
                  <p className="text-xs text-slate-400">Recibirás: <strong>{selectedNetwork.bonusReward.toFixed(5)} USDT</strong></p>
                </div>
                <PlaySquare className="text-amber-400 group-hover:scale-110 transition-transform" size={28} />
              </button>

              <button
                onClick={handleNormalClaim}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${darkMode ? 'border-slate-800 bg-slate-950 hover:bg-slate-800/50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}
              >
                <div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'}`}>Estándar</span>
                  <h4 className="font-bold text-sm mt-2">Reclamar sin Ver Video</h4>
                  <p className="text-xs text-slate-400">Recibirás: {selectedNetwork.baseReward.toFixed(5)} USDT</p>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowAdModal(false)}
              className={`w-full py-2.5 rounded-xl font-bold text-xs border transition-all ${darkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-300 hover:bg-slate-100 text-slate-700'}`}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: REPRODUCTOR SIMULADO DE VIDEO AD (15 SEGUNDOS - FAUCET O BONO) */}
      {isAdPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="w-full max-w-lg p-8 rounded-2xl border border-slate-800 bg-slate-950 text-center space-y-6 shadow-2xl">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Reproduciendo Video Patrocinado ({activeAdType === 'bonus' ? 'Bono Diario' : 'Faucet'}) - 15s...
              </span>
              <span className="text-sm font-bold text-slate-400">
                Cierre en <strong className="text-cyan-400">{adTimer}s</strong>
              </span>
            </div>

            <div className="w-full h-48 rounded-xl bg-gradient-to-br from-slate-900 to-slate-900 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-cyan-500/5 animate-pulse"></div>
              <PlaySquare className="text-cyan-400 mb-2 animate-bounce" size={48} />
              <h4 className="font-bold text-base text-slate-200">Patrocinador LabCoin Ads</h4>
              <p className="text-xs text-slate-400 mt-1">
                {activeAdType === 'bonus' ? 'Mira el video para acreditar tu Bono Diario en USDT' : 'Disfruta el video para acreditar tu +30% extra en USDT'}
              </p>
              
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-1000"
                  style={{ width: `${(adTimer / 15) * 100}%` }}
                ></div>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Mantén abierta la ventana para asegurar tu acreditación automática.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
