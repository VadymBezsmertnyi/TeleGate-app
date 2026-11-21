import React, {
  createContext,
  useContext,
  FC,
  useState,
  useEffect,
} from "react";
import Toast from "react-native-toast-message";

// providers
import { useApiProvider } from "../ApiProvider/ApiProvider";
import { useAuthProvider } from "../AuthProvider/AuthProvider";

// constants
import PATHS from "../paths.constants";

// schemas
import {
  GroupsQuerySchema,
  OwnerGroupsQuerySchema,
  GroupsListResponseSchema,
  GroupResponseSchema,
} from "./GroupsProvider.schemas";

// types
import {
  GroupResponseT,
  GroupsListResponseT,
  GroupsQueryT,
  GroupT,
  OwnerGroupsQueryT,
} from "./GroupsProvider.types";

type GroupsContextType = {
  groups: GroupT[];
  isLoading: boolean;
  list: (params: GroupsQueryT) => Promise<GroupsListResponseT>;
  listOwner: (params?: OwnerGroupsQueryT) => Promise<GroupsListResponseT>;
  getById: (id: string) => Promise<GroupResponseT>;
  refreshGroups: () => Promise<void>;
};

type GroupsProviderProps = { children: React.ReactNode };

const GroupsContext = createContext<GroupsContextType>({} as GroupsContextType);

const GroupsProvider: FC<GroupsProviderProps> = ({ children }) => {
  const { api } = useApiProvider();
  const { user } = useAuthProvider();
  const [groups, setGroups] = useState<GroupT[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const list = async (params: GroupsQueryT): Promise<GroupsListResponseT> => {
    try {
      const validatedParams = GroupsQuerySchema.parse(params);
      const queryParams = new URLSearchParams();

      Object.entries(validatedParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const url = `${PATHS.api.groups.LIST}?${queryParams.toString()}`;
      const response = await api(url, {
        config: { method: "GET" },
        schema: GroupsListResponseSchema,
      });

      if (!response) {
        throw new Error("Invalid response format");
      }
      setGroups(response.data);

      return response;
    } catch (error) {
      console.warn("Error fetching groups:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch groups",
      });
      throw error;
    }
  };

  const refreshGroups = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await list({
        page: 1,
        limit: 100,
        sortBy: "createdAt",
        order: "desc",
      });
      setGroups(response.data);
    } catch (error) {
      console.warn("Error refreshing groups:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const listOwner = async (
    params?: OwnerGroupsQueryT
  ): Promise<GroupsListResponseT> => {
    try {
      const validatedParams = params
        ? OwnerGroupsQuerySchema.parse(params)
        : {};
      const queryParams = new URLSearchParams();

      Object.entries(validatedParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const url = `${PATHS.api.groups.OWNER}?${queryParams.toString()}`;
      const response = await api(url, {
        config: { method: "GET" },
        schema: GroupsListResponseSchema,
      });

      if (!response) {
        throw new Error("Invalid response format");
      }

      return response;
    } catch (error) {
      console.warn("Error fetching owner groups:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch owner groups",
      });
      throw error;
    }
  };

  const getById = async (id: string): Promise<GroupResponseT> => {
    try {
      const url = PATHS.api.groups.BY_ID(id);
      const response = await api(url, {
        config: { method: "GET" },
        schema: GroupResponseSchema,
      });

      if (!response) {
        throw new Error("Invalid response format");
      }

      return response;
    } catch (error) {
      console.warn("Error fetching group:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch group",
      });
      throw error;
    }
  };

  useEffect(() => {
    if (!user?.id) return;

    refreshGroups();
  }, [user?.id]);

  return (
    <GroupsContext.Provider
      value={{
        groups,
        isLoading,
        list,
        listOwner,
        getById,
        refreshGroups,
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
};

export const useGroupsProvider = () => useContext(GroupsContext);

export default GroupsProvider;
