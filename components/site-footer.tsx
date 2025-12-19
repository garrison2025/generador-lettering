import Link from "next/link"
import { FooterLogo } from "@/components/footer-logo"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#4A4A4A] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <FooterLogo />
            <p className="text-white/70 mt-4">
              La herramienta perfecta para crear diseños tipográficos únicos, letras personalizadas y caligrafía
              digital.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/editor" className="text-white/70 hover:text-white transition-colors">
                  Editor de Lettering
                </Link>
              </li>
              <li>
                <Link href="/plantillas" className="text-white/70 hover:text-white transition-colors">
                  Plantillas de Lettering
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Enlaces Útiles</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contacto" className="text-white/70 hover:text-white transition-colors">
                  Contacta con nosotros
                </Link>
              </li>
              <li>
                <Link href="/acerca" className="text-white/70 hover:text-white transition-colors">
                  Acerca de nosotros
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-white/70 hover:text-white transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              {/* 新增的高权重 Dofollow 外链 */}
              <li>
                <a 
                  href="https://conversordeletrasbonitas.org/" 
                  target="_blank" 
                  rel="noopener" 
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Conversor de Letras Bonitas
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <p className="text-white/70 mb-4">
              ¿Tienes alguna pregunta o sugerencia sobre nuestro generador de lettering?
            </p>
            <p className="text-white/90">
              <a href="mailto:info@generadordelettering.org" className="hover:text-white transition-colors">
                info@generadordelettering.org
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/50 text-sm">
          <p>© {currentYear} Generador de Lettering. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
