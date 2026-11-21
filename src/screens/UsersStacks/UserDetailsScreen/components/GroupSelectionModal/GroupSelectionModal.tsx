import React, { FC, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

// types
import { MemberT } from "../../../../../providers/MembersProvider/MembersProvider.types";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";
import { useBotSendMessagesProvider } from "../../../../../providers/BotSendMessagesProvider/BotSendMessagesProvider";

// components
import ModalUniversal from "../../../../../components/ModalUniversal/ModalUniversal";

// styles
import { styles } from "./GroupSelectionModal.styles";
import colors from "../../../../../styles/colors";

export type GroupSelectionModalPropsT = {
  visible: boolean;
  onClose: () => void;
  user: MemberT | null;
  onSuccess: () => void;
};

const GroupSelectionModal: FC<GroupSelectionModalPropsT> = ({
  visible,
  onClose,
  user,
  onSuccess,
}) => {
  const { i18n } = useLocalesProvider();
  const { sendMessage } = useBotSendMessagesProvider();
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      setSelectedGroups([]);
      setMessage("");
    }
  }, [visible]);

  const handleGroupToggle = (groupId: string) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleSendMessage = async () => {
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

    if (selectedGroups.length === 0) {
      Toast.show({
        type: "error",
        text1: i18n._("Please select at least one group"),
      });
      return;
    }

    try {
      setIsLoading(true);

      // Send message to each selected group
      for (const groupId of selectedGroups) {
        await sendMessage({
          userId: user.tgUserId,
          message: message.trim(),
          tgChatId: groupId,
        });
      }

      Toast.show({
        type: "success",
        text1: i18n._("Message sent successfully"),
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.warn("Failed to send message:", error);
      Toast.show({
        type: "error",
        text1: i18n._("Failed to send message"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedGroups([]);
    setMessage("");
    onClose();
  };

  const availableGroups = user?.groups || [];

  return (
    <ModalUniversal visible={visible} onClose={handleClose} isInputs={true}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{i18n._("Send Message")}</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{i18n._("User")}</Text>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {user?.firstName} {user?.lastName}
              </Text>
              {user?.username && (
                <Text style={styles.userUsername}>@{user.username}</Text>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {i18n._("Select Groups")} ({selectedGroups.length}/
              {availableGroups.length})
            </Text>

            {availableGroups.length > 0 ? (
              <View style={styles.groupsList}>
                {availableGroups.map((group) => (
                  <TouchableOpacity
                    key={group._id}
                    style={[
                      styles.groupItem,
                      selectedGroups.includes(group._id) &&
                        styles.groupItemSelected,
                    ]}
                    onPress={() => handleGroupToggle(group._id)}
                  >
                    <View style={styles.groupInfo}>
                      <Text style={styles.groupName}>{group.title}</Text>
                    </View>
                    {selectedGroups.includes(group._id) && (
                      <View style={styles.selectedIndicator}>
                        <Ionicons
                          name="checkmark-circle"
                          size={20}
                          color={colors.successGreen}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.noGroupsContainer}>
                <Ionicons
                  name="people-outline"
                  size={48}
                  color={colors.gray300}
                />
                <Text style={styles.noGroupsText}>
                  {i18n._("User is not a member of any groups")}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{i18n._("Message")}</Text>
            <TextInput
              style={styles.textInput}
              value={message}
              onChangeText={setMessage}
              placeholder={i18n._("Type your message here...")}
              placeholderTextColor={colors.gray400}
              multiline
              maxLength={1000}
            />
            <Text style={styles.characterCount}>{message.length}/1000</Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.sendButton,
              (selectedGroups.length === 0 || !message.trim() || isLoading) &&
                styles.sendButtonDisabled,
            ]}
            onPress={handleSendMessage}
            disabled={
              selectedGroups.length === 0 || !message.trim() || isLoading
            }
          >
            {isLoading ? (
              <ActivityIndicator size={20} color={colors.white} />
            ) : (
              <Ionicons name="send" size={20} color={colors.white} />
            )}
            <Text style={styles.sendButtonText}>
              {isLoading ? i18n._("Sending...") : i18n._("Send Message")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalUniversal>
  );
};

export default GroupSelectionModal;
