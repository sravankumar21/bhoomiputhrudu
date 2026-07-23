"use client";

import { create } from "zustand";
import { IFarmer } from "@/types";

interface AuthState {
  user: IFarmer | null;
  token: string | null;
  isLoading: boolean;
  setUser: (user: IFarmer | null) => void;
  setToken: (token: string | null) => void;
  login: (user: IFarmer, token: string) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),

  login: (user, token) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, token, isLoading: false });
  },

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    set({ user: null, token: null, isLoading: false });
  },

  initialize: () => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("authToken");
    const userStr = localStorage.getItem("user");
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as IFarmer;
        set({ user, token, isLoading: false });
      } catch {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        set({ isLoading: false });
      }
    } else {
      set({ isLoading: false });
    }
  },
}));
