/**
 * Mapeo centro cultural → URL del PDF de talleres PCB (GCBA)
 * Fuente: https://buenosaires.gob.ar
 */
const BASE_URL =
  "https://static.buenosaires.gob.ar/sites/default/files/2026-03";

const PDFS: { nombre: string; urlPath: string }[] = [
  { nombre: "A. Storni", urlPath: "Talleres%20PBC_%20A.%20Storni.pdf" },
  { nombre: "Belgrano R", urlPath: "Talleres%20PBC_%20Belgrano%20R.pdf" },
  { nombre: "Colegiales", urlPath: "Talleres%20PBC_%20Colegiales.pdf" },
  {
    nombre: "Barrio Rivadavia",
    urlPath: "Talleres%20PBC_%20Barrio%20Rivadavia.pdf",
  },
  {
    nombre: "Baldomero F. Moreno",
    urlPath: "Talleres%20PBC_%20Baldomero%20F.%20Moreno.pdf",
  },
  { nombre: "A. Troilo", urlPath: "Talleres%20PBC_%20A.%20Troilo.pdf" },
  {
    nombre: "Artes del Parque Chacabuco",
    urlPath: "Talleres%20PBC_%20Artes%20del%20Parque%20Chacabuco.pdf",
  },
  {
    nombre: "Barrio Copello",
    urlPath: "Talleres%20PBC_%20Barrio%20Copello.pdf",
  },
  { nombre: "CEPNA", urlPath: "Talleres%20PBC_%20CEPNA.pdf" },
  { nombre: "H. Manzi", urlPath: "Talleres%20PBC_%20H.%20Manzi.pdf" },
  {
    nombre: "Elías Castelnuovo",
    urlPath: "Talleres%20PBC_%20El%C3%ADas%20Castelnuovo.pdf",
  },
  { nombre: "Devoto", urlPath: "Talleres%20PBC_%20Devoto.pdf" },
  {
    nombre: "El Eternauta",
    urlPath: "Talleres%20PBC_%20El%20Eternauta.pdf",
  },
  {
    nombre: "Julio Cortázar",
    urlPath: "Talleres%20PBC_%20Julio%20Cort%C3%A1zar.pdf",
  },
  {
    nombre: "Discepolín",
    urlPath: "Talleres%20PBC_%20Discepol%C3%ADn.pdf",
  },
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

const urlByCentro = new Map<string, string>();
for (const { nombre, urlPath } of PDFS) {
  urlByCentro.set(nombre, `${BASE_URL}/${urlPath}`);
}

/** Alias de centros que apuntan al mismo PDF */
const ALIASES: Record<string, string> = {
  "Alfonsina Storni": "A. Storni",
  "Aníbal Troilo": "A. Troilo",
  "Homero Manzi": "H. Manzi",
  "Osvaldo Pugliese": "O. Pugliese",
  "Macedonio Fernández": "M. Fernández",
  "Lino Spilimbergo": "L. Spilimbergo",
  "Roberto Arlt": "R. Arlt",
  "Alberto Olmedo": "A. Olmedo",
  "Roberto Santoro": "R. Santoro",
};

export function getPdfUrlForCentro(centro: string): string | undefined {
  return (
    urlByCentro.get(centro) ?? urlByCentro.get(ALIASES[centro] ?? "")
  );
}
