import { DateTime } from "neo4j-driver";

export class Utilities {
  public static neo4jDateTimeToDateObject({ year, month, day, hour, minute, second }: DateTime): Date {
    return new Date(
      year.toNumber(),
      month.toNumber(),
      day.toNumber(),
      hour.toNumber(),
      minute.toNumber(),
      second.toNumber(),
    );
  }
}