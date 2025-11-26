import { useAqi } from "./hooks/useAqi";
import Search from "./components/Search";
import CityCard from "./components/CityCard";
import PollutantCard from "./components/PollutantsCard";
import { useEffect } from "react";
import LandingContent from "./components/LandingPage";

export default function App() {
  const { data, loading, error, search } = useAqi();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          search(`geo:${latitude.toFixed(4)};${longitude.toFixed(4)}`);
        },
        (err) => {
          console.log("Auto-location failed or denied", err);
        }
      );
    }
  }, [search]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center py-10 px-4 sm:px-6 font-sans">
      <div className="w-full max-w-7xl flex flex-col items-center">
        <div className="text-center mb-8 w-full max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl tracking-tight">
            AQI Check
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-light">
            Real-time air quality index and weather data globally.
          </p>
        </div>

        <Search onSearch={search} />

        {loading && (
          <div className="mt-20 flex flex-col items-center">
            <div className="relative">
              <div className="h-12 w-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-2 w-2 bg-indigo-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="text-slate-400 font-medium mt-6 animate-pulse">
              Scanning Atmosphere...
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="mt-10 bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-red-200 text-center max-w-md">
            <p className="font-bold text-lg mb-2">Unable to Retrieve Data</p>
            <p className="text-sm opacity-80">{error}</p>
          </div>
        )}

        {data && !loading && (
          <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mt-6 flex justify-center w-full">
              <CityCard data={data} />
            </div>
            <div className="mt-6 flex justify-center w-full">
              <PollutantCard data={data} />
            </div>
          </div>
        )}

        <LandingContent />
      </div>
    </div>
  );
}
