import { Heart, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { HOSPITAL, NAV_LINKS } from "../../utils/constants";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gray-950 px-4 pb-8 pt-16 text-white sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.22),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(20,184,166,0.16),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-[0_8px_24px_rgba(37,99,235,0.35)]">
                <Heart size={18} className="text-white" fill="white" />
              </div>
              <div>
                <p className="font-heading text-[18px] font-bold">PuneCare</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
                  Multi-Speciality Hospital
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-[14px] leading-relaxed text-white/65">
              Premium multi-speciality care, structured room booking, and patient-first hospital
              experiences for Pune families and surrounding communities.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["NABH Accredited", "24/7 Emergency", "Cashless Insurance"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] font-semibold text-white/75"
                >
                  <ShieldCheck size={12} className="text-teal-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-[15px] font-bold text-white">Navigation</h3>
            <div className="mt-5 grid gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-[14px] text-white/65 transition-all duration-200 hover:translate-x-1 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-[15px] font-bold text-white">Hospital Info</h3>
            <div className="mt-5 grid gap-3 text-[14px] text-white/65">
              <p>Room Booking</p>
              <p>Doctor Discovery</p>
              <p>Emergency Admissions</p>
              <p>Insurance Support</p>
              <p>Diagnostics & Preventive Care</p>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-[15px] font-bold text-white">Contact</h3>
            <div className="mt-5 grid gap-4">
              <a href={`tel:${HOSPITAL.reception}`} className="flex items-start gap-3 text-[14px] text-white/70">
                <Phone size={16} className="mt-0.5 text-primary-300" />
                <span>{HOSPITAL.reception}</span>
              </a>
              <a href={`mailto:${HOSPITAL.email}`} className="flex items-start gap-3 text-[14px] text-white/70">
                <Mail size={16} className="mt-0.5 text-primary-300" />
                <span>{HOSPITAL.email}</span>
              </a>
              <div className="flex items-start gap-3 text-[14px] text-white/70">
                <MapPin size={16} className="mt-0.5 text-primary-300" />
                <span>{HOSPITAL.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-[13px] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© 2026 PuneCare Multi-Speciality Hospital. All rights reserved.</p>
          <p>Designed for a structured, professional hospital booking experience.</p>
        </div>
      </div>
    </footer>
  );
}

