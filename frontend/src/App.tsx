import { useAqi } from "./hooks/useAqi";
import Search from "./components/Search";
import CityCard from "./components/CityCard";
import PollutantCard from "./components/PollutantsCard";
import { Separator } from "./components/ui/separator";

export default function App() {
  const { data, loading, error, search } = useAqi();

  {
    loading && <p className="text-center mt-4">Loading...</p>;
    {
      error && <p className="text-red-400 text-center mt-4">{error}</p>;
      {
        data && <CityCard data={data} />;
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-7xl text-center">
        <h1 className="text-3xl font-bold mb-6">AQI Check</h1>

        <Search onSearch={search} disabled={loading} />

        {/* {loading && <p className="text-center mt-4">Loading...</p>} */}
        {error && (
          <p className="text-red-400 text-center mt-4">
            {"Couldn't Found the Data..."}
          </p>
        )}
        {data && (
          <>
            <div className="mt-6 flex justify-center">
              <CityCard data={data} />
            </div>

            <div className="mt-6 flex justify-center">
              <PollutantCard data={data} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
