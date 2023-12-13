"use client";

import { useEffect, useState } from "react";
import { TokenTimestamps } from "@/types";
import { getPreviousAndNextTimestamp } from "@/utils/timestamps";

const secondsInDay = 86400;

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
const getNextTimestamp = (
  nameDayTimestamps: TokenTimestamps,
  type: "cycle" | "day"
) => {
  if (type == "cycle") {
    const currentTimestamp =
      Number(nameDayTimestamps.nextNameDayTimestamp) / 1000 -
      Math.trunc(new Date().getTime() / 1000);
    if (currentTimestamp < 1) {
      return { timestamp: 0, isDay: true };
    } else {
      return { timestamp: currentTimestamp, isDay: false };
    }
  } else {
    const currentTimestamp =
      Number(nameDayTimestamps.nextNameDayTimestamp) / 1000 +
      secondsInDay -
      Math.trunc(new Date().getTime() / 1000);
    if (currentTimestamp < 1) {
      return { timestamp: 0, isDay: false };
    } else {
      return { timestamp: currentTimestamp, isDay: true };
    }
  }
};

/**
 *
 * @param nameDayTimestamps : timestamps of the previous and next name day + isDay: says if we are in the day
 * @param countdownEnd: function to execute when the countdown is finished
 * @param delay: delay between each countdown tick (default: 1000ms)
 * @returns percentage and remaining time
 */
export const useCountdownAndPercentage = (
  tokenTimestampData: bigint,
  tokenBaseTimestampData: bigint,
  delay: number = 1000
) => {
  const [, setRender] = useState(false);

  const nameDayTimestamps = getPreviousAndNextTimestamp(
    tokenTimestampData,
    tokenBaseTimestampData
  );

  const { timestamp: initialCycleTimestamp, isDay: isDayCycle } =
    getNextTimestamp(nameDayTimestamps, "cycle");

  const { timestamp: initialNameDayTime } = getNextTimestamp(
    nameDayTimestamps,
    "day"
  );

  // The useEffect is run 1 time when the hook is called
  // The interval is run every second in parallel of the react rendering
  useEffect(() => {
    const interval = setInterval(() => {
      setRender((prevRender) => !prevRender);
    }, delay);

    // The cleanup function is run when the useEffect is run again (when the dependencies change, when the hook is called again)
    // We render the component every second, so initialCycleTimestamp and initialNameDayTime are updated every second
    // When the hook is re-render, the cleanup function is run
    // React Doc: After every re-render with changed dependencies, React will first run the cleanup function (if you provided it) with the old values, and then run your setup function with the new values. After your component is removed from the DOM, React will run your cleanup function.
    // Link: https://react.dev/reference/react/useEffect
    // React previous doc: When exactly does React clean up an effect? React performs the cleanup when the component unmounts. However, as we learned earlier, effects run for every render and not just once. This is why React also cleans up effects from the previous render before running the effects next time.
    // Link: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    return () => {
      clearInterval(interval);
    };
  }, [delay]);

  return getAllStats(
    nameDayTimestamps,
    initialCycleTimestamp,
    initialNameDayTime,
    isDayCycle
  );
};
