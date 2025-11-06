import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../theme/colors';

// PUBLIC_INTERFACE
export function TagChip({ label }: { label: string }) {
  /** A small rounded tag chip following Ocean Professional styling. */
  return (
    <View style={styles.container} accessibilityRole="text" accessibilityLabel={`Tag ${label}`}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
    backgroundColor: '#EFF6FF', // subtle blue tint
    borderWidth: 1,
    borderColor: '#DBEAFE',
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  text: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
});
