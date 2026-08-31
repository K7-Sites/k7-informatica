import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Manutenção de Notebooks e Computadores na Zona Norte de SP | K7 Informática",
  description: "Assistência técnica de notebooks e computadores no Tucuruvi e Zona Norte de São Paulo. Troca de SSD, memória, tela, formatação, limpeza, upgrades e suporte técnico.",
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Assistência técnica de informática",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { type: "website", locale: "pt_BR", url: "/", siteName: site.name, title: "Assistência técnica no Tucuruvi e Zona Norte | K7 Informática", description: "Manutenção, upgrades e suporte para notebooks e computadores na Zona Norte de São Paulo.", images: [{ url: "/images/hero-hardware.png", width: 1536, height: 1024, alt: "Notebook aberto e componentes de hardware em bancada técnica" }] },
  twitter: { card: "summary_large_image", title: "K7 Informática | Assistência técnica na Zona Norte", description: "Manutenção de notebooks e computadores, upgrades e suporte técnico.", images: ["/images/hero-hardware.png"] },
  icons: { icon: "/icon.svg", apple: "/images/logo-k7-informatica.png" },
};

export const viewport: Viewport = { themeColor: "#050814", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}
    <Script src="https://www.googletagmanager.com/gtag/js?id=G-GNM3F7BZ9L" strategy="afterInteractive" />
    <Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','G-GNM3F7BZ9L');`}</Script>
  </body></html>;
}
