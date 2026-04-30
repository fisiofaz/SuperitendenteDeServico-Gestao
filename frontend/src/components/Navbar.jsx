import { Map, Book, Users, History, LayoutDashboard, LogOut } from 'lucide-react';

export function Navbar({ telaAtiva, setTela }) {
  const itensMenu = [
    { id: 'dashboard', label: 'Início', icon: <LayoutDashboard size={18} /> },
    { id: 'admin', label: 'Admin', icon: <Users size={18} /> },
    { id: 'pedidos', label: 'Publicações', icon: <Book size={18} /> },
    { id: 'territorios', label: 'Territórios', icon: <Map size={18} /> },
    { id: 'historico', label: 'Histórico S-13', icon: <History size={18} /> },
  ];

  return (
    <nav className="bg-[#1e3a8a] text-white p-4 shadow-lg mb-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Identidade Visual */}
        <div className="flex flex-col cursor-pointer" onClick={() => setTela('dashboard')}>
          <h1 className="text-xl font-extrabold tracking-tight leading-none uppercase">
            Gestão do Serviço
          </h1>
          <span className="text-[10px] text-blue-200 font-medium tracking-widest uppercase mt-1">
            Congregação Tropical
          </span>
        </div>

        {/* Links de Navegação Centralizados */}
        <div className="hidden md:flex items-center gap-2">
          {itensMenu.map((item) => (
            <button
              key={item.id}
              onClick={() => setTela(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                telaAtiva === item.id 
                  ? 'bg-blue-600 shadow-inner text-white' 
                  : 'text-blue-100 hover:bg-white/10'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* Botão Sair Estilizado */}
        <button 
          className="flex items-center gap-2 px-4 py-2 border border-red-400/40 text-red-100 rounded-xl text-sm font-bold hover:bg-red-500 hover:text-white transition-all group"
          onClick={() => window.confirm("Deseja realmente sair?")}
        >
          <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
          Sair
        </button>
      </div>
    </nav>
  );
}