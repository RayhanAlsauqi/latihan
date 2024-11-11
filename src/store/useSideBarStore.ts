import { create } from "zustand"

interface SideBarState {
  isOpen: boolean
  toggleSidebar: () => void
  closeSidebar: () => void
}


export const useSidebarStore = create<SideBarState>((set) => ({
  isOpen: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  closeSidebar: function () {
    set({ isOpen: false });
  },
}))