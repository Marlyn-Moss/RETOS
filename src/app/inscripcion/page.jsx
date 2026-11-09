"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ClipboardList, CheckCircle2, FileText } from "lucide-react";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import { nombresCarreras, nacionalidades, generos } from "@/data/carreras";
import {
  formatearTelefono,
  validarCampoInscripcion,
  validarFormularioInscripcion
} from "@/lib/validaciones";
import {
  obtenerSesion,
  obtenerCarreraPreseleccionada,
  guardarInscripcion,
  obtenerInscripcion
} from "@/lib/storage";

export default function InscripcionPage() {
  const router = useRouter();
  const [verificandoSesion, setVerificandoSesion] = useState(true);
  const [tieneInscripcionPrevia, setTieneInscripcionPrevia] = useState(false);

  const [datos, setDatos] = useState({
    nombreCompleto: "",
    edad: "",
    dui: "",
    nacionalidad: "",
    telefono: "",
    genero: "",
    carrera: ""
  });

  const [errores, setErrores] = useState({});
  const [camposTocados, setCamposTocados] = useState({});

  useEffect(() => {
    const sesion = obtenerSesion();
    if (!sesion) {
      router.replace("/login");
      return;
    }

    const carreraPre = obtenerCarreraPreseleccionada();
    if (carreraPre && nombresCarreras.includes(carreraPre)) {
      setDatos((prev) => ({
        ...prev,
        carrera: carreraPre
      }));
    }

    const inscripcionGuardada = obtenerInscripcion();
    if (inscripcionGuardada) {
      setTieneInscripcionPrevia(true);
    }

    setVerificandoSesion(false);
  }, [router]);

  // Determinar etiqueta de DUI dinámicamente según la edad ingresada
  const edadTexto = String(datos.edad ?? "").trim();
  const edadNumero = Number(edadTexto);
  const esMenorDeEdad =
    edadTexto !== "" && !Number.isNaN(edadNumero) && edadNumero < 18;

  const etiquetaDui = esMenorDeEdad
    ? "Número de DUI del responsable"
    : "Número de DUI del estudiante";

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    let valorProcesado = value;

    // Para teléfono: no permitir letras y aplicar formato XXXX-XXXX de 8 dígitos
    if (name === "telefono") {
      valorProcesado = formatearTelefono(value);
    }

    const nuevosDatos = {
      ...datos,
      [name]: valorProcesado
    };

    setDatos(nuevosDatos);

    // Validar durante la interacción
    const mensajeError = validarCampoInscripcion(name, valorProcesado);
    setErrores((prev) => ({
      ...prev,
      [name]: mensajeError
    }));
  };

  const manejarBlur = (e) => {
    const { name, value } = e.target;
    setCamposTocados((prev) => ({
      ...prev,
      [name]: true
    }));

    const mensajeError = validarCampoInscripcion(name, value);
    setErrores((prev) => ({
      ...prev,
      [name]: mensajeError
    }));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    // 1. Validar nuevamente toda la información antes de enviar
    const resultadoValidacion = validarFormularioInscripcion(datos);
    setErrores(resultadoValidacion.errores);
    setCamposTocados({
      nombreCompleto: true,
      edad: true,
      dui: true,
      nacionalidad: true,
      telefono: true,
      genero: true,
      carrera: true
    });

    if (!resultadoValidacion.esValido) {
      return;
    }

    // 2. Guardar los datos en localStorage
    guardarInscripcion(datos);

    // 3. Redirigir a la pantalla de confirmación
    router.push("/inscripcion/confirmacion");
  };

  if (verificandoSesion) {
    return (
      <div className="flex-1 flex items-center justify-center py-16">
        <p className="text-sm text-slate-600 font-medium">
          Verificando sesión activa...
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 py-10 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-3xl mx-auto space-y-6">
        {tieneInscripcionPrevia && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-sm text-emerald-950">
              <FileText className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>
                Ya cuentas con una inscripción registrada en este navegador.
              </span>
            </div>
            <Link
              href="/mi-inscripcion"
              className="text-xs font-semibold bg-emerald-800 hover:bg-emerald-900 text-white px-3.5 py-2 rounded-lg transition-colors shrink-0"
            >
              Ver mi inscripción
            </Link>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Encabezado del formulario */}
          <div className="bg-emerald-950 text-white px-6 py-6 sm:px-8 border-b border-emerald-900">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-900 border border-emerald-700 flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-emerald-300" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Proceso de Admisión Académica
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Formulario de inscripción 2027
            </h1>
            <p className="text-sm text-emerald-100 mt-1">
              Completa la siguiente información para iniciar tu proceso de
              inscripción en RETOS.
            </p>
          </div>

          {/* Cuerpo del formulario */}
          <form
            onSubmit={manejarEnvio}
            noValidate
            className="p-6 sm:p-8 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* 1. Nombre completo */}
              <div className="sm:col-span-2">
                <InputField
                  id="nombreCompleto"
                  name="nombreCompleto"
                  label="Nombre completo"
                  type="text"
                  value={datos.nombreCompleto}
                  onChange={manejarCambio}
                  onBlur={manejarBlur}
                  placeholder="Ej. María Fernanda López Hernández"
                  helperText="Ingrese sus nombres y apellidos completos (sin números ni símbolos)."
                  error={errores.nombreCompleto}
                  required
                />
              </div>

              {/* 2. Edad */}
              <div>
                <InputField
                  id="edad"
                  name="edad"
                  label="Edad"
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  value={datos.edad}
                  onChange={manejarCambio}
                  onBlur={manejarBlur}
                  placeholder="Ej. 18"
                  helperText="Rango permitido: de 15 a 65 años (únicamente números enteros)."
                  error={errores.edad}
                  required
                />
              </div>

              {/* Documento de identificación condicionado por la edad */}
              <div>
                <InputField
                  id="dui"
                  name="dui"
                  label={etiquetaDui}
                  type="text"
                  maxLength={10}
                  value={datos.dui}
                  onChange={manejarCambio}
                  onBlur={manejarBlur}
                  placeholder="00000000-0"
                  helperText={
                    esMenorDeEdad
                      ? "Al ser menor de 18 años, ingrese el DUI del padre, madre o responsable (formato 00000000-0)."
                      : "Formato requerido de 9 dígitos: 00000000-0 (datos ficticios para demostración)."
                  }
                  error={errores.dui}
                  required
                />
              </div>

              {/* 3. Nacionalidad */}
              <div>
                <SelectField
                  id="nacionalidad"
                  name="nacionalidad"
                  label="Nacionalidad"
                  value={datos.nacionalidad}
                  onChange={manejarCambio}
                  onBlur={manejarBlur}
                  options={nacionalidades}
                  placeholder="Seleccione su nacionalidad"
                  error={errores.nacionalidad}
                  required
                />
              </div>

              {/* 4. Número de teléfono */}
              <div>
                <InputField
                  id="telefono"
                  name="telefono"
                  label="Número de teléfono"
                  type="tel"
                  inputMode="numeric"
                  maxLength={9}
                  value={datos.telefono}
                  onChange={manejarCambio}
                  onBlur={manejarBlur}
                  placeholder="0000-0000"
                  helperText="Ingrese 8 dígitos numéricos en formato XXXX-XXXX."
                  error={errores.telefono}
                  required
                />
              </div>

              {/* 5. Género */}
              <div>
                <SelectField
                  id="genero"
                  name="genero"
                  label="Género"
                  value={datos.genero}
                  onChange={manejarCambio}
                  onBlur={manejarBlur}
                  options={generos}
                  placeholder="Seleccione su género"
                  error={errores.genero}
                  required
                />
              </div>

              {/* 6. Carrera a estudiar */}
              <div>
                <SelectField
                  id="carrera"
                  name="carrera"
                  label="Carrera a estudiar"
                  value={datos.carrera}
                  onChange={manejarCambio}
                  onBlur={manejarBlur}
                  options={nombresCarreras}
                  placeholder="Seleccione una carrera"
                  error={errores.carrera}
                  required
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-500">
                Los campos marcados con <span className="text-red-600 font-bold">*</span> son obligatorios. No utilice números de DUI reales en esta simulación.
              </p>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmar inscripción</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
