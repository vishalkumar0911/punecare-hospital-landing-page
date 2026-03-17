import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BedDouble,
  Building2,
  CheckCircle2,
  Coffee,
  Filter,
  Heart,
  ShieldCheck,
  Sparkles,
  Star,
  Tv,
  Users,
  Wifi,
  Wind,
  X,
  Zap,
} from "lucide-react";
import { rooms } from "../data/rooms";
import { useBookingStore } from "../store/bookingStore";
import { useUIStore } from "../store/uiStore";
import { formatCurrency } from "../utils/formatters";
import { getAvailabilityColor } from "../utils/helpers";

const EASE = [0.22, 1, 0.36, 1];

const facilityIcons = {
  "24/7 Intensivist on duty": Zap,
  "24/7 Emergency physician": Users,
  "Ventilator support": Heart,
  "Cardiac monitor": Heart,
  "Oxygen supply": Wind,
  "Nurse monitoring (1:1)": Users,
  "Nurse monitoring": Users,
  "Private washroom": ShieldCheck,
  "Shared washroom": ShieldCheck,
  "Smart LED TV (43 inch)": Tv,
  "LED TV (32 inch)": Tv,
  "Attendant couch / sofa": Coffee,
  "Attendant couch": Coffee,
  Refrigerator: Coffee,
  "Central AC": Wind,
  "Fan / Cooler": Wind,
  "Wi-Fi": Wifi,
  "Nurse call system": Zap,
  "Daily housekeeping": ShieldCheck,
  "Regular housekeeping": ShieldCheck,
  "Rapid diagnostics": Zap,
  "Defibrillator access": Heart,
  "Medical emergency button": Zap,
};

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={12}
          className={n <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}
          fill={n <= Math.round(rating) ? "#fbbf24" : "#e5e7eb"}
        />
      ))}
    </div>
  );
}

