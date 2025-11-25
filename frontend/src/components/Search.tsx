import { useState, useRef, useEffect } from "react";
import {
  useCitySuggestions,
  type CitySearchResult,
} from "../hooks/useCitySuggestions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Search({
  onSearch,
  disabled,
}: {
  // onSearch now accepts the specific station name or UID
  onSearch: (city: string) => void;
  disabled: boolean;
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false); // To toggle dropdown visibility
  const { results, loading } = useCitySuggestions(query);
  const [disabledBtn, _setDisabledBtn] = useState(disabled);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (city: CitySearchResult) => {
    setQuery(city.name);
    setIsOpen(false);
    // Passing the name is usually enough, but you could pass city.uid if your API supports it
    onSearch(city.name);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl mx-auto z-50">
      <form
        className="flex items-center gap-3 shadow-lg rounded-lg"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(query);
          setIsOpen(false);
        }}
      >
        <Input
          type="text"
          placeholder="Search global cities (e.g. London, Tokyo)..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          className="h-12 flex-1 rounded-lg border-0 bg-slate-800 px-4 text-base text-white placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-500 shadow-inner"
        />

        <Button
          size="lg"
          variant="default"
          className="h-12 px-6 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all shadow-lg hover:shadow-indigo-500/25"
        >
          {loading && disabledBtn ? "..." : "Search"}
        </Button>
      </form>

      {/* Suggestions Dropdown */}
      {isOpen && results.length > 0 && (
        <ul className="absolute left-0 right-0 bg-slate-800/95 backdrop-blur-md border border-slate-700 rounded-xl mt-2 max-h-80 overflow-y-auto shadow-2xl animate-in fade-in slide-in-from-top-2">
          {results.map((city) => (
            <li
              key={city.uid}
              onClick={() => handleSelect(city)}
              className="px-5 py-3 cursor-pointer hover:bg-indigo-600/30 hover:text-white border-b border-slate-700/50 last:border-0 transition-colors text-left group"
            >
              <p className="font-medium text-slate-200 group-hover:text-white">
                {city.name}
              </p>
              <p className="text-xs text-slate-500 group-hover:text-slate-300">
                AQI Station ID: {city.uid}
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* No results state */}
      {isOpen && query.length > 2 && results.length === 0 && !loading && (
        <div className="absolute left-0 right-0 bg-slate-800 border border-slate-700 rounded-xl mt-2 p-4 text-slate-400 text-sm">
          No cities found with that name.
        </div>
      )}
    </div>
  );
}
