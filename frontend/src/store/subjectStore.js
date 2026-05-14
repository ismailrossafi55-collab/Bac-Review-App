import create from 'zustand';

const useSubjectStore = create((set) => ({
  subjects: [],
  currentSubject: null,
  isLoading: false,
  error: null,

  setSubjects: (subjects) => set({ subjects }),
  setCurrentSubject: (subject) => set({ currentSubject: subject }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  addSubject: (subject) =>
    set((state) => ({
      subjects: [...state.subjects, subject],
    })),

  removeSubject: (id) =>
    set((state) => ({
      subjects: state.subjects.filter((s) => s._id !== id),
    })),

  updateSubject: (id, updates) =>
    set((state) => ({
      subjects: state.subjects.map((s) => (s._id === id ? { ...s, ...updates } : s)),
    })),
}));

export { useSubjectStore };