function RoomsShowcase() {
  const items = [
    {
      icon: Sparkles,
      title: "Select Before You Book",
      copy: "The booking modal only unlocks once a room has been chosen.",
      tone: "bg-primary-50 text-primary-600 border-primary-100",
    },
    {
      icon: BadgeCheck,
      title: "Better Booking Clarity",
      copy: "Room type, price, and facilities stay visible before patient details are entered.",
      tone: "bg-teal-50 text-teal-600 border-teal-100",
    },
    {
      icon: Building2,
      title: "Dedicated Rooms Route",
      copy: "This page is now the single source of truth for room booking decisions.",
      tone: "bg-amber-50 text-amber-600 border-amber-100",
    },
  ];

  return (
    <div className="mb-10 grid gap-4 sm:grid-cols-3">
      {items.map(({ icon: Icon, title, copy, tone }) => (
        <motion.div
          key={title}
          whileHover={{ y: -4 }}
          className="surface-card interactive-lift p-5"
        >
          <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border ${tone}`}>
            <Icon size={18} />
          </div>
          <h3 className="font-heading text-[16px] font-bold text-gray-900">{title}</h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-gray-500">{copy}</p>
        </motion.div>
      ))}
    </div>
  );
}

function RoomModal({ room, isSelected, onClose, onSelect, onContinue }) {
  if (!room) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 28 }}
        transition={{ duration: 0.35, ease: EASE }}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[30px] bg-white shadow-[0_40px_100px_rgba(0,0,0,0.24)]"
      >
        <div className="relative h-60 overflow-hidden sm:h-80">
          <img src={room.image} alt={room.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/10 to-transparent" />

          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
          >
            <X size={18} />
          </button>

          <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-2 flex flex-wrap gap-2">
                <span className={`rounded-full border px-3 py-1 text-[11px] font-bold ${room.badgeColor}`}>
                  {room.badge}
                </span>
                <span
                  className={`rounded-full border bg-white/90 px-3 py-1 text-[11px] font-bold backdrop-blur-sm ${getAvailabilityColor(
                    room.availability
                  )}`}
                >
                  {room.availability}
                </span>
              </div>
              <h2 className="font-heading text-[26px] font-extrabold leading-tight text-white">{room.name}</h2>
              <p className="mt-1 text-[13px] text-white/75">{room.floor}</p>
            </div>

            <div className="rounded-2xl bg-white/14 px-4 py-3 backdrop-blur-xl">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-white/65">Starting from</p>
              <p className="mt-1 font-heading text-[28px] font-extrabold leading-none text-white">{formatCurrency(room.price)}</p>
              <p className="mt-1 text-[11px] text-white/65">per day</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="rounded-2xl bg-gray-50 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Capacity</p>
              <p className="mt-1 text-[14px] font-bold text-gray-900">{room.capacity} Patient{room.capacity > 1 ? "s" : ""}</p>
            </div>
            <div className="rounded-2xl bg-gray-50 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Category</p>
              <p className="mt-1 text-[14px] font-bold text-gray-900">{room.type}</p>
            </div>
            <div className="rounded-2xl bg-gray-50 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Rating</p>
              <div className="mt-1 flex items-center gap-2">
                <Stars rating={room.rating} />
                <span className="text-[14px] font-bold text-gray-900">{room.rating}</span>
              </div>
            </div>
            <div className="rounded-2xl bg-gray-50 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Reviews</p>
              <p className="mt-1 text-[14px] font-bold text-gray-900">{room.reviewCount}+</p>
            </div>
          </div>

          <p className="text-[14.5px] leading-relaxed text-gray-500">{room.shortDesc}</p>

          <div>
            <p className="mb-3 text-[13px] font-bold uppercase tracking-wide text-gray-700">Highlights</p>
            <div className="flex flex-wrap gap-2">
              {room.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-center gap-1.5 rounded-full border border-primary-100 bg-primary-50 px-3 py-1.5 text-[12.5px] font-semibold text-primary-700"
                >
                  <CheckCircle2 size={12} />
                  {highlight}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-[13px] font-bold uppercase tracking-wide text-gray-700">Room Facilities</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {room.facilities.map((facility) => {
                const Icon = facilityIcons[facility] || CheckCircle2;
                return (
                  <div
                    key={facility}
                    className="flex items-center gap-2.5 rounded-2xl bg-gray-50 px-3 py-3 text-[12.5px] font-medium text-gray-700"
                  >
                    <Icon size={14} className="shrink-0 text-primary-500" />
                    {facility}
                  </div>
                );
              })}
            </div>
          </div>

          <motion.button
            onClick={() => (isSelected ? onContinue(room) : onSelect(room))}
            whileHover={{ scale: 1.01, boxShadow: "0 12px 40px rgba(37,99,235,0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-primary-600 to-accent-500 py-4 text-[15px] font-bold text-white shadow-lg transition-all duration-200"
          >
            <BedDouble size={18} />
            {isSelected ? "Continue Booking" : "Select This Room"}
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function RoomCard({ room, index, selectedRoomId, onSelectRoom, onContinueBooking }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-52px" });
  const [showDetail, setShowDetail] = useState(false);
  const isSelected = selectedRoomId === room.id;

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: index * 0.08, ease: EASE }}
        whileHover={{ y: -8 }}
        className={`group relative overflow-hidden rounded-[28px] border bg-gradient-to-br from-white via-white to-slate-50 shadow-[0_14px_40px_rgba(37,99,235,0.08)] transition-[border-color,box-shadow] duration-300 hover:shadow-[0_26px_70px_rgba(37,99,235,0.16)] ${
          isSelected ? "border-primary-300 ring-2 ring-primary-100" : "border-gray-100/90 hover:border-gray-200/80"
        }`}
      >
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-teal-400 transition-opacity duration-300 ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />

        <div className="relative h-[210px] overflow-hidden">
          <motion.img
            src={room.image}
            alt={room.name}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/55 via-gray-900/10 to-transparent" />

          <div className="absolute left-3 top-3 flex gap-2">
            <span className={`rounded-full border bg-white/95 px-2.5 py-1 text-[11px] font-bold backdrop-blur-sm ${room.badgeColor}`}>
              {room.badge}
            </span>
            {isSelected && (
              <span className="rounded-full border border-primary-200 bg-primary-600 px-2.5 py-1 text-[11px] font-bold text-white">
                Selected
              </span>
            )}
          </div>

          <div className="absolute right-3 top-3">
            <span
              className={`rounded-full border bg-white/95 px-2.5 py-1 text-[11px] font-bold backdrop-blur-sm ${getAvailabilityColor(
                room.availability
              )}`}
            >
              {room.availability}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">Daily tariff</p>
              <p className="mt-1 font-heading text-[22px] font-extrabold leading-none text-white">{formatCurrency(room.price)}</p>
            </div>
            <div className="rounded-2xl bg-white/15 px-3 py-2 text-right backdrop-blur-md">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-white/60">Capacity</p>
              <p className="mt-1 text-[12px] font-bold text-white">{room.capacity} Guest{room.capacity > 1 ? "s" : ""}</p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h3 className="font-heading text-[17px] font-bold leading-tight text-gray-900 transition-colors duration-200 group-hover:text-primary-600">
                {room.name}
              </h3>
              <p className="mt-1 text-[12px] text-gray-400">{room.floor}</p>
            </div>
            <div className="shrink-0 text-right">
              <div className="flex items-center gap-1.5">
                <Stars rating={room.rating} />
                <span className="text-[12px] font-bold text-gray-700">{room.rating}</span>
              </div>
              <p className="mt-1 text-[11px] text-gray-400">{room.reviewCount} reviews</p>
            </div>
          </div>

          <p className="mb-4 line-clamp-2 text-[13.5px] leading-relaxed text-gray-500">{room.shortDesc}</p>

          <div className="mb-4 flex flex-wrap gap-2">
            {room.highlights.slice(0, 2).map((highlight) => (
              <span
                key={highlight}
                className="rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-[11.5px] font-semibold text-primary-700"
              >
                {highlight}
              </span>
            ))}
          </div>

          <div className="mb-4 grid grid-cols-2 gap-2">
            {room.facilities.slice(0, 4).map((facility) => {
              const Icon = facilityIcons[facility] || CheckCircle2;
              return (
                <div key={facility} className="flex items-center gap-1.5 text-[11.5px] font-medium text-gray-500">
                  <Icon size={12} className="shrink-0 text-primary-400" />
                  <span className="truncate">{facility}</span>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2 border-t border-gray-100 pt-4">
            <motion.button
              onClick={() => setShowDetail(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 rounded-xl border border-gray-200 py-2.5 text-[13px] font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-50"
            >
              View Details
            </motion.button>
            <motion.button
              onClick={() => (isSelected ? onContinueBooking(room) : onSelectRoom(room))}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 28px rgba(37,99,235,0.26)" }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 rounded-xl bg-gradient-to-r from-primary-600 to-accent-500 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_16px_rgba(37,99,235,0.22)] transition-all duration-200"
            >
              {isSelected ? "Continue Booking" : "Select Room"}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showDetail && (
          <RoomModal
            room={room}
            isSelected={isSelected}
            onClose={() => setShowDetail(false)}
            onSelect={(selected) => {
              onSelectRoom(selected);
              setShowDetail(false);
            }}
            onContinue={(selected) => {
              onContinueBooking(selected);
              setShowDetail(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function FilterBar({ activeFilter, onChange }) {
  const filters = ["All", "ICU", "Emergency", "Deluxe", "Private", "Executive Suite", "General Ward"];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <motion.button
          key={filter}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(filter)}
          className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${
            activeFilter === filter
              ? "border-primary-600 bg-primary-600 text-white shadow-md shadow-primary-200/50"
              : "border-gray-200 bg-white text-gray-500 hover:border-primary-300 hover:bg-primary-50/50 hover:text-primary-600"
          }`}
        >
          {filter}
        </motion.button>
      ))}
    </div>
  );
}

