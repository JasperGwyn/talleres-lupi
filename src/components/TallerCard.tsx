"use client";

import type { TallerConDistancia } from "@/types/talleres";

interface TallerCardProps {
  taller: TallerConDistancia;
}

export function TallerCard({ taller }: TallerCardProps): React.ReactElement {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="font-semibold text-gray-900">{taller.nombre}</h3>
      <p className="mt-1 text-sm text-gray-600">
        {taller.centro} · {taller.barrio}
      </p>
      <p className="mt-1 text-sm font-medium text-indigo-600">
        {taller.dia} {taller.horario}
      </p>
      {taller.direccion ? (
        <p className="mt-1 text-xs text-gray-500">{taller.direccion}</p>
      ) : null}
      <p className="mt-2 inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
        {taller.kmDesdeCharcas3445 < 100
          ? `${taller.kmDesdeCharcas3445} km desde Charcas 3445`
          : "Distancia no disponible"}
      </p>
    </article>
  );
}
