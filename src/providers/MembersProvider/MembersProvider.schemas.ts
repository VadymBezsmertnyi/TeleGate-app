import { z } from "zod";

export const MemberSchema = z.object({
  _id: z.string(),
  telegramUsername: z.string().optional(),
  tgUserId: z.string(),
  isBot: z.boolean(),
  firstName: z.string(),
  lastName: z.string().nullable().optional(),
  username: z.string().nullable().optional(),
  languageCode: z.string().nullable().optional(),
  canJoinGroups: z.boolean().nullable().optional(),
  canReadAllGroupMessages: z.boolean().nullable().optional(),
  supportsInlineQueries: z.boolean().nullable().optional(),
  photoUrl: z.string().nullable().optional(),
  user: z.any().nullable().optional(),
  groups: z.array(z.any()).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  activeSubscriptionsCount: z.number().optional(),
  groupsCount: z.number().optional(),
  subscriptionDelaysDays: z.number().optional(),
  activeSubscriptions: z.array(z.any()).optional(),
});

export const MemberWithSubscriptionSchema = z.object({
  _id: z.string(),
  telegramUsername: z.string().optional(),
  tgUserId: z.string(),
  isBot: z.boolean(),
  firstName: z.string(),
  lastName: z.string().nullable().optional(),
  username: z.string().nullable().optional(),
  languageCode: z.string().nullable().optional(),
  canJoinGroups: z.boolean().nullable().optional(),
  canReadAllGroupMessages: z.boolean().nullable().optional(),
  supportsInlineQueries: z.boolean().nullable().optional(),
  photoUrl: z.string().nullable().optional(),
  groups: z.array(z.string()).optional(),
  createdAt: z.union([z.date(), z.string()]),
  updatedAt: z.union([z.date(), z.string()]),
  subscription: z
    .object({
      _id: z.string(),
      startDate: z.union([z.date(), z.string()]),
      purchaseDate: z.union([z.date(), z.string()]),
      endDate: z.union([z.date(), z.string()]),
      groupSubscription: z.object({
        _id: z.string(),
        title: z.string(),
        price: z.number(),
        currency: z.string(),
        type: z.string(),
        duration: z.number(),
      }),
    })
    .nullable()
    .optional(),
  activeSubscriptionsCount: z.number().optional(),
  activeSubscriptions: z
    .array(
      z.object({
        _id: z.string(),
        startDate: z.union([z.date(), z.string()]),
        purchaseDate: z.union([z.date(), z.string()]),
        endDate: z.union([z.date(), z.string()]),
        groupSubscription: z.object({
          _id: z.string(),
          title: z.string(),
          price: z.number(),
          currency: z.string(),
          type: z.string(),
          duration: z.number(),
        }),
      })
    )
    .optional(),
  allSubscriptions: z
    .array(
      z.object({
        _id: z.string(),
        startDate: z.union([z.date(), z.string()]),
        purchaseDate: z.union([z.date(), z.string()]),
        endDate: z.union([z.date(), z.string()]),
        groupSubscription: z.object({
          _id: z.string(),
          title: z.string(),
          price: z.number(),
          currency: z.string(),
          type: z.string(),
          duration: z.number(),
        }),
      })
    )
    .optional(),
});

export const MembersMetaSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  total: z.number().min(0).default(0),
  pages: z.number().min(0).default(0),
});

export const MembersListResponseSchema = z.object({
  data: z.array(MemberSchema),
  meta: MembersMetaSchema,
});

export const MembersWithSubscriptionsListResponseSchema = z.object({
  data: z.array(MemberWithSubscriptionSchema),
  meta: MembersMetaSchema,
});

export const MemberWithSubscriptionResponseSchema = z.object({
  data: MemberWithSubscriptionSchema,
});

export const MemberWithSubscriptionByIdQuerySchema = z.object({
  groupId: z.string(),
});

export const MemberResponseSchema = z.object({
  data: MemberSchema,
});

export const MembersQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z
    .enum(["createdAt", "updatedAt", "firstName", "username"])
    .default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
  search: z.string().optional(),
  status: z
    .enum([
      "creator",
      "administrator",
      "member",
      "restricted",
      "left",
      "kicked",
    ])
    .optional(),
  groupId: z.string().optional(),
  createdFrom: z.string().optional(),
  createdTo: z.string().optional(),
  ownerId: z.string().optional(),
  ownerTelegramId: z.number().optional(),
});

export const MembersWithSubscriptionsQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z
    .enum(["createdAt", "updatedAt", "firstName", "username"])
    .default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
  search: z.string().optional(),
  groupId: z.string(),
});

export const OwnerMembersQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z
    .enum(["createdAt", "updatedAt", "firstName", "username"])
    .default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
  search: z.string().optional(),
  status: z
    .enum([
      "creator",
      "administrator",
      "member",
      "restricted",
      "left",
      "kicked",
    ])
    .optional(),
  groupId: z.string().optional(),
  createdFrom: z.string().optional(),
  createdTo: z.string().optional(),
  ownerId: z.string().optional(),
  ownerTelegramId: z.number().optional(),
});
