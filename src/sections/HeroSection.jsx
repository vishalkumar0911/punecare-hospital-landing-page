// src/sections/HeroSection.jsx
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Phone,
  Shield,
  ArrowRight,
  Users,
  Clock,
  Star,
  CheckCircle2,
  Activity,
  Heart,
  Stethoscope,
  Zap,
} from "lucide-react";
import { HOSPITAL } from "../utils/constants";

/* tiny cn helper */
const cn = (...c) => c.filter(Boolean).join(" ");

/* animation easing */
const EASE = [0.22, 1, 0.36, 1];

/* animation presets */
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.25 },
  },
};
const fadeSlide = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* Floating Glass Card (FloatCard) */
function FloatCard({
  icon: Icon,
  value,
  label,
  accent = "text-primary-600",
  bg = "bg-white",
  floatDelay = 0,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.72, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.8 + floatDelay, ease: EASE }}
      whileHover={{ scale: 1.08, y: -6, transition: { duration: 0.18 } }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 4 + floatDelay * 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
        className="flex items-center gap-3 px-4 py-3.5 rounded-2xl min-w-[162px]
                   bg-white/78 backdrop-blur-2xl
                   border border-white/80
                   shadow-[0_20px_60px_rgba(37,99,235,0.18),0_4px_20px_rgba(0,0,0,0.06)]"
      >
        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", bg)}>
          <Icon size={17} className={accent} />
        </div>

        <div>
          <p className="font-heading font-extrabold text-gray-900 text-[14.5px] leading-none">
            {value}
          </p>
          <p className="text-[11px] text-gray-400 mt-[3px] font-medium">{label}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* Trust pill */
function TrustPill({ icon: Icon, text }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -2, transition: { duration: 0.18 } }}
      className="flex items-center gap-2 bg-white/75 backdrop-blur-sm
                 border border-gray-200/60 rounded-full px-3.5 py-1.5
                 shadow-sm text-[12.5px] font-semibold text-gray-600 cursor-default"
    >
      <Icon size={12} className="text-primary-500 shrink-0" />
      {text}
    </motion.div>
  );
}

