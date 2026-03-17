/**
 * Descarga los 34 PDFs de talleres PCB desde el sitio del GCBA
 */
import * as fs from "fs";
import * as path from "path";

const BASE_URL =
  "https://static.buenosaires.gob.ar/sites/default/files/2026-03";

const PDFS: { nombre: string; urlPath: string }[] = [
  { nombre: "A. Storni", urlPath: "Talleres%20PBC_%20A.%20Storni.pdf" },
  { nombre: "Belgrano R", urlPath: "Talleres%20PBC_%20Belgrano%20R.pdf" },
  { nombre: "Colegiales", urlPath: "Talleres%20PBC_%20Colegiales.pdf" },
  { nombre: "Barrio Rivadavia", urlPath: "Talleres%20PBC_%20Barrio%20Rivadavia.pdf" },
  {
    nombre: "Baldomero F. Moreno",
    urlPath: "Talleres%20PBC_%20Baldomero%20F.%20Moreno.pdf",
  },
  { nombre: "A. Troilo", urlPath: "Talleres%20PBC_%20A.%20Troilo.pdf" },
  {
    nombre: "Artes del Parque Chacabuco",
    urlPath: "Talleres%20PBC_%20Artes%20del%20Parque%20Chacabuco.pdf",
  },
  { nombre: "Barrio Copello", urlPath: "Talleres%20PBC_%20Barrio%20Copello.pdf" },
  { nombre: "CEPNA", urlPath: "Talleres%20PBC_%20CEPNA.pdf" },
  { nombre: "H. Manzi", urlPath: "Talleres%20PBC_%20H.%20Manzi.pdf" },
  {
    nombre: "Elías Castelnuovo",
    urlPath: "Talleres%20PBC_%20El%C3%ADas%20Castelnuovo.pdf",
  },
  { nombre: "Devoto", urlPath: "Talleres%20PBC_%20Devoto.pdf" },
  { nombre: "El Eternauta", urlPath: "Talleres%20PBC_%20El%20Eternauta.pdf" },
  {
    nombre: "Julio Cortázar",
    urlPath: "Talleres%20PBC_%20Julio%20Cort%C3%A1zar.pdf",
  },
  { nombre: "Discepolín", urlPath: "Talleres%20PBC_%20Discepol%C3%ADn.pdf" },
  {
    nombre: "Fortunato Lacámera",
    urlPath: "Talleres%20PBC_%20Fortunato%20Lac%C3%A1mera.pdf",
  },
  { nombre: "El Taller", urlPath: "Talleres%20PBC_%20El%20Taller.pdf" },
  {
    nombre: "Juan Carlos Castagnino",
    urlPath: "Talleres%20PBC_%20Juan%20Carlos%20Castagnino.pdf",
  },
  {
    nombre: "Eladia Blázquez",
    urlPath: "Talleres%20PBC_%20Eladia%20Bl%C3%A1zquez.pdf",
  },
  { nombre: "Lola Mora", urlPath: "Talleres%20PBC_%20Lola%20Mora.pdf" },
  { nombre: "O. Pugliese", urlPath: "Talleres%20PBC_%20O.%20Pugliese.pdf" },
  {
    nombre: "La Casita de la Selva",
    urlPath: "Talleres%20PBC_%20La%20Casita%20de%20la%20Selva.pdf",
  },
  {
    nombre: "M. Fernández",
    urlPath: "Talleres%20PBC_%20M.%20Fern%C3%A1ndez.pdf",
  },
  {
    nombre: "L. Spilimbergo",
    urlPath: "Talleres%20PBC_%20L.%20Spilimbergo.pdf",
  },
  { nombre: "La Usina", urlPath: "Talleres%20PBC_%20La%20Usina.pdf" },
  {
    nombre: "Nuestra Tierra",
    urlPath: "Talleres%20PBC_%20Nuestra%20Tierra.pdf",
  },
  {
    nombre: "La Paternal",
    urlPath: "Talleres%20PBC_%20La%20Paternal.pdf",
  },
  {
    nombre: "Nicolás Olivari",
    urlPath: "Talleres%20PBC_%20Nicol%C3%A1s%20Olivari.pdf",
  },
  { nombre: "Olímpico", urlPath: "Talleres%20PBC_%20Ol%C3%ADmpico.pdf" },
  { nombre: "A. Olmedo", urlPath: "Talleres%20PBC_A.%20Olmedo.pdf" },
  {
    nombre: "Sebastián Piana",
    urlPath: "Talleres%20PBC_%20Sebasti%C3%A1n%20Piana.pdf",
  },
  { nombre: "R. Arlt", urlPath: "Talleres%20PBC_%20R.%20Arlt.pdf" },
  { nombre: "Tato Bores", urlPath: "Talleres%20PBC_%20Tato%20Bores.pdf" },
  { nombre: "Versalles", urlPath: "Talleres%20PBC_%20Versalles.pdf" },
  { nombre: "Saladiyo", urlPath: "Talleres%20PBC_%20Saladiyo.pdf" },
  {
    nombre: "R. Santoro",
    urlPath: "Talleres%20PBC_%20R.%20Santoro.pdf",
  },
];

const OUTPUT_DIR = path.join(process.cwd(), "data", "pdfs");

function slugify(nombre: string): string {
  return nombre
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

async function downloadPdf(
  url: string,
  destPath: string
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; TalleresLupi/1.0)" },
    });
    if (!res.ok) {
      return { ok: false, error: `HTTP ${res.status}` };
    }
    const buf = await res.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(buf));
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

async function main(): Promise<void> {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let ok = 0;
  let fail = 0;

  for (const { nombre, urlPath } of PDFS) {
    const url = `${BASE_URL}/${urlPath}`;
    const destPath = path.join(OUTPUT_DIR, `${slugify(nombre)}.pdf`);
    process.stdout.write(`Descargando ${nombre}... `);
    const result = await downloadPdf(url, destPath);
    if (result.ok) {
      process.stdout.write("OK\n");
      ok++;
    } else {
      process.stdout.write(`FALLO: ${result.error}\n`);
      fail++;
    }
  }

  process.stdout.write(`\nListo: ${ok} OK, ${fail} fallos.\n`);
}

main().catch((e) => {
  process.stderr.write(String(e));
  process.exit(1);
});
