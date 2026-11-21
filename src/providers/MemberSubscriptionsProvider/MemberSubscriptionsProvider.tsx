import React, { createContext, useContext, FC } from "react";
import Toast from "react-native-toast-message";

// schemas
import {
  MemberSubscriptionsQuerySchema,
  MemberSubscriptionsListResponseSchema,
  MemberSubscriptionResponseSchema,
  CreateMemberSubscriptionSchema,
  UpdateMemberSubscriptionSchema,
} from "./MemberSubscriptionsProvider.schemas";

// types
import {
  CreateMemberSubscriptionT,
  MemberSubscriptionResponseT,
  MemberSubscriptionsListResponseT,
  MemberSubscriptionsQueryT,
  UpdateMemberSubscriptionT,
} from "./MemberSubscriptionsProvider.types";

// providers
import { useApiProvider } from "../ApiProvider/ApiProvider";

// constants
import PATHS from "../paths.constants";

type MemberSubscriptionsContextType = {
  list: (
    params: MemberSubscriptionsQueryT
  ) => Promise<MemberSubscriptionsListResponseT>;
  listByMember: (
    memberId: string,
    params?: MemberSubscriptionsQueryT
  ) => Promise<MemberSubscriptionsListResponseT>;
  listByGroup: (
    groupId: string,
    params?: MemberSubscriptionsQueryT
  ) => Promise<MemberSubscriptionsListResponseT>;
  getById: (id: string) => Promise<MemberSubscriptionResponseT>;
  create: (
    data: CreateMemberSubscriptionT
  ) => Promise<MemberSubscriptionResponseT>;
  update: (
    id: string,
    data: UpdateMemberSubscriptionT
  ) => Promise<MemberSubscriptionResponseT>;
  delete: (id: string) => Promise<void>;
};

type MemberSubscriptionsProviderProps = { children: React.ReactNode };

const MemberSubscriptionsContext =
  createContext<MemberSubscriptionsContextType>(
    {} as MemberSubscriptionsContextType
  );

const MemberSubscriptionsProvider: FC<MemberSubscriptionsProviderProps> = ({
  children,
}) => {
  const { api } = useApiProvider();

  const list = async (
    params: MemberSubscriptionsQueryT
  ): Promise<MemberSubscriptionsListResponseT> => {
    try {
      const validatedParams = MemberSubscriptionsQuerySchema.parse(params);
      const queryParams = new URLSearchParams();

      Object.entries(validatedParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const url = `${
        PATHS.api.memberSubscriptions.LIST
      }?${queryParams.toString()}`;
      const response = await api(url, {
        config: { method: "GET" },
        schema: MemberSubscriptionsListResponseSchema,
      });

      if (!response) {
        throw new Error("Invalid response format");
      }

      return response;
    } catch (error) {
      console.warn("Error fetching member subscriptions:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch member subscriptions",
      });
      throw error;
    }
  };

  const listByMember = async (
    memberId: string,
    params?: MemberSubscriptionsQueryT
  ): Promise<MemberSubscriptionsListResponseT> => {
    const queryParams = {
      page: 1,
      limit: 20,
      order: "desc" as const,
      ...params,
      memberId,
    };
    return list(queryParams);
  };

  const listByGroup = async (
    groupId: string,
    params?: MemberSubscriptionsQueryT
  ): Promise<MemberSubscriptionsListResponseT> => {
    const queryParams = {
      page: 1,
      limit: 20,
      order: "desc" as const,
      ...params,
      groupId,
    };
    return list(queryParams);
  };

  const getById = async (id: string): Promise<MemberSubscriptionResponseT> => {
    try {
      const url = `${PATHS.api.memberSubscriptions.GET_BY_ID}/${id}`;
      const response = await api(url, {
        config: { method: "GET" },
        schema: MemberSubscriptionResponseSchema,
      });

      if (!response) {
        throw new Error("Invalid response format");
      }

      return response;
    } catch (error) {
      console.warn("Error fetching member subscription:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch member subscription",
      });
      throw error;
    }
  };

  const create = async (
    data: CreateMemberSubscriptionT
  ): Promise<MemberSubscriptionResponseT> => {
    try {
      const validatedData = CreateMemberSubscriptionSchema.parse(data);
      const response = await api(PATHS.api.memberSubscriptions.CREATE, {
        config: {
          method: "POST",
          data: validatedData,
        },
        schema: MemberSubscriptionResponseSchema,
      });

      if (!response) {
        throw new Error("Invalid response format");
      }

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Member subscription created successfully",
      });

      return response;
    } catch (error) {
      console.warn("Error creating member subscription:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to create member subscription",
      });
      throw error;
    }
  };

  const update = async (
    id: string,
    data: UpdateMemberSubscriptionT
  ): Promise<MemberSubscriptionResponseT> => {
    try {
      const validatedData = UpdateMemberSubscriptionSchema.parse(data);
      const url = `${PATHS.api.memberSubscriptions.UPDATE}/${id}`;
      const response = await api(url, {
        config: {
          method: "PUT",
          data: validatedData,
        },
        schema: MemberSubscriptionResponseSchema,
      });

      if (!response) {
        throw new Error("Invalid response format");
      }

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Member subscription updated successfully",
      });

      return response;
    } catch (error) {
      console.warn("Error updating member subscription:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update member subscription",
      });
      throw error;
    }
  };

  const deleteSubscription = async (id: string): Promise<void> => {
    try {
      const url = `${PATHS.api.memberSubscriptions.DELETE}/${id}`;
      await api(url, {
        config: { method: "DELETE" },
      });

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Member subscription deleted successfully",
      });
    } catch (error) {
      console.warn("Error deleting member subscription:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to delete member subscription",
      });
      throw error;
    }
  };

  const value: MemberSubscriptionsContextType = {
    list,
    listByMember,
    listByGroup,
    getById,
    create,
    update,
    delete: deleteSubscription,
  };

  return (
    <MemberSubscriptionsContext.Provider value={value}>
      {children}
    </MemberSubscriptionsContext.Provider>
  );
};

export const useMemberSubscriptionsProvider = () =>
  useContext(MemberSubscriptionsContext);

export default MemberSubscriptionsProvider;
