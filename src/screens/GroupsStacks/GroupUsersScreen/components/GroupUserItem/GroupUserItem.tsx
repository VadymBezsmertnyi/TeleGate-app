import React, { FC } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../../../../../styles/colors";
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

import { styles } from "./GroupUserItem.styles";

interface GroupUserItemProps {
  member: {
    _id: string;
    firstName: string;
    lastName?: string | null;
    username?: string | null;
    photoUrl?: string | null;
    isBot: boolean;
    activeSubscriptionsCount?: number;
  };
  subscription?: {
    _id: string;
    startDate: Date;
    endDate: Date;
    status: "active" | "expired" | "expiring" | "none";
  };
  onPress: (memberId: string) => void;
}

const GroupUserItem: FC<GroupUserItemProps> = ({
  member,
  subscription,
  onPress,
}) => {
  const { i18n } = useLocalesProvider();
  const getDisplayName = () => {
    const firstName = member.firstName || "";
    const lastName = member.lastName || "";
    return `${firstName} ${lastName}`.trim() || i18n._("Unknown user");
  };

  const getUsername = () => {
    return member.username ? `@${member.username}` : "";
  };

  const getStatusColor = () => {
    if (!subscription) return colors.gray400;

    switch (subscription.status) {
      case "active":
        return colors.successGreen;
      case "expiring":
        return colors.warningYellow;
      case "expired":
        return colors.errorRed;
      default:
        return colors.gray400;
    }
  };

  const getStatusText = () => {
    if (!subscription) return i18n._("No subscription");

    switch (subscription.status) {
      case "active":
        return i18n._("Active");
      case "expiring":
        return i18n._("Expiring");
      case "expired":
        return i18n._("Expired");
      default:
        return i18n._("No subscription");
    }
  };

  const getStatusIcon = () => {
    if (!subscription) return "close-circle";

    switch (subscription.status) {
      case "active":
        return "checkmark-circle";
      case "expiring":
        return "warning";
      case "expired":
        return "close-circle";
      default:
        return "close-circle";
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <TouchableOpacity
      testID={`GroupUserItem-${member._id}`}
      style={styles.container}
      onPress={() => onPress(member._id)}
    >
      <View style={styles.avatarContainer}>
        {member.photoUrl ? (
          <Image
            source={{ uri: member.photoUrl }}
            style={styles.avatar}
            resizeMode="cover"
            onError={() => {
              // Якщо зображення не завантажилося, показуємо placeholder
              console.warn("Failed to load avatar:", member.photoUrl);
            }}
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Ionicons
              name={member.isBot ? "hardware-chip" : "person"}
              size={24}
              color={colors.gray300}
            />
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.memberName}>{getDisplayName()}</Text>

        {getUsername() ? (
          <Text style={styles.memberUsername}>{getUsername()}</Text>
        ) : null}

        <View style={styles.statusRow}>
          <Ionicons name={getStatusIcon()} size={16} color={getStatusColor()} />
          <Text style={styles.statusText}>{getStatusText()}</Text>
          {member.activeSubscriptionsCount &&
          member.activeSubscriptionsCount > 1 ? (
            <View style={styles.subscriptionCount}>
              <Text style={styles.subscriptionCountText}>
                +{member.activeSubscriptionsCount - 1}
              </Text>
            </View>
          ) : null}
        </View>

        {subscription && (
          <View style={styles.datesRow}>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>{i18n._("Until:")}</Text>
              <Text style={styles.dateValue}>
                {formatDate(subscription.endDate)}
              </Text>
            </View>
          </View>
        )}
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={colors.gray400}
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
};

export default GroupUserItem;
