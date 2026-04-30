import { useState } from 'react';
import { Tabela } from '../components/Tabela';
import { MapPin, PlusCircle, Trash2 } from 'lucide-react';

export function CadastroTerritorio({ territorios, setTerritorios, aoAdicionar }) {
  const [form, setForm] = useState({ numero: '', nome: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.numero || !form.nome) return;
    
    aoAdicionar(form);
    setForm({ numero: '', nome: '' });
  };

  const excluirTerritorio = (id) => {
    if(window.confirm("Isso apagará o cartão definitivamente. Confirma?")) {
      setTerritorios(territorios.filter(t => t.id !== id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
          <MapPin size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Cadastro de Cartões</h2>
          <p className="text-sm text-gray-500">Adicione novos setores à lista da congregação</p>
        </div>
      </div>

      {/* Formulário de Cadastro */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Nº do Cartão</label>
          <input 
            type="text" 
            placeholder="Ex: 01"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={form.numero}
            onChange={(e) => setForm({...form, numero: e.target.value})}
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Nome do Setor / Bairro</label>
          <input 
            type="text" 
            placeholder="Ex: Centro - Setor A"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={form.nome}
            onChange={(e) => setForm({...form, nome: e.target.value})}
          />
        </div>
        <div className="flex items-end">
          <button className="w-full bg-blue-600 text-white h-13 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
            <PlusCircle size={20} />
            Salvar Cartão
          </button>
        </div>
      </form>

      {/* Lista de Cartões Existentes */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <Tabela 
          colunas={["Nº", "Setor / Descrição", "Ações"]}
          dados={territorios.map(t => ({
            id: t.id,
            nome: t.numero,
            email: t.nome,
            acoesPersonalizadas: (
              <button 
                onClick={() => excluirTerritorio(t.id)}
                className="text-gray-300 hover:text-red-500 p-2 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            )
          }))}
        />
      </div>
    </div>
  );
}