export default function CityCard({ data }: { data: any }) {
  const color = data.category.color;

  return (
    <div className="mt-8 w-full max-w-2xl mx-auto rounded-xl bg-slate-800/60 backdrop-blur-md border border-slate-700 shadow-xl p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between gap-8">
        <div>
          <h2 className="text-2xl font-bold">{data.city.name}</h2>
          <p className="text-sm text-slate-400 mt-1">
            {data.city.geo?.join(", ")}
          </p>
        </div>

        {/* AQI Badge */}
        <div
          className="min-w-[90px] text-center rounded-xl px-4 py-3 shadow-lg"
          style={{ backgroundColor: color + "22", borderColor: color }}
        >
          <p className="text-xs text-slate-300 uppercase tracking-wide">AQI</p>
          <p className="text-4xl font-extrabold leading-none" style={{ color }}>
            {data.aqi}
          </p>
          <p className="text-xs font-medium mt-1 text-slate-300">
            {data.category.label}
          </p>
        </div>
      </div>

      {/* Category Banner */}
      <div
        className="mt-6 p-4 rounded-lg text-sm font-medium"
        style={{ backgroundColor: color + "33" }}
      >
        <p className="text-slate-200">
          {data.category.label} air quality – based on current AQI value.
        </p>
      </div>

      {/* Pollutants */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-3">Pollutant Levels</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.entries(data.pollutants).map(([key, value]: any) => (
            <div
              key={key}
              className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-sm flex flex-col items-center"
            >
              <p className="text-sm font-medium text-slate-300">
                {key.toUpperCase()}
              </p>
              <p className="text-xl font-bold text-white mt-1">{value.v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
