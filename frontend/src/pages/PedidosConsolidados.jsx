import { useState } from 'react';
import { Tabela } from '../components/Tabela';
import { Input } from '../components/Input';
import { ClipboardCheck, Plus, Package, Trash2, CheckCircle } from 'lucide-react';

export function PedidosConsolidados({ pedidos, setPedidos, aoDeletar, aoEntregar }) {
  const [nomePublicador, setNomePublicador] = useState('');
  const [siglaPublicacao, setSiglaPublicacao] = useState('')

  const adicionarPedido = (e) => {
    e.preventDefault();
    if (!nomePublicador || !siglaPublicacao) return;
    
    const novoPedido = {
      id: Date.now(),
      publicador: nomePublicador,
      publicacao: "Publicação " + siglaPublicacao.toUpperCase(),
      sigla: siglaPublicacao.toLowerCase(),
      status: "Pedido"
    };

    setPedidos([...pedidos, novoPedido]);  
    setNomePublicador('');
    setSiglaPublicacao('');
  };

  const consolidado = pedidos.reduce((acc, pedido) => {
    acc[pedido.sigla] = (acc[pedido.sigla] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 animate-in fade-in duration-500">
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
            <ClipboardCheck size={24} className="text-blue-600" /> Controle de Pedidos
          </h2>
          <p className="text-sm text-gray-500 font-medium">Consolidação para o formulário oficial</p>
        </div>
      </header>     

     {/* Formulário Rápido Responsivo */}
      <form 
        onSubmit={adicionarPedido} 
        className="bg-white p-5 rounded-4xl shadow-sm border border-gray-100 mb-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
      >
        <div className="md:col-span-6">
          <Input 
            label="Nome do Publicador" 
            value={nomePublicador} 
            onChange={(e) => setNomePublicador(e.target.value)} 
            placeholder="Quem pediu?"
          />
        </div>
        <div className="md:col-span-3">
          <Input 
            label="Sigla" 
            value={siglaPublicacao} 
            onChange={(e) => setSiglaPublicacao(e.target.value)} 
            placeholder="ex: lff"
          />
        </div>
        <div className="md:col-span-3">
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white h-13 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 active:scale-95"
          >
            <Plus size={20} /> <span className="md:hidden lg:inline">Anotar Pedido</span>
          </button>
        </div>
      </form>

      <div className="flex overflow-x-auto gap-4 pb-4 md:grid md:grid-cols-4 md:overflow-visible mb-8 scrollbar-hide">
        {Object.entries(consolidado).map(([sigla, total]) => (
          <div key={sigla} className="min-w-35 shrink-0 bg-[#1e3a8a] text-white p-5 rounded-3xl shadow-lg border-b-4 border-blue-400 animate-in zoom-in duration-300">
            <div className="flex items-center gap-2 opacity-70 mb-2">
              <Package size={14} />
              <span className="text-[10px] uppercase font-black tracking-widest">{sigla}</span>
            </div>
            <p className="text-3xl font-black">{total} <span className="text-xs font-light">un.</span></p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <Tabela 
            colunas={["Publicador", "Item", "Sigla", "Ações"]} 
            dados={pedidos.map(p => ({
              id: p.id,
              nome: <span className="font-bold text-gray-700">{p.publicador}</span>,
              email: p.publicacao,
              perfil: <span className="font-black text-blue-600 uppercase">{p.sigla}</span>,
              acoesPersonalizadas: (
                <div className="flex gap-2">
                   <button onClick={() => aoEntregar(p.id)} className="p-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all">
                    <CheckCircle size={18} />
                  </button>
                  <button onClick={() => aoDeletar(p.id)} className="p-2 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              )
            }))}
            aoEditar={() => alert("Função em breve!")}
          />
        </div>
      </div>
    </div>
  );
}