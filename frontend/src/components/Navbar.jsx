import { useState } from 'react';
import { Map, Book, Users, History, LayoutDashboard, LogOut, UserCheck, MapPin, ChevronDown } from 'lucide-react';

export function Navbar({ telaAtiva, setTela, aoSair }) {
  const [menuTerritorioAberto, setMenuTerritorioAberto] = useState(false);
  const navegarPara = (id) => {
    setTela(id);
    setMenuTerritorioAberto(false);
  };
  
  return (
    <nav className="bg-[#1e3a8a] text-white p-4 shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Identidade Visual */}
        <div className="flex flex-col cursor-pointer" onClick={() => navegarPara('dashboard')}>
          <h1 className="text-xl font-extrabold tracking-tight leading-none uppercase">
            Gestão do Serviço
          </h1>
          <span className="text-[10px] text-blue-300 font-medium tracking-widest uppercase mt-1">
            Congregação Tropical
          </span>
        </div>

        {/* Navegação Principal */}
        <div className="hidden lg:flex items-center gap-1">
          <button
            onClick={() => navegarPara('dashboard')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
              telaAtiva === 'dashboard' ? 'bg-blue-600' : 'hover:bg-white/10'
            }`}
          >
            <LayoutDashboard size={18} /> Início
          </button>

          <button
            onClick={() => navegarPara('admin')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
              telaAtiva === 'admin' ? 'bg-blue-600' : 'hover:bg-white/10'
            }`}
          >
            <UserCheck size={18} /> Admin
          </button>

          <button
            onClick={() => navegarPara('publicadores')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
              telaAtiva === 'publicadores' ? 'bg-blue-600' : 'hover:bg-white/10'
            }`}
          >
            <Users size={18} /> Publicadores
          </button>

          {/* MENU CASCATA: TERRITÓRIOS */}
          <div className="relative">
            <button
              onClick={() => setMenuTerritorioAberto(!menuTerritorioAberto)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                ['territorios', 'cadastro_territorio', 'historico'].includes(telaAtiva)
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-100 hover:bg-white/10'
              }`}
            >
              <Map size={18} /> 
              Territórios 
              <ChevronDown size={14} className={`transition-transform ${menuTerritorioAberto ? 'rotate-180' : ''}`} />
            </button>

            {/* Submenu (Cascata) */}
            {menuTerritorioAberto && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 text-gray-800">
                <button
                  onClick={() => navegarPara('territorios')}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-semibold hover:bg-blue-50 transition-colors"
                >
                  <Map size={16} className="text-blue-600" /> Designação 
                </button>
                <button
                  onClick={() => navegarPara('cadastro_territorio')}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-semibold hover:bg-blue-50 transition-colors"
                >
                  <MapPin size={16} className="text-blue-600" /> Cadastrar Cartões
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={() => navegarPara('historico')}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-semibold hover:bg-blue-50 transition-colors"
                >
                  <History size={16} className="text-blue-600" /> Histórico S-13
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => navegarPara('publicacoes')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
              telaAtiva === 'publicacoes' ? 'bg-blue-600' : 'hover:bg-white/10'
            }`}
          >
            <Book size={18} /> Publicações
          </button>
        </div>

        {/* Botão Sair */}
        <button 
          onClick={aoSair}
          className="flex items-center gap-2 px-4 py-2 border border-red-400/40 text-red-100 rounded-xl text-sm font-bold hover:bg-red-500 hover:text-white transition-all group"
        >
          <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
          Sair
        </button>
      </div>
    </nav>
  );
}