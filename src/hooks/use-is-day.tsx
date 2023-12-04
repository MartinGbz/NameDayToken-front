"use client";

import { getPreviousAndNextTimestamp } from "@/utils/timestamps";
import { useEffect, useState } from "react";

export const useIsDay = (
  tokenTimestampData: any,
  tokenBaseTimestampData: any
) => {
  const [isDay, setIsDay] = useState(
    getPreviousAndNextTimestamp(tokenTimestampData, tokenBaseTimestampData)
      .isDay
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const { isDay: currentIsDay } = getPreviousAndNextTimestamp(
        tokenTimestampData,
        tokenBaseTimestampData
      );
      if (isDay != currentIsDay) {
        setIsDay(currentIsDay);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return isDay;
};
