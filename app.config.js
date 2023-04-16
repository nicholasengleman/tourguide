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
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBAESE_AUTH_DOMAIN: process.env.FIREBAESE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDING_ID: process.env.FIREBASE_MESSAGING_SENDING_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    eas: {
      projectId: 'c3d5c75d-dc2f-40fa-b593-7e7fdbae942b',
    },
  },
  owner: 'aicccia',
  plugins: ['expo-build-properties'],
};
