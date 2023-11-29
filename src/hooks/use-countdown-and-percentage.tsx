"use client";

import { useEffect, useState } from "react";
import { TokenTimestamps } from "@/types";
import { getPreviousAndNextTimestamp } from "@/utils/timestamps";

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
  nameDayTimestamps: TokenTimestamps,
  isDay: boolean
): number => {
  const { previousNameDayTimestamp, nextNameDayTimestamp } = nameDayTimestamps;
  const currentTimestamp = BigInt(new Date().getTime());
  const sliceCovered = Number(currentTimestamp - previousNameDayTimestamp);
  let totalDuration = Number(nextNameDayTimestamp - previousNameDayTimestamp);
  if (isDay) {
    totalDuration = secondsInDay * 1000;
  }
  const progress = sliceCovered / totalDuration;
  return progress * 100;
};

const getAllStats = (
  nameDayTimestamps: TokenTimestamps,
  time: number,
  nameDayTime: number,
  isDay: boolean
) => {
  const percentage = calculatePercentage(nameDayTimestamps, isDay);
  const timeUnits = calculateTimeUnits(!isDay ? time : nameDayTime);
  return {
    percentage: percentage,
    time: !isDay ? timeUnits : undefined,
    nameDayTime: isDay ? timeUnits : undefined,
    isDay: isDay,
  };
};

const getInitialTimestamp = (
  nameDayTimestamps: TokenTimestamps,
  isDay: boolean
) => {
  let initialTimestamp;
  if (isDay) {
    initialTimestamp = 0;
  } else {
    initialTimestamp = Math.trunc(
      Number(
        nameDayTimestamps.nextNameDayTimestamp - BigInt(new Date().getTime())
      ) / 1000
    );
  }

  return initialTimestamp;
};

const getInitialNameDayTimestamp = (
  nameDayTimestamps: TokenTimestamps,
  isDay: boolean
) => {
  let initialTimestamp;
  if (!isDay) {
    initialTimestamp = 0;
  } else {
    initialTimestamp =
      Number(nameDayTimestamps.nextNameDayTimestamp) / 1000 +
      secondsInDay -
      Math.trunc(new Date().getTime() / 1000);
  }
  return initialTimestamp;
};

/**
 *
 * @param nameDayTimestamps : timestamps of the previous and next name day + isDay: says if we are in the day
 * @param countdownEnd: function to execute when the countdown is finished
 * @param delay: delay between each countdown tick (default: 1000ms)
 * @returns percentage and remaining time
 * if currentTime is in the right day => percentage = 100 and time = 0 => no countdown
 * if currentTime is after the right day => countdown of the next day (of the next year)
 * if currentTime is before the right day => countdown of the right day (of the current year):
 *  the percentage is calculated with the previous and next timestamp: the previous timestamp is the token contract deployement timestamp
 */
export const useCountdownAndPercentage = (
  tokenTimestampData: any,
  tokenBaseTimestampData: any,
  delay: number = 1000
) => {
  const nameDayTimestamps = getPreviousAndNextTimestamp(
    tokenTimestampData,
    tokenBaseTimestampData
  );

  const [isDay, setIsDay] = useState(nameDayTimestamps.isDay);

  const initialTimestamp = getInitialTimestamp(nameDayTimestamps, isDay);
  const [time, setTime] = useState(initialTimestamp);

  const initialNameDayTime = getInitialNameDayTimestamp(
    nameDayTimestamps,
    isDay
  );
  const [nameDayTime, setNameDayTime] = useState(initialNameDayTime);

  // console.log({ isDay, time, nameDayTime });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime == 0 && !isDay) {
          setIsDay(true);
          const newTimestamps = getPreviousAndNextTimestamp(
            tokenTimestampData,
            tokenBaseTimestampData
          );
          setNameDayTime(getInitialNameDayTimestamp(newTimestamps, true));
          setTime(getInitialTimestamp(newTimestamps, true));
        }

        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          return prevTime;
        }
      });

      setNameDayTime((prevTime) => {
        if (prevTime == 0 && isDay) {
          setIsDay(false);
          console.log(nameDayTimestamps);
          const newTimestamps = getPreviousAndNextTimestamp(
            tokenTimestampData,
            tokenBaseTimestampData
          );
          setNameDayTime(getInitialNameDayTimestamp(newTimestamps, false));
          setTime(getInitialTimestamp(newTimestamps, false));
        }

        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          return prevTime;
        }
      });
    }, delay);

    return () => clearInterval(interval);
  }, [
    delay,
    isDay,
    nameDayTimestamps,
    tokenBaseTimestampData,
    tokenTimestampData,
  ]);

  return getAllStats(nameDayTimestamps, time, nameDayTime, isDay);
};
