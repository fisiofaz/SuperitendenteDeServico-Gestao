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
          {dados.map((item) => (
            <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50">
              <td className="p-4 text-sm">{item.nome}</td>
              <td className="p-4 text-sm">{item.email}</td>
              <td className="p-4 text-sm">
                <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                  item.perfil === 'Livre' || item.perfil === 'Disponível' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {item.perfil}
                </span>
              </td>

              {item.campoExtra1 && <td className="p-4 text-sm text-gray-500">{item.campoExtra1}</td>}
              {item.campoExtra2 && <td className="p-4 text-sm text-gray-500">{item.campoExtra2}</td>}

              <td className="p-4 text-sm flex gap-2">
                <button 
                    onClick={() => aoEditar(item)}
                    className="text-blue-600 hover:text-blue-800 font-semibold text-xs uppercase"
                >
                    Editar
                </button>
                <button 
                  onClick={() => aoRecuperar(item.id)}
                  className="text-orange-500 hover:text-orange-700 font-semibold text-xs uppercase"
                >
                  {item.email?.includes('@') ? 'Senha' : 'Concluir'}
                </button>
                <button 
                  onClick={() => aoDeletar(item.id)}
                  cclassName="text-red-500 hover:text-red-700 font-semibold text-xs uppercase"
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