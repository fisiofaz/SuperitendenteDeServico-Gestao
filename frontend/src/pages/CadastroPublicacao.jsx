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
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
          <Package size={28} />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Catálogo de Publicações</h2>
        <p className="text-sm text-gray-500">Cadastre os itens que a congregação mantém em estoque</p>
      </div>      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit">
          <h3 className="text-lg font-bold text-gray-700 mb-4">Novo Item</h3>
          <form onSubmit={handleSalvar} className="space-y-4">
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
            <button 
              type="submit"
              className="w-full bg-[#1e3a8a] hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-100 mt-2 flex items-center justify-center gap-2"
            >
              <PlusCircle size={20} /> 
              Salvar no Catálogo
            </button>
          </form>
        </div>  
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-50 bg-gray-50/50">
            <BookOpen size={18} className="text-blue-600" />
            <h3 className="font-bold text-gray-700">Itens no Catálogo</h3>
          </div>
          <Tabela 
            colunas={["Sigla", "Publicação", "Idioma", "Ações"]}
            dados={estoque.map(item => ({
              id: item.id,
              nome: item.sigla.toUpperCase(),
              email: item.nome,
              status: item.idioma.toUpperCase(),
              acoesPersonalizadas: (
                <button 
                  onClick={() => setEstoque(estoque.filter(x => x.id !== item.id))}
                  className="text-gray-300 hover:text-red-500 p-2 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              )
            }))}
          />
        </div>
      </div>      
    </div>
  );
}