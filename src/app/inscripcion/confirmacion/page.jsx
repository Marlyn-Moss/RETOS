"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Home, FileText, AlertCircle } from "lucide-react";
import { obtenerSesion, obtenerInscripcion } from "@/lib/storage";

export default function ConfirmacionInscripcionPage() {
  const router = useRouter();
  const [cargando, setCargando] = useState(true);
  const [inscripcion, setInscripcion] = useState(null);

  useEffect(() => {
    const sesion = obtenerSesion();
    if (!sesion) {
      router.replace("/login");
      return;
    }

    const datosGuardados = obtenerInscripcion();
    setInscripcion(datosGuardados);
    setCargando(false);
  }, [router]);

  if (cargando) {
    return (
      <div className="flex-1 flex items-center justify-center py-16">
        <p className="text-sm text-slate-600 font-medium">
          Cargando confirmación de inscripción...
        </p>
      </div>
    );
  }

  if (!inscripcion) {
    return (
      <div className="flex-1 flex items-center justify-center py-14 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6 text-amber-700" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            No se encontró una inscripción registrada
          </h1>
          <p className="text-sm text-slate-600">
            Aún no has completado el formulario de admisión para el ciclo 2027.
          </p>
          <div className="pt-2">
            <Link
              href="/inscripcion"
              className="inline-flex items-center justify-center bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
            >
              Ir al formulario de inscripción
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 py-10 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Encabezado de éxito */}
        <div className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 border border-emerald-800 shadow-sm text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-800 border border-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-300" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            ¡Inscripción realizada correctamente!
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 mt-2 max-w-xl mx-auto">
            Tu información ha sido registrada exitosamente en el proceso de
            inscripciones RETOS 2027.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 bg-emerald-900 border border-emerald-700 px-4 py-2 rounded-lg">
            <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
              Código de Inscripción:
            </span>
            <span className="text-sm font-bold text-white tracking-wide">
              {inscripcion.idInscripcion}
            </span>
          </div>
        </div>

        {/* Tarjeta con la información ingresada */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-base font-bold text-slate-900">
              Resumen de datos registrados
            </h2>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              {inscripcion.estado || "Inscripción registrada"}
            </span>
          </div>

          <div className="p-6 sm:p-8">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 text-sm">
              <div className="border-b border-slate-100 pb-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Identificador de inscripción
                </dt>
                <dd className="mt-1 font-bold text-emerald-900">
                  {inscripcion.idInscripcion}
                </dd>
              </div>

              <div className="border-b border-slate-100 pb-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Fecha de inscripción
                </dt>
                <dd className="mt-1 font-semibold text-slate-900">
                  {inscripcion.fechaInscripcion}
                </dd>
              </div>

              <div className="sm:col-span-2 border-b border-slate-100 pb-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Nombre completo
                </dt>
                <dd className="mt-1 font-semibold text-slate-900 text-base">
                  {inscripcion.nombreCompleto}
                </dd>
              </div>

              <div className="border-b border-slate-100 pb-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Edad
                </dt>
                <dd className="mt-1 font-semibold text-slate-900">
                  {inscripcion.edad} años
                </dd>
              </div>

              <div className="border-b border-slate-100 pb-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Tipo de documento
                </dt>
                <dd className="mt-1 font-semibold text-slate-900">
                  {inscripcion.tipoDocumento}
                </dd>
              </div>

              <div className="border-b border-slate-100 pb-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Número de DUI correspondiente
                </dt>
                <dd className="mt-1 font-semibold text-slate-900 font-mono">
                  {inscripcion.dui}
                </dd>
              </div>

              <div className="border-b border-slate-100 pb-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Nacionalidad
                </dt>
                <dd className="mt-1 font-semibold text-slate-900">
                  {inscripcion.nacionalidad}
                </dd>
              </div>

              <div className="border-b border-slate-100 pb-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Teléfono
                </dt>
                <dd className="mt-1 font-semibold text-slate-900 font-mono">
                  {inscripcion.telefono}
                </dd>
              </div>

              <div className="border-b border-slate-100 pb-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Género
                </dt>
                <dd className="mt-1 font-semibold text-slate-900">
                  {inscripcion.genero}
                </dd>
              </div>

              <div className="sm:col-span-2 pt-1">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Carrera seleccionada
                </dt>
                <dd className="mt-1 font-bold text-emerald-900 text-base">
                  {inscripcion.carrera}
                </dd>
              </div>
            </dl>

            {/* Botones de navegación */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-3">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Volver al inicio</span>
              </Link>

              <Link
                href="/mi-inscripcion"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors shadow-sm"
              >
                <FileText className="w-4 h-4" />
                <span>Ver mi inscripción</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

