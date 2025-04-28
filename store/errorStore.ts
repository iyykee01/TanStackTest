import { create } from "zustand";

type ErrorStore = {
  error: string | null;
  isError: boolean;
  isSuccess: boolean;
  setError: (error: string) => void;
  setSuccess: (success: boolean) => void;
  clearError: () => void;
};

const useError = create<ErrorStore>((set) => ({
  error: null,
  isError: false,
  isSuccess: false,

  setError: (error: string) => {
    set({ error: error, isError: true });
  },

  setSuccess: (success: boolean) => {
    set({ isSuccess: success });
  },

  clearError: () => set({ error: null, isError: false, isSuccess: false }),
}));

export const useErrorStore = () => {
  const error = useError((state) => state.error);
  const isError = useError((state) => state.isError);
  const isSuccess = useError((state) => state.isSuccess);
  const setSuccess = useError((state) => state.setSuccess);
  const setError = useError((state) => state.setError);
  const clearError = useError((state) => state.clearError);

  return {
    error,
    isError,
    isSuccess,
    setError,
    setSuccess,
    clearError,
  };
};
