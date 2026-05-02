import { Tabela } from '../components/Tabela';
import { Trash2, FileText, Printer, ArrowLeft, Ghost } from 'lucide-react'; 
import { gerarPDF_S13 } from '../services/relatorioService';

export function HistoricoS13({ registros = [], setRegistros, voltar }) {
  
  const deletarRegistro = (id) => {
    if (window.confirm("Deseja excluir permanentemente este registro do histórico?")) {
      setRegistros(registros.filter(reg => reg.id !== id));
    }
  };

  const dadosFormatados = (registros || []).map(reg => ({
    id: reg.id,
    nome: <span className="font-bold text-blue-900">{reg.numero || 'S/N'}</span>, 
    email: reg.publicador || 'Não informado',  
    perfil: reg.dataSaida?.split('-').reverse().join('/') || "-",
    campoExtra1: reg.dataRetorno?.split('-').reverse().join('/') || "-",  
    campoExtra2: (
      <div className="max-w-50 md:max-w-xs truncate text-gray-500 text-xs italic font-medium">
        {reg.observacoes || "Sem notas"}
      </div>
    ),  
    acoesPersonalizadas: (
      <button 
        onClick={() => deletarRegistro(reg.id)}
        className="p-2.5 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all"
        title="Excluir Registro"
      >
        <Trash2 size={16} />
      </button>
    )
  }));

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 animate-in fade-in duration-500">
      {/* Cabeçalho Adaptável */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={voltar}
            className="p-3 hover:bg-gray-100 rounded-2xl transition-all active:scale-90 bg-white shadow-sm border border-gray-100 lg:hidden"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <FileText className="text-blue-600" size={24} />
              <h2 className="text-2xl font-black text-gray-800 tracking-tight">                
                Histórico S-13
              </h2>
            </div>            
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mt-1">Congregação Tropical</p>
          </div>
        </div>

        <div className="flex items-center w-full md:w-auto gap-3">
          {/* Botão de Exportar - Estilo Mobile Amigável */}
          <button 
            onClick={() => gerarPDF_S13({ numero: 'Geral', nome: 'Territórios' }, registros)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3.5 rounded-2xl font-black shadow-lg shadow-gray-200 transition-all active:scale-95 text-sm"
          >
            <Printer size={18} />
            Exportar PDF
          </button>

          {registros.length > 0 && (
            <button 
              onClick={() => {
                if(window.confirm("Apagar TODO o histórico? Esta ação não pode ser desfeita.")) setRegistros([]);
              }}
              className="px-4 py-3.5 border-2 border-red-50/50 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all"
              title="Limpar Histórico"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Estado Vazio Refinado */}
      {registros.length === 0 ? (
        <div className="bg-gray-50/50 p-16 rounded-[3rem] border-2 border-dashed border-gray-200 text-center flex flex-col items-center">
          <div className="p-6 bg-white rounded-full shadow-inner mb-4">
            <Ghost className="text-gray-200" size={48} />
          </div>
          <h3 className="text-gray-400 font-black uppercase tracking-tighter text-lg">Nada por aqui</h3>
          <p className="text-gray-400 text-sm font-medium">Os registros de retorno aparecerão aqui conforme os cartões forem devolvidos.</p>
        </div>
      ) : (
        /* Container de Tabela com Scroll para Mobile */
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <Tabela 
              colunas={["Nº", "Publicador", "Saída", "Retorno", "Observações", "Ações"]}
              dados={dadosFormatados}
              aoDeletar={() => {}} 
              aoRecuperar={() => {}}
              aoEditar={() => {}}
            />
          </div>
        </div>
      )}
    </div>
  );
}