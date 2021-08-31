export class Config {
  public static readonly PASSWORD_MIN_LENGTH = 8;

  /**
   * @default
   * 1 day
   */
  public static readonly SESSION_EXPIRES_AFTER_SECONDS = 60 * 60 * 24;

  public static readonly PASSWORD_HASH_ROUNDS = 15;
}
