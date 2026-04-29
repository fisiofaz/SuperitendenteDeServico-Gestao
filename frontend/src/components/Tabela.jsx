export function Tabela({ colunas, dados, aoDeletar, aoRecuperar, aoEditar }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {colunas.map((col, i) => (
              <th key={i} className="p-4 text-sm font-semibold text-gray-600 uppercase">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dados.map((usuario) => (
            <tr key={usuario.id} className="border-b border-gray-50 hover:bg-gray-50">
              <td className="p-4 text-sm">{usuario.nome}</td>
              <td className="p-4 text-sm">{usuario.email}</td>
              <td className="p-4 text-sm">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-bold">
                  {usuario.perfil}
                </span>
              </td>
              <td className="p-4 text-sm flex gap-2">
                <button 
                    onClick={() => aoEditar(usuario)}
                    className="text-blue-600 hover:text-blue-800 font-semibold text-xs uppercase tracking-wider"
                >
                    Editar
                </button>
                <button 
                  onClick={() => aoRecuperar(usuario.email || usuario.id)}
                  className="text-orange-600 hover:text-orange-800 font-semibold text-xs uppercase"
          >
                  {usuario.email?.includes('@') ? 'Senha' : 'Concluir'}
                </button>
                <button 
                  onClick={() => aoDeletar(usuario.id)}
                  className="text-red-500 hover:underline font-medium"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}