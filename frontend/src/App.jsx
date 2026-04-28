import { useState } from 'react';
import { CadastroPublicacao } from './pages/CadastroPublicacao';
import { GestaoTerritorios } from './pages/GestaoTerritorios';

function App() {
  const [tela, setTela] = useState('publicacoes');
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-900 p-4 text-white shadow-lg flex justify-between items-center">
        <h1 className="text-xl font-bold text-center uppercase tracking-tighter">Superitendente de Serviço - Gestão Online</h1>
        <h2 className="text-xl font-bold text-center uppercase tracking-tighter">Congregação Tropical</h2>
        <div className="flex gap-4">
          <button 
            onClick={() => setTela('publicacoes')}
            className={`px-3 py-1 rounded ${tela === 'publicacoes' ? 'bg-blue-700' : ''}`}
          >
            Publicações
          </button>
          <button 
            onClick={() => setTela('territorios')}
            className={`px-3 py-1 rounded ${tela === 'territorios' ? 'bg-blue-700' : ''}`}
          >
            Territórios
          </button>
        </div>
      </nav>
      <main className="mt-4">
        {tela === 'publicacoes' ? <CadastroPublicacao /> : <GestaoTerritorios />}
      </main>
    </div>
  )
}

export default App