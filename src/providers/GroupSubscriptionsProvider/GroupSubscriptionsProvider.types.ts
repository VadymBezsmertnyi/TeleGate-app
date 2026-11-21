import { z } from "zod";
import {
  GroupSubscriptionSchema,
  GroupSubscriptionsMetaSchema,
  GroupSubscriptionsListResponseSchema,
  GroupSubscriptionResponseSchema,
  GroupSubscriptionsQuerySchema,
  CreateGroupSubscriptionSchema,
  UpdateGroupSubscriptionSchema,
} from "./GroupSubscriptionsProvider.schemas";

export type GroupSubscriptionT = z.infer<typeof GroupSubscriptionSchema>;
export type GroupSubscriptionsMetaT = z.infer<
  typeof GroupSubscriptionsMetaSchema
>;
export type GroupSubscriptionsListResponseT = z.infer<
  typeof GroupSubscriptionsListResponseSchema
>;
export type GroupSubscriptionResponseT = z.infer<
  typeof GroupSubscriptionResponseSchema
>;
export type GroupSubscriptionsQueryT = z.infer<
  typeof GroupSubscriptionsQuerySchema
>;
export type CreateGroupSubscriptionT = z.infer<
  typeof CreateGroupSubscriptionSchema
>;
export type UpdateGroupSubscriptionT = z.infer<
  typeof UpdateGroupSubscriptionSchema
>;
