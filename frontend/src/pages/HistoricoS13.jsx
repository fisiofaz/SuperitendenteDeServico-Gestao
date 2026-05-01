import { Tabela } from '../components/Tabela';
import { Trash2, FileText, Printer, ArrowLeft } from 'lucide-react'; // 1. Garanta que Printer e ArrowLeft estão aqui
import { gerarPDF_S13 } from '../services/relatorioService';

export function HistoricoS13({ registros = [], setRegistros, voltar }) {
  
  const deletarRegistro = (id) => {
    if (window.confirm("Deseja excluir permanentemente este registro do histórico?")) {
      setRegistros(registros.filter(reg => reg.id !== id));
    }
  };

  const dadosFormatados = (registros || []).map(reg => ({
    id: reg.id,
    nome: reg.numero || 'S/N', 
    email: reg.publicador || 'Não informado',  
    perfil: reg.dataSaida?.split('-').reverse().join('/') || "-",
    campoExtra1: reg.dataRetorno?.split('-').reverse().join('/') || "-",  
    campoExtra2: (
      <div className="max-w-62.5 truncate text-gray-500 text-xs italic">
        {reg.observacoes || "Sem notas"}
      </div>
    ),  
    acoesPersonalizadas: (
      <button 
        onClick={() => deletarRegistro(reg.id)}
        className="p-2 text-gray-300 hover:text-red-500 transition-colors"
      >
        <Trash2 size={16} />
      </button>
    )
  }));

  return (
    <div className="max-w-6xl mx-auto p-4 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={voltar}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2 text-blue-900">
              <FileText size={24} />
              Histórico S-13
            </h2>
            <p className="text-sm text-gray-500 font-medium italic">Congregação Tropical</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Botão de Exportar - Corrigido para não usar variáveis inexistentes */}
          <button 
            onClick={() => gerarPDF_S13({ numero: 'Geral', nome: 'Territórios' }, registros)}
            className="flex items-center gap-2 bg-gray-800 hover:bg-black text-white px-5 py-2.5 rounded-2xl font-bold shadow-lg transition-all active:scale-95 text-sm"
          >
            <Printer size={18} />
            Exportar PDF
          </button>

          {registros.length > 0 && (
            <button 
              onClick={() => {
                if(window.confirm("Apagar TODO o histórico?")) setRegistros([]);
              }}
              className="text-[10px] font-black text-red-400 hover:text-red-600 uppercase tracking-widest border border-red-100 px-3 py-2 rounded-xl"
            >
              Limpar Tudo
            </button>
          )}
        </div>
      </div>
      
      {registros.length === 0 ? (
        <div className="bg-white p-12 rounded-[2.5rem] border border-dashed border-gray-200 text-center shadow-sm">
          <FileText className="text-gray-200 mx-auto mb-4" size={48} />
          <p className="text-gray-500 font-bold">Nenhum registro de retorno.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <Tabela 
            colunas={["Nº", "Publicador", "Saída", "Retorno", "Observações", "Ações"]}
            dados={dadosFormatados}
            aoDeletar={() => {}} 
            aoRecuperar={() => {}}
            aoEditar={() => {}}
          />
        </div>
      )}
    </div>
  );
}