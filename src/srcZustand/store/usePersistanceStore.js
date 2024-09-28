import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { mmkvStorage } from '../storage/storage'; // Using mmkvStorage for React Native

// Create the store
export const usePersistanceStore = create()(
  persist(
    (set, get) => ({
      fishes: 0, // Initial state for fishes

      // Action to add a fish
      addAFish: () => set({ fishes: get().fishes + 1 }),

      // Action to remove a fish
      removeAFish: () => {
        const currentFishes = get().fishes;
        if (currentFishes > 0) {
          set({ fishes: currentFishes - 1 });
        }
      },

      // Action to reset fishes to 0
      resetFishes: () => set({ fishes: 0 }),
    }),
    {
      name: 'food-storage', // The key used for storage
      storage: createJSONStorage(() => mmkvStorage), // You can switch between AsyncStorage or mmkvStorage
    }
  )
);
