import { 
  Book, Map, Users, ArrowRight, Package,
  AlertTriangle, History, ClipboardCheck 
} from 'lucide-react'; 


export function Dashboard({ 
  totalPedidos, 
  irPara, 
  totalRegistros = 0, 
  totalTerritoriosRua = 0,
  estoque = []
}) {

  const itensCriticos = estoque.filter(item => 
    (item.quantidadeAtual || 0) < (item.estoqueMinimo || 0)
  ); 

  const cards = [

    {
      id: 'publicadores',
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
    <div className="max-w-6xl mx-auto p-4 md:p-6 animate-in fade-in duration-500">
      <header className="mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-black text-gray-800 mb-2 text-center uppercase tracking-tight">
          Painel Geral
        </h2>
        <p className="text-sm md:text-base text-gray-500 text-center font-medium">
          Congregação Tropical - Sistema de Apoio ao Superintendente
        </p>
      </header>    
      
      {/* Grade de Indicadores: 1 col no mobile, 2 no tablet, 3 no desktop*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-10">
        {cards.map((card) => (
          <div 
            key={card.id} 
            onClick={() => irPara(card.id)} 
            className="bg-white p-6 md:p-8 rounded-4xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between min-h-55 md:h-64"
          >
            <div>
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className={`p-3 md:p-4 ${card.corFundo} ${card.corIcone} rounded-2xl ${card.corHover} group-hover:text-white transition-all duration-300`}>
                  {card.icon}
                </div>
                <span className="text-[10px] md:text-xs font-black text-gray-400 bg-gray-50 px-3 py-1 rounded-full uppercase tracking-widest">
                  {card.valor}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-gray-800 group-hover:text-blue-600 transition-colors leading-tight">
                {card.titulo}
              </h3>
              <p className="text-sm md:text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2">
                {card.desc}
              </p>
            </div>
            <div className="flex items-center text-[10px] md:text-xs font-black text-gray-400 group-hover:text-gray-800 transition-colors uppercase tracking-widest mt-4">
              Acessar módulo <ArrowRight size={16} className="ml-2 group-hover:ml-4 transition-all" />
            </div>
          </div>
        ))}
      </div>

      {/* ÁREA DE ALERTAS DINÂMICOS */}
      <div className="grid grid-cols-1 gap-4 mt-10">

        {/* NOVO ALERTA: Estoque Baixo */}
        {itensCriticos.length > 0 && (
          <div 
            className="bg-amber-50/50 backdrop-blur-md border border-amber-200 rounded-4xl p-5 md:p-6 flex items-center justify-between group cursor-pointer hover:bg-white hover:shadow-lg transition-all duration-500"
            onClick={() => irPara('gestao_estoque')}              
          >
            <div className="flex items-center gap-4">
              <div className="bg-amber-500 text-whitep-3 md:p-4 rounded-2xl shadow-lg animate-pulse">
                <Package size={20} />
              </div>
              <div>
                <h4 className="font-black text-amber-800 text-xs md:text-sm uppercase tracking-wider">Reposição Necessária</h4>
                <p className="text-amber-700 text-[10px] md:text-xs font-medium mt-1">
                  Existem {itensCriticos.length} itens abaixo do estoque mínimo. Clique para conferir as quantidades.
                </p>
              </div>
            </div>           
             <ArrowRight size={20} className="text-amber-400 group-hover:text-amber-600 transition-all" />            
          </div>
        )}
        {/* Territórios Atrasados */}
        <div className="bg-red-50/50 backdrop-blur-md border border-red-200 rounded-4xl p-5 md:p-6 flex items-center gap-4 group hover:bg-white transition-all duration-500">
          <div className="bg-red-500 text-white p-3 md:p-4 rounded-2xl">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h4 className="font-black text-red-900 text-xs md:text-sm uppercase tracking-wider italic">Prazos de Territórios</h4>
            <p className="text-red-700/80 text-[10px] md:text-xs font-medium mt-1">
              Atenção: 2 cartões ultrapassaram o limite de 4 meses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}