"use client";

import type { ReactNode } from "react";

type Props = {
  region: string;
  className: string;
  children: ReactNode;
};

export function RegionContactButton({ region, className, children }: Props) {
  function openContact() {
    window.dispatchEvent(new CustomEvent("k7:open-contact", { detail: { region } }));
  }

  return <button type="button" className={className} onClick={openContact}>{children}</button>;
}
