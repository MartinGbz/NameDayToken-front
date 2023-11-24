"use client";

import Image from "next/image";
import lensIconBlack from "@/medias/icons/lens-icon-T-Black.svg";
import lensIconWhite from "@/medias/icons/lens-icon-T-White.svg";
import farcasterIcon from "@/medias/icons/farcaster-icon.svg";
import { IoLogoGithub } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { useTheme } from "next-themes";

export const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className="w-screen flex flex-row justify-between items-center p-4 text-gray-700 dark:text-gray-200 font-semibold">
      <a href="https://twitter.com/0xMartinGbz">
        <div className="flex items-center">
          <FaXTwitter className="text-black dark:text-white w-4 h-4 md:w-5 md:h-5 mr-1" />
          <p className="text-xs md:text-base"> @0xMartinGbz </p>
        </div>
      </a>
      <a href="https://hey.xyz/u/martingbz">
        <div className="flex items-center">
          {theme === "light" && (
            <Image
              src={lensIconBlack}
              alt={"github icon"}
              className="w-7 h-7 md:w-9 md:h-9"
            />
          )}
          {theme !== "light" && (
            <Image
              src={lensIconWhite}
              alt={"github icon"}
              className="w-7 h-7 md:w-9 md:h-9"
            />
          )}
          <p className="text-xs md:text-base"> martingbz.lens </p>
        </div>
      </a>
      <a href="https://warpcast.com/martingbz">
        <div className="flex items-center">
          <Image
            src={farcasterIcon}
            alt={"github icon"}
            className="w-4 h-4 md:w-6 md:h-6 mr-2"
          />
          <p className="text-xs md:text-base"> @martingbz </p>
        </div>
      </a>
      <IoLogoGithub className="text-black dark:text-white w-4 h-4 md:w-7 md:h-7" />
    </footer>
  );
};
