/**
 * Escanea PDFs para ver qué secciones de edad tienen
 */
import * as fs from "fs";
import * as path from "path";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse");

const PDF_DIR = path.join(process.cwd(), "data", "pdfs");

const SECTIONS = [
  "NIÑOS",
  "INFANTIL",
  "JÓVENES",
  "ADULTOS",
  "6 A 12",
  "desde 8",
  "niños",
];

async function main(): Promise<void> {
  const files = fs.readdirSync(PDF_DIR).filter((f) => f.endsWith(".pdf"));
  for (const f of files.slice(0, 5)) {
    const buf = fs.readFileSync(path.join(PDF_DIR, f));
    const data = await pdfParse(buf);
    const found = SECTIONS.filter((s) =>
      data.text.toUpperCase().includes(s.toUpperCase())
    );
    process.stdout.write(`${f}: ${found.join(", ")}\n`);
  }
}

main().catch((e) => {
  process.stderr.write(String(e));
  process.exit(1);
});
