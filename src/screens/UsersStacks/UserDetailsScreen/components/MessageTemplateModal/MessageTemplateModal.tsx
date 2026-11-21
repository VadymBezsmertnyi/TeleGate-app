import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";
import { useMessageTemplatesProvider } from "../../../../../providers/MessageTemplatesProvider/MessageTemplatesProvider";
import { useBotSendMessagesProvider } from "../../../../../providers/BotSendMessagesProvider/BotSendMessagesProvider";
import { useGroupsProvider } from "../../../../../providers/GroupsProvider/GroupsProvider";

// components
import ModalUniversal from "../../../../../components/ModalUniversal/ModalUniversal";

// types
import { MessageTemplateT } from "../../../../../providers/MessageTemplatesProvider/MessageTemplatesProvider.types";
import { GroupT } from "../../../../../providers/GroupsProvider/GroupsProvider.types";

// styles
import { styles } from "./MessageTemplateModal.styles";
import colors from "../../../../../styles/colors";

type MessageTemplateModalProps = {
  visible: boolean;
  onClose: () => void;
  userId: string;
  username?: string;
  groupName?: string;
};

const MessageTemplateModal: React.FC<MessageTemplateModalProps> = ({
  visible,
  onClose,
  userId,
  username,
  groupName,
}) => {
  const { i18n } = useLocalesProvider();
  const { list } = useMessageTemplatesProvider();
  const { sendMessage } = useBotSendMessagesProvider();
  const { list: listGroups } = useGroupsProvider();
  const [templates, setTemplates] = useState<MessageTemplateT[]>([]);
  const [groups, setGroups] = useState<GroupT[]>([]);
  const [selectedTemplate, setSelectedTemplate] =
    useState<MessageTemplateT | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<GroupT | null>(null);
  const [customMessage, setCustomMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGroups, setIsLoadingGroups] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const canSend = useMemo(
    () =>
      (selectedTemplate || customMessage.trim().length > 0) && selectedGroup,
    [selectedTemplate, customMessage, selectedGroup]
  );

  const fetchTemplates = async () => {
    try {
      setIsLoading(true);
      const response = await list({ page: 1, limit: 50 });
      setTemplates(response.data);
    } catch (error) {
      console.warn("Error fetching templates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGroups = async () => {
    try {
      setIsLoadingGroups(true);
      const response = await listGroups({
        page: 1,
        limit: 100,
        sortBy: "createdAt",
        order: "desc",
      });
      setGroups(response.data);

      if (response.data.length === 1) setSelectedGroup(response.data[0]);
    } catch (error) {
      console.warn("Error fetching groups:", error);
    } finally {
      setIsLoadingGroups(false);
    }
  };

  const handleTemplateSelect = (template: MessageTemplateT) => {
    setSelectedTemplate(template);
    setCustomMessage("");
  };

  const handleGroupSelect = (group: GroupT) => {
    setSelectedGroup(group);
  };

  const handleCustomMessageChange = (text: string) => {
    setCustomMessage(text);
    setSelectedTemplate(null);
  };

  const processMessage = (message: string): string => {
    return message
      .replace(/{username}/g, username || "User")
      .replace(/{group}/g, selectedGroup?.name || groupName || "Group")
      .replace(/{expiry_date}/g, new Date().toLocaleDateString())
      .replace(/{subscription_type}/g, "Premium");
  };

  const handleSendMessage = async () => {
    const messageToSend = selectedTemplate
      ? processMessage(selectedTemplate.content)
      : customMessage.trim();

    if (!messageToSend || !selectedGroup) {
      return;
    }

    try {
      setIsSending(true);
      await sendMessage({
        userId,
        message: messageToSend,
        tgChatId: selectedGroup.tgChatId,
      });
      onClose();
    } catch (error) {
      console.warn("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (!visible) return;

    fetchTemplates();
    fetchGroups();
  }, [visible]);

  return (
    <ModalUniversal visible={visible} onClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Send Message</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {groups.length > 1 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Select Group</Text>
              {isLoadingGroups ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <View style={styles.groupsContainer}>
                  {groups.map((group) => (
                    <TouchableOpacity
                      key={group.id}
                      style={[
                        styles.groupItem,
                        selectedGroup?.id === group.id && styles.selectedGroup,
                      ]}
                      onPress={() => handleGroupSelect(group)}
                    >
                      <View style={styles.groupInfo}>
                        <Text style={styles.groupName}>
                          {group.name || "Unnamed Group"}
                        </Text>
                        <Text style={styles.groupType}>{group.type}</Text>
                        <Text style={styles.groupMembers}>
                          {group.membersCount} members
                        </Text>
                      </View>
                      {selectedGroup?.id === group.id && (
                        <Ionicons
                          name="checkmark-circle"
                          size={20}
                          color={colors.successGreen}
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Templates Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Message Templates</Text>

            {isLoading ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : templates.length > 0 ? (
              <View style={styles.templatesContainer}>
                {templates.map((template) => (
                  <TouchableOpacity
                    key={template._id}
                    style={[
                      styles.templateItem,
                      selectedTemplate?._id === template._id &&
                        styles.selectedTemplate,
                    ]}
                    onPress={() => handleTemplateSelect(template)}
                  >
                    <Text style={styles.templateName}>{template.name}</Text>
                    <Text style={styles.templateContent} numberOfLines={2}>
                      {template.content}
                    </Text>
                    {template.description && (
                      <Text
                        style={styles.templateDescription}
                        numberOfLines={1}
                      >
                        {template.description}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text style={styles.noTemplatesText}>No templates available</Text>
            )}
          </View>

          {/* Custom Message Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Custom Message</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Type your custom message..."
              placeholderTextColor={colors.gray300}
              value={customMessage}
              onChangeText={handleCustomMessageChange}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Preview Section */}
          {(selectedTemplate || customMessage.trim()) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Message Preview</Text>
              <View style={styles.previewContainer}>
                <Text style={styles.previewText}>
                  {selectedTemplate
                    ? processMessage(selectedTemplate.content)
                    : customMessage}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.sendButton, !canSend && styles.sendButtonDisabled]}
            onPress={handleSendMessage}
            disabled={!canSend || isSending}
          >
            {isSending ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <>
                <Ionicons name="send" size={16} color={colors.white} />
                <Text style={styles.sendButtonText}>Send Message</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ModalUniversal>
  );
};

export default MessageTemplateModal;
