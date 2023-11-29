const secondsInDay = 86400 * 1000;
const SECONDS_IN_DAY = BigInt(secondsInDay);

function getDateFromOtherDate(date: Date, year: number) {
  return BigInt(
    new Date(
      year,
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    ).getTime()
  );
}

export function getPreviousAndNextTimestamp(
  nameDayTimestamp: bigint,
  nameDayBaseTimestamp: bigint
) {
  const currentNameDayDate = new Date(Number(nameDayTimestamp) * 1000);
  const currentNameDayTimestamp = nameDayTimestamp * BigInt(1000);
  const currentNameDayTimestamp0 = getDateFromOtherDate(currentNameDayDate, 0);

  const currentNameDayBaseTimestamp = nameDayBaseTimestamp * BigInt(1000);

  const currentDate = new Date();
  const currentTimestamp = BigInt(new Date().getTime());
  const currentTimestamp0 = getDateFromOtherDate(new Date(), 0);

  let nextNameDayTimestamp: bigint;
  let previousNameDayTimestamp: bigint;
  let isDay: boolean;

  if (
    currentTimestamp0 >= currentNameDayTimestamp0 &&
    currentTimestamp0 < currentNameDayTimestamp0 + SECONDS_IN_DAY
  ) {
    // if we are in the right day
    previousNameDayTimestamp = currentNameDayTimestamp;
    nextNameDayTimestamp = currentNameDayTimestamp;
    isDay = true;
  } else {
    // if we are not in the right day: we compute the correct timestamp of our current "cycle"
    if (currentTimestamp0 < currentNameDayTimestamp0) {
      nextNameDayTimestamp = getDateFromOtherDate(
        currentNameDayDate,
        currentDate.getFullYear()
      );
      previousNameDayTimestamp = currentNameDayBaseTimestamp;
    } else {
      nextNameDayTimestamp = getDateFromOtherDate(
        currentNameDayDate,
        currentDate.getFullYear() + 1
      );
      previousNameDayTimestamp = currentNameDayTimestamp0;
    }
    isDay = false;
  }

  return {
    previousNameDayTimestamp: previousNameDayTimestamp,
    nextNameDayTimestamp: nextNameDayTimestamp,
    isDay: isDay,
  };
}
