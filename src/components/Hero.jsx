import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

function Hero({ siteConfig }) {
  const title = useRef(null);
  const subtitle = useRef(null);
  const subtitle2 = useRef(null);
  const date = useRef(null);
  const render = useRef(null);

  // Get values from siteConfig with fallbacks
  const festName = siteConfig?.festName || "SPOORTHI";
  const currentYear = siteConfig?.currentYear || "2026";
  const collegeShort = siteConfig?.collegeShort || "JNTUHUCESTH";
  const department = siteConfig?.department || "Department of Electronics and Communication Engineering";

  // Parse dates from siteConfig
  const startDate = siteConfig?.festDates?.startDate ? new Date(siteConfig.festDates.startDate) : new Date("2026-04-08");
  const endDate = siteConfig?.festDates?.endDate ? new Date(siteConfig.festDates.endDate) : new Date("2026-04-09");
  const month = startDate.toLocaleString('en-US', { month: 'long' });
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  useEffect(() => {
    //loop the video from 0:03 to 0:06
    render.current.currentTime = 0.5;
    render.current.addEventListener("timeupdate", function () {
      if (this.currentTime > 9) {
        this.currentTime = 0.5;
      }
    });
    gsap.fromTo(
      title.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.5, delay: 0.5 }
    );
    gsap.fromTo(
      subtitle.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.5, delay: 1 }
    );
    gsap.fromTo(
      subtitle2.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.5, delay: 2.5 }
    );
    gsap.fromTo(
      date.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.5, delay: 3 }
    );
  }, []);

  // Helper to get ordinal suffix
  const getOrdinal = (n) => {
    const s = ["TH", "ST", "ND", "RD"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  return (
    <div className="hero relative xl:hidden py-8 h-fit flex flex-col uppercase justify-center">
      <video
        ref={render}
        src="/render.mp4"
        loop
        autoPlay
        muted
        className="absolute top-0 left-0 w-full h-full object-cover bg-slate-300 opacity-50"
      ></video>

      <div className="text-white flex flex-col pt-[8rem] uppercase font-extrabold md:ml-[1rem] lg:ml-[2rem] px-5 ">

        <h1 ref={title} className="font-chakra sm:text-3xl m:text-3xl opacity-0">
          <strong>{collegeShort}</strong>
        </h1>
        <h1 ref={title} className="font-chakra sm:text-2xl opacity-0">
          {department} presents
        </h1>
        <div ref={subtitle} className="font-clash flex flex-wrap opacity-0">
          <span className="text-[4.5rem] sm:text-[6.5rem] md:text-[9rem] lg:text-[9rem]">
            {festName}
          </span>
          <span className="text-main_primary relative top-[-3rem] font-chakra text-stroke-black text-[7rem] md:text-[9rem]">
            {currentYear}
          </span>
        </div>
        <span
          ref={subtitle2}
          className="opacity-0 relative top-[-5rem] text-[3.5rem] sm:text-[5rem] md:text-[7rem] font-clash"
        >
          TECH FEST
        </span>
      </div>

      <div
        ref={date}
        className="relative md:ml-10 opacity-0 flex flex-col font-bold bg-white w-fit text-xl rounded-md text-black p-2 pr-8 ml-[1.5rem] md:text-3xl  z-10"
      >
        <span className="font-chakra">
          {currentYear} <span className="font-clash">{month}</span>
        </span>
        <span className="flex gap-2 text-[2rem] font-chakra font-bold">
          {startDay}
          <b className="text-[16px]">{getOrdinal(startDay)}</b>
          {endDay}
          <b className="text-[16px]">{getOrdinal(endDay)}</b>
        </span>
        <Image
          src="/edgeTriangle.png"
          width={30}
          height={30}
          alt="edgetriangle"
          className="absolute bottom-[-1px] right-[-1px]"
        />
      </div>
    </div>
  );
}

export default Hero;
