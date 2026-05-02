import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { CadastroPublicacao } from './pages/CadastroPublicacao';
import { GestaoTerritorios } from './pages/GestaoTerritorios';
import { AdminUsuarios } from './pages/AdminUsuarios';
import { Dashboard } from './pages/Dashboard';
import { PedidosConsolidados } from './pages/PedidosConsolidados';
import { HistoricoS13 } from './pages/HistoricoS13';
import { ListaPublicadores } from './pages/ListaPublicadores';
import { CadastroTerritorio } from './pages/CadastroTerritorio';
import { GestaoEstoque } from './pages/GestaoEstoque';
import { VisualizarMapa } from './pages/VisualizarMapa';
import { PedidoCampanha } from './pages/PedidoCampanha';
import { PedidoNominal } from './pages/PedidoNominal';

function App() {
  const [tela, setTela] = useState('dashboard');
  const [isLogado, setIsLogado] = useState(false);   
  const [territorioSelecionado, setTerritorioSelecionado] = useState(null);

  // Estados com inicialização inteligente
  const [pedidos, setPedidos] = useState(() => JSON.parse(localStorage.getItem('pedidos_tropical')) || []);
  const [territorios, setTerritorios] = useState(() => JSON.parse(localStorage.getItem('territorios_tropical')) || [
    { id: 1, numero: "01", nome: "Centro - Setor A", status: "Livre", publicador: "-", meses: 0 }
  ]);
  const [historicoTerritorios, setHistoricoTerritorios] = useState(() => JSON.parse(localStorage.getItem('historico_s13')) || []);
  const [historicoMovimentacao, setHistoricoMovimentacao] = useState(() => JSON.parse(localStorage.getItem('historico_estoque')) || []);
  const [publicadores, setPublicadores] = useState(() => JSON.parse(localStorage.getItem('publicadores_tropical')) || []);
  const [estoque, setEstoque] = useState(() => JSON.parse(localStorage.getItem('estoque_tropical')) || []);
  const [campanhas, setCampanhas] = useState(() => JSON.parse(localStorage.getItem('campanhas_especiais')) || []);
  const [pedidosNominais, setPedidosNominais] = useState(() => JSON.parse(localStorage.getItem('pedidos_nominais')) || []);
  
  // Efeito Único de Persistência (Observa todas as mudanças de uma vez)
  useEffect(() => {
    const dados = {
      pedidos_tropical: pedidos,
      territorios_tropical: territorios,
      historico_s13: historicoTerritorios,
      publicadores_tropical: publicadores,
      estoque_tropical: estoque,
      campanhas_especiais: campanhas,
      pedidos_nominais: pedidosNominais,
      historico_estoque: historicoMovimentacao
    };

    Object.entries(dados).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }, [pedidos, territorios, historicoTerritorios, publicadores, estoque, campanhas, pedidosNominais, historicoMovimentacao]);
  
  // Funções de Negócio
  const salvarPedidoCampanha = (novaCampanha) => {
    setCampanhas([...campanhas, { ...novaCampanha, id: Date.now() }]);
    setTela('dashboard');
  };

  const salvarPedidoNominal = (novoPedido) => {
    setPedidosNominais([...pedidosNominais, { ...novoPedido, id: Date.now(), data: new Date() }]);
  };

  const concluirComRelatorio = (id, notas) => {
    const territorio = territorios.find(t => t.id === id);
    const novoRegistro = {
      id: Date.now(),
      numero: territorio.numero,
      publicador: territorio.publicador,
      dataSaida: territorio.dataSaida,
      dataRetorno: new Date().toISOString().split('T')[0],
      observacoes: notas
    };
    setHistoricoTerritorios([...historicoTerritorios, novoRegistro]);
    setTerritorios(territorios.map(t => 
      t.id === id ? { ...t, status: "Livre", publicador: "-", dataSaida: "-", meses: 0 } : t
    ));
  };

  const atualizarQuantidadeEstoque = (itemId, qtdAlterada) => {
    const itemAfetado = estoque.find(i => i.id === itemId);
    setEstoque(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantidadeAtual: (item.quantidadeAtual || 0) + qtdAlterada } : item
    ));

    const novoMovimento = {
      id: Date.now(),
      data: new Date().toISOString().split('T')[0],
      itemNome: itemAfetado?.nome || "Item Desconhecido",
      tipo: qtdAlterada > 0 ? 'entrada' : 'saída',
      quantidade: Math.abs(qtdAlterada),
      publicador: "Balcão"
    };
    setHistoricoMovimentacao([novoMovimento, ...historicoMovimentacao]);
  };

  const adicionarNovoTerritorio = (dados) => {
    const novo = { 
      id: Date.now(), 
      ...dados, 
      status: "Livre", 
      publicador: "-", 
      dataSaida: "-", 
      meses: 0 
    };
    setTerritorios([...territorios, novo].sort((a, b) => 
     a.numero.localeCompare(b.numero, undefined, { numeric: true })
    ));
  };

  const deletarPedido = (id) => {
    if (window.confirm("Deseja remover este pedido da lista?")) {
    setPedidos(prev => prev.filter(p => p.id !== id));
    }
  };

  const marcarComoEntregue = (id) => {  
    setPedidos(prev => prev.map(p => 
      p.id === id ? { ...p, status: 'Entregue' } : p
    ));
    alert("Pedido marcado como entregue com sucesso!");
  };


  // Renderizador de Telas (Centralizado para melhor manutenção)
  const renderizarTela = () => {
    const telas = {
      dashboard: <Dashboard irPara={setTela} totalPedidos={pedidos.length} totalRegistros={historicoTerritorios.length} totalTerritoriosRua={territorios.filter(t => t.status === "Na Rua").length} />,
      territorios: <GestaoTerritorios territorios={territorios} setTerritorios={setTerritorios} aoConcluir={concluirComRelatorio} listaPublicadores={publicadores} />,
      cadastro_territorio: <CadastroTerritorio territorios={territorios} setTerritorios={setTerritorios} aoAdicionar={adicionarNovoTerritorio} />,
      visualizar_mapa: <VisualizarMapa territorios={territorios} territorioSelecionado={territorioSelecionado} setTerritorioSelecionado={setTerritorioSelecionado} />,
      publicadores: <ListaPublicadores publicadores={publicadores} setPublicadores={setPublicadores} />,
      publicacoes: <CadastroPublicacao estoque={estoque} setEstoque={setEstoque} />,
      gestao_estoque: <GestaoEstoque estoque={estoque} atualizarQuantidade={atualizarQuantidadeEstoque} historicoMovimentacao={historicoMovimentacao} voltar={() => setTela('dashboard')} />,
      pedido_campanha: <PedidoCampanha salvarPedidoCampanha={salvarPedidoCampanha} />,
      pedido_nominal: <PedidoNominal publicadores={publicadores} estoque={estoque} pedidosExistentes={pedidosNominais} salvarPedido={salvarPedidoNominal} />,
      admin: <AdminUsuarios />,
      pedidos: <PedidosConsolidados pedidos={pedidos} setPedidos={setPedidos} aoDeletar={(id) => setPedidos(pedidos.filter(p => p.id !== id))} aoEntregar={() => alert("Entregue!")} />,
      pedidos_consolidados: <PedidosConsolidados pedidos={pedidos} setPedidos={setPedidos} aoDeletar={deletarPedido} aoEntregar={marcarComoEntregue} />,
      historico: <HistoricoS13 registros={historicoTerritorios} setRegistros={setHistoricoTerritorios} voltar={() => setTela('dashboard')} />
    };
    return telas[tela] || telas.dashboard;
  }; 
     
  if (!isLogado) return <Login onLogin={() => setIsLogado(true)} />;

  return (
   <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar telaAtiva={tela} setTela={setTela} aoSair={() => setIsLogado(false)} />

      {/* Container Responsivo: Ajusta o padding conforme o dispositivo */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4 md:py-8">
        <div className="bg-white/40 backdrop-blur-sm rounded-4xl min-h-[calc(100vh-120px)] shadow-inner-light p-2 sm:p-4">
          {renderizarTela()}
        </div>
      </main>

      {/* Rodapé Simples para Tablets/PC */}
      <footer className="hidden md:block py-4 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
        Sistema Gestão do Serviço — Congregação Tropical — v1.0
      </footer>
    </div>
  )
}

export default App