export function Select({ label, options, value, onChange }) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="border border-gray-300 p-2 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">Selecione uma opção</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}