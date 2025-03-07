/**
 * Converts an ISO8601 date string to Unix timestamp
 * @param date ISO8601 date string (YYYY-MM-DD)
 * @returns Unix timestamp
 */
export function DateISO8601toUnix(date: string): number {
  // Validate ISO8601 date format (YYYY-MM-DD) using regex
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (date && !isoDateRegex.test(date as string)) {
    throw new Error("date must be in ISO8601 date format (YYYY-MM-DD)");
  }

  return Math.floor(new Date(date).getTime() / 1000);
}

/**
 * Converts a Unix Epoch to a string date
 *
 * @param stringDate
 * @returns number Unix Epoch
 */
export function StringDateToUnixEpoch(stringDate: string): number {
  return Math.floor(new Date(stringDate).getTime() / 1000);
}

/**
 * Calculates the resolution time of a task
 * @param end
 * @param start
 * @returns
 */
export function timeDifference(end: number, start: number): number {
  return end - start;
}
