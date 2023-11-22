import Image from "next/image";
import githubIcon from "@/medias/icons/github-mark.svg";
import xIcon from "@/medias/icons/x-twitter.svg";
import lensIcon from "@/medias/icons/lens-icon-T-Green.svg";
import farcasterIcon from "@/medias/icons/farcaster-icon.svg";

export const Footer = () => {
  return (
    <footer className="w-screen flex flex-row justify-between items-center p-4 text-gray-700 font-semibold">
      <a href="https://twitter.com/0xMartinGbz">
        <div className="flex items-center">
          <Image
            src={xIcon}
            alt={"github icon"}
            className="w-3 h-3 md:w-5 md:h-5 md:mr-1"
          />
          <p className="text-xs md:text-base"> @0xMartinGbz </p>
        </div>
      </a>
      <a href="https://hey.xyz/u/martingbz">
        <div className="flex items-center">
          <Image
            src={lensIcon}
            alt={"github icon"}
            className="w-7 h-7 md:w-9 md:h-9"
          />
          <p className="text-xs md:text-base"> martingbz.lens </p>
        </div>
      </a>
      <a href="https://warpcast.com/martingbz">
        <div className="flex items-center">
          <Image
            src={farcasterIcon}
            alt={"github icon"}
            className="w-4 h-4 md:w-6 md:h-6 mr-1 md:mr-2"
          />
          <p className="text-xs md:text-base"> @martingbz </p>
        </div>
      </a>
      <Image
        src={githubIcon}
        alt={"github icon"}
        className="w-5 h-5 md:w-7 md:h-7"
      />
    </footer>
  );
};
