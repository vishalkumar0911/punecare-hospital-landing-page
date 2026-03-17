import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Clock, Award, Stethoscope, ShieldCheck,
  Pill, Ambulance, Wifi, CreditCard,
  CheckCircle2, ArrowRight, Star,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

/* â”€â”€ reason cards data â”€â”€ */
const REASONS = [
  {
    icon: Clock,
    title: "24/7 Emergency Care",
    desc: "Round-the-clock emergency services with a rapid response team, trauma bay, and direct ICU access.",
    accent: "from-red-500 to-orange-500",
    lightBg: "bg-red-50",
    iconColor: "text-red-500",
    ring: "ring-red-100",
    stat: "< 5 min",
    statLabel: "Avg response",
  },
  {
    icon: Award,
    title: "NABH Accredited",
    desc: "India's highest hospital accreditation standard - ensuring every process meets stringent quality and safety benchmarks.",
    accent: "from-primary-500 to-accent-500",
    lightBg: "bg-primary-50",
    iconColor: "text-primary-600",
    ring: "ring-primary-100",
    stat: "A+",
    statLabel: "CRISIL Rating",
  },
  {
    icon: Stethoscope,
    title: "150+ Expert Doctors",
    desc: "Board-certified specialists from AIIMS, NIMHANS, KEM, and Tata Memorial - Pune's finest medical minds.",
    accent: "from-teal-500 to-emerald-500",
    lightBg: "bg-teal-50",
    iconColor: "text-teal-600",
    ring: "ring-teal-100",
    stat: "150+",
    statLabel: "Specialists",
  },
  {
    icon: ShieldCheck,
    title: "Modern ICU",
    desc: "Level III ICU with 1:1 nurse-to-patient ratio, advanced ventilators, cardiac monitors, and intensivists on duty.",
    accent: "from-purple-500 to-violet-500",
    lightBg: "bg-purple-50",
    iconColor: "text-purple-500",
    ring: "ring-purple-100",
    stat: "1:1",
    statLabel: "Nurse ratio",
  },
  {
    icon: Pill,
    title: "24/7 Pharmacy",
    desc: "In-hospital pharmacy stocked with all critical medications, generics, and surgical consumables - open around the clock.",
    accent: "from-green-500 to-teal-500",
    lightBg: "bg-green-50",
    iconColor: "text-green-600",
    ring: "ring-green-100",
    stat: "24/7",
    statLabel: "Open always",
  },
  {
    icon: CreditCard,
    title: "Cashless Insurance",
    desc: "Tied up with 25+ major insurers including Star Health, HDFC ERGO, Niva Bupa - fully cashless admissions.",
    accent: "from-accent-500 to-cyan-500",
    lightBg: "bg-accent-50/70",
    iconColor: "text-accent-600",
    ring: "ring-accent-100",
    stat: "25+",
    statLabel: "Insurers",
  },
  {
    icon: Ambulance,
    title: "Ambulance Service",
    desc: "GPS-tracked BLS and ALS ambulances with paramedic teams available across Pune and PCMC for rapid patient transfer.",
    accent: "from-orange-500 to-amber-500",
    lightBg: "bg-orange-50",
    iconColor: "text-orange-500",
    ring: "ring-orange-100",
    stat: "10 min",
    statLabel: "Avg arrival",
  },
  {
    icon: Wifi,
    title: "Digital Health Records",
    desc: "Fully paperless EMR system - access your reports, prescriptions, and discharge summaries anytime via our patient portal.",
    accent: "from-indigo-500 to-blue-500",
    lightBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
    ring: "ring-indigo-100",
    stat: "100%",
    statLabel: "Digital",
  },
];

