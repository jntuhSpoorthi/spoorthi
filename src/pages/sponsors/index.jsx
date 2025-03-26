import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import fsPromises from "fs/promises";
import path from "path";


function Sponsors( props ) {
  const [index, setIndex] = useState(0);
  const tabs = props.tabs;
  return (
    <div className="h-fit w-screen bg-soothing_black">
      <Head>
        <title>Spoorthi25 - Sponsors</title>
      </Head>
      <Header id="navbar" />
      <main>
        <div className='h-[15rem] z-20 md:h-[20rem] bg-[url("/banner.png")] object-fill text-white font-clash tracking-wide font-black flex flex-col items-center justify-center'>
          <span className="text-[1rem] pt-12 md:pt-16 md:text-[4.5rem]">
            SPOORTHI' 25
          </span>
          <span className="text-[2.5rem] tracking-wider">OUR SPONSORS</span>
        </div>
        <div className="w-full h-fit pb-10 flex justify-center items-center">
          <div className="flex flex-col gap-10 px-4 lg:px-[6rem] md:pt-6 items-center">
            {tabs[index].sections.map((section) => (
              <div key={section.id}>
                <h1 className="text-white font-clash uppercase font-semibold text-4xl py-4 pb-8">
                  {section.name}
                </h1>
                <div className="flex flex-wrap justify-evenly gap-16 w-fit h-fit pt-6 rounded-sm">
                  {section.members.map((member) => (
                    <div 
                      key={member.id} 
                      className="group relative w-[20rem] h-[22rem] overflow-hidden  transition-all duration-500 ease-in-out"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image 
                          src={member.img} 
                          alt={member.name} 
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Sponsors;

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "/sponsors.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);
  return { 
    props: objectData, 
  };
}