import React, { FC, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";
import { useMessageTemplatesProvider, MessageTemplateT } from "../../../providers/MessageTemplatesProvider/MessageTemplatesProvider";



// components
import GradientBackground from "../../../components/GradientBackground/GradientBackground";
import CustomHeader from "../../../components/CustomHeader/CustomHeader";
import TemplateModal from "./components/TemplateModal/TemplateModal";
import TermsAndPrivacyFooter from "../../../components/TermsAndPrivacyFooter/TermsAndPrivacyFooter";

// styles
import { styles } from "./BotTemplatesScreen.styles";
import colors from "../../../styles/colors";

const BotTemplatesScreen: FC = () => {
  const { bottom } = useSafeAreaInsets();
  const { i18n } = useLocalesProvider();
  const { list, create, update, delete: deleteTemplate } = useMessageTemplatesProvider();

  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<MessageTemplateT | null>(null);
  const [templates, setTemplates] = useState<MessageTemplateT[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Load templates on component mount
  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const response = await list({
        page: 1,
        limit: 50,
        isActive: true,
      });
      setTemplates(response.data);
    } catch (error) {
      console.error("Error loading templates:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshTemplates = async () => {
    try {
      setRefreshing(true);
      await loadTemplates();
    } finally {
      setRefreshing(false);
    }
  };

  const toggleTemplate = (templateId: string) => {
    setExpandedTemplate(expandedTemplate === templateId ? null : templateId);
  };

  const handleResetTemplate = async (template: MessageTemplateT) => {
    Alert.alert(
      i18n._("Reset Template"),
      i18n._("Are you sure you want to reset this template to default?"),
      [
        { text: i18n._("Cancel"), style: "cancel" },
        {
          text: i18n._("Reset"),
          style: "destructive",
          onPress: async () => {
            try {
              // Reset to default content (you might want to store default content separately)
              const defaultContent = getDefaultContent(template.name);
              await update(template._id, {
                content: defaultContent,
              });
              await loadTemplates();
            } catch (error) {
              console.error("Error resetting template:", error);
            }
          },
        },
      ]
    );
  };

  const getDefaultContent = (templateName: string): string => {
    const defaultTemplates: Record<string, string> = {
      welcome: "Welcome {username} to {group}! We're glad to have you here.",
      removal: "Goodbye {username}! You have been removed from {group}.",
      renewal: "Hi {username}! Your subscription in {group} expires on {expiry_date}. Please renew to continue.",
    };
    return defaultTemplates[templateName.toLowerCase()] || templateName;
  };

  const handleAddTemplate = () => {
    setEditingTemplate(null);
    setIsModalVisible(true);
  };

  const handleEditTemplate = (template: MessageTemplateT) => {
    setEditingTemplate(template);
    setIsModalVisible(true);
  };

  const handleDeleteTemplate = async (template: MessageTemplateT) => {
    Alert.alert(
      i18n._("Delete Template"),
      i18n._("Are you sure you want to delete this template?"),
      [
        { text: i18n._("Cancel"), style: "cancel" },
        {
          text: i18n._("Delete"),
          style: "destructive",
          onPress: async () => {
            try {
              await deleteTemplate(template._id);
              await loadTemplates();
            } catch (error) {
              console.error("Error deleting template:", error);
            }
          },
        },
      ]
    );
  };

  const handleSaveTemplate = async (templateData: {
    title: string;
    description: string;
    message: string;
    variables: string[];
  }) => {
    try {
      if (editingTemplate) {
        // Update existing template
        await update(editingTemplate._id, {
          name: templateData.title,
          content: templateData.message,
          description: templateData.description,
          tags: templateData.variables,
        });
      } else {
        // Create new template
        await create({
          name: templateData.title,
          content: templateData.message,
          description: templateData.description,
          tags: templateData.variables,
        });
      }

      await loadTemplates();
      setIsModalVisible(false);
      setEditingTemplate(null);
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };

  const updateTemplateMessage = async (template: MessageTemplateT, message: string) => {
    try {
      await update(template._id, {
        content: message,
      });
      await loadTemplates();
    } catch (error) {
      console.error("Error updating template message:", error);
    }
  };

  if (loading) {
    return (
      <GradientBackground>
        <CustomHeader
          title={i18n._("Bot Templates")}
          showBackButton
        />
        <View style={[styles.content, styles.loadingContainer]}>
          <ActivityIndicator size="large" color={colors.white} />
          <Text style={styles.loadingText}>{i18n._("Loading templates...")}</Text>
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <CustomHeader
        title={i18n._("Bot Templates")}
        showBackButton
        rightIcon={<Ionicons name="add" size={24} color={colors.white} />}
        onRightPress={handleAddTemplate}
      />
      <ScrollView
        style={styles.content}
        contentContainerStyle={[
          styles.contentScrollView,
          { paddingBottom: bottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshTemplates}
            tintColor={colors.white}
            colors={[colors.white]}
          />
        }
      >
        {templates.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={64} color={colors.gray400} />
            <Text style={styles.emptyTitle}>{i18n._("No Templates")}</Text>
            <Text style={styles.emptyDescription}>
              {i18n._("Create your first message template to get started")}
            </Text>
            <TouchableOpacity style={styles.createFirstButton} onPress={handleAddTemplate}>
              <Text style={styles.createFirstButtonText}>{i18n._("Create Template")}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          templates.map((template) => (
            <View key={template._id} style={styles.templateCard}>
              {/* Template Header */}
              <TouchableOpacity
                style={styles.templateHeader}
                onPress={() => toggleTemplate(template._id)}
              >
                <View style={styles.templateHeaderLeft}>
                  <Text style={styles.templateTitle}>{template.name}</Text>
                  <TouchableOpacity style={styles.infoButton}>
                    <Ionicons
                      name="information-circle"
                      size={16}
                      color={colors.gray400}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.templateHeaderRight}>
                  <Text style={styles.usageCount}>{template.usageCount}</Text>
                  <Ionicons
                    name={
                      expandedTemplate === template._id
                        ? "chevron-down"
                        : "chevron-forward"
                    }
                    size={20}
                    color={colors.gray400}
                  />
                </View>
              </TouchableOpacity>

              {/* Template Description */}
              {template.description && (
                <Text style={styles.templateDescription}>
                  {template.description}
                </Text>
              )}

              {/* Template Tags */}
              {template.tags && template.tags.length > 0 && (
                <View style={styles.tagsContainer}>
                  {template.tags.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Expanded Content */}
              {expandedTemplate === template._id && (
                <View style={styles.templateContent}>
                  <TextInput
                    style={styles.messageInput}
                    value={template.content}
                    onChangeText={(text) => updateTemplateMessage(template, text)}
                    multiline
                    placeholder={i18n._("Enter your message template...")}
                    placeholderTextColor={colors.gray400}
                  />

                  {/* Action Buttons */}
                  <View style={styles.templateActions}>
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={() => handleEditTemplate(template)}
                    >
                      <Text style={styles.saveButtonText}>{i18n._("Edit")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.resetButton}
                      onPress={() => handleResetTemplate(template)}
                    >
                      <Text style={styles.resetButtonText}>
                        {i18n._("Reset to Default")}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteTemplate(template)}
                    >
                      <Text style={styles.deleteButtonText}>
                        {i18n._("Delete")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { paddingBottom: bottom + 16 }]}>
        <TermsAndPrivacyFooter />
      </View>

      {isModalVisible && (
        <TemplateModal
          visible={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
            setEditingTemplate(null);
          }}
          onSave={handleSaveTemplate}
          template={editingTemplate}
        />
      )}
    </GradientBackground>
  );
};

export default BotTemplatesScreen;
