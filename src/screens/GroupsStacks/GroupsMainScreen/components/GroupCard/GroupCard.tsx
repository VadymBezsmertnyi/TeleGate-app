import React from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// types
import { GroupT } from "../../../../../providers/GroupsProvider/GroupsProvider.types";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";

// styles
import colors from "../../../../../styles/colors";
import styles from "./GroupCard.styles";

export type GroupCardPropsT = {
  group: GroupT;
  onPress: (groupId: string) => void;
};

const GroupCard: React.FC<GroupCardPropsT> = ({ group, onPress }) => {
  const { i18n } = useLocalesProvider();

  const getStatusColor = () => {
    const connectedStatuses = ["creator", "administrator", "member"];
    return connectedStatuses.includes(group.botStatus || "")
      ? colors.gray300
      : colors.gray800;
  };

  const getStatusText = () => {
    const connectedStatuses = ["creator", "administrator", "member"];
    return connectedStatuses.includes(group.botStatus || "")
      ? i18n._("Connected")
      : i18n._("Disconnected");
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  return (
    <TouchableOpacity
      testID={`GroupCard-${group.id}`}
      style={styles.container}
      onPress={() => onPress(group.id)}
    >
      {group.photoUrl && (
        <Image source={{ uri: group.photoUrl }} style={styles.avatar} />
      )}
      <View style={styles.content}>
        <Text style={styles.groupName}>
          {group.name || i18n._("Unnamed Group")}
        </Text>
        <View style={styles.infoRow}>
          <Ionicons name="people" size={16} color={colors.gray300} />
          <Text style={styles.memberCount}>{group.membersCount}</Text>
          <Ionicons name="card" size={16} color={colors.gray300} />
          <Text style={styles.subscriptionCount}>
            {group.subscriptionsCount}
          </Text>
          {group.type && (
            <>
              <Ionicons name="chatbubbles" size={16} color={colors.gray300} />
              <Text style={styles.role}>{group.type}</Text>
            </>
          )}
        </View>

        <View style={styles.subscriptionInfoRow}>
          <View style={styles.subscriptionItemsRow}>
            <View style={styles.subscriptionItem}>
              <Ionicons
                name="checkmark-circle"
                size={14}
                color={colors.green}
              />
              <Text style={styles.subscriptionText}>
                {group.usersWithSubscriptionCount}
              </Text>
            </View>
            <View style={styles.subscriptionItem}>
              <Ionicons name="time" size={14} color={colors.orange} />
              <Text style={styles.subscriptionText}>
                {group.usersWithExpiredSubscriptionCount}
              </Text>
            </View>
            <View style={styles.subscriptionItem}>
              <Ionicons name="close-circle" size={14} color={colors.red} />
              <Text style={styles.subscriptionText}>
                {group.usersWithoutSubscriptionCount}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.statusRow}>
          <View
            style={[styles.statusChip, { backgroundColor: getStatusColor() }]}
          >
            <Text style={styles.statusText}>{getStatusText()}</Text>
          </View>
          <Ionicons name="time" size={14} color={colors.gray300} />
          <Text style={styles.lastActivity}>{formatDate(group.updatedAt)}</Text>
        </View>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={colors.gray300}
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
};

export default GroupCard;
