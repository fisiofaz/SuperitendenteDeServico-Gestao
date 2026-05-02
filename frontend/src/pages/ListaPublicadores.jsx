import { useState } from 'react';
import { Tabela } from '../components/Tabela';
import { UserPlus, Trash2, Users } from 'lucide-react';

export function ListaPublicadores({ publicadores, setPublicadores }) {
  const [novoNome, setNovoNome] = useState('');

  const adicionarPublicador = (e) => {
    e.preventDefault();
    if (!novoNome.trim()) return;
    
    const novo = {
      id: Date.now(),
      nome: novoNome.trim(),
    };

    setPublicadores([...publicadores, novo].sort((a, b) => a.nome.localeCompare(b.nome)));
    setNovoNome('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 animate-in fade-in duration-500">
      {/* Cabeçalho Responsivo */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <div className="p-3 bg-green-100 text-green-600 rounded-2xl shadow-sm shadow-green-100">
          <Users size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Cadastro de Publicadores</h2>
          <p className="text-sm text-gray-500 font-medium">Irmãos que utilizam os cartões de território</p>
        </div>
      </div>

      {/* Formulário Refatorado para Mobile */}
      <form 
        onSubmit={adicionarPublicador} 
        className="bg-white p-4 rounded-4xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 mb-10 transition-all"
      >
        <input 
          type="text" 
          placeholder="Nome do publicador (Ex: Fabio Silva)"
          className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium text-gray-700"
          value={novoNome}
          onChange={(e) => setNovoNome(e.target.value)}
        />
        <button className="bg-green-600 text-white px-8 py-3.5 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-green-700 transition-all shadow-lg shadow-green-100 active:scale-95">
          <UserPlus size={20} />
          <span>Cadastrar</span>
        </button>
      </form>

      {/* Tabela com Scroll Lateral para Celular */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <Tabela 
            colunas={["Nome do Publicador", "Ações"]}
            dados={publicadores.map(p => ({
              id: p.id,
              nome: <span className="font-bold text-gray-700 ml-2">{p.nome}</span>,
              acoesPersonalizadas: (
                <button 
                  onClick={() => {
                    if(window.confirm(`Remover ${p.nome} da lista?`)) {
                      setPublicadores(publicadores.filter(pub => pub.id !== p.id));
                    }
                  }}
                  className="p-2.5 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all mr-2"
                  title="Excluir Publicador"
                >
                  <Trash2 size={18} />
                </button>
              )
            }))}
          />
        </div>
      </div>      
    </div>
  );
}