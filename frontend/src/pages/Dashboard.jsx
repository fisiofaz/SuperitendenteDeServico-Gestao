import { Book, Map, Users, AlertTriangle, History, ClipboardCheck } from 'lucide-react'; 

export function Dashboard({ totalPedidos, irPara, totalRegistros = 0, totalTerritoriosRua = 0 }) {
  const cards = [
    {
      id: 'admin',
      titulo: "Servos e Publicadores",
      desc: "Gerenciar a lista de irmãos autorizados e suas permissões.",
      valor: "04 Ativos",
      corFundo: "bg-green-100",
      corIcone: "text-green-600",
      corHover: "group-hover:bg-green-500",
      icon: <Users size={24} /> // AQUI o ícone é utilizado
    },
    {
      id: 'territorios',
      titulo: "Gestão de Territórios",
      desc: "Designar cartões, ver quem está com qual setor e tempo de saída.",
      valor: `${totalTerritoriosRua} na rua`,
      corFundo: "bg-blue-100",
      corIcone: "text-blue-600",
      corHover: "group-hover:bg-blue-500",
      icon: <Map size={24} />
    },
    {
      id: 'historico',
      titulo: "Histórico S-13",
      desc: "Consulte todos os retornos e observações feitas pelos publicadores.",
      valor: `${totalRegistros} registros`,
      corFundo: "bg-purple-100",
      corIcone: "text-purple-600",
      corHover: "group-hover:bg-purple-500",
      icon: <History size={24} />
    },
    {
      id: 'pedidos',
      titulo: "Pedidos de Publicações",
      desc: "Gerencie pedidos de bíblias, livros e folhetos da congregação.",
      valor: `${totalPedidos} pendentes`,
      corFundo: "bg-orange-100",
      corIcone: "text-orange-600",
      corHover: "group-hover:bg-orange-500",
      icon: <Book size={24} />
    },
    {
      id: 'relatorios', // Futura implementação que sugerimos
      titulo: "Relatório Mensal",
      desc: "Totalizar as horas e atividades da congregação para o Escritório.",
      valor: "Pronto p/ Junho",
      corFundo: "bg-green-100",
      corIcone: "text-green-600",
      corHover: "group-hover:bg-green-500",
      icon: <ClipboardCheck size={24} />
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Painel Geral - Congregação Tropical</h2>
        <p className="text-gray-500 text-center">Congregação Tropical - Sistema de Apoio ao Superintendente</p>
      </header>    
      
      {/* Grade de Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {cards.map((card) => (
          <div 
            key={card.id} 
            onClick={() => irPara(card.id)} 
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between h-64"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 ${card.corFundo} ${card.corIcone} rounded-2xl ${card.corHover} group-hover:text-white transition-all duration-300`}>
                  {card.icon}
                </div>
                <span className="text-sm font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full uppercase tracking-widest">
                  {card.valor}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {card.titulo}
              </h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {card.desc}
              </p>
            </div>
            <div className="flex items-center text-sm font-bold text-gray-400 group-hover:text-gray-800 transition-colors">
              Acessar módulo <span className="ml-2 group-hover:ml-4 transition-all">→</span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-red-50 border border-red-100 rounded-3xl p-6 flex items-center gap-4">
        <div className="bg-red-500 text-white p-2 rounded-full">
          <AlertTriangle size={20} />
        </div>
        <div>
          <h4 className="font-bold text-red-800 text-sm">Atenção Prioritária</h4>
          <p className="text-red-600 text-xs">Existem 2 territórios que ultrapassaram o prazo de 4 meses. Verifique o histórico para contatar os publicadores.</p>
        </div>
      </div>
    </div>
  );
}