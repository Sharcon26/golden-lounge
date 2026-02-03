import React from "react";
import { LucideProps } from "lucide-react";

export const ChampagneBucket = ({ className, ...props }: LucideProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
    >
        {/* Bottle Neck and Cork */}
        <path d="M12 2v6" />
        <path d="M10 4h4" />

        {/* Bottle Body (Partial, obscured by bucket) */}
        <path d="M12 8c-1.5 0-2.5 .5-2.5 1.5" />
        <path d="M12 8c1.5 0 2.5 .5 2.5 1.5" />

        {/* Ice/Bubbles */}
        <circle cx="8" cy="9" r="1" />
        <circle cx="16" cy="9" r="1" />

        {/* Bucket */}
        <path d="M3 10h18l-2 11H5L3 10z" />
        <path d="M3 10c0 0 4-2 9-2s9 2 9 2" />
    </svg>
);
