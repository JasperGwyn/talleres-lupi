/**
 * Inspecciona un PDF para ver la estructura del texto
 */
import * as fs from "fs";
import * as path from "path";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse");

const PDF_DIR = path.join(process.cwd(), "data", "pdfs");

async function main(): Promise<void> {
  const files = fs.readdirSync(PDF_DIR).filter((f) => f.endsWith(".pdf"));
  const sample = "lola-mora.pdf"; // Caballito - suele tener talleres infantiles
  const buf = fs.readFileSync(path.join(PDF_DIR, sample));
  const data = await pdfParse(buf);
  process.stdout.write(`--- ${sample} (${data.numpages} páginas) ---\n\n`);
  process.stdout.write(data.text);
}

main().catch((e) => {
  process.stderr.write(String(e));
  process.exit(1);
});
