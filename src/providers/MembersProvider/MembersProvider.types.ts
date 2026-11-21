import { z } from "zod";
import {
  MemberSchema,
  MemberWithSubscriptionSchema,
  MembersMetaSchema,
  MembersListResponseSchema,
  MembersWithSubscriptionsListResponseSchema,
  MemberWithSubscriptionResponseSchema,
  MemberWithSubscriptionByIdQuerySchema,
  MemberResponseSchema,
  MembersQuerySchema,
  MembersWithSubscriptionsQuerySchema,
  OwnerMembersQuerySchema,
} from "./MembersProvider.schemas";

export type MemberT = z.infer<typeof MemberSchema>;
export type MemberWithSubscriptionT = z.infer<
  typeof MemberWithSubscriptionSchema
>;
export type MembersMetaT = z.infer<typeof MembersMetaSchema>;
export type MembersListResponseT = z.infer<typeof MembersListResponseSchema>;
export type MembersWithSubscriptionsListResponseT = z.infer<
  typeof MembersWithSubscriptionsListResponseSchema
>;
export type MemberWithSubscriptionResponseT = z.infer<
  typeof MemberWithSubscriptionResponseSchema
>;
export type MemberWithSubscriptionByIdQueryT = z.infer<
  typeof MemberWithSubscriptionByIdQuerySchema
>;
export type MemberResponseT = z.infer<typeof MemberResponseSchema>;
export type MembersQueryT = z.infer<typeof MembersQuerySchema>;
export type MembersWithSubscriptionsQueryT = z.infer<
  typeof MembersWithSubscriptionsQuerySchema
>;
export type OwnerMembersQueryT = z.infer<typeof OwnerMembersQuerySchema>;
