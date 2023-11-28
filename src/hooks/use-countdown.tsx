"use client";

import { useEffect, useState } from "react";
import { TokenTimestamps } from "@/types";

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

const calculatePercentage = (nameDayTimestamps: TokenTimestamps): number => {
  const { previousNameDayTimestamp, nextNameDayTimestamp } = nameDayTimestamps;
  const currentTimestamp = BigInt(new Date().getTime());
  const sliceYearCovered = currentTimestamp - previousNameDayTimestamp;
  const totalDuration = nextNameDayTimestamp - previousNameDayTimestamp;
  const progress = Number(sliceYearCovered) / Number(totalDuration);
  return progress * 100;
};

const getAllStats = (time: number, nameDayTimestamps: TokenTimestamps) => {
  const percentage = calculatePercentage(nameDayTimestamps);
  const timeUnits = calculateTimeUnits(time);
  return { percentage: percentage, time: timeUnits };
};

const getInitialTimestamp = (nameDayTimestamps: TokenTimestamps) => {
  const { nextNameDayTimestamp: nextNameDayTimestamp } = nameDayTimestamps;
  let initialTimestamp;

  if (nameDayTimestamps.isDay) {
    // we end here because we are in the day
    initialTimestamp = 0;
    // return { percentage: 100, time: 0}
  } else {
    initialTimestamp = Math.trunc(
      Number(nextNameDayTimestamp - BigInt(new Date().getTime())) / 1000
    );
  }

  return initialTimestamp;
};

export const useCountdown = (
  nameDayTimestamps: TokenTimestamps,
  countdownEnd: () => void,
  delay: number = 1000
) => {
  let initialTimestamp = getInitialTimestamp(nameDayTimestamps);
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

  // if we in the day we return 100% and 0 time
  if (nameDayTimestamps.isDay) {
    return {
      percentage: 100,
      time: { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 },
    };
  } else {
    return getAllStats(time, nameDayTimestamps);
  }
};