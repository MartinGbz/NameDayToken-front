"use client";

import { useCountdown } from "@/hooks/use-countdown";
import { useState } from "react";

interface CountdownProps {
  currentTime: any;
}

export const Countdown = ({ currentTime }: CountdownProps) => {
  const { years, months, days, hours, minutes, seconds } = currentTime;
  const [countdownEnd, setCountdownEnd] = useState(false);
  // const { years, months, days, hours, minutes, seconds } = useCountdown(
  //   targetTime,
  //   () => {
  //     console.log("FINISHED");
  //     setCountdownEnd(true);
  //   }
  // );

  return (
    // !countdownEnd && (
    <span className="text-red-500">
      {years} years {months} months {days} days {hours} hours {minutes} minutes{" "}
      {seconds} seconds
    </span>
  );
  // );
};
