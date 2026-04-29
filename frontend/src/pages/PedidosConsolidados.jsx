import { useState } from 'react';
import { Tabela } from '../components/Tabela';
import { Input } from '../components/Input';

export function PedidosConsolidados() {
  const [pedidos, setPedidos] = useState([
    { id: 1, publicador: "Irmão João", publicacao: "Seja Feliz para Sempre!", sigla: "lff", status: "Pedido" }
  ]);

  // Estados para o novo pedido
  const [nomePublicador, setNomePublicador] = useState('');
  const [siglaPublicacao, setSiglaPublicacao] = useState('');

  // A função que vai USAR o setPedidos e limpar o erro
  const adicionarPedido = (e) => {
    e.preventDefault();
    
    const novoPedido = {
      id: Date.now(),
      publicador: nomePublicador,
      publicacao: "Publicação " + siglaPublicacao, // Aqui depois buscaremos o nome real pela sigla
      sigla: siglaPublicacao.toLowerCase(),
      status: "Pedido"
    };

    setPedidos([...pedidos, novoPedido]); // O setPedidos está sendo usado aqui!
    
    // Limpa os campos
    setNomePublicador('');
    setSiglaPublicacao('');
  };

  // Lógica de Consolidação (Soma os pedidos por sigla)
  const consolidado = pedidos.reduce((acc, pedido) => {
    acc[pedido.sigla] = (acc[pedido.sigla] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Controle de Pedidos Especiais</h2>

      {/* Formulário Rápido para o Servo de Publicações */}
      <form onSubmit={adicionarPedido} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-50">
          <Input 
            label="Nome do Publicador" 
            value={nomePublicador} 
            onChange={(e) => setNomePublicador(e.target.value)} 
            placeholder="Quem pediu?"
          />
        </div>
        <div className="w-32">
          <Input 
            label="Sigla" 
            value={siglaPublicacao} 
            onChange={(e) => setSiglaPublicacao(e.target.value)} 
            placeholder="ex: lff"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all mb-4">
          Anotar Pedido
        </button>
      </form>

      {/* Cards de Consolidação */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Object.entries(consolidado).map(([sigla, total]) => (
          <div key={sigla} className="bg-blue-900 text-white p-4 rounded-xl shadow-md border-b-4 border-blue-400">
            <span className="text-xs uppercase font-bold opacity-70">Total {sigla}</span>
            <p className="text-2xl font-bold">{total} <span className="text-sm font-normal">un.</span></p>
          </div>
        ))}
      </div>

      <Tabela 
        colunas={["Publicador", "Item", "Sigla", "Status"]} 
        dados={pedidos.map(p => ({
          nome: p.publicador,
          email: p.publicacao,
          perfil: p.sigla,
          acoes: p.status
        }))}
        aoDeletar={(id) => setPedidos(pedidos.filter(p => p.id !== id))}
        aoRecuperar={() => {}}
      />
    </div>
  );
}