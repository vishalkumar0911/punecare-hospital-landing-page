import { create } from "zustand";
import { generateBookingId, calculateTotal } from "../utils/helpers";

const initialBookingForm = {
  patientName:      "",
  phone:            "",
  email:            "",
  age:              "",
  emergencyContact: "",
  checkinDate:      null,
  duration:         1,
};

export const useBookingStore = create((set, get) => ({
  // State
  selectedRoom:     null,
  bookingForm:      initialBookingForm,
  confirmedBooking: null,
  isSubmitting:     false,
  bookingStep:      1,           // 1: form, 2: confirm, 3: success

  // Actions
  selectRoom: (room) =>
    set({ selectedRoom: room, bookingStep: 1 }),

  updateForm: (fields) =>
    set((state) => ({
      bookingForm: { ...state.bookingForm, ...fields },
    })),

  nextStep: () =>
    set((state) => ({ bookingStep: state.bookingStep + 1 })),

  prevStep: () =>
    set((state) => ({ bookingStep: Math.max(1, state.bookingStep - 1) })),

  confirmBooking: () => {
    const { selectedRoom, bookingForm } = get();
    set({ isSubmitting: true });

    // Simulate async API call
    setTimeout(() => {
      const confirmed = {
        bookingId:    generateBookingId(),
        room:         selectedRoom,
        ...bookingForm,
        totalPrice:   calculateTotal(selectedRoom.price, bookingForm.duration),
        bookedAt:     new Date().toISOString(),
      };
      set({
        confirmedBooking: confirmed,
        isSubmitting:     false,
        bookingStep:      3,
      });
    }, 1500);
  },

  resetBookingFlow: () =>
    set((state) => ({
      selectedRoom: state.selectedRoom,
      bookingForm: initialBookingForm,
      confirmedBooking: null,
      bookingStep: 1,
      isSubmitting: false,
    })),

  resetBooking: () =>
    set({
      selectedRoom:     null,
      bookingForm:      initialBookingForm,
      confirmedBooking: null,
      bookingStep:      1,
      isSubmitting:     false,
    }),
}));