/* Hero image with parallax + blobs */
function HeroImage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const y = useSpring(rawY, { stiffness: 70, damping: 18, restDelta: 0.001 });

  return (
    <div ref={ref} className="relative w-full max-w-[545px] mx-auto lg:mx-0">
      {/* Animated blobs (depth + movement) */}
      <div className="absolute -inset-14 pointer-events-none overflow-visible -z-10">
        <motion.div
          animate={{ scale: [1, 1.18, 1], rotate: [0, 8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-80 h-80
                     bg-gradient-to-br from-primary-200/65 to-accent-200/45
                     rounded-full blur-[88px]"
        />
        <motion.div
          animate={{ scale: [1, 1.22, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-0 left-0 w-72 h-72
                     bg-gradient-to-br from-teal-200/55 to-primary-100/40
                     rounded-full blur-[80px]"
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute top-1/2 right-1/3 w-52 h-52
                     bg-accent-200/25 rounded-full blur-[70px]"
        />
      </div>

      {/* Decorative rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-5 rounded-[40px]
                   border-2 border-dashed border-primary-200/30 pointer-events-none"
      />
      <div className="absolute -inset-9 rounded-[48px] border border-primary-100/20 pointer-events-none" />

      {/* Parallax image wrapper */}
      <motion.div style={{ y }} className="relative z-10 will-change-transform">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Image frame */}
          <div
            className="relative rounded-[30px] overflow-hidden
                          border-[5px] border-white
                          shadow-[0_32px_96px_rgba(37,99,235,0.24),0_8px_24px_rgba(0,0,0,0.08)]"
          >
            <img
              src="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=900&q=85"
              alt="Deluxe hospital room"
              loading="lazy"
              className="w-full h-[400px] lg:h-[465px] object-cover"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/28 via-gray-900/4 to-white/4" />

            {/* Shimmer sweep on load */}
            <motion.div
              initial={{ x: "-100%", opacity: 0.4 }}
              animate={{ x: "200%", opacity: 0 }}
              transition={{ duration: 1.2, delay: 1, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r
                         from-transparent via-white/25 to-transparent
                         pointer-events-none skew-x-[-18deg]"
            />
          </div>

          {/* Room info pill */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.55, ease: EASE }}
            className="absolute bottom-5 left-4 right-4"
          >
            <div
              className="bg-white/94 backdrop-blur-2xl rounded-2xl px-5 py-4
                            shadow-[0_14px_52px_rgba(0,0,0,0.13)]
                            border border-white/95
                            flex items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-gray-900 text-[13.5px] truncate">
                  Deluxe Private Room
                </p>
                <p className="text-[11.5px] text-gray-400 mt-0.5">5th Floor - Wing A - AC</p>
              </div>

              <div className="text-right shrink-0">
                <p className="font-heading font-extrabold text-primary-600 text-[14px]">
                  INR 7,200
                </p>
                <p className="text-[11px] text-gray-400">per day</p>
              </div>

              <div
                className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600
                              border border-emerald-200/70 text-[11px] font-bold
                              px-2.5 py-1.5 rounded-lg shrink-0"
              >
                <motion.span
                  className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                  animate={{ opacity: [1, 0.35, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
                Available
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating stat cards */}
      <div className="absolute top-8 -left-12 z-20 hidden xl:block">
        <FloatCard icon={Users} value="50,000+" label="Patients Served" bg="bg-primary-50" accent="text-primary-600" />
      </div>
      <div className="absolute top-8 -right-12 z-20 hidden xl:block">
        <FloatCard icon={Star} value="4.9 / 5" label="Patient Rating" bg="bg-amber-50" accent="text-amber-500" floatDelay={0.5} />
      </div>
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-20 hidden xl:block">
        <FloatCard icon={Clock} value="24 / 7" label="Emergency Care" bg="bg-red-50" accent="text-red-500" floatDelay={1} />
      </div>

      {/* Orbiting icon accents */}
      {[
        { Icon: Activity, color: "text-teal-500", cls: "top-20 right-6", d: 0 },
        { Icon: Heart, color: "text-red-400", cls: "bottom-36 -left-5", d: 1.4 },
      ].map(({ Icon, color, cls, d }) => (
        <motion.div
          key={cls}
          animate={{ rotate: [0, 12, 0, -12, 0], y: [0, -7, 0] }}
          transition={{ duration: 4.5 + d, repeat: Infinity, ease: "easeInOut", delay: d }}
          className={cn(
            "absolute w-10 h-10 rounded-2xl bg-white",
            "shadow-[0_4px_22px_rgba(0,0,0,0.10)] border border-gray-100/80",
            "flex items-center justify-center z-20 hidden xl:flex",
            cls
          )}
        >
          <Icon size={17} className={color} />
        </motion.div>
      ))}
    </div>
  );
}

/* HERO SECTION (export default) */
export default function HeroSection() {
  const navigate = useNavigate();

  const checks = [
    "NABH & ISO 9001:2015 Accredited",
    "150+ Specialist Doctors On-Site",
    "Cashless Insurance - All Major Insurers",
    "24/7 Emergency & Trauma Care",
  ];

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-110px)] flex items-center">
      {/* Layered background with noise-bg utility (ensure .noise-bg exists in your CSS as added earlier) */}
      <div className="absolute inset-0 -z-10 overflow-hidden noise-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EBF3FF] via-[#EEF9F7] to-[#F6F9FF]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_78%_-5%,rgba(37,99,235,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_8%_105%,rgba(20,184,166,0.10),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_25%_at_50%_50%,rgba(14,165,233,0.04),transparent)]" />
        {/* Dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.028]" aria-hidden>
          <defs>
            <pattern id="hero-dots" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="#2563EB" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 lg:py-20">
        <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-14 lg:gap-10 items-center">
          {/* LEFT */}
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[600px]">
            {/* Accreditation pill */}
            <motion.div variants={fadeSlide}>
              <div className="inline-flex items-center gap-2 bg-white/82 backdrop-blur-sm
                              border border-primary-200/50 rounded-full
                              pl-2 pr-5 py-1.5 shadow-[0_2px_14px_rgba(37,99,235,0.10)]">
                <span className="flex items-center gap-1.5 bg-primary-600 text-white
                                 text-[10.5px] font-bold px-2.5 py-1 rounded-full">
                  <Shield size={9} /> NABH
                </span>
                <span className="text-[12px] font-semibold text-gray-600">
                                    Accredited - ISO 9001:2015 - 25 Years of Excellence
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeSlide}>
              <h1 className="font-heading font-extrabold text-gray-900 text-[44px] sm:text-[54px] lg:text-[62px] leading-[1.03] tracking-[-0.036em]">
                Advanced
                <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary-600 via-accent-500 to-teal-500 bg-clip-text text-transparent">
                    Healthcare
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-gradient-to-r from-primary-600 to-teal-400"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.8, ease: EASE }}
                  />
                </span>
                {" & Smart"}
                <br />
                Room Booking
                <motion.span className="text-primary-400" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>
                  .
                </motion.span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p variants={fadeSlide} className="text-[17px] text-gray-500 leading-[1.8] max-w-[500px]">
              PuneCare brings world-class multi-speciality care to Baner, Pune -
              with seamless online room booking, 150+ expert doctors,
              and 24/7 emergency support.
            </motion.p>

            {/* Checklist */}
            <motion.ul variants={fadeSlide} className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6">
              {checks.map((c, i) => (
                <motion.li
                  key={c}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.08, duration: 0.5, ease: EASE }}
                  className="flex items-center gap-2.5 text-[13px] font-medium text-gray-600"
                >
                  <CheckCircle2 size={15} className="text-teal-500 shrink-0" />
                  {c}
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA buttons (primary has soft glow) */}
            <motion.div variants={fadeSlide} className="flex flex-wrap gap-3 pt-1">
              <motion.button
                onClick={() => navigate("/rooms")}
                aria-label="Book a room"
                whileHover={{ scale: 1.045, boxShadow: "0 16px 44px rgba(37,99,235,0.40)" }}
                whileTap={{ scale: 0.95 }}
                className="relative group flex items-center gap-2.5 font-bold text-white
                           text-[14.5px] bg-gradient-to-r from-primary-600 to-accent-500
                           px-8 py-[15px] rounded-2xl overflow-hidden
                           shadow-[0_6px_24px_rgba(37,99,235,0.34)] transition-shadow duration-200"
              >
                {/* soft breathing glow */}
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/30 to-teal-400/30 blur-xl"
                  animate={{ opacity: [0.35, 0.75, 0.35] }}
                  transition={{ duration: 3.2, repeat: Infinity }}
                />
                <span className="relative z-10 flex items-center gap-2.5">
                  <Calendar size={17} />
                  <span>Book a Room</span>
                </span>
                <motion.span className="relative z-10" animate={{ x: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
                  <ArrowRight size={16} />
                </motion.span>
              </motion.button>

              <motion.a
                href={`tel:${HOSPITAL.emergency}`}
                whileHover={{ scale: 1.045, backgroundColor: "rgba(235,243,255,0.95)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2.5 font-bold text-primary-700
                           text-[14.5px] border-2 border-primary-200/80
                           bg-white/80 backdrop-blur-sm
                           px-8 py-[15px] rounded-2xl transition-all duration-200 shadow-sm"
              >
                <Phone size={17} />
                {HOSPITAL.emergency}
              </motion.a>
            </motion.div>

            {/* Trust pills */}
            <motion.div variants={fadeSlide} className="flex flex-wrap gap-2">
              {[{ icon: Shield, text: "NABH Accredited" }, { icon: Clock, text: "24/7 Emergency" }, { icon: Stethoscope, text: "150+ Specialists" }, { icon: Zap, text: "Cashless Insurance" }].map((p) => (
                <TrustPill key={p.text} {...p} />
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: EASE }} className="flex justify-center lg:justify-end">
            <HeroImage />
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none">
        <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 64h1440V36C1120 66 800 10 440 42 240 58 100 62 0 54V64z" fill="white" fillOpacity="0.92" />
        </svg>
      </div>
    </section>
  );
}

/* local helper: checks (kept here to avoid external dependency) */
const checks = [
  "NABH & ISO 9001:2015 Accredited",
  "150+ Specialist Doctors On-Site",
  "Cashless Insurance - All Major Insurers",
  "24/7 Emergency & Trauma Care",
];


