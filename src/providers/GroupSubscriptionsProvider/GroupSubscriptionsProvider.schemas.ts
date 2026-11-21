import { z } from "zod";
import { SUBSCRIPTION_TYPES_ENUM } from "./GroupSubscriptionsProvider.constants";

export const GroupSubscriptionSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  currency: z.string(),
  type: z.enum(SUBSCRIPTION_TYPES_ENUM),
  duration: z.number(),
  memberSubscriptionIds: z.array(z.string()),
  groupId: z.string(),
  userId: z.string(),
  createdAt: z.string().transform((val) => new Date(val)),
  updatedAt: z.string().transform((val) => new Date(val)),
});

export const GroupSubscriptionsMetaSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  pages: z.number(),
});

export const GroupSubscriptionsListResponseSchema = z.object({
  data: z.array(GroupSubscriptionSchema),
  meta: GroupSubscriptionsMetaSchema,
});

export const GroupSubscriptionResponseSchema = z.object({
  data: GroupSubscriptionSchema,
});

export const GroupSubscriptionsQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  order: z.enum(["asc", "desc"]).default("desc"),
  groupId: z.string().optional(),
  userId: z.string().optional(),
});

export const CreateGroupSubscriptionSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  currency: z.string().min(1),
  type: z.enum(SUBSCRIPTION_TYPES_ENUM).optional(),
  duration: z.number().int().min(1).optional(),
  groupId: z.string(),
  userId: z.string().optional(),
});

export const UpdateGroupSubscriptionSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  type: z.enum(SUBSCRIPTION_TYPES_ENUM).optional(),
  duration: z.number().int().min(1).optional(),
});
