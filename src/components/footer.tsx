"use client";

import Image from "next/image";
import lensIconBlack from "@/medias/icons/lens-icon-T-Black.svg";
import lensIconWhite from "@/medias/icons/lens-icon-T-White.svg";
import farcasterIconWhite from "@/medias/icons/farcaster-icon-white.svg";
import farcasterIconBlack from "@/medias/icons/farcaster-icon-black.svg";
import { IoLogoGithub } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { useTheme } from "next-themes";

export const Footer = () => {
  const { theme, systemTheme } = useTheme();

  return (
    <footer className="w-screen flex flex-row justify-between items-center p-4 text-gray-700 dark:text-gray-200 font-semibold">
      <a href="https://twitter.com/0xMartinGbz" target="_blank">
        <div className="flex items-center">
          <FaXTwitter className="text-black dark:text-white w-4 h-4 md:w-5 md:h-5 mr-1" />
          <p className="text-xs md:text-base"> 0xMartinGbz </p>
        </div>
      </a>
      <a href="https://hey.xyz/u/martingbz" target="_blank">
        <div className="flex items-center">
          {theme == "dark" || (theme == "system" && systemTheme == "dark") ? (
            <Image
              src={lensIconWhite}
              alt={"lens icon"}
              className="w-7 h-7 md:w-9 md:h-9"
            />
          ) : (
            <Image
              src={lensIconBlack}
              alt={"lens icon"}
              className="w-7 h-7 md:w-9 md:h-9"
            />
          )}
          <p className="text-xs md:text-base"> martingbz.lens </p>
        </div>
      </a>
      <a href="https://warpcast.com/martingbz" target="_blank">
        <div className="flex items-center">
          {theme == "dark" || (theme == "system" && systemTheme == "dark") ? (
            <Image
              src={farcasterIconWhite}
              alt={"farcaster icon"}
              className="w-5 h-5 md:w-6 md:h-6 mr-1"
            />
          ) : (
            <Image
              src={farcasterIconBlack}
              alt={"farcaster icon"}
              className="w-5 h-5 md:w-6 md:h-6 mr-1"
            />
          )}
          <p className="text-xs md:text-base"> martingbz </p>
        </div>
      </a>
      <a href="https://github.com/MartinGbz/NameDayToken-front" target="_blank">
        <IoLogoGithub className="text-black dark:text-white w-4 h-4 md:w-7 md:h-7" />
      </a>
    </footer>
  );
};
