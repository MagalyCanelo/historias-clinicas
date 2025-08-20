import Comentario from "./Components/Comentario";
import Contacto from "./Components/Contacto";
import Galeria from "./Components/Galeria";
import Header from "./Components/Header";
import HeroBanner from "./Components/HeroBanner";
import Servicios from "./Components/Servicios";
import WhyChoose from "./Components/WhyChoose";

export default function Home() {
  return (
    <>
      <Header />
      <HeroBanner />
      <Servicios />
      <WhyChoose />
      <Galeria />
      <Comentario />
      <Contacto />
      {/* <Footer /> */}
    </>
  );
}
