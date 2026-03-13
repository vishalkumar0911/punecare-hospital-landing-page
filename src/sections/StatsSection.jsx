import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Award, Users, Activity, Heart, Building2, Clock } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

/* ── animated counter ── */
function Counter({ to, duration = 2.2, started }) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!started) return;
    const raw     = String(to);
    const suffix  = raw.replace(/[\d,]/g, "");
    const numeric = parseInt(raw.replace(/\D/g, ""), 10);

    const ctrl = animate(0, numeric, {
      duration,
      ease: EASE,
      onUpdate(v) {
        const n = Math.round(v);
        setDisplay(
          (n >= 1000 ? n.toLocaleString("en-IN") : String(n)) + suffix
        );
      },
    });
    return ctrl.stop;
  }, [started, to, duration]);

  return <>{display}</>;
}

/* ── stat card ── */
function StatCard({ icon: Icon, value, label, desc, iconBg, iconColor, delay }) {
  const ref    = useRef(null);
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
      className="group relative bg-white rounded-3xl p-7 overflow-hidden
                 border border-gray-100/90
                 shadow-[0_4px_28px_rgba(37,99,235,0.07)]
                 cursor-default"
    >
      {/* Corner glow */}
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full
                      bg-gradient-to-br from-primary-50/70 to-transparent
                      translate-x-1/2 -translate-y-1/2
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-300 pointer-events-none" />

      {/* Icon with wiggle on hover */}
      <motion.div
        whileHover={{ rotate: [0, -14, 14, -7, 0], scale: 1.12,
                      transition: { duration: 0.5 } }}
        className={`w-14 h-14 rounded-2xl flex items-center
                    justify-center mb-5 ${iconBg}`}
      >
        <Icon size={24} className={iconColor} strokeWidth={1.8} />
      </motion.div>

      {/* Counter number */}
      <div className="font-heading font-extrabold text-[42px] leading-none
                      tracking-tight text-gray-900 tabular-nums mb-2">
        <Counter to={value} started={inView} />
      </div>

      <p className="text-[15px] font-bold text-gray-700 mb-1.5">{label}</p>
      {desc && <p className="text-[13px] text-gray-400 leading-relaxed">{desc}</p>}

      {/* Animated bottom accent bar */}
      <motion.div
        className={`absolute bottom-0 left-0 h-[3px] rounded-r-full
                    bg-gradient-to-r ${iconBg.includes("primary")
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
    icon: Building2, value: "25+",    label: "Years of Excellence",
    desc: "Serving Pune & Maharashtra since 1999 with unwavering commitment.",
    iconBg: "bg-primary-50",  iconColor: "text-primary-600",
  },
  {
    icon: Users,     value: "150+",   label: "Expert Specialists",
    desc: "Board-certified doctors across 30+ specialities, available round the clock.",
    iconBg: "bg-teal-50",     iconColor: "text-teal-600",
  },
  {
    icon: Heart,     value: "50000+", label: "Patients Served",
    desc: "50,000+ lives touched with care, compassion, and cutting-edge medicine.",
    iconBg: "bg-red-50",      iconColor: "text-red-500",
  },
  {
    icon: Activity,  value: "98%",    label: "Patient Satisfaction",
    desc: "Consistently rated among Pune's highest for quality of care.",
    iconBg: "bg-accent-50/80", iconColor: "text-accent-600",
  },
  {
    icon: Clock,     value: "24/7",   label: "Emergency Services",
    desc: "Always-on emergency and trauma care ready within minutes.",
    iconBg: "bg-orange-50",   iconColor: "text-orange-500",
  },
  {
    icon: Award,     value: "30+",    label: "Specialities",
    desc: "Comprehensive multi-speciality care from cardiology to neurology.",
    iconBg: "bg-purple-50",   iconColor: "text-purple-500",
  },
];

/* ═══════════════════════════════════════
   STATS SECTION
═══════════════════════════════════════ */
export default function StatsSection() {
  const headRef = useRef(null);
  const headIn  = useInView(headRef, { once: true, margin: "-48px" });

  return (
    <section className="py-28 px-4 sm:px-6 relative overflow-hidden bg-surface">

      {/* Soft radial bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[480px]
                        bg-[radial-gradient(ellipse,rgba(37,99,235,0.05),transparent_65%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative">

        {/* Section header */}
        <div ref={headRef} className="text-center mb-16">
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
            className="font-heading font-extrabold text-[36px] sm:text-[44px]
                       text-gray-900 tracking-[-0.03em] leading-[1.08] mt-3"
          >
            Numbers That Reflect
            <span className="bg-gradient-to-r from-primary-600 to-accent-500
                             bg-clip-text text-transparent"> Our Commitment</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
            className="text-[16.5px] text-gray-400 mt-4 max-w-xl mx-auto leading-relaxed"
          >
            Two and a half decades of excellence — measured in lives improved
            across Pune and Maharashtra.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {STATS.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 0.09} />
          ))}
        </div>

      </div>
    </section>
  );
}