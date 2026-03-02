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
                <span className="text-primary">at GD Lounge</span>
              </h2>
            </div>

            <div className="space-y-6 text-lg text-white/80 font-light leading-relaxed">
              <p className="text-xl font-medium text-white">
                An immersive, after-dark performance directed by House of Matilda.
              </p>
              <p>
                This is not a traditional show. It’s a fully immersive experience where tension, movement, sound, and emotion unfold around you. Intimate. Cinematic. Unfiltered. The atmosphere builds slowly, pulling you deeper until the final moment lands with full intensity.
              </p>
              <p>
                Created for guests who want more than entertainment — they want to feel it.
              </p>
              <p className="italic text-primary/90">
                Where elegance fades and instinct takes over.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-6">
              <h3 className="text-2xl font-serif font-bold text-white">Event Details</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span><strong>Date:</strong> March 6</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span><strong>Venue:</strong> GD Lounge, Downtown Miami</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span><strong>Ticket price:</strong> $100 per person</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span><strong>Included:</strong> Champagne + cocktail after the show</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <p className="text-sm text-white/60 tracking-widest uppercase mb-6">
                Limited seating. One night. One experience.
              </p>
              <Button
                onClick={() => window.open("https://www.eventbrite.com/e/secret-room-at-gd-lounge-tickets-1981588907766", "_blank")}
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
              <source src="/Events/IMG_1427.mp4" type="video/mp4" />
              <source src="/Events/IMG_1427.mp4" type="video/quicktime" />
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
