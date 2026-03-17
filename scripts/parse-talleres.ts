/**
 * Parsea PDFs de talleres PCB y extrae talleres para niños (~10 años)
 */
import * as fs from "fs";
import * as path from "path";
import { CENTROS } from "../data/centros";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse");

const PDF_DIR = path.join(process.cwd(), "data", "pdfs");
const OUTPUT_PATH = path.join(process.cwd(), "data", "talleres.json");

const DIAS = [
  "LUNES",
  "MARTES",
  "MIÉRCOLES",
  "JUEVES",
  "VIERNES",
  "SÁBADO",
] as const;

const DIAS_REGEX = new RegExp(
  `(${DIAS.join("|")})`,
  "i"
);

const HORA_REGEX = /(\d{1,2}:\d{2})\s*a\s*(\d{1,2}:\d{2})h?/i;

interface Taller {
  nombre: string;
  centro: string;
  barrio: string;
  dia: string;
  horario: string;
  edad: string;
}

function normalizarCentro(filename: string): string {
  const base = path.basename(filename, ".pdf");
  const map: Record<string, string> = {
    "a-storni": "A. Storni",
    "belgrano-r": "Belgrano R",
    "barrio-rivadavia": "Barrio Rivadavia",
    "baldomero-f-moreno": "Baldomero F. Moreno",
    "a-troilo": "A. Troilo",
    "artes-del-parque-chacabuco": "Artes del Parque Chacabuco",
    "barrio-copello": "Barrio Copello",
    "h-manzi": "H. Manzi",
    "elias-castelnuovo": "Elías Castelnuovo",
    "elas-castelnuovo": "Elías Castelnuovo",
    "el-eternauta": "El Eternauta",
    "julio-cortazar": "Julio Cortázar",
    "julio-cortzar": "Julio Cortázar",
    "discepolin": "Discepolín",
    "discepoln": "Discepolín",
    "fortunato-lacamera": "Fortunato Lacámera",
    "fortunato-lacmera": "Fortunato Lacámera",
    "el-taller": "El Taller",
    "juan-carlos-castagnino": "Juan Carlos Castagnino",
    "eladia-blazquez": "Eladia Blázquez",
    "eladia-blzquez": "Eladia Blázquez",
    "lola-mora": "Lola Mora",
    "o-pugliese": "O. Pugliese",
    "la-casita-de-la-selva": "La Casita de la Selva",
    "m-fernandez": "M. Fernández",
    "m-fernndez": "M. Fernández",
    "l-spilimbergo": "L. Spilimbergo",
    "la-usina": "La Usina",
    "nuestra-tierra": "Nuestra Tierra",
    "la-paternal": "La Paternal",
    "nicolas-olivari": "Nicolás Olivari",
    "nicols-olivari": "Nicolás Olivari",
    "olimpico": "Olímpico",
    "olmpico": "Olímpico",
    "a-olmedo": "A. Olmedo",
    "sebastian-piana": "Sebastián Piana",
    "sebastin-piana": "Sebastián Piana",
    "r-arlt": "R. Arlt",
    "tato-bores": "Tato Bores",
    versalles: "Versalles",
    saladiyo: "Saladiyo",
    "r-santoro": "R. Santoro",
    colegiales: "Colegiales",
    devoto: "Devoto",
    cepna: "CEPNA",
  };
  return map[base] ?? base.replace(/-/g, " ");
}

function extraerSeccionNiños(texto: string): string {
  const upper = texto.toUpperCase();
  const idxNiños = upper.indexOf("NIÑOS");
  const idxInfantil = upper.indexOf("INFANTIL");
  let start = -1;
  let seccion = "NIÑOS";
  if (idxNiños >= 0) {
    start = idxNiños;
    seccion = "NIÑOS";
  }
  if (idxInfantil >= 0 && (start < 0 || idxInfantil < start)) {
    start = idxInfantil;
    seccion = "INFANTIL";
  }
  if (start < 0) return "";
  const rest = texto.slice(start);
  const idxJovenes = rest.toUpperCase().indexOf("JÓVENES");
  const idxAdultos = rest.toUpperCase().indexOf("ADULTOS");
  let end = rest.length;
  if (idxJovenes >= 0 && idxJovenes > 100) end = idxJovenes;
  if (idxAdultos >= 0 && idxAdultos > 100 && idxAdultos < end) end = idxAdultos;
  return rest.slice(0, end);
}

