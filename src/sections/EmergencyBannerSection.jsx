import { motion } from "framer-motion";
import { Ambulance, ArrowRight, Clock3, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";
import { HOSPITAL } from "../utils/constants";

const EASE = [0.22, 1, 0.36, 1];

export default function EmergencyBannerSection() {
  return (
    <section className="px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[34px] bg-gradient-to-r from-red-600 via-rose-600 to-orange-500 shadow-[0_28px_80px_rgba(239,68,68,0.30)]"
      >
        <div className="absolute inset-0 opacity-[0.08]">
          <svg className="h-full w-full" aria-hidden>
            <defs>
              <pattern id="emergency-grid" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#emergency-grid)" />
          </svg>
        </div>

        <div className="absolute -right-12 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-8 px-7 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
              <Ambulance size={14} />
              Emergency Support
            </div>
            <h2 className="mt-5 font-heading text-[30px] font-extrabold leading-[1.08] text-white sm:text-[38px]">
              Need urgent admission or a critical care room?
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/80">
              Our emergency response team, ambulance network, and fast-track admission desk are
              available around the clock for Pune and nearby areas.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-2xl bg-white/12 px-4 py-3 text-[13px] font-semibold text-white backdrop-blur-sm">
                <Clock3 size={15} />
                24/7 triage and trauma support
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-white/12 px-4 py-3 text-[13px] font-semibold text-white backdrop-blur-sm">
                <PhoneCall size={15} />
                Fast response admissions
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href={`tel:${HOSPITAL.emergency}`}
              className="flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-[14px] font-bold text-red-600 shadow-[0_14px_32px_rgba(255,255,255,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(255,255,255,0.28)]"
            >
              <PhoneCall size={16} />
              Call {HOSPITAL.emergency}
            </a>

            <Link
              to="/rooms"
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-6 py-4 text-[14px] font-bold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15"
            >
              View Room Options
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
                <ArrowRight size={15} />
              </motion.span>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
