/**
 * NOTA IMPORTANTE DE ARQUITECTURA Y SEGURIDAD (EDUCATIVO / QA):
 *
 * 1. sessionStorage se utiliza únicamente para simular una sesión activa durante la
 *    navegación en esta práctica educativa. No representa un sistema de autenticación
 *    seguro para entornos de producción.
 *
 * 2. localStorage almacena datos directamente en el navegador del usuario y NO
 *    representa un almacenamiento seguro ni compartido entre diferentes dispositivos
 *    o navegadores. Se emplea aquí exclusivamente para simular la persistencia local
 *    durante las pruebas de Testing y Aseguramiento de Calidad (QA).
 */

const SESSION_KEY = "retos_2027_sesion_usuario";
const INSCRIPCION_KEY = "retos_2027_inscripcion_registrada";
const CARRERA_PRESELECCIONADA_KEY = "retos_2027_carrera_preseleccionada";

/**
 * Guarda la sesión simulada del usuario en sessionStorage.
 */
export function guardarSesion(usuario) {
  if (typeof window === "undefined") return;
  const datosSesion = {
    id: usuario.id,
    nombre: usuario.nombre,
    correo: usuario.correo,
    inicioSesion: new Date().toISOString()
  };
  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(datosSesion));
}

/**
 * Obtiene la sesión simulada actual desde sessionStorage.
 */
export function obtenerSesion() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Cierra la sesión simulada eliminando los datos de sessionStorage.
 * IMPORTANTE: No elimina la inscripción almacenada en localStorage para permitir
 * pruebas de persistencia local requeridas por QA.
 */
export function cerrarSesion() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(SESSION_KEY);
}

/**
 * Guarda temporalmente la carrera seleccionada desde la Landing Page.
 */
export function guardarCarreraPreseleccionada(nombreCarrera) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(CARRERA_PRESELECCIONADA_KEY, nombreCarrera);
}

/**
 * Obtiene la carrera seleccionada previamente en la Landing Page.
 */
export function obtenerCarreraPreseleccionada() {
  if (typeof window === "undefined") return "";
  return window.sessionStorage.getItem(CARRERA_PRESELECCIONADA_KEY) || "";
}

/**
 * Guarda los datos de la inscripción en localStorage y mantiene asociado
 * un identificador único simulado (ej. RETOS-2027-0001) y la fecha de registro.
 */
export function guardarInscripcion(datosFormulario) {
  if (typeof window === "undefined") return null;

  const edadNum = Number(datosFormulario.edad);
  const tipoDocumento =
    edadNum > 18
      ? "Número de DUI del estudiante"
      : "Número de DUI del responsable";

  const nacionalidadProcesada =
    datosFormulario.nacionalidad === "Guatemalteca"
      ? "Hondureña"
      : datosFormulario.nacionalidad;

  const ahora = new Date();
  const fechaFormateada = ahora.toLocaleDateString("es-SV", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  const registroExistente = obtenerInscripcion();
  const idInscripcion =
    registroExistente && registroExistente.idInscripcion
      ? registroExistente.idInscripcion
      : "RETOS-2027-0001";

  const registroCompleto = {
    idInscripcion,
    nombreCompleto: datosFormulario.nombreCompleto,
    edad: edadNum,
    tipoDocumento,
    dui: datosFormulario.dui.trim(),
    nacionalidad: nacionalidadProcesada,
    telefono: datosFormulario.telefono.trim(),
    genero: datosFormulario.genero,
    carrera: datosFormulario.carrera,
    fechaInscripcion: fechaFormateada,
    estado: "Inscripción registrada"
  };

  window.localStorage.setItem(
    INSCRIPCION_KEY,
    JSON.stringify(registroCompleto)
  );

  return registroCompleto;
}

/**
 * Obtiene los datos de la inscripción almacenada en localStorage.
 */
export function obtenerInscripcion() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(INSCRIPCION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Actualiza el registro almacenado en localStorage omitiendo el teléfono.
 */
export function sincronizarInscripcionLocal(registro) {
  if (typeof window === "undefined" || !registro) return;
  const copia = {
    ...registro,
    telefono: ""
  };
  window.localStorage.setItem(INSCRIPCION_KEY, JSON.stringify(copia));
}
