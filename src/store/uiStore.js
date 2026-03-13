import { create } from "zustand";

export const useUIStore = create((set) => ({
  isBookingModalOpen: false,
  isRoomDetailOpen:   false,
  activeRoom:         null,
  mobileMenuOpen:     false,
  scrolled:           false,

  openBookingModal: (room) =>
    set({ isBookingModalOpen: true, activeRoom: room }),

  closeBookingModal: () =>
    set({ isBookingModalOpen: false }),

  openRoomDetail: (room) =>
    set({ isRoomDetailOpen: true, activeRoom: room }),

  closeRoomDetail: () =>
    set({ isRoomDetailOpen: false, activeRoom: null }),

  toggleMobileMenu: () =>
    set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

  closeMobileMenu: () =>
    set({ mobileMenuOpen: false }),

  setScrolled: (value) =>
    set({ scrolled: value }),
}));