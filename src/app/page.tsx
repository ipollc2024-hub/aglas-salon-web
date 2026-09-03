import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import Galeria from "@/components/Galeria";
import Equipo from "@/components/Equipo";
import Testimonios from "@/components/Testimonios";
import Contacto from "@/components/Contacto";
import Politicas from "@/components/Politicas";

export default function Home() {
  return (
    <>
      <Hero />
      <Servicios />
      <Galeria />
      <Equipo />
      <Testimonios />
      <Politicas />
      <Contacto />
    </>
  );
}
