
import { useState } from 'react';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Tabela } from '../components/Tabela';

export function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: "Fabio", email: "fabio@email.com", perfil: "Administrador" },
    { nome: "Irmão Silva", email: "silva@email.com", perfil: "Servo" }
  ]);

  const [novoNome, setNovoNome] = useState('');
  const [novoEmail, setNovoEmail] = useState('');
  const [novoPerfil, setNovoPerfil] = useState('view');
  const [usuarioEmEdicao, setUsuarioEmEdicao] = useState(null);

  const [modalAberto, setModalAberto] = useState(false);

  const colunas = ["Nome", "E-mail", "Perfil de Acesso", "Ações"];

  const opcoesPerfil = [
    { value: 'admin', label: 'Administrador (Ancião)' },
    { value: 'editor', label: 'Editor (Servo)' },
    { value: 'view', label: 'Visualizador' }
  ];

  const salvarNovoUsuario = (e) => {
    e.preventDefault(); // Impede a página de recarregar

    // Criamos o novo objeto (O Sênior chama isso de "Payload")
    if (usuarioEmEdicao) {
    // Lógica de Edição (Update)
    setUsuarios(usuarios.map(u => 
      u.id === usuarioEmEdicao.id 
        ? { ...u, nome: novoNome, email: novoEmail, perfil: novoPerfil === 'admin' ? 'Administrador' : novoPerfil === 'editor' ? 'Servo' : 'Visualizador' }
        : u
      ));
    } else {
    // Lógica de Criação (Create)
        const novoItem = {
            id: Date.now(), // Gerando um ID simples
            nome: novoNome,
            email: novoEmail,
            perfil: novoPerfil === 'admin' ? 'Administrador' : novoPerfil === 'editor' ? 'Servo' : 'Visualizador'
        };
        setUsuarios([...usuarios, novoItem]);
    }

    // Limpamos os campos e fechamos o modal
    setUsuarioEmEdicao(null);
    setNovoNome('');
    setNovoEmail('');
    setNovoPerfil('view');
    setModalAberto(false);
  };

  const deletarUsuario = (id) => {
    if (window.confirm("Tem certeza que deseja remover este usuário?")) {
        setUsuarios(usuarios.filter(u => u.id !== id));
    }
  };

  const recuperarSenha = (email) => {
    alert(`Um link de recuperação foi enviado para: ${email}`);
  // No futuro, o Spring Boot enviará um e-mail de verdade aqui.
  };

  const prepararEdicao = (usuario) => {
    setUsuarioEmEdicao(usuario);
    setNovoNome(usuario.nome);
    setNovoEmail(usuario.email);
    setNovoPerfil(usuario.perfil === 'Administrador' ? 'admin' : usuario.perfil === 'Servo' ? 'editor' : 'view');
    setModalAberto(true);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Administração</h2>
          <p className="text-gray-500">Gerencie quem acessa o sistema da congregação</p>
        </div>
        <button 
          onClick={() => setModalAberto(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all shadow-md"
        >
          + Novo Usuário
        </button>
      </header>

      <Tabela colunas={colunas} dados={usuarios} aoDeletar={deletarUsuario} aoRecuperar={recuperarSenha} aoEditar={prepararEdicao}/>
      {/* --- MODAL (A janelinha que flutua) --- */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full relative">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Cadastrar Novo Usuário</h3>
            
            <form onSubmit={salvarNovoUsuario}>
              <Input label="Nome Completo" placeholder="Nome do irmão" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} />
              <Input label="E-mail" type="email" placeholder="email@exemplo.com" value={novoEmail} onChange={(e) => setNovoEmail(e.target.value)} />
              <Select label="Nível de Acesso" options={opcoesPerfil} value={novoPerfil} onChange={(e) => setNovoPerfil(e.target.value)} />

              <div className="flex gap-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setModalAberto(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}