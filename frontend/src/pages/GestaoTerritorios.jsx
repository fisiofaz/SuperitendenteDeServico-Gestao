import { useState } from 'react';
import { Input } from '../components/Input';
import { Tabela } from '../components/Tabela';

export function GestaoTerritorios({ territorios, setTerritorios }) {
  const [numero, setNumero] = useState('');
  const [publicador, setPublicador] = useState('');
  const [dataSaida, setDataSaida] = useState('');

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
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Territórios na Rua</h3>
          <Tabela 
            colunas={["Nº", "Localidade", "Responsável", "Ações"]}
            dados={territorios.map(t => ({
              id: t.id,
              nome: t.numero,
              email: t.nome,
              perfil: t.publicador,
              acoes: t.status
            }))}
            aoDeletar={(id) => setTerritorios(territorios.filter(t => t.id !== id))}
            aoRecuperar={(id) => alert("Gerar relatório de retorno para o ID: " + id)}
          />          
        </div>
      </div>
    </div>
  );
}