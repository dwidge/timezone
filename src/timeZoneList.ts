import { TimeZoneCode } from "./TimeZoneCode.js";
import { timeZoneMap } from "./timeZoneMap.js";
import { TimeZoneName } from "./TimeZoneName.js";

export const timeZoneList = Object.entries(timeZoneMap).map(([id, label]) => ({
  id,
  label,
})) as {
  id: TimeZoneCode;
  label: TimeZoneName;
}[];
