"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2, Share2, Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";
import { Footer } from "@/components/footer";

type Biolink = {
    id: string;
    title: string;
    url: string;
    order: number;
    active: boolean;
};

export default function BusinessCardPage() {
    const [links, setLinks] = useState<Biolink[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const res = await fetch("/api/links");
                if (res.ok) {
                    const data = await res.json();
                    setLinks(data.filter((l: Biolink) => l.active));
                }
            } catch (error) {
                console.error("Failed to fetch links", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLinks();
    }, []);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "GD Lounge",
                    text: "Check out GD Lounge links",
                    url: window.location.href,
                });
            } catch (err) {
                console.log("Error sharing", err);
            }
        } else {
            // Fallback copy to clipboard or similar
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    return (
        <main className="min-h-screen bg-black text-white flex flex-col items-center relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
            </div>

            <div className="z-10 w-full max-w-md px-6 py-12 flex-grow flex flex-col items-center">
                {/* Header Actions */}
                <div className="w-full flex justify-end mb-4">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white"
                        onClick={handleShare}
                    >
                        <Share2 className="w-5 h-5" />
                    </Button>
                </div>

                {/* Profile Section */}
                <div className="flex flex-col items-center text-center mb-10">
                    <div className="w-32 h-32 mb-4 bg-transparent flex items-center justify-center relative">
                        <div className="relative w-full h-full">
                            <Image
                                src="/gold-logo.svg"
                                alt="GD Lounge Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold font-serif tracking-wide text-white mb-2">
                        GD Lounge
                    </h1>
                    <p className="text-sm text-white/60 max-w-xs leading-relaxed">
                        An electric fusion of high-energy nightlife and sophisticated relaxation in Miami.
                    </p>

                    {/* Social Icons & Contacts */}
                    <div className="flex flex-col items-center gap-4 mt-4 w-full">
                        {/* Address */}
                        <a
                            href="https://maps.app.goo.gl/UHtQmprFw7cEuEQc7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-white/80 hover:text-primary transition-colors text-center"
                        >
                            <MapPin className="w-4 h-4" />
                            <span>300 S Biscayne Blvd Suite C-202B, Miami, FL 33131</span>
                        </a>

                        {/* Socials Row */}
                        <div className="flex items-center gap-4">
                            <a href="https://www.instagram.com/gdlounge_miami/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 hover:text-primary transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=61575799892987" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 hover:text-primary transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="mailto:reservations@gdmiami.com" className="p-3 rounded-full bg-white/5 hover:bg-white/10 hover:text-primary transition-colors">
                                <Mail className="w-5 h-5" />
                            </a>
                            <a href="tel:+13052491222" className="p-3 rounded-full bg-white/5 hover:bg-white/10 hover:text-primary transition-colors">
                                <Phone className="w-5 h-5" />
                            </a>
                        </div>
                        {/* Contact Text */}
                        <div className="flex flex-col items-center gap-1 text-sm text-white/60">
                            <a href="tel:+13052491222" className="hover:text-white transition-colors">+1 305 249 1222</a>
                            <a href="mailto:reservations@gdmiami.com" className="hover:text-white transition-colors">reservations@gdmiami.com</a>
                        </div>
                    </div>
                </div>

                {/* Links Section */}
                <div className="w-full space-y-4">
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        </div>
                    ) : (
                        links.map((link) => (
                            <a
                                key={link.id}
                                href={link.url}
                                target={link.url.startsWith('/') ? undefined : "_blank"}
                                rel={link.url.startsWith('/') ? undefined : "noopener noreferrer"}
                                className="group block"
                            >
                                <div className={`
                                    relative w-full p-4 rounded-xl backdrop-blur-md border border-white/10
                                    transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]
                                    flex items-center justify-between
                                    bg-white/5 hover:bg-white/10
                                    ${link.title.includes('Private Party') ? 'border-primary/30 bg-primary/5' : ''}
                                `}>
                                    <div className="flex items-center gap-4">
                                        {/* Optional: Icon logic if we had icons in JSON. For now, a generic dot or specific icon for known titles. */}
                                        <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-primary/80">
                                            {getIconForTitle(link.title)}
                                        </div>
                                        <span className="font-medium text-sm sm:text-base text-white/90 group-hover:text-white">
                                            {link.title}
                                        </span>
                                    </div>

                                    {/* Small arrow or dots */}
                                    <div className="opacity-50 group-hover:opacity-100 transition-opacity">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-primary" />
                                    </div>
                                </div>
                            </a>
                        ))
                    )}
                </div>
            </div>

            <div className="w-full z-10 mt-auto pb-6">
                <p className="text-center text-[10px] text-white/30 uppercase tracking-widest">
                    GD Lounge © {new Date().getFullYear()}
                </p>
            </div>
        </main>
    );
}

// Helper for icons based on title keywords
import { Calendar, Crown, Globe, Utensils, Ticket, Martini } from "lucide-react";
// import { ChampagneBucket } from "@/components/icons/champagne-bucket"; // Keeping file but unused for now

function getIconForTitle(title: string) {
    const t = title.toLowerCase();
    if (t.includes("private")) return <Crown className="w-5 h-5" />;
    if (t.includes("website") || t.includes("home")) return <Globe className="w-5 h-5" />;
    // Use Cocktail (Martini) for reservation/table
    if (t.includes("reserve") || t.includes("table") || t.includes("book")) return <Martini className="w-5 h-5" />;
    if (t.includes("ticket") || t.includes("event") || t.includes("room")) return <Ticket className="w-5 h-5" />;
    return <Calendar className="w-5 h-5" />;
}
