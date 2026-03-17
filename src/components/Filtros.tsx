"use client";

import { DIAS_ORDEN } from "@/types/talleres";

const OPCIONES_DISTANCIA: { value: string; label: string }[] = [
  { value: "", label: "Todas las distancias" },
  { value: "5", label: "Menos de 5 km" },
  { value: "10", label: "Menos de 10 km" },
  { value: "15", label: "Menos de 15 km" },
  { value: "20", label: "Menos de 20 km" },
];

interface FiltrosProps {
  diaSeleccionado: string;
  distanciaMaxKm: string;
  ordenarPor: "dia" | "horario" | "distancia";
  onDiaChange: (dia: string) => void;
  onDistanciaChange: (distancia: string) => void;
  onOrdenarChange: (orden: "dia" | "horario" | "distancia") => void;
}

export function Filtros({
  diaSeleccionado,
  distanciaMaxKm,
  ordenarPor,
  onDiaChange,
  onDistanciaChange,
  onOrdenarChange,
}: FiltrosProps): React.ReactElement {
  return (
    <div className="flex flex-wrap gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Día
        </label>
        <select
          value={diaSeleccionado}
          onChange={(e) => onDiaChange(e.target.value)}
          className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        >
          <option value="">Todos</option>
          {DIAS_ORDEN.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Distancia máxima
        </label>
        <select
          value={distanciaMaxKm}
          onChange={(e) => onDistanciaChange(e.target.value)}
          className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        >
          {OPCIONES_DISTANCIA.map((opt) => (
            <option key={opt.value || "all"} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Ordenar por
        </label>
        <select
          value={ordenarPor}
          onChange={(e) =>
            onOrdenarChange(e.target.value as "dia" | "horario" | "distancia")
          }
          className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        >
          <option value="dia">Día y horario</option>
          <option value="horario">Horario</option>
          <option value="distancia">Distancia (más cercanos primero)</option>
        </select>
      </div>
    </div>
  );
}
