const millisecondsInDay = 86400 * 1000;
const MILLISECONDS_IN_DAY = BigInt(millisecondsInDay);

const baseYear = 2000;

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
  const nameDayDate = new Date(Number(nameDayTimestamp));
  const nameDayTimestamp0 = getDateFromOtherDate(nameDayDate, baseYear);

  const currentDate = new Date();
  const currentTimestamp0 = getDateFromOtherDate(new Date(), baseYear);

  let nextNameDayTimestamp: bigint;
  let previousNameDayTimestamp: bigint;
  let isDay: boolean;

  if (
    currentTimestamp0 >= nameDayTimestamp0 &&
    currentTimestamp0 < nameDayTimestamp0 + MILLISECONDS_IN_DAY
  ) {
    // if we are in the right day
    previousNameDayTimestamp = getDateFromOtherDate(
      nameDayDate,
      currentDate.getFullYear()
    );
    nextNameDayTimestamp = getDateFromOtherDate(
      nameDayDate,
      currentDate.getFullYear()
    );
    isDay = true;
  } else {
    // if we are not in the right day: we compute the correct timestamps of our current "cycle"
    if (currentTimestamp0 < nameDayTimestamp0) {
      nextNameDayTimestamp = getDateFromOtherDate(
        nameDayDate,
        currentDate.getFullYear()
      );
      previousNameDayTimestamp = nameDayBaseTimestamp;
    } else {
      nextNameDayTimestamp = getDateFromOtherDate(
        nameDayDate,
        currentDate.getFullYear() + 1
      );
      previousNameDayTimestamp = getDateFromOtherDate(
        nameDayDate,
        currentDate.getFullYear()
      );
    }
    isDay = false;
  }

  return {
    previousNameDayTimestamp: previousNameDayTimestamp,
    nextNameDayTimestamp: nextNameDayTimestamp,
    isDay: isDay,
  };
}
