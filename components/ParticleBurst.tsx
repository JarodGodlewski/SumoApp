import { View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import { useEffect, useState } from 'react';

interface ParticleBurstProps {
  trigger: boolean;
  onComplete?: () => void;
  color?: string;
}

export function ParticleBurst({ trigger, onComplete, color = '#ff6b6b' }: ParticleBurstProps) {
  const scale = useSharedValue(0.2);
  const opacity = useSharedValue(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!trigger || isActive) return;

    setIsActive(true);
    scale.value = 0.2;
    opacity.value = 0.9;

    scale.value = withSpring(2.8, { damping: 10, stiffness: 60 });
    opacity.value = withTiming(0, { duration: 650 }, () => {
      runOnJS(() => {
        setIsActive(false);
        onComplete?.();
      })();
    });
  }, [trigger, isActive, onComplete]);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  } as any));

  return (
    <View className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
      <Animated.View
        style={[
          style,
          {
            width: 120,
            height: 120,
            borderRadius: 60,
            borderWidth: 8,
            borderColor: color,
          },
        ]}
      />
    </View>
  );
}
