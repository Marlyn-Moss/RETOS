import { Cpu, Wrench, Truck, Code, ArrowRight } from "lucide-react";

const mapaIconos = {
  Cpu,
  Wrench,
  Truck,
  Code
};

export default function CareerCard({ carrera, onSeleccionar }) {
  const Icono = mapaIconos[carrera.icono] || Cpu;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:border-emerald-600 transition-colors flex flex-col justify-between h-full">
      <div>
        <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4">
          <Icono className="w-6 h-6 text-emerald-800" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2">
          {carrera.nombre}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {carrera.descripcion}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 mt-auto">
        <button
          type="button"
          onClick={() => onSeleccionar(carrera.nombre)}
          className="w-full inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors"
        >
          <span>Inscribirme</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

