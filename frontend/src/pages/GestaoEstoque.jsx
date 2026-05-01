import { useState } from 'react';
import { Tabela } from '../components/Tabela';
import { PackagePlus, PackageMinus, History, Search, Printer } from 'lucide-react'; // Adicionado Printer
import { gerarPDF_Estoque } from '../services/relatorioService'; // Importando o serviço

export function GestaoEstoque({ estoque, atualizarQuantidade, historicoMovimentacao = [] }) {
  const [busca, setBusca] = useState('');

  const estoqueFiltrado = (estoque || []).filter(item => 
    item.nome.toLowerCase().includes(busca.toLowerCase()) || 
    item.sigla.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
            <History size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Estoque</h2>
            <p className="text-sm text-gray-500">Saldo atual e movimentações</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Botão de Exportação para o Superintendente */}
          <button 
            onClick={() => gerarPDF_Estoque(historicoMovimentacao)}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-2xl font-bold shadow-lg shadow-green-100 transition-all active:scale-95 text-sm"
          >
            <Printer size={18} />
            Relatório para Circuito
          </button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Buscar item..."
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 transition-all w-48 md:w-64"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-4xl shadow-sm border border-gray-100 overflow-hidden">
        <Tabela 
          colunas={["Sigla", "Publicação", "Saldo Atual", "Ações"]}
          dados={estoqueFiltrado.map(item => ({
            id: item.id,
            // Texto puro para evitar o erro de 'includes' na busca da Tabela
            nome: item.sigla.toUpperCase(),
            email: item.nome,
            status: `${item.quantidadeAtual || 0} un`,
            acoesPersonalizadas: (
              <div className="flex gap-2">
                <button 
                  onClick={() => atualizarQuantidade(item.id, 1)}
                  className="bg-green-50 text-green-600 p-2 rounded-lg hover:bg-green-100 transition-colors"
                  title="Entrada de Estoque"
                >
                  <PackagePlus size={18} />
                </button>
                <button 
                  onClick={() => item.quantidadeAtual > 0 && atualizarQuantidade(item.id, -1)}
                  className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors"
                  title="Saída (Entrega)"
                >
                  <PackageMinus size={18} />
                </button>
              </div>
            )
          }))}
        />
      </div>
    </div>
  );
}