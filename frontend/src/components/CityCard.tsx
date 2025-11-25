import { AQI_CATEGORY_DATA } from "@/constants/aqiCategories";

function getAQICategoryKey(aqi: number) {
  if (aqi <= 50) return "Very Good";
  if (aqi <= 100) return "Good";
  if (aqi <= 150) return "Fair";
  if (aqi <= 200) return "Poor";
  if (aqi <= 300) return "Very Poor";
  return "Very Hazardous";
}

export default function CityCard({ data }: { data: any }) {
  const categoryKey = getAQICategoryKey(data.aqi);

  const uiData = AQI_CATEGORY_DATA[categoryKey];
  const categoryLabel = data.category.label;
  const color = data.category.color;

  const weather = {
    temperature: data.pollutants?.t?.v ?? null,
    humidity: data.pollutants?.h?.v ?? null,
    wind: data.pollutants?.w?.v ?? null,
    pressure: data.pollutants?.p?.v ?? null,
    dew: data.pollutants?.dew?.v ?? null,
  };

  return (
    <div className="mt-10 w-full max-w-7xl mx-auto rounded-2xl bg-slate-800/60 backdrop-blur-lg border border-slate-700 shadow-xl overflow-hidden">
      {/* Top Header */}
      <div className="p-6 border-b border-slate-700 bg-slate-800/80 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Real-time Air Quality Index (AQI)
          </h2>
          <a
            href={data.city.url}
            target="_blank"
            className="text-indigo-400 underline text-sm mt-1 block hover:text-indigo-300 transition-colors"
          >
            {data.city.name}
          </a>
        </div>
        <p className="text-xs text-slate-400 mt-1 text-right">
          Last Updated:
          <br /> {new Date(data.time.iso).toLocaleTimeString()}
        </p>
      </div>

      {/* Main Content Section */}
      <div className="p-6 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Image & AQI Score */}
        <div className="flex flex-col sm:flex-row items-center gap-8 flex-1 justify-center lg:justify-start">
          {/* The AQI Image */}
          {uiData?.image && (
            <div className="relative group">
              <div
                className="absolute -inset-1 rounded-full opacity-25 blur-xl transition duration-1000 group-hover:opacity-50"
                style={{ backgroundColor: color }}
              ></div>
              <img
                src={uiData.image}
                alt={categoryLabel}
                className="relative w-32 h-32 sm:w-40 sm:h-40 object-contain drop-shadow-2xl"
              />
            </div>
          )}

          {/* The Score */}
          <div className="text-center sm:text-left">
            <p className="text-sm text-slate-400 font-semibold uppercase tracking-wider">
              Live AQI
            </p>
            <div className="flex items-baseline justify-center sm:justify-start gap-2">
              <span className="text-7xl font-extrabold tracking-tighter text-white">
                {data.aqi}
              </span>
            </div>
            <div
              className="inline-block px-3 py-1 rounded-full text-sm font-bold mt-2"
              style={{ backgroundColor: color + "20", color: color }}
            >
              {categoryLabel} ({categoryKey})
            </div>

            {/* Advice */}
            {uiData?.advice && (
              <p className="text-slate-300 text-sm mt-3 max-w-xs">
                {uiData.advice}
              </p>
            )}
          </div>
        </div>

        {/* Weather Widget */}
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700 shadow-inner w-full lg:w-auto min-w-[280px]">
          <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-4">
            <span className="text-slate-400 text-sm font-medium">
              Temperature
            </span>
            <span className="text-3xl font-bold text-white">
              {weather.temperature}°
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Humidity</span>
              <span className="text-white font-medium">
                {weather.humidity}%
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Wind</span>
              <span className="text-white font-medium">
                {Math.round(weather.wind)} km/h
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Pressure</span>
              <span className="text-white font-medium">
                {weather.pressure} hPa
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pollutant Scale Bar */}
      <div className="px-6 pt-2 pb-6">
        <div className="relative h-4 rounded-full bg-slate-900 shadow-inner border border-slate-700/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-yellow-400 via-orange-500 via-red-600 via-purple-700 to-red-900 opacity-30" />

          {/* Progress Bar */}
          <div
            className="h-full transition-all duration-1000 ease-out"
            style={{
              width: `${Math.min((data.aqi / 500) * 100, 100)}%`,
              backgroundColor: color,
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-2 font-medium px-1">
          <span>Good (0)</span>
          <span>Hazardous (500+)</span>
        </div>
      </div>

      {/* Pollutants Grid */}
      <div className="bg-slate-900/30 p-6 border-t border-slate-700">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-indigo-500 rounded-full block"></span>
          Pollutant Details
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(data.pollutants).map(([key, val]: any) => (
            <div
              key={key}
              className="bg-slate-800 p-3 rounded-xl border border-slate-700/50 hover:border-indigo-500/50 transition-colors group"
            >
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider group-hover:text-indigo-400 transition-colors">
                {key}
              </p>
              <p className="text-xl font-bold text-white mt-1">
                {val.v.toFixed(1)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
