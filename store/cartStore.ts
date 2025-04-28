import { create } from "zustand";

export const useCart = create<any>((set) => ({
  items: [],
  totalPrice: 0,

  addProduct: (product: any) => {
    set((state: { items: any }) => ({
      items: [...state.items, { product, quantity: 1 }],
    }));
  },

  resetCart: () => set({ items: [] }),
}));
