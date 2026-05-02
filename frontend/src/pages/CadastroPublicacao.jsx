import { useState } from 'react';
import { Package, Trash2, BookOpen, PlusCircle } from 'lucide-react';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Tabela } from '../components/Tabela';


export function CadastroPublicacao({ estoque, setEstoque }) {
  const [form, setForm] = useState({
    nome: '',
    sigla: '',
    estoqueMinimo: 0,
    idioma: 'pt',
    tipo: 'livro'
  });

  const opcoesIdiomas = [
    { value: 'pt', label: 'Português' },
    { value: 'es', label: 'Espanhol' },
    { value: 'en', label: 'Inglês' },
    { value: 'tpi', label: 'Tupi-Guarani' }
  ];

  const opcoesTipos = [
    { value: 'livro', label: 'Livro' },
    { value: 'despertai ', label: 'Despertai!' },
    { value: 'asentinela', label: 'A Sentinela' },
    { value: 'brochuras e livretos', label: 'Brochuras e Livretos' },
    { value: 'folhetos e convites', label: 'Folhetos e Convites' },
    { value: 'apostilas', label: 'Apostilas' },
    { value: 'periodico', label: 'Periódico' }
  ];

  const handleSalvar = (e) => {
    e.preventDefault();
    if (!form.nome || !form.sigla) return;

    const novoItem = {
      ...form,
      id: Date.now(),
      quantidadeAtual: 0 // Começa zerado para depois registrar a entrada
    };

    setEstoque([...estoque, novoItem].sort((a, b) => a.nome.localeCompare(b.nome)));
    
    // Limpa o formulário
    setForm({ nome: '', sigla: '', estoqueMinimo: 0, idioma: 'pt', tipo: 'livro' });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
          <Package size={28} />
        </div>      
        <div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Catálogo de Publicações</h2>
          <p className="text-sm text-gray-500 font-medium">Cadastre os itens que a congregação mantém em estoque</p>
        </div>
      </div>
      {/* Grid Responsivo: 1 coluna no celular, 3 no desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Formulário - No mobile fica no topo */}
        <div className="bg-white p-6 rounded-4xl shadow-sm border border-gray-100 h-fit">
          <h3 className="text-lg font-black text-gray-700 mb-5 flex items-center gap-2">
            <PlusCircle size={20} className="text-blue-600" />
            Novo Item
          </h3>
          <form onSubmit={handleSalvar} className="space-y-5">
            <Input 
              label="Nome da Publicação" 
              placeholder="Ex: Seja Feliz para Sempre!" 
              value={form.nome}
              onChange={(e) => setForm({...form, nome: e.target.value})}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Sigla" 
                placeholder="lff" 
                value={form.sigla}
                onChange={(e) => setForm({...form, sigla: e.target.value})}
              />
              <Input 
                label="Mínimo" 
                type="number"
                value={form.estoqueMinimo}
                onChange={(e) => setForm({...form, estoqueMinimo: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <Select 
                label="Idioma" 
                options={opcoesIdiomas} 
                value={form.idioma} 
                onChange={(e) => setForm({...form, idioma: e.target.value})} 
              />
              <Select 
                label="Tipo" 
                options={opcoesTipos} 
                value={form.tipo} 
                onChange={(e) => setForm({...form, tipo: e.target.value})} 
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-[#1e3a8a] hover:bg-blue-800 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-blue-100 mt-2 flex items-center justify-center gap-2 active:scale-95"
            >
              Salvar no Catálogo
            </button>
          </form>
        </div>  

        {/* Lista de Itens - Ocupa 2 colunas no desktop */}
        <div className="lg:col-span-2 bg-white rounded-4xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-5 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
            <BookOpen size={18} className="text-blue-600" />
            <h3 className="font-bold text-gray-700">Itens no Catálogo</h3>
          </div>

          {/* Container de scroll para a tabela no celular */}
          <div className="overflow-x-auto">
            <Tabela 
              colunas={["Sigla", "Publicação", "Idioma", "Ações"]}
              dados={estoque.map(item => ({
                id: item.id,
                nome: <span className="font-bold text-blue-700">item.sigla.toUpperCase()</span>,
                email: item.nome,
                status: <span className="text-xs font-black bg-gray-100 px-2 py-1 rounded-lg">item.idioma.toUpperCase()</span>,
                acoesPersonalizadas: (
                  <button 
                    onClick={() => setEstoque(estoque.filter(x => x.id !== item.id))}
                    className="text-gray-300 hover:text-red-500 p-2 transition-colors"
                    title="Remover do Catálogo"
                  >
                  <Trash2 size={18} />
                  </button>
                )
              }))}
            />
          </div>
        </div>
      </div>      
    </div>
  );
}