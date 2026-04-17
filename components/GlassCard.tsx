import { View, ViewProps } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { glassStyle } from '../src/utils/design';

interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  entering?: any;
}

export function GlassCard({ children, entering = FadeIn.duration(400), style, ...props }: GlassCardProps) {
  return (
    <Animated.View
      entering={entering}
      className={glassStyle}
      style={style}
      {...props}
    >
      {children}
    </Animated.View>
  );
}
