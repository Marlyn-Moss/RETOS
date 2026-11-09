"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Code,
  ShieldCheck,
  Award,
  LogIn,
  ClipboardEdit,
  BadgeCheck
} from "lucide-react";
import CareerCard from "@/components/CareerCard";
import { carreras } from "@/data/carreras";
import { guardarCarreraPreseleccionada } from "@/lib/storage";

export default function HomePage() {
  const router = useRouter();

  const manejarSeleccionCarrera = (nombreCarrera) => {
    guardarCarreraPreseleccionada(nombreCarrera);
    router.push("/login");
  };

  const pasosInscripcion = [
    {
      numero: "01",
      titulo: "Inicia sesión",
      descripcion:
        "Ingresa al portal de admisiones utilizando tus credenciales de estudiante asignadas por la institución.",
      icono: LogIn
    },
    {
      numero: "02",
      titulo: "Completa tus datos personales",
      descripcion:
        "Registra tu información personal, documento de identificación correspondiente y selecciona tu carrera técnica.",
      icono: ClipboardEdit
    },
    {
      numero: "03",
      titulo: "Confirma tu inscripción",
      descripcion:
        "Verifica tus datos, envía tu solicitud y obtén tu comprobante con identificador oficial de inscripción 2027.",
      icono: BadgeCheck
    }
  ];

  return (
    <div id="inicio" className="flex flex-col">
      {/* Sección Principal (Hero) */}
      <section className="bg-white border-b border-slate-200 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Contenido textual del Hero */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-900 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                Admisión Académica 2027
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 tracking-tight leading-tight">
                INSCRIPCIONES ABIERTAS 2027
              </h1>

              <h2 className="text-xl sm:text-2xl font-semibold text-emerald-800">
                Construye tu futuro profesional con RETOS
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Prepárate para desarrollar competencias técnicas y profesionales
                en áreas de alta demanda. Inicia tu proceso de inscripción para
                el año académico 2027.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-6 py-3.5 rounded-lg text-base transition-colors shadow-sm"
                >
                  <span>Inscríbete ahora</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <a
                  href="#carreras"
                  className="inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-6 py-3.5 rounded-lg text-base transition-colors"
                >
                  Conocer oferta académica
                </a>
              </div>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Laboratorios especializados</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Formación práctica e innovadora</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Proceso 100% en línea</span>
                </div>
              </div>
            </div>

            {/* Ilustración / Elemento visual tecnológico y educativo */}
            <div className="lg:col-span-5">
              <div className="bg-emerald-950 rounded-2xl p-6 sm:p-8 text-white border border-emerald-800 shadow-md relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-emerald-800 pb-4 mb-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                      Instituto Tecnológico RETOS
                    </p>
                    <p className="text-lg font-bold text-white mt-0.5">
                      Ecosistema de Innovación 2027
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-900 border border-emerald-700 flex items-center justify-center">
                    <Award className="w-5 h-5 text-emerald-300" />
                  </div>
                </div>

                {/* Ilustración vectorial integrada */}
                <div className="bg-emerald-900/60 border border-emerald-800 rounded-xl p-5 mb-6">
                  <svg
                    viewBox="0 0 360 170"
                    className="w-full h-auto"
                    role="img"
                    aria-label="Ilustración tecnológica y educativa de RETOS 2027"
                  >
                    <rect
                      x="10"
                      y="15"
                      width="340"
                      height="140"
                      rx="10"
                      fill="#064e3b"
                      stroke="#059669"
                      strokeWidth="1.5"
                    />
                    {/* Líneas de circuito tecnológico */}
                    <path
                      d="M35 50 H110 L130 70 H210"
                      stroke="#34d399"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M35 120 H95 L115 100 H185"
                      stroke="#6ee7b7"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <circle cx="35" cy="50" r="4" fill="#34d399" />
                    <circle cx="210" cy="70" r="4" fill="#34d399" />
                    <circle cx="35" cy="120" r="4" fill="#6ee7b7" />
                    <circle cx="185" cy="100" r="4" fill="#6ee7b7" />

                    {/* Nodo central educativo */}
                    <rect
                      x="225"
                      y="40"
                      width="100"
                      height="90"
                      rx="8"
                      fill="#022c22"
                      stroke="#10b981"
                      strokeWidth="2"
                    />
                    <text
                      x="275"
                      y="78"
                      textAnchor="middle"
                      fill="#ecfdf5"
                      fontSize="15"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                    >
                      RETOS
                    </text>
                    <text
                      x="275"
                      y="102"
                      textAnchor="middle"
                      fill="#6ee7b7"
                      fontSize="13"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                    >
                      2027
                    </text>

                    {/* Indicadores de progreso */}
                    <rect
                      x="45"
                      y="72"
                      width="65"
                      height="10"
                      rx="5"
                      fill="#10b981"
                    />
                    <rect
                      x="45"
                      y="88"
                      width="45"
                      height="8"
                      rx="4"
                      fill="#a7f3d0"
                    />
                  </svg>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-emerald-900/80 border border-emerald-800 rounded-lg p-3 flex items-center gap-2.5">
                    <Cpu className="w-5 h-5 text-emerald-300 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Ingeniería Aplicada</p>
                      <p className="text-emerald-200">Tecnología Industrial</p>
                    </div>
                  </div>
                  <div className="bg-emerald-900/80 border border-emerald-800 rounded-lg p-3 flex items-center gap-2.5">
                    <Code className="w-5 h-5 text-emerald-300 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Innovación Digital</p>
                      <p className="text-emerald-200">Software y Logística</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección C: Oferta Académica */}
      <section id="carreras" className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Programas Académicos
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
              Oferta Académica 2027
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Selecciona la carrera técnica de tu interés para comenzar tu
              proceso de admisión en el Instituto RETOS.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {carreras.map((carrera) => (
              <CareerCard
                key={carrera.id}
                carrera={carrera}
                onSeleccionar={manejarSeleccionCarrera}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sección D: Proceso de Inscripción */}
      <section id="proceso" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Guía de Admisión
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
              Proceso de inscripción
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Completa tu registro en tres sencillos pasos dentro de nuestra
              plataforma académica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pasosInscripcion.map((paso) => {
              const IconoPaso = paso.icono;
              return (
                <div
                  key={paso.numero}
                  className="bg-slate-50 rounded-xl border border-slate-200 p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-lg bg-emerald-800 text-white flex items-center justify-center">
                        <IconoPaso className="w-5 h-5" />
                      </div>
                      <span className="text-2xl font-extrabold text-emerald-800/30">
                        Paso {paso.numero}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {paso.titulo}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {paso.descripcion}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-800 shrink-0 mt-0.5 sm:mt-0" />
              <div>
                <p className="text-sm font-bold text-emerald-950">
                  ¿Listo para asegurar tu cupo en el año académico 2027?
                </p>
                <p className="text-xs sm:text-sm text-emerald-800">
                  Inicia sesión con tu cuenta estudiantil para acceder al
                  formulario oficial de inscripción.
                </p>
              </div>
            </div>
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors shrink-0"
            >
              <span>Iniciar sesión</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

