import { useState } from 'react';
import { Input } from '../components/Input';
import { Select } from '../components/Select';

export function CadastroPublicacao() {
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');
  const [estoqueMinimo, setEstoqueMinimo] = useState(0);
  const [idioma, setIdioma] = useState('');
  const [tipo, setTipo] = useState('');

  const handleSalvar = (e) => {
    e.preventDefault();
    console.log("Salvando item:", { nome, sigla, estoqueMinimo });
    alert("Publicação cadastrada (simulação)!");
  };

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

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Cadastrar Publicação
      </h2>
      
      <form onSubmit={handleSalvar}>
        <Input 
          label="Nome da Publicação" 
          placeholder="Ex: Seja Feliz para Sempre!" 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        
        <Input 
          label="Sigla" 
          placeholder="lff" 
          sigla="lff, wp24, th"
          value={sigla}
          onChange={(e) => setSigla(e.target.value)}
        />

        <Input 
          label="Estoque Mínimo" 
          type="number"
          value={estoqueMinimo}
          onChange={(e) => setEstoqueMinimo(e.target.value)}
        />

        <Select 
            label="Idioma" 
            options={opcoesIdiomas} 
            value={idioma} 
            onChange={(e) => setIdioma(e.target.value)} 
        />

        <Select 
            label="Tipo" 
            options={opcoesTipos} 
            value={tipo} 
            onChange={(e) => setTipo(e.target.value)} 
        />

        <button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-4"
        >
          Salvar Publicação
        </button>
      </form>
    </div>
  );
}