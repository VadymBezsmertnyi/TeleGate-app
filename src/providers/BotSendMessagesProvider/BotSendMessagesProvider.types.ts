import { z } from "zod";
import {
  SendMessageSchema,
  SendMessageResponseSchema,
} from "./BotSendMessagesProvider.schemas";

export type SendMessageT = z.infer<typeof SendMessageSchema>;
export type SendMessageResponseT = z.infer<typeof SendMessageResponseSchema>;
