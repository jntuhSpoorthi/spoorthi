import { useRef, useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Video from "@/components/Video";
import About from "@/components/About";
import Marque2 from "@/components/Marque2";
import Footer from "@/components/Footer";
import Clock from "@/components/Clock";
import Map from "@/components/Map";
import GallerySection from "@/components/Gallery2025";
import Souvenir from "@/components/Souvenir";
import gsap from "gsap";
import fsPromises from "fs/promises";
import path from "path";
import RitModel from "@/components/RitModel";

const Home = ({ galleryData, siteConfig }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    gsap.fromTo(
      stagger.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.5 }
    );
  }, []);

  const stagger = useRef(null);

  // Get values from siteConfig
  const festName = siteConfig?.festName || "SPOORTHI";
  const currentYear = siteConfig?.currentYear || "2026";
  const tagline = siteConfig?.tagline || "National Level Technical Symposium";
  const festDates = siteConfig?.festDates?.displayText || "April 8th & 9th, 2026";

  return (
    <div className="bg-black h-fit">
      <Head>
        <title>{festName} {currentYear}</title>
        <meta name="description" content={`${festName} ${currentYear} - ${tagline} by ECE Department, JNTUHUCESTH. ${festDates}`} />
      </Head>

      <Header id="navbar" />

      <section id="hero">
        <div
          ref={stagger}
          className="hidden xl:block italic relative w-full text-center top-[7rem] z-[10]"
        >
          <p className="text-white pl-[1.5rem] top-[6rem] uppercase font-clash font-bold text-[2.5rem] tracking-wide">
            {siteConfig?.college || "JNTUH UNIVERSITY COLLEGE OF ENGINEERING SCIENCE AND TECHNOLOGY HYDERABAD"}
          </p>
          <p className="text-white pl-[1.5rem] top-[6rem] uppercase font-clash font-bold text-[2.5rem] tracking-wide">
            {siteConfig?.department || "DEPARTMENT OF ELECTRONICS AND COMMUNICATION ENGINEERING"}
          </p>
          <p className="text-white font-clash text-xl">PRESENTS</p>
        </div>

        <div>
          <Hero siteConfig={siteConfig} />
          <Video />
        </div>
      </section>

      {isLoaded && <Clock siteConfig={siteConfig} />}

      <div className="bg-gradient-to-b from-primary to-transparent">
        <RitModel />
        <section id="about">
          <About siteConfig={siteConfig} />
        </section>
      </div>

      {/* Gallery Preview Section */}
      <section id="gallery" className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-soothing_black/80 to-soothing_black pointer-events-none"></div>
        <GallerySection
          galleryData={galleryData}
          siteConfig={siteConfig}
          previewMode={true}
          maxItems={8}
          showTitle={true}
        />
      </section>

      {/* Souvenir Section - Only shows if enabled in siteConfig */}
      <Souvenir siteConfig={siteConfig} />

      <Marque2 />

      <Map />
      <Footer siteConfig={siteConfig} />
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const dataFilePath = path.join(process.cwd(), "/data.json");
  const dataJsonData = await fsPromises.readFile(dataFilePath);
  const objectData = JSON.parse(dataJsonData);

  const galleryFilePath = path.join(process.cwd(), "/galleryConfig.json");
  const galleryJsonData = await fsPromises.readFile(galleryFilePath);
  const galleryData = JSON.parse(galleryJsonData);

  const siteConfigFilePath = path.join(process.cwd(), "/siteConfig.json");
  const siteConfigJsonData = await fsPromises.readFile(siteConfigFilePath);
  const siteConfig = JSON.parse(siteConfigJsonData);

  return {
    props: {
      ...objectData,
      galleryData,
      siteConfig,
    },
  };
}
