import {
  CloudRain,
  Factory,
  Flame,
  Gauge,
  Info,
  Sun,
  Wind,
} from "lucide-react";

export default function LandingContent() {
  return (
    <div className="mt-16 w-full max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 backdrop-blur-sm shadow-xl">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 text-indigo-400">
            <Info size={24} />
          </div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4">
            What is AQI?
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            The <strong>Air Quality Index (AQI)</strong> measures how clean or
            polluted the air is. It runs from 0 to 500. Higher values mean
            greater pollution and health risks.
          </p>
        </div>
        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 backdrop-blur-sm shadow-xl">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 text-emerald-400">
            <Wind size={24} />
          </div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-4">
            Why it matters?
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            Monitoring AQI protects your health. It tracks five major
            pollutants: ground-level ozone, particle pollution (PM2.5/PM10),
            carbon monoxide, sulfur dioxide, and nitrogen dioxide.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-xl font-bold text-white mb-6 text-center">
          Understanding the Scale
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "Very-good", range: "0-33", color: "bg-blue-500" },
            { label: "Good", range: "34-66", color: "bg-green-500" },
            { label: "Fair", range: "67-99", color: "bg-yellow-500" },
            { label: "Poor", range: "100-149", color: "bg-orange-500" },
            {
              label: "Very Poor",
              range: "150-200",
              color: "bg-purple-600",
            },
            { label: "Hazardous", range: "200+", color: "bg-red-900" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-slate-500 transition-colors group"
            >
              <div
                className={`h-2 w-full ${item.color} rounded-full mb-3 shadow-[0_0_10px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-shadow`}
              ></div>
              <p className="font-bold text-white text-sm">{item.label}</p>
              <p className="text-xs text-slate-400 font-mono mt-1">
                {item.range}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/30 rounded-3xl p-8 border border-slate-700/50">
        <h3 className="text-xl font-bold text-white mb-6">
          Key Pollutants Explained
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="text-indigo-400 font-bold flex items-center gap-2">
              <CloudRain size={16} /> PM2.5 (Fine Particles)
            </h4>
            <p className="text-sm text-slate-400">
              Tiny particles less than 2.5 micrometers. Can penetrate deep into
              lungs and blood.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-blue-400 font-bold flex items-center gap-2">
              <Wind size={16} /> PM10 (Respirable Particles)
            </h4>
            <p className="text-sm text-slate-400">
              Particles less than 10 micrometers like dust and pollen. Irritates
              eyes, nose, and throat.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-cyan-400 font-bold flex items-center gap-2">
              <Gauge size={16} /> NO₂ (Nitrogen Dioxide)
            </h4>
            <p className="text-sm text-slate-400">
              From burning fuel (cars). Irritates airways and aggravates
              respiratory diseases.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-yellow-400 font-bold flex items-center gap-2">
              <Factory size={16} /> SO₂ (Sulfur Dioxide)
            </h4>
            <p className="text-sm text-slate-400">
              From industrial burning and power plants. Harmful to the
              respiratory system.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-orange-400 font-bold flex items-center gap-2">
              <Flame size={16} /> CO (Carbon Monoxide)
            </h4>
            <p className="text-sm text-slate-400">
              Odorless gas from vehicle exhaust. Reduces oxygen delivery to the
              body's organs.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-emerald-400 font-bold flex items-center gap-2">
              <Sun size={16} /> O₃ (Ozone)
            </h4>
            <p className="text-sm text-slate-400">
              Formed by chemical reactions in sunlight. Main component of smog.
              triggers asthma.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
