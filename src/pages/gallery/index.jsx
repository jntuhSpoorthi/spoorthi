import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GallerySection from "@/components/Gallery2025";
import fsPromises from "fs/promises";
import path from "path";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function GalleryPage({ galleryData, siteConfig }) {
    const headerRef = useRef(null);

    const festName = siteConfig?.festName || "SPOORTHI";
    const currentYear = siteConfig?.currentYear || "2026";
    const galleryTitle = siteConfig?.gallery?.title || galleryData?.title || "PAST FEST MEMORIES";

    useEffect(() => {
        gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, delay: 0.3 }
        );
    }, []);

    return (
        <div className="min-h-screen bg-soothing_black">
            <Head>
                <title>{festName} {currentYear} - Gallery</title>
                <meta name="description" content={`Relive the memories from previous editions of ${festName}`} />
            </Head>

            <Header />

            {/* Hero Banner */}
            <div className='relative h-[18rem] md:h-[24rem] bg-[url("/banner.png")] bg-cover bg-center'>
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-soothing_black"></div>
                <div
                    ref={headerRef}
                    className="relative h-full flex flex-col items-center justify-center text-white font-clash"
                >
                    <span className="text-sm md:text-base font-chakra text-main_primary mb-2">
                        ✨ Memories from our previous editions
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide text-center">
                        {galleryTitle}
                    </h1>
                    <p className="text-lg md:text-xl mt-2 font-chakra text-white/80">
                        Gallery
                    </p>
                </div>
            </div>

            {/* Info Banner */}
            <div className="bg-gradient-to-r from-transparent via-main_primary/10 to-transparent py-4 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-white/80 font-chakra text-sm md:text-base">
                        🎉 <span className="text-main_primary font-semibold">{festName} {currentYear}</span> is coming on{" "}
                        <span className="text-white font-semibold">{siteConfig?.festDates?.displayText || "April 8th & 9th, 2026"}</span>!
                        Browse through our past highlights to see what awaits you.
                    </p>
                </div>
            </div>

            {/* Main Gallery */}
            <main className="pt-8">
                <GallerySection
                    galleryData={galleryData}
                    siteConfig={siteConfig}
                    previewMode={false}
                    showTitle={false}
                />
            </main>

            {/* CTA Section */}
            <section className="py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h3 className="text-2xl md:text-4xl font-clash font-bold text-white mb-4">
                        Ready for <span className="text-main_primary">{festName} {currentYear}</span>?
                    </h3>
                    <p className="text-gray font-chakra mb-8">
                        {siteConfig?.comingSoon?.message || "Event registrations and details will be announced soon. Stay connected!"}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/events"
                            className="px-6 py-3 bg-main_primary text-white font-clash font-semibold rounded-full hover:bg-main_primary/90 transition-all duration-300 hover:scale-105"
                        >
                            View Events
                        </Link>
                        <Link
                            href="/teams"
                            className="px-6 py-3 bg-white/10 text-white font-clash font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
                        >
                            Our Team
                        </Link>
                    </div>
                </div>
            </section>

            <Footer siteConfig={siteConfig} />
        </div>
    );
}

export async function getStaticProps() {
    const galleryFilePath = path.join(process.cwd(), "/galleryConfig.json");
    const galleryJsonData = await fsPromises.readFile(galleryFilePath);
    const galleryData = JSON.parse(galleryJsonData);

    const siteConfigFilePath = path.join(process.cwd(), "/siteConfig.json");
    const siteConfigJsonData = await fsPromises.readFile(siteConfigFilePath);
    const siteConfig = JSON.parse(siteConfigJsonData);

    return {
        props: {
            galleryData,
            siteConfig,
        },
    };
}
