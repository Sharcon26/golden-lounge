import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

type LeadPayload = {
    formType: "vip" | "reserve" | "consultation" | "private_party";
    email?: string;
    phone?: string;
    name?: string;
    message?: string;
    honeypot?: string;
};

/**
 * ===== Simple in-memory rate limit =====
 * 5 requests per 10 minutes per IP
 */
const RATE_LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

type RateEntry = {
    count: number;
    firstRequestAt: number;
};

const rateMap = new Map<string, RateEntry>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateMap.get(ip);

    if (!entry) {
        rateMap.set(ip, { count: 1, firstRequestAt: now });
        return false;
    }

    if (now - entry.firstRequestAt > WINDOW_MS) {
        rateMap.set(ip, { count: 1, firstRequestAt: now });
        return false;
    }

    entry.count += 1;
    rateMap.set(ip, entry);

    return entry.count > RATE_LIMIT;
}

export async function POST(request: Request) {
    try {
        const body: LeadPayload = await request.json();

        // 🛑 Honeypot (антиспам)
        if (body.honeypot) {
            return NextResponse.json({ success: true });
        }

        // 🌐 IP
        const ip =
            request.headers.get("x-forwarded-for") ??
            request.headers.get("x-real-ip") ??
            "unknown";

        // 🚦 Rate limit
        if (isRateLimited(ip)) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Too many requests. Please try again later.",
                },
                { status: 429 }
            );
        }

        // 🧠 Базовая валидация
        if (!body.formType) {
            return NextResponse.json(
                { success: false, error: "Missing formType" },
                { status: 400 }
            );
        }

        if (body.formType === "vip") {
            if (!body.name || !body.name.trim()) {
                return NextResponse.json(
                    { success: false, error: "Name is required" },
                    { status: 400 }
                );
            }
            if (!body.email) {
                return NextResponse.json(
                    { success: false, error: "Email is required" },
                    { status: 400 }
                );
            }
            if (!body.phone || !body.phone.trim()) {
                return NextResponse.json(
                    { success: false, error: "Phone number is required" },
                    { status: 400 }
                );
            }
        }

        // 📦 CRM-ready payload
        const crmPayload = {
            source: "website",
            formType: body.formType,
            contact: {
                email: body.email || null,
                phone: body.phone || null,
                name: body.name || null,
            },
            message: body.message || null,
            meta: {
                userAgent: request.headers.get("user-agent"),
                ip,
                createdAt: new Date().toISOString(),
            },
        };

        // 🧪 Пока просто логируем (вместо CRM)
        console.log("📥 NEW LEAD:", JSON.stringify(crmPayload, null, 2));

        // 💾 Сохраняем в Supabase
        const { error: dbError } = await supabase.from("leads").insert([
            {
                form_type: body.formType,
                email: body.email || null,
                phone: body.phone || null,
                name: body.name || null,
                message: body.message || null,
                meta: crmPayload.meta,
            },
        ]);

        if (dbError) {
            console.error("❌ Database error:", dbError.message);
            // Продолжаем, так как лог уже записан, но возвращаем успех, если это не критично
        }

        // 🔗 Webhook Integration
        // Global webhook for all forms (VIP, Private Party, etc.)
        const webhookUrl = "https://services.leadconnectorhq.com/hooks/5vrBDjurTDJOrrfbV6JE/webhook-trigger/bf3c3d18-9a88-466c-940f-dad7804cc9fd";

        if (webhookUrl) {
            try {
                // Fire and forget (optional: await if you want to ensure delivery before success)
                // We await here to ensure it's sent, catching errors so we don't block the UI response
                const webhookRes = await fetch(webhookUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(crmPayload),
                });

                if (!webhookRes.ok) {
                    console.error(`Webhook failed for ${body.formType}: ${webhookRes.status} ${webhookRes.statusText}`);
                } else {
                    console.log(`Webhook sent for ${body.formType}`);
                }
            } catch (webhookError) {
                console.error("Webhook error:", webhookError);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("❌ Lead API error:", error);
        return NextResponse.json(
            { success: false, error: "Server error" },
            { status: 500 }
        );
    }
}
