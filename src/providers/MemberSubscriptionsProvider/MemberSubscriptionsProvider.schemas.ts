import { z } from "zod";

export const MemberSubscriptionSchema = z.object({
  _id: z.string(),
  startDate: z.string().transform((val) => new Date(val)),
  purchaseDate: z.string().transform((val) => new Date(val)),
  endDate: z.string().transform((val) => new Date(val)),
  memberId: z.string(),
  groupId: z.string(),
  groupSubscriptionId: z.string(),
  createdAt: z.string().transform((val) => new Date(val)),
  updatedAt: z.string().transform((val) => new Date(val)),
});

export const MemberSubscriptionsMetaSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  pages: z.number(),
});

export const MemberSubscriptionsListResponseSchema = z.object({
  data: z.array(MemberSubscriptionSchema),
  meta: MemberSubscriptionsMetaSchema,
});

export const MemberSubscriptionResponseSchema = z.object({
  data: MemberSubscriptionSchema,
});

export const MemberSubscriptionsQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  order: z.enum(["asc", "desc"]).default("desc"),
  memberId: z.string().optional(),
  groupId: z.string().optional(),
  groupSubscriptionId: z.string().optional(),
});

export const CreateMemberSubscriptionSchema = z.object({
  memberId: z.string(),
  groupId: z.string(),
  groupSubscriptionId: z.string(),
});

export const UpdateMemberSubscriptionSchema = z.object({
  startDate: z.date().optional(),
  purchaseDate: z.date().optional(),
  endDate: z.date().optional(),
  memberId: z.string().optional(),
  groupId: z.string().optional(),
  groupSubscriptionId: z.string().optional(),
});
