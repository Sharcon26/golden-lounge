"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { Mic } from "lucide-react";

const ReserveModal = dynamic(() => import("@/components/reserve-modal").then(mod => mod.ReserveModal), { ssr: false });
const PrivatePartyModal = dynamic(() => import("@/components/private-party-modal").then(mod => mod.PrivatePartyModal), { ssr: false });

export function HeroVideoSection() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [isPrivatePartyModalOpen, setIsPrivatePartyModalOpen] = useState(false);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg-VFSG5pOF.webp"
          alt="GD Lounge atmosphere"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* overlays - slightly darker to hide photo defects */}
        <div className="pointer-events-none absolute inset-0 bg-black/60" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/85" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-[72px] text-center">
        <div className="max-w-4xl space-y-10">
          {/* Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Location badge */}
            <a
              href="https://maps.app.goo.gl/odceBHiT9caqxArM7?g_st=ic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md hover:bg-white/20 transition-colors"
            >
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-white">
                Downtown Miami
              </span>
            </a>

            {/* Karaoke badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
              <Mic className="h-3 w-3 text-accent" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white">
                Premium Karaoke
              </span>
            </div>
          </div>

          {/* Secret Room Event CTA */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative inline-flex items-center gap-3 rounded-full border border-primary/60 bg-primary/10 px-6 py-2.5 backdrop-blur-md transition-all duration-300 hover:bg-primary/20 hover:border-primary hover:shadow-[0_0_32px_rgba(245,158,11,0.45)] hover:scale-105"
            >
              {/* pulsing dot */}
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary">
                Secret Room &nbsp;·&nbsp; March 13
              </span>
              {/* arrow */}
              <svg
                className="h-3.5 w-3.5 text-primary transition-transform duration-300 group-hover:translate-y-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </button>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight text-white drop-shadow-2xl">
              GD Lounge
            </h1>
            {/* Subheadline */}
            <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl font-medium text-white/90 drop-shadow-lg">
              Experience elevated nightlife in the heart of Downtown Miami
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto rounded-xl px-10 py-7 text-lg font-bold hover:scale-105 transition-all"
            >
              <a href="https://www.sevenrooms.com/reservations/gdlounge" target="_blank" rel="noopener noreferrer" id="reservation-button-hero">
                Reserve a Table
              </a>
            </Button>

            <Button
              onClick={() => setIsPrivatePartyModalOpen(true)}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-xl border-white/30 bg-transparent px-10 py-7 text-lg font-bold text-white backdrop-blur-md hover:bg-transparent hover:border-primary hover:text-primary hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:scale-105 transition-all"
            >
              Private Party
            </Button>
          </div>
        </div>
      </div>

      <ReserveModal
        isOpen={isReserveModalOpen}
        onOpenChange={setIsReserveModalOpen}
      />

      <PrivatePartyModal
        isOpen={isPrivatePartyModalOpen}
        onOpenChange={setIsPrivatePartyModalOpen}
      />
    </section>
  );
}
