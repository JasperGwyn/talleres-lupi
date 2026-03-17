/**
 * Geocodifica direcciones de centros culturales y calcula distancia desde Charcas 3445
 * Usa Nominatim (OpenStreetMap) para geocodificación
 */
import * as fs from "fs";
import * as path from "path";
import { CENTROS } from "../data/centros";

const OUTPUT_PATH = path.join(process.cwd(), "data", "centros-con-distancia.json");

const CHARCAS_3445 = { lat: -34.5901452, lon: -58.4142395 };

interface CentroConDistancia {
  centro: string;
  direccion: string;
  barrio: string;
  lat: number;
  lng: number;
  kmDesdeCharcas3445: number;
}

function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

async function geocodificarNominatim(
  direccion: string
): Promise<{ lat: number; lon: number } | null> {
  const query = `${direccion}, Buenos Aires, Argentina`;
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "TalleresLupi/1.0 (talleres para niños CABA)" },
    });
    const data = (await res.json()) as Array<{ lat: string; lon: string }>;
    if (Array.isArray(data) && data[0]) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      };
    }
  } catch {
    // ignore
  }
  return null;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function main(): Promise<void> {
  const { lat: latOrigen, lon: lngOrigen } = CHARCAS_3445;
  process.stdout.write(
    `Origen Charcas 3445: ${latOrigen.toFixed(5)}, ${lngOrigen.toFixed(5)}\n\n`
  );

  const centrosUnicos = new Map<string, { direccion: string; barrio: string }>();
  for (const [nombre, info] of Object.entries(CENTROS)) {
    if (!centrosUnicos.has(nombre)) {
      centrosUnicos.set(nombre, info);
    }
  }

  const resultados: CentroConDistancia[] = [];
  const entries = Array.from(centrosUnicos.entries());

  for (let i = 0; i < entries.length; i++) {
    const [centro, info] = entries[i];
    if (i > 0) await sleep(1100);
    process.stdout.write(`Geocodificando ${centro}... `);
    const coord = await geocodificarNominatim(info.direccion);
    if (coord) {
      const km = haversine(latOrigen, lngOrigen, coord.lat, coord.lon);
      resultados.push({
        centro,
        direccion: info.direccion,
        barrio: info.barrio,
        lat: coord.lat,
        lng: coord.lon,
        kmDesdeCharcas3445: Math.round(km * 10) / 10,
      });
      process.stdout.write(`${km.toFixed(1)} km\n`);
    } else {
      process.stdout.write("FALLO\n");
      resultados.push({
        centro,
        direccion: info.direccion,
        barrio: info.barrio,
        lat: 0,
        lng: 0,
        kmDesdeCharcas3445: 999,
      });
    }
  }

  fs.writeFileSync(
    OUTPUT_PATH,
    JSON.stringify(resultados, null, 2),
    "utf-8"
  );
  process.stdout.write(`\nGuardado en ${OUTPUT_PATH}\n`);
}

main().catch((e) => {
  process.stderr.write(String(e));
  process.exit(1);
});
