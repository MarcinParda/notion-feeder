export default function timeDifference(date1, date2) {
  const difference = Math.floor(date1) - Math.floor(date2);

  const diffInDays = Math.floor(difference / 60 / 60 / 24);
  const diffInHours = Math.floor(difference / 60 / 60);
  const diffInMinutes = Math.floor(difference / 60);
  const diffInSeconds = Math.floor(difference);

  return {
    date1,
    date2,
    diffInDays,
    diffInHours,
    diffInMinutes,
    diffInSeconds,
  };
}

export function removeExtraSpaces(str) {
  return str.trim().replace(/\s*(\.\s+|\s+)\s*/g, '$1');
}

export function isSameDay(date1, date2) {
  return date1.toDateString() === date2.toDateString();
}
