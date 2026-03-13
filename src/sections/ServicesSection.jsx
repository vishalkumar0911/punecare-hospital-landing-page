import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Heart, Brain, Baby, Bone, Zap,
  Shield, Stethoscope, Activity,
  Eye, Wind, Microscope, ArrowRight,
  ChevronRight,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

/* ── icon map (string → component) ── */
const ICONS = {
  Heart, Brain, Baby, Bone, Zap, Shield,
  Stethoscope, Activity, Eye, Wind, Microscope,
};

/* ── services data ── */
const SERVICES = [
  {
    id: "cardiology",
    icon: "Heart",
    title: "Cardiology",
    shortDesc: "Advanced cardiac care with cath lab, angioplasty & bypass surgery.",
    detail: "Our 24/7 cardiac unit is equipped with a state-of-the-art catheterisation lab, high-resolution echocardiography, and an expert team led by DM-qualified interventional cardiologists.",
    tag: "Most Visited",
    tagColor: "bg-red-50 text-red-600 border-red-100",
    accent: "from-red-500 to-rose-600",
    lightBg: "bg-red-50",
    iconColor: "text-red-500",
    ring: "ring-red-100",
    patients: "3,200+ yearly",
  },
  {
    id: "neurology",
    icon: "Brain",
    title: "Neurology",
    shortDesc: "Comprehensive stroke, epilepsy & neuro-critical care.",
    detail: "NIMHANS-trained neurologists offering stroke thrombolysis, EEG, nerve conduction studies, and advanced neuro-imaging — all under one roof.",
    tag: "Advanced",
    tagColor: "bg-purple-50 text-purple-600 border-purple-100",
    accent: "from-purple-500 to-violet-600",
    lightBg: "bg-purple-50",
    iconColor: "text-purple-500",
    ring: "ring-purple-100",
    patients: "1,800+ yearly",
  },
  {
    id: "pediatrics",
    icon: "Baby",
    title: "Pediatrics",
    shortDesc: "NICU, paediatric ICU & child specialist care.",
    detail: "Dedicated NICU with Level III care, paediatric surgery, childhood immunisation, and adolescent health programmes by experienced child specialists.",
    tag: "Family Care",
    tagColor: "bg-yellow-50 text-yellow-600 border-yellow-100",
    accent: "from-yellow-500 to-amber-500",
    lightBg: "bg-yellow-50",
    iconColor: "text-yellow-500",
    ring: "ring-yellow-100",
    patients: "4,500+ yearly",
  },
  {
    id: "orthopedics",
    icon: "Bone",
    title: "Orthopedics",
    shortDesc: "Joint replacement, sports medicine & spine surgery.",
    detail: "MS-qualified orthopaedic surgeons specialising in robotic-assisted knee and hip replacement, minimally invasive spine procedures, and sports injury management.",
    tag: "Top Rated",
    tagColor: "bg-blue-50 text-blue-600 border-blue-100",
    accent: "from-blue-500 to-cyan-600",
    lightBg: "bg-blue-50",
    iconColor: "text-blue-500",
    ring: "ring-blue-100",
    patients: "2,900+ yearly",
  },
  {
    id: "emergency",
    icon: "Zap",
    title: "Emergency Care",
    shortDesc: "24/7 trauma, rapid response & resuscitation.",
    detail: "A fully equipped emergency department with a dedicated trauma bay, resuscitation team, point-of-care diagnostics, and direct links to the ICU and OT.",
    tag: "24/7 Open",
    tagColor: "bg-orange-50 text-orange-600 border-orange-100",
    accent: "from-orange-500 to-red-500",
    lightBg: "bg-orange-50",
    iconColor: "text-orange-500",
    ring: "ring-orange-100",
    patients: "6,000+ yearly",
  },
  {
    id: "oncology",
    icon: "Shield",
    title: "Oncology",
    shortDesc: "Medical oncology, targeted therapy & cancer surgery.",
    detail: "Tata Memorial-trained oncologists providing chemotherapy, immunotherapy, targeted therapy, and multi-disciplinary tumour board reviews for comprehensive cancer management.",
    tag: "Specialised",
    tagColor: "bg-teal-50 text-teal-600 border-teal-100",
    accent: "from-teal-500 to-emerald-600",
    lightBg: "bg-teal-50",
    iconColor: "text-teal-500",
    ring: "ring-teal-100",
    patients: "1,200+ yearly",
  },
  {
    id: "general",
    icon: "Stethoscope",
    title: "General Medicine",
    shortDesc: "OPD, preventive health & chronic disease management.",
    detail: "Comprehensive outpatient care covering diabetes, hypertension, thyroid, infectious diseases, and preventive health check-ups with personalised care plans.",
    tag: "Everyday Care",
    tagColor: "bg-green-50 text-green-600 border-green-100",
    accent: "from-green-500 to-teal-500",
    lightBg: "bg-green-50",
    iconColor: "text-green-500",
    ring: "ring-green-100",
    patients: "8,000+ yearly",
  },
  {
    id: "radiology",
    icon: "Activity",
    title: "Radiology",
    shortDesc: "3T MRI, 128-slice CT, digital X-ray & interventional radiology.",
    detail: "NABL-accredited imaging centre with 3 Tesla MRI, 128-slice CT scanner, digital mammography, and a dedicated interventional radiology suite for minimally invasive procedures.",
    tag: "NABL Certified",
    tagColor: "bg-indigo-50 text-indigo-600 border-indigo-100",
    accent: "from-indigo-500 to-blue-600",
    lightBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
    ring: "ring-indigo-100",
    patients: "5,500+ yearly",
  },
];

