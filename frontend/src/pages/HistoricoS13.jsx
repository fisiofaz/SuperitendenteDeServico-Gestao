import { Tabela } from '../components/Tabela';
import { Trash2, FileText } from 'lucide-react';

export function HistoricoS13({ registros, setRegistros }) {
  
  const deletarRegistro = (id) => {
    if (window.confirm("Deseja excluir permanentemente este registro do histórico?")) {
      setRegistros(registros.filter(reg => reg.id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="text-orange-500" />
            Histórico de Retorno (S-13)
          </h2>
          <p className="text-sm text-gray-500">Registros permanentes de territórios trabalhados</p>
        </div>

        {registros.length > 0 && (
          <button 
            onClick={() => {
              if(window.confirm("AVISO: Isso apagará TODO o histórico S-13. Confirma?")) setRegistros([]);
            }}
            className="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-wider border border-red-200 px-3 py-1 rounded-lg hover:bg-red-50 transition-all"
          >
            Limpar Tudo
          </button>
        )}
      </div>
      
      {registros.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-200 text-center">
          <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="text-gray-300" size={32} />
          </div>
          <p className="text-gray-500 font-medium">Nenhum registro de retorno encontrado ainda.</p>
          <p className="text-sm text-gray-400">As notas aparecerão aqui assim que você concluir um território.</p>
        </div>
      ) : (
        <Tabela 
          colunas={["Nº", "Publicador", "Saída", "Retorno", "Observações", "Ações"]}
          dados={registros.map(reg => ({
            id: reg.id,
            nome: reg.numero,
            email: reg.publicador,
            // Formatando as datas para o padrão BR
            perfil: reg.dataSaida?.split('-').reverse().join('/') || "-",
            campoExtra1: reg.dataRetorno?.split('-').reverse().join('/') || "-",
            
            // Tratamento das notas para não quebrar a tabela
            campoExtra2: (
              <div className="max-w-[250px] truncate text-gray-600" title={reg.observacoes}>
                {reg.observacoes || <span className="text-gray-300 italic">Sem notas</span>}
              </div>
            ),
            
            // Botão de excluir apenas este registro
            acoesPersonalizadas: (
              <button 
                onClick={() => deletarRegistro(reg.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Excluir registro"
              >
                <Trash2 size={16} />
              </button>
            )
          }))}
          // Passamos funções vazias para os botões padrão da Tabela que não usaremos aqui
          aoDeletar={() => {}} 
          aoRecuperar={() => {}}
          aoEditar={() => {}}
        />
      )}
    </div>
  );
}