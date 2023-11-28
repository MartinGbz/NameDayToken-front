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

export function getPreviousAndNextTimestamp(
  nameDayTimestamp: bigint,
  nameDayBaseTimestamp: bigint
) {
  const currentNameDayDate = new Date(Number(nameDayTimestamp) * 1000);
  const currentNameDayTimestamp = nameDayTimestamp * BigInt(1000);
  const currentNameDayBaseTimestamp = nameDayBaseTimestamp * BigInt(1000);
  const currentTimestamp = BigInt(new Date().getTime());

  let nextNameDayTimestamp: bigint;
  let previousNameDayTimestamp: bigint;
  let isDay: boolean;

  if (currentNameDayTimestamp + SECONDS_IN_DAY < currentTimestamp) {
    // if we are in the future: we compute the correct timestamp of our current "cycle"
    console.log("here 0");
    nextNameDayTimestamp = getDateFromOtherDate(currentNameDayDate, 1);
    previousNameDayTimestamp = getDateFromOtherDate(currentNameDayDate, 0);
    isDay = false;
  } else if (currentTimestamp < currentNameDayTimestamp) {
    // if we are in the past: we compute the correct timestamp of our current "cycle"
    console.log("here");
    nextNameDayTimestamp = currentNameDayTimestamp;
    previousNameDayTimestamp = currentNameDayBaseTimestamp;
    isDay = false;
  } else if (
    currentTimestamp >= currentNameDayTimestamp &&
    currentTimestamp < currentNameDayTimestamp + SECONDS_IN_DAY
  ) {
    console.log("here 2");
    // if we are in the right day: we set directly a -1
    previousNameDayTimestamp = BigInt(0);
    nextNameDayTimestamp = BigInt(0);
    isDay = true;
  } else {
    console.log("here 3");
    previousNameDayTimestamp = BigInt(0);
    nextNameDayTimestamp = BigInt(0);
    isDay = false;
  }

  return {
    previousNameDayTimestamp: previousNameDayTimestamp,
    nextNameDayTimestamp: nextNameDayTimestamp,
    isDay: isDay,
  };
}
