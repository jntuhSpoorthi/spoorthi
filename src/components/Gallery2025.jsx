import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GallerySection({
    galleryData,
    siteConfig,
    previewMode = false,
    maxItems = 8,
    showTitle = true
}) {
    const [activeCategory, setActiveCategory] = useState("all");
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const galleryRef = useRef(null);
    const titleRef = useRef(null);

    const categories = galleryData?.categories || [];
    const items = galleryData?.items || [];

    // Get titles from siteConfig or galleryData, with fallbacks
    const title = siteConfig?.gallery?.title || galleryData?.title || "PAST FEST MEMORIES";
    const subtitle = siteConfig?.gallery?.subtitle || galleryData?.subtitle || "Relive the magic from our previous editions";

    // Filter items based on category
    const filteredItems = activeCategory === "all"
        ? items
        : items.filter(item => item.category === activeCategory);

    // Limit items in preview mode
    const displayItems = previewMode
        ? filteredItems.slice(0, maxItems)
        : filteredItems;

    useEffect(() => {
        // Animate title on scroll
        if (titleRef.current) {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 80%",
                    },
                }
            );
        }

        // Animate gallery items
        if (galleryRef.current) {
            const items = galleryRef.current.querySelectorAll(".gallery-item");
            gsap.fromTo(
                items,
                { opacity: 0, y: 30, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: galleryRef.current,
                        start: "top 80%",
                    },
                }
            );
        }
    }, [activeCategory]);

    const openLightbox = (item) => {
        setSelectedImage(item);
        setIsLightboxOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
        setSelectedImage(null);
        document.body.style.overflow = "auto";
    };

    const navigateImage = useCallback((direction) => {
        const currentIndex = displayItems.findIndex(item => item.id === selectedImage?.id);
        let newIndex;
        if (direction === "next") {
            newIndex = currentIndex + 1 >= displayItems.length ? 0 : currentIndex + 1;
        } else {
            newIndex = currentIndex - 1 < 0 ? displayItems.length - 1 : currentIndex - 1;
        }
        setSelectedImage(displayItems[newIndex]);
    }, [displayItems, selectedImage]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isLightboxOpen) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") navigateImage("next");
            if (e.key === "ArrowLeft") navigateImage("prev");
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isLightboxOpen, selectedImage, navigateImage]);

    return (
        <section className="w-full py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-transparent to-soothing_black/50">
            {/* Section Header */}
            {showTitle && (
                <div ref={titleRef} className="text-center mb-10 md:mb-16">
                    <span className="inline-block px-4 py-2 mb-4 text-sm md:text-base font-chakra text-main_primary bg-main_primary/10 rounded-full border border-main_primary/30">
                        ✨ Previous Editions
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-clash font-bold text-white mb-4">
                        {title}
                    </h2>
                    <p className="text-gray text-base md:text-lg font-chakra max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>
            )}

            {/* Category Filter - Only show in full mode */}
            {!previewMode && (
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-chakra text-sm md:text-base transition-all duration-300 ${activeCategory === category.id
                                ? "bg-main_primary text-white shadow-lg shadow-main_primary/30"
                                : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                                }`}
                        >
                            {/* <span className="mr-2">{category.icon}</span> */}
                            {category.name}
                        </button>
                    ))}
                </div>
            )}

            {/* Gallery Grid - Masonry Layout using CSS columns */}
            <div
                ref={galleryRef}
                className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 lg:gap-6 space-y-3 md:space-y-4 lg:space-y-6"
            >
                {displayItems.map((item) => (
                    <div
                        key={item.id}
                        className={`gallery-item relative group cursor-pointer rounded-xl md:rounded-2xl overflow-hidden break-inside-avoid mb-3 md:mb-4 lg:mb-6 ${item.featured && !previewMode ? "lg:scale-105" : ""
                            }`}
                        onClick={() => openLightbox(item)}
                    >
                        {/* Image Container - Uses natural aspect ratio */}
                        <div className="relative">
                            <Image
                                src={item.src}
                                alt={item.caption || "Gallery image"}
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                style={{
                                    aspectRatio: item.aspectRatio || 'auto',
                                    minHeight: '150px',
                                    maxHeight: previewMode ? '300px' : '500px'
                                }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Caption */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-white text-sm md:text-base font-chakra line-clamp-2">
                                    {item.caption}
                                </p>
                                <span className="inline-block mt-1 text-xs text-main_primary font-medium capitalize">
                                    {item.category}
                                </span>
                            </div>

                            {/* Video Play Icon */}
                            {item.type === "video" && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            )}

                            {/* Featured badge */}
                            {item.featured && !previewMode && (
                                <div className="absolute top-2 left-2 px-2 py-1 bg-main_primary/90 text-white text-xs font-chakra font-bold rounded">
                                    ★ Featured
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Button - Only in preview mode */}
            {previewMode && (
                <div className="text-center mt-8 md:mt-12 relative z-10">
                    <Link
                        href="/gallery"
                        className="inline-flex items-center gap-2 px-8 py-4 md:px-10 md:py-5 bg-main_primary text-white font-clash font-bold text-lg md:text-xl rounded-full hover:bg-main_primary/90 transition-all duration-300 hover:scale-105 shadow-xl shadow-main_primary/40 border-2 border-main_primary/50"
                    >
                        View Full Gallery
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            )}

            {/* Lightbox Modal */}
            {isLightboxOpen && selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
                    >
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Navigation Arrows */}
                    <button
                        onClick={(e) => { e.stopPropagation(); navigateImage("prev"); }}
                        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    >
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); navigateImage("next"); }}
                        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    >
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Image Container */}
                    <div
                        className="relative max-w-5xl max-h-[80vh] w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-[60vh] md:h-[75vh]">
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.caption || "Gallery image"}
                                fill
                                className="object-contain"
                                sizes="100vw"
                                priority
                            />
                        </div>

                        {/* Caption */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black to-transparent">
                            <p className="text-white text-base md:text-lg font-chakra text-center">
                                {selectedImage.caption}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
