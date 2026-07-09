"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2 as Github, Briefcase as Linkedin, Mail, Heart } from 'lucide-react';
import { navLinks, brandName, brandTagline, brandEmail, brandLinkedIn } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  const currentYear = 2025;

  return (
    <footer className="relative bg-[#0f0f0f] border-t border-white/5 overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#7b2fff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#7b2fff] flex items-center justify-center text-white font-bold text-sm">
                AA
              </div>
              <span className="font-semibold text-white">{brandName}</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              {t("footer.bio")}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={brandLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#00d4ff] hover:border-[#00d4ff]/30 hover:bg-[#00d4ff]/5 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`mailto:${brandEmail}`}
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#00d4ff] hover:border-[#00d4ff]/30 hover:bg-[#00d4ff]/5 transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
              <a
                href="https://github.com/ajwa-asif"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#00d4ff] hover:border-[#00d4ff]/30 hover:bg-[#00d4ff]/5 transition-all duration-200"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
            </div>
          </motion.div>

          {/* Nav Links */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase">
              {t("footer.navigation")}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-white/50 hover:text-[#00d4ff] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase">
              {t("footer.getInTouch")}
            </h3>
            <div className="space-y-3">
              <a
                href={`mailto:${brandEmail}`}
                className="flex items-center gap-2 text-white/50 hover:text-[#00d4ff] text-sm transition-colors duration-200 group"
              >
                <Mail size={14} className="text-[#00d4ff]/60 group-hover:text-[#00d4ff] transition-colors" />
                {brandEmail}
              </a>
            </div>
            <Link
              href="#contact"
              onClick={(e) => handleAnchorClick(e, "#contact")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#00d4ff]/10 to-[#7b2fff]/10 border border-[#00d4ff]/20 text-[#00d4ff] text-sm font-medium hover:from-[#00d4ff]/20 hover:to-[#7b2fff]/20 transition-all duration-200"
            >
              {t("footer.contactMe")}
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-white/30 text-sm">
            © {currentYear} {brandName}. {t("footer.rights")}
          </p>
          <p className="text-white/30 text-sm flex items-center gap-1">
            {t("footer.builtWith")}{" "}
            <Heart size={12} className="text-[#7b2fff] fill-[#7b2fff]" />{" "}
            {t("footer.builtWithSuffix")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
