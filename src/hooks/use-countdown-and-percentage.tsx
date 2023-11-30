"use client";

import { useEffect, useState } from "react";
import { TokenTimestamps } from "@/types";
import { getPreviousAndNextTimestamp } from "@/utils/timestamps";

const secondsInDay = 86400;

interface CountdownResult {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeUnits = (time: number) => {
  const days = Math.floor(time / (24 * 3600));
  const hours = Math.floor((time % (24 * 3600)) / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return { days, hours, minutes, seconds };
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
  cycleTime: number,
  dayTime: number,
  isDay: boolean
) => {
  const percentage = calculatePercentage(nameDayTimestamps, isDay);
  const timeUnits = calculateTimeUnits(!isDay ? cycleTime : dayTime);
  return {
    percentage: percentage,
    cycleTime: !isDay ? timeUnits : undefined,
    dayTime: isDay ? timeUnits : undefined,
    isDay: isDay,
  };
};

/**
 *
 * @param nameDayTimestamps
 * @param isDay
 * @returns the initial timestamp for the countdown (in seconds)
 */
const getInitialTimestamp = (
  nameDayTimestamps: TokenTimestamps,
  isDay: boolean,
  type: "cycle" | "day"
) => {
  let initialTimestamp;

  if (type == "cycle") {
    initialTimestamp = isDay
      ? 0
      : Number(nameDayTimestamps.nextNameDayTimestamp) / 1000 -
        Math.trunc(new Date().getTime() / 1000);
  } else {
    initialTimestamp = !isDay
      ? 0
      : Number(nameDayTimestamps.nextNameDayTimestamp) / 1000 +
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

  const initialCycleTimestamp = getInitialTimestamp(
    nameDayTimestamps,
    isDay,
    "cycle"
  );
  const [cycleTime, setCycleTime] = useState(initialCycleTimestamp);

  const initialNameDayTime = getInitialTimestamp(
    nameDayTimestamps,
    isDay,
    "day"
  );
  const [dayTime, setDayTime] = useState(initialNameDayTime);

  // the useEffect is run 1 time when the hook is called
  // The interval is run every second in parallel of the react rendering
  useEffect(() => {
    const interval = setInterval(() => {
      setCycleTime((prevTime) => {
        if (prevTime == 0 && !isDay) {
          setIsDay(true);
          const newTimestamps = getPreviousAndNextTimestamp(
            tokenTimestampData,
            tokenBaseTimestampData
          );
          setDayTime(getInitialTimestamp(newTimestamps, true, "day"));
          setCycleTime(getInitialTimestamp(newTimestamps, true, "cycle"));
        }

        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          return prevTime;
        }
      });

      setDayTime((prevTime) => {
        if (prevTime == 0 && isDay) {
          setIsDay(false);
          const newTimestamps = getPreviousAndNextTimestamp(
            tokenTimestampData,
            tokenBaseTimestampData
          );
          setDayTime(getInitialTimestamp(newTimestamps, false, "day"));
          setCycleTime(getInitialTimestamp(newTimestamps, false, "cycle"));
        }

        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          return prevTime;
        }
      });
    }, delay);

    // The cleanup function is run when the useEffect is run again (when the dependencies change, when the hook is called again)
    // when isDay changes, the previous useEffect run (at the countdown initialisation) is cleaned (using its cleanup), this will then clean the interval
    // Then the useEffect is run.
    // React Doc: After every re-render with changed dependencies, React will first run the cleanup function (if you provided it) with the old values, and then run your setup function with the new values. After your component is removed from the DOM, React will run your cleanup function.
    // Link: https://react.dev/reference/react/useEffect
    // React previous doc: When exactly does React clean up an effect? React performs the cleanup when the component unmounts. However, as we learned earlier, effects run for every render and not just once. This is why React also cleans up effects from the previous render before running the effects next time. We’ll discuss why this helps avoid bugs and how to opt out of this behavior in case it creates performance issues later below.
    // Link: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    return () => {
      clearInterval(interval);
    };
  }, [delay, isDay, tokenBaseTimestampData, tokenTimestampData]);

  return getAllStats(nameDayTimestamps, cycleTime, dayTime, isDay);
};
