"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Clock, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import "swiper/css";

type Event = {
  id: string;
  title: string;
  date: string;
  price: string;
  image: string;
  ticket_url: string;
};

const EVENTS: Event[] = [
  {
    id: "evt-1",
    title: "Secret Room",
    date: "February 6",
    price: "$100",
    image: "/Events/11111111111.png",
    ticket_url: "https://www.eventbrite.com/e/secret-room-at-gd-lounge-tickets-1978760584174"
  },
  {
    id: "evt-2",
    title: "Secret Room",
    date: "February 13",
    price: "$100",
    image: "/Events/2222.png",
    ticket_url: "https://www.eventbrite.com/e/secret-room-at-gd-lounge-tickets-1978760584174"
  },
  {
    id: "evt-3",
    title: "Secret Room",
    date: "February 20",
    price: "$100",
    image: "/Events/3333333.png",
    ticket_url: "https://www.eventbrite.com/e/secret-room-at-gd-lounge-tickets-1978760584174"
  }
];

export function EventsSection() {
  const EventCard = ({ event }: { event: Event }) => (
    <div
      className="relative aspect-[3/4.5] rounded-[2rem] overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer"
      onClick={() => window.open(event.ticket_url, "_blank", "noopener,noreferrer")}
    >
      {/* Background Image */}
      <Image
        src={event.image}
        alt={event.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="transform transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              {event.date}
            </span>
          </div>

          <h3 className="text-3xl font-bold text-white mb-2 font-serif">
            {event.title}
          </h3>

          <div className="flex items-center gap-4 text-white/80 text-sm mb-4">
            <span className="font-semibold text-primary text-lg">{event.price}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Tickets Available
            </span>
          </div>

          <Button
            className="w-full rounded-full font-bold transition-all shadow-lg hover:shadow-primary/25"
          >
            Get Tickets
          </Button>
        </div>
      </div>

      {/* Glass Border Effect */}
      <div className="absolute inset-0 border border-white/10 rounded-[2rem] pointer-events-none group-hover:border-primary/50 transition-colors duration-300" />
    </div>
  );

  return (
    <section id="events" className="py-24 lg:py-32 bg-background border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Exclusive Parties
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-serif tracking-tight">
            Upcoming Events
          </h2>
        </div>

        {/* Desktop Grid (Hidden on Mobile) */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Mobile Swiper (Hidden on Desktop) */}
        <div className="md:hidden -mx-4 px-4">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.15}
            centeredSlides={false}
            loop={false}
            className="pb-10"
          >
            {EVENTS.map((event) => (
              <SwiperSlide key={event.id}>
                <EventCard event={event} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
