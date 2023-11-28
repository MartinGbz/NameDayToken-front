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

export function getPreviousAndNextTimestamp(nameDayTimestamp: bigint) {
  const currentNameDayDate = new Date(Number(nameDayTimestamp) * 1000);
  const currentNameDayTimestamp = nameDayTimestamp * BigInt(1000);
  const currentTimestamp = BigInt(new Date().getTime());

  let nextNameDayTimestamp: bigint;
  let previousNameDayTimestamp: bigint;
  let isDay: boolean;

  if (currentNameDayTimestamp + SECONDS_IN_DAY < currentTimestamp) {
    // if we are in the future: we compute the correct timestamp of our current "cycle"
    nextNameDayTimestamp = getDateFromOtherDate(currentNameDayDate, 1);
    previousNameDayTimestamp = getDateFromOtherDate(currentNameDayDate, 0);
    isDay = false;
  } else if (currentTimestamp < currentNameDayTimestamp) {
    // if we are in the past: we compute the correct timestamp of our current "cycle"
    nextNameDayTimestamp = currentNameDayTimestamp;
    // need to put the computation of new Date().getFullYear() minus baseTimeStamp.getFullYear() (from contract) instead of -1
    previousNameDayTimestamp = getDateFromOtherDate(currentNameDayDate, -1);
    isDay = false;
  } else if (
    currentTimestamp >= currentNameDayTimestamp &&
    currentTimestamp < currentNameDayTimestamp + SECONDS_IN_DAY
  ) {
    // if we are in the right day: we set directly a -1
    console.log("we are in the right day");
    // setPercentageCompleted(-1);
    previousNameDayTimestamp = BigInt(0);
    nextNameDayTimestamp = BigInt(0);
    isDay = true;
  } else {
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