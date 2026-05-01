
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
    <div className="max-w-5xl mx-auto p-4 md:p-6 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Administração</h2>
          <p className="text-sm text-gray-500">Gerencie quem acessa o sistema da congregação</p>
        </div>
        <button 
          onClick={() =>{
            setUsuarioEmEdicao(null);
            setModalAberto(true);
          }}
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
        >
          <span>+ Novo Usuário</span>
        </button>
      </header>

      {/* Container com scroll para a tabela não quebrar o layout mobile */}
      <div className="w-full overflow-x-auto rounded-4xl border border-gray-100 shadow-sm bg-white">
         <Tabela 
          colunas={colunas} 
          dados={usuarios} 
          aoDeletar={deletarUsuario} 
          aoRecuperar={recuperarSenha} 
          aoEditar={prepararEdicao}
        />
      </div>
     
      {/* --- MODAL AJUSTADO PARA MOBILE --- */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-110 sm:p-4">
          <div className="bg-white p-6 rounded-t-4xl sm:rounded-[2.5rem] shadow-2xl w-full max-w-md animate-in slide-in-from-bottom sm:zoom-in duration-300">
            <h3 className="text-xl font-black mb-6 text-gray-800">
              {usuarioEmEdicao ? "Editar Usuário" : "Adicionar Novo Usuário"}
            </h3>
            
            <form onSubmit={salvarNovoUsuario} className="space-y-4">
              <Input label="Nome Completo" placeholder="Nome do irmão" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} />
              <Input label="E-mail" type="email" placeholder="email@exemplo.com" value={novoEmail} onChange={(e) => setNovoEmail(e.target.value)} />
              <Select label="Nível de Acesso" options={opcoesPerfil} value={novoPerfil} onChange={(e) => setNovoPerfil(e.target.value)} />

              <div className="flex flex-col-reverse sm:flex-row gap-3 mt-8">
                <button 
                  type="button"
                  onClick={() => setModalAberto(false)}
                  className="px-6 py-3 rounded-2xl text-gray-500 font-bold hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 font-black shadow-lg shadow-blue-100 transition-all active:scale-95"
                >
                  {usuarioEmEdicao ? 'Salvar Alterações' : 'Criar Usuário'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}