import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: colors.gray800,
  },
  handleStyle: {
    backgroundColor: colors.gray800,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.gray800,
    borderRadius: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray900,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.white,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gray900,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.gray300,
  },
  webViewContainer: {
    flex: 1,
    position: "relative",
    backgroundColor: colors.white,
  },
  webView: {
    flex: 1,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.gray900,
    fontWeight: "500",
  },
  loadingSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: colors.gray800,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  errorIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.gray100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  errorIcon: {
    fontSize: 40,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.gray900,
    marginBottom: 16,
    textAlign: "center",
  },
  errorMessage: {
    fontSize: 16,
    color: colors.gray700,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  errorSubtext: {
    fontSize: 14,
    color: colors.gray600,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  retryButton: {
    backgroundColor: colors.blue500,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 16,
    minWidth: 140,
    alignItems: "center",
  },
  retryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 10,
    minWidth: 140,
    alignItems: "center",
  },
  cancelButtonText: {
    color: colors.gray600,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default styles;
