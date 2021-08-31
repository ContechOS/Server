import { DateTime } from "neo4j-driver";

export class Utilities {
  public static neo4jDateTimeToDateObject({ year, month, day, hour, minute, second, nanosecond }: DateTime): Date {
    return new Date(`${year.toNumber()}-${month.toNumber().toString(10).padStart(2, '0')}-${day.toNumber().toString(10).padStart(2, '0')}T${hour.toNumber().toString(10).padStart(2, '0')}:${minute.toNumber().toString(10).padStart(2, '0')}:${second.toNumber().toString(10).padStart(2, '0')}.${nanosecond.div(1000).toNumber().toString(10)}Z`);
  }
}