import { StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.gray900,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    marginBottom: 4,
  },
  memberUsername: {
    fontSize: 14,
    color: colors.gray300,
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  statusText: {
    fontSize: 14,
    color: colors.gray300,
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  statText: {
    fontSize: 14,
    color: colors.gray300,
    marginLeft: 4,
  },
  chevron: {
    marginLeft: 8,
  },
});

export default styles;
