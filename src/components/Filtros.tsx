"use client";

import { Calendar, ChevronDown, MapPin, Search, ArrowUpDown } from "lucide-react";
import { DIAS_ORDEN } from "@/types/talleres";

const OPCIONES_DISTANCIA: { value: string; label: string }[] = [
  { value: "", label: "Todas las distancias" },
  { value: "5", label: "Menos de 5 km" },
  { value: "10", label: "Menos de 10 km" },
  { value: "15", label: "Menos de 15 km" },
  { value: "20", label: "Menos de 20 km" },
];

const inputBase =
  "min-h-[44px] w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-base text-text-primary placeholder:text-text-muted transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-0";

const labelBase = "mb-2 block text-sm font-medium text-text-secondary";

interface FiltrosProps {
  busqueda: string;
  diaSeleccionado: string;
  distanciaMaxKm: string;
  ordenarPor: "dia" | "horario" | "distancia";
  onBusquedaChange: (valor: string) => void;
  onDiaChange: (dia: string) => void;
  onDistanciaChange: (distancia: string) => void;
  onOrdenarChange: (orden: "dia" | "horario" | "distancia") => void;
}

export function Filtros({
  busqueda,
  diaSeleccionado,
  distanciaMaxKm,
  ordenarPor,
  onBusquedaChange,
  onDiaChange,
  onDistanciaChange,
  onOrdenarChange,
}: FiltrosProps): React.ReactElement {
  return (
    <div className="flex flex-wrap gap-6 rounded-xl border border-border bg-surface-elevated p-5 shadow-soft">
      <div className="min-w-[200px] flex-1">
        <label htmlFor="filtro-busqueda" className={labelBase}>
          Buscar
        </label>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted"
            aria-hidden
          />
          <input
            id="filtro-busqueda"
            type="search"
            value={busqueda}
            onChange={(e) => onBusquedaChange(e.target.value)}
            placeholder="Nombre, centro, barrio..."
            className={`${inputBase} pl-10`}
            aria-label="Buscar por nombre, centro o barrio"
          />
        </div>
      </div>
      <div className="min-w-[180px]">
        <label htmlFor="filtro-dia" className={labelBase}>
          Día
        </label>
        <div className="relative">
          <Calendar
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted"
            aria-hidden
          />
          <select
            id="filtro-dia"
            value={diaSeleccionado}
            onChange={(e) => onDiaChange(e.target.value)}
            className={`${inputBase} cursor-pointer pl-10 pr-10 appearance-none [&::-ms-expand]:hidden`}
            aria-label="Filtrar por día de la semana"
          >
            <option value="">Todos</option>
            {DIAS_ORDEN.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted"
            aria-hidden
          />
        </div>
      </div>
      <div className="min-w-[180px]">
        <label htmlFor="filtro-distancia" className={labelBase}>
          Distancia máxima
        </label>
        <div className="relative">
          <MapPin
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted"
            aria-hidden
          />
          <select
            id="filtro-distancia"
            value={distanciaMaxKm}
            onChange={(e) => onDistanciaChange(e.target.value)}
            className={`${inputBase} cursor-pointer pl-10 pr-10 appearance-none [&::-ms-expand]:hidden`}
            aria-label="Filtrar por distancia máxima en km"
          >
            {OPCIONES_DISTANCIA.map((opt) => (
              <option key={opt.value || "all"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted"
            aria-hidden
          />
        </div>
      </div>
      <div className="min-w-[180px]">
        <label htmlFor="filtro-ordenar" className={labelBase}>
          Ordenar por
        </label>
        <div className="relative">
          <ArrowUpDown
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted"
            aria-hidden
          />
          <select
            id="filtro-ordenar"
            value={ordenarPor}
            onChange={(e) =>
              onOrdenarChange(e.target.value as "dia" | "horario" | "distancia")
            }
            className={`${inputBase} cursor-pointer pl-10 pr-10 appearance-none [&::-ms-expand]:hidden`}
            aria-label="Ordenar resultados"
          >
            <option value="dia">Día y horario</option>
            <option value="horario">Horario</option>
            <option value="distancia">Distancia (más cercanos primero)</option>
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
