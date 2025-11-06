# recipe-discover-and-manage-184057-184093

This is an Expo React Native app scaffold for a recipe discovery and management experience.

How to run:
- cd recipe_frontend
- npm install
- npm run start (or npm run web for web preview)

Web preview (port 3000):
- Ensure port 3000 is available.
- Run: `PORT=3000 npm run web`
- The preview will be served via Metro on http://localhost:3000

Notes:
- Uses React Navigation (bottom tabs + stack).
- Favorites are persisted with AsyncStorage (@react-native-async-storage/async-storage).
- Mock data located at recipe_frontend/assets/data/recipes.json
- Placeholder images are referenced by name; add actual images under recipe_frontend/assets/recipes or switch to remote URLs.
- Reads EXPO_PUBLIC_LOG_LEVEL, EXPO_PUBLIC_FEATURE_FLAGS, EXPO_PUBLIC_EXPERIMENTS_ENABLED if present (see .env.example).
- CI Android build guard: `npm run build` is a safe no-op unless `expo prebuild` has generated the native project. To produce an Android build locally: `npm run prebuild:android && npm run build`.