import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Talleres PCB para Lupita",
  description: "Talleres artístico-culturales para niños de 10 años en CABA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