/* ── Service card ── */
function ServiceCard({ service, index, isActive, onHover }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon   = ICONS[service.icon] || Heart;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.07, ease: EASE }}
      onHoverStart={() => onHover(service.id)}
      onHoverEnd={() => onHover(null)}
      whileHover={{ y: -8, transition: { duration: 0.22 } }}
      className="group relative bg-white rounded-3xl overflow-hidden
                 border border-gray-100/90 cursor-pointer
                 shadow-[0_4px_24px_rgba(0,0,0,0.06)]
                 hover:shadow-[0_24px_64px_rgba(37,99,235,0.13)]
                 hover:border-gray-200/80
                 transition-[border-color,box-shadow] duration-300"
    >
      {/* Top gradient bar */}
      <div className={`h-[3px] w-full bg-gradient-to-r ${service.accent}
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="p-6">
        {/* Icon + tag row */}
        <div className="flex items-start justify-between mb-5">
          <motion.div
            whileHover={{ rotate: [0, -12, 12, -6, 0], scale: 1.12,
                          transition: { duration: 0.5 } }}
            className={`w-14 h-14 rounded-2xl ${service.lightBg}
                        flex items-center justify-center
                        ring-4 ${service.ring} ring-opacity-60`}
          >
            <Icon size={26} className={service.iconColor} strokeWidth={1.7} />
          </motion.div>

          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full
                            border ${service.tagColor}`}>
            {service.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-gray-900 text-[17px] mb-2
                       group-hover:text-primary-600 transition-colors duration-200">
          {service.title}
        </h3>

        {/* Short description */}
        <p className="text-[13.5px] text-gray-400 leading-relaxed mb-4">
          {service.shortDesc}
        </p>

        {/* Expandable detail */}
        <AnimatePresence>
          {isActive && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="text-[13px] text-gray-500 leading-relaxed mb-4
                         border-t border-gray-100 pt-4 overflow-hidden"
            >
              {service.detail}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Footer row */}
        <div className="flex items-center justify-between pt-2
                        border-t border-gray-100/80">
          <span className="text-[12px] text-gray-400 font-medium">
            {service.patients}
          </span>
          <motion.div
            className={`flex items-center gap-1 text-[12.5px] font-bold
                        ${service.iconColor} opacity-0 group-hover:opacity-100
                        transition-opacity duration-200`}
            animate={isActive ? { x: [0, 4, 0] } : {}}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            Learn more <ChevronRight size={13} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Highlight banner ── */
function ServiceHighlight() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-48px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative mt-16 rounded-3xl overflow-hidden
                 bg-gradient-to-r from-primary-700 via-primary-600 to-accent-600
                 shadow-[0_20px_60px_rgba(37,99,235,0.32)]"
    >
      {/* BG pattern */}
      <div className="absolute inset-0 opacity-[0.07]">
        <svg className="w-full h-full" aria-hidden>
          <defs>
            <pattern id="svc-dots" x="0" y="0" width="30" height="30"
                     patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#svc-dots)" />
        </svg>
      </div>

      {/* Blobs */}
      <div className="absolute top-0 right-0 w-72 h-72
                      bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-56 h-56
                      bg-teal-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

      <div className="relative z-10 flex flex-col md:flex-row
                      items-center justify-between gap-6 px-8 py-10">
        <div className="text-center md:text-left">
          <p className="text-white/70 text-[13px] font-semibold uppercase tracking-widest mb-2">
            Can't find your speciality?
          </p>
          <h3 className="font-heading font-extrabold text-white
                         text-[26px] sm:text-[30px] leading-tight">
            30+ Specialities Under One Roof
          </h3>
          <p className="text-white/75 text-[14.5px] mt-2 max-w-lg leading-relaxed">
            From dermatology to urology — PuneCare covers every medical need
            with expert doctors and modern infrastructure.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link to="/doctors">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 12px 36px rgba(0,0,0,0.25)" }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 bg-white text-primary-700
                         font-bold text-[14px] px-6 py-3.5 rounded-2xl
                         shadow-lg transition-all duration-200"
            >
              <Stethoscope size={16} />
              View All Doctors
            </motion.button>
          </Link>
          <a href="tel:+912061239999">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 bg-white/15 backdrop-blur-sm
                         border border-white/30 text-white font-bold
                         text-[14px] px-6 py-3.5 rounded-2xl
                         hover:bg-white/25 transition-all duration-200"
            >
              <Zap size={16} />
              Emergency Helpline
            </motion.button>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   SERVICES SECTION
═══════════════════════════════════════ */
export default function ServicesSection() {
  const [activeId, setActiveId] = useState(null);
  const headRef = useRef(null);
  const headIn  = useInView(headRef, { once: true, margin: "-48px" });

  return (
    <section className="py-28 px-4 sm:px-6 relative overflow-hidden bg-white">

      {/* Subtle top gradient bleed */}
      <div className="absolute top-0 inset-x-0 h-40
                      bg-gradient-to-b from-surface to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">

        {/* ── Section header ── */}
        <div ref={headRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-badge mb-4 inline-flex"
          >
            <Stethoscope size={12} />
            Medical Specialities
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
            World-Class Care
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-accent-500
                             bg-clip-text text-transparent">
              Across Every Speciality
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
            className="text-[16.5px] text-gray-400 mt-4
                       max-w-xl mx-auto leading-relaxed"
          >
            From routine check-ups to complex surgeries — PuneCare's 30+
            specialities are staffed by board-certified experts committed to
            your best outcomes.
          </motion.p>

          {/* Active filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="flex flex-wrap justify-center gap-2 mt-7"
          >
            {["All", "Surgical", "Medical", "Diagnostics", "Emergency"].map((f) => (
              <button
                key={f}
                className={`text-[12.5px] font-semibold px-4 py-1.5 rounded-full
                            border transition-all duration-200
                            ${f === "All"
                              ? "bg-primary-600 text-white border-primary-600 shadow-sm"
                              : "bg-white text-gray-500 border-gray-200 hover:border-primary-300 hover:text-primary-600"
                            }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.id}
              service={s}
              index={i}
              isActive={activeId === s.id}
              onHover={setActiveId}
            />
          ))}
        </div>

        {/* ── CTA Banner ── */}
        <ServiceHighlight />

      </div>
    </section>
  );
}