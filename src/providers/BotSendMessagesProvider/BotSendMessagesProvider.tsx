import React, { createContext, useContext, FC } from "react";
import Toast from "react-native-toast-message";

// providers
import { useApiProvider } from "../ApiProvider/ApiProvider";

// constants
import PATHS from "../paths.constants";

// schemas
import {
  SendMessageSchema,
  SendMessageResponseSchema,
} from "./BotSendMessagesProvider.schemas";

// types
import {
  SendMessageT,
  SendMessageResponseT,
} from "./BotSendMessagesProvider.types";

// Re-export types for external use
export type {
  SendMessageT,
  SendMessageResponseT,
} from "./BotSendMessagesProvider.types";

type BotSendMessagesContextType = {
  sendMessage: (data: SendMessageT) => Promise<SendMessageResponseT>;
};

type BotSendMessagesProviderProps = { children: React.ReactNode };

const BotSendMessagesContext = createContext<BotSendMessagesContextType>(
  {} as BotSendMessagesContextType
);

const BotSendMessagesProvider: FC<BotSendMessagesProviderProps> = ({
  children,
}) => {
  const { api } = useApiProvider();

  const sendMessage = async (
    data: SendMessageT
  ): Promise<SendMessageResponseT> => {
    try {
      const validatedData = SendMessageSchema.parse(data);
      const url = PATHS.api.botSendMessages.SEND_MESSAGE;
      const response = await api(url, {
        config: {
          method: "POST",
          data: validatedData,
        },
        schema: SendMessageResponseSchema,
      });
      if (!response) {
        throw new Error("Invalid response format");
      }

      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Message sent successfully",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: response.error || "Failed to send message",
        });
      }

      return response;
    } catch (error) {
      console.warn("Error sending message:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to send message",
      });
      throw error;
    }
  };

  return (
    <BotSendMessagesContext.Provider
      value={{
        sendMessage,
      }}
    >
      {children}
    </BotSendMessagesContext.Provider>
  );
};

export const useBotSendMessagesProvider = () =>
  useContext(BotSendMessagesContext);

export default BotSendMessagesProvider;
