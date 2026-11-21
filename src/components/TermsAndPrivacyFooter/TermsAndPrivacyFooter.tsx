import React, { FC } from "react";
import { Text, View } from "react-native";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";
import { useWebViewProvider } from "../../providers/WebViewProvider/WebViewProvider";

// constants
import { WEBVIEW_URLS } from "../../providers/WebViewProvider/WebViewProvider.constants";

// styles
import styles from "./TermsAndPrivacyFooter.styles";

const TermsAndPrivacyFooter: FC = () => {
  const { i18n } = useLocalesProvider();
  const { openWebView } = useWebViewProvider();

  const onPressPrivacyPolicy = () => {
    openWebView({
      id: "privacy_policy",
      url: WEBVIEW_URLS.PRIVACY_POLICY,
      title: i18n._("Privacy Policy"),
    });
  };

  const onPressTermsOfUse = () => {
    openWebView({
      id: "terms_of_use",
      url: WEBVIEW_URLS.TERMS_OF_USE,
      title: i18n._("Terms of Use"),
    });
  };

  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        {i18n._("By using this app, you agree to our")}
        {"\n"}
        <Text onPress={onPressPrivacyPolicy} style={styles.footerLink}>
          {i18n._("Privacy Policy")}
        </Text>{" "}
        {i18n._("and")}{" "}
        <Text onPress={onPressTermsOfUse} style={styles.footerLink}>
          {i18n._("Terms of Use")}
        </Text>
        .
      </Text>
    </View>
  );
};

export default TermsAndPrivacyFooter;
