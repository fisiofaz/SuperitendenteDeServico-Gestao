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


function App() {
  const [tela, setTela] = useState('dashboard');
  const [isLogado, setIsLogado] = useState(false);   
  const [pedidos, setPedidos] = useState(() => {
    const salvos = localStorage.getItem('pedidos_tropical');
    return salvos ? JSON.parse(salvos) : [];
  });
  const [territorios, setTerritorios] = useState(() => {
    const salvos = localStorage.getItem('territorios_tropical');
    return salvos ? JSON.parse(salvos) : [
      { id: 1, numero: "01", nome: "Centro - Setor A", status: "Livre", publicador: "-", meses: 0 }
    ];
  });

  const [historicoTerritorios, setHistoricoTerritorios] = useState(() => {
    const salvos = localStorage.getItem('historico_s13');
    return salvos ? JSON.parse(salvos) : [];
  });

  const [publicadores, setPublicadores] = useState(() => {
    const salvos = localStorage.getItem('publicadores_tropical');
    return salvos ? JSON.parse(salvos) : [];
  });

  const [estoque, setEstoque] = useState(() => {
    const salvos = localStorage.getItem('estoque_tropical');
    return salvos ? JSON.parse(salvos) : [];
  });

  const [movimentacoes, setMovimentacoes] = useState(() => {
    const salvos = localStorage.getItem('movimentacoes_tropical');
    return salvos ? JSON.parse(salvos) : [];
  });

  useEffect(() => {
    localStorage.setItem('pedidos_tropical', JSON.stringify(pedidos));
  }, [pedidos]);

  useEffect(() => {
    localStorage.setItem('territorios_tropical', JSON.stringify(territorios));
  }, [territorios]);

  useEffect(() => {
    localStorage.setItem('historico_s13', JSON.stringify(historicoTerritorios));
  }, [historicoTerritorios]);

  useEffect(() => {
    localStorage.setItem('publicadores_tropical', JSON.stringify(publicadores));
  }, [publicadores]);

  useEffect(() => {
    localStorage.setItem('estoque_tropical', JSON.stringify(estoque));
  }, [estoque]);

  useEffect(() => {
    localStorage.setItem('movimentacoes_tropical', JSON.stringify(movimentacoes));
  }, [movimentacoes]);

  const deletarPedido = (id) => {
    if (window.confirm("Remover este pedido?")) {
      setPedidos(pedidos.filter(p => p.id !== id));
    }
  };
  
  const marcarComoEntregue = (id) => {
  // Muda o status para entregue ou remove da lista, como você preferir
    alert("Pedido marcado como entregue!");
    setPedidos(pedidos.filter(p => p.id !== id)); 
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
  
    // Limpa o território atual
    setTerritorios(territorios.map(t => 
      t.id === id ? { ...t, status: "Livre", publicador: "-", dataSaida: "-", meses: 0 } : t
    ));
  };

  const adicionarNovoTerritorio = (dados) => {
    const novo = {
      id: Date.now(),
      numero: dados.numero,
      nome: dados.nome,
      status: "Livre",
      publicador: "-",
      dataSaida: "-",
      meses: 0
    };
    setTerritorios([...territorios, novo].sort((a, b) => a.numero - b.numero));
  };

  const atualizarQuantidadeEstoque = (itemId, qtdAlterada) => {
    setEstoque(prevEstoque => prevEstoque.map(item => {
      if (item.id === itemId) {
        return { ...item, quantidadeAtual: (item.quantidadeAtual || 0) + qtdAlterada };
      }
      return item;
    }));
  };

     
  if (!isLogado) {
    return <Login onLogin={() => setIsLogado(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        telaAtiva={tela} 
        setTela={setTela} 
        aoSair={() => setIsLogado(false)} 
      />
      <main className="container mx-auto mt-6 px-4">
        {tela === 'dashboard' && (
          <Dashboard 
            irPara={setTela}
            totalPedidos={pedidos.length}
            totalRegistros={historicoTerritorios.length}
            totalTerritoriosRua={territorios.filter(t => t.status === "Na Rua").length}
          />
        )}

        {tela === 'territorios' && (
          <GestaoTerritorios 
            territorios={territorios}
            setTerritorios={setTerritorios}
            aoConcluir={concluirComRelatorio}
            listaPublicadores={publicadores}
          />
        )}
        {tela === 'cadastro_territorio' && (
          <CadastroTerritorio 
            territorios={territorios} 
            setTerritorios={setTerritorios} 
            aoAdicionar={adicionarNovoTerritorio} // <-- AQUI a função é usada!
          />
        )}

        {tela === 'publicadores' && (
          <ListaPublicadores 
            publicadores={publicadores} 
            setPublicadores={setPublicadores} 
          />
        )}

        {tela === 'publicacoes' && (
          <CadastroPublicacao 
            estoque={estoque} 
            setEstoque={setEstoque}
            movimentacoes={movimentacoes}
            setMovimentacoes={setMovimentacoes}
          />
        )}

        {tela === 'gestao_estoque' && (
          <GestaoEstoque 
            estoque={estoque} 
            atualizarQuantidade={atualizarQuantidadeEstoque}
          />
        )}

        {tela === 'admin' && <AdminUsuarios />}

        {tela === 'pedidos' && (
          <PedidosConsolidados 
            pedidos={pedidos} 
            setPedidos={setPedidos} 
            aoDeletar={deletarPedido}
            aoEntregar={marcarComoEntregue}
          />
        )}

        {tela === 'historico' && (
          <HistoricoS13 
            registros={historicoTerritorios} 
            setRegistros={setHistoricoTerritorios} 
          />
        )}
      </main>
    </div>
  )
}

export default App