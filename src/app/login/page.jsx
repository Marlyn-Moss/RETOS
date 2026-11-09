"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, AlertCircle, Info, ArrowRight } from "lucide-react";
import InputField from "@/components/InputField";
import { usuarios } from "@/data/usuarios";
import { validarLogin } from "@/lib/validaciones";
import {
  guardarSesion,
  obtenerSesion,
  obtenerCarreraPreseleccionada
} from "@/lib/storage";

export default function LoginPage() {
  const router = useRouter();
  const [formulario, setFormulario] = useState({
    correo: "",
    password: ""
  });
  const [errores, setErrores] = useState({});
  const [errorCredenciales, setErrorCredenciales] = useState("");
  const [carreraPreseleccionada, setCarreraPreseleccionada] = useState("");
  const [sesionActiva, setSesionActiva] = useState(null);

  useEffect(() => {
    setCarreraPreseleccionada(obtenerCarreraPreseleccionada());
    setSesionActiva(obtenerSesion());
  }, []);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    const nuevoEstado = {
      ...formulario,
      [name]: value
    };
    setFormulario(nuevoEstado);
    setErrorCredenciales("");

    if (errores[name]) {
      const validacion = validarLogin(nuevoEstado);
      setErrores((prev) => ({
        ...prev,
        [name]: validacion.errores[name] || ""
      }));
    }
  };

  const manejarBlur = (e) => {
    const { name } = e.target;
    const validacion = validarLogin(formulario);
    setErrores((prev) => ({
      ...prev,
      [name]: validacion.errores[name] || ""
    }));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    setErrorCredenciales("");

    const validacion = validarLogin(formulario);
    setErrores(validacion.errores);

    if (!validacion.esValido) {
      return;
    }

    const correoIngresado = formulario.correo.trim().toLowerCase();
    const usuarioEncontrado = usuarios.find(
      (u) =>
        u.correo.toLowerCase() === correoIngresado &&
        u.password === formulario.password
    );

    if (!usuarioEncontrado) {
      setErrorCredenciales("Correo electrónico o contraseña incorrectos");
      return;
    }

    // Autenticación simulada con sessionStorage (exclusivamente para fines educativos / QA)
    guardarSesion(usuarioEncontrado);
    router.push("/inscripcion");
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="w-full max-w-md space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          {/* Encabezado */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6 text-emerald-800" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Iniciar sesión
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Ingresa tus credenciales para acceder al Sistema de Inscripciones
              RETOS 2027.
            </p>
          </div>

          {carreraPreseleccionada && (
            <div className="mb-5 bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-900">
              Carrera seleccionada:{" "}
              <strong className="font-semibold">{carreraPreseleccionada}</strong>.
              Inicia sesión para continuar con tu inscripción.
            </div>
          )}

          {sesionActiva && (
            <div className="mb-5 bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex items-center justify-between gap-2">
              <div className="text-xs text-slate-700">
                Sesión activa como{" "}
                <strong className="text-slate-900">{sesionActiva.nombre}</strong>
              </div>
              <Link
                href="/inscripcion"
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950"
              >
                <span>Ir al formulario</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {errorCredenciales && (
            <div
              role="alert"
              className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-lg p-3.5 text-sm font-medium flex items-center gap-2.5"
            >
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{errorCredenciales}</span>
            </div>
          )}

          <form onSubmit={manejarEnvio} noValidate className="space-y-5">
            <InputField
              id="correo"
              name="correo"
              label="Correo electrónico"
              type="email"
              value={formulario.correo}
              onChange={manejarCambio}
              onBlur={manejarBlur}
              placeholder="estudiante@retos.edu.sv"
              error={errores.correo}
              required
              autoComplete="email"
            />

            <InputField
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              value={formulario.password}
              onChange={manejarCambio}
              onBlur={manejarBlur}
              placeholder="Ingrese su contraseña"
              error={errores.password}
              required
              autoComplete="current-password"
            />

            <button
              type="submit"
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors shadow-sm"
            >
              Iniciar sesión
            </button>
          </form>

          {/* Recuadro de credenciales de demostración para prácticas de QA */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs text-slate-600 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800 mb-1">
                <Info className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Credenciales de prueba (Simulación Educativa QA)</span>
              </div>
              <p>
                <span className="font-medium text-slate-700">Correo:</span>{" "}
                <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-900">
                  estudiante@retos.edu.sv
                </code>
              </p>
              <p>
                <span className="font-medium text-slate-700">Contraseña:</span>{" "}
                <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-900">
                  Retos2027
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

