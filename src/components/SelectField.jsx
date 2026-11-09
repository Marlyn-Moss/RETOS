import { AlertCircle } from "lucide-react";

export default function SelectField({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  options = [],
  placeholder = "Seleccione una opción",
  error = "",
  helperText = "",
  required = false
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id || name}
        className="text-sm font-semibold text-slate-800 flex items-center justify-between"
      >
        <span>
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </span>
      </label>

      <select
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id || name}-error` : undefined}
        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 bg-white transition-colors focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:border-red-600 focus:ring-red-200"
            : "border-slate-300 focus:border-emerald-700 focus:ring-emerald-100"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((opcion) => {
          const val = typeof opcion === "string" ? opcion : opcion.value;
          const texto = typeof opcion === "string" ? opcion : opcion.label;
          return (
            <option key={val} value={val}>
              {texto}
            </option>
          );
        })}
      </select>

      {helperText && !error && (
        <p className="text-xs text-slate-500">{helperText}</p>
      )}

      {error && (
        <p
          id={`${id || name}-error`}
          role="alert"
          className="text-xs font-medium text-red-600 flex items-center gap-1.5 mt-0.5"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

