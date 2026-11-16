import Image from "next/image";
import Link from "next/link";
import { ContactActions } from "@/components/ContactActions";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { site, whatsappUrl } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Link className="brand brand-logo footer-logo" href="/" aria-label="K7 Informática, início">
            <Image src="/images/logo-k7-informatica.svg" alt="Logo K7 Informática" width={471} height={267} sizes="190px" />
          </Link>
          <p>Tucuruvi — São Paulo — SP<br />Zona Norte</p>
        </div>
        <div>
          <h2>Contato</h2>
          <a href={`tel:+${site.phoneRaw}`}>{site.phone}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram" aria-hidden="true" /> Instagram</a>
        </div>
        <div>
          <h2>Navegação</h2>
          <Link href="/#servicos">Serviços</Link>
          <Link href="/#como-funciona">Como funciona</Link>
          <Link href="/#dicas">Dicas</Link>
          <Link href="/#regioes">Regiões atendidas</Link>
          <Link href="/#sobre">Sobre</Link>
          <Link href="/#duvidas">FAQ</Link>
        </div>
        <div>
          <h2>Precisa de assistência?</h2>
          <p>Explique o problema e solicite uma avaliação.</p>
          <ContactActions><WhatsAppLink className="button" href={whatsappUrl()} location="footer">Falar no WhatsApp</WhatsAppLink></ContactActions>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} K7 Informática</span>
        <span>Desenvolvido por <a className="k7-sites-link" href="https://k7sites.com.br/" target="_blank" rel="noopener noreferrer">K7 Sites</a></span>
      </div>
    </footer>
  );
}
