import { timeZoneMap } from "./timeZoneMap.js";

export type TimeZoneCode = keyof typeof timeZoneMap;
export const timeZoneCodes = Object.keys(timeZoneMap) as [
  TimeZoneCode,
  ...TimeZoneCode[],
];
