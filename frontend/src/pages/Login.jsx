import { useState } from 'react';

export function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Por enquanto, uma lógica simples para você testar
    if (email && senha) {
      onLogin(); // Função que passaremos pelo App.jsx
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Lado Esquerdo: Imagem/Paisagem */}
      <div className="hidden md:flex md:w-1/2 bg-blue-900 items-center justify-center relative">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000" 
          alt="Paisagem" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 p-12 text-white">
          <h1 className="text-5xl font-bold mb-4">Gestão do Serviço</h1>
          <p className="text-xl italic">"Faça todas as coisas para a glória de Deus."</p>
        </div>
      </div>

      {/* Lado Direito: Formulário */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Bem-vindo</h2>
            <p className="text-gray-500">Acesse o painel da sua congregação</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">E-mail</label>
              <input 
                type="email" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <input 
                type="password" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Entrar no Sistema
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}