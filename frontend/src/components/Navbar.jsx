import { useState } from 'react';
import { 
  Map, Book, Users, History, LayoutDashboard, Megaphone, User,
  LogOut, UserCheck, MapPin, ChevronDown, Package, BookOpen, Navigation, Menu, X
} from 'lucide-react';

export function Navbar({ telaAtiva, setTela, aoSair }) {
  const [menuTerritorioAberto, setMenuTerritorioAberto] = useState(false);
  const [menuPublicacoesAberto, setMenuPublicacoesAberto] = useState(false);
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

  const navegarPara = (id) => {
    setTela(id);
    setMenuTerritorioAberto(false);
    setMenuPublicacoesAberto(false);
    setMenuMobileAberto(false);
  };
  
  return (
    <nav className="bg-[#1e3a8a] text-white p-4 shadow-lg relative z-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Botão Menu Hambúrguer (Apenas Mobile/Tablet) */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setMenuMobileAberto(!menuMobileAberto)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-xl transition-all"
          >
            {menuMobileAberto ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Logo */}
          <div className="flex flex-col cursor-pointer" onClick={() => navegarPara('dashboard')}>
            <h1 className="text-xl font-extrabold tracking-tight leading-none uppercase">
             Gestão do Serviço
            </h1>
            <span className="text-[9px] md:text-[10px] text-blue-300 font-medium tracking-widest uppercase mt-1">
              Congregação Tropical
            </span>
          </div>
        </div>     

        {/* Navegação Principal (Desktop - lg) */}
        <div className="hidden lg:flex items-center gap-1">
         <button onClick={() => navegarPara('dashboard')} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all ${telaAtiva === 'dashboard' ? 'bg-blue-600' : 'hover:bg-white/10'}`}>
            <LayoutDashboard size={18} /> Início
          </button>

          <button onClick={() => navegarPara('publicadores')} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all ${telaAtiva === 'publicadores' ? 'bg-blue-600' : 'hover:bg-white/10'}`}>
            <Users size={18} /> Publicadores
          </button>
          <button
            onClick={() => navegarPara('admin')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
              telaAtiva === 'admin' ? 'bg-blue-600' : 'hover:bg-white/10'
            }`}
          >
            <UserCheck size={18} /> Admin
          </button>    

          {/* DROPDOWN: TERRITÓRIOS */}          
          <div className="relative">
            <button
              onClick={() => { setMenuTerritorioAberto(!menuTerritorioAberto); setMenuPublicacoesAberto(false); }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all ${['territorios', 'cadastro_territorio', 'historico', 'visualizar_mapa'].includes(telaAtiva) ? 'bg-blue-700' : 'hover:bg-white/10'}`}
            >
              <Map size={18} /> Territórios <ChevronDown size={14} className={menuTerritorioAberto ? 'rotate-180' : ''} />
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
                <button onClick={() => navegarPara('visualizar_mapa')} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-semibold hover:bg-green-50 text-green-700 transition-colors border-t border-gray-50 mt-1">
                  <Navigation size={16} /> Visualizar Mapas
                </button>
                <button
                  onClick={() => navegarPara('historico')}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-semibold hover:bg-blue-50 transition-colors"
                >
                  <History size={16} className="text-blue-600" /> Histórico S-13
                </button>

              </div>
            )}
          </div>
          {/* DROPDOWN: PUBLICAÇÕES */}
          <div className="relative group">
            <button
              onClick={() => {
              setMenuPublicacoesAberto(!menuPublicacoesAberto);
              setMenuTerritorioAberto(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold transition-all duration-300 ${
                ['publicacoes', 'gestao_estoque', 'pedido_campanha', 'pedido_nominal'].includes(telaAtiva) 
                  ? 'bg-white/20 shadow-inner' 
                  : 'hover:bg-white/10'
                }`}
            >
              <Book size={18} /> Publicações 
              <ChevronDown size={14} className={`transition-transform duration-300 ${menuPublicacoesAberto ? 'rotate-180' : ''}`} />
            </button>

            {menuPublicacoesAberto && (
              <div className="absolute top-full left-0 mt-3 w-72 bg-white/95 backdrop-blur-md rounded-4xl shadow-2xl border border-white/20 py-3 text-gray-800 animate-in fade-in zoom-in slide-in-from-top-2 duration-300 z-100">
                <div className="px-4 py-2 mb-2 border-b border-gray-100/50">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Gestão de Itens</span>
                </div>
      
                <button onClick={() => navegarPara('publicacoes')} className="flex items-center gap-3 px-5 py-3 text-sm font-bold hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-all rounded-xl mx-2 w-[calc(100%-1rem)]">
                  <div className="p-2 bg-blue-100 rounded-lg"><BookOpen size={16} className="text-blue-600" /></div>
                  Catálogo
                </button>

                <button onClick={() => navegarPara('gestao_estoque')} className="flex items-center gap-3 px-5 py-3 text-sm font-bold hover:bg-amber-50 text-gray-700 hover:text-amber-700 transition-all rounded-xl mx-2 w-[calc(100%-1rem)]">
                  <div className="p-2 bg-amber-100 rounded-lg"><Package size={16} className="text-amber-600" /></div>
                    Estoque
                </button>

                <div className="px-4 py-2 mt-2 mb-2 border-b border-gray-100/50">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pedidos Especiais</span>
                </div>

                <button onClick={() => navegarPara('pedido_campanha')} className="flex items-center gap-3 w-full px-5 py-3 text-sm font-bold hover:bg-indigo-50 text-indigo-700 transition-all rounded-xl mx-2">
                  <div className="p-2 bg-indigo-100 rounded-lg"><Megaphone size={16} /></div>
                  Campanhas Especiais
                </button>

                <button onClick={() => navegarPara('pedido_nominal')} className="flex items-center gap-3 w-full px-5 py-3 text-sm font-bold hover:bg-orange-50 text-orange-700 transition-all rounded-xl mx-2">
                  <div className="p-2 bg-orange-100 rounded-lg"><User size={16} /></div>
                  Pedidos Nominais
                </button>
              </div>
            )}
          </div>          
        </div>

        {/*Lado Direito: Sair (Desktop) / Status (Mobile)*/}
        <button 
          onClick={aoSair}
          className="flex items-center gap-2 px-4 py-2 border border-red-400/40 text-red-100 rounded-xl text-xs md:text-sm font-bold hover:bg-red-500 hover:text-white transition-all"
        >
          <LogOut size={18} />
          <span className="hidden md:inline">Sair</span>
        </button>
      </div>
        {/* MENU LATERAL (MOBILE DRAWER) */}
      <div className={`lg:hidden fixed inset-0 z-110 transition-all duration-300 ${menuMobileAberto ? 'visible' : 'invisible'}`}>
        {/* Overlay Escuro */}
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${menuMobileAberto ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMenuMobileAberto(false)} />
        
        {/* Conteúdo do Menu */}
        <div className={`absolute top-0 left-0 h-full w-72 bg-blue-900 shadow-2xl transition-transform duration-300 transform ${menuMobileAberto ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}>
          <div className="p-6">
            <h2 className="text-xs font-black text-blue-300 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Navegação</h2>
            
            <div className="flex flex-col gap-2">
              <button onClick={() => navegarPara('dashboard')} className={`flex items-center gap-4 p-3 rounded-2xl font-bold text-sm ${telaAtiva === 'dashboard' ? 'bg-white text-blue-900' : 'hover:bg-white/10 text-white'}`}>
                <LayoutDashboard size={20} /> Início
              </button>
              
              <button onClick={() => navegarPara('publicadores')} className={`flex items-center gap-4 p-3 rounded-2xl font-bold text-sm ${telaAtiva === 'publicadores' ? 'bg-white text-blue-900' : 'hover:bg-white/10 text-white'}`}>
                <Users size={20} /> Publicadores
              </button>
              <button onClick={() => navegarPara('admin')} className={`flex items-center gap-4 p-3 rounded-2xl font-bold text-sm ${telaAtiva === 'admin' ? 'bg-white text-blue-900' : 'hover:bg-white/10 text-white'}`}>
                <UserCheck size={20} /> Admin
              </button>

              {/* Seção Territórios Mobile */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <span className="text-[10px] font-bold text-blue-400 uppercase ml-3">Territórios</span>
                <div className="flex flex-col gap-1 mt-2">
                  <button onClick={() => navegarPara('territorios')} className="flex items-center gap-4 p-3 rounded-2xl text-sm font-medium hover:bg-white/5">
                    <Map size={18} /> Designação
                  </button>
                  <button onClick={() => navegarPara('visualizar_mapa')} className="flex items-center gap-4 p-3 rounded-2xl text-sm font-medium hover:bg-white/5">
                    <Navigation size={18} /> Mapas
                  </button>
                  <button onClick={() => navegarPara('historico')} className="flex items-center gap-4 p-3 rounded-2xl text-sm font-medium hover:bg-white/5">
                    <History size={18} /> Histórico S-13
                  </button>
                </div>
              </div>

              {/* Seção Publicações Mobile */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <span className="text-[10px] font-bold text-blue-400 uppercase ml-3">Publicações</span>
                <div className="flex flex-col gap-1 mt-2">
                  <button onClick={() => navegarPara('publicacoes')} className="flex items-center gap-4 p-3 rounded-2xl text-sm font-medium hover:bg-white/5">
                    <BookOpen size={18} /> Catálogo
                  </button>
                  <button onClick={() => navegarPara('gestao_estoque')} className="flex items-center gap-4 p-3 rounded-2xl text-sm font-medium hover:bg-white/5">
                    <Package size={18} /> Estoque
                  </button>
                </div>
              </div>
            </div>

            <button onClick={aoSair} className="w-full mt-10 flex items-center justify-center gap-3 p-4 bg-red-500/20 text-red-300 rounded-2xl font-bold text-sm border border-red-500/30">
              <LogOut size={20} /> Sair do Sistema
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}