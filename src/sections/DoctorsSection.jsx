import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Star, Clock, ChevronLeft, ChevronRight,
  Calendar, Phone, Award, MapPin,
  CheckCircle2, Stethoscope,
} from "lucide-react";
import { doctors } from "../data/doctors";
import { formatCurrency } from "../utils/formatters";

const EASE = [0.22, 1, 0.36, 1];

/* â”€â”€ Star rating row â”€â”€ */
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={13}
          className={n <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}
          fill={n <= Math.round(rating) ? "#fbbf24" : "#e5e7eb"}
        />
      ))}
    </div>
  );
}

/* â”€â”€ Doctor card â”€â”€ */
function DoctorCard({ doctor, index }) {
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="relative h-[420px] cursor-pointer"
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* â”€â”€ FRONT â”€â”€ */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden bg-white
                     border border-gray-100/90
                     shadow-[0_4px_28px_rgba(37,99,235,0.08)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Photo */}
          <div className="relative h-[220px] overflow-hidden">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-full object-cover object-top
                         transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t
                            from-gray-900/40 via-transparent to-transparent" />

            {/* Available badge */}
            <div className={`absolute top-3 right-3 flex items-center gap-1.5
                             text-[11px] font-bold px-2.5 py-1 rounded-full
                             ${doctor.available
                               ? "bg-emerald-500 text-white"
                               : "bg-gray-600 text-white"}`}>
              <motion.span
                className={`w-1.5 h-1.5 rounded-full ${doctor.available ? "bg-white" : "bg-gray-300"}`}
                animate={doctor.available ? { opacity: [1, 0.3, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              {doctor.available ? "Available" : "Unavailable"}
            </div>
          </div>

          {/* Info */}
          <div className="p-5">
            <h3 className="font-heading font-bold text-gray-900 text-[16.5px] leading-tight mb-0.5">
              {doctor.name}
            </h3>
            <p className="text-primary-600 text-[13px] font-semibold mb-3">
              {doctor.specialization}
            </p>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Stars rating={doctor.rating} />
                <span className="text-[12px] text-gray-400 font-medium">
                  ({doctor.reviewCount})
                </span>
              </div>
              <span className="text-[12px] text-gray-500 font-medium">
                {doctor.experience} yrs exp.
              </span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div>
                <p className="text-[11px] text-gray-400">Consultation</p>
                <p className="font-heading font-bold text-gray-900 text-[15px]">
                  {formatCurrency(doctor.fee)}
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-primary-50
                              text-primary-600 text-[11.5px] font-semibold
                              px-3 py-1.5 rounded-lg border border-primary-100">
                <Clock size={11} />
                {doctor.nextSlot}
              </div>
            </div>
          </div>
        </div>

        {/* â”€â”€ BACK â”€â”€ */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden
                     bg-gradient-to-br from-primary-700 via-primary-600 to-accent-600
                     border border-primary-500/30
                     shadow-[0_20px_60px_rgba(37,99,235,0.30)]
                     flex flex-col justify-between p-6"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* BG pattern */}
          <div className="absolute inset-0 opacity-[0.06]">
            <svg className="w-full h-full" aria-hidden>
              <defs>
                <pattern id={`dr-dots-${index}`} x="0" y="0" width="22" height="22"
                         patternUnits="userSpaceOnUse">
                  <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#dr-dots-${index})`} />
            </svg>
          </div>

          <div className="relative z-10">
            {/* Mini avatar */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/40 shrink-0">
                <img src={doctor.image} alt="" className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <p className="font-heading font-bold text-white text-[15px] leading-tight">
                  {doctor.name}
                </p>
                <p className="text-white/70 text-[12px]">{doctor.qualification}</p>
              </div>
            </div>

            {/* About */}
            <p className="text-white/80 text-[13px] leading-relaxed mb-5">
              {doctor.about}
            </p>

            {/* Languages */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {doctor.languages.map((l) => (
                <span key={l}
                      className="bg-white/15 text-white/90 text-[11px]
                                 font-semibold px-2.5 py-1 rounded-full
                                 border border-white/20">
                  {l}
                </span>
              ))}
            </div>

            {/* Rating on back */}
            <div className="flex items-center gap-2">
              <Stars rating={doctor.rating} />
              <span className="text-white/80 text-[12.5px] font-semibold">
                {doctor.rating} - {doctor.reviewCount} reviews
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="relative z-10 space-y-2.5">
            <motion.button
              onClick={() => navigate("/rooms")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full flex items-center justify-center gap-2
                         bg-white text-primary-700 font-bold text-[13.5px]
                         py-3 rounded-2xl shadow-lg hover:bg-primary-50
                         transition-colors duration-200"
            >
              <Calendar size={15} />
              View Rooms
            </motion.button>
            
            <a
              href="tel:+912061239999"
              className="w-full flex items-center justify-center gap-2
                         bg-white/15 border border-white/25 text-white
                         font-bold text-[13.5px] py-3 rounded-2xl
                         hover:bg-white/25 transition-colors duration-200"
            >
              <Phone size={15} />
              Call Reception
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   DOCTORS SECTION
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
export default function DoctorsSection() {
  const headRef  = useRef(null);
  const headIn   = useInView(headRef, { once: true, margin: "-48px" });
  const prevRef  = useRef(null);
  const nextRef  = useRef(null);

  return (
    <section className="py-28 px-4 sm:px-6 relative overflow-hidden bg-surface">

      {/* Bg radial */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]
                        bg-[radial-gradient(ellipse,rgba(37,99,235,0.05),transparent_65%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative">

        {/* Header */}
        <div ref={headRef} className="flex flex-col md:flex-row
                                      md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={headIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="section-badge mb-4 inline-flex"
            >
              <Stethoscope size={12} />
              Our Specialists
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 26 }}
              animate={headIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
              className="font-heading font-extrabold
                         text-[36px] sm:text-[44px]
                         text-gray-900 tracking-[-0.03em] leading-[1.08]"
            >
              Meet Pune's Finest
              <br />
              <span className="bg-gradient-to-r from-primary-600 to-accent-500
                               bg-clip-text text-transparent">
                Medical Experts
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={headIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
              className="text-[16px] text-gray-400 mt-3 max-w-lg leading-relaxed"
            >
              Board-certified specialists from AIIMS, NIMHANS, and Tata Memorial -
              hover a card to know them better.
            </motion.p>
          </div>

          {/* Custom nav arrows */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={headIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center gap-2 shrink-0"
          >
            <button
              ref={prevRef}
              className="w-11 h-11 rounded-xl border border-gray-200 bg-white
                         flex items-center justify-center text-gray-600
                         hover:bg-primary-50 hover:border-primary-200
                         hover:text-primary-600 transition-all duration-200
                         shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              ref={nextRef}
              className="w-11 h-11 rounded-xl border border-gray-200 bg-white
                         flex items-center justify-center text-gray-600
                         hover:bg-primary-50 hover:border-primary-200
                         hover:text-primary-600 transition-all duration-200
                         shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        </div>

        {/* Swiper carousel */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            pagination={{ clickable: true, el: ".doctors-pagination" }}
            breakpoints={{
              640:  { slidesPerView: 2, spaceBetween: 18 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
              1280: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className="!pb-4"
          >
            {doctors.map((doctor, i) => (
              <SwiperSlide key={doctor.id}>
                <DoctorCard doctor={doctor} index={i} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination dots */}
          <div className="doctors-pagination flex justify-center gap-2 mt-6
                          [&_.swiper-pagination-bullet]:w-2
                          [&_.swiper-pagination-bullet]:h-2
                          [&_.swiper-pagination-bullet]:rounded-full
                          [&_.swiper-pagination-bullet]:bg-gray-300
                          [&_.swiper-pagination-bullet-active]:bg-primary-600
                          [&_.swiper-pagination-bullet-active]:w-6" />
        </motion.div>

      </div>
    </section>
  );
}


