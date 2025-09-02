import { TimeZoneCode } from "./TimeZoneCode.js";
import { timeZoneMap } from "./timeZoneMap.js";

export type TimeZoneName = (typeof timeZoneMap)[TimeZoneCode];
export const timeZoneNames = Object.values(timeZoneMap) as [
  TimeZoneName,
  ...TimeZoneName[],
];
