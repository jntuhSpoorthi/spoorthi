import React from "react";
import Navlink from "./Navlink";
import Link from "next/link";
import { FiArrowDownRight } from "react-icons/fi";
import { FaInstagram, FaYoutube } from "react-icons/fa";
// import {AiOutlineGlobal} from "react-icons/ai"

export default function Footer() {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <footer className=" h-fit flex flex-col border-gray/40 border-t-[1.5px] bg-soothing_black text-white px-0 flex-wrap overflow-hidden">
      <div className="flex flex-wrap">
        <div className="border-gray/40 border-b-[1.5px] w-full lg:w-[22rem] lg:border-b-0 lg:border-r-[1.5px] flex flex-col p-10 min-w-[18rem] min-h-[14rem] items-start justify-center">
          <p className="font-ibm text-stone-500">Get in Touch</p>
          <Link
            href="mailto:spoorthi@jntuh.ac.in"
            className="font-chakra font-semibold italic text-2xl">
            spoorthi@jntuh.ac.in
          </Link>
        </div>

        <div className="font-chakra grow-[1] text-white/70 md:grow-0 border-gray/40 border-b-[1.5px] sm:border-b-[1.5px] md:border-r-[1.5px] md:border-b-0 min-w-[21rem] xl:min-w-[25rem] flex flex-col gap-5 p-10 justify-center">
          <p className=" font-semibold text-[25px]">Quick Links</p>
          <div className="flex gap-10 text-[17px] font-chakra">
            <div className="flex flex-col gap-2 w-[6rem]">
              <Navlink name={"Home"} link={"/"} />
              <Navlink name={"Events"} link={"/events"} />
              {/* <Navlink name={"Brochure"} link={"/Brochure.pdf"} /> */}
            </div>
            <div className="flex flex-col gap-2">
              <Navlink name={"Team"} link={"/teams"} />
              <Navlink name={"Mentors"} link={"/our-mentors"} />
              {/* <Navlink name={"Contact"} link={"/contact"} /> */}
            </div>
          </div>
        </div>

        <div className="min-w-[18rem] grow-[1] text-white/70">
          <div className="flex font-chakra italic justify-between border-gray/40 border-b-[1.5px] lg:border-t-[1.5px] xl:border-t-0 min-h-[7rem] items-center font-bold text-2xl lg:text-4xl pl-5 pr-4">
            <Navlink name={"#BETHEREORBETHESAME"} link={"/"} />
            <div className="text-white hover:-rotate-90 transform transition-all duration-500 ease-in-out">
              <FiArrowDownRight onClick={scrollToTop} size="4rem"  />
            </div>
          </div>
          <div>
            <div className="flex">
              {/* <Link
                href="https://cearanmula.ac.in/"
                className="social-links flex items-center justify-center grow-[1] min-w-[5rem] min-h-[12rem] hover:text-main_primary"
              >
                <AiOutlineGlobal size="3rem" />
              </Link> */}
              <Link
                href="https://www.instagram.com/spoorthi__2025?igsh=cXNoOWt6em9mcWJ2"
                className="social-links flex items-center justify-center grow-[1] min-w-[5rem] min-h-[12rem] hover:text-main_primary"
              >
                <FaInstagram size="3rem" />
              </Link>
              <Link
                href="https://www.youtube.com/@Spoorthi2024-lm9xm"
                className="social-links flex items-center justify-center grow-[1] min-w-[5rem] min-h-[12rem] hover:text-main_primary"
              >
                <FaYoutube size="3rem" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="font-clash flex justify-between py-2 text-[10px] md:text-xs px-4 border-t-[1.5px] border-gray/40">
        <p>©2025 - SPOORTHI JNTUHUCESTH </p>
        <span className="flex gap-4">
          <p>Developed By SAINAG</p>
        </span>
      </div>
    </footer>
  );
}
