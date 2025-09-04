/**
 * Converts a UTC cron string to a local timezone cron string.
 * Note: This only converts the hour and minute, assuming a simple cron format like '0 9 * * *'.
 * @param utcCron The cron string in UTC.
 * @param timeZone The target IANA timezone identifier.
 * @returns The cron string in the local timezone, or the original string if conversion is not possible.
 */
export const convertCronToLocal = (
  utcCron: string | null,
  timeZone: string
): string | null => {
  if (!utcCron || !timeZone) return utcCron;

  const parsed = parseCron(utcCron);
  if (!parsed) return utcCron;

  const { minute, hour: utcHour, rest } = parsed;

  const now = new Date();
  const utcDate = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      utcHour,
      minute
    )
  );

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    hour12: false,
  });

  const localHour = parseInt(formatter.format(utcDate), 10);

  return buildCron(minute, localHour, rest);
};

/**
 * Converts a local timezone cron string to a UTC cron string.
 * Note: This only converts the hour and minute, assuming a simple cron format like '0 9 * * *'.
 * @param localCron The cron string in the local timezone.
 * @param timeZone The IANA timezone identifier of the local cron.
 * @returns The cron string in UTC, or the original string if conversion is not possible.
 */
export const convertCronToUTC = (
  localCron: string | null,
  timeZone: string
): string | null => {
  if (!localCron || !timeZone) return localCron;

  const parsed = parseCron(localCron);
  if (!parsed) return localCron;

  const { minute, hour: localHour, rest } = parsed;

  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    hour12: false,
  });

  for (let h = 0; h < 24; h++) {
    const testUtcDate = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        h,
        minute
      )
    );

    const resultingLocalHour = parseInt(formatter.format(testUtcDate), 10);

    if (resultingLocalHour === localHour) {
      return buildCron(minute, h, rest);
    }
  }

  return localCron;
};

const parseCron = (
  cron: string
): { minute: number; hour: number; rest: string } | null => {
  if (!cron) return null;
  const parts = cron.split(' ');
  if (parts.length !== 5) return null;

  const minute = parseInt(parts[0]!, 10);
  const hour = parseInt(parts[1]!, 10);

  if (isNaN(minute) || isNaN(hour)) return null;

  return { minute, hour, rest: parts.slice(2).join(' ') };
};

const buildCron = (minute: number, hour: number, rest: string): string => {
  return `${minute} ${hour} ${rest}`;
};
