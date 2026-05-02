import { useState } from 'react';
import { Megaphone, Save, Trash2, Calendar, ClipboardList, PlusCircle } from 'lucide-react';

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
    setCampanha({ nome: '', dataInicio: '', itens: [{ descricao: '', quantidade: '' }] });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 animate-in fade-in duration-500">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl shadow-sm shadow-indigo-100">
          <Megaphone size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Pedidos de Campanha Especial</h2>
          <p className="text-sm text-gray-500 font-medium italic">Registrar materiais de congressos, celebração ou campanhas locais</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-4xl border border-gray-100 shadow-sm space-y-6">
          
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-xs font-black text-gray-400 uppercase ml-1">Nome da Campanha</label>
              <input 
                type="text" 
                placeholder="Ex: Campanha do Memorial 2026"
                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium text-gray-700"
                value={campanha.nome}
                onChange={(e) => setCampanha({...campanha, nome: e.target.value})}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-black text-gray-400 uppercase ml-1">Início Estimado</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="date" 
                  className="w-full p-4 pl-12 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium text-gray-700"
                  value={campanha.dataInicio}
                  onChange={(e) => setCampanha({...campanha, dataInicio: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Lista de Materiais Dinâmica */}
          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-gray-700 flex items-center gap-2 uppercase text-xs tracking-widest">
                <ClipboardList size={18} className="text-indigo-500" />
                Lista de Materiais
              </h3>
              <button 
                type="button" 
                onClick={adicionarItem}
                className="flex items-center gap-2 text-xs font-black text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all"
              >
                <PlusCircle size={16} /> Adicionar
              </button>
            </div>

            <div className="space-y-3">
              {campanha.itens.map((item, index) => (
                <div 
                  key={index} 
                  className="flex flex-col sm:flex-row gap-3 p-4 bg-gray-50/50 rounded-2xl border border-gray-50 animate-in slide-in-from-left duration-300"
                >
                <input 
                  type="text" 
                  placeholder="Descrição do material"
                  className="flex-1 p-3.5 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                  value={item.descricao}
                  onChange={(e) => handleInputChange(index, 'descricao', e.target.value)}
                  required
                />
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    placeholder="Qtd"
                    className="w-24 p-3.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                    value={item.quantidade}
                    onChange={(e) => handleInputChange(index, 'quantidade', e.target.value)}
                    required
                  />
                  {campanha.itens.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => setCampanha({ ...campanha, itens: campanha.itens.filter((_, i) => i !== index) })}
                        className="p-3.5 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                </div>      
              </div>
            ))}
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-4xl shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-3 active:scale-95"
        >
          <Save size={20} /> Salvar Registro de Campanha
        </button>
      </form>
    </div>
  );
}