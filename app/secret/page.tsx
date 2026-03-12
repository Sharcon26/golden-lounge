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
        <main className="min-h-screen bg-[#080810] text-white overflow-x-hidden">

            {/* ── Top nav ── */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-5 h-14 bg-black/90 backdrop-blur-xl border-b border-white/10">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
                >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                    <span className="hidden sm:inline">GD Lounge</span>
                    <span className="sm:hidden">Home</span>
                </Link>
                <a
                    href={STRIPE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase bg-primary text-black rounded-full px-4 sm:px-5 py-2 hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all whitespace-nowrap"
                >
                    Get Tickets
                </a>
            </nav>

            {/* ── HERO ── */}
            <section className="relative min-h-screen flex items-center pt-14">

                {/* Background glow */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-900/20 blur-[100px]" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                        {/* ── LEFT: Text ── */}
                        <div className="order-2 lg:order-1 space-y-8">

                            {/* Event label */}
                            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                                </span>
                                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-primary">
                                    Friday · March 13 · GD Lounge
                                </span>
                            </div>

                            {/* Title */}
                            <div>
                                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
                                    <span className="block text-white">Secret</span>
                                    <span className="block bg-gradient-to-r from-primary via-yellow-300 to-primary bg-clip-text text-transparent">
                                        Room
                                    </span>
                                    <span className="block text-2xl sm:text-3xl font-light tracking-[0.2em] text-white/40 uppercase mt-3">
                                        Club Night
                                    </span>
                                </h1>
                            </div>

                            {/* Description */}
                            <div className="space-y-4 text-white/60 text-base leading-relaxed max-w-lg">
                                <p>
                                    An exclusive club night at GD Lounge featuring <span className="text-white/90">DJ Fresco</span>, explosive choreography, and an immersive show hosted by <span className="text-white/90">Matilda</span> — whimsical performances and theatrical magic in one of Miami's most unique nightlife venues.
                                </p>
                                <p className="text-sm">
                                    Upscale Lounge Bar · Secret Room · VIP Karaoke · 21+ Event
                                </p>
                            </div>

                            {/* Quick details */}
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { icon: "📍", text: "Downtown Miami" },
                                    { icon: "🕙", text: "Friday, March 13" },
                                    { icon: "🎭", text: "Dress to impress" },
                                ].map(({ icon, text }) => (
                                    <span key={text} className="inline-flex items-center gap-2 text-xs font-medium text-white/50 border border-white/10 rounded-full px-3 py-1.5 bg-white/5">
                                        {icon} {text}
                                    </span>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <a
                                    href={STRIPE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 rounded-full bg-primary text-black font-bold text-base px-8 py-4 hover:bg-primary/90 hover:shadow-[0_0_40px_rgba(245,158,11,0.45)] hover:scale-[1.03] transition-all duration-300"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M20 12V22H4V12" /><path d="M22 7H2v5h20V7z" /><path d="M12 22V7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                                    </svg>
                                    Buy Tickets
                                </a>
                                <span className="self-center text-xs text-white/30 tracking-wide">
                                    Secure · Powered by Stripe
                                </span>
                            </div>

                            {/* Packages preview */}
                            <div className="border-t border-white/10 pt-6 grid grid-cols-2 gap-3">
                                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                                    <p className="text-[11px] font-bold tracking-widest uppercase text-primary mb-2">VIP Table</p>
                                    <p className="text-xs text-white/60 leading-relaxed">6–8 guests · Prosecco + Vodka or Tequila + mixers + water</p>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                                    <p className="text-[11px] font-bold tracking-widest uppercase text-white/40 mb-2">Table</p>
                                    <p className="text-xs text-white/60 leading-relaxed">2–3 guests · 1 bottle of Prosecco</p>
                                </div>
                            </div>

                        </div>

                        {/* ── RIGHT: Video ── */}
                        <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end gap-5">
                            <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px]">
                                {/* Glow ring */}
                                <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-b from-primary/30 to-purple-600/20 blur-xl opacity-70" />
                                <div className="relative rounded-[1.75rem] overflow-hidden border border-white/10 shadow-2xl" style={{ aspectRatio: "9/16" }}>
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover"
                                        poster="/Events/events.webp"
                                    >
                                        <source src="/Events/13march.MP4" type="video/mp4" />
                                        <source src="/Events/13march.MP4" type="video/quicktime" />
                                    </video>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                                </div>
                            </div>

                            {/* Mobile-only CTA under video */}
                            <a
                                href={STRIPE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="lg:hidden w-full max-w-[280px] sm:max-w-[320px] text-center rounded-full bg-primary text-black font-bold text-base py-4 shadow-[0_0_30px_rgba(245,158,11,0.45)] hover:bg-primary/90 active:scale-95 transition-all duration-200"
                            >
                                🎟 Buy Tickets
                            </a>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── Bottom strip ── */}
            <section className="border-t border-white/5 bg-black/30">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 text-center space-y-5">
                    <p className="text-white/40 text-sm">
                        General Admission standing · Private table reservations available
                    </p>
                    <a
                        href={STRIPE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-primary text-black font-bold text-sm px-8 py-3.5 hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all"
                    >
                        Secure Your Spot
                    </a>
                </div>
            </section>

        </main>
    );
}
