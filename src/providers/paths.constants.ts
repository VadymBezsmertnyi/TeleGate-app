const PATHS = {
  api: {
    users: {
      me: "users/me",
      pushTokens: {
        LIST: "users/push-tokens",
        GET: "users/push-tokens",
        BY_TOKEN: (token: string) => `users/push-tokens/${token}`,
      },
    },
    groups: {
      LIST: "groups",
      OWNER: "groups/owner",
      BY_ID: (id: string) => `groups/${id}`,
    },
    members: {
      LIST: "members",
      OWNER: "members/owner",
      WITH_SUBSCRIPTIONS: "members/with-subscriptions",
      WITH_SUBSCRIPTIONS_BY_ID: (id: string) =>
        `members/with-subscriptions/${id}`,
      BY_ID: (id: string) => `members/${id}`,
    },
    groupSubscriptions: {
      LIST: "group-subscriptions",
      BY_GROUP: (groupId: string) => `group-subscriptions/group/${groupId}`,
      BY_ID: (id: string) => `group-subscriptions/${id}`,
    },
    memberSubscriptions: {
      LIST: "member-subscriptions",
      GET_BY_ID: (id: string) => `member-subscriptions/${id}`,
      CREATE: "member-subscriptions",
      UPDATE: "member-subscriptions",
      DELETE: "member-subscriptions",
    },
    messageTemplates: {
      LIST: "message-templates",
      BY_ID: (id: string) => `message-templates/${id}`,
      STATS: "message-templates/stats/overview",
    },
    botSendMessages: {
      SEND_MESSAGE: "bot-send-messages/send-message",
    },
    auth: {
      telegram: {
        login: "auth-telegram/login",
      },
    },
  },
  external: {
    itunesLookup: "https://itunes.apple.com/lookup",
    playGoogleDetails: "https://play.google.com/store/apps/details",
  },
};

export default PATHS;
