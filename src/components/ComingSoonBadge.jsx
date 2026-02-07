import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ComingSoonBadge({
    size = "default",
    animated = true,
    variant = "primary"
}) {
    const badgeRef = useRef(null);
    const dotRef = useRef(null);

    useEffect(() => {
        if (animated && dotRef.current) {
            gsap.to(dotRef.current, {
                scale: 1.2,
                opacity: 0.5,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
            });
        }
    }, [animated]);

    const sizeClasses = {
        small: "px-2 py-1 text-xs",
        default: "px-3 py-1.5 text-sm",
        large: "px-4 py-2 text-base",
    };

    const variantClasses = {
        primary: "bg-main_primary/20 text-main_primary border-main_primary/40",
        white: "bg-white/10 text-white border-white/30",
        dark: "bg-black/30 text-white border-white/20",
    };

    return (
        <div
            ref={badgeRef}
            className={`inline-flex items-center gap-2 rounded-full border backdrop-blur-sm font-chakra font-medium ${sizeClasses[size]} ${variantClasses[variant]}`}
        >
            {/* Animated Dot */}
            <span className="relative flex h-2 w-2">
                <span
                    ref={dotRef}
                    className="absolute inline-flex h-full w-full rounded-full bg-current opacity-75"
                ></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
            </span>

            {/* Text */}
            <span>Coming Soon</span>
        </div>
    );
}

// Variant for overlay on event cards
export function ComingSoonOverlay({ children, show = true }) {
    if (!show) return children;

    return (
        <div className="relative">
            {children}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center rounded-md overflow-hidden">
                <div className="text-center p-4">
                    <ComingSoonBadge size="large" variant="white" />
                    <p className="text-white/70 text-sm font-chakra mt-2">
                        Details for 2026 coming soon
                    </p>
                </div>
            </div>
        </div>
    );
}

// Banner variant for top of pages
export function ComingSoonBanner({ message = "SPOORTHI 2026 event details will be announced soon. Stay tuned!" }) {
    return (
        <div className="w-full bg-gradient-to-r from-main_primary/20 via-main_primary/10 to-main_primary/20 border-y border-main_primary/30 py-3 px-4">
            <div className="flex items-center justify-center gap-3 text-center">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-main_primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-main_primary"></span>
                </span>
                <p className="text-white font-chakra text-sm md:text-base">
                    {message}
                </p>
            </div>
        </div>
    );
}
