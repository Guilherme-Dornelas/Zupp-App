import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { colors, radius, spacing } from '../../theme';
import { ThemedText } from '../themed-text';

type Props = TextInputProps & {
  label?: string;
  containerStyle?: any;
};

const Input: React.FC<Props> = ({ label, containerStyle, ...rest }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <ThemedText style={styles.label}>{label}</ThemedText> : null}
      <TextInput style={styles.input} placeholderTextColor={colors.muted} {...rest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.small,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    color: colors.text,
  },
});

export default Input;
