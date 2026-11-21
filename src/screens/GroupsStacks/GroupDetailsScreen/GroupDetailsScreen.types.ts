export type GroupDetailsT = {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  status: "connected" | "disconnected";
  lastActivity: string;
  createdAt: string;
  adminCount: number;
  avatar: string;
  settings: {
    notifications: boolean;
    autoReply: boolean;
    welcomeMessage: string;
  };
};
