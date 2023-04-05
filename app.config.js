require('dotenv').config();

export default {
  name: 'tour-guide',
  slug: 'tour-guide',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    jsEngine: 'hermes',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    OPEN_AI_KEY: process.env.OPEN_AI_KEY,
    eas: {
      projectId: 'c3d5c75d-dc2f-40fa-b593-7e7fdbae942b',
    },
  },
  owner: 'aicccia',
  plugins: ['expo-build-properties'],
};
