import type { ReactNode } from "react";
import Link from "next/link";

export function ContactActions({ children }: { children: ReactNode }) {
  return <div className="contact-actions">{children}<Link className="button buy-gamer-button" href="/gamer/pc-gamer"><i className="fa-solid fa-desktop" aria-hidden="true" /> Comprar PC GAMER</Link></div>;
}
