"use client";

import { useState } from "react";

export function ContactForm() {
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [success, setSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState(() => crypto.randomUUID());
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true); setFeedback("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const params = new URLSearchParams(window.location.search);
    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"), phone: data.get("phone"), message: data.get("message"),
          website: data.get("website"), submission_id: submissionId,
          utm_source: params.get("utm_source"), utm_medium: params.get("utm_medium"),
          utm_campaign: params.get("utm_campaign"),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Falha no envio.");
      setSuccess(true); setFeedback("Recebemos seu contato! Em breve retornaremos pelo WhatsApp.");
      form.reset(); setSubmissionId(crypto.randomUUID());
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Não foi possível enviar.");
    } finally { setBusy(false); }
  }
  return <form onSubmit={submit} className="contact-lead-form">
    <label>Seu nome<input name="name" required minLength={2} maxLength={255} autoComplete="name" placeholder="Nome completo" /></label>
    <label>WhatsApp<input name="phone" type="tel" required maxLength={30} autoComplete="tel" placeholder="(11) 99999-9999" /></label>
    <label>Como podemos ajudar?<textarea name="message" rows={4} maxLength={3000} placeholder="Descreva o problema do equipamento" /></label>
    <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <button className="button" type="submit" disabled={busy}>{busy ? "Enviando..." : "Solicitar contato"}</button>
    {feedback && <p role="status" aria-live="polite" className={success ? "contact-feedback-success" : "contact-feedback"}>{feedback}</p>}
  </form>;
}
