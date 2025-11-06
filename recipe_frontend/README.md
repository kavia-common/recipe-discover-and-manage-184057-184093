# Recipe Frontend (Expo)

Run locally:
- npm ci || npm install
- npm run start

Web (port 3000 by default):
- npm run web
- Clean start (clears caches): npm run web:clean
- Deep clean + offline (helps with Metro cache deserialization issues): npm run clean:metro

Environment:
- EXPO_PUBLIC_PORT: overrides web port (default 3000)
- EXPO_PUBLIC_LOG_LEVEL, EXPO_PUBLIC_FEATURE_FLAGS, EXPO_PUBLIC_EXPERIMENTS_ENABLED are read by Profile screen for display.

Required dependencies (already declared in package.json):
- @react-native-async-storage/async-storage
- @react-navigation/native, @react-navigation/bottom-tabs, @react-navigation/native-stack
- react-native-gesture-handler, react-native-screens, react-native-safe-area-context
- react-native-web, @expo/metro-runtime, whatwg-fetch

Troubleshooting:
- If `npm run web` exits with code 1 or shows Metro cache errors:
  1) npm ci || npm install
  2) npm run web:clean
  3) If still failing: npm run clean:metro
- Ensure port 3000 is free or set EXPO_PUBLIC_PORT to a different value.
