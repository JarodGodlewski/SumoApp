import { Text, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useEffect } from 'react';
import { useKawaiiSpring } from '../hooks/useKawaiiSpring';

interface KineticHeaderProps {
  children: string;
  size?: 'sm' | 'md' | 'lg';
  trigger?: boolean;
}

export function KineticHeader({ children, size = 'lg', trigger = true }: KineticHeaderProps) {
  const { triggerSpring } = useKawaiiSpring();
  const translateY = useSharedValue(20);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);

  useEffect(() => {
    if (trigger) {
      translateY.value = withSpring(0, triggerSpring('victory'));
      opacity.value = withSpring(1, triggerSpring());
      scale.value = withSpring(1, triggerSpring());
    }
  }, [trigger, triggerSpring]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  } as any));

  const sizeClass = size === 'lg' ? 'text-5xl' : size === 'md' ? 'text-3xl' : 'text-2xl';

  return (
    <Animated.View style={animatedStyle}>
      <Text className={`font-black tracking-[-3px] text-[#3a2f2f] ${sizeClass}`}>
        {children}
      </Text>
    </Animated.View>
  );
}
