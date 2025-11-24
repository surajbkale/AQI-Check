export default function CityCard({ data }: { data: any }) {
  const color = data.category.color;

  return (
    <div className="mt-6 p-6 rounded-xl bg-slate-800 border border-slate-700">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{data.city.name}</h2>
          <p className="text-slate-400">{data.city.geo?.join(", ")}</p>
        </div>

        <div className="text-center">
          <p className="text-sm text-slate-400">AQI</p>
          <p className="text-4xl font-bold" style={{ color }}>
            {data.aqi}
          </p>
          <p className="text-sm">{data.category.label}</p>
        </div>
      </div>

      <div
        className="mt-4 p-3 rounded-lg"
        style={{ backgroundColor: color + "22" }}
      >
        <p>{data.category.label} air quality</p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Pollutants</h3>
        <ul className="space-y-1">
          {Object.entries(data.pollutants).map(([key, value]: any) => (
            <li key={key} className="text-sm text-slate-300">
              {key.toUpperCase()}: {value.v}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
