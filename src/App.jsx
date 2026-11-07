import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Wallet, Clock, CheckCircle2, 
  ArrowUpRight, ShieldCheck, RefreshCw, Coins, 
  ExternalLink, MousePointerClick, ListTodo, Gift, LayoutDashboard, CheckSquare 
} from 'lucide-react';

export default function FaucetDashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Balance único en USDT
  const [balanceUSDT, setBalanceUSDT] = useState(24.5000);

  // Redes disponibles para USDT
  const networks = [
    { id: 'sol', name: 'Solana (SPL)', fee: 'Ultra bajo', waitTime: 30, reward: '0.05 USDT', icon: '🟣' },
    { id: 'bnb', name: 'BNB Smart Chain (BEP-20)', fee: 'Muy bajo', waitTime: 45, reward: '0.05 USDT', icon: '🟡' }
  ];

  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isClaiming, setIsClaiming] = useState(false);

  // Estados para el Captcha
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showCaptchaModal, setShowCaptchaModal] = useState(false);
  
  // Historial de reclamos
  const [claims, setClaims] = useState([
    { id: 1, asset: 'USDT (Solana)', amount: '0.05 USDT', type: 'Faucet', status: 'Completado', time: 'Hace 5 min' },
    { id: 2, asset: 'USDT (BEP-20)', amount: '0.05 USDT', type: 'Shortlink', status: 'Completado', time: 'Hace 24 min' },
  ]);

  // Temporizador de Faucet
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Disparar validación de captcha antes de reclamar
  const handleClaimClick = () => {
    if (timeLeft > 0 || isClaiming) return;
    // Abrimos el modal de verificación de captcha
    setShowCaptchaModal(true);
  };

  // Ejecutar el reclamo real tras verificar el captcha
  const verifyAndClaim = () => {
    setShowCaptchaModal(false);
    setCaptchaVerified(false);
    setIsClaiming(true);

    setTimeout(() => {
      setIsClaiming(false);
      setTimeLeft(selectedNetwork.waitTime);
      setBalanceUSDT(prev => prev + 0.05);
      
      setClaims(prev => [
        { id: Date.now(), asset: `USDT (${selectedNetwork.name.split(' ')[0]})`, amount: '0.05 USDT', type: 'Faucet', status: 'Completado', time: 'Ahora mismo' },
        ...prev
      ]);
    }, 1500);
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
                <h2 className="text-3xl font-extrabold mt-2 tracking-tight text-emerald-400">{balanceUSDT.toFixed(4)} <span className="text-sm font-normal text-slate-400">USDT</span></h2>
                <div className="mt-4 flex items-center gap-2 text-xs text-emerald-500 font-semibold">
                  <ArrowUpRight size={14} /> Listo para retiro inmediato
                </div>
              </div>
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Reclamos Totales</p>
                <h2 className="text-3xl font-extrabold mt-2 tracking-tight">148</h2>
                <p className={`mt-4 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Moneda base: USDT</p>
              </div>
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Seguridad Activa</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-bold text-sm">Anti-Bot Captcha Habilitado</span>
                </div>
                <p className={`mt-3 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Protección contra scripts automatizados</p>
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
                    <p className="text-xl font-bold mt-2 text-emerald-400">{balanceUSDT.toFixed(4)} USDT</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all">
                    Retirar
                  </button>
                </div>
                <div className={`p-4 rounded-xl border flex items-center justify-between ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">Red BNB (BEP-20)</span>
                    <p className="text-xl font-bold mt-2 text-emerald-400">{balanceUSDT.toFixed(4)} USDT</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all">
                    Retirar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VISTA 2: FAUCET CON SELECCIÓN DE RED Y CAPTCHA */}
        {activeTab === 'faucet' && (
          <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Coins className="text-cyan-400" size={20} /> Reclamo Faucet de USDT
            </h3>
            <p className={`text-xs mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Elige la red en la que deseas recibir tus USDT directamente. Cada red cuenta con su propio temporizador independiente.
            </p>

            {/* Selector de Redes (Solana o BNB) */}
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
                    <p className="text-sm font-bold mt-1 text-emerald-400">Recompensa: {net.reward}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Botón de Reclamo Principal */}
            <div className={`p-6 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
              <div>
                <h4 className="font-bold text-base">Reclamar en {selectedNetwork.name}</h4>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Gana <strong className="text-emerald-400">0.05 USDT</strong> protegidos por verificación anti-bot.
                </p>
              </div>

              <button
                disabled={timeLeft > 0 || isClaiming}
                onClick={handleClaimClick}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                  timeLeft > 0 || isClaiming
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-70'
                    : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950'
                }`}
              >
                {isClaiming ? <><RefreshCw className="animate-spin" size={16} /> Procesando...</> : 
                 timeLeft > 0 ? <><Clock size={16} /> Espera {timeLeft}s</> : 
                 <><CheckCircle2 size={16} /> Resolver Captcha & Claim</>}
              </button>
            </div>
          </div>
        )}

        {/* MÁS SECCIONES (Shortlinks, PTC, Tasks, Bonus) */}
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
                    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Recompensa: 0.01 USDT</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all">
                    Visitar Enlace
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

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
                    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Recompensa: 0.005 USDT</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all">
                    Ver Anuncio
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

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

        {activeTab === 'bonus' && (
          <div className={`p-6 rounded-2xl border text-center ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <Gift className="mx-auto text-cyan-400 mb-2" size={40} />
            <h3 className="text-xl font-bold">Bono Diario en USDT</h3>
            <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Reclama tu bonificación gratuita cada 24 horas.</p>
            <button className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-lg shadow-orange-500/20">
              ¡Reclamar Bono USDT!
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

      {/* MODAL DE CAPTCHA INTEGRADO */}
      {showCaptchaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <ShieldCheck className="text-emerald-400" size={22} /> Verificación de Seguridad
            </h3>
            <p className={`text-xs mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Por favor, completa la verificación anti-bot para procesar tu reclamo en la red <strong className="text-cyan-400">{selectedNetwork.name}</strong>.
            </p>

            {/* Simulador de Captcha Visual */}
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
                  No soy un robot (Verificación reCAPTCHA)
                </label>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-1 bg-slate-800 text-cyan-400 rounded">Protegido</span>
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
                onClick={verifyAndClaim}
                className={`w-1/2 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg ${
                  !captchaVerified 
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-50' 
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                }`}
              >
                Verificar & Reclamar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
