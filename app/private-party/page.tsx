"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, Check, Crown } from "lucide-react";
import { Metadata } from "next";

export default function PrivatePartyPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");
    const [guests, setGuests] = useState("");
    const [message, setMessage] = useState("");
    const [honeypot, setHoneypot] = useState("");
    const [agreeNonMarketing, setAgreeNonMarketing] = useState(false);
    const [agreeMarketing, setAgreeMarketing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const formatPhoneNumber = (value: string): string => {
        const phoneNumber = value.replace(/\D/g, "");
        if (phoneNumber.length === 0) return "";
        if (phoneNumber.length < 4) return `(${phoneNumber}`;
        if (phoneNumber.length < 7) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(formatPhoneNumber(e.target.value));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (honeypot) return;

        setIsLoading(true);

        // Append Date and Guests to message
        const formattedMessage = `
Event Date: ${date}
Number of Guests: ${guests}

${message}
    `.trim();

        try {
            const res = await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    formType: "private_party",
                    name,
                    email,
                    phone: phone.replace(/\D/g, ""),
                    message: formattedMessage,
                    honeypot,
                }),
            });

            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.error || "Submission failed");

            setIsSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-background">
            <Header />

            <div className="pt-32 pb-24 lg:pt-40 lg:pb-32">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center mb-12">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                            <Crown className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-foreground font-serif tracking-tight mb-4">
                            Book a Private Party
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Host your exclusive event at GD Lounge. Whether it's a birthday, corporate event, or special celebration, we provide the perfect atmosphere.
                        </p>
                    </div>

                    <div className="bg-card border border-border/50 rounded-3xl p-6 lg:p-10 shadow-xl">
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <input type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2 text-left">
                                        <Label htmlFor="pp-name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name <span className="text-primary">*</span></Label>
                                        <Input id="pp-name" required value={name} onChange={(e) => setName(e.target.value)} className="bg-background border-border/50 h-12" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2 text-left">
                                        <Label htmlFor="pp-email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email <span className="text-primary">*</span></Label>
                                        <Input id="pp-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-background border-border/50 h-12" placeholder="john@example.com" />
                                    </div>
                                </div>

                                <div className="space-y-2 text-left">
                                    <Label htmlFor="pp-phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone <span className="text-primary">*</span></Label>
                                    <Input id="pp-phone" type="tel" required value={phone} onChange={handlePhoneChange} maxLength={14} className="bg-background border-border/50 h-12" placeholder="(555) 123-4567" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2 text-left">
                                        <Label htmlFor="pp-date" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date <span className="text-primary">*</span></Label>
                                        <Input id="pp-date" type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="bg-background border-border/50 h-12 dark:[color-scheme:dark]" />
                                    </div>
                                    <div className="space-y-2 text-left">
                                        <Label htmlFor="pp-guests" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Guests <span className="text-primary">*</span></Label>
                                        <Input id="pp-guests" type="number" min="1" required value={guests} onChange={(e) => setGuests(e.target.value)} className="bg-background border-border/50 h-12" placeholder="Number of guests" />
                                    </div>
                                </div>

                                <div className="space-y-2 text-left">
                                    <Label htmlFor="pp-message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</Label>
                                    <Textarea id="pp-message" value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-[120px] bg-background border-border/50 resize-none p-4" placeholder="Tell us more about your event (type of event, special requests, etc.)..." />
                                </div>

                                {/* Consent Checkboxes */}
                                <div className="space-y-4 pt-2 bg-background/50 p-4 rounded-xl border border-border/30">
                                    <div className="flex items-start gap-3 text-left">
                                        <Checkbox id="pp-agreeNonMarketing" checked={agreeNonMarketing} onCheckedChange={(c) => setAgreeNonMarketing(!!c)} className="mt-0.5 border-primary/40 data-[state=checked]:bg-primary" />
                                        <label htmlFor="pp-agreeNonMarketing" className="text-xs text-muted-foreground cursor-pointer leading-relaxed">
                                            By checking this box, I consent to receive non-marketing text messages from Gold Door 300 LLC about ticket purchases, event reminders, reservations, schedule updates, and important venue notifications. Message frequency varies, message & data rates may apply. Text HELP for assistance, reply STOP to opt out.
                                        </label>
                                    </div>
                                    <div className="flex items-start gap-3 text-left">
                                        <Checkbox id="pp-agreeMarketing" checked={agreeMarketing} onCheckedChange={(c) => setAgreeMarketing(!!c)} className="mt-0.5 border-primary/40 data-[state=checked]:bg-primary" />
                                        <label htmlFor="pp-agreeMarketing" className="text-xs text-muted-foreground cursor-pointer leading-relaxed">
                                            By checking this box, I consent to receive marketing and promotional messages including special offers, discounts, new product updates among others from Gold Door 300 LLC at the phone number provided. Frequency may vary. Message & data rates may apply. Text HELP for assistance, reply STOP to opt out.
                                        </label>
                                    </div>
                                </div>

                                {error && <div className="flex items-center gap-2 text-sm text-red-500 font-medium p-3 bg-red-500/10 rounded-lg border border-red-500/20"><AlertTriangle className="w-4 h-4" />{error}</div>}

                                <p className="text-[10px] text-muted-foreground leading-tight text-center pt-2">
                                    SMS messages are sent only if you choose to opt in by checking a box above. Reply STOP to opt out.
                                </p>

                                <Button type="submit" disabled={isLoading} className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 rounded-xl">
                                    {isLoading ? "Sending Request..." : "Request Booking"}
                                </Button>

                                <div className="flex items-center justify-center gap-3 mt-6 text-xs text-muted-foreground">
                                    <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                                    <span className="text-muted-foreground/40">|</span>
                                    <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                                </div>

                            </form>
                        ) : (
                            <div className="max-w-md mx-auto py-16 text-center">
                                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 ring-8 ring-primary/5">
                                    <Check className="w-10 h-10 text-primary" />
                                </div>
                                <h3 className="text-3xl font-bold mb-4 font-serif">Request Sent!</h3>
                                <p className="text-lg text-muted-foreground mb-8">
                                    Thank you for choosing GD Lounge. Our events team will review your request and get back to you shortly to confirm the details.
                                </p>
                                <Button asChild variant="outline" className="rounded-full border-primary/50 hover:bg-primary/10">
                                    <Link href="/">Return to Home</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
