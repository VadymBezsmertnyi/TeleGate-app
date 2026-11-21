import React, { FC, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// providers
import { useLocalesProvider } from "../../../../../../localization/localization.provider";
import { MessageTemplateT } from "../../../../../providers/MessageTemplatesProvider/MessageTemplatesProvider";

// styles
import { styles } from "./TemplateModal.styles";
import colors from "../../../../../styles/colors";
import ModalUniversal from "../../../../../components/ModalUniversal/ModalUniversal";

interface TemplateModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (template: {
    title: string;
    description: string;
    message: string;
    variables: string[];
  }) => void;
  template?: MessageTemplateT | null;
}

const TemplateModal: FC<TemplateModalProps> = ({
  visible,
  onClose,
  onSave,
  template,
}) => {
  const { i18n } = useLocalesProvider();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [variables, setVariables] = useState<string[]>([]);

  const isEditing = !!template;

  useEffect(() => {
    if (template) {
      setTitle(template.name);
      setDescription(template.description || "");
      setMessage(template.content);
      setVariables(template.tags || []);
    } else {
      setTitle("");
      setDescription("");
      setMessage("");
      setVariables([]);
    }
  }, [template, visible]);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert(i18n._("Error"), i18n._("Template title is required"));
      return;
    }
    if (!message.trim()) {
      Alert.alert(i18n._("Error"), i18n._("Template message is required"));
      return;
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      message: message.trim(),
      variables,
    });
  };

  const handleCancel = () => {
    Alert.alert(
      i18n._("Discard Changes"),
      i18n._("Are you sure you want to discard changes?"),
      [
        { text: i18n._("Cancel"), style: "cancel" },
        { text: i18n._("Discard"), style: "destructive", onPress: onClose },
      ]
    );
  };

  const addVariable = (variable: string) => {
    if (!variables.includes(variable)) {
      setVariables([...variables, variable]);
    }
  };

  const removeVariable = (variable: string) => {
    setVariables(variables.filter((v) => v !== variable));
  };

  const insertVariable = (variable: string) => {
    setMessage(message + variable);
  };

  const commonVariables = [
    "{username}",
    "{group}",
    "{expiry_date}",
    "{subscription_type}",
    "{payment_amount}",
    "{admin_name}",
  ];

  return (
    <ModalUniversal visible onClose={onClose}>
      <View style={styles.modalContent}>
        {/* Header */}
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>
            {isEditing ? i18n._("Edit Template") : i18n._("Create Template")}
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleCancel}>
            <Ionicons name="close" size={24} color={colors.gray400} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.modalBody}
          showsVerticalScrollIndicator={false}
        >
          {/* Template Title */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{i18n._("Template Title")}</Text>
            <TextInput
              style={styles.textInput}
              value={title}
              onChangeText={setTitle}
              placeholder={i18n._("Enter template title...")}
              placeholderTextColor={colors.gray400}
            />
          </View>

          {/* Template Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{i18n._("Description")}</Text>
            <TextInput
              style={styles.textInput}
              value={description}
              onChangeText={setDescription}
              placeholder={i18n._("Enter description...")}
              placeholderTextColor={colors.gray400}
            />
          </View>

          {/* Template Message */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{i18n._("Message Template")}</Text>
            <TextInput
              style={[styles.textInput, styles.messageInput]}
              value={message}
              onChangeText={setMessage}
              placeholder={i18n._("Enter your message template...")}
              placeholderTextColor={colors.gray400}
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* Available Variables */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {i18n._("Available Variables")}
            </Text>
            <Text style={styles.variablesDescription}>
              {i18n._("Tap on a variable to insert it into your message")}
            </Text>
            <View style={styles.variablesContainer}>
              {commonVariables.map((variable) => (
                <TouchableOpacity
                  key={variable}
                  style={[
                    styles.variableButton,
                    variables.includes(variable) && styles.variableButtonActive,
                  ]}
                  onPress={() => {
                    if (variables.includes(variable)) {
                      removeVariable(variable);
                    } else {
                      addVariable(variable);
                    }
                    insertVariable(variable);
                  }}
                >
                  <Text
                    style={[
                      styles.variableButtonText,
                      variables.includes(variable) &&
                        styles.variableButtonTextActive,
                    ]}
                  >
                    {variable}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Example Message */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{i18n._("Example Message")}</Text>
            <View style={styles.exampleContainer}>
              <Text style={styles.exampleText}>
                {i18n._(
                  "Welcome {username} to {group}! We're glad to have you here. Your subscription expires on {expiry_date}.",
                  {
                    username: "{username}",
                    group: "{group}",
                    expiry_date: "{expiry_date}",
                  }
                )}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.modalFooter}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>{i18n._("Cancel")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>
              {isEditing ? i18n._("Update") : i18n._("Create")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalUniversal>
  );
};

export default TemplateModal;