/* â”€â”€ Reason card â”€â”€ */
function ReasonCard({ reason, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-52px" });
  const { icon: Icon } = reason;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.68, delay: index * 0.08, ease: EASE }}
      whileHover={{ y: -8, transition: { duration: 0.22 } }}
      className="group relative bg-white rounded-3xl p-6 overflow-hidden
                 border border-gray-100/90 cursor-default
                 shadow-[0_4px_24px_rgba(0,0,0,0.06)]
                 hover:shadow-[0_24px_60px_rgba(37,99,235,0.12)]
                 hover:border-gray-200/70
                 transition-[border-color,box-shadow] duration-300"
    >
      {/* Animated top bar */}
      <div className={`absolute top-0 left-0 right-0 h-[3px]
                       bg-gradient-to-r ${reason.accent}
                       scale-x-0 group-hover:scale-x-100
                       transition-transform duration-300 origin-left`} />

      {/* Corner glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full
                       ${reason.lightBg} blur-2xl opacity-0
                       group-hover:opacity-60 transition-opacity duration-300
                       translate-x-1/2 -translate-y-1/2 pointer-events-none`} />

      {/* Icon + stat */}
      <div className="flex items-start justify-between mb-5">
        <motion.div
          whileHover={{ rotate: [0, -14, 14, -7, 0], scale: 1.1,
                        transition: { duration: 0.5 } }}
          className={`w-13 h-13 rounded-2xl ${reason.lightBg}
                      flex items-center justify-center
                      ring-4 ${reason.ring} ring-opacity-50`}
          style={{ width: 52, height: 52 }}
        >
          <Icon size={24} className={reason.iconColor} strokeWidth={1.75} />
        </motion.div>

        {/* Mini stat badge */}
        <div className={`text-right`}>
          <p className={`font-heading font-extrabold text-[18px]
                         leading-none ${reason.iconColor}`}>
            {reason.stat}
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5 font-medium">
            {reason.statLabel}
          </p>
        </div>
      </div>

      <h3 className="font-heading font-bold text-gray-900 text-[16px] mb-2
                     group-hover:text-primary-600 transition-colors duration-200">
        {reason.title}
      </h3>
      <p className="text-[13.5px] text-gray-400 leading-relaxed">{reason.desc}</p>
    </motion.div>
  );
}