export default function RoomsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const headRef = useRef(null);
  const headIn = useInView(headRef, { once: true, margin: "-48px" });
  const { selectedRoom, selectRoom } = useBookingStore();
  const { openBookingModal } = useUIStore();

  const filtered = activeFilter === "All" ? rooms : rooms.filter((room) => room.type === activeFilter);

  const handleSelectRoom = (room) => {
    selectRoom(room);
  };

  const handleContinueBooking = (room) => {
    selectRoom(room);
    openBookingModal(room);
  };

  return (
    <section id="rooms" className="relative overflow-hidden bg-white px-4 py-28 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-primary-100/50 blur-3xl" />
        <div className="absolute bottom-10 left-0 h-72 w-72 rounded-full bg-teal-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div ref={headRef} className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-badge mb-4 inline-flex"
          >
            <BedDouble size={12} />
            Room & Beds
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            className="mt-3 font-heading text-[36px] font-extrabold leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-[44px]"
          >
            Explore Room Categories,
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              Then Continue with Booking
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
            className="mx-auto mt-4 max-w-xl text-[16.5px] leading-relaxed text-gray-400"
          >
            The rooms route now drives the full booking journey: compare options, select one room,
            and only then move into the booking modal.
          </motion.p>
        </div>

        <RoomsShowcase />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="surface-card mb-10 flex flex-wrap items-center justify-between gap-4 px-5 py-4"
        >
          <div>
            <div className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-500">
              <Filter size={14} />
              Filter Rooms
            </div>
            <p className="mt-1 text-[12.5px] text-gray-400">
              Showing {filtered.length} room option{filtered.length > 1 ? "s" : ""} for online booking
            </p>
          </div>

          <FilterBar activeFilter={activeFilter} onChange={setActiveFilter} />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((room, index) => (
              <RoomCard
                key={room.id}
                room={room}
                index={index}
                selectedRoomId={selectedRoom?.id}
                onSelectRoom={handleSelectRoom}
                onContinueBooking={handleContinueBooking}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
