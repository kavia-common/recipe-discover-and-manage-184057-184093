#!/usr/bin/env bash
set -euo pipefail

# This script prevents CI failures when the android native project hasn't been generated yet.
# If the android folder or gradlew is missing, we exit gracefully with 0 to allow web/Expo builds to pass.
# To produce an Android build locally, run:
#   npm run prebuild:android && (cd android && ./gradlew assembleDebug)

if [ ! -d "android" ] || [ ! -f "android/gradlew" ]; then
  echo "Android project not initialized. Skipping Gradle build step."
  exit 0
fi

cd android
./gradlew assembleDebug
