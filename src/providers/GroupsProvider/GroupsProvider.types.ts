import { z } from "zod";
import {
  GroupSchema,
  GroupsMetaSchema,
  GroupsListResponseSchema,
  GroupResponseSchema,
  GroupsQuerySchema,
  OwnerGroupsQuerySchema,
} from "./GroupsProvider.schemas";

export type GroupT = z.infer<typeof GroupSchema>;
export type GroupsMetaT = z.infer<typeof GroupsMetaSchema>;
export type GroupsListResponseT = z.infer<typeof GroupsListResponseSchema>;
export type GroupResponseT = z.infer<typeof GroupResponseSchema>;
export type GroupsQueryT = z.infer<typeof GroupsQuerySchema>;
export type OwnerGroupsQueryT = z.infer<typeof OwnerGroupsQuerySchema>;
