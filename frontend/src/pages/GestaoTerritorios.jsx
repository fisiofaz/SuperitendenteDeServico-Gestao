import { useState } from 'react';
import { Input } from '../components/Input';
import { Tabela } from '../components/Tabela';
import { Search } from 'lucide-react';

export function GestaoTerritorios({ territorios, setTerritorios }) {
  const [numero, setNumero] = useState('');
  const [publicador, setPublicador] = useState('');
  const [dataSaida, setDataSaida] = useState('');
  const [busca, setBusca] = useState('');

  const handleDesignar = (e) => {
    e.preventDefault();
    
    // Criamos o novo registro de designação
    const novaDesignacao = {
      id: Date.now(),
      numero: numero,
      nome: `Setor ${numero}`, // Podemos ajustar o nome depois
      status: "Na Rua",
      publicador: publicador,
      meses: 0 // Começa com 0 meses
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

  return (
    <div className="max-w-4xl mx-auto p-4">
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
              <Search size={18} className="text-gray-400" />
            </div>
            <Input 
              label="Buscar Territórios" 
              placeholder="Digite o número ou nome..." 
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <Tabela 
            colunas={["Nº", "Localidade", "Responsável", "Ações"]}
            dados={territoriosFiltrados.map(t => ({
              id: t.id,
              nome: t.numero,
              email: t.nome,
              perfil: (
                <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                  t.meses >= 4 ? 'bg-red-100 text-red-700' : 
                  t.status === "Na Rua" ? 'bg-blue-100 text-blue-700' : 
                  'bg-green-100 text-green-700'
                }`}>
                  {t.status === "Na Rua" ? `Com: ${t.publicador}` : "Livre"}
                </span>
              ),
              acoes: t.status
            }))}
            aoDeletar={(id) => setTerritorios(territorios.filter(t => t.id !== id))}
            aoRecuperar={(id) => alert("Gerando S-13 para o cartão " + id)}
          />          
        </div>
      </div>
    </div>
  );
}