import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Navlink from "./Navlink";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const trigger = useRef(null);
  const aboutspoorthi = useRef(null);
  const aboutjntuh = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      trigger.current,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: trigger.current,
          start: window.innerWidth > 768 ? "top 80%" : "top 20%",
          end: "bottom 80%",

          ease: "power4.eae-InOut",
        },
      }
    );
    // gsap.fromTo(
    //   aboutspoorthi.current,
    //   { opacity: 0, y: 100 },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     scrollTrigger: {
    //       trigger: aboutspoorthi.current,
    //       start: "top 70%",
    //       scrub: true,
    //       ease: "expo.eae-InOut",
    //     },
    //   }
    // );
    // gsap.fromTo(
    //   aboutjntuh.current,
    //   { opacity: 0, y: 100 },
    //   {
    //     opacity: 1,
    //     y: 0,
    //     scrollTrigger: {
    //       trigger: aboutjntuh.current,
    //       start: "top 80%",
    //       end: "bottom 80%",
    //       scrub: true,
    //       ease: "expo.eae-InOut",
    //     },
    // //   }
    // );
  }, []);

  return (
    <div className="h-fit relative pt-4 px-2 xl:px-20  ">
      <div className="about flex flex-wrap text-white tracking-wide xl:tracking-[.5rem]  text-[2.7rem] sm:text-[4.3rem] md:text-[6rem] lg:text-[5.5rem] xl:text-[6.7rem]  leading-[3rem] md:leading-[5rem] font-clash font-bold mt-16">
        <span>You might be</span>
        <span>Thinking what is</span>
        <span
          ref={trigger}
          className="text-[4rem] sm:text-[5.5rem] md:text-[7.5rem] lg:text-[9.5rem] xl:text-[12.5rem] md:mt-4 lg:mt-12"
        >
          <span className="text-main_primary">SPOORTHI</span>
        </span>
        <span className="text-[3.7rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[12rem] md:mt-4 lg:mt-8">
          ?
        </span>
      </div>
      <div className="font-chakra text-base py-8 leading-[5px] xl:mt-4">
        <span
          ref={aboutspoorthi}
          className="text-base font-medium text-white xl:text-xl"
        >
          <b>SPOORTHI'25</b> is a national level Technical Symposium conducted
          by the Department of ECE, JNTUHUCESTH. Spoorthi started in 2004 as
          technical fest and right from its inception, it has received immense
          response from students all over the state. Spoorthi offers a platform
          for stugents to compete with the peers in a myraid of events that test
          their mettle & knowledge in Electronics and Communication Engineering.
          From technical competitions to cultural events <b>SPOORTHI'25</b>{" "}
          offers a diverse range of activities that cater to everyone's
          interests.
        </span>
      </div>
      <div className="absolute font-clash font-bold text-white">
        <span className="flex gap-6 text-[3rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem]">
          About <Navlink name={"JNTUHUCESTH"} link={"/#about"} />{" "}
        </span>
      </div>
      <div
        ref={aboutjntuh}
        className="flex flex-col mt-8 lg:flex-row items-center gap-8 py-8"
      >
        <p className="text-white text-base xl:text-xl font-chakra font-medium">
          Jawaharlal Nehru Technological University of Hyderabad - University
          College of Engineering, Science and Technology Hyderabad, is one of
          the premier engineering colleges in the country. The college maintains
          high standards of education and places emphasis on practical exposure
          along with theoretical knowledge. The college churns hundreds of
          students every year who join the industry to excel in their chosen
          fields while striving for the technological achievement of the
          country.
        </p>

        <video
          src="/About.mp4"
          autoPlay
          loop
          muted
          className="abvideo w-[22rem] h-[20rem] md:w-[24rem] xl:w-[28rem] xl:h-[18rem] object-cover rounded-2xl border border-gray/50"
        ></video>
      </div>
    </div>
  );
}
