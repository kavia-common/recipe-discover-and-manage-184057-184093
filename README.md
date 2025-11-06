# recipe-discover-and-manage-184057-184093

This is an Expo React Native app scaffold for a recipe discovery and management experience.

How to run:
- cd recipe_frontend
- npm ci || npm install
- npm run start (or see web section below)

Web preview (port 3000):
- Ensure port 3000 is available.
- Run: `npm run web` (uses EXPO_PUBLIC_PORT if set, default 3000)
- For a full clean start (recommended on CI or after branch switches): `npm run web:clean`
- The preview will be served via Metro on http://localhost:3000

Troubleshooting Expo web / Metro cache:
- If you see build exit code 1 or Metro cache deserialization/serialization errors:
  1. From recipe_frontend: `npm ci || npm install`
  2. Clear Metro and bundler caches: `npm run web:clean`
  3. If issues persist, nuke caches and start offline: `npm run clean:metro`
- Ensure required peer dependencies are installed:
  - @react-native-async-storage/async-storage
  - @react-navigation/native, @react-navigation/bottom-tabs, @react-navigation/native-stack
  - react-native-gesture-handler, react-native-screens, react-native-safe-area-context
  - react-native-web, @expo/metro-runtime (bundled with expo), whatwg-fetch (polyfill on web)

Environment variables:
- EXPO_PUBLIC_PORT: Port for web (default 3000)
- EXPO_PUBLIC_LOG_LEVEL, EXPO_PUBLIC_FEATURE_FLAGS, EXPO_PUBLIC_EXPERIMENTS_ENABLED are read by the app

Notes:
- Uses React Navigation (bottom tabs + stack).
- Favorites are persisted with AsyncStorage (@react-native-async-storage/async-storage).
- Mock data located at recipe_frontend/assets/data/recipes.json
- Placeholder images are referenced by name; add actual images under recipe_frontend/assets/recipes or switch to remote URLs.
- Reads EXPO_PUBLIC_LOG_LEVEL, EXPO_PUBLIC_FEATURE_FLAGS, EXPO_PUBLIC_EXPERIMENTS_ENABLED if present (see .env.example).
- CI Android build guard: `npm run build` is a safe no-op unless `expo prebuild` has generated the native project. To produce an Android build locally: `npm run prebuild:android && npm run build`.