import { Map as MapIcon, Maximize2, Navigation, MapPin, Search } from 'lucide-react';

export function VisualizarMapa({ territorios, territorioSelecionado, setTerritorioSelecionado }) {
  
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 animate-in fade-in duration-500">
      
      {/* Cabeçalho Responsivo */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 text-green-600 rounded-2xl shadow-sm shadow-green-100">
            <MapIcon size={28} /> 
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-800 tracking-tight">Visualização de Mapas</h2>
            <p className="text-sm text-gray-500 font-medium">Geolocalização dos setores da congregação</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Lista Lateral (No Mobile vira uma barra de seleção superior) */}
        <div className="lg:col-span-1 bg-white p-4 rounded-4xl shadow-sm border border-gray-100 flex flex-col h-fit lg:h-150">
          <h3 className="font-black text-gray-700 mb-4 px-2 flex items-center gap-2 border-b border-gray-50 pb-3 uppercase text-xs tracking-widest">
            <MapPin size={16} className="text-blue-600" />
            Cartões Disponíveis
          </h3>
          
          {/* Scroll horizontal no Mobile, vertical no Desktop */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto pb-2 lg:pb-0 scrollbar-hide">
            {territorios.length > 0 ? (
              territorios.map((ter) => (
                <button 
                  key={ter.id}
                  onClick={() => setTerritorioSelecionado(ter)}
                  className={`min-w-40 lg:min-w-0 text-left p-4 rounded-2xl transition-all border-2 ${
                    territorioSelecionado?.id === ter.id 
                      ? 'border-blue-500 bg-blue-50 shadow-md scale-95' 
                      : 'border-transparent bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="font-black text-blue-900 text-sm">Cartão {ter.numero}</div>
                  <div className="text-[10px] text-gray-500 font-bold truncate uppercase">{ter.nome || 'Setor não nomeado'}</div>
                </button>
              ))
            ) : (
              <div className="text-center py-10 w-full">
                <p className="text-sm text-gray-400 italic font-medium">Nenhum cartão cadastrado.</p>
              </div>
            )}
          </div>
        </div>

        {/* Área do Mapa (O "Coração" do componente) */}
        <div className="lg:col-span-3 relative bg-slate-100 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl flex items-center justify-center min-h-100 lg:h-150 group">
          
          {/* Grid de fundo para simular um mapa enquanto o backend não envia os dados reais */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#1e3a8a 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
          </div>

          <div className="relative text-center z-10 p-8">
            <div className="bg-white p-6 rounded-4xl shadow-2xl inline-block mb-6 animate-bounce duration-2000">
              <Navigation className="text-blue-600 fill-blue-50" size={48} />
            </div>
            
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-4xl border border-white shadow-xl">
              <h3 className="text-2xl font-black text-gray-800 tracking-tight">
                {territorioSelecionado 
                  ? `Território ${territorioSelecionado.numero}` 
                  : "Selecione um Cartão"}
              </h3>
              <p className="text-slate-600 max-w-sm mx-auto mt-2 font-bold text-sm uppercase tracking-wide">
                {territorioSelecionado 
                  ? `Localidade: ${territorioSelecionado.nome}`
                  : "Pronto para carregar camadas geográficas."}
              </p>
              
              {!territorioSelecionado && (
                <div className="mt-4 flex items-center justify-center gap-2 text-blue-600 text-xs font-black animate-pulse">
                  <Search size={14} /> AGUARDANDO SELEÇÃO NO MENU LATERAL
                </div>
              )}
            </div>
          </div>

          {/* Controles flutuantes (Estilo Moderno) */}
          <div className="absolute bottom-8 right-8 flex flex-col gap-3">
            <button 
              title="Expandir Mapa"
              className="p-4 bg-white rounded-2xl shadow-2xl hover:bg-gray-50 transition-all text-gray-700 active:scale-90 border border-gray-100"
            >
              <Maximize2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}