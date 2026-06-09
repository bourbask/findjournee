import { create } from 'zustand';
export const useAppStore = create((set) => ({
    theme: 'light',
    setTheme: (theme) => set({ theme }),
    sidebarOpen: false,
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
//# sourceMappingURL=index.js.map