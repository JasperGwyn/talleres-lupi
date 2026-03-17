/**
 * Merge talleres.json + centros-con-distancia.json para el dataset final
 */
import * as fs from "fs";
import * as path from "path";
import { getPdfUrlForCentro } from "../data/centro-pdf-urls";

const TALLERES_PATH = path.join(process.cwd(), "data", "talleres.json");
const CENTROS_PATH = path.join(process.cwd(), "data", "centros-con-distancia.json");
const OUTPUT_PATH = path.join(process.cwd(), "public", "talleres.json");

interface Taller {
  nombre: string;
  centro: string;
  barrio: string;
  dia: string;
  horario: string;
  edad: string;
}

interface Centro {
  centro: string;
  direccion: string;
  barrio: string;
  lat: number;
  lng: number;
  kmDesdeCharcas3445: number;
}

interface TallerConDistancia extends Taller {
  direccion: string;
  kmDesdeCharcas3445: number;
  pdfUrl?: string;
}

function main(): void {
  const talleres = JSON.parse(
    fs.readFileSync(TALLERES_PATH, "utf-8")
  ) as Taller[];
  const centros = JSON.parse(
    fs.readFileSync(CENTROS_PATH, "utf-8")
  ) as Centro[];

  const centrosMap = new Map<string, Centro>();
  for (const c of centros) {
    if (!centrosMap.has(c.centro) || c.kmDesdeCharcas3445 < 100) {
      centrosMap.set(c.centro, c);
    }
  }

  const resultado: TallerConDistancia[] = [];
  for (const t of talleres) {
    const centro = centrosMap.get(t.centro);
    const pdfUrl = getPdfUrlForCentro(t.centro);
    if (centro) {
      resultado.push({
        ...t,
        direccion: centro.direccion,
        kmDesdeCharcas3445: centro.kmDesdeCharcas3445,
        ...(pdfUrl && { pdfUrl }),
      });
    } else {
      resultado.push({
        ...t,
        direccion: "",
        kmDesdeCharcas3445: 999,
        ...(pdfUrl && { pdfUrl }),
      });
    }
  }

  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  fs.writeFileSync(
    OUTPUT_PATH,
    JSON.stringify(resultado, null, 2),
    "utf-8"
  );
  process.stdout.write(`Merge: ${resultado.length} talleres → ${OUTPUT_PATH}\n`);
}

main();
