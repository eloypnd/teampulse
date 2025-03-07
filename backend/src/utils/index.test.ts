import {
  DateISO8601toUnix,
  StringDateToUnixEpoch,
  timeDifference,
} from "./index";

describe("DateISO8601toUnix", () => {
  it("should convert valid ISO8601 date to unix timestamp", () => {
    const result = DateISO8601toUnix("2023-01-01");
    expect(result).toBe(1672531200);
  });

  it("should throw error for invalid ISO8601 format", () => {
    expect(() => DateISO8601toUnix("01-01-2023")).toThrow();
    expect(() => DateISO8601toUnix("2023/01/01")).toThrow();
    expect(() => DateISO8601toUnix("invalid")).toThrow();
  });
});

describe("StringDateToUnixEpoch", () => {
  it("should convert various date strings to unix timestamp", () => {
    // ISO format (YYYY-MM-DD) is interpreted as UTC midnight
    const result1 = StringDateToUnixEpoch("2023-01-01");
    // Regular date format (YYYY/MM/DD) is interpreted in local timezone
    const result2 = StringDateToUnixEpoch("2023/01/01");

    // 1672531200 represents 2023-01-01 00:00:00 UTC
    expect(result1).toBe(1672531200);
    // 1672527600 represents 2023-01-01 00:00:00 in local timezone (UTC+1)
    expect(result2).toBe(1672527600);
  });

  it("should handle explicit timezone specifications", () => {
    // Both should return the same timestamp when timezone is explicit
    const utcDate = StringDateToUnixEpoch("2023-01-01T00:00:00Z");
    const localDate = StringDateToUnixEpoch("2023-01-01T00:00:00");

    expect(utcDate).toBe(1672531200); // UTC midnight
    expect(localDate).toBe(1672527600); // Local midnight
  });

  it("should return NaN for invalid dates", () => {
    const result = StringDateToUnixEpoch("invalid");
    expect(result).toBeNaN();
  });
});

describe("timeDifference", () => {
  it("should calculate correct time difference", () => {
    expect(timeDifference(1672531200, 1672527600)).toBe(3600); // 1 hour difference
    expect(timeDifference(1672531200, 1672531200)).toBe(0); // no difference
    expect(timeDifference(1672527600, 1672531200)).toBe(-3600); // negative difference
  });
});
