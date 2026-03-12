import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Secret Room Club Night — GD Lounge",
    description:
        "An exclusive Secret Room Club Night on Friday March 13 at GD Lounge, Downtown Miami. Featuring DJ Fresco, explosive choreography, and a hypnotic show hosted by Matilda.",
    openGraph: {
        title: "Secret Room Club Night — GD Lounge",
        description:
            "An immersive club night experience on Friday March 13 at GD Lounge, Downtown Miami.",
    },
};

const STRIPE_URL = "https://buy.stripe.com/cNi6oI3Dh96B5eldYQ0Jq00";

export default function SecretPage() {
    return (
        <main className="min-h-screen bg-background text-white">
            {/* Nav back */}
            <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/70 backdrop-blur-xl border-b border-white/10">
                <Link
                    href="/"
                    className="text-sm font-medium text-white/60 hover:text-white transition-colors flex items-center gap-2"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                    GD Lounge
                </Link>
                <a
                    href={STRIPE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold tracking-widest uppercase text-primary border border-primary/50 rounded-full px-4 py-1.5 hover:bg-primary hover:text-black transition-all"
                >
                    Get Tickets
                </a>
            </div>

            {/* Hero Video */}
            <section className="relative w-full" style={{ paddingTop: "56px" }}>
                <div className="relative w-full max-w-lg mx-auto" style={{ aspectRatio: "9/16", maxHeight: "85vh" }}>
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover rounded-b-3xl"
                        poster="/Events/events.webp"
                    >
                        <source src="/Events/13march.MP4" type="video/mp4" />
                        <source src="/Events/13march.MP4" type="video/quicktime" />
                    </video>
                    {/* gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-b-3xl pointer-events-none" />
                    {/* Title overlay */}
                    <div className="absolute bottom-8 left-0 right-0 text-center px-6">
                        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary mb-2">Friday · March 13</p>
                        <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white leading-tight">
                            Secret Room
                        </h1>
                        <p className="text-xl text-white/70 mt-1 font-light">Club Night</p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="max-w-2xl mx-auto px-6 py-16 space-y-12">

                {/* Intro */}
                <div className="space-y-5 text-white/80 text-lg font-light leading-relaxed">
                    <p className="text-xl font-medium text-white">
                        GD Lounge invites you to an exclusive Secret Room Club Night experience on Friday the 13th.
                    </p>
                    <p>
                        Enjoy a premium nightlife atmosphere featuring DJ Fresco, explosive choreography, and an immersive and hypnotic show hosted by Matilda that will ignite your imagination with whimsical performances and theatrical magic.
                    </p>
                    <p>
                        An unforgettable night where you'll be surrounded by sophisticated allure in one of Miami's unique nightlife venues — an upscale Lounge Bar, Secret Room, and VIP karaoke room.
                    </p>
                    <p>
                        Tickets include General Admission standing access or the option to reserve private tables for a more elevated experience.
                    </p>
                </div>

                {/* Packages */}
                <div className="space-y-6">
                    {/* VIP Table */}
                    <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 space-y-4">
                        <h2 className="text-xl font-serif font-bold text-white">VIP Table <span className="text-primary">6–8 guests</span></h2>
                        <ul className="space-y-2 text-white/80">
                            {[
                                "1 bottle of Prosecco",
                                "1 bottle of Vodka or Tequila (guest choice)",
                                "Orange Juice",
                                "Cranberry Juice",
                                "1 bottle of sparkling water",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <span className="text-primary mt-0.5">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Small Table */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
                        <h2 className="text-xl font-serif font-bold text-white">Table <span className="text-white/60">2–3 guests</span></h2>
                        <ul className="space-y-2 text-white/80">
                            <li className="flex items-start gap-3">
                                <span className="text-primary mt-0.5">•</span>
                                <span>1 bottle of Prosecco</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Details */}
                <div className="border-t border-white/10 pt-8 grid grid-cols-2 gap-4 text-sm">
                    {[
                        { label: "Date", value: "Friday, March 13" },
                        { label: "Venue", value: "GD Lounge, Downtown Miami" },
                        { label: "Age", value: "21+" },
                        { label: "Dress code", value: "Dress to impress" },
                    ].map(({ label, value }) => (
                        <div key={label}>
                            <p className="text-white/40 uppercase tracking-widest text-xs mb-1">{label}</p>
                            <p className="text-white font-medium">{value}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="pt-4 space-y-4">
                    <a
                        href={STRIPE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center rounded-full bg-primary text-black font-bold text-lg py-5 hover:bg-primary/90 hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] transition-all duration-300 hover:scale-[1.02]"
                    >
                        Buy Tickets
                    </a>
                    <p className="text-center text-white/40 text-xs tracking-wide">
                        Secure payment · Powered by Stripe
                    </p>
                </div>

            </section>
        </main>
    );
}
