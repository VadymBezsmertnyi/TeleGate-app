const { withAndroidManifest } = require("@expo/config-plugins");

module.exports = function withManifestReplaceRules(config) {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults;

    manifest.manifest.$ = manifest.manifest.$ || {};
    if (!manifest.manifest.$["xmlns:tools"])
      manifest.manifest.$["xmlns:tools"] = "http://schemas.android.com/tools";

    const app = manifest.manifest.application?.[0];
    if (app?.$) {
      const replaceKey = "tools:replace";
      const needed = [
        "android:dataExtractionRules",
        "android:fullBackupContent",
      ];

      const existing = (app.$[replaceKey] || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const merged = Array.from(new Set([...existing, ...needed]));
      app.$[replaceKey] = merged.join(",");
    }

    return config;
  });
};
