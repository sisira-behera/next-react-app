"use client"; // Required for Zustand state integration

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import CoolCounter from "@/app/components/share/misc/cool-counter/counter";
import { GlobalSearch } from "@/app/components/share/search/global-search";
import TipCalculator from "@/app/components/share/misc/tip-calculator/tip-calculator";

export default function MiscPage() {
  // Hydration fix safety check
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hasHydrated, setHasHydrated] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasHydrated(true);
  }, []);

  // 1. Create a client instance outside the component
  const queryClient = new QueryClient();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white-900 text-white py-20">
      <h1 className="max-w-s text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Static Global State | Next.js
      </h1>

      <div className="w-full max-w-xl bg-white-800 rounded-2xl shadow-2xl border border-white-700 p-6 m-2 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          1. Tanstack - Debounce Search
        </h2>

        {/* // 2. Wrap your application components */}
        <QueryClientProvider client={queryClient}>
          <GlobalSearch />
        </QueryClientProvider>
      </div>
      <div className="w-full max-w-xl bg-white-800 rounded-2xl shadow-2xl border border-white-700 p-6 m-2 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          2. Zustand - Counter Dashboard
        </h2>
        <CoolCounter />
      </div>
      <TipCalculator />
    </main>
  );
}
