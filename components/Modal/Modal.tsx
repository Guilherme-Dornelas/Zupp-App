// Reusable modal component (visual only) - touched to refresh diagnostics
import { ReactNode } from 'react';
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    useWindowDimensions,
    View,
    type ViewStyle,
} from 'react-native';
// Avoid importing SafeAreaView/useSafeAreaInsets here to prevent typing conflicts;
// modal content will rely on internal padding and the caller can control spacing.

import { ThemedText } from '@/components/themed-text';

export type ReusableModalSize = 'compact' | 'large';

export type ReusableModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  size?: ReusableModalSize;
  children: ReactNode;
  dismissible?: boolean;
  showHandle?: boolean;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
};

const SIZE_CONFIG: Record<ReusableModalSize, { heightRatio: number; maxHeight: number }> = {
  compact: { heightRatio: 0.45, maxHeight: 420 },
  large: { heightRatio: 0.76, maxHeight: 700 },
};

export function ReusableModal({
  visible,
  onClose,
  title,
  size = 'compact',
  children,
  dismissible = true,
  showHandle = true,
  containerStyle,
  contentStyle,
}: ReusableModalProps) {
  const { height: screenHeight } = useWindowDimensions();
  const { heightRatio, maxHeight } = SIZE_CONFIG[size];
  const modalHeight = Math.min(screenHeight * heightRatio, maxHeight);

  const handleOverlayPress = () => {
    if (dismissible) {
      onClose();
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={handleOverlayPress}>
        <Pressable
          style={[styles.modalContainer, { minHeight: modalHeight }, containerStyle]}
          onPress={() => undefined}
        >
          <View style={styles.safeArea}>
            {showHandle ? (
              <View style={styles.handleWrapper}>
                <View style={styles.handle} />
              </View>
            ) : null}

            <ThemedText style={styles.title} type="defaultSemiBold">
              {title}
            </ThemedText>

            <ScrollView
              contentContainerStyle={[styles.content, contentStyle, { paddingBottom: 32 }]}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.36)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 24,
  },
  safeArea: {
    flex: 1,
  },
  handleWrapper: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  handle: {
    width: 48,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
