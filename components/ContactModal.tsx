"use client";
import { useEffect, useRef, useState } from "react";
import { ContactForm } from "@/components/ContactForm";
export function ContactModal() {
  const [open, setOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const openModal = () => setOpen(true);
    window.addEventListener("k7:open-contact", openModal);
    return () => window.removeEventListener("k7:open-contact", openModal);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") {
        const panel = document.querySelector<HTMLElement>(".contact-modal-panel");
        const items = panel?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled])');
        if (!items?.length) return;
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", escape);
    return () => { document.body.style.overflow = overflow; document.removeEventListener("keydown", escape); previous?.focus(); };
  }, [open]);
  if (!open) return null;
  return <div className="contact-modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setOpen(false); }}>
    <div className="contact-modal-panel" role="dialog" aria-modal="true" aria-label="Solicitar contato">
      <button ref={closeButton} className="contact-modal-close" type="button" aria-label="Fechar formulário" onClick={() => setOpen(false)}>×</button>
      <ContactForm onSuccess={() => setOpen(false)} />
    </div>
  </div>;
}
