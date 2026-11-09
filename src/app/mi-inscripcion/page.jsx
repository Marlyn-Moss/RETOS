"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import { obtenerSesion, obtenerInscripcion } from "@/lib/storage";

export default function MiInscripcionPage() {
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
          Consultando información de inscripción...
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 py-10 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Expediente de Admisión 2027
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Mi inscripción
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Consulta el detalle y estado actual de tu registro en el Instituto
              RETOS.
            </p>
          </div>
        </div>

        {!inscripcion ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6 text-slate-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              No se encontró una inscripción registrada
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Actualmente no existen datos de inscripción guardados en este
              navegador. Completa el formulario para registrar tu admisión.
            </p>
            <div className="pt-2">
              <Link
                href="/inscripcion"
                className="inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver al formulario</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Encabezado de la tarjeta */}
            <div className="bg-emerald-950 text-white px-6 py-5 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-900 border border-emerald-700 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                    Identificador de inscripción
                  </p>
                  <p className="text-lg font-bold text-white tracking-wide">
                    {inscripcion.idInscripcion}
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 bg-emerald-900/90 border border-emerald-600 text-emerald-100 px-3.5 py-1.5 rounded-full text-xs font-semibold w-fit">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Estado: Inscripción registrada</span>
              </div>
            </div>

            {/* Detalle de los campos */}
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
                    Estado
                  </dt>
                  <dd className="mt-1 font-semibold text-emerald-800">
                    Inscripción registrada
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
                    Documento de identidad ({inscripcion.tipoDocumento})
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

                <div className="border-b border-slate-100 pb-3">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Fecha de registro
                  </dt>
                  <dd className="mt-1 font-semibold text-slate-900">
                    {inscripcion.fechaInscripcion}
                  </dd>
                </div>

                <div className="sm:col-span-2 pt-1">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Carrera
                  </dt>
                  <dd className="mt-1 font-bold text-emerald-900 text-base">
                    {inscripcion.carrera}
                  </dd>
                </div>
              </dl>

              <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
                <Link
                  href="/inscripcion"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors shadow-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver al formulario</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

