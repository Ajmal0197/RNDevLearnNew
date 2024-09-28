import { create } from 'zustand';
import axios from 'axios';

const BASE_URL = 'https://api.example.com'; // Replace with your API URL

// Create the store
const useBasicStore = create((set, get) => ({
  items: [], // Initial state

  // Action to fetch items from an API
  fetchItems: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/items`); // Fetching items
      const data = response.data;
      set({ items: data });
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  },

  // Action to add an item
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  // Action to remove an item
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  // Action to get the count of items
  getItemCount: () => get().items.length,

  // Optional: Clear all items
  clearItems: () => set({ items: [] }),

  // Optional: Update an item by id
  updateItem: (id, updatedItem) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? updatedItem : item)),
    })),
}));

export default useBasicStore;
