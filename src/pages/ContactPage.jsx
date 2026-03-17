import { motion } from "framer-motion";
import { Clock3, Mail, MapPin, MessageCircle, Phone, ShieldAlert, WalletCards } from "lucide-react";
import { HOSPITAL } from "../utils/constants";

const EASE = [0.22, 1, 0.36, 1];

export default function ContactPage() {
  const contactCards = [
    { icon: Phone, title: "Reception", value: HOSPITAL.reception, href: `tel:${HOSPITAL.reception}`, valueClassName: "tracking-[-0.02em]" },
    { icon: Phone, title: "Emergency", value: HOSPITAL.emergency, href: `tel:${HOSPITAL.emergency}`, valueClassName: "tracking-[-0.02em]" },
    { icon: MessageCircle, title: "WhatsApp", value: HOSPITAL.whatsapp, href: "https://wa.me/919876543210", valueClassName: "tracking-[-0.02em]" },
    { icon: Mail, title: "Email", value: HOSPITAL.email, href: `mailto:${HOSPITAL.email}`, valueClassName: "break-all text-[16px] leading-snug sm:text-[18px]" },
  ];

  const supportBlocks = [
    {
      icon: Clock3,
      title: "OPD Timing",
      copy: "Monday to Saturday, 9:00 AM to 8:00 PM with helpdesk routing for specialists.",
    },
    {
      icon: ShieldAlert,
      title: "Emergency Access",
      copy: "Priority response for trauma, ICU, and urgent admission coordination.",
    },
    {
      icon: WalletCards,
      title: "Insurance Desk",
      copy: "Cashless support and admission coordination for major partner insurers.",
    },
  ];

  return (
    <div className="bg-surface page-shell pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pt-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="max-w-3xl"
        >
          <span className="section-badge inline-flex">
            <Phone size={13} />
            Contact PuneCare
          </span>
          <h1 className="mt-4 font-heading text-[36px] font-extrabold leading-[1.03] tracking-[-0.03em] text-gray-900 sm:mt-5 sm:text-[54px]">
            Reach the Hospital
            <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              {" "}Without Friction
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-gray-500 sm:mt-5 sm:text-[16.5px]">
            Contact information, emergency lines, and location details live here in one
            place so patients and families can get support fast.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
          className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-3"
        >
          {supportBlocks.map(({ icon: Icon, title, copy }) => (
            <div
              key={title}
              className="rounded-[28px] border border-gray-100 bg-white/95 p-5 shadow-[0_20px_50px_rgba(37,99,235,0.08)] backdrop-blur-sm sm:p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                <Icon size={20} />
              </div>
              <h2 className="mt-5 font-heading text-[18px] font-bold text-gray-900">{title}</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-gray-500">{copy}</p>
            </div>
          ))}
        </motion.div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-5 sm:grid-cols-2">
            {contactCards.map(({ icon: Icon, title, value, href, valueClassName = "" }) => (
              <a
                key={title}
                href={href}
                className="group flex min-h-[205px] flex-col rounded-[28px] border border-gray-100 bg-white/95 p-5 shadow-[0_20px_50px_rgba(37,99,235,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-primary-100 hover:shadow-[0_24px_60px_rgba(37,99,235,0.12)] sm:p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 transition-transform duration-300 group-hover:scale-105">
                  <Icon size={20} />
                </div>
                <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.18em] text-gray-400">{title}</p>
                <p className={`mt-3 font-heading text-[18px] font-bold leading-tight text-gray-900 sm:text-[20px] ${valueClassName}`}>
                  {value}
                </p>
                <span className="mt-auto pt-4 text-[12px] font-semibold text-primary-500">
                  Tap to connect
                </span>
              </a>
            ))}

            <div className="rounded-[28px] border border-gray-100 bg-white/95 p-5 shadow-[0_20px_50px_rgba(37,99,235,0.08)] backdrop-blur-sm sm:col-span-2 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-gray-400">Hospital Address</p>
                  <p className="mt-2 text-[18px] font-bold text-gray-900">{HOSPITAL.address}</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-gray-500">
                    Baner Road access, emergency entry, and specialist OPD connections are all
                    serviced from the main campus.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-[0_24px_60px_rgba(37,99,235,0.10)]">
            <iframe
              title="PuneCare Hospital Location"
              src={HOSPITAL.mapEmbed}
              className="h-[420px] w-full border-0 sm:h-[560px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
