import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const token = process.env.K7_GESTAO_LEAD_TOKEN;
  const endpoint = process.env.K7_GESTAO_LEAD_URL || "https://gestao.k7sites.com.br/api/site/leads";
  if (!token) return NextResponse.json({ message: "Integração indisponível no momento." }, { status: 503 });

  let input: Record<string, unknown>;
  try { input = await request.json(); } catch { return NextResponse.json({ message: "Dados inválidos." }, { status: 400 }); }
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const phone = typeof input.phone === "string" ? input.phone.trim() : "";
  const service = typeof input.service === "string" ? input.service : "";
  const website = typeof input.website === "string" ? input.website.trim() : "";
  const submissionId = typeof input.submission_id === "string" ? input.submission_id : "";
  const landingPath = typeof input.landing_path === "string" ? input.landing_path.slice(0, 255) : "/";
  const servicePages: Record<string, string> = {
    "/servicos/manutencao-de-notebook": "Manutenção de notebook",
    "/servicos/manutencao-de-pc-gamer": "Manutenção de PC Gamer",
    "/servicos/suporte-remoto-para-computadores": "Suporte remoto",
    "/servicos/troca-de-pasta-termica-notebook-pc": "Troca de pasta térmica",
    "/servicos/troca-de-tela-de-notebook": "Troca de tela de notebook",
    "/servicos/instalacao-de-ssd-notebook-computador": "Instalação de SSD",
    "/servicos/upgrade-memoria-ram-notebook-pc": "Upgrade de memória RAM",
    "/servicos/formatacao-de-notebook-e-computador": "Formatação de notebook e computador",
    "/servicos/backup-de-arquivos-notebook-pc": "Backup de arquivos",
    "/servicos/limpeza-interna-notebook-pc-gamer": "Limpeza interna",
    "/servicos/remocao-de-virus-notebook-pc": "Remoção de vírus",
    "/servicos/troca-de-bateria-de-notebook": "Troca de bateria",
    "/servicos/reparo-de-dobradica-de-notebook": "Reparo de dobradiça",
    "/servicos/instalacao-windows-linux-notebook-pc": "Instalação de Windows ou Linux",
    "/servicos/upgrade-placa-de-video-pc-gamer": "Upgrade de placa de vídeo",
  };
  const pageName = landingPath === "/" ? "Página inicial" : servicePages[landingPath] || "Outra página";
  const pageUrl = `https://www.k7informatica.com${landingPath.startsWith("/") ? landingPath : "/"}`;
  if (name.length < 2 || name.length > 255 || !/^(?:55)?[1-9][0-9]{9,10}$/.test(phone.replace(/\D/g, "")) || !["Notebook", "Computador", "Outro"].includes(service) || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId)) {
    return NextResponse.json({ message: "Confira nome, WhatsApp e mensagem." }, { status: 422 });
  }
  if (website) return NextResponse.json({ message: "Contato recebido." });
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name, phone, service: "outros", submission_id: submissionId,
        origin: "k7-informatica", project_type: "Assistência técnica",
        project_message: `Serviço solicitado: ${service}\nPágina de origem: ${pageName}\nURL de origem: ${pageUrl}`,
        utm_source: typeof input.utm_source === "string" ? input.utm_source.slice(0, 255) : undefined,
        utm_medium: typeof input.utm_medium === "string" ? input.utm_medium.slice(0, 255) : undefined,
        utm_campaign: typeof input.utm_campaign === "string" ? input.utm_campaign.slice(0, 255) : undefined,
      }),
      signal: AbortSignal.timeout(12000),
      cache: "no-store",
    });
    if (!response.ok) return NextResponse.json({ message: "Não foi possível enviar. Tente novamente." }, { status: 502 });
    return NextResponse.json({ message: "Contato recebido com sucesso!" });
  } catch {
    return NextResponse.json({ message: "Não foi possível conectar ao atendimento. Tente novamente." }, { status: 502 });
  }
}
