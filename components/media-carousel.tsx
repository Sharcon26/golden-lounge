"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { getAssetUrl } from "@/lib/assets";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export type MediaItem = {
    type: "video" | "image";
    src: string;
    alt?: string;
    poster?: string; // For videos
    isLocal?: boolean; // New flag to bypass getAssetUrl
};

interface MediaCarouselProps {
    media: MediaItem[];
    aspectRatio?: string; // e.g., "aspect-[4/5]" or "aspect-square"
    className?: string;
    priority?: boolean;
    loop?: boolean;
}

// Helper to resolve URL based on isLocal flag
const resolveUrl = (src: string, isLocal?: boolean) => {
    return isLocal ? src : getAssetUrl(src);
};

export function MediaCarousel({
    media,
    aspectRatio = "aspect-[4/5]",
    className = "",
    priority = false, // New prop, defaults to true for LCP/FCP if passed
    loop = false // Default to false for strict order
}: MediaCarouselProps) {
    const swiperRef = useRef<SwiperType | null>(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        const swiper = swiperRef.current;
        if (swiper) {
            const activeSlide = swiper.slides[swiper.activeIndex];
            const activeVideo = activeSlide.querySelector("video");
            if (activeVideo) {
                activeVideo.muted = !isMuted;
                setIsMuted(!isMuted);
            }
        }
    };

    const handleSlideChange = (swiper: SwiperType) => {
        // Pause all videos in the swiper
        const allVideos = swiper.el.querySelectorAll("video");
        allVideos.forEach((v) => {
            v.pause();
        });

        // Play video in the active slide
        const activeSlide = swiper.slides[swiper.activeIndex];
        const activeVideo = activeSlide.querySelector("video");
        if (activeVideo) {
            activeVideo.muted = isMuted; // Sync mute state
            activeVideo.currentTime = 0; // Optional: Restart video on slide enter
            const playPromise = activeVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch((e) => console.log("Autoplay blocked/deferred:", e));
            }
        }
    };

    const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

    return (
        <div className={`relative group rounded-[2rem] overflow-hidden shadow-2xl bg-black ${className}`}>
            <Swiper
                // Force re-render if strict/loop mode changes
                key={loop ? "loop-mode" : "strict-mode"}
                modules={[Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                    prevEl,
                    nextEl,
                }}
                pagination={{ clickable: true, dynamicBullets: true }}
                loop={loop}
                initialSlide={0}
                className="h-full w-full"
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    // Force start at 0
                    if (!loop) {
                        swiper.slideTo(0, 0, false);
                    }
                    // Initial check for video on mount
                    setTimeout(() => {
                        handleSlideChange(swiper);
                    }, 100);
                }}
                onSlideChange={handleSlideChange}
            >
                {media.map((item, index) => (
                    <SwiperSlide key={`${item.src}-${index}`} className="h-full w-full">
                        <div className={`relative w-full h-full ${aspectRatio} mobile-fix-height`}>
                            {item.type === "video" ? (
                                <>
                                    <video
                                        poster={item.poster ? resolveUrl(item.poster, item.isLocal) : undefined}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        loop
                                        muted={isMuted}
                                        playsInline
                                        webkit-playsinline="true"
                                        preload={index === 0 && priority ? "auto" : "metadata"}
                                    >
                                        <source src={resolveUrl(item.src, item.isLocal)} />
                                        Your browser does not support the video tag.
                                    </video>
                                    {/* Video Controls Overlay */}
                                    <div className="absolute bottom-6 right-6 flex items-center gap-3 z-20">
                                        <button
                                            onClick={toggleMute}
                                            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all"
                                            aria-label={isMuted ? "Unmute video" : "Mute video"}
                                        >
                                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                        </button>
                                    </div>

                                    {/* Badge */}
                                    <div className="absolute top-6 right-6 z-20">
                                        <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest text-white">
                                            Video
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <Image
                                    src={resolveUrl(item.src, item.isLocal)}
                                    alt={item.alt || ""}
                                    fill
                                    className="object-cover"
                                    loading={index === 0 && priority ? "eager" : "lazy"}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                    priority={index === 0 && priority}
                                />
                            )}

                            {/* Gradient Overlay for better text visibility if needed, or visual style */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Hidden preloader for first item poster/image if priority is on */}
            {priority && media[0] && (
                <div className="hidden">
                    <Image
                        src={resolveUrl(media[0].poster || media[0].src, media[0].isLocal)}
                        alt="preload"
                        width={1}
                        height={1}
                        priority
                    />
                </div>
            )}

            {/* Navigation Arrows - Converted to Buttons for Accessibility */}
            {media.length > 1 && (
                <>
                    <button
                        ref={(node) => setPrevEl(node)}
                        type="button"
                        aria-label="Previous slide"
                        className="custom-swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white cursor-pointer hover:bg-black/40 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        ref={(node) => setNextEl(node)}
                        type="button"
                        aria-label="Next slide"
                        className="custom-swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white cursor-pointer hover:bg-black/40 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </>
            )}

        </div>
    );
}
