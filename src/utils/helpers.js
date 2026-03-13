export const generateBookingId = () => {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `HSP-2026-${rand}`;
};

export const calculateTotal = (pricePerDay, days) =>
  pricePerDay * days;

export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const getCheckoutDate = (checkin, duration) =>
  addDays(new Date(checkin), duration);

export const getAvailabilityColor = (status) => {
  const map = {
    Available: "text-success bg-green-50 border-green-200",
    Limited:   "text-warning bg-amber-50 border-amber-200",
    Full:      "text-danger bg-red-50 border-red-200",
  };
  return map[status] ?? map.Available;
};

export const getRatingStars = (rating) =>
  Math.round(rating * 2) / 2;