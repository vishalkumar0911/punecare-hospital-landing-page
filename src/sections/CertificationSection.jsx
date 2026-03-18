import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Award,
  ShieldCheck,
  FlaskConical,
  Star,
  Globe2,
  Heart,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

function CertCard({ icon: Icon, title, subtitle, body, color, bg, border, delay }) {
  const ref = useRef(null);
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
      className={`group relative overflow-hidden rounded-3xl border ${border} bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] cursor-default transition-shadow duration-300 sm:p-6`}
    >
      <div className={`absolute top-0 right-0 h-36 w-36 translate-x-1/2 -translate-y-1/2 rounded-full ${bg} opacity-0 blur-2xl transition-opacity duration-300 pointer-events-none group-hover:opacity-100`} />

      <div className="mb-5 flex items-start justify-between gap-3">
        <motion.div
          whileHover={{
            rotate: [0, -10, 10, -5, 0],
            scale: 1.1,
            transition: { duration: 0.5 },
          }}
          className={`flex h-[52px] w-[52px] items-center justify-center rounded-2xl ${bg}`}
        >
          <Icon size={24} className={color} strokeWidth={1.75} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: delay + 0.3, duration: 0.4, ease: EASE }}
          className={`flex items-center gap-1.5 rounded-full border ${border} ${bg} px-3 py-1.5 text-[11px] font-bold ${color}`}
        >
          <ShieldCheck size={11} />
          Certified
        </motion.div>
      </div>

      <h3 className="mb-0.5 font-heading text-[16px] font-bold text-gray-900">{title}</h3>
      <p className={`mb-3 text-[12px] font-bold ${color}`}>{subtitle}</p>
      <p className="text-[13px] leading-relaxed text-gray-400">{body}</p>

      <motion.div
        className="absolute bottom-0 left-0 h-[3px] rounded-r-full"
        style={{ background: "linear-gradient(90deg, #2563eb, #14b8a6)" }}
        initial={{ width: "0%" }}
        animate={inView ? { width: "50%" } : {}}
        transition={{ duration: 1, delay: delay + 0.5, ease: EASE }}
      />
    </motion.div>
  );
}

function CertStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-32px" });

  const certs = [
    { label: "NABH", sub: "National Accreditation" },
    { label: "ISO 9001", sub: "Quality Management" },
    { label: "NABL", sub: "Laboratory Certified" },
    { label: "JCI", sub: "International Standard" },
    { label: "CRISIL A+", sub: "Healthcare Rating" },
    { label: "MoHFW", sub: "Ministry Registered" },
  ];

  return (
    <div ref={ref} className="mt-14 sm:mt-16">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-7 text-center text-[12px] font-semibold uppercase tracking-[0.22em] text-gray-400 sm:mb-8 sm:text-[13px]"
      >
        Recognised and Certified By
      </motion.p>

      <div className="flex flex-wrap justify-center gap-3">
        {certs.map(({ label, sub }, index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: index * 0.07, ease: EASE }}
            whileHover={{
              scale: 1.06,
              y: -4,
              boxShadow: "0 12px 36px rgba(37,99,235,0.13)",
              transition: { duration: 0.18 },
            }}
            className="group flex flex-col items-center rounded-2xl border border-gray-200/70 bg-white px-5 py-4 shadow-sm cursor-default transition-colors duration-200 hover:border-primary-200/70 sm:px-7"
          >
            <span className="font-heading text-[18px] font-extrabold leading-none text-gray-900 transition-colors duration-200 group-hover:text-primary-600">
              {label}
            </span>
            <span className="mt-1 text-center text-[11px] font-medium text-gray-400">{sub}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TrustMarquee() {
  const items = [
    "NABH Accredited",
    "ISO 9001:2015",
    "25 Years of Excellence",
    "150+ Specialists",
    "JCI Standards",
    "NABL Laboratory",
    "50,000+ Patients",
    "24/7 Emergency",
    "Cashless Insurance",
    "NABH Accredited",
    "ISO 9001:2015",
    "25 Years of Excellence",
  ];

  return (
    <div className="mt-16 overflow-hidden bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 py-3.5 sm:mt-20 sm:-mx-6">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex w-max gap-8 whitespace-nowrap sm:gap-10"
      >
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="text-[13px] font-semibold tracking-wide text-white/90">
            {"•"} {item}
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
    body: "Internationally recognised quality management certification covering clinical processes, patient care protocols, and hospital administration.",
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
    body: "PuneCare follows JCI-inspired global standards for patient care, staff competency, and organisational performance.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100/70",
  },
  {
    icon: ShieldCheck,
    title: "MoHFW Registered",
    subtitle: "Ministry of Health and Family Welfare",
    body: "Fully registered and compliant with the Ministry of Health and Family Welfare, Government of India, and Maharashtra health authorities.",
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

export default function CertificationSection() {
  const headRef = useRef(null);
  const headIn = useInView(headRef, { once: true, margin: "-48px" });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface to-white px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(37,99,235,0.045),transparent_65%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div ref={headRef} className="mb-12 text-center sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-badge mb-4 inline-flex"
          >
            <ShieldCheck size={12} />
            Trust and Accreditation
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            className="fluid-title-lg mt-3 text-gray-900"
          >
            Certified Excellence,
            <span className="bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
              {" "}Trusted Care
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
            className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-gray-400 sm:text-[16.5px]"
          >
            Our accreditations are not just certificates on a wall - they reflect our daily commitment to patient safety, trust, and measurable care quality.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {CERTS.map((cert, index) => (
            <CertCard key={cert.title} {...cert} delay={index * 0.09} />
          ))}
        </div>

        <CertStrip />
      </div>

      <TrustMarquee />
    </section>
  );
}
