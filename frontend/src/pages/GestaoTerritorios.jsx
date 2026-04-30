import { useState } from 'react';
import { Input } from '../components/Input';
import { Tabela } from '../components/Tabela';
import { Search, MessageCircle } from 'lucide-react';

export function GestaoTerritorios({ territorios, setTerritorios, aoConcluir }) {
  const [numero, setNumero] = useState('');
  const [publicador, setPublicador] = useState('');
  const [dataSaida, setDataSaida] = useState('');
  const [busca, setBusca] = useState('');

  const handleDesignar = (e) => {
    e.preventDefault();

    const dataInicio = new Date(dataSaida);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    dataInicio.setHours(0, 0, 0, 0);  
    let mesesCalculados = (hoje.getFullYear() - dataInicio.getFullYear()) * 12 + (hoje.getMonth() - dataInicio.getMonth());
    const mesesFinais = mesesCalculados < 0 ? 0 : mesesCalculados;

    const novaDesignacao = {
      id: Date.now(),
      numero: numero,
      nome: `Setor ${numero}`, 
      status: "Na Rua",
      publicador: publicador,
      dataSaida: dataSaida,
      meses: mesesFinais 
    };

    setTerritorios([...territorios, novaDesignacao]);
    
    // Limpa o formulário
    setNumero('');
    setPublicador('');
    setDataSaida('');
    alert(`Território ${numero} entregue para ${publicador}`);
  };

  const territoriosFiltrados = territorios.filter(t => 
    t.numero.includes(busca) || t.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const formatarDataBR = (dataString) => {
    if (!dataString || dataString === "-") return "-";   
    const [ano, mes, dia] = dataString.split("-");   
    return `${dia}/${mes}/${ano}`;
  };

  const gerarLinkWhatsapp = (territorio) => {
    const saudacao = "Olá! Segue a designação do seu território:";
    const mensagem = `${saudacao}%0A%0A*Nº:* ${territorio.numero}%0A*Local:* ${territorio.nome}%0A*Data de Saída:* ${territorio.dataSaida.split('-').reverse().join('/')}%0A%0ABom trabalho no campo! 📖`;  
    return `https://wa.me/?text=${mensagem}`;
  };

 return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 font-sans">Gestão de Territórios - Tropical</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Coluna 1: Formulário de Designação */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h3 className="text-lg font-semibold mb-4 text-blue-700">Designar Cartão</h3>
          <form onSubmit={handleDesignar}>
            <Input 
              label="Número do Território" 
              placeholder="Ex: 05" 
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
            <Input 
              label="Nome do Publicador" 
              placeholder="Quem vai trabalhar?" 
              value={publicador}
              onChange={(e) => setPublicador(e.target.value)}
            />
            <Input 
              label="Data de Saída" 
              type="date"
              value={dataSaida}
              onChange={(e) => setDataSaida(e.target.value)}
            />
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-colors mt-2">
              Confirmar Designação
            </button>
          </form>
        </div>

        {/* Coluna 2: Status Rápido (Onde faremos a lista depois) */}
        <div className="lg:col-span-2">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400 mt-6" />
            </div>
            <Input 
              label="Buscar Territórios" 
              placeholder="Digite o número ou nome..." 
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <Tabela 
            colunas={["Nº", "Localidade", "Status", "Saída", "Tempo", "Ações"]}
            dados={territoriosFiltrados.map(t => ({
              id: t.id,
              nome: t.numero,
              email: t.nome,
              perfil: t.status === "Na Rua" ? t.publicador : "Livre",
              campoExtra1: t.status === "Na Rua" ? formatarDataBR(t.dataSaida) : "-",
              campoExtra2: t.status === "Na Rua" ? (t.meses === 0 ? "Hoje" : `${t.meses}m`) : "-",
              acoesPersonalizadas: t.status === "Na Rua" ? (
                <a 
                  href={gerarLinkWhatsapp(t)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-green-100 p-1.5 rounded-full text-green-600 hover:bg-green-600 hover:text-white transition-all flex items-center justify-center"
                >
                  <MessageCircle size={16} strokeWidth={2.5} />
                </a>              
              ) : null                 
            }))}
            aoDeletar={(id) => setTerritorios(territorios.filter(t => t.id !== id))}
            aoRecuperar={aoConcluir}
          />          
        </div>
      </div>
    </div>
  );
}