/* â”€â”€ Left visual panel â”€â”€ */
function VisualPanel() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const highlights = [
    "Cardiology, Neurology & 28 more specialities",
    "NABH - ISO - JCI - NABL certified",
    "Cashless with 25+ insurance providers",
    "In-house pharmacy & diagnostics",
    "Digital reports via patient portal",
  ];

  return (
    <div ref={ref} className="relative">
      {/* Background blobs */}
      <div className="absolute -inset-10 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 6, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-64 h-64
                     bg-primary-200/50 rounded-full blur-[80px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -8, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-0 w-56 h-56
                     bg-teal-200/40 rounded-full blur-[72px]"
        />
      </div>

      {/* Main image */}
      <motion.div style={{ y }} className="relative z-10">
        <div className="rounded-3xl overflow-hidden border-4 border-white
                        shadow-[0_28px_80px_rgba(37,99,235,0.20)]">
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=85"
            alt="PuneCare doctors team"
            className="w-full h-[440px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t
                          from-gray-900/30 via-transparent to-transparent" />
        </div>

        {/* Floating rating card */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
          className="absolute -bottom-6 -left-6 bg-white rounded-2xl px-5 py-4
                     shadow-[0_16px_52px_rgba(37,99,235,0.16)]
                     border border-gray-100/80 z-20"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-50
                            flex items-center justify-center shrink-0">
              <Star size={20} className="text-amber-500" fill="#f59e0b" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-gray-900 text-[17px] leading-none">
                4.9 / 5.0
              </p>
              <p className="text-[11.5px] text-gray-400 mt-0.5">
                From 12,400+ reviews
              </p>
            </div>
          </div>
        </motion.div>

        {/* Floating experience card */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.65, duration: 0.6, ease: EASE }}
          className="absolute -top-6 -right-6 bg-white rounded-2xl px-5 py-4
                     shadow-[0_16px_52px_rgba(37,99,235,0.16)]
                     border border-gray-100/80 z-20"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary-50
                            flex items-center justify-center shrink-0">
              <Award size={20} className="text-primary-600" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-gray-900 text-[17px] leading-none">
                25+ Years
              </p>
              <p className="text-[11.5px] text-gray-400 mt-0.5">
                Of medical excellence
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Checklist below image */}
      <motion.ul
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
        className="mt-10 space-y-3"
      >
        {highlights.map((h, i) => (
          <motion.li
            key={h}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.07, duration: 0.5, ease: EASE }}
            className="flex items-center gap-3 text-[14px]
                       font-medium text-gray-700"
          >
            <div className="w-6 h-6 rounded-full bg-teal-50 border border-teal-200
                            flex items-center justify-center shrink-0">
              <CheckCircle2 size={14} className="text-teal-500" />
            </div>
            {h}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   WHY CHOOSE US SECTION
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
export default function WhyChooseUs() {
  const headRef = useRef(null);
  const headIn  = useInView(headRef, { once: true, margin: "-48px" });

  return (
    <section className="py-28 px-4 sm:px-6 relative overflow-hidden
                        bg-gradient-to-b from-white to-surface">

      {/* Background radial */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[1000px] h-[600px]
                        bg-[radial-gradient(ellipse,rgba(37,99,235,0.04),transparent_65%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative">

        {/* â”€â”€ Section header â”€â”€ */}
        <div ref={headRef} className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-badge mb-4 inline-flex"
          >
            <ShieldCheck size={12} />
            Why PuneCare
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            className="font-heading font-extrabold
                       text-[36px] sm:text-[44px]
                       text-gray-900 tracking-[-0.03em]
                       leading-[1.08] mt-3"
          >
            Pune's Most Trusted
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-teal-500
                             bg-clip-text text-transparent">
              Hospital. Here's Why.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
            className="text-[16.5px] text-gray-400 mt-4
                       max-w-xl mx-auto leading-relaxed"
          >
            For 25 years, PuneCare has set the benchmark for quality,
            compassion, and clinical excellence in Maharashtra.
          </motion.p>
        </div>

        {/* â”€â”€ Two-column layout â”€â”€ */}
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-start mb-20">

          {/* Left: visual + checklist */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <VisualPanel />
          </motion.div>

          {/* Right: reason cards in 2-col mini grid */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {REASONS.slice(0, 6).map((r, i) => (
                <ReasonCard key={r.title} reason={r} index={i} />
              ))}
            </div>

            {/* Bottom 2 cards full-width */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {REASONS.slice(6).map((r, i) => (
                <ReasonCard key={r.title} reason={r} index={6 + i} />
              ))}
            </div>
          </div>
        </div>

        {/* â”€â”€ Bottom CTA strip â”€â”€ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative rounded-3xl overflow-hidden
                     bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900
                     shadow-[0_24px_72px_rgba(0,0,0,0.22)] p-10"
        >
          {/* BG shimmer */}
          <div className="absolute inset-0 opacity-[0.06]">
            <svg className="w-full h-full" aria-hidden>
              <defs>
                <pattern id="why-grid" x="0" y="0" width="28" height="28"
                         patternUnits="userSpaceOnUse">
                  <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#why-grid)" />
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-80 h-80
                          bg-primary-500/20 rounded-full blur-3xl
                          -translate-y-1/2 translate-x-1/3" />

          <div className="relative z-10 flex flex-col md:flex-row
                          items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <p className="text-primary-300 text-[13px] font-bold
                            uppercase tracking-widest mb-3">
                Ready to experience the difference?
              </p>
              <h3 className="font-heading font-extrabold text-white
                             text-[28px] sm:text-[34px] leading-tight">
                Book Your Room Today
                <br />& Get Expert Care Tomorrow.
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 14px 40px rgba(37,99,235,0.50)",
                }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  to="/rooms"
                  className="flex items-center gap-2.5 bg-gradient-to-r
                             from-primary-500 to-accent-500 text-white
                             font-bold text-[14.5px] px-8 py-4 rounded-2xl
                             shadow-lg transition-all duration-200"
                >
                  <Clock size={17} />
                  Book a Room
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={15} />
                  </motion.span>
                </Link>
              </motion.div>

              <motion.a
                href="tel:+912061239999"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2.5 bg-white/10
                           backdrop-blur-sm border border-white/20
                           text-white font-bold text-[14.5px]
                           px-8 py-4 rounded-2xl
                           hover:bg-white/20 transition-all duration-200"
              >
                <Ambulance size={17} />
                Emergency Line
              </motion.a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

