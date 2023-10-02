"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, button } from "@nextui-org/react";

interface ILink {
  href: string;
  value: string;
}

const navLinks: ILink[] = [
  { href: "/creators", value: "Creator's" },
  { href: "/top", value: "Top-Titles" },
  { href: "/series", value: "Series" },
];

const Navbar = () => {
  const path = usePathname();
  const router = useRouter();

  const [scrolling, setScrolling] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } /* else if (window.scrollY > 0 && scrolling == false) {
        setScrolling(true);
      } */ else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`relative inset-x-0 top-0 z-10 w-screen flex justify-center `}
    >
      <nav
        className={`flex items-center lg:px-6 h-[4.5rem] mt-0.5
        aria-label="Global" transition-all duration-500 ${
          scrolling
            ? "fixed p-2 md:px-4 justify-between md:justify-evenly  lg:justify-evenly  border-white/40  bg-white/10  text-white w-[95%] sm:w-[90%] md:w-[90%] lg:w-[80%] m-auto rounded-b-xl shadow-xl shadow-black/[0.05] backdrop-blur-[0.5rem] h-[3.5rem] gap-16  "
            : "bg-transparent text-white justify-between absolute p-6 w-full"
        }
      }   `}
      >
        <div className="flex lg:flex-1 flex-row items-center cursor-pointer gap-2">
          <Link
            href="/"
            className="flex flex-row items-center justify-between gap-1 "
          >
            <span className="sr-only ">Operax</span>
            <img
              id="image"
              className="h-[30px] w-[30px] z-10"
              src="logo.png"
              alt="logo_img"
            />
            <label
              htmlFor="image"
              className={`${
                scrolling ? "hidden" : "font-bold text-xl cursor-pointer z-10 "
              }  `}
            >
              Operax
            </label>
          </Link>
        </div>

        {/**
         * Desktop Navilnks & Log In --Should Only be visible in
         * Desktop $ Tablet
         */}
        {/**
          *
        <div className="hidden lg:flex lg:gap-x-4 md:flex md:gap-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-semibold leading-6 mx-2 cursor-pointer md:text-sm `}
            >
              <div
                className={`${
                  path == link.href
                    ? "bg-white/10 px-2 flex items-center rounded-lg"
                    : ""
                }`}
              >
                {link.value}
              </div>
            </Link>
          ))}
        </div>
        */}
        <div className="hidden lg:flex lg:gap-x-4 md:flex md:gap-x-4">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="light"
              size="sm"
              onClick={() => router.push(link.href)}
              className={`font-semibold  mx-2 cursor-pointer md:text-sm`}
            >
              <div
                className={`${
                  path == link.href
                    ? "bg-white/10 px-2 py-2 flex items-center rounded-lg"
                    : ""
                }`}
              >
                {link.value}
              </div>
            </Button>
          ))}
        </div>

        <div
          className={`lg:flex lg:flex-1 lg:justify-end md:flex cursor-pointer flex `}
        >
          <Link
            href="#"
            className={`font-semibold leading-6
         `}
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/**Mobile navlinks */}
      </nav>
    </header>
  );
};

export default Navbar;
