import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquareQuote, Star } from "lucide-react";
import { testimonials } from "../data/testimonials";

const EASE = [0.22, 1, 0.36, 1];

function Rating({ value }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={13}
          className={index < value ? "text-amber-400" : "text-gray-200"}
          fill={index < value ? "#fbbf24" : "#e5e7eb"}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-48px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      whileHover={{ y: -6 }}
      className="group rounded-[28px] border border-white/70 bg-gradient-to-br from-white via-white to-slate-50 p-6 shadow-[0_16px_44px_rgba(37,99,235,0.08)] transition-[box-shadow,border-color,transform] duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-[0_26px_62px_rgba(37,99,235,0.14)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={item.avatar}
            alt={item.name}
            className="h-12 w-12 rounded-2xl object-cover ring-4 ring-primary-50"
          />
          <div>
            <h3 className="font-heading text-[16px] font-bold text-gray-900">{item.name}</h3>
            <p className="text-[12px] text-gray-400">{item.city}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-primary-50 p-3 text-primary-600 shadow-sm">
          <MessageSquareQuote size={18} />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Rating value={item.rating} />
        <span className="rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-[11px] font-semibold text-primary-700">
          {item.room}
        </span>
      </div>

      <p className="mt-4 text-[14px] leading-relaxed text-gray-500">{item.review}</p>

      <div className="mt-5 border-t border-gray-100 pt-4 text-[12px] font-medium text-gray-400">
        Shared in {item.date}
      </div>
    </motion.article>
  );
}

export default function TestimonialsSection() {
  const headRef = useRef(null);
  const headIn = useInView(headRef, { once: true, margin: "-48px" });

  return (
    <section className="relative overflow-hidden bg-surface px-4 py-28 sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[420px] w-[880px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(37,99,235,0.05),transparent_65%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div ref={headRef} className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-badge mb-4 inline-flex"
          >
            <MessageSquareQuote size={12} />
            Patient Testimonials
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="font-heading text-[36px] font-extrabold leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-[44px]"
          >
            Real Experiences from
            <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              {" "}Families We Care For
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.18, ease: EASE }}
            className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-gray-400"
          >
            Honest feedback from patients and families who used PuneCare rooms,
            emergency services, and specialist care.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item, index) => (
            <TestimonialCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
