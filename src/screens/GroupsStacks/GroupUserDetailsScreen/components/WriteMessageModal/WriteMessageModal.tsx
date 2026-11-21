import React, { FC, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

// types
import { MemberWithSubscriptionT } from "../../../../../providers/MembersProvider/MembersProvider.types";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";
import { useBotSendMessagesProvider } from "../../../../../providers/BotSendMessagesProvider/BotSendMessagesProvider";
import { useGroupsProvider } from "../../../../../providers/GroupsProvider/GroupsProvider";

// components
import ModalUniversal from "../../../../../components/ModalUniversal/ModalUniversal";

// styles
import { styles } from "./WriteMessageModal.styles";
import colors from "../../../../../styles/colors";

export type WriteMessageModalPropsT = {
  visible: boolean;
  onClose: () => void;
  user: MemberWithSubscriptionT | null;
  groupId: string | undefined;
};

const WriteMessageModal: FC<WriteMessageModalPropsT> = ({
  visible,
  onClose,
  user,
  groupId,
}) => {
  const { i18n } = useLocalesProvider();
  const { sendMessage } = useBotSendMessagesProvider();
  const { groups } = useGroupsProvider();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const selectGroup = useMemo(
    () => groups.find((g) => g.id === groupId) || null,
    [groupId, groups]
  );

  const handleSend = async () => {
    if (!message.trim()) {
      Toast.show({
        type: "error",
        text1: i18n._("Message cannot be empty"),
      });
      return;
    }

    if (!user) {
      Toast.show({
        type: "error",
        text1: i18n._("User not available"),
      });
      return;
    }

    if (!groupId) {
      Toast.show({
        type: "error",
        text1: i18n._("Group ID is required"),
      });
      return;
    }

    if (!selectGroup) {
      Toast.show({
        type: "error",
        text1: i18n._("Group not found"),
      });
      return;
    }

    try {
      setIsLoading(true);

      await sendMessage({
        userId: user.tgUserId,
        message: message.trim(),
        tgChatId: selectGroup.tgChatId,
      });

      setMessage("");
      onClose();
    } catch (error) {
      console.warn("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setMessage("");
    onClose();
  };

  const getDisplayName = () => {
    if (!user) return "";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    return `${firstName} ${lastName}`.trim() || i18n._("Unnamed user");
  };

  const getGroupName = () => {
    if (!selectGroup) return i18n._("Unknown group");
    return selectGroup.name || i18n._("Unnamed group");
  };

  return (
    <ModalUniversal visible={visible} onClose={onClose} isInputs={true}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{i18n._("Write message")}</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{i18n._("Recipient")}</Text>
            <View style={styles.recipientInfo}>
              <Text style={styles.recipientName}>{getDisplayName()}</Text>
              {user?.telegramUsername && (
                <Text style={styles.recipientUsername}>
                  @{user.telegramUsername}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{i18n._("Group")}</Text>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{getGroupName()}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{i18n._("Message")}</Text>
            <TextInput
              style={styles.textInput}
              placeholder={i18n._("Type your message here...")}
              placeholderTextColor={colors.gray300}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              maxLength={4000}
              editable={!isLoading}
            />
            <Text style={styles.characterCount}>{message.length}/4000</Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!message.trim() || isLoading) && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!message.trim() || isLoading}
          >
            <Ionicons name="send" size={16} color={colors.white} />
            <Text style={styles.sendButtonText}>
              {isLoading ? i18n._("Sending...") : i18n._("Send")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalUniversal>
  );
};

export default WriteMessageModal;
