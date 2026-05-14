import create from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token });
  },
  setError: (error) => set({ error }),
  setIsLoading: (isLoading) => set({ isLoading }),

  checkAuth: () => {
    const token = localStorage.getItem('token');
    if (token) {
      set({ token });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));

export { useAuthStore };
