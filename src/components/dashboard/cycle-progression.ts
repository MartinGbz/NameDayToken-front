"use client";

import { useEffect, useState } from "react";

const secondsInDay = 86400 * 1000;
const SECONDS_IN_DAY = BigInt(secondsInDay);

function getDateFromOtherDate(date: Date, yearsToAdd: number) {
  return BigInt(
    new Date(
      new Date().getFullYear() + yearsToAdd,
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    ).getTime()
  );
}

function getPreviousAndNextTimestamp(nameDayTimestamp: bigint) {
  const currentNameDayDate = new Date(Number(nameDayTimestamp) * 1000);
  const currentNameDayTimestamp = nameDayTimestamp * BigInt(1000);
  const currentTimestamp = BigInt(new Date().getTime());

  let nextNameDayTimestamp: bigint;
  let previousNameDayTimestamp: bigint;

  // console.log("currentNameDayTimestamp", currentNameDayTimestamp);
  // console.log("currentTimestamp", currentTimestamp);
  // console.log("SECONDS_IN_DAY", SECONDS_IN_DAY);

  if (currentNameDayTimestamp + SECONDS_IN_DAY < currentTimestamp) {
    // if we are in the future: we compute the correct timestamp of our current "cycle"
    nextNameDayTimestamp = getDateFromOtherDate(currentNameDayDate, 1);
    previousNameDayTimestamp = getDateFromOtherDate(currentNameDayDate, 0);
  } else if (currentTimestamp < currentNameDayTimestamp) {
    // if we are in the past: we compute the correct timestamp of our current "cycle"
    nextNameDayTimestamp = currentNameDayTimestamp;
    // need to put the computation of new Date().getFullYear() minus baseTimeStamp.getFullYear() (from contract) instead of -1
    previousNameDayTimestamp = getDateFromOtherDate(currentNameDayDate, -1);
  } else if (
    currentTimestamp >= currentNameDayTimestamp &&
    currentTimestamp < currentNameDayTimestamp + SECONDS_IN_DAY
  ) {
    // if we are in the right day: we set directly a -1
    console.log("we are in the right day");
    // setPercentageCompleted(-1);
    return {
      previousNameDayTimestamp: BigInt(0),
      nextNameDayTimestamp: BigInt(0),
    };
  } else {
    return null;
  }

  return {
    previousNameDayTimestamp: previousNameDayTimestamp,
    nextNameDayTimestamp: nextNameDayTimestamp,
  };
}

function getCycleProgression(nameDayTimestamp: bigint) {
  // const currentTimestamp = BigInt(new Date().getTime());
  const timestamps = getPreviousAndNextTimestamp(nameDayTimestamp);

  if (timestamps == null) {
    return {
      // percentage: -1,
      // sliceCycleMising: 0,
      previousNameDayTimestamp: BigInt(0),
      nextNameDayTimestamp: BigInt(0),
    };
  }

  if (
    timestamps.previousNameDayTimestamp === BigInt(0) &&
    timestamps.nextNameDayTimestamp === BigInt(0)
  ) {
    return {
      // percentage: 100,
      // sliceCycleMising: 0,
      previousNameDayTimestamp: BigInt(0),
      nextNameDayTimestamp: BigInt(0),
    };
  }

  const { previousNameDayTimestamp, nextNameDayTimestamp } = timestamps;

  // const sliceYearCovered = currentTimestamp - previousNameDayTimestamp;
  // const totalDuration = nextNameDayTimestamp - previousNameDayTimestamp;
  // const progress = Number(sliceYearCovered) / Number(totalDuration);
  // const percentage = progress * 100;

  // const sliceCycleMising =
  //   Number(nextNameDayTimestamp - currentTimestamp) / 1000;
  // // const daysLeft = sliceCycleMising / secondsInDay;
  return {
    // percentage: percentage,
    // sliceCycleMising: sliceCycleMising,
    previousNameDayTimestamp: previousNameDayTimestamp,
    nextNameDayTimestamp: nextNameDayTimestamp,
  };
}

// export const cycleProgression = (nameDayTimestamp: bigint) => {
//   console.log("nameDayTimestamp", nameDayTimestamp);
//   const [cycleProgression, setCycleProgression] = useState({
//     percentage: -1,
//     sliceCycleMising: 0,
//     previousNameDayTimestamp: BigInt(0),
//   });

//   useEffect(() => {
//     const progression = getCycleProgression(nameDayTimestamp);
//     setCycleProgression(progression);
//   }, [nameDayTimestamp]);

//   return cycleProgression;
//   // return getCycleProgression(nameDayTimestamp);
// };

export const cycleProgression = (nameDayTimestamp: bigint) => {
  console.log("nameDayTimestamp", nameDayTimestamp);
  const a = getCycleProgression(nameDayTimestamp);
  console.log("a", a);
  return getCycleProgression(nameDayTimestamp);
};
