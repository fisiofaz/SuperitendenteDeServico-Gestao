import { useState } from 'react';
import { User, BookOpen, Clock, CheckCircle, Save, Plus } from 'lucide-react';

export function PedidoNominal({ publicadores, estoque, salvarPedido, pedidosExistentes = [] }) {
  const [pedido, setPedido] = useState({
    publicadorId: '',
    itemId: '',
    quantidade: 1,
    observacao: '',
    status: 'Pendente'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    salvarPedido(pedido);
    setPedido({ publicadorId: '', itemId: '', quantidade: 1, observacao: '', status: 'Pendente' });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
          <BookOpen size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">Pedidos Nominais</h2>
          <p className="text-sm text-gray-500 font-medium">Encomendas específicas para publicadores da congregação</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário de Novo Pedido */}
        <form onSubmit={handleSubmit} className="lg:col-span-1 space-y-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-fit">
          <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
            <Plus size={18} className="text-orange-500" /> Novo Pedido
          </h3>
          
          <div className="space-y-1">
            {/* USANDO O ÍCONE USER AQUI NO LABEL */}
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 flex items-center gap-1">
              <User size={12} /> Publicador
            </label>
            <select 
              className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
              value={pedido.publicadorId}
              onChange={(e) => setPedido({...pedido, publicadorId: e.target.value})}
              required
            >
              <option value="">Selecione o irmão(ã)</option>
              {publicadores.map(p => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 flex items-center gap-1">
              <BookOpen size={12} /> Publicação
            </label>
            <select 
              className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
              value={pedido.itemId}
              onChange={(e) => setPedido({...pedido, itemId: e.target.value})}
              required
            >
              <option value="">Selecione o item</option>
              {estoque.map(i => (
                <option key={i.id} value={i.id}>[{i.sigla}] {i.nome}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Observações</label>
            <textarea 
              className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm h-24"
              placeholder="Ex: Edição de bolso..."
              value={pedido.observacao}
              onChange={(e) => setPedido({...pedido, observacao: e.target.value})}
            />
          </div>

          <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-100 transition-all flex items-center justify-center gap-2">
            <Save size={18} /> Registrar Pedido
          </button>
        </form>

        {/* Lista de Pedidos */}
        <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                    <h3 className="font-bold text-gray-700 flex items-center gap-2">
                        <Clock size={18} className="text-orange-500" /> Fila de Espera
                    </h3>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase">
                        <CheckCircle size={12} /> Pedidos Atendidos
                    </div>
                </div>
    
                <div className="divide-y divide-gray-50">
                    {pedidosExistentes.length > 0 ? (
                        pedidosExistentes.map((p) => {
                            // Buscamos os nomes para exibição
                            const nomePublicador = publicadores.find(pub => pub.id === p.publicadorId)?.nome || 'Não encontrado';
                            const infoItem = estoque.find(est => est.id === p.itemId);

                            return (
                                <div key={p.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-orange-50 text-orange-600 rounded-xl group-hover:bg-orange-100 transition-colors">
                                             <User size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-sm">{nomePublicador}</h4>
                                            <p className="text-xs text-gray-500">
                                                <span className="font-bold text-orange-600">[{infoItem?.sigla || '??'}]</span> {infoItem?.nome || 'Item removido'}
                                            </p>
                                            {p.observacao && (
                                                <p className="text-[10px] text-gray-400 mt-1 italic">Obs: {p.observacao}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase ${
                                                p.status === 'Pendente' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
                                            }`}>
                                            {p.status}
                                        </span>
                                        <p className="text-[10px] text-gray-300 font-medium">Registrado em {new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="p-10 text-center text-gray-400 italic text-sm">
                            Nenhum pedido pendente no momento.
                        </div>
                    )}
                </div>
            </div>
          </div>
        </div>
    </div>
  );
}