import { useState } from "react";

export default function Search({
  onSearch,
}: {
  onSearch: (c: string) => void;
}) {
  const [city, setCity] = useState("");

  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(city);
      }}
    >
      <input
        type="text"
        className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        type="submit"
        className="px-6 py-2 rounded bg-indigo-600 hover:bg-indigo-700"
      >
        Search
      </button>
    </form>
  );
}
