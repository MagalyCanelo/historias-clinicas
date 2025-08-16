"use client";

interface Opcion {
  value: string;
  label: string;
}

interface Props {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  opciones: Opcion[];
}

export default function SelectPersonalizado({
  label,
  value,
  onChange,
  opciones,
}: Props) {
  return (
    <div className="flex flex-col mb-2">
      {label && <span className="mb-1 text-gray-700">{label}</span>}
      <select
        value={value}
        onChange={onChange}
        className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ac6d2] transition"
      >
        {opciones.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
