import React, { createContext, useContext, FC } from "react";
import Toast from "react-native-toast-message";
import { z } from "zod";

// providers
import { useApiProvider } from "../ApiProvider/ApiProvider";

// constants
import PATHS from "../paths.constants";

// schemas
import {
  MessageTemplatesListResponseSchema,
  MessageTemplateResponseSchema,
  CreateMessageTemplateSchema,
  UpdateMessageTemplateSchema,
  FilterMessageTemplatesSchema,
  MessageTemplateStatsSchema,
} from "./MessageTemplatesProvider.schemas";

// types
import {
  MessageTemplateT,
  MessageTemplatesMetaT,
  MessageTemplatesListResponseT,
  MessageTemplateResponseT,
  CreateMessageTemplateT,
  UpdateMessageTemplateT,
  FilterMessageTemplatesT,
  MessageTemplateStatsT,
} from "./MessageTemplatesProvider.types";

// Re-export types for external use
export type {
  MessageTemplateT,
  MessageTemplatesMetaT,
  MessageTemplatesListResponseT,
  MessageTemplateResponseT,
  CreateMessageTemplateT,
  UpdateMessageTemplateT,
  FilterMessageTemplatesT,
  MessageTemplateStatsT,
} from "./MessageTemplatesProvider.types";

type MessageTemplatesContextType = {
  list: (
    params: FilterMessageTemplatesT
  ) => Promise<MessageTemplatesListResponseT>;
  getById: (id: string) => Promise<MessageTemplateResponseT>;
  create: (data: CreateMessageTemplateT) => Promise<MessageTemplateResponseT>;
  update: (
    id: string,
    data: UpdateMessageTemplateT
  ) => Promise<MessageTemplateResponseT>;
  delete: (id: string) => Promise<{ message: string }>;
  getStats: () => Promise<MessageTemplateStatsT>;
};

type MessageTemplatesProviderProps = { children: React.ReactNode };

const MessageTemplatesContext = createContext<MessageTemplatesContextType>(
  {} as MessageTemplatesContextType
);

const MessageTemplatesProvider: FC<MessageTemplatesProviderProps> = ({
  children,
}) => {
  const { api } = useApiProvider();

  const list = async (
    params: FilterMessageTemplatesT
  ): Promise<MessageTemplatesListResponseT> => {
    try {
      const validatedParams = FilterMessageTemplatesSchema.parse(params);
      const queryParams = new URLSearchParams();

      Object.entries(validatedParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((item) => queryParams.append(key, item));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });

      const url = `${
        PATHS.api.messageTemplates.LIST
      }?${queryParams.toString()}`;
      const response = await api(url, {
        config: { method: "GET" },
        schema: MessageTemplatesListResponseSchema,
      });

      if (!response) {
        throw new Error("Invalid response format");
      }

      return response;
    } catch (error) {
      console.warn("Error fetching message templates:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch message templates",
      });
      throw error;
    }
  };

  const getById = async (id: string): Promise<MessageTemplateResponseT> => {
    try {
      const url = PATHS.api.messageTemplates.BY_ID(id);
      const response = await api(url, {
        config: { method: "GET" },
        schema: MessageTemplateResponseSchema,
      });

      if (!response) {
        throw new Error("Invalid response format");
      }

      return response;
    } catch (error) {
      console.warn("Error fetching message template:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch message template",
      });
      throw error;
    }
  };

  const create = async (
    data: CreateMessageTemplateT
  ): Promise<MessageTemplateResponseT> => {
    try {
      const validatedData = CreateMessageTemplateSchema.parse(data);
      const url = PATHS.api.messageTemplates.LIST;
      const response = await api(url, {
        config: {
          method: "POST",
          data: validatedData,
        },
        schema: MessageTemplateResponseSchema,
      });

      if (!response) {
        throw new Error("Invalid response format");
      }

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Message template created successfully",
      });

      return response;
    } catch (error) {
      console.warn("Error creating message template:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to create message template",
      });
      throw error;
    }
  };

  const update = async (
    id: string,
    data: UpdateMessageTemplateT
  ): Promise<MessageTemplateResponseT> => {
    try {
      const validatedData = UpdateMessageTemplateSchema.parse(data);
      const url = PATHS.api.messageTemplates.BY_ID(id);
      const response = await api(url, {
        config: {
          method: "PUT",
          data: validatedData,
        },
        schema: MessageTemplateResponseSchema,
      });

      if (!response) {
        throw new Error("Invalid response format");
      }

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Message template updated successfully",
      });

      return response;
    } catch (error) {
      console.warn("Error updating message template:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update message template",
      });
      throw error;
    }
  };

  const deleteTemplate = async (id: string): Promise<{ message: string }> => {
    try {
      const url = PATHS.api.messageTemplates.BY_ID(id);
      const response = await api(url, {
        config: { method: "DELETE" },
        schema: z.object({ message: z.string() }),
      });

      if (!response) {
        throw new Error("Invalid response format");
      }

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Message template deleted successfully",
      });

      return response;
    } catch (error) {
      console.warn("Error deleting message template:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to delete message template",
      });
      throw error;
    }
  };

  const getStats = async (): Promise<MessageTemplateStatsT> => {
    try {
      const url = PATHS.api.messageTemplates.STATS;
      const response = await api(url, {
        config: { method: "GET" },
        schema: MessageTemplateStatsSchema,
      });

      if (!response) {
        throw new Error("Invalid response format");
      }

      return response;
    } catch (error) {
      console.warn("Error fetching message template stats:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch message template stats",
      });
      throw error;
    }
  };

  return (
    <MessageTemplatesContext.Provider
      value={{
        list,
        getById,
        create,
        update,
        delete: deleteTemplate,
        getStats,
      }}
    >
      {children}
    </MessageTemplatesContext.Provider>
  );
};

export const useMessageTemplatesProvider = () =>
  useContext(MessageTemplatesContext);

export default MessageTemplatesProvider;
