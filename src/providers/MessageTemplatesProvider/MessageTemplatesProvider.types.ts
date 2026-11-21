import { z } from "zod";
import {
  MessageTemplateSchema,
  MessageTemplatesMetaSchema,
  MessageTemplatesListResponseSchema,
  MessageTemplateResponseSchema,
  CreateMessageTemplateSchema,
  UpdateMessageTemplateSchema,
  FilterMessageTemplatesSchema,
  MessageTemplateStatsSchema,
} from "./MessageTemplatesProvider.schemas";

export type MessageTemplateT = z.infer<typeof MessageTemplateSchema>;
export type MessageTemplatesMetaT = z.infer<typeof MessageTemplatesMetaSchema>;
export type MessageTemplatesListResponseT = z.infer<
  typeof MessageTemplatesListResponseSchema
>;
export type MessageTemplateResponseT = z.infer<
  typeof MessageTemplateResponseSchema
>;
export type CreateMessageTemplateT = z.infer<
  typeof CreateMessageTemplateSchema
>;
export type UpdateMessageTemplateT = z.infer<
  typeof UpdateMessageTemplateSchema
>;
export type FilterMessageTemplatesT = z.infer<
  typeof FilterMessageTemplatesSchema
>;
export type MessageTemplateStatsT = z.infer<typeof MessageTemplateStatsSchema>;
