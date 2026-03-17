import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, BookOpenText, Clock3 } from "lucide-react";
import { blogs } from "../data/blogs";

const EASE = [0.22, 1, 0.36, 1];

function BlogCard({ blog, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-48px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-[28px] border border-white/70 bg-gradient-to-br from-white via-white to-slate-50 shadow-[0_16px_44px_rgba(37,99,235,0.08)] transition-[box-shadow,border-color,transform] duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-[0_26px_62px_rgba(37,99,235,0.14)]"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/45 via-transparent to-transparent" />
        <div className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold ${blog.categoryColor}`}>
          {blog.category}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 text-[12px] font-medium text-gray-400">
          <span>{blog.date}</span>
          <span className="h-1 w-1 rounded-full bg-gray-300" />
          <span className="flex items-center gap-1">
            <Clock3 size={12} />
            {blog.readTime}
          </span>
        </div>

        <h3 className="mt-4 font-heading text-[20px] font-bold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-primary-600">
          {blog.title}
        </h3>
        <p className="mt-3 text-[14px] leading-relaxed text-gray-500">{blog.excerpt}</p>

        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <p className="text-[13px] font-bold text-gray-900">{blog.author}</p>
            <p className="text-[12px] text-gray-400">{blog.authorRole}</p>
          </div>

          <div className="flex items-center gap-1 text-[13px] font-bold text-primary-600 transition-transform duration-200 group-hover:translate-x-1">
            Read Article
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function BlogSection() {
  const headRef = useRef(null);
  const headIn = useInView(headRef, { once: true, margin: "-48px" });

  return (
    <section className="bg-white px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div ref={headRef} className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-badge mb-4 inline-flex"
          >
            <BookOpenText size={12} />
            Health Insights
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="font-heading text-[36px] font-extrabold leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-[44px]"
          >
            Preventive Care and Timely Advice
            <span className="bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
              {" "}for Pune Families
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.18, ease: EASE }}
            className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-gray-400"
          >
            Featured educational articles from PuneCare specialists covering public health,
            prevention, and seasonal disease awareness.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
