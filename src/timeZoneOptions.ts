import { timeZoneList } from "./timeZoneList.js";

export const timeZoneOptions = timeZoneList
  .map(({ id, label }) => ({
    value: id,
    label: `${label} (${id})`,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));
