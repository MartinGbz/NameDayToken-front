"use client";

import { getPreviousAndNextTimestamp } from "@/lib/timestamps";
import { useEffect, useState } from "react";

export const useIsDay = (
  tokenTimestampData: bigint,
  tokenBaseTimestampData: bigint
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
