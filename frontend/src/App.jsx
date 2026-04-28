import { CadastroPublicacao } from './pages/CadastroPublicacao';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Aqui é onde nossas páginas vão aparecer depois */}
      <nav className="bg-blue-800 p-4 text-white shadow-md">
        <h1 className="text-xl font-bold text-center">Superitendente de Serviço - Gestão Online</h1>
        <h2 className="text-xl font-bold text-center">Congregação Tropica</h2>
      </nav>
      
      <CadastroPublicacao />
    </div>
  )
}

export default App