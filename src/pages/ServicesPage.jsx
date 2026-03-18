import { motion } from "framer-motion";
import { Activity, HeartPulse, ShieldCheck, Stethoscope } from "lucide-react";
import ServicesSection from "../sections/ServicesSection";
import { services } from "../data/services";

const EASE = [0.22, 1, 0.36, 1];

export default function ServicesPage() {
  const serviceHighlights = [
    {
      icon: Stethoscope,
      title: "30+ Specialities",
      copy: "Integrated care pathways across surgery, diagnostics, emergency, and long-term treatment.",
    },
    {
      icon: HeartPulse,
      title: "Evidence-led Care",
      copy: "Protocols shaped by specialist teams, critical care support, and monitored outcomes.",
    },
    {
      icon: ShieldCheck,
      title: "Hospital-grade Safety",
      copy: "NABH-aligned workflows, sterility, and escalation systems across departments.",
    },
  ];

  return (
    <div className="bg-white">
      <section className="page-shell page-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(20,184,166,0.08),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE }}
              className="max-w-3xl"
            >
              <span className="section-badge inline-flex">
                <Activity size={13} />
                Clinical Services
              </span>
              <h1 className="fluid-title-lg mt-4 text-gray-900 sm:mt-5">
                Care Pathways Built for
                <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                  {" "}Modern Multi-Speciality Care
                </span>
              </h1>
              <p className="balanced-copy mt-4 max-w-2xl sm:mt-5">
                This page focuses entirely on treatment capabilities, departments, and clinical
                strength. It's separate from room booking and specialist browsing so patients can
                understand hospital services clearly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              className="surface-card p-5 sm:rounded-[32px] sm:p-6"
            >
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-primary-500">Service Snapshot</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {serviceHighlights.map(({ icon: Icon, title, copy }) => (
                  <div key={title} className="rounded-[22px] border border-white bg-gradient-to-br from-white to-slate-50 px-4 py-4 shadow-[0_12px_26px_rgba(37,99,235,0.05)]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 shadow-sm">
                      <Icon size={18} />
                    </div>
                    <h3 className="mt-4 font-heading text-[16px] font-bold text-gray-900">{title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-gray-500">{copy}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: EASE }}
            className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-4"
          >
            {[
              ["8", "Flagship departments"],
              ["24/7", "Emergency support"],
              ["150+", "Specialist consultants"],
              [String(services.length), "Core featured services"],
            ].map(([value, label]) => (
              <div key={label} className="surface-card p-5">
                <p className="stat-value">{value}</p>
                <p className="mt-2 text-[13px] font-medium text-gray-500">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <ServicesSection />
    </div>
  );
}

