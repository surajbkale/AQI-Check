import { useState, useRef, useEffect } from "react";
import {
  useCitySuggestions,
  type CitySearchResult,
} from "../hooks/useCitySuggestions";
import { useRecentSearches } from "../hooks/useRecentSearch";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Search({
  onSearch,
}: {
  onSearch: (city: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const { results } = useCitySuggestions(query);
  const { recentSearches, addSearch } = useRecentSearches();

  const wrapperRef = useRef<HTMLDivElement>(null);

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

  const handleSearch = (term: string) => {
    if (!term) return;

    if (!term.startsWith("geo:")) {
      addSearch(term);
    }

    onSearch(term);
    setIsOpen(false);
  };

  const handleSelect = (city: CitySearchResult) => {
    setQuery(city.name);
    handleSearch(city.name);
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(4);
        const lng = position.coords.longitude.toFixed(4);

        const geoString = `geo:${lat};${lng}`;

        setQuery("Current Location");
        handleSearch(geoString);
        setIsLocating(false);
      },
      (error) => {
        console.error(error);
        setIsLocating(false);
        let msg = "Unable to retrieve location.";
        if (error.code === 1) msg = "Location permission denied.";
        alert(msg);
      },
      { timeout: 10000 }
    );
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl mx-auto z-50">
      <form
        className="flex items-center gap-3 shadow-lg rounded-lg relative"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
        }}
      >
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search city..."
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            className="h-12 w-full rounded-lg border-0 bg-slate-800 pl-4 pr-12 text-base text-white placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-500 shadow-inner"
          />

          <button
            type="button"
            onClick={handleLocateMe}
            disabled={isLocating}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-400 transition-colors p-1"
            title="Use my current location"
          >
            {isLocating ? (
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z"
                />
              </svg>
            )}
          </button>
        </div>

        <Button
          size="lg"
          className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
        >
          Search
        </Button>
      </form>

      {isOpen && (
        <div className="absolute left-0 right-0 bg-slate-800/95 backdrop-blur-md border border-slate-700 rounded-xl mt-2 overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2">
          {query.length > 2 && results.length > 0 && (
            <ul className="max-h-60 overflow-y-auto">
              {results.map((city) => (
                <li
                  key={city.uid}
                  onClick={() => handleSelect(city)}
                  className="px-5 py-3 cursor-pointer hover:bg-indigo-600/30 hover:text-white border-b border-slate-700/50 last:border-0 transition-colors text-left"
                >
                  <p className="font-medium text-slate-200">{city.name}</p>
                </li>
              ))}
            </ul>
          )}

          {query.length === 0 && recentSearches.length > 0 && (
            <div className="p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase mb-3 tracking-wider">
                Recent Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(term);
                      handleSearch(term);
                    }}
                    className="px-3 py-1.5 rounded-full bg-slate-700 text-slate-300 text-sm hover:bg-indigo-600 hover:text-white transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
