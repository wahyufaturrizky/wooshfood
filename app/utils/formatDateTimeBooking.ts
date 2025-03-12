export function formatDateTimeBooking(input: string): string | undefined {
  if (input) {
    const date = new Date(input);

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = String(date.getDate()).padStart(2, "0");
    const month = monthsOfYear[date.getMonth()];
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // return `${dayOfWeek}, ${day} ${month} at ${hours}:${minutes}`;
    return `${dayOfWeek}, ${day} ${month}`;
  }
}
