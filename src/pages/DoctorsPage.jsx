import { motion } from "framer-motion";
import { Award, Globe2, Stethoscope, Users } from "lucide-react";
import DoctorsSection from "../sections/DoctorsSection";
import { doctors } from "../data/doctors";

const EASE = [0.22, 1, 0.36, 1];

export default function DoctorsPage() {
  const specialists = [...new Set(doctors.map((doctor) => doctor.specialization))];
  const availableToday = doctors.filter((doctor) => doctor.available).length;

  return (
    <div className="bg-surface">
      <section className="page-shell page-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(20,184,166,0.06),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE }}
              className="max-w-3xl"
            >
              <span className="section-badge inline-flex">
                <Stethoscope size={13} />
                PuneCare Specialists
              </span>
              <h1 className="fluid-title-lg mt-4 text-gray-900 sm:mt-5">
                Expert Doctors Across
                <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                  {" "}Every Major Discipline
                </span>
              </h1>
              <p className="balanced-copy mt-4 max-w-2xl sm:mt-5">
                Explore consultant backgrounds, years of experience, consultation fees, and
                availability. This route is designed as a dedicated specialist discovery page.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              className="overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-[0_20px_56px_rgba(37,99,235,0.08)] sm:rounded-[32px]"
            >
              <div className="grid gap-px bg-gray-100 sm:grid-cols-2">
                {[
                  { icon: Users, value: `${doctors.length}+`, label: "Featured consultants" },
                  { icon: Award, value: `${availableToday}`, label: "Currently available" },
                  { icon: Globe2, value: `${specialists.length}+`, label: "Specialities represented" },
                  { icon: Stethoscope, value: "AIIMS+", label: "Top medical backgrounds" },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="min-w-0 bg-gradient-to-br from-white to-slate-50 p-5 sm:p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 shadow-sm">
                      <Icon size={18} />
                    </div>
                    <p className="stat-value mt-5">{value}</p>
                    <p className="mt-2 text-[13px] font-medium text-gray-500">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <DoctorsSection />
    </div>
  );
}
