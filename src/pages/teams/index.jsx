import { useState } from "react";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import fsPromises from "fs/promises";
import path from "path";

function Team(props) {
  const [index, setIndex] = useState(0);
  const tabs = props.tabs;
  console.log("tabs", tabs);

  return (
    <div className="h-fit w-screen bg-soothing_black">
      <Head>
        <title>Spoorthi25 - Teams</title>
      </Head>
      <Header id="navbar" />

      <main>
        <div className='h-[15rem] z-20 md:h-[20rem] bg-[url("/banner.png")] object-fill text-white font-clash tracking-wide font-black flex flex-col items-center justify-center'>
          <span className="text-[1rem] pt-12 md:pt-16 md:text-[4.5rem]">
            SPOORTHI' 25
          </span>
          <span className="text-[2.5rem] tracking-wider">TEAM</span>
        </div>

        <div className="text-[.8rem] md:text-[1rem] p-8 font-semibold font-chakra flex gap-4 md:gap-12 items-center justify-center text-white">
          {tabs.map((tab, i) => (
            <span
              key={i}
              className="rounded-full px-4 py-[.3rem] hover:bg-white/20 transition-all duration-500 ease-in-out color"
              style={{ border: index === i ? "1.75px solid  " : "none" }}
              onClick={() => setIndex(i)}
            >
              {tab.name}
            </span>
          ))}
        </div>

        <div className="w-full h-fit pb-10 flex justify-center">
          <div className="flex flex-col gap-1 px-4 lg:px-[4rem] md:pt-6 ">
            {tabs[index].sections.map((section) => (
              <div key={section.id}>
                <h1 className="text-white font-clash uppercase font-semibold text-4xl py-4 pb-8">
                  {section.name}
                </h1>

                <div className="flex flex-wrap justify-evenly gap-6 w-fit h-fit pt-6 rounded-sm">
                  {section.members.map((member) => (
                    <div
                      key={member.id}
                      className=" shadow-2xl hover:shadow-main_primary transition-all duration-500 ease-in-out"
                    >
                      <div>
                        <Image
                          src={member.img}
                          alt={member.name}
                          width={400}
                          height={400}
                          className="object-cover w-[20rem] h-[22rem]"
                        />
                      </div>
                      <div className="flex flex-col p-2 bg-black bg-opacity-20 ">
                        <div>
                          <h1 className=" text-white font-chakra font-semibold text-[1.5rem] pt-4">
                            {member.name}
                          </h1>
                          <p className="text-white font-chakra font-medium text-[1rem]">
                            {member.post}
                          </p>
                        </div>
                        <div className="flex justify-end pb-2">
                          <div
                            className={
                              member.github
                                ? "flex justify-between gap-2 justify-items-end"
                                : "flex justify-end"
                            }
                          >
                            {member.github && (
                              <Link href={`${member.github}`} className="">
                                <FaGithub
                                  size="2rem"
                                  className="text-white hover:text-[#] transition-all duration-500 ease-in-out"
                                />
                              </Link>
                            )}
                            {member.linkedin && (
                              <Link href={`${member.linkedin}`} className="">
                                <FaLinkedin
                                  size="2rem"
                                  className="text-white hover:text-[#] transition-all duration-500 ease-in-out"
                                />
                              </Link>
                            )}
                            {member.insta && (
                              <Link href={`${member.insta}`} className="">
                                <FaInstagram
                                  size="2rem"
                                  className="text-white hover:text-[#] transition-all duration-500 ease-in-out"
                                />
                              </Link>
                            )}
                          </div>
                        </div>
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

export default Team;

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "/teams.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return {
    props: objectData,
  };
}
