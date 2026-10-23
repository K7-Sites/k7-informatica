import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Mensagem enviada com sucesso | K7 Informática", robots: { index: false, follow: false } };
export default function ThankYouPage() {
  return <main className="thanks-page"><div className="thanks-content">
    <Image src="/images/logo-k7-informatica.svg" alt="K7 Informática" width={240} height={136} priority />
    <div className="thanks-check" aria-hidden="true">✓</div>
    <h1>Obrigado!</h1>
    <p>Recebemos sua mensagem. Em minutos iremos entrar em contato pelo WhatsApp.</p>
    <Link href="/" className="button">Voltar ao site</Link>
  </div></main>;
}
