import { Book, Map, Users, AlertTriangle } from 'lucide-react'; 

export function Dashboard({ totalPedidos, irPara }) {
  const indicadores = [
    { label: "Territórios na Rua", valor: "12", cor: "bg-blue-500", icon: <Map size={24}/>, acao: () => irPara('territorios') },
    { label: "Pedidos Pendentes", valor: totalPedidos, cor: "bg-orange-500", icon: <Book size={24}/>, acao: () => irPara('pedidos') },
    { label: "Servos Ativos", valor: "04", cor: "bg-green-500", icon: <Users size={24}/>, acao: () => irPara('admin') },
    { label: "Territórios Atrasados", valor: "02", cor: "bg-red-500", icon: <AlertTriangle size={24}/>, acao: () => irPara('territorios') },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Painel Geral - Congregação Tropical</h2>
      
      {/* Grade de Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {indicadores.map((ind, i) => (
          <div key={i} onClick={ind.acao} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all active:scale-95 group">
            <div className={`${ind.cor} p-3 rounded-xl text-white`}>
              {ind.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{ind.label}</p>
              <p className="text-2xl font-bold text-gray-800">{ind.valor}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Espaço para um gráfico ou lista rápida futuramente */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-64 flex items-center justify-center border-dashed border-2">
          <p className="text-gray-400">Gráfico de Cobertura de Território (Em breve)</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-64">
          <h3 className="font-bold text-gray-700 mb-4">Avisos Rápidos</h3>
          <ul className="space-y-3">
            <li className="text-sm text-gray-600 flex gap-2">
              <span className="text-red-500 font-bold">•</span> Cartão 05 está na rua há mais de 4 meses.
            </li>
            <li className="text-sm text-gray-600 flex gap-2">
              <span className="text-blue-500 font-bold">•</span> 3 novos pedidos de "Seja Feliz" aguardando consolidação.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}