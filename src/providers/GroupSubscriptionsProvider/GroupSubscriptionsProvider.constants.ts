export const SUBSCRIPTION_TYPES = {
  DAILY: "daily",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
  YEARLY: "yearly",
} as const;

export const SUBSCRIPTION_TYPES_ENUM = [
  SUBSCRIPTION_TYPES.DAILY,
  SUBSCRIPTION_TYPES.WEEKLY,
  SUBSCRIPTION_TYPES.MONTHLY,
  SUBSCRIPTION_TYPES.YEARLY,
] as const;

export type SubscriptionType = typeof SUBSCRIPTION_TYPES_ENUM[number];
