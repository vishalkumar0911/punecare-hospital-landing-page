import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  X, User, Phone, Mail, Hash,
  Calendar, Clock, CreditCard,
  CheckCircle2, Download, Printer,
  BedDouble, ArrowRight, ArrowLeft,
  AlertCircle, Loader2,
} from "lucide-react";
import { useUIStore }     from "../../store/uiStore";
import { useBookingStore } from "../../store/bookingStore";
import { formatCurrency, formatShortDate } from "../../utils/formatters";
import { getCheckoutDate } from "../../utils/helpers";
import { HOSPITAL } from "../../utils/constants";

const EASE = [0.22, 1, 0.36, 1];

/* Step indicator */
function StepDots({ step }) {
  const labels = ["Details", "Confirm", "Done"];
  return (
    <div className="flex items-center justify-center gap-2.5 sm:gap-3">
      {labels.map((label, i) => {
        const n        = i + 1;
        const isActive = step === n;
        const isDone   = step > n;
        return (
          <div key={label} className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex flex-col items-center gap-1">
              <motion.div
                animate={{
                  scale: isActive ? 1.04 : 1,
                }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className={`flex h-9 w-9 items-center justify-center rounded-full
                            text-[12px] font-bold transition-all duration-300
                            ${isDone
                              ? "bg-teal-500 text-white shadow-[0_10px_20px_rgba(20,184,166,0.25)]"
                              : isActive
                              ? "bg-gradient-to-br from-primary-600 to-accent-500 text-white shadow-[0_12px_24px_rgba(37,99,235,0.28)]"
                              : "bg-gray-100 text-gray-400"
                            }`}
              >
                {isDone ? <CheckCircle2 size={15} /> : n}
              </motion.div>
              <span className={`text-[10.5px] font-semibold
                                ${isActive ? "text-primary-600" : "text-gray-400"}`}>
                {label}
              </span>
            </div>
            {i < 2 && (
              <div className="mb-4 h-[3px] w-10 overflow-hidden rounded-full bg-gray-200 sm:w-12">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-teal-400 to-primary-400"
                  initial={false}
                  animate={{ width: step > n ? "100%" : "0%" }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* Form field wrapper */
function Field({ label, error, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[13px] font-semibold text-gray-700">{label}</label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-[12px] text-red-500 font-medium">
          <AlertCircle size={12} /> {error.message}
        </p>
      )}
    </div>
  );
}

/* Input styles */
const inputCls = `w-full px-4 py-3 rounded-2xl border border-slate-200/90
                  text-[14px] text-gray-900 placeholder:text-gray-400
                  bg-slate-50/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]
                  focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-100/80
                  outline-none transition-all duration-200 h-14`;

/* STEP 1: Patient form */
function StepForm({ room }) {
  const { bookingForm, updateForm, nextStep } = useBookingStore();
  const {
    register, handleSubmit, control,
    formState: { errors },
  } = useForm({ defaultValues: bookingForm });

  const onSubmit = (data) => {
    updateForm(data);
    nextStep();
  };

  const today    = new Date();
  const duration = bookingForm.duration || 1;
  const checkin  = bookingForm.checkinDate;
  const total    = room ? room.price * duration : 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/* Room summary card */}
      {room && (
        <div className="flex items-center gap-3 rounded-[24px] border border-primary-100
                        bg-gradient-to-r from-primary-50/90 via-white to-accent-50/70 p-4
                        shadow-[0_12px_34px_rgba(37,99,235,0.08)] transition-all duration-300 hover:shadow-[0_16px_42px_rgba(37,99,235,0.12)]">
          <img src={room.image} alt={room.name}
               className="w-16 h-16 rounded-xl object-cover shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-heading font-bold text-gray-900 text-[14px] truncate">
              {room.name}
            </p>
            <p className="text-[12px] text-gray-500">{room.floor}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-heading font-extrabold text-primary-600 text-[20px] sm:text-[22px]">
              {formatCurrency(room.price)}
            </p>
            <p className="text-[11px] text-gray-400">per day</p>
          </div>
        </div>
      )}

      {/* Patient details */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        <Field label="Patient Full Name *" error={errors.patientName}>
          <div className="relative">
            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("patientName", { required: "Full name is required" })}
              placeholder="e.g. Rahul Kulkarni"
              className={`${inputCls} pl-10`}
            />
          </div>
        </Field>

        <Field label="Phone Number *" error={errors.phone}>
          <div className="relative">
            <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("phone", {
                required: "Phone is required",
                pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid 10-digit mobile" },
              })}
              placeholder="98765 43210"
              className={`${inputCls} pl-10`}
            />
          </div>
        </Field>

        <Field label="Email Address *" error={errors.email}>
          <div className="relative">
            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter valid email" },
              })}
              placeholder="rahul@example.com"
              className={`${inputCls} pl-10`}
            />
          </div>
        </Field>

        <Field label="Patient Age *" error={errors.age}>
          <div className="relative">
            <Hash size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("age", {
                required: "Age is required",
                min: { value: 1, message: "Age must be at least 1" },
                max: { value: 120, message: "Enter valid age" },
              })}
              type="number" placeholder="35"
              className={`${inputCls} pl-10`}
            />
          </div>
        </Field>

        <Field label="Emergency Contact *" error={errors.emergencyContact}>
          <div className="relative">
            <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("emergencyContact", { required: "Emergency contact is required" })}
              placeholder="Emergency number"
              className={`${inputCls} pl-10`}
            />
          </div>
        </Field>

        <Field label="Check-in Date *" error={errors.checkinDate}>
          <div className="relative">
            <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2
                                           text-gray-400 pointer-events-none z-10" />
            <Controller
              name="checkinDate"
              control={control}
              rules={{ required: "Check-in date is required" }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  minDate={today}
                  placeholderText="Select date"
                  dateFormat="dd MMM yyyy"
                  popperPlacement="bottom-start"
                  showPopperArrow={false}
                  wrapperClassName="w-full"
                  popperClassName="react-datepicker-popper-premium"
                  calendarClassName="react-datepicker-premium"
                  preventOpenOnFocus={false}
                  popperModifiers={[
                    {
                      name: "offset",
                      options: { offset: [0, 10] },
                    },
                    {
                      name: "preventOverflow",
                      options: {
                        rootBoundary: "viewport",
                        tether: false,
                        padding: 16,
                      },
                    },
                    {
                      name: "flip",
                      options: {
                        fallbackPlacements: ["top-start", "bottom-end"],
                      },
                    },
                  ]}
                  className={`${inputCls} h-14 pl-10 w-full`}
                />
              )}
            />
          </div>
        </Field>
      </div>

      {/* Duration */}
      <Field label="Duration (number of days) *" error={errors.duration}>
        <div className="relative">
          <Clock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            {...register("duration", {
              required: "Duration is required",
              min: { value: 1, message: "Minimum 1 day" },
              max: { value: 90, message: "Maximum 90 days" },
            })}
            type="number" placeholder="3"
            className={`${inputCls} h-14 pl-10`}
          />
        </div>
      </Field>

      {/* Total preview */}
      {room && (
        <div className="rounded-[24px] border border-primary-100/80
                        bg-gradient-to-r from-primary-50 via-white to-accent-50/60 p-4
                        shadow-[0_10px_28px_rgba(37,99,235,0.06)]">
          <div className="flex items-center justify-between gap-4 text-[13.5px] text-gray-600">
            <span className="leading-relaxed">{formatCurrency(room.price)} x {duration} day{duration > 1 ? "s" : ""}</span>
            <span className="font-heading font-extrabold text-primary-600 text-[18px]">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      )}

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02, boxShadow: "0 12px 36px rgba(37,99,235,0.36)" }}
        whileTap={{ scale: 0.97 }}
        className="w-full flex items-center justify-center gap-2.5
                   font-bold text-white text-[15px]
                   bg-gradient-to-r from-primary-600 to-accent-500
                   py-4 rounded-2xl shadow-lg transition-all duration-200"
      >
        Review Booking <ArrowRight size={17} />
      </motion.button>
    </form>
  );
}

