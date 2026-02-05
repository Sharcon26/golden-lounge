import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function fnv1a32(input: string): number {
  // FNV-1a 32-bit hash
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    // multiply by FNV prime 16777619 (using bit ops for 32-bit overflow)
    hash = (hash + (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24)) >>> 0;
  }
  return hash >>> 0;
}

function unitIntervalFromSeed(seed: string): number {
  // Map stable 32-bit hash to [0, 1)
  return fnv1a32(seed) / 2 ** 32;
}

export function getStableRandomDateFromSeed(
  seed: string,
  {
    minDaysAgo = 1,
    maxDaysAgo = 90, // ~3 months
    baseDate = new Date(),
  }: { minDaysAgo?: number; maxDaysAgo?: number; baseDate?: Date } = {}
): Date {
  const min = Math.max(0, Math.floor(minDaysAgo));
  const max = Math.max(min, Math.floor(maxDaysAgo));

  const base = new Date(baseDate);
  // Normalize to midnight UTC for consistency across environments.
  base.setUTCHours(0, 0, 0, 0);

  const r = unitIntervalFromSeed(seed || "seed");
  const daysAgo = min + Math.floor(r * (max - min + 1));
  const d = new Date(base);
  d.setUTCDate(d.getUTCDate() - daysAgo);
  return d;
}

export function formatNewsDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

