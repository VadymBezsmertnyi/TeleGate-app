import { MemberT } from "../../../providers/MembersProvider/MembersProvider.types";

// Доповнення до існуючого типу Member з бекенду
export interface UserDetailsI extends MemberT {
  // Додаткові поля, які не приходять з бекенду
  email?: string;
  phone?: string;
  telegramUsername?: string;
  status?: "active" | "expired" | "suspended";
  expiresAt?: Date;
  roles?: string[];
  subscriptionHistory?: Array<{
    type: string;
    event: string;
    date: Date;
    description?: string;
  }>;
  notes?: Array<{
    _id: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
}
