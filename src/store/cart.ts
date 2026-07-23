"use client";

import { create } from "zustand";
import { ICart } from "@/types";

interface CartState {
  items: ICart[];
  setItems: (items: ICart[]) => void;
  addItem: (item: ICart) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  setItems: (items) => set({ items }),

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.product_id._id === item.product_id._id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product_id._id === item.product_id._id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i._id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((i) => (i._id === id ? { ...i, quantity } : i)),
    })),

  clearCart: () => set({ items: [] }),

  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

  totalPrice: () =>
    get().items.reduce(
      (sum, item) => sum + (item.product_id.discount_price || item.product_id.price) * item.quantity,
      0
    ),
}));
