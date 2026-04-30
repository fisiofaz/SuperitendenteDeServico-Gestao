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
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-green-100 text-green-600 rounded-2xl">
          <Users size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Cadastro de Publicadores</h2>
          <p className="text-sm text-gray-500">Irmãos que utilizam os cartões de território</p>
        </div>
      </div>

      <form onSubmit={adicionarPublicador} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 mb-8">
        <input 
          type="text" 
          placeholder="Nome do publicador (Ex: Fabio Silva)"
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-500 transition-all"
          value={novoNome}
          onChange={(e) => setNovoNome(e.target.value)}
        />
        <button className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 transition-all shadow-lg shadow-green-100">
          <UserPlus size={20} />
          Cadastrar
        </button>
      </form>

      <Tabela 
        colunas={["Nome do Publicador", "Ações"]}
        dados={publicadores.map(p => ({
          id: p.id,
          nome: p.nome,
          acoesPersonalizadas: (
            <button 
              onClick={() => setPublicadores(publicadores.filter(pub => pub.id !== p.id))}
              className="text-gray-400 hover:text-red-500 p-2 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          )
        }))}
      />
    </div>
  );
}