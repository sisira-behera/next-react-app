import { create } from "zustand";
import { persist } from "zustand/middleware";
// import { persist } from "zustand/middleware/persist";


// Create the type for store
export type CounterStore = {
  count: number
  increment: () => void
  decrement: () => void
  incrementBy: (amount: number) => void
  reset: () => void
}

const useCounterStore = create<CounterStore>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      incrementBy: (amount) => set((state) => ({ count: state.count + amount })),
      reset: () => set({ count: 0 }),
    }),
    {
      name: 'counter-storage', // Unique key for localStorage item
    }
  )
)

export default useCounterStore;
