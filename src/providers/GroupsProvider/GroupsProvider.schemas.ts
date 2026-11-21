import { z } from "zod";

export const GroupSchema = z.object({
  id: z.string(),
  tgChatId: z.string(),
  type: z.enum(["private", "group", "supergroup", "channel"]),
  name: z.string().nullable(),
  description: z.string().nullable(),
  photoUrl: z.string().nullable(),
  isForum: z.boolean(),
  allMembersAreAdministrators: z.boolean().nullable().optional(),
  acceptedGiftTypes: z
    .object({
      unlimited_gifts: z.boolean().nullable(),
      limited_gifts: z.boolean().nullable(),
      unique_gifts: z.boolean().nullable(),
      premium_subscription: z.boolean().nullable(),
    })
    .nullable()
    .optional(),
  botStatus: z
    .enum([
      "creator",
      "administrator",
      "member",
      "restricted",
      "left",
      "kicked",
    ])
    .nullable(),
  membersCount: z.number(),
  subscriptionsCount: z.number(),
  usersWithSubscriptionCount: z.number(),
  usersWithExpiredSubscriptionCount: z.number(),
  usersWithoutSubscriptionCount: z.number(),
  addedBy: z
    .object({
      id: z.string(),
      firstName: z.string(),
      lastName: z.string().nullable(),
      username: z.string().nullable(),
    })
    .nullable(),
  createdAt: z.string().transform((val) => new Date(val)),
  updatedAt: z.string().transform((val) => new Date(val)),
});

export const GroupsMetaSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  pages: z.number(),
});

export const GroupsListResponseSchema = z.object({
  data: z.array(GroupSchema),
  meta: GroupsMetaSchema,
});

export const GroupResponseSchema = z.object({
  data: GroupSchema,
});

export const GroupsQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z
    .enum(["createdAt", "updatedAt", "name", "membersCount"])
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
  createdFrom: z.string().optional(),
  createdTo: z.string().optional(),
  membersFrom: z.number().optional(),
  membersTo: z.number().optional(),
  activity: z.enum(["active_7d", "active_30d", "inactive"]).optional(),
});

export const OwnerGroupsQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z
    .enum(["createdAt", "updatedAt", "name", "membersCount"])
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
  createdFrom: z.string().optional(),
  createdTo: z.string().optional(),
  membersFrom: z.number().optional(),
  membersTo: z.number().optional(),
  activity: z.enum(["active_7d", "active_30d", "inactive"]).optional(),
  ownerId: z.string().optional(),
  ownerTelegramId: z.number().optional(),
});
