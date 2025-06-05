import { FooterIconLink } from './FooterIconLink';
import { FooterSection } from './FooterSection';
import { FooterLinks } from './FooterLinks';
import { FaFacebookF, FaInstagram, FaTwitter, FaGlobe } from 'react-icons/fa';


export const Footer = () => {
    return (
      <footer className="bg-white text-gray-700 pt-12 pb-6 px-6" id="footer">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
          <FooterSection
            title="EasyPadel"
            content={
              <>
                <p className="text-sm">
                  Encuentra y reserva pistas de pádel al instante. La forma más fácil de jugar cuando y donde quieras.
                </p>
                <div className="flex gap-4 mt-6">
                  <FooterIconLink href="#" Icon={FaFacebookF} />
                  <FooterIconLink href="#" Icon={FaInstagram} />
                  <FooterIconLink href="#" Icon={FaTwitter} />
                </div>
              </>
            }
          />
          <FooterSection
            title="Explora"
            content={
              <FooterLinks
                links={[
                  { href: "#", label: "Inicio" },
                  { href: "#", label: "Reservas" },
                  { href: "#", label: "Clubes" },
                  { href: "#", label: "Contacto" },
                ]}
              />
            }
          />
          <FooterSection
            title="Recursos"
            content={
              <FooterLinks
                links={[
                  { href: "#footer", label: "Términos y condiciones" },
                  { href: "#footer", label: "Política de privacidad" },
                  { href: "#footer", label: "Ayuda" },
                ]}
              />
            }
          />
          <FooterSection
            title="Idioma"
            content={
              <div className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-900">
                <FaGlobe />
                <span>Español (ES)</span>
              </div>
            }
          />
        </div>
        <div className="mt-10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} EasyPadel. Todos los derechos reservados.
        </div>
      </footer>
    );
  }
  
