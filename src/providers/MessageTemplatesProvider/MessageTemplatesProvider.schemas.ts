import { z } from "zod";

export const MessageTemplateSchema = z.object({
  _id: z.string(),
  name: z.string(),
  content: z.string(),
  description: z.string().optional(),
  isActive: z.boolean(),
  tags: z.array(z.string()),
  usageCount: z.number(),
  lastUsedAt: z
    .string()
    .transform((val) => (val ? new Date(val) : undefined))
    .optional(),
  createdAt: z.string().transform((val) => new Date(val)),
  updatedAt: z.string().transform((val) => new Date(val)),
});

export const MessageTemplatesMetaSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  pages: z.number(),
});

export const MessageTemplatesListResponseSchema = z.object({
  data: z.array(MessageTemplateSchema),
  meta: MessageTemplatesMetaSchema,
});

export const MessageTemplateResponseSchema = z.object({
  data: MessageTemplateSchema,
});

export const CreateMessageTemplateSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(4096, "Content too long"),
  description: z.string().max(500, "Description too long").optional(),
  tags: z.array(z.string().max(50)).optional(),
});

export const UpdateMessageTemplateSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name too long")
    .optional(),
  content: z
    .string()
    .min(1, "Content is required")
    .max(4096, "Content too long")
    .optional(),
  description: z.string().max(500, "Description too long").optional(),
  isActive: z.boolean().optional(),
  tags: z.array(z.string().max(50)).optional(),
});

export const FilterMessageTemplatesSchema = z.object({
  search: z.string().optional(),
  isActive: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
});

export const MessageTemplateStatsSchema = z.object({
  total: z.number(),
  active: z.number(),
  inactive: z.number(),
  totalUsage: z.number(),
  mostUsed: z.array(
    z.object({
      _id: z.string(),
      name: z.string(),
      usageCount: z.number(),
    })
  ),
});
