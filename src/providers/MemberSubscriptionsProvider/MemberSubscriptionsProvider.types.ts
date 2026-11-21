import { z } from "zod";
import {
  MemberSubscriptionSchema,
  MemberSubscriptionsMetaSchema,
  MemberSubscriptionsListResponseSchema,
  MemberSubscriptionResponseSchema,
  MemberSubscriptionsQuerySchema,
  CreateMemberSubscriptionSchema,
  UpdateMemberSubscriptionSchema,
} from "./MemberSubscriptionsProvider.schemas";

export type MemberSubscriptionT = z.infer<typeof MemberSubscriptionSchema>;
export type MemberSubscriptionsMetaT = z.infer<
  typeof MemberSubscriptionsMetaSchema
>;
export type MemberSubscriptionsListResponseT = z.infer<
  typeof MemberSubscriptionsListResponseSchema
>;
export type MemberSubscriptionResponseT = z.infer<
  typeof MemberSubscriptionResponseSchema
>;
export type MemberSubscriptionsQueryT = z.infer<
  typeof MemberSubscriptionsQuerySchema
>;
export type CreateMemberSubscriptionT = z.infer<
  typeof CreateMemberSubscriptionSchema
>;
export type UpdateMemberSubscriptionT = z.infer<
  typeof UpdateMemberSubscriptionSchema
>;
