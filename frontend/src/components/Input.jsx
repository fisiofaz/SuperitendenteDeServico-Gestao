export function Input({ label, type = "text", value, onChange, placeholder, sigla }) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
      />
      {sigla && <span className="text-xs text-gray-400 italic">Ex: {sigla}</span>}
    </div>
  );
}