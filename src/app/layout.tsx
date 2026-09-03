import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aglassalonpr.com"),
  title: "AGLA'S Salón & Beauty Spa en Cidra, Puerto Rico",
  description:
    "Salón de belleza y spa en Cidra, Puerto Rico. Cabello, color, uñas, faciales, masajes, depilación y más. Reserve su cita en AGLA'S.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PR",
    url: "/",
    siteName: "AGLA'S Salón & Beauty Spa Clinic",
    title: "AGLA'S Salón & Beauty Spa en Cidra, Puerto Rico",
    description:
      "Cabello, color, uñas, faciales, masajes y depilación en Cidra, Puerto Rico. Reserve su cita.",
    images: [
      {
        url: "/galeria/cabello-01.jpg",
        alt: "Servicio de belleza en AGLA'S Salón & Beauty Spa Clinic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AGLA'S Salón & Beauty Spa en Cidra, Puerto Rico",
    description:
      "Cabello, uñas, faciales, masajes y más. Reserve su cita en AGLA'S.",
    images: ["/galeria/cabello-01.jpg"],
  },
  robots: { index: true, follow: true },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["BeautySalon", "DaySpa"],
  "@id": "https://www.aglassalonpr.com/#business",
  name: "AGLA'S Salón & Beauty Spa Clinic",
  url: "https://www.aglassalonpr.com/",
  telephone: "+1-787-907-8229",
  image: "https://www.aglassalonpr.com/galeria/cabello-01.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Vicente Muñoz Barrios #40, altos",
    addressLocality: "Cidra",
    addressRegion: "PR",
    postalCode: "00739",
    addressCountry: "US",
  },
  areaServed: { "@type": "AdministrativeArea", name: "Puerto Rico" },
  sameAs: ["https://instagram.com/aglas.salon"],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Thursday"], opens: "10:30", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "10:30", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "19:00" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
