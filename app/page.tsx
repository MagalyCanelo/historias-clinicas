import Comentario from "./Components/Comentario";
import Header from "./Components/Header";
import HeroBanner from "./Components/HeroBanner";
import Servicios from "./Components/Servicios";

export default function Home() {
  return (
    <>
      <Header />
      <HeroBanner />
      <Servicios />
      <Comentario />
    </>
  );
}
