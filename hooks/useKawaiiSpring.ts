import { useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import { withSpring, WithSpringConfig } from 'react-native-reanimated';

export const defaultKawaiiSpring: WithSpringConfig = {
  damping: 12,
  stiffness: 180,
  mass: 0.8,
};

export const victorySpring: WithSpringConfig = {
  damping: 8,
  stiffness: 220,
  mass: 0.6,
};

export function useKawaiiSpring() {
  const triggerSpring = useCallback((type: 'default' | 'victory' | 'bounce' = 'default', withHaptics = true) => {
    if (withHaptics) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    return type === 'victory' ? victorySpring : defaultKawaiiSpring;
  }, []);

  return { triggerSpring, defaultKawaiiSpring, victorySpring };
}
