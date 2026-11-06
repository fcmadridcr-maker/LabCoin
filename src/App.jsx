import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Wallet, Clock, CheckCircle2, AlertCircle, 
  ArrowUpRight, ShieldCheck, RefreshCw, Coins 
} from 'lucide-react';

export default function FaucetDashboard() {
  // Estado para el tema (oscuro / claro)
  const [darkMode, setDarkMode] = useState(true);

  // Criptomonedas disponibles con datos de prueba (Mock Data)
  const coins = [
    { id: 'sui', name: 'SUI', symbol: 'SUI', balance: '12.4500', reward: '0.05 SUI', waitTime: 30, icon: '💧' },
    { id: 'sol', name: 'Solana', symbol: 'SOL', balance: '0.8540', reward: '0.001 SOL', waitTime: 60, icon: '🟣' },
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', balance: '0.00045', reward: '15 Satoshis', waitTime: 120, icon: '₿' },
    { id: 'pepe', name: 'PEPE', symbol: 'PEPE', balance: '1,450,000', reward: '50,000 PEPE', waitTime: 15, icon: '🐸' }
  ];

  const [selectedCoin, setSelectedCoin] = useState(coins[0]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isClaiming, setIsClaiming] = useState(false);
  
  // Historial de reclamos recientes
  const [claims, setClaims] = useState([
    { id: 1, coin: 'SUI', amount: '0.05 SUI', status: 'Completado', time: 'Hace 5 min' },
    { id: 2, coin: 'SOL', amount: '0.001 SOL', status: 'Completado', time: 'Hace 24 min' },
    { id: 3, coin: 'PEPE', amount: '50,000 PEPE', status: 'Pendiente', time: 'Hace 1 min' },
  ]);

  // Manejo del temporizador de reclamo
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
      
      // Agregar a la tabla de reclamos
      setClaims(prev => [
        { id: Date.now(), coin: selectedCoin.symbol, amount: selectedCoin.reward, status: 'Pendiente', time: 'Ahora mismo' },
        ...prev
      ]);
    }, 1500);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* 1. Barra Superior con Selector de Tema */}
      <header className={`border-b px-6 py-4 flex justify-between items-center ${darkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white/50'} backdrop-blur-md sticky top-0 z-50`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-emerald-500/20">
            L
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">LabCoin Faucet</h1>
            <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Plataforma de Recompensas Web3</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${darkMode ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
            <ShieldCheck size={14} /> Billetera Conectada (Demo)
          </div>
          
          {/* Botón de Cambio de Tema */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-xl transition-all ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-amber-400' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}
            title="Cambiar tema"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* Contenido Principal del Dashboard */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* 2. Tarjetas de Balance y Estadísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Balance Total */}
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Balance Total Estimado</p>
            <h2 className="text-3xl font-extrabold mt-2 tracking-tight">$245.80 <span className="text-xs font-normal text-emerald-500">USD</span></h2>
            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-500 font-semibold">
              <ArrowUpRight size={14} /> +14.2% esta semana
            </div>
          </div>

          {/* Reclamos Realizados */}
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Faucets Reclamadas</p>
            <h2 className="text-3xl font-extrabold mt-2 tracking-tight">42</h2>
            <p className={`mt-4 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Siguiente nivel en 8 reclamos</p>
          </div>

          {/* Estado de Red */}
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Estado del Sistema</p>
            <div className="flex items-center gap-2 mt-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold text-sm">Operativo / Sin comisiones</span>
            </div>
            <p className={`mt-3 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Pagos instantáneos habilitados</p>
          </div>
        </div>

        {/* 3. Panel de Reclamo Rápido por Criptomoneda */}
        <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Coins className="text-cyan-400" size={20} /> Selecciona criptomoneda para reclamar
          </h3>

          {/* Selector de Monedas (Grid de Tarjetas) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {coins.map((coin) => (
              <button
                key={coin.id}
                onClick={() => setSelectedCoin(coin)}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  selectedCoin.id === coin.id 
                    ? (darkMode ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/10' : 'border-cyan-600 bg-cyan-50 shadow-sm') 
                    : (darkMode ? 'border-slate-800 bg-slate-900 hover:border-slate-700' : 'border-slate-200 bg-slate-50 hover:border-slate-300')
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-2xl">{coin.icon}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800/50 text-slate-300">{coin.symbol}</span>
                </div>
                <div className="mt-4">
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Saldo: {coin.balance}</p>
                  <p className="text-sm font-bold mt-0.5 text-emerald-400">{coin.reward}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Botón de Reclamo Principal */}
          <div className={`p-6 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
            <div>
              <h4 className="font-bold text-base">Reclamar recompensa de {selectedCoin.name}</h4>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Gana <strong className="text-emerald-400">{selectedCoin.reward}</strong> directamente a tu balance instantáneo.
              </p>
            </div>

            <button
              disabled={timeLeft > 0 || isClaiming}
              onClick={handleClaim}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                timeLeft > 0 || isClaiming
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-70'
                  : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-cyan-500/20 active:scale-95'
              }`}
            >
              {isClaiming ? (
                <>
                  <RefreshCw className="animate-spin" size={16} /> Procesando...
                </>
              ) : timeLeft > 0 ? (
                <>
                  <Clock size={16} /> Espera {timeLeft}s
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} /> Claim Reward ({selectedCoin.symbol})
                </>
              )}
            </button>
          </div>
        </div>

        {/* 4. Tabla de Reclamaciones Recientes */}
        <div className={`p-6 rounded-2xl border overflow-hidden ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <h3 className="text-lg font-bold mb-4">Reclamos Recientes</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className={`border-b ${darkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
                  <th className="py-3 px-4 font-semibold">Criptomoneda</th>
                  <th className="py-3 px-4 font-semibold">Monto reclamado</th>
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
