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

export const useCountdown = (
  targetTime: number,
  countdownEnd: () => void,
  delay: number = 1000
) => {
  const [time, setTime] = useState(targetTime);

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

  return calculateTimeUnits(time);
};
