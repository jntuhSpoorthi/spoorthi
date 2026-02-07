import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PastEventGallery({ eventId, galleryData, siteConfig }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const sectionRef = useRef(null);
    const titleRef = useRef(null);

    // Get titles from siteConfig with fallbacks
    const sectionTitle = siteConfig?.gallery?.eventSectionTitle || "Previous Highlights";
    const sectionSubtitle = siteConfig?.gallery?.eventSectionSubtitle || "See what this event looked like in our previous editions";

    // Filter gallery items for this specific event or category
    const eventItems = galleryData?.items?.filter(item => {
        // Match by event category (maps event types to gallery categories)
        const categoryMap = {
            'exhipro': 'technical',
            'epapyrus': 'technical',
            'circuitrix': 'technical',
            'posteriza': 'technical',
            'tech-quiz': 'technical',
            'the-mob': 'cultural',
            'euphoria': 'cultural',
            'groupDance': 'cultural',
            'nithyarangi': 'cultural',
            'mime': 'cultural',
            'humour': 'cultural',
            'vanjiPattu': 'cultural',
            'tharangBand': 'cultural',
            'qr-hunt': 'games',
            'escape-room': 'games',
            'Treasure-Hunt': 'games',
            'Neon-Football': 'games',
            'Robo-Race': 'games',
            'tugofwar': 'games',
            'machine-learning-Workshop': 'workshop',
            'robotic-workshop': 'workshop',
            'Arduino Workshop': 'workshop',
            'Cyber Security Workshop': 'workshop',
            'Ai Workshop': 'workshop',
            'Stock Trading Workshop': 'workshop',
            'PLC Workshop': 'workshop',
            'design-hackathon': 'technical',
        };

        const eventCategory = categoryMap[eventId] || 'general';
        return item.category === eventCategory;
    }) || [];

    // Take first 4 items for compact display
    const displayItems = eventItems.slice(0, 4);

    useEffect(() => {
        if (titleRef.current) {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%",
                    },
                }
            );
        }

        if (sectionRef.current) {
            const items = sectionRef.current.querySelectorAll(".event-gallery-item");
            gsap.fromTo(
                items,
                { opacity: 0, scale: 0.9 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                }
            );
        }
    }, []);

    const openLightbox = (item) => {
        setSelectedImage(item);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = "auto";
    };

    if (displayItems.length === 0) {
        return null;
    }

    return (
        <div className="mt-8 md:mt-12">
            {/* Section Header */}
            <div ref={titleRef} className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-8 bg-main_primary rounded-full"></div>
                    <h3 className="text-xl md:text-2xl font-clash font-semibold text-white">
                        {sectionTitle}
                    </h3>
                </div>
                <p className="text-gray text-sm md:text-base font-chakra ml-4">
                    {sectionSubtitle}
                </p>
            </div>

            {/* Gallery Grid - Adaptive Layout */}
            <div
                ref={sectionRef}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
            >
                {displayItems.map((item, index) => (
                    <div
                        key={item.id}
                        className={`event-gallery-item relative group cursor-pointer rounded-lg md:rounded-xl overflow-hidden ${index === 0 ? 'row-span-2 col-span-2 md:col-span-2 md:row-span-2' : ''
                            }`}
                        onClick={() => openLightbox(item)}
                    >
                        <div className={`relative w-full ${index === 0 ? 'h-full min-h-[250px] md:min-h-[350px]' : 'aspect-[4/3]'}`}>
                            <Image
                                src={item.src}
                                alt={item.caption || "Event image"}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                            />
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                            </div>
                        </div>

                        {/* Caption overlay for first image */}
                        {index === 0 && (
                            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white text-sm md:text-base font-chakra line-clamp-2">
                                    {item.caption}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                    onClick={closeLightbox}
                >
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div
                        className="relative max-w-4xl w-full h-[70vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage.src}
                            alt={selectedImage.caption || "Event image"}
                            fill
                            className="object-contain"
                            sizes="100vw"
                            priority
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                            <p className="text-white text-center font-chakra">
                                {selectedImage.caption}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
