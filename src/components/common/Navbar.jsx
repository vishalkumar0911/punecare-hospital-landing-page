import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import {
  Phone,
  Menu,
  X,
  Calendar,
  Heart,
  MapPin,
  Clock,
  Mail,
  ChevronRight,
} from "lucide-react";

import { NAV_LINKS, HOSPITAL } from "../../utils/constants";
import { cn } from "../../utils/cn";

/* Animation easing */
const EASE = [0.22, 1, 0.36, 1];

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/* Top Bar */
/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

function TopBar() {
  return (
    <motion.div
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="hidden lg:block bg-gradient-to-r from-primary-800 via-primary-700 to-accent-700 text-white"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
        <div className="flex items-center gap-6 text-[12px] font-medium tracking-wide">
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(
              HOSPITAL.address
            )}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition"
          >
            <MapPin size={11} />
            {HOSPITAL.address}
          </a>

          <span className="flex items-center gap-1.5 opacity-80">
            <Clock size={11} />
                        OPD: Mon-Sat - 9:00 AM - 8:00 PM
          </span>
        </div>

        <div className="flex items-center gap-5 text-[12px] font-medium">
          <a
            href={`mailto:${HOSPITAL.email}`}
            className="flex items-center gap-1.5 opacity-80 hover:opacity-100"
          >
            <Mail size={11} /> {HOSPITAL.email}
          </a>

          <span className="h-3 w-px bg-white/20" />

          <a
            href={`tel:${HOSPITAL.reception}`}
            className="flex items-center gap-1.5 opacity-80 hover:opacity-100"
          >
            <Phone size={11} /> {HOSPITAL.reception}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/* Logo */
/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3 group shrink-0">
      <motion.div whileHover={{ y: -2 }} className="relative">
        <motion.div
          className="absolute inset-0 rounded-xl bg-primary-400/40 blur-lg"
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.65, 0.3] }}
          transition={{ duration: 2.6, repeat: Infinity }}
        />

        <motion.div
          className="relative w-10 h-10 rounded-xl bg-gradient-to-br
                     from-primary-500 via-primary-600 to-accent-600
                     flex items-center justify-center
                     shadow-[0_6px_24px_rgba(37,99,235,0.45)]"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.6, repeat: Infinity }}
        >
          <Heart size={18} fill="white" className="text-white" />
        </motion.div>

        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400/70" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-teal-500 border-2 border-white" />
        </span>
      </motion.div>

      <div>
        <p className="font-heading font-bold text-[16.5px] text-gray-900 group-hover:text-primary-600 transition">
          PuneCare
        </p>

        <p className="text-[9.5px] tracking-[0.18em] text-gray-400 font-semibold uppercase">
          Multi-Speciality Hospital
        </p>
      </div>
    </Link>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/* Desktop Nav Link */
/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

function DesktopLink({ href, label }) {
  return (
    <NavLink
      to={href}
      end={href === "/"}
      className={({ isActive }) =>
        cn(
          "relative rounded-full px-1.5 py-1 text-[13.5px] font-semibold transition-colors duration-200 group",
          isActive ? "text-primary-600" : "text-gray-500 hover:text-gray-900"
        )
      }
    >
      {({ isActive }) => (
        <>
          {label}

          <motion.span
            className="absolute -bottom-0.5 left-0 h-[2px] rounded-full
                       bg-gradient-to-r from-primary-600 to-accent-500"
            initial={false}
            animate={{ width: isActive ? "100%" : "0%" }}
            transition={{ duration: 0.3, ease: EASE }}
          />

          {!isActive && (
            <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-gray-300
                             group-hover:w-full transition-all duration-300" />
          )}
        </>
      )}
    </NavLink>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/* Mobile Link */
/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

function MobileLink({ href, label, onClick }) {
  return (
    <NavLink
      to={href}
      end={href === "/"}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center justify-between px-4 py-3.5 rounded-xl text-[14px] font-semibold transition-all",
          isActive
            ? "bg-primary-50 text-primary-600 border border-primary-100"
            : "text-gray-600 hover:bg-gray-50 hover:text-primary-600"
        )
      }
    >
      {({ isActive }) => (
        <>
          {label}
          {isActive && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ChevronRight size={14} />
            </motion.div>
          )}
        </>
      )}
    </NavLink>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/* Emergency Button */
/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

function EmergencyBtn({ compact = false }) {
  return (
    <motion.a
      href={`tel:${HOSPITAL.emergency}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 font-bold rounded-xl",
        compact ? "text-[11.5px] px-3 py-[7px]" : "text-[13px] px-4 py-[10px]"
      )}
    >
      <span className="relative flex shrink-0 w-2.5 h-2.5">
        <motion.span
          className="absolute inline-flex h-full w-full rounded-full bg-red-400"
          animate={{ scale: [1, 2], opacity: [0.8, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <span className="relative inline-flex h-full w-full rounded-full bg-red-500" />
      </span>

      {compact ? "SOS" : "Emergency"}
    </motion.a>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/* Navbar */
/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 20));

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  return (
    <>
      <TopBar />

      {/* Scroll Progress */}

      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[3px] origin-left
        bg-gradient-to-r from-primary-500 to-accent-500 z-[60]"
      />

      <motion.header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/70 backdrop-blur-2xl border-b border-gray-200/50 shadow-[0_4px_40px_rgba(37,99,235,0.08)]"
            : "bg-white/95 border-b border-gray-100"
        )}
        animate={{ height: scrolled ? 64 : 70 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-full gap-6">
            <Logo />

            {/* Desktop Nav */}

            <nav className="hidden lg:flex items-center gap-6 rounded-full border border-white/70 bg-white/75 px-4 py-2 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur-sm">
              {NAV_LINKS.map((l) => (
                <DesktopLink key={l.href} {...l} />
              ))}
            </nav>

            {/* Desktop CTA */}

            <div className="hidden lg:flex items-center gap-2.5">
              <EmergencyBtn />

              <motion.button
                onClick={() => navigate("/rooms")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center gap-2 text-[13px] font-bold text-white
                bg-gradient-to-r from-primary-600 to-accent-500
                px-5 py-[10px] rounded-xl overflow-hidden
                shadow-[0_10px_28px_rgba(37,99,235,0.28)]"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-teal-400/30 blur-xl"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <Calendar size={14} className="relative z-10" />
                <span className="relative z-10">Book Room</span>
              </motion.button>
            </div>

            {/* Mobile */}

            <div className="flex lg:hidden items-center gap-2">
              <EmergencyBtn compact />

              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="p-2 rounded-xl text-gray-600 hover:bg-gray-100"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}

        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 top-[70px] bg-black/20 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                className="absolute top-full inset-x-0 border-t border-gray-100 bg-white/96 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:hidden"
              >
                <div className="p-4 space-y-2">
                  {NAV_LINKS.map((l, i) => (
                    <motion.div
                      key={l.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <MobileLink {...l} onClick={() => setMobileOpen(false)} />
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-gray-100 px-4 pb-4 pt-1">
                  <motion.button
                    onClick={() => {
                      setMobileOpen(false);
                      navigate("/rooms");
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary-600 to-accent-500 px-4 py-3.5 text-[13.5px] font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.24)]"
                  >
                    <Calendar size={15} />
                    Book Room
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