/* STEP 2: Confirmation review */
function StepConfirm() {
  const { selectedRoom, bookingForm, prevStep, confirmBooking, isSubmitting } = useBookingStore();
  const checkout = bookingForm.checkinDate
    ? getCheckoutDate(bookingForm.checkinDate, bookingForm.duration)
    : null;
  const total = selectedRoom ? selectedRoom.price * bookingForm.duration : 0;

  const rows = [
    { label: "Patient",        value: bookingForm.patientName   },
    { label: "Phone",          value: bookingForm.phone         },
    { label: "Email",          value: bookingForm.email         },
    { label: "Age",            value: bookingForm.age + " yrs"  },
    { label: "Emergency",      value: bookingForm.emergencyContact },
    { label: "Room",           value: selectedRoom?.name        },
    { label: "Check-in",       value: bookingForm.checkinDate ? formatShortDate(bookingForm.checkinDate) : "" },
    { label: "Check-out",      value: checkout ? formatShortDate(checkout) : "" },
    { label: "Duration",       value: `${bookingForm.duration} day${bookingForm.duration > 1 ? "s" : ""}` },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3 rounded-[24px] border border-amber-200/70
                      bg-gradient-to-r from-amber-50 to-orange-50/70 p-4
                      text-[13px] font-medium text-amber-700 shadow-[0_10px_26px_rgba(251,191,36,0.10)]">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/80">
          <AlertCircle size={15} className="text-amber-500" />
        </div>
        Please review your booking details carefully before confirming.
      </div>

      <div className="overflow-hidden rounded-[24px] border border-gray-100 bg-white/95 shadow-[0_14px_34px_rgba(15,23,42,0.06)]">
        {rows.map(({ label, value }) => (
          <div key={label}
               className="flex items-start justify-between gap-4 border-b border-gray-100/80 px-4 py-3.5 text-[13.5px] last:border-b-0 sm:px-5">
            <span className="pt-0.5 text-gray-400 font-medium">{label}</span>
            <span className="max-w-[62%] text-right font-semibold leading-relaxed text-gray-900">
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-[24px] border border-primary-100/70
                      bg-gradient-to-r from-primary-50 via-white to-accent-50/60 p-4
                      shadow-[0_12px_30px_rgba(37,99,235,0.08)]">
        <span className="text-[14px] font-bold text-gray-700">Total Amount</span>
        <span className="font-heading font-extrabold text-primary-600 text-[22px]">
          {formatCurrency(total)}
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <motion.button
          onClick={prevStep}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex-1 flex items-center justify-center gap-2
                     py-3.5 rounded-2xl border-2 border-gray-200
                     text-gray-700 font-bold text-[14px]
                     hover:bg-gray-50 transition-colors duration-200"
        >
          <ArrowLeft size={16} /> Edit
        </motion.button>

        <motion.button
          onClick={confirmBooking}
          disabled={isSubmitting}
          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting ? { scale: 0.97 } : {}}
          className="flex-1 flex items-center justify-center gap-2.5
                     py-3.5 rounded-2xl
                     bg-gradient-to-r from-primary-600 to-accent-500
                     text-white font-bold text-[14px]
                     shadow-lg disabled:opacity-70
                     transition-all duration-200"
        >
          {isSubmitting
            ? <><Loader2 size={17} className="animate-spin" /> Processing...</>
            : <><CreditCard size={17} /> Confirm Booking</>
          }
        </motion.button>
      </div>
    </div>
  );
}

/* STEP 3: Success */
function StepSuccess() {
  const { confirmedBooking, resetBooking } = useBookingStore();
  const { closeBookingModal }              = useUIStore();

  if (!confirmedBooking) return null;

  const handlePrint = () => window.print();
  const handleClose = () => { resetBooking(); closeBookingModal(); };

  return (
    <div className="space-y-6 text-center">
      {/* Success icon */}
      <div className="flex justify-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: [0.96, 1.04, 1], rotate: 0 }}
          transition={{ duration: 0.75, ease: EASE }}
          className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-teal-200
                     bg-gradient-to-br from-teal-50 to-emerald-50 shadow-[0_18px_38px_rgba(16,185,129,0.18)]"
        >
          <CheckCircle2 size={40} className="text-teal-500" />
        </motion.div>
      </div>

      <div className="space-y-2">
        <h3 className="font-heading font-extrabold text-gray-900 text-[22px]">
          Booking Confirmed!
        </h3>
        <p className="mx-auto max-w-md text-[14px] leading-relaxed text-gray-400">
          Your room has been reserved. We'll contact you shortly.
        </p>
      </div>

      {/* Booking ID badge */}
      <div className="rounded-[24px] bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 px-6 py-5 text-center text-white shadow-[0_22px_50px_rgba(37,99,235,0.28)] ring-1 ring-white/20">
        <p className="text-primary-200 text-[12px] font-semibold uppercase tracking-wider mb-1">
          Booking ID
        </p>
        <p className="font-heading font-extrabold text-[28px] tracking-wider">
          {confirmedBooking.bookingId}
        </p>
        <p className="text-primary-200 text-[11.5px] mt-1">Save this ID for reference</p>
      </div>

      {/* Details */}
      <div className="text-left divide-y divide-gray-100 rounded-2xl
                      border border-gray-100 overflow-hidden">
        {[
          { label: "Patient",  value: confirmedBooking.patientName },
          { label: "Room",     value: confirmedBooking.room?.name  },
          { label: "Check-in", value: confirmedBooking.checkinDate
                                        ? formatShortDate(confirmedBooking.checkinDate) : "" },
          { label: "Duration", value: `${confirmedBooking.duration} days`             },
          { label: "Total",    value: formatCurrency(confirmedBooking.totalPrice)       },
        ].map(({ label, value }) => (
          <div key={label}
               className="flex items-center justify-between px-4 py-3
                          text-[13.5px] bg-white">
            <span className="text-gray-400 font-medium">{label}</span>
            <span className="font-semibold text-gray-900">{value}</span>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="bg-blue-50 rounded-2xl p-4 text-[13px] text-blue-700
                      border border-blue-100 text-left space-y-1">
        <p className="font-bold mb-2">Hospital Contact</p>
        <p>Address: {HOSPITAL.address}</p>
        <p>Reception: {HOSPITAL.reception}</p>
        <p>Emergency: {HOSPITAL.emergency}</p>
        <p>Email: {HOSPITAL.email}</p>
      </div>

      {/* Action buttons */}
      <div className="grid gap-2.5 sm:grid-cols-3">
        <motion.button
          onClick={handlePrint}
          whileHover={{ scale: 1.03, boxShadow: "0 10px 22px rgba(15,23,42,0.08)" }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2
                     py-3 rounded-2xl border-2 border-gray-200
                     text-gray-700 font-bold text-[13.5px]
                     hover:bg-gray-50 transition-colors"
        >
          <Printer size={15} /> Print
        </motion.button>
        <motion.button
          onClick={handlePrint}
          whileHover={{ scale: 1.03, boxShadow: "0 12px 26px rgba(37,99,235,0.10)" }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2
                     py-3 rounded-2xl border-2 border-primary-200
                     text-primary-600 font-bold text-[13.5px]
                     hover:bg-primary-50 transition-colors"
        >
          <Download size={15} /> Download
        </motion.button>
        <motion.button
          onClick={handleClose}
          whileHover={{ scale: 1.03, boxShadow: "0 16px 34px rgba(37,99,235,0.24)" }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2
                     py-3 rounded-2xl
                     bg-gradient-to-r from-primary-600 to-accent-500
                     text-white font-bold text-[13.5px]
                     shadow-md transition-all"
        >
          <CheckCircle2 size={15} /> Done
        </motion.button>
      </div>
    </div>
  );
}

/* BOOKING MODAL */
export default function BookingModal() {
  const { isBookingModalOpen, closeBookingModal } = useUIStore();
  const { bookingStep, selectedRoom, resetBooking, resetBookingFlow } = useBookingStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClose = () => {
    closeBookingModal();
    resetBookingFlow();
  };

  useEffect(() => {
    const esc = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (isBookingModalOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isBookingModalOpen]);

  useEffect(() => {
    if (isBookingModalOpen && !selectedRoom) {
      closeBookingModal();
      if (pathname !== "/rooms") {
        navigate("/rooms");
      }
    }
  }, [isBookingModalOpen, selectedRoom, closeBookingModal, navigate, pathname]);

  const stepTitles = [
    "Book a Room",
    "Review Booking",
    "Booking Confirmed",
  ];

  return (
    <AnimatePresence>
      {isBookingModalOpen && selectedRoom && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-3 sm:p-4
                     bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="modal-scrollbar relative my-6 w-full max-w-2xl overflow-x-hidden overflow-y-auto rounded-[32px] border border-white/70
                       bg-white/95 shadow-[0_40px_120px_rgba(15,23,42,0.28)]
                       backdrop-blur-xl max-h-[min(92vh,920px)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.06),transparent_28%)]" />
            {/* Header */}
            <div className="sticky top-0 z-10 rounded-t-[32px] border-b border-gray-100
                            bg-white/95 px-5 pt-5 pb-5 backdrop-blur-xl sm:px-6 sm:pt-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-heading font-extrabold text-gray-900 text-[20px]">
                    {stepTitles[bookingStep - 1]}
                  </h2>
                  <p className="text-[12.5px] text-gray-400 mt-0.5">
                    PuneCare Multi-Speciality Hospital
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-100
                             justify-center text-gray-500 hover:bg-gray-200
                             transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Step dots */}
              {bookingStep < 3 && <StepDots step={bookingStep} />}
            </div>

            {/* Body */}
            <div className="relative px-5 py-5 sm:px-6 sm:py-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={bookingStep}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  {bookingStep === 1 && <StepForm room={selectedRoom} />}
                  {bookingStep === 2 && <StepConfirm />}
                  {bookingStep === 3 && <StepSuccess />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

