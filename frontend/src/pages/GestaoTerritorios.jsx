import { useState } from 'react';
import { Input } from '../components/Input';
import { Tabela } from '../components/Tabela';
import { Search, MessageCircle, MapPin, ClipboardList, CheckCircle2 } from 'lucide-react';

export function GestaoTerritorios({ territorios, setTerritorios, aoConcluir, listaPublicadores = [] }) {
  const [numero, setNumero] = useState('');
  const [publicador, setPublicador] = useState('');
  const [dataSaida, setDataSaida] = useState('');
  const [busca, setBusca] = useState('');
  const [mostrandoRetorno, setMostrandoRetorno] = useState(false);
  const [territorioSelecionado, setTerritorioSelecionado] = useState(null);
  const [notasRetorno, setNotasRetorno] = useState('');

  const handleDesignar = (e) => {
    e.preventDefault();
    const dataInicio = new Date(dataSaida);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    dataInicio.setHours(0, 0, 0, 0);  
    
    let mesesCalculados = (hoje.getFullYear() - dataInicio.getFullYear()) * 12 + (hoje.getMonth() - dataInicio.getMonth());
    const mesesFinais = mesesCalculados < 0 ? 0 : mesesCalculados;

    const novaDesignacao = {
      id: Date.now(),
      numero: numero,
      nome: `Setor ${numero}`, 
      status: "Na Rua",
      publicador: publicador,
      dataSaida: dataSaida,
      meses: mesesFinais 
    };

    setTerritorios([...territorios, novaDesignacao]);
    setNumero('');
    setPublicador('');
    setDataSaida('');
  };

  const prepararConclusao = (id) => {
    const t = territorios.find(item => item.id === id);
    if (!t || t.status === "Livre") return;    
    setTerritorioSelecionado(t);
    setMostrandoRetorno(true);
  };

  const territoriosFiltrados = territorios.filter(t => 
    t.numero.includes(busca) || t.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const formatarDataBR = (dataString) => {
    if (!dataString || dataString === "-") return "-";   
    return dataString.split("-").reverse().join("/");
  };

  const gerarLinkWhatsapp = (territorio) => {
    const mensagem = `Olá! Segue a designação do seu território:%0A%0A*Nº:* ${territorio.numero}%0A*Local:* ${territorio.nome}%0A*Data:* ${formatarDataBR(territorio.dataSaida)}%0A%0ABom trabalho! 📖`;  
    return `https://wa.me/?text=${mensagem}`;
  };

 return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
            <MapPin className="text-blue-600" /> Gestão de Territórios
          </h2>
        </div>
      </div>  
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário de Designação */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h3 className="text-lg font-black mb-6 text-blue-900 flex items-center gap-2">
            <ClipboardList size={20} /> Designar Cartão
          </h3>
          <form onSubmit={handleDesignar} className="space-y-4">
            <Input 
              label="Número do Território" 
              placeholder="Ex: 05" 
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
            <div className="space-y-1">
              <label className="block text-sm font-black text-gray-400 uppercase mb-1">
                Selecionar Publicador
              </label>
              <select 
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-70 appearance-none"
                value={publicador}
                onChange={(e) => setPublicador(e.target.value)}
                required
              >
                <option value="">Selecione um irmão...</option>
                {listaPublicadores.map((p) => (
                  <option key={p.id} value={p.nome}>
                    {p.nome}
                  </option>
                ))}
              </select>
            </div>
            <Input 
              label="Data de Saída" 
              type="date"
              value={dataSaida}
              onChange={(e) => setDataSaida(e.target.value)}
            />
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-blue-100 active:scale-95 flex items-center justify-center gap-2">
              <CheckCircle2 size={20} /> Confirmar Designação
            </button>
          </form>
        </div>

        {/* Tabela de Estatus */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              label="Buscar por número ou nome..." 
              placeholder="Digite o número ou nome..." 
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Tabela 
                colunas={["Nº", "Localidade", "Status", "Saída", "Tempo", "Ações"]}
                dados={territoriosFiltrados.map(t => ({
                  id: t.id,
                  nome: <span className="font-bold text-blue-700">{t.numero}</span>,
                  email: t.nome,
                  perfil: <span className="font-medium">{t.status === "Na Rua" ? t.publicador : "Livre"}</span>,
                  campoExtra1: t.status === "Na Rua" ? formatarDataBR(t.dataSaida) : "-",
                  campoExtra2: (
                    <span className={`font-black ${t.meses >= 4 ? 'text-red-500' : 'text-gray-500'}`}>
                      {t.status === "Na Rua" ? (t.meses === 0 ? "Hoje" : `${t.meses}m`) : "-"}
                    </span>
                  ),
                  acoesPersonalizadas: t.status === "Na Rua" ? (
                    <a 
                      href={gerarLinkWhatsapp(t)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-green-50 p-2.5 rounded-xl text-green-600 hover:bg-green-600 hover:text-white transition-all flex items-center justify-center"
                      title="Enviar via WhatsApp"
                    >
                      <MessageCircle size={16} />
                    </a>              
                  ) : null                 
                }))}
                aoDeletar={(id) => setTerritorios(territorios.filter(t => t.id !== id))}
                aoRecuperar={prepararConclusao}
              />  
            </div>
          </div>                  
        </div>
      </div>
      {/* --- MODAL DO S-13 --- */}
      {mostrandoRetorno && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl animate-in slide-in-from-bottom duration-300">
            <h3 className="text-xl font-black text-gray-800 mb-2">Concluir Cartão (S-13)</h3>
            <p className="text-sm text-gray-600 mb-6 font-medium">
              Território <span className="text-blue-600 font-bold">{territorioSelecionado?.numero}</span> entregue por <span className="font-bold">{territorioSelecionado?.publicador}</span>.
            </p>
            <textarea 
              className="w-full border border-gray-100 rounded-2xl p-4 text-sm h-32 focus:ring-2 focus:ring-orange-500 outline-none transition-all bg-gray-50 font-medium"
              placeholder="Notas para o próximo publicador..."
              value={notasRetorno}
              onChange={(e) => setNotasRetorno(e.target.value)}
            />  
            <div className="flex flex-col-reverse sm:flex-row gap-3 mt-8">
              <button 
                onClick={() => setMostrandoRetorno(false)}
                className="flex-1 py-4 text-gray-500 font-bold hover:bg-gray-50 rounded-2xl transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  aoConcluir(territorioSelecionado.id, notasRetorno);
                  setMostrandoRetorno(false);
                  setNotasRetorno('');
                }}
                className="flex-1 py-4 bg-orange-500 text-white rounded-2xl font-black hover:bg-orange-600 shadow-lg shadow-orange-100 transition-all active:scale-95"
              >
                Confirmar Retorno
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}