"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Galería", href: "/#galeria" },
  { label: "Equipo", href: "/#equipo" },
  { label: "Membresías", href: "/#membresias" },
  { label: "Contacto", href: "/#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      e.preventDefault();
      const id = href.substring(2);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // If not on home page, go home with hash
        window.location.href = href;
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span
              className={`font-playfair text-xl lg:text-2xl font-bold tracking-wider ${
                scrolled ? "text-[#1A1A1A]" : "text-white"
              }`}
            >
              AGLA&apos;S
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-[#C9A96E] ${
                  scrolled ? "text-[#1A1A1A]" : "text-white/90"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/reservar"
              className="bg-[#C9A96E] hover:bg-[#B8955A] text-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all hover:shadow-lg"
            >
              RESERVAR
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 ${scrolled ? "text-[#1A1A1A]" : "text-white"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t">
          <div className="px-4 py-4 space-y-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block text-sm font-medium text-[#1A1A1A] hover:text-[#C9A96E] py-2 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/reservar"
              className="block text-center bg-[#C9A96E] hover:bg-[#B8955A] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all"
            >
              RESERVAR
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
