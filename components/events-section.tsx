"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export function EventsSection() {
  return (
    <section id="events" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column: Text Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div>
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                Upcoming Event
              </span>
              <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-serif tracking-tight leading-tight">
                Secret Room <br />
                <span className="text-primary">Club Night</span> <br />
                <span className="text-2xl sm:text-3xl font-light tracking-widest text-white/60 uppercase">March 13</span>
              </h2>
            </div>

            <div className="space-y-6 text-lg text-white/80 font-light leading-relaxed">
              <p className="text-xl font-medium text-white">
                GD Lounge invites you to an exclusive Secret Room Club Night experience on Friday the 13th.
              </p>
              <p>
                Enjoy a premium nightlife atmosphere featuring DJ Fresco, explosive choreography, and an immersive and hypnotic show created and hosted by Mad Matilda that will ignite your imagination with whimsical performances and theatrical magic.
              </p>
              <p>
                An unforgettable night where you'll be surrounded by sophisticated allure and unforgettable experiences in one of Miami's unique nightlife venues where you can enjoy an upscale Lounge Bar, Secret Room, and VIP karaoke room.
              </p>
              <p>
                Tickets include General Admission standing access or the option to reserve private tables for a more elevated experience.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-6">
              <h3 className="text-2xl font-serif font-bold text-white">VIP Table (6–8 guests) includes:</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span>1 bottle of Prosecco</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span>1 bottle of Vodka or Tequila (guest choice)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span>Orange Juice</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span>Cranberry Juice</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span>1 bottle of sparkling water</span>
                </li>
              </ul>
              <h3 className="text-xl font-serif font-bold text-white pt-2">Table (2–3 guests) includes:</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span>1 bottle of Prosecco</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <p className="text-sm text-white/60 tracking-widest uppercase mb-6">
                21+ event. Dress to impress and get ready for an unforgettable night.
              </p>
              <Button
                onClick={() => window.open("https://buy.stripe.com/cNi6oI3Dh96B5eldYQ0Jq00", "_blank")}
                className="w-full sm:w-auto px-8 py-6 text-lg rounded-full"
              >
                Get Tickets
              </Button>
            </div>
          </div>

          {/* Right Column: Vertical Video */}
          <div className="relative aspect-[9/16] w-full max-w-md mx-auto lg:max-w-none rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50 border border-white/5 bg-black order-1 lg:order-2">
            <video
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              poster="/Events/events.webp"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/Events/13march.MP4" type="video/mp4" />
              <source src="/Events/13march.MP4" type="video/quicktime" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}
