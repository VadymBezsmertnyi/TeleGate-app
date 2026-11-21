import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  logoTitleContainer: {
    alignItems: "center",
    gap: 20,
  },
  logo: {
    width: 124,
    height: 124,
    borderRadius: 72,
    borderWidth: 1,
    borderColor: colors.gray300,
  },
  titlesContainer: {
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.blue300,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: colors.gray300,
  },
  loginButton: {
    backgroundColor: "#0088cc",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 200,
  },
  loginButtonDisabled: {
    backgroundColor: "#ccc",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default styles;
