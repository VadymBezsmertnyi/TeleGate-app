export const SECURE_STORE_KEYS = {
  ACCESS_TOKEN: "access_token",
  USER_DATA: "user_data",
} as const;

export const AUTH_CONFIG = {
  AUTO_LOGIN_TIMEOUT: 10000, // 10 seconds
  TOKEN_REFRESH_INTERVAL: 24 * 60 * 60 * 1000, // 24 hours
} as const;

export const SUBSCRIPTION_TYPES_ENUM = ["free", "pro", "ultimate"] as const;
