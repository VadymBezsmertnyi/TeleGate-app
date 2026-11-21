import React, { createContext, useContext, FC, useState } from "react";
import Toast from "react-native-toast-message";

// providers
import { useApiProvider } from "../ApiProvider/ApiProvider";

// constants
import PATHS from "../paths.constants";

// schemas
import {
  MembersQuerySchema,
  MembersWithSubscriptionsQuerySchema,
  OwnerMembersQuerySchema,
  MembersListResponseSchema,
  MembersWithSubscriptionsListResponseSchema,
  MemberResponseSchema,
  MemberWithSubscriptionResponseSchema,
} from "./MembersProvider.schemas";

// types
import {
  MembersQueryT,
  MembersWithSubscriptionsQueryT,
  OwnerMembersQueryT,
  MembersListResponseT,
  MembersWithSubscriptionsListResponseT,
  MemberResponseT,
  MemberWithSubscriptionResponseT,
} from "./MembersProvider.types";

type MembersContextType = {
  groupMembers: Record<string, MembersListResponseT>;
  groupMembersWithSubscriptions: Record<
    string,
    MembersWithSubscriptionsListResponseT
  >;
  list: (params: MembersQueryT) => Promise<MembersListResponseT>;
  listWithSubscriptions: (
    params: MembersWithSubscriptionsQueryT
  ) => Promise<MembersWithSubscriptionsListResponseT>;
  getWithSubscriptionsById: (
    id: string,
    groupId: string
  ) => Promise<MemberWithSubscriptionResponseT>;
  listOwner: (params?: OwnerMembersQueryT) => Promise<MembersListResponseT>;
  getById: (id: string) => Promise<MemberResponseT>;
  updateGroupMemberSubscription: (
    groupId: string,
    memberId: string
  ) => Promise<void>;
  refreshGroupMembers: (groupId: string) => Promise<void>;
};

type MembersProviderProps = { children: React.ReactNode };

const MembersContext = createContext<MembersContextType>(
  {} as MembersContextType
);

