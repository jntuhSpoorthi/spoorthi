import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Souvenir({ siteConfig }) {
    const sectionRef = useRef(null);

    // Get souvenir config
    const souvenirConfig = siteConfig?.souvenir;
    const isEnabled = souvenirConfig?.enabled;

    const {
        title = "SPOORTHI Souvenir",
        description = "Download our official fest souvenir - a collection of memories, articles, and achievements.",
        filePath = "",
        coverImage = "",
        fileType = "pdf"
    } = souvenirConfig || {};

    useEffect(() => {
        // Only run animation if enabled and ref exists
        if (!isEnabled || !sectionRef.current) return;

        gsap.fromTo(
            sectionRef.current,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                },
            }
        );
    }, [isEnabled]);

    // Don't render if souvenir is disabled or no config
    if (!isEnabled) {
        return null;
    }

    const handleDownload = () => {
        if (filePath) {
            window.open(filePath, "_blank");
        }
    };

    const handleView = () => {
        if (filePath) {
            window.open(filePath, "_blank");
        }
    };

    return (
        <section
            ref={sectionRef}
            className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-soothing_black to-black"
        >
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <span className="inline-block px-4 py-2 mb-4 text-sm md:text-base font-chakra text-main_primary bg-main_primary/10 rounded-full border border-main_primary/30">
                        📖 Digital Souvenir
                    </span>
                    <h2 className="text-3xl md:text-5xl font-clash font-bold text-white mb-4">
                        {title}
                    </h2>
                    <p className="text-gray text-base md:text-lg font-chakra max-w-xl mx-auto">
                        {description}
                    </p>
                </div>

                {/* Souvenir Card */}
                <div className="relative bg-gradient-to-br from-gray/20 to-gray/5 rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute inset-0 bg-[url('/banner.png')] bg-cover bg-center opacity-10"></div>

                    <div className="relative p-6 md:p-12 flex flex-col md:flex-row items-center gap-8">
                        {/* PDF Cover Preview */}
                        <div className="flex-shrink-0 relative group">
                            {coverImage ? (
                                // Show actual cover image
                                <div className="relative w-40 h-56 md:w-48 md:h-64 rounded-lg overflow-hidden shadow-2xl shadow-black/50 border border-white/10 transform group-hover:scale-105 transition-transform duration-300">
                                    <Image
                                        src={coverImage}
                                        alt="Souvenir Cover"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 160px, 192px"
                                    />
                                    {/* Overlay effect */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    {/* PDF badge */}
                                    <div className="absolute top-2 right-2 px-2 py-1 bg-main_primary text-white text-xs font-chakra font-bold rounded uppercase">
                                        {fileType}
                                    </div>
                                </div>
                            ) : (
                                // Fallback PDF icon
                                <div className="w-40 h-56 md:w-48 md:h-64 bg-gradient-to-br from-main_primary/30 to-main_primary/10 rounded-lg flex items-center justify-center border border-main_primary/30 shadow-xl shadow-black/30">
                                    <div className="text-center">
                                        <svg className="w-16 h-16 md:w-20 md:h-20 text-main_primary mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span className="text-white/60 text-sm font-chakra uppercase">
                                            {fileType}
                                        </span>
                                    </div>
                                </div>
                            )}
                            {/* Page curl effect */}
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white/10 rounded-tl-xl transform rotate-45"></div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl md:text-2xl font-clash font-semibold text-white mb-3">
                                {siteConfig?.festName} {siteConfig?.currentYear} Souvenir
                            </h3>
                            <p className="text-white/70 font-chakra text-sm md:text-base mb-6 leading-relaxed">
                                A curated collection of articles, achievements, memories, and highlights from our technical symposium.
                                Featuring contributions from students, faculty, and industry experts.
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                {filePath ? (
                                    <>
                                        <button
                                            onClick={handleView}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-main_primary text-white font-clash font-semibold rounded-full hover:bg-main_primary/90 transition-all duration-300 hover:scale-105 shadow-lg shadow-main_primary/30"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            View Online
                                        </button>
                                        <button
                                            onClick={handleDownload}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-clash font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Download PDF
                                        </button>
                                    </>
                                ) : (
                                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-white/50 font-chakra rounded-full border border-white/10">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Coming Soon
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
