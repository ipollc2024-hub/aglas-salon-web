"use client";

import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";

export default function Contacto() {
  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#C9A96E] text-sm tracking-[0.2em] font-medium uppercase">
            Contact
          </span>
          <h2 className="font-playfair text-4xl lg:text-5xl text-[#1A1A1A] font-bold mt-4 mb-4">
            Let&apos;s create together.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left: Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="text-[#C9A96E] mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-[#1A1A1A] mb-1">Location</h4>
                <p className="text-gray-500 text-sm">
                  Calle Vicente Muñoz Barrios (#17)<br />
                  Cidra, PR 00739
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-[#C9A96E] mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-[#1A1A1A] mb-1">Phone</h4>
                <a href="tel:17879078229" className="text-gray-500 text-sm hover:text-[#C9A96E] transition-colors">
                  (787) 907-8229
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="text-[#C9A96E] mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-[#1A1A1A] mb-1">Hours</h4>
                <div className="text-gray-500 text-sm space-y-1">
                  <p>Monday · 9:00 AM – 6:00 PM</p>
                  <p>Tuesday · 9:00 AM – 6:00 PM</p>
                  <p>Thursday · 9:00 AM – 6:00 PM</p>
                  <p>Friday · 9:00 AM – 6:00 PM</p>
                  <p>Saturday · 9:00 AM – 6:00 PM</p>
                  <p className="text-gray-300">Wednesday · Closed</p>
                  <p className="text-gray-300">Sunday · Closed</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <ExternalLink className="text-[#C9A96E] mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-[#1A1A1A] mb-1">Follow Us</h4>
                <a
                  href="https://instagram.com/aglas.salon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 text-sm hover:text-[#C9A96E] transition-colors"
                >
                  @aglas.salon
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] outline-none transition-all text-sm"
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] outline-none transition-all text-sm"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] outline-none transition-all text-sm"
            />
            <textarea
              placeholder="Tell us what you're looking for..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E] outline-none transition-all text-sm resize-none"
            />
            <button
              type="submit"
              className="w-full bg-[#C9A96E] hover:bg-[#B8955A] text-white py-3 rounded-xl text-sm font-semibold transition-all"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
