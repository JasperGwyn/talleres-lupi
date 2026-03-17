"use client";

import { useEffect, useMemo, useState } from "react";
import { Filtros } from "@/components/Filtros";
import { TallerCard } from "@/components/TallerCard";
import { DIAS_ORDEN } from "@/types/talleres";
import type { TallerConDistancia } from "@/types/talleres";

function parseHora(horario: string): number {
  const m = horario.match(/^(\d{1,2}):(\d{2})/);
  if (!m) return 0;
  return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
}

function ordenarTalleres(
  talleres: TallerConDistancia[],
  orden: "dia" | "horario" | "distancia"
): TallerConDistancia[] {
  const copia = [...talleres];
  switch (orden) {
    case "dia":
      copia.sort((a, b) => {
        const idxA = DIAS_ORDEN.indexOf(a.dia);
        const idxB = DIAS_ORDEN.indexOf(b.dia);
        if (idxA !== idxB) return idxA - idxB;
        return parseHora(a.horario) - parseHora(b.horario);
      });
      break;
    case "horario":
      copia.sort((a, b) => parseHora(a.horario) - parseHora(b.horario));
      break;
    case "distancia":
      copia.sort(
        (a, b) => a.kmDesdeCharcas3445 - b.kmDesdeCharcas3445
      );
      break;
    default:
      break;
  }
  return copia;
}

export default function Home(): React.ReactElement {
  const [talleres, setTalleres] = useState<TallerConDistancia[]>([]);
  const [loading, setLoading] = useState(true);
  const [diaSeleccionado, setDiaSeleccionado] = useState("");
  const [ordenarPor, setOrdenarPor] = useState<
    "dia" | "horario" | "distancia"
  >("dia");

  useEffect(() => {
    fetch("/talleres-lupita.json")
      .then((r) => r.json())
      .then((data: TallerConDistancia[]) => {
        setTalleres(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtrados = useMemo(() => {
    let out = talleres;
    if (diaSeleccionado) {
      out = out.filter((t) => t.dia === diaSeleccionado);
    }
    return ordenarTalleres(out, ordenarPor);
  }, [talleres, diaSeleccionado, ordenarPor]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Talleres PCB para Lupita
        </h1>
        <p className="mt-2 text-gray-600">Cargando talleres...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Talleres PCB para Lupita
        </h1>
        <p className="mt-1 text-gray-600">
          Talleres para niños (~10 años) · Programa Cultural en Barrios · Desde
          Charcas 3445, Palermo
        </p>
      </header>

      <Filtros
        diaSeleccionado={diaSeleccionado}
        ordenarPor={ordenarPor}
        onDiaChange={setDiaSeleccionado}
        onOrdenarChange={setOrdenarPor}
      />

      <section className="mt-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          {filtrados.length} talleres
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((taller, i) => (
            <TallerCard key={`${taller.centro}-${taller.nombre}-${i}`} taller={taller} />
          ))}
        </div>
      </section>
    </main>
  );
}
