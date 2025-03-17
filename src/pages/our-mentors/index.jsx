import Head from "next/head";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import fsPromises from "fs/promises";
import path from "path";

function Team(props) {
  const sections = props.sections;
  

  return (
    <div className="h-fit w-screen bg-soothing_black">
      <Head>
        <title>Spoorthi25 - Mentors</title>
      </Head>
      <Header id="navbar" />

      <main>
        <div className='h-[15rem] z-20 md:h-[20rem] bg-[url("/banner.png")] object-fill text-white font-clash tracking-wide font-black flex flex-col items-center justify-center'>
          <span className="text-[1rem] pt-12 md:pt-16 md:text-[4.5rem]">
            SPOORTHI' 25
          </span>
          <span className="text-[2.5rem] tracking-wider">OUR MENTORS</span>
        </div>
        <div className="w-full h-fit pb-10 flex justify-center">
          <div className="flex flex-col gap-10 px-4 lg:px-[6rem] md:pt-6 ">
            {sections.map((section) => (
              <div key={section.id}>
                <h1 className="text-white font-clash uppercase font-semibold text-4xl py-4 pb-8">
                  {section.name}
                </h1>
                <div className="flex flex-wrap justify-evenly gap-16 w-fit h-fit pt-6 rounded-sm">
                  {section.members.map((member) => (
                    <div
                      key={member.id}
                      className=" shadow-2xl hover:shadow-main_primary transition-all duration-500 ease-in-out"
                    >
                      <div>
                        <Image
                          src={member.img}
                          alt={member.name}
                          width={300}
                          height={300}
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
  const filePath = path.join(process.cwd(), "/mentors.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return {
    props: objectData,
  };
}
