import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import s from "./thanks.module.css";

export const metadata: Metadata = {
  title: "Obrigado pelo contato | K7 Informática Gamer",
  description: "Sua solicitação foi enviada à equipe K7 Informática. Aguarde nosso contato pelo WhatsApp informado.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/gamer/obrigado" },
  openGraph: { title: "Obrigado pelo contato | K7 Informática Gamer", url: "/gamer/obrigado" },
};

export default function GamerThankYouPage() {
  return <main className={s.page}>
    <Link href="/gamer/pc-gamer" className={s.logo} aria-label="Voltar ao catálogo K7 Informática"><Image src="/images/logo-k7-informatica.png" alt="K7 Informática" width={200} height={105} priority /></Link>
    <section className={s.card} aria-labelledby="thanks-title">
      <div className={s.check} aria-hidden="true"><i className="fa-solid fa-check" /></div>
      <p className={s.eyebrow}>K7 INFORMÁTICA / GAMER</p>
      <h1 id="thanks-title">Obrigado pelo contato!</h1>
      <p className={s.lead}>Sua solicitação foi enviada com sucesso.</p>
      <p className={s.description}>Nossa equipe vai analisar sua mensagem e entrar em contato pelo WhatsApp que você informou no formulário.</p>
      <div className={s.next}><i className="fa-brands fa-whatsapp" aria-hidden="true" /><div><strong>Fique de olho no seu WhatsApp</strong><span>Vamos ajudar você a encontrar a configuração ou o atendimento ideal.</span></div></div>
      <Link href="/gamer/pc-gamer" className={s.button}>Voltar ao catálogo <i className="fa-solid fa-arrow-right" aria-hidden="true" /></Link>
      <Link href="/" className={s.secondary} target="_blank" rel="noopener noreferrer">Conhecer a assistência técnica <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" /></Link>
    </section>
    <p className={s.footer}>K7 Informática · Seu próximo setup começa aqui.</p>
  </main>;
}
