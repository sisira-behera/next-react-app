import useCounterStore from "@/app/store/counterStore";
import React, { useState } from "react";

export default function CoolCounter() {
  // Select state values and actions selectively for performance optimization
  const count = useCounterStore((state) => state.count)
  const increment = useCounterStore((state) => state.increment)
  const decrement = useCounterStore((state) => state.decrement)
  const incrementBy = useCounterStore((state) => state.incrementBy)
  const reset = useCounterStore((state) => state.reset)


    return (
        <>
        {/* Big Animated Counter Display */}
        <div className="text-4xl font-extrabold tracking-tight text-black mb-8 select-none transition-all duration-200">
          {count}
        </div>

        {/* Primary Controls */}
        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={decrement}
            className="flex-1 bg-rose-600 hover:bg-rose-500 active:scale-95 text-black font-bold py-3 px-6 rounded-xl transition duration-150 shadow-lg shadow-rose-900/30 text-xl"
          >
            -
          </button>
          <button
            onClick={increment}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-black font-bold py-3 px-6 rounded-xl transition duration-150 shadow-lg shadow-emerald-900/30 text-xl"
          >
            +
          </button>
        </div>

        <hr />

        {/* Step Multipliers & Reset Layout */}
        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={() => incrementBy(5)}
            className="bg-slate-700 hover:bg-slate-600 text-xs py-2 px-3 rounded-lg font-medium transition"
          >
            +5
          </button>
          <button
            onClick={reset}
            className="bg-slate-700 hover:bg-amber-600 hover:text-white text-xs py-2 px-3 rounded-lg font-medium transition text-amber-400"
          >
            Reset
          </button>
        </div>
        </>
    );
}