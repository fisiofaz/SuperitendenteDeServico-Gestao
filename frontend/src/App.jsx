import { useState } from 'react';
import { Login } from './pages/Login';
import { CadastroPublicacao } from './pages/CadastroPublicacao';
import { GestaoTerritorios } from './pages/GestaoTerritorios';
import { AdminUsuarios } from './pages/AdminUsuarios';


function App() {
  const [isLogado, setIsLogado] = useState(false);
  const [tela, setTela] = useState('publicacoes'); 

  if (!isLogado) {
    return <Login onLogin={() => setIsLogado(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-900 p-4 text-white shadow-lg flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold uppercase tracking-tighter leading-none">Gestão do Serviço</h1>
          <span className="text-xs text-blue-300">Congregação Tropical</span>
        </div>        
        <div className="flex gap-2">
          <button 
            onClick={() => setTela('admin')}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${tela === 'admin' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
          >
            Admin
          </button>
          <button 
            onClick={() => setTela('publicacoes')}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${tela === 'publicacoes' ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
          >
            Publicações
          </button>
          <button 
            onClick={() => setTela('territorios')}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${tela === 'territorios' ? 'bg-blue-700' : 'hover:bg-blue-800 '}`}
          >
            Territórios
          </button>
          <button 
            onClick={() => setIsLogado(false)}
            className="ml-4 px-3 py-1 border border-red-400 text-red-400 rounded-md text-sm hover:bg-red-500 hover:text-white transition-all"
          >
            Sair
          </button>

        </div>
      </nav>
      <main className="mt-4">
        {tela === 'publicacoes' && <CadastroPublicacao />}
        {tela === 'territorios' && <GestaoTerritorios />}
        {tela === 'admin' && <AdminUsuarios />}
      </main>
    </div>
  )
}

export default App