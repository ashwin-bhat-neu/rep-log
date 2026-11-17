function padToTwoDigits(number) {
  return String(number).padStart(2, "0");
}

// The user's local date, so a workout logged late at night isn't filed under tomorrow in UTC.
export function todayAsCalendarDate() {
  const today = new Date();
  return `${today.getFullYear()}-${padToTwoDigits(today.getMonth() + 1)}-${padToTwoDigits(today.getDate())}`;
}

export function formatCalendarDate(calendarDate) {
  const [year, month, day] = calendarDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
