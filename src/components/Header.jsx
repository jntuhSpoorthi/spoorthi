import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Slant as Hamburger } from "hamburger-react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Navlink from "@/components/Navlink";
export default function Header() {
  const [isVisible, setIsVisible] = React.useState(true);
  const [isOpen, setOpen] = React.useState(false);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  
  const router = useRouter();

  const getActiveClass = (path) => {
    return router.pathname === path
      ? "bg-main_primary text-white" // Apply active styles
      : "text-white"; // Default styles
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
  
      // If user is scrolling up, open the menu and make navbar visible
      if (currentScrollY < lastScrollY) {
        setOpen(false); // Open the menu if scrolling up
        setIsVisible(true); // Make the navbar visible
      }
      // If user is scrolling down, hide the navbar but do not affect the menu
      else if (currentScrollY > window.innerHeight) {
        setIsVisible(false); // Hide navbar when scrolling down
      }
  
      // Update last scroll position
      setLastScrollY(currentScrollY);
    };
  
    window.addEventListener("scroll", handleScroll, { passive: true });
  
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  
  


  return (
    <>
      <header
        className="w-full h-[4.5rem] flex items-center py-2 fixed z-[25] border-b-[1.5px] bg-soothing_black/60 border-gray/40 backdrop-blur-md transition-all duration-300 ease-in-out"
        style={{ transform: isVisible ? "translateY(0)" : "translateY(-100%)" }}
      >
        <div
          className="ml:2 md:ml-4 z-[26]"
          style={{ opacity: isOpen ? 0 : 1 }}
        >
          <Hamburger
            color="white"
            label="Show menu"
            direction="right"
            size={25}
            rounded={true}
            toggle={setOpen}
            toggled={isOpen}
          />
        </div>

        <Link
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 hover:scale-110 z-50 transition duration-300 ease-in-out"
          href="/"
        >
          <Image
            src="/favicon.png"
            width={100}
            height={100}
            alt="logo"
            className="opacity-80"
          />
        </Link>

        <progress max="100" value="0"></progress>
      </header>

      {isOpen && (
        <motion.div
          className="fixed top-0 menuPop left-0 w-[65vh] h-screen md:h-[95vh] md:ml-8 md:my-4 bg-black z-[26] backdrop-blur-sm rounded-xl border-[2px] border-gray/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative flex flex-col">
            <div className="pl-4 z-[26] h-[4.5rem] flex items-center border-[1.5px] rounded-t-xl bg-black border-gray/40">
              <Hamburger
                color="white"
                label="Show menu"
                direction="right"
                size={50}
                rounded={true}
                toggle={setOpen}
                toggled={isOpen}
              />
              <div className="ml-4 border-l-[1.5px] border-gray/40 h-full"></div>
            </div>
            
            <div className="text-5xl font-clash font-black flex flex-col mt-14 ml-8 md:mt-12 gap-4">
              <div
                className={`relative ${getActiveClass(
                  "/"
                )} w-fit text-left pl-2 pr-4 py-1 rounded-[4px]`}
              >
                <Navlink name={"HOME"} link={"/"} setToggle={setOpen} />
              </div>

              <div
                className={`relative ${getActiveClass(
                  "/events"
                )} w-fit text-left pl-2 pr-4 py-1 rounded-[4px]`}
              >
                <Navlink name={"EVENTS"} link={"/events"} setToggle={setOpen} />
              </div>

              <div
                className={`relative ${getActiveClass(
                  "/our-mentors"
                )} w-fit text-left pl-2 pr-4 py-1 rounded-[4px]`}
              >
                <Navlink
                  name={"MENTORS"}
                  link={"/our-mentors"}
                  setToggle={setOpen}
                />
              </div>

              <div
                className={`relative ${getActiveClass(
                  "/teams"
                )} w-fit text-left pl-2 pr-4 py-1 rounded-[4px]`}
              >
                <Navlink name={"TEAMS"} link={"/teams"} setToggle={setOpen} />
              </div>

              <div
                className={`relative ${getActiveClass(
                  "/sponsors"
                )} w-fit text-left pl-2 pr-4 py-1 rounded-[4px]`}
              >
                <Navlink
                  name={"SPONSORS"}
                  link={"/sponsors"}
                  setToggle={setOpen}
                />
              </div>

              <div
                className={`relative ${getActiveClass(
                  "/#about"
                )} w-fit text-left pl-2 pr-4 py-1 rounded-[4px]`}
              >
                <Navlink name={"ABOUT"} link={"/#about"} setToggle={setOpen} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
