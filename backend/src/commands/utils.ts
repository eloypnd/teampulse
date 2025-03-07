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
