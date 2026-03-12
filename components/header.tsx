"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ReserveModal } from "@/components/reserve-modal";
import { PrivatePartyModal } from "@/components/private-party-modal";

const RESERVE_URL = "https://www.sevenrooms.com/reservations/gdlounge";
const EVENTBRITE_URL = "https://www.eventbrite.com/e/gd-lounge-presents-secret-room-club-night-tickets-1984784124746";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#food", label: "Food" },
  { href: "#cocktails", label: "Cocktails" },
  // { href: "#gallery", label: "Gallery" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [isPrivatePartyModalOpen, setIsPrivatePartyModalOpen] = useState(false);
  const pathname = usePathname();

  const getHref = (href: string) => {
    if (href.startsWith("#") && pathname !== "/") {
      return `/${href}`;
    }
    return href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/gold-logo.svg"
              alt="GD Lounge"
              width={194}
              height={178}
              className="h-12 w-auto lg:h-16 transition-opacity group-hover:opacity-90"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={getHref(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group/nav"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover/nav:w-full" />
              </Link>
            ))}
            <a
              href={EVENTBRITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Secret Room
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="outline"
              className="rounded-full px-5 hover:text-primary hover:border-primary transition-colors"
              onClick={() => setIsPrivatePartyModalOpen(true)}
            >
              Private Party
            </Button>
            <Button
              asChild
              className="rounded-full px-6"
            >
              <a href={RESERVE_URL} target="_blank" rel="noopener noreferrer" id="reservation-button-header-desktop">
                Reserve
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border/50">
          <nav className="flex flex-col px-4 py-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={getHref(link.href)}
                className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={EVENTBRITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex items-center gap-2 text-lg font-semibold text-primary py-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Secret Room · Mar 13
            </a>

            <Button
              variant="outline"
              className="rounded-full mt-2 hover:text-primary hover:border-primary transition-colors"
              onClick={() => {
                setIsMenuOpen(false);
                setIsPrivatePartyModalOpen(true);
              }}
            >
              Private Party
            </Button>
            <Button asChild className="rounded-full">
              <a
                href={RESERVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                id="reservation-button-header-mobile"
              >
                Reserve
              </a>
            </Button>
          </nav>
        </div>
      )}

      <ReserveModal
        isOpen={isVipModalOpen}
        onOpenChange={setIsVipModalOpen}
      />

      <PrivatePartyModal
        isOpen={isPrivatePartyModalOpen}
        onOpenChange={setIsPrivatePartyModalOpen}
      />
    </header>
  );
}
