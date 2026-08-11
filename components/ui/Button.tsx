import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { ThemedText } from '../themed-text';

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle | ViewStyle[];
  variant?: 'primary' | 'ghost';
};

const Button: React.FC<Props> = ({ title, onPress, disabled, loading, style, variant = 'primary' }) => {
  const isPrimary = variant === 'primary';
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[styles.button, isPrimary ? styles.primary : styles.ghost, disabled && styles.disabled, style]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? colors.background : colors.primary} />
      ) : (
        <ThemedText style={[styles.text, isPrimary ? styles.textPrimary : styles.textGhost]}>{title}</ThemedText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  ghost: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.medium as any,
  },
  textPrimary: {
    color: colors.background,
  },
  textGhost: {
    color: colors.text,
  },
});

export default Button;
