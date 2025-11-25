import { AQI_CATEGORY_DATA } from "@/constants/aqiCategories";
import { motion } from "framer-motion";
import { AnimatedNumber } from "./ui/AnimatedNumber";

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
    temperature: data.pollutants?.t?.v
      ? Math.round(data.pollutants.t.v)
      : "N/A",
    humidity: data.pollutants?.h?.v ? Math.round(data.pollutants.h.v) : "N/A",
    wind: data.pollutants?.w?.v ? Math.round(data.pollutants.w.v) : "N/A",
    pressure: data.pollutants?.p?.v ? Math.round(data.pollutants.p.v) : "N/A",
    pm10: data.pollutants?.pm10?.v ? data.pollutants.pm10.v.toFixed(0) : "N/A",
    pm25: data.pollutants?.pm25?.v ? data.pollutants.pm25.v.toFixed(0) : "N/A",
  };

  const progressPercent = Math.min((data.aqi / 500) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mt-10 w-full max-w-7xl mx-auto relative overflow-hidden rounded-3xl shadow-2xl"
    >
      {uiData?.image && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-all duration-500"
          style={{ backgroundImage: `url(${uiData.image})` }}
        />
      )}

      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to right, ${color}DD, ${color}AA, #1e293bCC)`,
        }}
      />

      <div className="relative z-20 p-8 text-white">
        <div className="flex justify-between items-start mb-8">
          <p className="text-lg text-slate-200 font-medium">
            {data.city.name}, {data.city.country}
          </p>
          <p className="text-sm text-slate-200 font-medium">
            Last Updated: {new Date(data.time.iso).toLocaleString()}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="flex-1 w-full">
            <div className="flex flex-wrap items-end gap-6 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="block w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <p className="text-lg font-medium text-slate-100">Live AQI</p>
                </div>
                <div className="flex items-baseline gap-3">
                  <h1
                    className="text-8xl font-extrabold tracking-tighter"
                    style={{
                      color: "#fff",
                      textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                    }}
                  >
                    <AnimatedNumber value={data.aqi} />
                  </h1>
                  <span className="text-slate-300 font-medium">(AQI-US)</span>
                </div>
              </div>

              <div className="pb-4">
                <p className="text-slate-200 text-sm mb-2 font-medium">
                  Air Quality is
                </p>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="px-8 py-3 rounded-xl text-2xl font-bold shadow-lg backdrop-blur-sm"
                  style={{
                    backgroundColor: `${color}66`,
                    border: `1px solid ${color}88`,
                  }}
                >
                  {categoryLabel}
                </motion.div>
              </div>
            </div>

            <div className="flex gap-8 mb-8 text-lg">
              <div>
                <span className="text-slate-300 font-medium">PM10 : </span>
                <span className="font-bold">{weather.pm10} µg/m³</span>
              </div>
              <div>
                <span className="text-slate-300 font-medium">PM2.5 : </span>
                <span className="font-bold">{weather.pm25} µg/m³</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-2 px-1">
                <span style={{ width: "10%" }} className="text-center">
                  Good
                </span>
                <span style={{ width: "10%" }} className="text-center">
                  Moderate
                </span>
                <span style={{ width: "10%" }} className="text-center">
                  Poor
                </span>
                <span style={{ width: "14%" }} className="text-center">
                  Unhealthy
                </span>
                <span style={{ width: "10%" }} className="text-center">
                  Severe
                </span>
                <span style={{ width: "16%" }} className="text-center">
                  Hazardous
                </span>
              </div>

              <div className="relative h-3 rounded-full bg-slate-900/50 shadow-inner overflow-visible">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#009966] via-[#ffde33] via-[#ff9933] via-[#cc0033] via-[#660099] to-[#7e0023] opacity-80" />

                <motion.div
                  initial={{ left: "0%" }}
                  animate={{ left: `calc(${progressPercent}% - 10px)` }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-4 border-white shadow-lg"
                  style={{ backgroundColor: color }}
                />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="lg:w-[400px] w-full rounded-3xl p-6 backdrop-blur-md border border-white/10 shadow-2xl"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="text-5xl">☁️</div>
                <div>
                  <span className="text-5xl font-bold">
                    {weather.temperature}°C
                  </span>
                  <p className="text-lg text-slate-300">Temperature</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center">
              <div>
                <p className="text-slate-300 text-sm mb-1 font-medium">
                  Humidity
                </p>
                <p className="text-xl font-bold">{weather.humidity}%</p>
              </div>
              <div className="border-l border-r border-white/10">
                <p className="text-slate-300 text-sm mb-1 font-medium">
                  Wind Speed
                </p>
                <p className="text-xl font-bold">{weather.wind} km/h</p>
              </div>
              <div>
                <p className="text-slate-300 text-sm mb-1 font-medium">
                  Pressure
                </p>
                <p className="text-xl font-bold">{weather.pressure} hPa</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
