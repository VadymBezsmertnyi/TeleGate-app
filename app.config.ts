import "dotenv/config";

const EXPO_PUBLIC_APPLE_TEAM_ID = process.env.EXPO_PUBLIC_APPLE_TEAM_ID || "";
const EXPO_PUBLIC_FIREBASE_PROJECT_ID =
  process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "";

module.exports = () => ({
  expo: {
    name: "TeleGate",
    slug: "telegate",
    scheme: "telegate",
    version: "1.0.1",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    ios: {
      splash: {
        backgroundColor: "#000000",
        image: "./assets/new-splash.jpeg",
        enableFullScreenImage_legacy: true,
        resizeMode: "cover",
        tabletImage: "./assets/new-splash.jpeg",
      },
      appleTeamId: EXPO_PUBLIC_APPLE_TEAM_ID,
      supportsTablet: true,
      bundleIdentifier: "com.TeleGate.app",
      buildNumber: "13",
      googleServicesFile: "./keys/GoogleService-Info.plist",
      infoPlist: {
        LSApplicationQueriesSchemes: ["tg", "tgapi", "telegate"],
        CFBundleURLTypes: [
          {
            CFBundleURLName: "telegate",
            CFBundleURLSchemes: ["telegate"],
          },
        ],
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: false,
          NSAllowsArbitraryLoadsForMedia: true,
          NSAllowsArbitraryLoadsInWebContent: true,
          UIBackgroundModes: ["remote-notification"],
          NSExceptionDomains: {
            "api.example.com": {
              NSExceptionAllowsInsecureHTTPLoads: true,
              NSExceptionRequiresForwardSecrecy: false,
              NSExceptionMinimumTLSVersion: "TLSv1.0",
              NSThirdPartyExceptionAllowsInsecureHTTPLoads: true,
              NSThirdPartyExceptionRequiresForwardSecrecy: false,
              NSIncludesSubdomains: true,
            },
            "telegram.org": {
              NSExceptionAllowsInsecureHTTPLoads: false,
              NSExceptionRequiresForwardSecrecy: false,
              NSExceptionMinimumTLSVersion: "TLSv1.0",
              NSIncludesSubdomains: true,
            },
            "core.telegram.org": {
              NSExceptionAllowsInsecureHTTPLoads: false,
              NSExceptionRequiresForwardSecrecy: false,
              NSExceptionMinimumTLSVersion: "TLSv1.0",
              NSIncludesSubdomains: true,
            },
            localhost: {
              NSExceptionAllowsInsecureHTTPLoads: true,
              NSExceptionMinimumTLSVersion: "TLSv1.0",
              NSIncludesSubdomains: true,
            },
          },
        },
      },
      config: {
        usesNonExemptEncryption: false,
      },
    },
    android: {
      splash: {
        backgroundColor: "#000000",
        image: "./assets/new-splash.jpeg",
        resizeMode: "native",
        mdpi: "./assets/new-splash.jpeg",
        hdpi: "./assets/new-splash.jpeg",
        xhdpi: "./assets/new-splash.jpeg",
        xxhdpi: "./assets/new-splash.jpeg",
        xxxhdpi: "./assets/new-splash.jpeg",
      },
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: "com.TeleGate.app",
      versionCode: 13,
      googleServicesFile: "./keys/google-services.json",
      intentFilters: [
        {
          action: "VIEW",
          category: ["BROWSABLE", "DEFAULT"],
          data: [{ scheme: "telegate" }],
        },
      ],
      networkSecurityConfig: {
        domain: [
          {
            domain: "telegram.org",
            includeSubdomains: true,
          },
          {
            domain: "core.telegram.org",
            includeSubdomains: true,
          },
          {
            domain: "localhost",
            includeSubdomains: true,
            cleartextTrafficPermitted: true,
          },
        ],
      },
      permissions: ["INTERNET", "WAKE_LOCK", "VIBRATE", "RECEIVE", "BILLING"],
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: { projectId: "89c0f408-cf7e-4686-a802-e0daf3e3755b" },
      firebase: {
        projectId: EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      },
    },
    owner: "fop_vadym_bezsmertnyi",
    plugins: [
      "./plugins/withCustomAndroidManifest",
      "@react-native-firebase/messaging",
      "expo-localization",
      [
        "expo-build-properties",
        { ios: { useFrameworks: "static", forceStaticLinking: ["RNFBApp"] } },
      ],
      "expo-font",
      "expo-secure-store",
      "expo-splash-screen",
      ["expo-web-browser", { experimentalLauncherActivity: true }],
      ["expo-notifications", {}],
      "@react-native-firebase/app",
    ],
  },
});
