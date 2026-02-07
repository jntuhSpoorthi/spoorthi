import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import fsPromises from "fs/promises";
import path from "path";
import { gsap } from "gsap";
import PastEventGallery from "@/components/PastEventGallery";
import { ComingSoonBanner } from "@/components/ComingSoonBadge";

function EventsDetails(props) {
  const card = React.useRef(null);
  const title = React.useRef(null);
  const subtitle = React.useRef(null);

  // Get siteConfig values
  const siteConfig = props.siteConfig || {};
  const festName = siteConfig.festName || "SPOORTHI";
  const currentYear = siteConfig.currentYear || "2026";
  const festDates = siteConfig.festDates?.displayText || "April 8th & 9th, 2026";
  const comingSoonMessage = siteConfig.comingSoon?.message || "Event details and registrations will be updated soon.";

  React.useEffect(() => {
    gsap.fromTo(
      subtitle.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2 }
    );
    gsap.fromTo(
      title.current,
      { opacity: 0, y: 5 },
      { opacity: 1, y: 0, duration: 1, delay: 0.7 }
    );
    gsap.fromTo(
      card.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.7, ease: "back.out(1.7)" }
    );
  }, []);

  // Check if event has details (for coming soon state)
  const hasDetails = props.description && props.description.trim() !== "";

  return (
    <>
      <Head>
        <title>{props.title} - {festName} {currentYear}</title>
        <meta name="description" content={`${props.title} at ${festName} ${currentYear} - National Level Technical Symposium`} />
      </Head>
      <section className="min-h-screen bg-black">
        <Header />

        {/* Coming Soon Banner */}
        {siteConfig.comingSoon?.enabled && (
          <div className="pt-[4.5rem]">
            <ComingSoonBanner message={`🎉 ${festName} ${currentYear} is coming on ${festDates}! ${comingSoonMessage}`} />
          </div>
        )}

        <div className={`h-fit pt-8 p-4 md:p-6 bg-black text-white ${!siteConfig.comingSoon?.enabled ? 'pt-[6rem]' : ''}`}>
          <div className="flex flex-col items-center max-w-6xl mx-auto">
            <p
              className="text-lg md:text-xl font-medium font-clash text-center text-main_primary"
              ref={subtitle}
            >
              {festName} {currentYear} presents
            </p>
            <h1
              className="text-[2.5rem] md:text-[3rem] xl:text-[4rem] font-clash font-semibold text-center"
              ref={title}
            >
              {props.title}
            </h1>

            {/* Main Event Card */}
            <div
              className="flex flex-col mt-6 md:mt-8 md:flex-row rounded-xl md:rounded-2xl overflow-hidden justify-between w-full font-clash bg-gray/25"
              ref={card}
            >
              {/* Event Image */}
              <div className="relative w-full md:w-[45%] aspect-[4/5] md:aspect-auto">
                <Image
                  src={props.image}
                  alt={props.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>

              {/* Event Details */}
              <div className="relative flex flex-col justify-between w-full md:w-[55%] p-4 md:p-8 gap-8 md:gap-12">
                <div className="flex flex-col gap-3">
                  {/* Decorative circles */}
                  <div className="flex relative pb-2">
                    <div className="w-6 h-6 md:w-8 md:h-7 bg-main_primary rounded-full border-[2px] border-main_primary/70"></div>
                    <div className="absolute left-3 md:left-4 w-6 h-6 md:w-8 md:h-7 rounded-full border-[2px] border-white/70"></div>
                  </div>

                  {/* Content */}
                  <h3 className="font-medium text-xl md:text-2xl pb-2 text-white/90">
                    {props.content || "Event details coming soon..."}
                  </h3>

                  {hasDetails ? (
                    <p className="text-white/80 text-sm md:text-base leading-relaxed">
                      {props.description}
                    </p>
                  ) : (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <p className="text-white/60 text-sm md:text-base">
                        📢 Detailed information for SPOORTHI 2026 will be announced soon.
                        Check out our 2025 gallery below to see what this event looks like!
                      </p>
                    </div>
                  )}

                  {/* Event Info Grid */}
                  <div className="grid grid-cols-2 pt-4 md:pt-6 text-sm md:text-[1.1rem] tracking-wide w-fit font-medium gap-y-1">
                    <div className="flex flex-col pr-4 text-white/70">
                      {props.pricepool != false && <span>Prize Pool :</span>}
                      {props.regfee != false && <span>Reg Fee :</span>}
                      <span>Event Date :</span>
                    </div>
                    <div className="flex flex-col text-white font-bold">
                      {props.pricepool != false && (
                        <span className="font-normal"> ₹{props.pricepool}</span>
                      )}
                      {props.regfee != false && (
                        <span className="font-normal"> ₹{props.regfee}</span>
                      )}
                      <span className="font-normal text-main_primary"> April 8-9, 2026</span>
                    </div>
                  </div>

                  {/* Coordinator Details */}
                  <h3 className="text-white text-lg md:text-xl font-sans font-bold mb-1 mt-4">
                    Coordinator Details
                  </h3>

                  <div className="flex gap-2 text-sm md:text-[1.1rem] tracking-wide w-fit font-medium">
                    <div className="flex flex-col pr-4 text-white/70">
                      <span>{props.c1name} :</span>
                      {props.c2name != false && <span>{props.c2name} :</span>}
                    </div>
                    <div className="flex flex-col text-white font-bold">
                      <Link href={`tel:${props.c1number}`}>
                        <span className="font-normal hover:text-main_primary transition duration-300 ease-in-out">
                          {props.c1number}
                        </span>
                      </Link>
                      {props.c2number && (
                        <Link href={`tel:${props.c2number}`}>
                          <span className="font-normal hover:text-main_primary transition duration-300 ease-in-out">
                            {props.c2number}
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {/* Registration Button */}
                <button
                  className="bg-main_primary text-white w-full rounded-full p-3 md:p-4 font-semibold text-base md:text-lg hover:bg-main_primary/80 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => {
                    if (props.reglink && props.reglink !== 404) {
                      window.open(props.reglink);
                    }
                  }}
                  disabled={!props.reglink || props.reglink === 404}
                >
                  {props.reg || "Registration Opens Soon"}
                </button>
              </div>
            </div>

            {/* Guidelines Section */}
            {props.rulehead && props.rulehead !== "" && props.rulehead !== false && (
              <div className="font-clash flex flex-col mt-6 md:mt-8 p-4 md:p-6 rounded-xl md:rounded-2xl justify-between w-full bg-gray/25">
                <h2 className="font-semibold text-2xl md:text-3xl text-main_primary">{props.rulehead}</h2>
                <div className="flex flex-col gap-2 pt-4 text-base md:text-lg text-white/90">
                  {props.rule1 && props.rule1 !== "" && <p>{props.rule1}</p>}
                  {props.rule2 && props.rule2 !== "" && <p>{props.rule2}</p>}
                  {props.rule3 && props.rule3 !== "" && <p>{props.rule3}</p>}
                  {props.rule4 && props.rule4 !== "" && <p>{props.rule4}</p>}
                  {props.rule5 && props.rule5 !== "" && <p>{props.rule5}</p>}
                  {props.rule6 && props.rule6 !== "" && <p>{props.rule6}</p>}
                  {props.rule7 && props.rule7 !== "" && <p>{props.rule7}</p>}
                  {props.rule8 && props.rule8 !== "" && <p>{props.rule8}</p>}
                  {props.rule9 && props.rule9 !== "" && <p>{props.rule9}</p>}
                  {props.rule10 && props.rule10 !== "" && <p>{props.rule10}</p>}
                  {props.rule11 && props.rule11 !== "" && <p>{props.rule11}</p>}
                  {props.rule12 && props.rule12 !== "" && <p>{props.rule12}</p>}
                  {props.rule13 && props.rule13 !== "" && <p>{props.rule13}</p>}
                </div>
              </div>
            )}

            {/* Past Event Gallery Section */}
            <div className="w-full mt-4">
              <PastEventGallery
                eventId={props.eventId}
                galleryData={props.galleryData}
                siteConfig={siteConfig}
              />
            </div>

            {/* Back to Events Link */}
            <div className="mt-8 md:mt-12">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-clash font-medium rounded-full hover:bg-white/20 transition duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to All Events
              </Link>
            </div>
          </div>
        </div>

        <Footer siteConfig={siteConfig} />
      </section>
    </>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "/events.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  const paths = [];
  objectData.posts.forEach((post) => {
    post.forEach((post) => {
      paths.push({ params: { id: post.id.toString() } });
    });
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), "/events.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  const galleryFilePath = path.join(process.cwd(), "/galleryConfig.json");
  const galleryJsonData = await fsPromises.readFile(galleryFilePath);
  const galleryData = JSON.parse(galleryJsonData);

  const siteConfigFilePath = path.join(process.cwd(), "/siteConfig.json");
  const siteConfigJsonData = await fsPromises.readFile(siteConfigFilePath);
  const siteConfig = JSON.parse(siteConfigJsonData);

  const id = context.params.id;

  const post = objectData.posts.flat().find((post) => post.id == id);

  return {
    props: {
      eventId: id,
      title: post.title,
      image: post.img,
      content: post.content,
      description: post.description,
      c1name: post.c1name,
      c1number: post.c1no,
      c2name: post.c2name,
      c2number: post.c2no,
      regfee: post.regfee,
      pricepool: post.pricepool,
      enddate: post.enddate,
      register: post.reg,
      reglink: post.reglink,
      reg: post.reg,
      rulehead: post.ruleheader,
      rule1: post.rules.rule1,
      rule2: post.rules.rule2,
      rule3: post.rules.rule3,
      rule4: post.rules.rule4,
      rule5: post.rules.rule5,
      rule6: post.rules.rule6,
      rule7: post.rules.rule7,
      rule8: post.rules.rule8,
      rule9: post.rules.rule9,
      rule10: post.rules.rule10,
      rule11: post.rules.rule11,
      rule12: post.rules.rule12,
      rule13: post.rules.rule13,
      galleryData,
      siteConfig,
    },
  };
}

export default EventsDetails;
