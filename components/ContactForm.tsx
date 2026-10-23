"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const pendingId = useRef<string | null>(null);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true); setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const id = pendingId.current || crypto.randomUUID();
    pendingId.current = id;
    const params = new URLSearchParams(window.location.search);
    try {
      const response = await fetch("/api/contato", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"), phone: data.get("phone"), service: data.get("service"),
          website: data.get("website"), submission_id: id,
          utm_source: params.get("utm_source"), utm_medium: params.get("utm_medium"),
          utm_campaign: params.get("utm_campaign"),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Falha no envio.");
      pendingId.current = null;
      onSuccess?.();
      router.push("/mensagem-enviada-com-sucesso");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível enviar.");
    } finally { setBusy(false); }
  }
  return <form onSubmit={submit} className="contact-lead-form">
    <h3>Preencha o formulário</h3>
    <label>Nome<input name="name" required minLength={2} maxLength={255} autoComplete="name" placeholder="Seu nome" /></label>
    <label>Telefone / WhatsApp<input name="phone" type="tel" required maxLength={30} autoComplete="tel" placeholder="(11) 99999-9999" /></label>
    <label>Serviço<select name="service" required defaultValue=""><option value="" disabled>Selecione o serviço</option><option value="Notebook">Notebook</option><option value="Computador">Computador</option><option value="Outro">Outro</option></select></label>
    <div className="contact-honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <button className="button" type="submit" disabled={busy}>{busy ? "Enviando..." : "Enviar"}</button>
    {error && <p role="alert" className="contact-feedback">{error}</p>}
  </form>;
}
