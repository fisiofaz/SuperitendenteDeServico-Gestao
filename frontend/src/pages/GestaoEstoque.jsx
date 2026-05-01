import { useState } from 'react'; // Agora será usado!
import { Tabela } from '../components/Tabela';
import { PackagePlus, PackageMinus, History, Search } from 'lucide-react';

export function GestaoEstoque({ estoque, atualizarQuantidade }) {
  const [busca, setBusca] = useState('');

  // Filtra a lista em tempo real
  const estoqueFiltrado = estoque.filter(item => 
    item.nome.toLowerCase().includes(busca.toLowerCase()) || 
    item.sigla.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
            <History size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Movimentação de Estoque</h2>
            <p className="text-sm text-gray-500">Registre entradas ou saídas de itens</p>
          </div>
        </div>

        {/* Campo de Busca que justifica o useState */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Buscar por sigla ou nome..."
            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 transition-all w-64"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <Tabela 
          colunas={["Sigla", "Publicação", "Saldo Atual", "Ações"]}
          dados={estoqueFiltrado.map(item => ({ // Usando a lista filtrada aqui
            id: item.id,
            nome: item.sigla.toUpperCase(),
            email: item.nome,
            status: (
              <span className={`font-bold ${item.quantidadeAtual < item.estoqueMinimo ? 'text-red-500' : 'text-green-600'}`}>
                {item.quantidadeAtual || 0} un
              </span>
            ),
            acoesPersonalizadas: (
              <div className="flex gap-2">
                <button 
                  onClick={() => atualizarQuantidade(item.id, 1)}
                  className="bg-green-50 text-green-600 p-2 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <PackagePlus size={18} />
                </button>
                <button 
                  onClick={() => item.quantidadeAtual > 0 && atualizarQuantidade(item.id, -1)}
                  className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors"
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