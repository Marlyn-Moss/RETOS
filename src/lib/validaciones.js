import { nombresCarreras, nacionalidades, generos } from "@/data/carreras";

/**
 * Valida las credenciales del formulario de inicio de sesión.
 */
export function validarLogin({ correo, password }) {
  const errores = {};
  const correoLimpio = (correo || "").trim();

  if (!correoLimpio) {
    errores.correo = "El correo electrónico es obligatorio";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoLimpio)) {
    errores.correo = "Ingrese un correo electrónico con formato válido";
  }

  if (!password || password.length === 0) {
    errores.password = "La contraseña es obligatoria";
  }

  return {
    esValido: Object.keys(errores).length === 0,
    errores
  };
}

/**
 * Formatea el número de teléfono aceptando únicamente dígitos (no permite letras)
 * y aplicando el formato XXXX-XXXX para un máximo de 8 dígitos.
 */
export function formatearTelefono(valor) {
  const soloDigitos = String(valor || "")
    .replace(/\D/g, "")
    .slice(0, 8);

  if (soloDigitos.length > 4) {
    return `${soloDigitos.slice(0, 4)}-${soloDigitos.slice(4, 8)}`;
  }
  return soloDigitos;
}

/**
 * Valida individualmente un campo del formulario de inscripción.
 */
export function validarCampoInscripcion(nombreCampo, valor) {
  switch (nombreCampo) {
    case "nombreCompleto": {
      const textoOriginal = String(valor ?? "");
      const limpio = textoOriginal.trim();

      if (!limpio) {
        return "El nombre completo es obligatorio y no puede contener únicamente espacios";
      }
      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(limpio)) {
        return "El nombre completo solo puede contener letras y espacios válidos";
      }
      if (limpio.length < 3) {
        return "Debe ingresar un nombre completo válido";
      }
      return "";
    }

    case "edad": {
      const textoEdad = String(valor ?? "").trim();

      if (!textoEdad) {
        return "Debe ingresar una edad entre 15 y 65 años";
      }

      // Verificar si se ingresaron decimales (con punto o coma)
      if (/^-?\d+[.,]\d*$/.test(textoEdad)) {
        return "La edad debe ser un número entero sin decimales";
      }

      if (!/^-?\d+$/.test(textoEdad)) {
        return "Debe ingresar una edad entre 15 y 65 años";
      }

      const numeroEdad = Number(textoEdad);
      if (
        Number.isNaN(numeroEdad) ||
        !Number.isInteger(numeroEdad) ||
        numeroEdad < 15 ||
        numeroEdad > 65
      ) {
        return "Debe ingresar una edad entre 15 y 65 años";
      }

      return "";
    }

    case "dui": {
      const textoDui = String(valor ?? "").trim();

      if (!textoDui) {
        return "El número de DUI debe contener 9 dígitos";
      }

      // Si contiene letras o caracteres distintos a dígitos y guion
      if (!/^[\d-]+$/.test(textoDui)) {
        return "El formato del DUI es incorrecto. Utilice el formato 00000000-0";
      }

      const soloDigitos = textoDui.replace(/\D/g, "");
      if (soloDigitos.length < 9) {
        return "El número de DUI debe contener 9 dígitos";
      }

      if (!/^\d{8}-\d{1}$/.test(textoDui)) {
        return "El formato del DUI es incorrecto. Utilice el formato 00000000-0";
      }

      return "";
    }

    case "nacionalidad": {
      const seleccion = String(valor ?? "").trim();
      if (!seleccion || !nacionalidades.includes(seleccion)) {
        return "Debe seleccionar una nacionalidad";
      }
      return "";
    }

    case "telefono": {
      const textoTelefono = String(valor ?? "").trim();
      if (!textoTelefono) {
        return "El número de teléfono es obligatorio";
      }
      if (/[^\d-]/.test(textoTelefono)) {
        return "El número de teléfono no permite letras ni caracteres especiales";
      }
      const soloDigitos = textoTelefono.replace(/\D/g, "");
      if (soloDigitos.length < 8 || !/^\d{4}-\d{4}$/.test(textoTelefono)) {
        return "El número de teléfono está incompleto. Debe contener 8 dígitos en formato XXXX-XXXX";
      }
      return "";
    }

    case "genero": {
      const seleccion = String(valor ?? "").trim();
      if (!seleccion || !generos.includes(seleccion)) {
        return "Debe seleccionar un género";
      }
      return "";
    }

    case "carrera": {
      const seleccion = String(valor ?? "").trim();
      if (!seleccion || !nombresCarreras.includes(seleccion)) {
        return "Debe seleccionar una carrera";
      }
      return "";
    }

    default:
      return "";
  }
}

/**
 * Valida todos los campos del formulario de inscripción simultáneamente.
 */
export function validarFormularioInscripcion(datos) {
  const campos = [
    "nombreCompleto",
    "edad",
    "dui",
    "nacionalidad",
    "telefono",
    "genero",
    "carrera"
  ];

  const errores = {};

  campos.forEach((campo) => {
    const mensajeError = validarCampoInscripcion(campo, datos[campo]);
    if (mensajeError) {
      errores[campo] = mensajeError;
    }
  });

  return {
    esValido: Object.keys(errores).length === 0,
    errores
  };
}
