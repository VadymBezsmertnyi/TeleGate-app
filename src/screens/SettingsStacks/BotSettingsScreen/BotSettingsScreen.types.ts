export interface BotBehaviorSettings {
  autoRemoveExpired: boolean;
  gracePeriod: string;
  autoSendReminders: boolean;
  reminderInterval: string | null;
}

export interface IntegrationSettings {
  webhookUrl: string;
  secretToken: string;
  paymentProvider: string;
  currency: string;
}

export interface BotSettings {
  behavior: BotBehaviorSettings;
  integrations: IntegrationSettings;
}
