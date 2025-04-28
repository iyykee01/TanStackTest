import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserStore = {
  user: null;
  setUser: (user: any) => void;
  resetUser: () => void;
  token: string | null;
  setToken: (token: string) => void;
};

export const useUser = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setToken: (token: string) => set({ token }),
      setUser: (newUser: any) => set({ user: newUser }),
      resetUser: () => set({ user: null, token: null }),
    }),

    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        token: state.token,
      }),
    }
  )
);

export const useUserStore = () => {
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);
  const resetUser = useUser((state) => state.resetUser);
  const setToken = useUser((state) => state.setToken);
  const token = useUser((state) => state.token);

  return {
    user,
    setUser,
    resetUser,
    setToken,
    token,
  };
};
