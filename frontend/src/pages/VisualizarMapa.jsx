import { Map as MapIcon, Maximize2, Navigation, MapPin } from 'lucide-react';

export function VisualizarMapa({ territorios, territorioSelecionado, setTerritorioSelecionado }) {
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Cabeçalho: Usando o MapIcon aqui */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 text-green-600 rounded-2xl">
            <MapIcon size={28} /> 
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Visualização de Mapas</h2>
            <p className="text-sm text-gray-500">Geolocalização dos territórios da congregação</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Lista Lateral */}
        <div className="lg:col-span-1 bg-white p-4 rounded-3xl shadow-sm border border-gray-100 h-150 overflow-y-auto">
          <h3 className="font-bold text-gray-700 mb-4 px-2 flex items-center gap-2 border-b pb-2">
            <MapPin size={18} className="text-blue-600" />
            Cartões Reais
          </h3>
          
          <div className="space-y-2">
            {territorios.length > 0 ? (
              territorios.map((ter) => (
                <button 
                  key={ter.id}
                  onClick={() => setTerritorioSelecionado(ter)}
                  className={`w-full text-left p-4 rounded-2xl transition-all border ${
                    territorioSelecionado?.id === ter.id 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-transparent hover:bg-gray-50'
                  }`}
                >
                  <div className="font-black text-blue-900">Cartão {ter.numero || ter.id}</div>
                  <div className="text-xs text-gray-500 font-medium truncate">{ter.nome || 'Sem localidade'}</div>
                </button>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-sm text-gray-400 italic">Nenhum dado encontrado.</p>
              </div>
            )}
          </div>
        </div>

        {/* Área do Mapa */}
        <div className="lg:col-span-3 relative bg-slate-200 rounded-3xl overflow-hidden border-4 border-white shadow-2xl flex items-center justify-center min-h-150">
          <div className="text-center z-10 p-8">
            <div className="bg-white p-6 rounded-full shadow-xl inline-block mb-4 animate-pulse">
              <Navigation className="text-blue-600" size={40} />
            </div>
            <h3 className="text-2xl font-black text-gray-800">
              {territorioSelecionado 
                ? `Território ${territorioSelecionado.numero || territorioSelecionado.id}` 
                : "Selecione um Cartão"}
            </h3>
            <p className="text-slate-500 max-w-sm mx-auto mt-2 font-medium">
              {territorioSelecionado 
                ? `Localidade: ${territorioSelecionado.nome}`
                : "Pronto para carregar camadas geográficas via backend."}
            </p>
          </div>

          {/* Usando o Maximize2 aqui nos controles flutuantes */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2">
            <button 
              title="Expandir Mapa"
              className="p-3 bg-white rounded-xl shadow-lg hover:bg-gray-50 transition-all text-gray-600 active:scale-95"
            >
              <Maximize2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}