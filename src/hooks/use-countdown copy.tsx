"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { useEffect, useState } from "react";

// const secondsInDay = 86400;
// const monthsInDay = 30.44 * secondsInDay;
// const secondsInYear = 365.24 * secondsInDay;

const secondsInDay = 86400;
const monthsInDay = 30.44 * secondsInDay;
const secondsInYear = 365.24 * secondsInDay;

interface CountdownResult {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeUnits = (time: number): CountdownResult => {
  const years = Math.floor(time / secondsInYear);
  const remainingMonthsInSeconds = time % secondsInYear;
  const months = Math.floor(remainingMonthsInSeconds / monthsInDay);
  const remainingDaysInSeconds = remainingMonthsInSeconds % monthsInDay;
  const days = Math.floor(remainingDaysInSeconds / secondsInDay);
  const remainingHoursInSeconds = remainingDaysInSeconds % secondsInDay;
  const hours = Math.floor(remainingHoursInSeconds / 3600);
  const remainingMinutesInSeconds = remainingHoursInSeconds % 3600;
  const minutes = Math.floor(remainingMinutesInSeconds / 60);
  const seconds = Math.floor(remainingMinutesInSeconds % 60);

  return { years, months, days, hours, minutes, seconds };
};

const calculatePercentage = (time: number): number => {
  return (time / 86400) * 100;
};

export const useCountdown = (
  initialTimestamp: number,
  countdownEnd: () => void,
  delay: number = 1000
) => {
  const [time, setTime] = useState(initialTimestamp);
  // console.log("time", time);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => {
          return prevTime - 1;
        });
      }
    }, delay);

    if (time == 0) {
      countdownEnd();
    }

    return () => clearInterval(interval);
  }, [countdownEnd, delay, initialTimestamp, time]);

  return calculateTimeUnits(time);
};
