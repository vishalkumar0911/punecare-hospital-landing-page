import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useBookingStore } from "../store/bookingStore";
import { formatCurrency, formatShortDate } from "../utils/formatters";

export default function BookingConfirmationPage() {
  const { confirmedBooking } = useBookingStore();

  if (!confirmedBooking) {
    return (
      <div className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-[32px] border border-gray-100 bg-white p-10 text-center shadow-[0_20px_56px_rgba(37,99,235,0.06)]">
          <h1 className="font-heading text-[34px] font-extrabold text-gray-900">No booking confirmation yet</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-gray-500">
            Start from the Rooms page, select a room, and complete the booking flow to view confirmation details here.
          </p>
          <Link to="/rooms" className="btn-primary mt-6 inline-flex">
            Go to Rooms
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-gray-100 bg-white p-10 shadow-[0_20px_56px_rgba(37,99,235,0.06)]">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-500">
            <CheckCircle2 size={32} />
          </div>
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-teal-500">Booking Confirmed</p>
            <h1 className="font-heading text-[30px] font-extrabold text-gray-900">{confirmedBooking.bookingId}</h1>
          </div>
        </div>

        <div className="mt-8 grid gap-3">
          {[
            ["Patient", confirmedBooking.patientName],
            ["Room", confirmedBooking.room?.name],
            ["Check-in", confirmedBooking.checkinDate ? formatShortDate(confirmedBooking.checkinDate) : ""],
            ["Duration", `${confirmedBooking.duration} day${confirmedBooking.duration > 1 ? "s" : ""}`],
            ["Total", formatCurrency(confirmedBooking.totalPrice)],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3 text-[14px]">
              <span className="font-medium text-gray-400">{label}</span>
              <span className="font-bold text-gray-900">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
