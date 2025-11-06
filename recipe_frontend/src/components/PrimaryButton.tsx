import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { Colors, Radius, Spacing } from '../theme/colors';

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  style?: ViewStyle;
  disabled?: boolean;
};

// PUBLIC_INTERFACE
export function PrimaryButton({ title, onPress, loading, style, disabled }: Props) {
  /** Prominent CTA button with Ocean Professional styling. */
  const isDisabled = disabled || loading;
  return (
    <TouchableOpacity
      accessible
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={[styles.button, isDisabled && styles.disabled, style]}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 3,
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 0.3,
    fontSize: 16,
  },
  disabled: {
    backgroundColor: '#93C5FD',
  },
});
