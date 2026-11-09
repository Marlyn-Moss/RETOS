import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-lg bg-emerald-900 border border-emerald-700 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-white font-bold text-base tracking-wide">
                RETOS — Inscripciones 2027
              </p>
              <p className="text-emerald-200 text-sm">
                Innovación, tecnología y formación profesional.
              </p>
            </div>
          </div>

          <div className="text-center md:text-right">
            <span className="inline-block bg-emerald-900/80 border border-emerald-800 text-emerald-200 text-xs px-3.5 py-2 rounded-lg">
              Esta aplicación es una simulación educativa para prácticas de Testing y QA.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

