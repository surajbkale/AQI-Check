import { useAqi } from "./hooks/useAqi";
import Search from "./components/Search";
import CityCard from "./components/CityCard";

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
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">
          Air Quality Index Explorer
        </h1>

        <Search onSearch={search} />

        {loading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        {data && <CityCard data={data} />}
      </div>
    </div>
  );
}
