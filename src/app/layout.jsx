import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "RETOS — Sistema de Inscripciones 2027",
  description:
    "Sistema web educativo de inscripciones del Instituto RETOS para el proceso de admisión 2027."
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

