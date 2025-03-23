export function minDateBooking() {
  const today = new Date();

  // Set the date to one day after today
  today.setDate(today.getDate() + 1);

  // Extract year, month, and day
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(today.getDate()).padStart(2, "0");

  // Return the formatted date
  return `${year}-${month}-${day}`;
}
