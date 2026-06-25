import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "../custom-hook/debounce-hook";
import { Product } from "@/app/models/Product";

// Simulated API search function
const fetchSearchResults = async (searchTerm: string ) => {
  if (!searchTerm) return [];
  const response = await fetch(
    `https://dummyjson.com/products/search?q=${searchTerm}`,
  );
  if (!response.ok) throw new Error("Network error");
  return response.json();
};

export function GlobalSearch() {
  // Local client state for instant UI typing feedback
  const [inputSearch, setInputSearch] = useState("");

  // Debounce the input state by 500ms
  const debouncedSearchTerm = useDebounce(inputSearch, 500);

  // TanStack Query handles the server state
  const { data, isLoading, isError, isFetching } = useQuery({
    // Depend on the debounced value so network calls are restricted
    queryKey: ["search", debouncedSearchTerm],
    queryFn: () => fetchSearchResults(debouncedSearchTerm),
    // Skip network request completely if search term is empty
    enabled: debouncedSearchTerm.trim().length > 0,
    // Keep previous data visible while fetching new results
    placeholderData: (previousData) => previousData,
  });

  return (
    <>
      {/* <!-- Search Overlay Background --> */}
      <div className="flex items-start justify-center">
        {/* <!-- Search Modal Box --> */}
        <div className="w-full max-w-xl overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-slate-900/10">
          {/* <!-- Search Input --> */}
          <div className="flex items-center border-b border-slate-100 p-4">
            <svg
              className="h-5 w-5 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              placeholder="Type to search..."
              className="ml-3 w-full border-0 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0"
            />
            <kbd className="hidden rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500 sm:block">
              ESC
            </kbd>
            {/* Visual feedback indicating background network activity */}
            {isFetching && (
              <span style={{ position: "absolute", right: 10, top: 10 }}>
                ⏳
              </span>
            )}
          </div>

          {/* <!-- Search Results Placeholder --> */}
          <div className="p-4 text-center text-sm text-slate-400">
            {isLoading && debouncedSearchTerm && <p>Loading results...</p>}
            {isError && <p style={{ color: "red" }}>Error loading data.</p>}

            <ul>
              {data?.products?.map((item: Product) => (
                <li key={item.id}>{item?.title}</li>
              ))}
              {data?.products?.length === 0 && <p>No results found.</p>}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
