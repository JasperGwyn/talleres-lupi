"use client";

import { memo } from "react";
import { FileText, MapPin } from "lucide-react";
import type { TallerConDistancia } from "@/types/talleres";

interface TallerCardProps {
  taller: TallerConDistancia;
}

function TallerCardComponent({ taller }: TallerCardProps): React.ReactElement {
  const distanciaTexto =
    taller.kmDesdeCharcas3445 < 100
      ? `${taller.kmDesdeCharcas3445} km desde Palermo`
      : "Distancia no disponible";

  return (
    <article
      className="rounded-xl border border-border bg-surface-elevated p-5 shadow-soft transition-all duration-200 hover:shadow-soft-md active:scale-[0.99] [content-visibility:auto]"
      style={{ containIntrinsicSize: "0 200px" }}
    >
      <h3 className="font-display font-semibold text-text-primary">
        {taller.nombre}
      </h3>
      <p className="mt-2 text-sm text-text-secondary">
        {taller.centro} · {taller.barrio}
      </p>
      <p className="mt-1 text-sm font-medium text-primary">
        {taller.dia} {taller.horario}
      </p>
      {taller.direccion ? (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {taller.direccion}
        </p>
      ) : null}
      <p className="mt-3 inline-flex items-center rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-text-secondary">
        {distanciaTexto}
      </p>
      {taller.pdfUrl ? (
        <a
          href={taller.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-[44px] min-w-[44px] items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-hover hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <FileText className="h-4 w-4 shrink-0" aria-hidden />
          Ver PDF del centro
        </a>
      ) : null}
    </article>
  );
}

export const TallerCard = memo(TallerCardComponent);
