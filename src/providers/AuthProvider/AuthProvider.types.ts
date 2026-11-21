import z from "zod";
import {
  UserSchema,
  UserPublicSchema,
  CreateUserSchema,
  TelegramAuthParamsSchema,
  AuthResultSchema,
  ErrorResponseSchema,
} from "./AuthProvider.schemas";

export type UserT = z.infer<typeof UserSchema>;
export type UserPublicT = z.infer<typeof UserPublicSchema>;
export type CreateUserT = z.infer<typeof CreateUserSchema>;
export type TelegramAuthParamsT = z.infer<typeof TelegramAuthParamsSchema>;
export type AuthResultT = z.infer<typeof AuthResultSchema>;
export type ErrorResponseT = z.infer<typeof ErrorResponseSchema>;
