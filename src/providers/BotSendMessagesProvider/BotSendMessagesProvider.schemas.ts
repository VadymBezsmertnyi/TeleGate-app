import { z } from "zod";

export const SendMessageSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  message: z
    .string()
    .min(1, "Message text is required")
    .max(4096, "Message too long"),
  tgChatId: z.string(),
});

export const SendMessageResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z
    .object({
      messageId: z.number(),
      sentAt: z.string().transform((val) => new Date(val)),
    })
    .optional(),
  error: z.string().optional(),
});
