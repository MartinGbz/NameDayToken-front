"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { use, useEffect, useState } from "react";
import { TokenTimestamps } from "@/types";

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

const calculatePercentage = (
  time: number,
  nameDayTimestamps: {
    previousNameDayTimestamp: bigint;
    nextNameDayTimestamp: bigint;
  }
): number => {
  const { previousNameDayTimestamp, nextNameDayTimestamp } = nameDayTimestamps;
  const currentTimestamp = BigInt(new Date().getTime());
  const sliceYearCovered = currentTimestamp - previousNameDayTimestamp;
  const totalDuration = nextNameDayTimestamp - previousNameDayTimestamp;
  const progress = Number(sliceYearCovered) / Number(totalDuration);
  return progress * 100;
};

const getAllStats = (time: number, nameDayTimestamps: TokenTimestamps) => {
  const percentage = calculatePercentage(time, nameDayTimestamps);
  const timeUnits = calculateTimeUnits(time);
  return { percentage: percentage, time: timeUnits };
};

export const useCountdown = (
  nameDayTimestamps: {
    previousNameDayTimestamp: bigint;
    nextNameDayTimestamp: bigint;
  },
  countdownEnd: () => void,
  delay: number = 1000
) => {
  const { previousNameDayTimestamp, nextNameDayTimestamp } = nameDayTimestamps;
  let initialTimestamp;

  if (
    previousNameDayTimestamp == BigInt(0) &&
    nextNameDayTimestamp == BigInt(0)
  ) {
    initialTimestamp = 0;
  } else {
    initialTimestamp = Math.trunc(
      Number(nextNameDayTimestamp - BigInt(new Date().getTime())) / 1000
    );
  }

  const [time, setTime] = useState(initialTimestamp);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => {
          return prevTime - 1;
        });
      }
    }, delay);

    // counter finihed
    if (time == 0) {
      countdownEnd();
    }

    return () => clearInterval(interval);
  }, [countdownEnd, delay, time]);

  return getAllStats(time, nameDayTimestamps);
};