function parsearTalleres(seccion: string): Omit<Taller, "centro" | "barrio">[] {
  const talleres: Omit<Taller, "centro" | "barrio">[] = [];
  const lineas = seccion.split(/\n/).map((l) => l.trim()).filter(Boolean);
  let i = 0;
  while (i < lineas.length) {
    const numMatch = lineas[i].match(/^(\d+)\s*$/);
    if (numMatch) {
      const partes: string[] = [];
      i++;
      while (i < lineas.length) {
        const linea = lineas[i];
        const diaMatch = linea.match(DIAS_REGEX);
        const horaMatch = linea.match(HORA_REGEX);
        if (diaMatch && horaMatch) {
          const dia = diaMatch[1].toUpperCase();
          const horaIni = horaMatch[1];
          const horaFin = horaMatch[2];
          const nombre = linea
            .replace(DIAS_REGEX, "")
            .replace(HORA_REGEX, "")
            .trim();
          const nombreCompleto = [nombre, ...partes].reverse().join(" ").trim();
          if (nombreCompleto) {
            talleres.push({
              nombre: nombreCompleto,
              dia,
              horario: `${horaIni} - ${horaFin}`,
              edad: "niños",
            });
          }
          i++;
          break;
        }
        partes.unshift(linea);
        i++;
      }
    } else {
      i++;
    }
  }
  return talleres;
}

function parsearTalleresRegex(seccion: string): Omit<Taller, "centro" | "barrio">[] {
  const talleres: Omit<Taller, "centro" | "barrio">[] = [];
  const bloques = seccion.split(/\n\s*(\d+)\s*\n/).filter(Boolean);
  for (let j = 1; j < bloques.length; j += 2) {
    const num = bloques[j - 1];
    const resto = bloques[j];
    const diaMatch = resto.match(DIAS_REGEX);
    const horaMatch = resto.match(HORA_REGEX);
    if (diaMatch && horaMatch) {
      const dia = diaMatch[1].toUpperCase();
      const horaIni = horaMatch[1];
      const horaFin = horaMatch[2];
      const nombre = resto
        .replace(DIAS_REGEX, "")
        .replace(HORA_REGEX, "")
        .replace(/\s+/g, " ")
        .trim();
      if (nombre.length > 1) {
        talleres.push({
          nombre,
          dia,
          horario: `${horaIni} - ${horaFin}`,
          edad: "niños",
        });
      }
    }
  }
  return talleres;
}

async function procesarPdf(
  filepath: string,
  centro: string
): Promise<Omit<Taller, "centro" | "barrio">[]> {
  const buf = fs.readFileSync(filepath);
  const data = await pdfParse(buf);
  const seccion = extraerSeccionNiños(data.text);
  if (!seccion) return [];
  let talleres = parsearTalleres(seccion);
  if (talleres.length === 0) {
    talleres = parsearTalleresRegex(seccion);
  }
  return talleres;
}

async function main(): Promise<void> {
  const files = fs.readdirSync(PDF_DIR).filter((f) => f.endsWith(".pdf"));
  const todos: Taller[] = [];

  for (const f of files) {
    const centro = normalizarCentro(f);
    const info = CENTROS[centro] ?? {
      direccion: "",
      barrio: centro,
    };
    const filepath = path.join(PDF_DIR, f);
    const items = await procesarPdf(filepath, centro);
    for (const t of items) {
      todos.push({
        ...t,
        centro,
        barrio: info.barrio,
      });
    }
    if (items.length > 0) {
      process.stdout.write(`${centro}: ${items.length} talleres\n`);
    }
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(todos, null, 2), "utf-8");
  process.stdout.write(`\nTotal: ${todos.length} talleres → ${OUTPUT_PATH}\n`);
}

main().catch((e) => {
  process.stderr.write(String(e));
  process.exit(1);
});
