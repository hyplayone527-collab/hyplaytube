export default {
  expo: {
    name: "NovaStream",
    slug: "novastream-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "dark",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#0f0f0f"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.novastreamteam.novastream"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#0f0f0f"
      },
      package: "com.novastreamteam.novastream"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL || "https://novastream-backend.onrender.com/api",
      socketUrl: process.env.EXPO_PUBLIC_SOCKET_URL || "https://novastream-backend.onrender.com"
    },
    plugins: [
      [
        "expo-camera",
        {
          cameraPermission: "Allow NovaStream to access your camera to record videos and take photos."
        }
      ],
      [
        "expo-media-library",
        {
          photosPermission: "Allow NovaStream to access your photos to share content.",
          savePhotosPermission: "Allow NovaStream to save photos and videos to your gallery."
        }
      ]
    ]
  }
}