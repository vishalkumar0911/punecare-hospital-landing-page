import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, ShieldCheck } from "lucide-react";
import RoomsSection from "../sections/RoomsSection";
import { useBookingStore } from "../store/bookingStore";
import { useUIStore } from "../store/uiStore";
import { formatCurrency } from "../utils/formatters";

const EASE = [0.22, 1, 0.36, 1];

export default function RoomsPage() {
  const { selectedRoom } = useBookingStore();
  const { openBookingModal } = useUIStore();

  return (
    <div className="bg-white">
      <section className="page-shell page-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(20,184,166,0.08),transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="max-w-3xl"
          >
            <span className="section-badge inline-flex">
              <CalendarDays size={13} />
              Structured Booking Flow
            </span>
            <h1 className="fluid-title-lg mt-4 text-gray-900 sm:mt-5">
              Select Your Room First,
              <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                {" "}Then Continue Booking
              </span>
            </h1>
            <p className="balanced-copy mt-4 max-w-2xl sm:mt-5">
              Browse available categories, compare amenities, and select the best-fit room
              before entering patient details. This keeps the booking journey clear, guided,
              and professional.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]"
          >
            <div className="surface-card p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                  <ShieldCheck size={18} />
                </div>
                <div className="min-w-0">
                  <h2 className="font-heading text-[18px] font-bold text-gray-900">How booking works</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[
                      "1. Review room options and amenities",
                      "2. Select a room to activate booking",
                      "3. Continue into the booking modal",
                    ].map((step) => (
                      <div key={step} className="rounded-2xl border border-white bg-gradient-to-br from-slate-50 to-white px-4 py-3 text-[13px] font-medium text-gray-600 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-accent-50/60 p-5 shadow-[0_20px_52px_rgba(37,99,235,0.10)] sm:p-6">
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-primary-600">Selected Room</p>
              {selectedRoom ? (
                <div className="mt-4 min-w-0">
                  <h3 className="font-heading text-[20px] font-extrabold text-gray-900">{selectedRoom.name}</h3>
                  <p className="mt-1 text-[13px] text-gray-500">{selectedRoom.floor}</p>
                  <p className="mt-3 break-words text-[24px] font-extrabold text-primary-600 sm:text-[26px]">
                    {formatCurrency(selectedRoom.price)}
                    <span className="ml-1 text-[13px] font-semibold text-primary-400">/ day</span>
                  </p>
                  <button
                    onClick={() => openBookingModal(selectedRoom)}
                    className="btn-primary mt-5 w-full justify-center"
                  >
                    Continue Booking
                  </button>
                </div>
              ) : (
                <div className="mt-4 rounded-2xl bg-white/75 p-4 text-[13px] font-medium text-gray-600">
                  Select any room below to unlock the booking modal.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <RoomsSection />

      <section className="page-shell pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-primary-950 px-6 py-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.24)]">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-primary-300">Booking assurance</p>
              <h3 className="mt-2 font-heading text-[24px] font-extrabold">Every booking starts with a confirmed room selection.</h3>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-[13px] font-semibold text-white/85">
              <CheckCircle2 size={16} className="text-teal-300" />
              No accidental bookings without room context
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
