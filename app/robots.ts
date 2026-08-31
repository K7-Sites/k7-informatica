import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://k7informatica.com/sitemap.xml", host: "https://k7informatica.com" }; }
