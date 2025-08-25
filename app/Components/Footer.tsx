import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";

interface SocialLinkProps {
  href: string;
  icon: ReactElement;
  label: string;
}

export function SocialLink({
  href,
  icon,
  label,
}: SocialLinkProps): ReactElement {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="hover:text-gray-300 transition-colors duration-200"
    >
      {icon}
    </a>
  );
}

const Footer = () => {
  return (
    <>
      <footer className="bg-stone-50 border-t-8 border-[#5ac6d2] text-gray-800 py-8 px-5 md:px-15">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:gap-20 gap-8">
          {/* Logo y redes */}
          <div className="flex flex-col justify-center h-full max-md:border-b-2 max-md:pb-8 max-md:border-[#5ac6d2] md:border-0 md:pb-0">
            <div className="flex items-center mb-4 justify-center">
              <div className="flex flex-col items-center">
                <Image
                  src="/logo.jpg"
                  alt="Veterinaria Logo"
                  className="h-24 w-auto object-cover mb-2"
                  height={1080}
                  width={1080}
                />
                <p className="text-gray-600 text-center mt-2 text-sm">
                  <strong>RUC:</strong> 10xxxxxxx
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-3 text-white text-lg">
              <div className="bg-[#5ac6d2] hover:bg-[#4bb5c1] rounded-full p-3">
                <SocialLink
                  href="https://www.facebook.com/profile.php?id=61576859812087"
                  icon={<FaFacebookF size={18} />}
                  label="Facebook"
                />
              </div>
              <div className="bg-[#5ac6d2] hover:bg-[#4bb5c1] rounded-full p-3">
                <SocialLink
                  href="https://www.instagram.com/jahlextravelperu?igsh=c2oydXd2aThmZzNr"
                  icon={<FaInstagram size={19} />}
                  label="Instagram"
                />
              </div>
              <div className="bg-[#5ac6d2] hover:bg-[#4bb5c1] rounded-full p-3">
                <SocialLink
                  href="https://www.tiktok.com/@jahlextraveladventure"
                  icon={<FaTiktok size={18} />}
                  label="TikTok"
                />
              </div>
              <div className="bg-[#5ac6d2] hover:bg-[#4bb5c1] rounded-full p-3">
                <SocialLink
                  href="https://wa.me/51947435368"
                  icon={<FaWhatsapp size={19} />}
                  label="WhatsApp"
                />
              </div>
            </div>
          </div>

          {/* Enlaces */}
          <div className="lg:pl-5 pl-2 flex flex-col justify-center h-full max-md:border-b-2 max-md:pb-8 max-md:border--[#5ac6d2] md:border-0 md:pb-0">
            <h3 className="font-semibold text-gray-800 mb-2">Enlaces</h3>
            <ul className="space-y-1 text-gray-600">
              <li>
                <Link href="/" className="text-celeste-hover font-medium">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/aboutus"
                  className="text-celeste-hover font-medium"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-celeste-hover font-medium">
                  Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-celeste-hover font-medium"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinos */}
          <div className="lg:pl-5 pl-2 flex flex-col justify-center h-full max-md:border-b-2 max-md:pb-8 max-md:border-[#65830B] md:border-0 md:pb-0">
            <h3 className="font-semibold oliva mb-2">Servicios</h3>
            <ul className="space-y-1 text-gray-600">
              <li>
                <Link href="/" className="text-celeste-hover font-medium">
                  Vacunas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="pl-2 flex flex-col justify-center h-full lg:pb-2">
            <h3 className="font-semibold mb-2">Contacto</h3>
            <div className="text-gray-600 space-y-2">
              <a
                href="https://maps.app.goo.gl/2JLeS4fC7jA5urn96"
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-1.5"
              >
                <p>
                  <span className="font-medium">Dirección:</span> Pisco
                </p>
              </a>
              <a href="mailto:a@gmail.com" className="block mb-1.5">
                <p>
                  <span className="font-medium">Correo:</span> a@gmail.com
                </p>
              </a>
              <a href="tel:+51975341049" className="block">
                <p>
                  <span className="font-medium">Celular:</span> (+51) 999 999
                  999
                </p>
              </a>
            </div>
          </div>
        </div>
      </footer>
      <section className="bg-[#5ac6d2] py-1.5 text-sm text-center xl:sm xl:py-2 text-white xl:text-sm">
        <p>
          © 2025 Veterinaria Dogtora Araceli.{" "}
          <span className="block sm:inline mt-1 sm:mt-0">
            Diseñado por Magaly Canelo
          </span>
        </p>
      </section>
    </>
  );
};

export default Footer;
