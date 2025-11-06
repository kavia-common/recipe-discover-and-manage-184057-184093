import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing, Typography } from '../theme/colors';

// PUBLIC_INTERFACE
export default function ProfileScreen() {
  /** Simple settings/profile screen. Shows feature flags and log level if provided via EXPO_PUBLIC_* env variables. */
  const logLevel = process.env.EXPO_PUBLIC_LOG_LEVEL ?? 'info';
  const featureFlags = process.env.EXPO_PUBLIC_FEATURE_FLAGS ?? '';
  const experiments = process.env.EXPO_PUBLIC_EXPERIMENTS_ENABLED ?? '';

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.heading}>Profile</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Log level</Text>
          <Text style={styles.value}>{logLevel}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Feature Flags</Text>
          <Text style={styles.value}>{featureFlags || 'None'}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Experiments</Text>
          <Text style={styles.value}>{experiments || 'Disabled'}</Text>
        </View>
        <Text style={styles.footer}>Ocean Professional · Modern UI</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.xl },
  heading: { ...Typography.title, marginBottom: Spacing.lg },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  label: { ...Typography.caption, color: '#6B7280', marginBottom: 4 },
  value: { ...Typography.body, fontWeight: '600' },
  footer: { ...Typography.caption, color: '#6B7280', marginTop: Spacing.xl },
});
