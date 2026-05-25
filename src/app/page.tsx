import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import Galeria from "@/components/Galeria";
import Equipo from "@/components/Equipo";
import Membresias from "@/components/Membresias";
import Testimonios from "@/components/Testimonios";
import Contacto from "@/components/Contacto";

export default function Home() {
  return (
    <>
      <Hero />
      <Servicios />
      <Galeria />
      <Equipo />
      <Membresias />
      <Testimonios />
      <Contacto />
    </>
  );
}
