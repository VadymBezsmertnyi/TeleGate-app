import { StyleSheet } from "react-native";
import colors from "../../../styles/colors";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  contentScrollView: {
    paddingTop: 10,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.gray800,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 4,
  },
  userUsername: {
    fontSize: 14,
    color: colors.gray300,
    marginBottom: 4,
  },
  userTelegramId: {
    fontSize: 14,
    color: colors.gray300,
  },
  settingsList: {
    paddingHorizontal: 16,
  },
});
