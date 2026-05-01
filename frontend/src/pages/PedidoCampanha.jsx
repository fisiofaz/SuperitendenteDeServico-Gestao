import { useState } from 'react';
import { Megaphone, Save, Trash2, Calendar, ClipboardList } from 'lucide-react';

export function PedidoCampanha({ salvarPedidoCampanha }) {
  const [campanha, setCampanha] = useState({
    nome: '',
    dataInicio: '',
    itens: [{ descricao: '', quantidade: '' }]
  });

  const adicionarItem = () => {
    setCampanha({ ...campanha, itens: [...campanha.itens, { descricao: '', quantidade: '' }] });
  };

  const handleInputChange = (index, field, value) => {
    const novosItens = [...campanha.itens];
    novosItens[index][field] = value;
    setCampanha({ ...campanha, itens: novosItens });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    salvarPedidoCampanha(campanha);
    alert("Pedido de Campanha registrado com sucesso!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
          <Megaphone size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">Pedidos de Campanha Especial</h2>
          <p className="text-sm text-gray-500 font-medium">Registrar materiais de congressos, celebração ou campanhas locais</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Nome da Campanha</label>
              <input 
                type="text" 
                placeholder="Ex: Campanha do Memorial 2026"
                className="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={campanha.nome}
                onChange={(e) => setCampanha({...campanha, nome: e.target.value})}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Início Estimado</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="date" 
                  className="w-full p-3 pl-10 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={campanha.dataInicio}
                  onChange={(e) => setCampanha({...campanha, dataInicio: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-700 flex items-center gap-2">
                <ClipboardList size={18} className="text-indigo-500" />
                Lista de Materiais
              </h3>
              <button 
                type="button" 
                onClick={adicionarItem}
                className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded-lg transition-colors"
              >
                + Adicionar Item
              </button>
            </div>

            {campanha.itens.map((item, index) => (
              <div key={index} className="flex gap-3 mb-3 animate-in fade-in slide-in-from-left-2">
                <input 
                  type="text" 
                  placeholder="Descrição do material"
                  className="flex-1 p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={item.descricao}
                  onChange={(e) => handleInputChange(index, 'descricao', e.target.value)}
                  required
                />
                <input 
                  type="number" 
                  placeholder="Qtd"
                  className="w-24 p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={item.quantidade}
                  onChange={(e) => handleInputChange(index, 'quantidade', e.target.value)}
                  required
                />
                {campanha.itens.length > 1 && (
                  <button 
                    type="button"
                    onClick={() => setCampanha({ ...campanha, itens: campanha.itens.filter((_, i) => i !== index) })}
                    className="p-3 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
        >
          <Save size={20} /> Salvar Registro de Campanha
        </button>
      </form>
    </div>
  );
}