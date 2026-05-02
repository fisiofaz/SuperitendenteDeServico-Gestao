import { useState } from 'react';
import { LogIn, Mail, Lock } from 'lucide-react';

export function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {   
    e.preventDefault();
    if (email && senha) {
      onLogin(); 
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      {/* Lado Esquerdo: Identidade Visual (Oculto em celulares muito pequenos se preferir, ou adaptado) */}
     <div className="hidden md:flex md:w-1/2 bg-[#1e3a8a] items-center justify-center relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000" 
          alt="Paisagem" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#1e3a8a] to-transparent opacity-60"></div>
        
        <div className="relative z-10 p-12 text-white max-w-lg">
          <h1 className="text-6xl font-black mb-6 tracking-tighter uppercase leading-none">
            Gestão do <br/> Serviço
          </h1>
          <div className="w-20 h-1.5 bg-blue-400 mb-6 rounded-full"></div>
          <p className="text-2xl italic font-light text-blue-100 leading-relaxed">
            "Faça todas as coisas para a glória de Deus."
          </p>
        </div>
      </div>

      {/* Lado Direito: Formulário de Acesso */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="max-w-md w-full animate-in fade-in slide-in-from-right duration-700">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-gray-800 tracking-tight">Bem-vindo</h2>
            <p className="text-gray-500 font-medium mt-2">Acesse o painel da sua congregação</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-black text-gray-400 uppercase ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="email" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>   
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-gray-400 uppercase ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>              
            </div>

            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-3 py-4 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-xl shadow-blue-100 font-black text-lg transition-all active:scale-95 mt-8"
            >
              <LogIn size={22} />
              Entrar no Sistema
            </button>
          </form>

          <footer className="mt-12 text-center">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
              Desenvolvido por Fabio André Zatta
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}