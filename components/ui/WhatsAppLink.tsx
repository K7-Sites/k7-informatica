"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackWhatsApp, type AnalyticsLocation } from "@/lib/analytics";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  location: AnalyticsLocation;
  children: ReactNode;
};

export function WhatsAppLink({ href, location, children, onClick, ...props }: Props) {
  return <a href={href} target="_blank" rel="noopener noreferrer" onClick={(event) => { trackWhatsApp(location); onClick?.(event); }} {...props}>{children}</a>;
}
