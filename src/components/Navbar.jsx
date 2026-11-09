"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GraduationCap, Menu, X, LogOut, UserCheck, FileText } from "lucide-react";
import { obtenerSesion, cerrarSesion } from "@/lib/storage";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [sesion, setSesion] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    setSesion(obtenerSesion());
    setMenuAbierto(false);
  }, [pathname]);

  const manejarCerrarSesion = () => {
    cerrarSesion();
    setSesion(null);
    setMenuAbierto(false);
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-emerald-950 text-white border-b border-emerald-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Identidad institucional RETOS */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-white hover:text-emerald-200 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-800 border border-emerald-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-emerald-200" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-wider leading-none">
                RETOS
              </span>
              <span className="text-[11px] text-emerald-300 font-medium tracking-wide">
                INSTITUTO TECNOLÓGICO
              </span>
            </div>
          </Link>

          {/* Navegación de escritorio */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <Link
              href="/"
              className={`transition-colors ${
                pathname === "/"
                  ? "text-emerald-300 font-semibold"
                  : "text-emerald-100 hover:text-white"
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/#carreras"
              className="text-emerald-100 hover:text-white transition-colors"
            >
              Carreras
            </Link>
            <Link
              href={sesion ? "/inscripcion" : "/#proceso"}
              className={`transition-colors ${
                pathname.startsWith("/inscripcion")
                  ? "text-emerald-300 font-semibold"
                  : "text-emerald-100 hover:text-white"
              }`}
            >
              Inscripciones 2027
            </Link>
            {sesion && (
              <Link
                href="/mi-inscripcion"
                className={`inline-flex items-center gap-1.5 transition-colors ${
                  pathname === "/mi-inscripcion"
                    ? "text-emerald-300 font-semibold"
                    : "text-emerald-100 hover:text-white"
                }`}
              >
                <FileText className="w-4 h-4" />
                Mi inscripción
              </Link>
            )}
          </nav>

          {/* Acciones de sesión en escritorio */}
          <div className="hidden md:flex items-center gap-3">
            {sesion ? (
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-900/90 border border-emerald-700 text-emerald-100 px-3 py-1.5 rounded-full">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-300" />
                  {sesion.nombre}
                </span>
                <button
                  type="button"
                  onClick={manejarCerrarSesion}
                  className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white border border-emerald-700 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold px-4 py-2 rounded-lg text-sm transition-colors shadow-sm"
              >
                Iniciar sesión
              </Link>
            )}
          </div>

          {/* Botón de menú móvil */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMenuAbierto(!menuAbierto)}
              aria-label="Abrir menú de navegación"
              className="p-2 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-900 focus:outline-none"
            >
              {menuAbierto ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable para dispositivos móviles */}
      {menuAbierto && (
        <div className="md:hidden bg-emerald-900 border-t border-emerald-800 px-4 pt-3 pb-4 space-y-2">
          <Link
            href="/"
            onClick={() => setMenuAbierto(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-emerald-100 hover:bg-emerald-800 hover:text-white"
          >
            Inicio
          </Link>
          <Link
            href="/#carreras"
            onClick={() => setMenuAbierto(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-emerald-100 hover:bg-emerald-800 hover:text-white"
          >
            Carreras
          </Link>
          <Link
            href={sesion ? "/inscripcion" : "/#proceso"}
            onClick={() => setMenuAbierto(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-emerald-100 hover:bg-emerald-800 hover:text-white"
          >
            Inscripciones 2027
          </Link>
          {sesion && (
            <Link
              href="/mi-inscripcion"
              onClick={() => setMenuAbierto(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-emerald-100 hover:bg-emerald-800 hover:text-white"
            >
              Mi inscripción
            </Link>
          )}

          <div className="pt-2 border-t border-emerald-800">
            {sesion ? (
              <div className="space-y-2">
                <div className="px-3 py-1 text-xs text-emerald-200 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-300" />
                  Sesión activa: <strong>{sesion.nombre}</strong>
                </div>
                <button
                  type="button"
                  onClick={manejarCerrarSesion}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuAbierto(false)}
                className="block w-full text-center bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

