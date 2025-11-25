import { useState } from "react";
import { useCitySuggestions } from "../hooks/useCitySuggestions";
import { Button } from "./ui/button";

export default function Search({
  onSearch,
}: {
  onSearch: (c: string) => void;
}) {
  const [query, setQuery] = useState("");
  const { results } = useCitySuggestions(query);

  return (
    <div className="relative">
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(query);
        }}
      >
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700"
          placeholder="Search city…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="px-6 py-2 bg-indigo-600 rounded-lg">Search</button>
        {/* <Button children={"Search"} /> */}
      </form>

      {/* suggestions */}
      {Array.isArray(results) && results.length > 0 && (
        <ul className="absolute z-50 left-0 right-0 bg-slate-800 border border-slate-700 rounded-lg mt-1">
          {results.map((city) => (
            <li
              key={city}
              onClick={() => {
                setQuery(city);
                onSearch(city);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-slate-700"
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
