import { useState } from "react";
import { useCitySuggestions } from "../hooks/useCitySuggestions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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
        className="flex w-full max-w-xl mx-auto items-center gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(query);
        }}
      >
        <Input
          type="text"
          placeholder="Search city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 text-base placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-500"
        />

        <Button
          size="lg"
          variant="default"
          className="h-12 px-6 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
        >
          Search
        </Button>
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
