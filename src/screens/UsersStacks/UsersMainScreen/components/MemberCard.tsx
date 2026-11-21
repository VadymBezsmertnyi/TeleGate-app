import React, { FC } from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// types
import { MemberT } from "../../../../providers/MembersProvider/MembersProvider.types";

// styles
import colors from "../../../../styles/colors";
import styles from "./MemberCard.styles";

interface MemberCardProps {
  member: MemberT;
  onPress: (memberId: string) => void;
}

const MemberCard: FC<MemberCardProps> = ({ member, onPress }) => {
  const getDisplayName = () => {
    const firstName = member.firstName || "";
    const lastName = member.lastName || "";
    return `${firstName} ${lastName}`.trim() || "Unknown User";
  };

  const getUsername = () => {
    return member.username ? `@${member.username}` : "";
  };

  const getStatusIcon = () => {
    return member.isBot ? "hardware-chip" : "person";
  };

  const getStatusColor = () => {
    return member.isBot ? colors.warningYellow : colors.successGreen;
  };

  return (
    <TouchableOpacity
      testID={`MemberCard-${member._id}`}
      style={styles.container}
      onPress={() => onPress(member._id)}
    >
      <View style={styles.avatarContainer}>
        {member.photoUrl ? (
          <Image source={{ uri: member.photoUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Ionicons name={getStatusIcon()} size={24} color={colors.gray300} />
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.memberName}>{getDisplayName()}</Text>

        {getUsername() && (
          <Text style={styles.memberUsername}>{getUsername()}</Text>
        )}

        <View style={styles.statusRow}>
          <Ionicons name={getStatusIcon()} size={16} color={getStatusColor()} />
          <Text style={styles.statusText}>{member.isBot ? "Bot" : "User"}</Text>
        </View>

        <View style={styles.statsRow}>
          {member.activeSubscriptionsCount !== undefined && (
            <View style={styles.statItem}>
              <Ionicons
                name="card"
                size={16}
                color={
                  member.activeSubscriptionsCount === 0
                    ? colors.errorRed
                    : colors.gray300
                }
              />
              <Text
                style={[
                  styles.statText,
                  member.activeSubscriptionsCount === 0 && {
                    color: colors.errorRed,
                  },
                ]}
              >
                {member.activeSubscriptionsCount}
              </Text>
            </View>
          )}

          {member.groupsCount !== undefined && (
            <View style={styles.statItem}>
              <Ionicons name="people" size={16} color={colors.gray300} />
              <Text style={styles.statText}>{member.groupsCount}</Text>
            </View>
          )}

          {member.subscriptionDelaysDays !== undefined && (
            <View style={styles.statItem}>
              <Ionicons
                name="time"
                size={16}
                color={
                  member.subscriptionDelaysDays === 0
                    ? colors.successGreen
                    : colors.orange
                }
              />
              <Text
                style={[
                  styles.statText,
                  {
                    color:
                      member.subscriptionDelaysDays === 0
                        ? colors.successGreen
                        : colors.orange,
                  },
                ]}
              >
                {member.subscriptionDelaysDays}
              </Text>
            </View>
          )}
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

export default MemberCard;
