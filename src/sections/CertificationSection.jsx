import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Award, ShieldCheck, FlaskConical,
  Star, Globe2, Heart,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

/* ── Single certification card ── */
function CertCard({ icon: Icon, title, subtitle, body, color, bg, border, delay }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-48px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.68, delay, ease: EASE }}
      whileHover={{
        y: -8,
        boxShadow: "0 28px 64px rgba(37,99,235,0.12)",
        transition: { duration: 0.22 },
      }}
      className={`group relative bg-white rounded-3xl p-6
                  border ${border} overflow-hidden
                  shadow-[0_4px_24px_rgba(0,0,0,0.06)]
                  cursor-default transition-shadow duration-300`}
    >
      {/* Hover corner glow */}
      <div className={`absolute top-0 right-0 w-36 h-36 rounded-full ${bg}
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300
                       translate-x-1/2 -translate-y-1/2 pointer-events-none blur-2xl`} />

      {/* Badge row */}
      <div className="flex items-start justify-between mb-5">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1,
                        transition: { duration: 0.5 } }}
          className={`w-13 h-13 rounded-2xl ${bg} flex items-center justify-center`}
          style={{ width: 52, height: 52 }}
        >
          <Icon size={24} className={color} strokeWidth={1.75} />
        </motion.div>

        {/* Certified ribbon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: delay + 0.3, duration: 0.4, ease: EASE }}
          className={`flex items-center gap-1.5 ${bg} ${color}
                      text-[11px] font-bold px-3 py-1.5 rounded-full border ${border}`}
        >
          <ShieldCheck size={11} />
          Certified
        </motion.div>
      </div>

      {/* Text */}
      <h3 className="font-heading font-bold text-gray-900 text-[16px] mb-0.5">
        {title}
      </h3>
      <p className={`text-[12px] font-bold mb-3 ${color}`}>{subtitle}</p>
      <p className="text-[13px] text-gray-400 leading-relaxed">{body}</p>

      {/* Bottom shimmer on hover */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${bg}
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        style={{
          background: undefined,
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-[3px] rounded-r-full"
        style={{ background: "linear-gradient(90deg, var(--tw-gradient-from), var(--tw-gradient-to))" }}
        initial={{ width: "0%" }}
        animate={inView ? { width: "50%" } : {}}
        transition={{ duration: 1, delay: delay + 0.5, ease: EASE }}
      />
    </motion.div>
  );
}

/* ── Horizontal certification strip (logos row) ── */
function CertStrip() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-32px" });

  const certs = [
    { label: "NABH",        sub: "National Accreditation" },
    { label: "ISO 9001",    sub: "Quality Management"     },
    { label: "NABL",        sub: "Laboratory Certified"   },
    { label: "JCI",         sub: "International Standard" },
    { label: "CRISIL A+",   sub: "Healthcare Rating"      },
    { label: "MoHFW",       sub: "Ministry Registered"    },
  ];

  return (
    <div ref={ref} className="mt-16">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center text-[13px] font-semibold text-gray-400
                   uppercase tracking-widest mb-8"
      >
        Recognised & Certified By
      </motion.p>

      <div className="flex flex-wrap justify-center gap-3">
        {certs.map(({ label, sub }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
            whileHover={{
              scale: 1.06,
              y: -4,
              boxShadow: "0 12px 36px rgba(37,99,235,0.13)",
              transition: { duration: 0.18 },
            }}
            className="group flex flex-col items-center bg-white border border-gray-200/70
                       rounded-2xl px-7 py-4 shadow-sm cursor-default
                       hover:border-primary-200/70 transition-colors duration-200"
          >
            <span className="font-heading font-extrabold text-[18px]
                             text-gray-900 group-hover:text-primary-600
                             transition-colors duration-200 leading-none">
              {label}
            </span>
            <span className="text-[11px] text-gray-400 mt-1 font-medium">{sub}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Marquee trust bar ── */
function TrustMarquee() {
  const items = [
    "✦ NABH Accredited",
    "✦ ISO 9001:2015",
    "✦ 25 Years of Excellence",
    "✦ 150+ Specialists",
    "✦ JCI Standards",
    "✦ NABL Laboratory",
    "✦ 50,000+ Patients",
    "✦ 24/7 Emergency",
    "✦ Cashless Insurance",
    "✦ NABH Accredited",
    "✦ ISO 9001:2015",
    "✦ 25 Years of Excellence",
  ];

  return (
    <div className="overflow-hidden bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600
                    py-3.5 mt-20 -mx-4 sm:-mx-6">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex gap-10 whitespace-nowrap"
        style={{ width: "max-content" }}
      >
        {items.map((t, i) => (
          <span key={i}
                className="text-white/90 text-[13px] font-semibold tracking-wide">
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const CERTS = [
  {
    icon: Award,
    title: "NABH Accreditation",
    subtitle: "National Accreditation Board for Hospitals",
    body: "India's premier hospital accreditation standard ensuring quality benchmarks, patient safety, and operational excellence across all departments.",
    color: "text-primary-600",
    bg: "bg-primary-50",
    border: "border-primary-100/70",
  },
  {
    icon: Globe2,
    title: "ISO 9001:2015",
    subtitle: "International Quality Management System",
    body: "Internationally recognised quality management certification covering all clinical processes, patient care protocols, and hospital administration.",
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100/70",
  },
  {
    icon: FlaskConical,
    title: "NABL Certified",
    subtitle: "National Accreditation Board for Laboratories",
    body: "Our pathology and diagnostics labs are fully NABL-accredited, ensuring precise, reliable, and internationally comparable test results.",
    color: "text-accent-600",
    bg: "bg-accent-50/70",
    border: "border-accent-100/60",
  },
  {
    icon: Star,
    title: "JCI Standards",
    subtitle: "Joint Commission International",
    body: "PuneCare follows JCI global standards for patient care, staff competency, and organisational performance — the gold standard in healthcare.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100/70",
  },
  {
    icon: ShieldCheck,
    title: "MoHFW Registered",
    subtitle: "Ministry of Health & Family Welfare",
    body: "Fully registered and compliant with the Ministry of Health & Family Welfare, Government of India, and Maharashtra Health Authority.",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100/70",
  },
  {
    icon: Heart,
    title: "CRISIL A+ Rated",
    subtitle: "Healthcare Quality Rating",
    body: "Independently rated A+ by CRISIL for healthcare delivery standards, financial stability, and patient outcome performance metrics.",
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-100/70",
  },
];

/* ═══════════════════════════════════════
   CERTIFICATION SECTION
═══════════════════════════════════════ */
export default function CertificationSection() {
  const headRef = useRef(null);
  const headIn  = useInView(headRef, { once: true, margin: "-48px" });

  return (
    <section className="py-28 px-4 sm:px-6 relative overflow-hidden
                        bg-gradient-to-b from-surface to-white">

      {/* Background radial */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]
                        bg-[radial-gradient(ellipse,rgba(37,99,235,0.045),transparent_65%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative">

        {/* Header */}
        <div ref={headRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-badge mb-4 inline-flex"
          >
            <ShieldCheck size={12} />
            Trust & Accreditation
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            className="font-heading font-extrabold text-[36px] sm:text-[44px]
                       text-gray-900 tracking-[-0.03em] leading-[1.08] mt-3"
          >
            Certified Excellence,
            <span className="bg-gradient-to-r from-primary-600 to-teal-500
                             bg-clip-text text-transparent"> Trusted Care</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
            className="text-[16.5px] text-gray-400 mt-4 max-w-xl mx-auto leading-relaxed"
          >
            Our accreditations aren't just certificates on a wall — they are our
            daily commitment to the highest standards of patient safety and care quality.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTS.map((c, i) => (
            <CertCard key={c.title} {...c} delay={i * 0.09} />
          ))}
        </div>

        {/* Logo strip */}
        <CertStrip />

      </div>

      {/* Marquee */}
      <TrustMarquee />
    </section>
  );
}