const MembersProvider: FC<MembersProviderProps> = ({ children }) => {
  const { api } = useApiProvider();
  const [groupMembers, setGroupMembers] = useState<
    Record<string, MembersListResponseT>
  >({});
  const [groupMembersWithSubscriptions, setGroupMembersWithSubscriptions] =
    useState<Record<string, MembersWithSubscriptionsListResponseT>>({});

  const list = async (params: MembersQueryT): Promise<MembersListResponseT> => {
    try {
      const validatedParams = MembersQuerySchema.parse(params);
      const queryParams = new URLSearchParams();

      Object.entries(validatedParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const url = `${PATHS.api.members.LIST}?${queryParams.toString()}`;
      const response = await api(url, {
        config: { method: "GET" },
        schema: MembersListResponseSchema,
      });
      if (!response)
        return {
          data: [],
          meta: { total: 0, page: 1, limit: params?.limit || 20, pages: 1 },
        };
      setGroupMembers((prev) => ({
        ...prev,
        [params.groupId || ""]: response,
      }));

      return response;
    } catch (error) {
      console.warn("Error fetching members:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch members",
      });
      return {
        data: [],
        meta: { total: 0, page: 1, limit: params?.limit || 20, pages: 1 },
      };
    }
  };

  const listWithSubscriptions = async (
    params: MembersWithSubscriptionsQueryT
  ): Promise<MembersWithSubscriptionsListResponseT> => {
    try {
      const validatedParams = MembersWithSubscriptionsQuerySchema.parse(params);
      const queryParams = new URLSearchParams();

      Object.entries(validatedParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const url = `${
        PATHS.api.members.WITH_SUBSCRIPTIONS
      }?${queryParams.toString()}`;
      const response = await api(url, {
        config: { method: "GET" },
        schema: MembersWithSubscriptionsListResponseSchema,
      });
      if (!response)
        return {
          data: [],
          meta: { total: 0, page: 1, limit: params?.limit || 20, pages: 1 },
        };

      setGroupMembersWithSubscriptions((prev) => ({
        ...prev,
        [params.groupId]: response,
      }));

      return response;
    } catch (error) {
      console.warn("Error fetching members with subscriptions:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch members with subscriptions",
      });
      return {
        data: [],
        meta: { total: 0, page: 1, limit: params?.limit || 20, pages: 1 },
      };
    }
  };

  const getWithSubscriptionsById = async (
    id: string,
    groupId: string
  ): Promise<MemberWithSubscriptionResponseT> => {
    try {
      const url = `${PATHS.api.members.WITH_SUBSCRIPTIONS_BY_ID(
        id
      )}?groupId=${groupId}`;
      const response = await api(url, {
        config: { method: "GET" },
        schema: MemberWithSubscriptionResponseSchema,
      });
      if (!response)
        throw new Error("Failed to fetch member with subscription");

      return response;
    } catch (error) {
      console.warn("Error fetching member with subscription:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch member with subscription",
      });
      throw error;
    }
  };

  const listOwner = async (
    params?: OwnerMembersQueryT
  ): Promise<MembersListResponseT> => {
    try {
      const validatedParams = params
        ? OwnerMembersQuerySchema.parse(params)
        : {};
      const queryParams = new URLSearchParams();

      Object.entries(validatedParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const url = `${PATHS.api.members.OWNER}?${queryParams.toString()}`;
      const response = await api(url, {
        config: { method: "GET" },
        schema: MembersListResponseSchema,
      });
      if (!response)
        return {
          data: [],
          meta: { total: 0, page: 1, limit: params?.limit || 20, pages: 1 },
        };

      return response;
    } catch (error) {
      console.warn("Error fetching owner members:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch owner members",
      });
      return {
        data: [],
        meta: { total: 0, page: 1, limit: params?.limit || 20, pages: 1 },
      };
    }
  };

  const getById = async (id: string): Promise<MemberResponseT> => {
    try {
      const url = PATHS.api.members.BY_ID(id);
      const response = await api(url, {
        config: { method: "GET" },
        schema: MemberResponseSchema,
      });

      if (!response) {
        throw new Error("Invalid response format");
      }

      return response;
    } catch (error) {
      console.warn("Error fetching member:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch member",
      });
      throw error;
    }
  };

  const updateGroupMemberSubscription = async (
    groupId: string,
    memberId: string
  ): Promise<void> => {
    try {
      const updatedMember = await getWithSubscriptionsById(memberId, groupId);

      setGroupMembersWithSubscriptions((prev) => {
        const groupData = prev[groupId];
        if (!groupData) return prev;

        const updatedData = groupData.data.map((member) =>
          member._id === memberId ? updatedMember.data : member
        );

        return {
          ...prev,
          [groupId]: {
            ...groupData,
            data: updatedData,
            meta: {
              ...groupData.meta,
              updatedAt: new Date().toISOString(),
            },
          },
        };
      });
    } catch (error) {
      console.warn("Error updating group member subscription:", error);
    }
  };

  const refreshGroupMembers = async (groupId: string): Promise<void> => {
    try {
      setGroupMembersWithSubscriptions((prev) => {
        const { [groupId]: removed, ...rest } = prev;
        return rest;
      });
    } catch (error) {
      console.warn("Error refreshing group members:", error);
    }
  };

  return (
    <MembersContext.Provider
      value={{
        groupMembers,
        groupMembersWithSubscriptions,
        list,
        listWithSubscriptions,
        getWithSubscriptionsById,
        listOwner,
        getById,
        updateGroupMemberSubscription,
        refreshGroupMembers,
      }}
    >
      {children}
    </MembersContext.Provider>
  );
};

export const useMembersProvider = () => useContext(MembersContext);

export default MembersProvider;
