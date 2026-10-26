import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
export default function sitemap():MetadataRoute.Sitemap {return [{url:`${site.url}/`,lastModified:new Date(),changeFrequency:"monthly",priority:1},...services.map(({slug})=>({url:`${site.url}/servicos/${slug}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:0.8}))];}
