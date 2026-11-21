import React, { createContext, useContext, FC, useState } from "react";
import Toast from "react-native-toast-message";

// providers
import { useApiProvider } from "../ApiProvider/ApiProvider";

// constants
import PATHS from "../paths.constants";

// schemas
import {
  GroupSubscriptionsQuerySchema,
  GroupSubscriptionsListResponseSchema,
  GroupSubscriptionResponseSchema,
  CreateGroupSubscriptionSchema,
  UpdateGroupSubscriptionSchema,
} from "./GroupSubscriptionsProvider.schemas";

// types
import {
  CreateGroupSubscriptionT,
  GroupSubscriptionResponseT,
  GroupSubscriptionsListResponseT,
  GroupSubscriptionsQueryT,
  GroupSubscriptionT,
  UpdateGroupSubscriptionT,
} from "./GroupSubscriptionsProvider.types";

// constants
export {
  SUBSCRIPTION_TYPES,
  SUBSCRIPTION_TYPES_ENUM,
  type SubscriptionType,
} from "./GroupSubscriptionsProvider.constants";

type GroupSubscriptionsContextType = {
  groupSubscriptions: Record<string, GroupSubscriptionT[]>;
  list: (
    params: GroupSubscriptionsQueryT
  ) => Promise<GroupSubscriptionsListResponseT>;
  listByGroup: (
    groupId: string,
    params?: GroupSubscriptionsQueryT
  ) => Promise<GroupSubscriptionsListResponseT>;
  getById: (id: string) => Promise<GroupSubscriptionResponseT>;
  create: (
    data: CreateGroupSubscriptionT
  ) => Promise<GroupSubscriptionResponseT>;
  update: (
    id: string,
    data: UpdateGroupSubscriptionT
  ) => Promise<GroupSubscriptionResponseT>;
  deleteSubscription: (id: string) => Promise<void>;
};

type GroupSubscriptionsProviderProps = { children: React.ReactNode };

const GroupSubscriptionsContext = createContext<GroupSubscriptionsContextType>(
  {} as GroupSubscriptionsContextType
);

const GroupSubscriptionsProvider: FC<GroupSubscriptionsProviderProps> = ({
  children,
}) => {
  const { api } = useApiProvider();
  const [groupSubscriptions, setGroupSubscriptions] = useState<
    Record<string, GroupSubscriptionT[]>
  >({});

  const list = async (
    params: GroupSubscriptionsQueryT
  ): Promise<GroupSubscriptionsListResponseT> => {
    try {
      const validatedParams = GroupSubscriptionsQuerySchema.parse(params);
      const queryParams = new URLSearchParams();

      Object.entries(validatedParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const url = `${
        PATHS.api.groupSubscriptions.LIST
      }?${queryParams.toString()}`;
      const response = await api(url, {
        config: { method: "GET" },
        schema: GroupSubscriptionsListResponseSchema,
      });

      if (!response) {
        throw new Error("Invalid response format");
      }

      return response;
    } catch (error) {
      console.warn("Error fetching group subscriptions:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch group subscriptions",
      });
      throw error;
    }
  };

  const listByGroup = async (
    groupId: string,
    params?: GroupSubscriptionsQueryT
  ): Promise<GroupSubscriptionsListResponseT> => {
    try {
      const validatedParams = params
        ? GroupSubscriptionsQuerySchema.parse(params)
        : {};
      const queryParams = new URLSearchParams();

      Object.entries(validatedParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const url = `${PATHS.api.groupSubscriptions.BY_GROUP(
        groupId
      )}?${queryParams.toString()}`;
      const response = await api(url, {
        config: { method: "GET" },
        schema: GroupSubscriptionsListResponseSchema,
      });
      setGroupSubscriptions((prev) => ({
        ...prev,
        [groupId]: response?.data || [],
      }));
      if (!response)
        return {
          data: [],
          meta: {
            total: 0,
            page: 1,
            limit: 10,
            pages: 0,
          },
        };
      return response;
    } catch (error) {
      console.warn("Error fetching group subscriptions by group:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch group subscriptions",
      });
      throw error;
    }
  };

  const getById = async (id: string): Promise<GroupSubscriptionResponseT> => {
    try {
      const url = PATHS.api.groupSubscriptions.BY_ID(id);
      const response = await api(url, {
        config: { method: "GET" },
        schema: GroupSubscriptionResponseSchema,
      });

      if (!response) {
        throw new Error("Invalid response format");
      }

      return response;
    } catch (error) {
      console.warn("Error fetching group subscription:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch group subscription",
      });
      throw error;
    }
  };

  const create = async (
    data: CreateGroupSubscriptionT
  ): Promise<GroupSubscriptionResponseT> => {
    try {
      const validatedData = CreateGroupSubscriptionSchema.parse(data);
      const url = PATHS.api.groupSubscriptions.LIST;
      const response = await api(url, {
        config: {
          method: "POST",
          data: validatedData,
        },
        schema: GroupSubscriptionResponseSchema,
      });

      if (!response) {
        throw new Error("Invalid response format");
      }

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Group subscription created successfully",
      });

      return response;
    } catch (error) {
      console.warn("Error creating group subscription:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to create group subscription",
      });
      throw error;
    }
  };

  const update = async (
    id: string,
    data: UpdateGroupSubscriptionT
  ): Promise<GroupSubscriptionResponseT> => {
    try {
      const validatedData = UpdateGroupSubscriptionSchema.parse(data);
      const url = PATHS.api.groupSubscriptions.BY_ID(id);
      const response = await api(url, {
        config: {
          method: "PUT",
          data: validatedData,
        },
        schema: GroupSubscriptionResponseSchema,
      });

      if (!response) {
        throw new Error("Invalid response format");
      }

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Group subscription updated successfully",
      });

      return response;
    } catch (error) {
      console.warn("Error updating group subscription:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update group subscription",
      });
      throw error;
    }
  };

  const deleteSubscription = async (id: string): Promise<void> => {
    try {
      const url = PATHS.api.groupSubscriptions.BY_ID(id);
      await api(url, {
        config: { method: "DELETE" },
      });

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Group subscription deleted successfully",
      });
    } catch (error) {
      console.warn("Error deleting group subscription:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to delete group subscription",
      });
      throw error;
    }
  };

  return (
    <GroupSubscriptionsContext.Provider
      value={{
        groupSubscriptions,
        list,
        listByGroup,
        getById,
        create,
        update,
        deleteSubscription,
      }}
    >
      {children}
    </GroupSubscriptionsContext.Provider>
  );
};

export const useGroupSubscriptionsProvider = () =>
  useContext(GroupSubscriptionsContext);

export default GroupSubscriptionsProvider;
