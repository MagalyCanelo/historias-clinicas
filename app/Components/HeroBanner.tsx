import ActionButton from "./ActionButton";
import ImageSlider from "./ImageSlider";

function HeroBanner() {
  return (
    <section className="hero flex items-center justify-center bg-stone-50 pt-2">
      <div className="relative w-[95%] max-w-7xl h-[65vh] mt-0 rounded-xl overflow-hidden shadow-lg">
        <ImageSlider />
        <div className="absolute inset-0 flex flex-col items-center justify-end bottom-8 text-center">
          <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-white drop-shadow-md mb-3 leading-snug">
            Cuidamos la salud de <br />
            tu mejor amigo
          </p>
          <ActionButton title="Ver servicios" tipo="primary" />
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
