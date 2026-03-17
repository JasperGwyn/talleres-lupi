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

function SkeletonCard(): React.ReactElement {
  return (
    <article className="rounded-xl border border-border bg-surface-elevated p-5 shadow-soft">
      <div className="h-5 w-3/4 animate-pulse rounded bg-primary-light" />
      <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-border" />
      <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-border" />
      <div className="mt-4 h-6 w-24 animate-pulse rounded-full bg-accent-light" />
    </article>
  );
}

export default function Home(): React.ReactElement {
  const [talleres, setTalleres] = useState<TallerConDistancia[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [diaSeleccionado, setDiaSeleccionado] = useState("");
  const [distanciaMaxKm, setDistanciaMaxKm] = useState("");
  const [ordenarPor, setOrdenarPor] = useState<
    "dia" | "horario" | "distancia"
  >("dia");

  useEffect(() => {
    fetch("/talleres.json")
      .then((r) => r.json())
      .then((data: TallerConDistancia[]) => {
        setTalleres(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtrados = useMemo(() => {
    let out = talleres;
    if (busqueda.trim()) {
      const q = busqueda.trim().toLowerCase();
      out = out.filter(
        (t) =>
          t.nombre.toLowerCase().includes(q) ||
          t.centro.toLowerCase().includes(q) ||
          t.barrio.toLowerCase().includes(q)
      );
    }
    if (diaSeleccionado) {
      out = out.filter((t) => t.dia === diaSeleccionado);
    }
    if (distanciaMaxKm) {
      const maxKm = parseFloat(distanciaMaxKm);
      out = out.filter((t) => t.kmDesdeCharcas3445 <= maxKm);
    }
    return ordenarTalleres(out, ordenarPor);
  }, [talleres, busqueda, diaSeleccionado, distanciaMaxKm, ordenarPor]);

  if (loading) {
    return (
      <main className="min-h-dvh bg-surface px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-8">
            <div className="h-9 w-64 animate-pulse rounded bg-primary-light" />
            <div className="mt-2 h-5 w-96 animate-pulse rounded bg-border" />
          </header>
          <div className="mb-8 h-24 animate-pulse rounded-xl bg-border" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <a href="#contenido-principal" className="skip-link">
        Saltar al contenido
      </a>
      <main
        id="contenido-principal"
        className="min-h-dvh bg-surface px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
        role="main"
      >
        <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
            Talleres PCB para niños
          </h1>
          <p className="mt-2 text-base text-text-secondary">
            Talleres para niños (~10 años) ·{" "}
            <a
              href="https://buenosaires.gob.ar/gcaba_historico/cultura/promocioncultural/programacion-pcb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Programa Cultural en Barrios
            </a>
            {" · "}
            Desde Palermo
          </p>
          <p className="mt-2 text-sm text-text-secondary">
            ¿Dudas? Escribime a{" "}
            <a
              href="mailto:tom@operia.ar"
              className="text-primary hover:underline"
            >
              tom@operia.ar
            </a>
          </p>
        </header>

        <Filtros
          busqueda={busqueda}
          diaSeleccionado={diaSeleccionado}
          distanciaMaxKm={distanciaMaxKm}
          ordenarPor={ordenarPor}
          onBusquedaChange={setBusqueda}
          onDiaChange={setDiaSeleccionado}
          onDistanciaChange={setDistanciaMaxKm}
          onOrdenarChange={setOrdenarPor}
        />

        <section className="mt-8">
          <h2 className="mb-4 font-display text-lg font-semibold text-text-primary">
            {filtrados.length} talleres
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtrados.map((taller, i) => (
              <TallerCard
                key={`${taller.centro}-${taller.nombre}-${i}`}
                taller={taller}
              />
            ))}
          </div>
        </section>
        </div>
      </main>
    </>
  );
}
