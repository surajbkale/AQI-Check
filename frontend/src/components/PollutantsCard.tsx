import { AQI_CATEGORY_DATA } from "@/constants/aqiCategories";
import { POLLUTANT_MAP } from "@/constants/pollutants";
import { getAQICategoryKey } from "@/utils/aqiKey";

export default function PollutantCard({ data }: { data: any }) {
  const categoryKey = getAQICategoryKey(data.aqi);
  const uiData = AQI_CATEGORY_DATA[categoryKey];
  const weatherKeys = ["t", "h", "w", "p", "dew", "wg", "wd"];

  const pollutants = Object.entries(data.pollutants).filter(
    ([key]) => !weatherKeys.includes(key)
  );

  return (
    <div className="w-full max-w-7xl mx-auto mt-6">
      <h3 className="text-xl font-bold w-full text-white mb-4 flex items-center gap-2">
        Health Advisory: <div>{uiData.advice}</div>
      </h3>
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        Major Pollutants
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {pollutants.map(([key, val]: any) => {
          const info = POLLUTANT_MAP[key] || {
            label: key.toUpperCase(),
            name: "Pollutant",
          };

          return (
            <div
              key={key}
              className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-4 flex flex-col justify-between hover:bg-slate-800/60 transition duration-300 group"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                  {info.label}
                </span>

                <span className="w-2 h-2 rounded-full bg-indigo-500 group-hover:animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>
              </div>

              {/* Value */}
              <div className="mt-1">
                <span className="text-2xl font-bold text-white">{val.v}</span>
              </div>

              {/* full names */}
              <div className="mt-2 border-t border-slate-700/50 pt-2">
                <p
                  className="text-xs text-slate-400 truncate"
                  title={info.name}
                >
                  {info.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
