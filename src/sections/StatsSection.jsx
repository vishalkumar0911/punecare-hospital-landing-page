import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Award, Users, Activity, Heart, Building2, Clock } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

function Counter({ to, duration = 2.2, started }) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!started) return undefined;

    const raw = String(to);
    if (raw.includes("/")) {
      setDisplay(raw);
      return undefined;
    }

    const suffix = raw.replace(/[\d,]/g, "");
    const numeric = parseInt(raw.replace(/\D/g, ""), 10);

    const ctrl = animate(0, numeric, {
      duration,
      ease: EASE,
      onUpdate(v) {
        const n = Math.round(v);
        setDisplay((n >= 1000 ? n.toLocaleString("en-IN") : String(n)) + suffix);
      },
    });

    return ctrl.stop;
  }, [started, to, duration]);

  return <>{display}</>;
}

function StatCard({ icon: Icon, value, label, desc, iconBg, iconColor, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-52px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
      whileHover={{
        y: -8,
        boxShadow: "0 28px 64px rgba(37,99,235,0.14)",
        borderColor: "rgba(37,99,235,0.13)",
        transition: { duration: 0.22 },
      }}
      className="group relative overflow-hidden rounded-3xl border border-gray-100/90 bg-white p-5 shadow-[0_4px_28px_rgba(37,99,235,0.07)] cursor-default sm:p-6 lg:p-7"
    >
      <div className="absolute top-0 right-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary-50/70 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100" />

      <motion.div
        whileHover={{
          rotate: [0, -14, 14, -7, 0],
          scale: 1.12,
          transition: { duration: 0.5 },
        }}
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg}`}
      >
        <Icon size={24} className={iconColor} strokeWidth={1.8} />
      </motion.div>

      <div className="stat-value mb-2 min-w-0 break-words">
        <Counter to={value} started={inView} />
      </div>

      <p className="mb-1.5 text-[14px] font-bold text-gray-700 sm:text-[15px]">{label}</p>
      {desc && <p className="text-[12.5px] leading-relaxed text-gray-400 sm:text-[13px]">{desc}</p>}

      <motion.div
        className={`absolute bottom-0 left-0 h-[3px] rounded-r-full bg-gradient-to-r ${
          iconBg.includes("primary")
            ? "from-primary-400 to-accent-400"
            : iconBg.includes("teal")
              ? "from-teal-400 to-accent-400"
              : iconBg.includes("red")
                ? "from-red-400 to-orange-400"
                : iconBg.includes("orange")
                  ? "from-orange-400 to-amber-400"
                  : iconBg.includes("purple")
                    ? "from-purple-400 to-pink-400"
                    : "from-accent-400 to-teal-400"
        }`}
        initial={{ width: "0%" }}
        animate={inView ? { width: "42%" } : {}}
        transition={{ duration: 0.9, delay: delay + 0.45, ease: EASE }}
      />
    </motion.div>
  );
}

const STATS = [
  {
    icon: Building2,
    value: "25+",
    label: "Years of Excellence",
    desc: "Serving Pune and Maharashtra since 1999 with unwavering commitment.",
    iconBg: "bg-primary-50",
    iconColor: "text-primary-600",
  },
  {
    icon: Users,
    value: "150+",
    label: "Expert Specialists",
    desc: "Board-certified doctors across 30+ specialities, available round the clock.",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    icon: Heart,
    value: "50,000+",
    label: "Patients Served",
    desc: "50,000+ lives touched with care, compassion, and cutting-edge medicine.",
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    icon: Activity,
    value: "98%",
    label: "Patient Satisfaction",
    desc: "Consistently rated among Pune's highest for quality of care.",
    iconBg: "bg-accent-50/80",
    iconColor: "text-accent-600",
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Emergency Services",
    desc: "Always-on emergency and trauma care ready within minutes.",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    icon: Award,
    value: "30+",
    label: "Specialities",
    desc: "Comprehensive multi-speciality care from cardiology to neurology.",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
];

export default function StatsSection() {
  const headRef = useRef(null);
  const headIn = useInView(headRef, { once: true, margin: "-48px" });

  return (
    <section className="relative overflow-hidden bg-surface px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 h-[480px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(37,99,235,0.05),transparent_65%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div ref={headRef} className="mb-12 text-center sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-badge mb-4 inline-flex"
          >
            <Activity size={12} />
            Our Track Record
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            className="fluid-title-lg mt-3 text-gray-900"
          >
            Numbers That Reflect
            <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              {" "}Our Commitment
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
            className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-gray-400 sm:text-[16.5px]"
          >
            Two and a half decades of excellence - measured in lives improved across Pune and Maharashtra.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {STATS.map((stat, index) => (
            <StatCard key={stat.label} {...stat} delay={index * 0.09} />
          ))}
        </div>
      </div>
    </section>
  );
}
