import { useState } from 'react';
import { Tabela } from '../components/Tabela';
import { PackagePlus, PackageMinus, History, Search, Printer, ArrowLeft } from 'lucide-react'; 
import { gerarPDF_Estoque } from '../services/relatorioService'; 

export function GestaoEstoque({ estoque, atualizarQuantidade, historicoMovimentacao = [], voltar }) {
  const [busca, setBusca] = useState('');

  const estoqueFiltrado = (estoque || []).filter(item => 
    item.nome.toLowerCase().includes(busca.toLowerCase()) || 
    item.sigla.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 animate-in fade-in duration-500">
      {/* Cabeçalho Responsivo */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={voltar}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors lg:hidden"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl shadow-sm shadow-amber-100">
              <History size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Estoque</h2>
              <p className="text-sm text-gray-500 font-medium">Saldo atual e movimentações</p>
            </div>
          </div>          
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Campo de Busca Otimizado*/}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar item..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all shadow-sm"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          {/* Botão de Exportação */}
          <button 
            onClick={() => gerarPDF_Estoque(historicoMovimentacao)}
            className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-green-100 transition-all active:scale-95 text-sm"
          >
            <Printer size={18} />
            Relatório para Circuito
          </button>
        </div>
      </div>

      {/* Container da Tabela com Scroll Horizontal para Mobile */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <Tabela  
            colunas={["Sigla", "Publicação", "Saldo Atual", "Ações"]}
            dados={estoqueFiltrado.map(item => ({
              id: item.id,            
              nome: <span className="font-bold text-amber-700">{item.sigla.toUpperCase()}</span>,
              email: <span className="font-medium text-gray-700">{item.nome}</span>,
              status: (
                <span className={`font-black ${item.quantidadeAtual < (item.estoqueMinimo || 5) ? 'text-red-500' : 'text-gray-600'}`}>
                  {item.quantidadeAtual || 0} un
                </span>
              ),
              acoesPersonalizadas: (
                <div className="flex gap-2">
                  <button 
                    onClick={() => atualizarQuantidade(item.id, 1)}
                    className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all"
                    title="Entrada (+1)"
                  >
                    <PackagePlus size={20} />
                  </button>
                  <button 
                    onClick={() => item.quantidadeAtual > 0 && atualizarQuantidade(item.id, -1)}
                    className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                    title="Saída (-1)"
                  >
                    <PackageMinus size={20} />
                  </button>
                </div>
              )
            }))}
            aoDeletar={() => {}} 
            aoRecuperar={() => {}}
            aoEditar={() => {}}
          />
        </div>
      </div>
    </div>
  );
}