import { motion } from "framer-motion";
import { Activity, Building2, ShieldCheck, Users } from "lucide-react";
import WhyChooseUs from "../sections/WhyChooseUs";
import CertificationSection from "../sections/CertificationSection";

const EASE = [0.22, 1, 0.36, 1];

export default function AboutPage() {
  const pillars = [
    {
      icon: Building2,
      title: "Structured Hospital Experience",
      copy: "From room booking to specialist access, every patient touchpoint is designed for clarity.",
    },
    {
      icon: ShieldCheck,
      title: "Trust and Governance",
      copy: "Clinical quality, accreditation, escalation systems, and safety are built into daily workflows.",
    },
    {
      icon: Users,
      title: "Patient-first Care",
      copy: "Families receive transparent communication, responsive support, and guided admission journeys.",
    },
  ];

  return (
    <div className="bg-white">
      <section className="page-shell page-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(20,184,166,0.06),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="max-w-3xl"
          >
            <span className="section-badge inline-flex">
              <Activity size={13} />
              About PuneCare
            </span>
            <h1 className="fluid-title-lg mt-4 text-gray-900 sm:mt-5">
              Quality, Trust, and Clinical Excellence
              <span className="bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
                {" "}in One Hospital Platform
              </span>
            </h1>
            <p className="balanced-copy mt-4 max-w-2xl sm:mt-5">
              Learn what makes PuneCare trusted across Pune, from governance and patient
              communication to modern infrastructure and accreditation-backed care standards.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.14, ease: EASE }}
            className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-3"
          >
            {pillars.map(({ icon: Icon, title, copy }) => (
              <div
                key={title}
                className="rounded-[26px] border border-gray-100 bg-gradient-to-br from-white to-slate-50 p-5 shadow-[0_20px_48px_rgba(37,99,235,0.08)] sm:rounded-[30px] sm:p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                  <Icon size={20} />
                </div>
                <h2 className="mt-5 font-heading text-[18px] font-bold text-gray-900">{title}</h2>
                <p className="mt-3 text-[14px] leading-relaxed text-gray-500">{copy}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <WhyChooseUs />
      <CertificationSection />
    </div>
  );
}
