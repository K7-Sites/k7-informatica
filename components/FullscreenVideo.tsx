"use client";

import type { SyntheticEvent } from "react";

type FullscreenVideoProps = {
  src: string;
  label: string;
};

export function FullscreenVideo({ src, label }: FullscreenVideoProps) {
  const openFullscreen = (event: SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    if (document.fullscreenElement) return;

    if (typeof video.requestFullscreen === "function") {
      void video.requestFullscreen().catch(() => {
        // Some browsers require a direct user gesture to enter fullscreen.
      });
      return;
    }

    const iosVideo = video as HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
    };
    iosVideo.webkitEnterFullscreen?.();
  };

  return (
    <video controls preload="metadata" playsInline aria-label={label} onPlay={openFullscreen}>
      <source src={src} type="video/mp4" />
      Seu navegador não suporta vídeo.
    </video>
  );
}
