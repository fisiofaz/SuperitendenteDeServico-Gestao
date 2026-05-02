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
    alert("Pedido nominal registrado com sucesso!");
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 animate-in fade-in duration-500">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl shadow-sm shadow-orange-100">
          <BookOpen size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Pedidos Nominais</h2>
          <p className="text-sm text-gray-500 font-medium italic">Encomendas específicas para publicadores da congregação</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Formulário de Novo Pedido - No mobile fica no topo */}
        <form 
          onSubmit={handleSubmit} 
          className="lg:col-span-1 space-y-5 bg-white p-6 md:p-8 rounded-4xl border border-gray-100 shadow-sm h-fit"
        >
          <h3 className="text-lg font-black text-gray-700 mb-2 flex items-center gap-2">
            <Plus size={18} className="text-orange-500" /> Novo Pedido
          </h3>
          
          <div className="space-y-1">
           <label className="text-[10px] font-black text-gray-400 uppercase ml-1 flex items-center gap-1">
              <User size={12} /> Publicador
            </label>
            <select 
              className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold text-gray-700 appearance-none"
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
            <label className="text-[10px] font-black text-gray-400 uppercase ml-1 flex items-center gap-1">
              <BookOpen size={12} /> Publicação
            </label>
            <select 
              className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold text-gray-700 appearance-none"
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
            <label className="text-[10px] font-black text-gray-400 uppercase ml-1">
              Observações
            </label>
            <textarea 
              className="w-full p-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold text-gray-700 appearance-none"
              placeholder="Ex: Edição de bolso ou idioma específico..."
              value={pedido.observacao}
              onChange={(e) => setPedido({...pedido, observacao: e.target.value})}
            />
          </div>

          <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-orange-100 transition-all flex items-center justify-center gap-2 active:scale-95">
            <Save size={20} /> Registrar Pedido
          </button>
        </form>

       {/* Fila de Espera - Visual de Timeline para Mobile */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-gray-50 bg-gray-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <h3 className="font-black text-gray-700 flex items-center gap-2 uppercase text-xs tracking-widest">
                <Clock size={18} className="text-orange-500" /> Fila de Espera
              </h3>
              <div className="flex items-center gap-1 text-[10px] font-black text-green-600 bg-green-100 px-3 py-1 rounded-full uppercase tracking-tighter">
                <CheckCircle size={12} /> {pedidosExistentes.filter(p => p.status === 'Atendido').length} Atendidos
              </div>
            </div>    
            <div className="divide-y divide-gray-50 overflow-y-auto max-h-150 custom-scrollbar">
              {pedidosExistentes.length > 0 ? (
                pedidosExistentes.map((p) => {
                  const nomePublicador = publicadores.find(pub => pub.id === p.publicadorId)?.nome || 'Não encontrado';
                  const infoItem = estoque.find(est => est.id === p.itemId);
                    return (
                      <div 
                        key={p.id} 
                        className="p-5 hover:bg-gray-50/80 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="hidden sm:flex p-3 bg-orange-50 text-orange-600 rounded-2xl group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                            <User size={20} />
                          </div>
                          <div>
                            <h4 className="font-black text-gray-800 text-base">{nomePublicador}</h4>
                            <p className="text-sm text-gray-500 font-medium">
                              <span className="font-black text-orange-600">[{infoItem?.sigla || '??'}]</span> {infoItem?.nome || 'Item não encontrado'}
                            </p>
                            {p.observacao && (
                              <p className="text-[11px] text-gray-400 mt-2 italic bg-gray-100/50 p-2 rounded-lg border-l-2 border-orange-200">
                                "{p.observacao}"
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-none pt-3 sm:pt-0">
                          <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-sm ${
                            p.status === 'Pendente' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
                          }`}>
                            {p.status}
                          </span>
                          <p className="text-[10px] text-gray-300 font-bold uppercase mt-1">Registrado em {new Date().toLocaleDateString()}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-16 text-center">
                    <BookOpen className="mx-auto text-gray-200 mb-4" size={48} />
                    <p className="text-gray-400 font-bold italic">Nenhum pedido pendente na fila.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}