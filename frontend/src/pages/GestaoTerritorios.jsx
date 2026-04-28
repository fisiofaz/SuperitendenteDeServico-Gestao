import { useState } from 'react';
import { Input } from '../components/Input';

export function GestaoTerritorios() {
  const [numero, setNumero] = useState('');
  const [publicador, setPublicador] = useState('');
  const [dataSaida, setDataSaida] = useState('');

  const handleDesignar = (e) => {
    e.preventDefault();
    console.log("Designando território:", { numero, publicador, dataSaida });
    alert(`Território ${numero} entregue para ${publicador}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestão de Territórios - Tropical</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Coluna 1: Formulário de Designação */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-colors">
              Confirmar Designação
            </button>
          </form>
        </div>

        {/* Coluna 2: Status Rápido (Onde faremos a lista depois) */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h3 className="text-lg font-semibold mb-4 text-blue-800">Resumo</h3>
          <p className="text-sm text-blue-600">
            Aqui aparecerão os territórios que estão "na rua" e há quanto tempo.
          </p>
          {/* Futuramente faremos um .map() aqui para listar os cartões */}
        </div>
      </div>
    </div>
  );
}