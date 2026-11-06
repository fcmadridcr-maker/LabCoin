import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Wallet, Clock, CheckCircle2, 
  ArrowUpRight, ShieldCheck, RefreshCw, Coins, 
  ExternalLink, MousePointerClick, ListTodo, Gift, LayoutDashboard
} from 'lucide-react';

export default function FaucetDashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, faucet, shortlinks, ptc, tasks, bonus
  
  // Balance general del usuario
  const [balances, setBalances] = useState({
    USD: 245.80,
    SUI: 12.4500,
    SOL: 0.8540,
    BTC: 0.00045,
    PEPE: 1450000
  });

  // Criptomonedas para la sección de Faucet
  const coins = [
    { id: 'sui', name: 'SUI', symbol: 'SUI', reward: '0.05 SUI', waitTime: 30, icon: '💧' },
    { id: 'sol', name: 'Solana', symbol: 'SOL', reward: '0.001 SOL', waitTime: 60, icon: '🟣' },
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', reward: '15 Satoshis', waitTime: 120, icon: '₿' },
    { id: 'pepe', name: 'PEPE', symbol: 'PEPE', reward: '50,000 PEPE', waitTime: 15, icon: '🐸' }
  ];

  const [selectedCoin, setSelectedCoin] = useState(coins[0]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isClaiming, setIsClaiming] = useState(false);
  
  // Historial de reclamos
  const [claims, setClaims] = useState([
    { id: 1, coin: 'SUI', amount: '0.05 SUI', type: 'Faucet', status: 'Completado', time: 'Hace 5 min' },
    { id: 2, coin: 'SOL', amount: '0.001 SOL', type: 'Shortlink', status: 'Completado', time: 'Hace 24 min' },
    { id: 3, coin: 'PEPE', amount: '50,000 PEPE', type: 'PTC Ad', status: 'Pendiente', time: 'Hace 1 min' },
  ]);

  // Temporizador de Faucet
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleClaim = () => {
    setIsClaiming(true);
    setTimeout(() => {
      setIsClaiming(false);
      setTimeLeft(selectedCoin.waitTime);
      
      setClaims(prev => [
        { id: Date.now(), coin: selectedCoin.symbol, amount: selectedCoin.reward, type: 'Faucet', status: 'Completado', time: 'Ahora mismo' },
        ...prev
      ]);
    }, 1500);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* 1. Barra Superior */}
      <header className={`border-b px-6 py-4 flex justify-between items-center ${darkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white/50'} backdrop-blur-md sticky top-0 z-50`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-emerald-500/20">
            L
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">LabCoin Faucet & Crypto</h1>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Plataforma Multi-Ganancias</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${darkMode ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
            <ShieldCheck size={14} /> 0x3F...89a
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
          { id: 'faucet', label: 'Faucet', icon: Coins },
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

        {/* VISTA 1: DASHBOARD & BILLETERA */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Balance Total USD</p>
                <h2 className="text-3xl font-extrabold mt-2 tracking-tight">${balances.USD.toFixed(2)}</h2>
                <div className="mt-4 flex items-center gap-2 text-xs text-emerald-500 font-semibold">
                  <ArrowUpRight size={14} /> +12.4% este mes
                </div>
              </div>
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Reclamos Totales</p>
                <h2 className="text-3xl font-extrabold mt-2 tracking-tight">148</h2>
                <p className={`mt-4 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Nivel de cuenta: Experto</p>
              </div>
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Microbilletera Vinculada</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-bold text-sm">FaucetPay / Direct</span>
                </div>
                <p className={`mt-3 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Retiros instantáneos activos</p>
              </div>
            </div>

            {/* Resumen de Criptomonedas (Billetera) */}
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Wallet className="text-cyan-400" size={20} /> Tus Fondos en Billetera
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.entries(balances).filter(([k]) => k !== 'USD').map(([coin, amount]) => (
                  <div key={coin} className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">{coin}</span>
                    <p className="text-lg font-bold mt-3 text-emerald-400">{amount.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VISTA 2: FAUCET */}
        {activeTab === 'faucet' && (
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Coins className="text-cyan-400" size={20} /> Reclamo Directo de Faucet
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {coins.map((coin) => (
                <button
                  key={coin.id}
                  onClick={() => setSelectedCoin(coin)}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    selectedCoin.id === coin.id 
                      ? (darkMode ? 'border-cyan-500 bg-cyan-500/10' : 'border-cyan-600 bg-cyan-50') 
                      : (darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-slate-50')
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-2xl">{coin.icon}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">{coin.symbol}</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-bold text-emerald-400">{coin.reward}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className={`p-6 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
              <div>
                <h4 className="font-bold text-base">Reclamar recompensa de {selectedCoin.name}</h4>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Gana <strong className="text-emerald-400">{selectedCoin.reward}</strong> al instante.
                </p>
              </div>

              <button
                disabled={timeLeft > 0 || isClaiming}
                onClick={handleClaim}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                  timeLeft > 0 || isClaiming
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-70'
                    : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950'
                }`}
              >
                {isClaiming ? <><RefreshCw className="animate-spin" size={16} /> Procesando...</> : 
                 timeLeft > 0 ? <><Clock size={16} /> Espera {timeLeft}s</> : 
                 <><CheckCircle2 size={16} /> Claim Reward ({selectedCoin.symbol})</>}
              </button>
            </div>
          </div>
        )}

        {/* VISTA 3: SHORTLINKS */}
        {activeTab === 'shortlinks' && (
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <ExternalLink className="text-cyan-400" size={20} /> Enlaces Cortos Disponibles (Shortlinks)
            </h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`p-4 rounded-xl border flex items-center justify-between ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div>
                    <h4 className="font-bold text-sm">Shortlink Wall #{i} (Visitas rápidas)</h4>
                    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Recompensa: 0.002 SUI + 10 Energía</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all">
                    Visitar Enlace
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VISTA 4: PTC (ANUNCIOS) */}
        {activeTab === 'ptc' && (
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MousePointerClick className="text-cyan-400" size={20} /> Anuncios Patrocinados (PTC)
            </h3>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className={`p-4 rounded-xl border flex items-center justify-between ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div>
                    <h4 className="font-bold text-sm">Ver sitio web patrocinado ({i * 10} segundos)</h4>
                    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Recompensa: 15,000 PEPE</p>
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
              <ListTodo className="text-cyan-400" size={20} /> Muro de Tareas (Tasks)
            </h3>
            <div className={`p-6 rounded-xl border text-center ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Completa tareas en redes sociales o reseñas para reclamar grandes recompensas en criptomonedas.</p>
              <button className="mt-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm">
                Ver Tareas Activas
              </button>
            </div>
          </div>
        )}

        {/* VISTA 6: BONO DIARIO */}
        {activeTab === 'bonus' && (
          <div className={`p-6 rounded-2xl border text-center ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <Gift className="mx-auto text-cyan-400 mb-2" size={40} />
            <h3 className="text-xl font-bold">Recompensa por Bono Diario</h3>
            <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Vuelve cada 24 horas para reclamar tu bonificación acumulativa.</p>
            <button className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-lg shadow-orange-500/20">
              ¡Reclamar Bono Diario!
            </button>
          </div>
        )}

        {/* Tabla de Reclamos Recientes (Visible en todas las vistas principales) */}
        <div className={`p-6 rounded-2xl border overflow-hidden ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <h3 className="text-lg font-bold mb-4">Historial de Actividad Reciente</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className={`border-b ${darkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
                  <th className="py-3 px-4 font-semibold">Criptomoneda</th>
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
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span> {item.coin}
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
    </div>
  );
}
