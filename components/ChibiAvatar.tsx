import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { ParticleBurst } from './ParticleBurst';
import { useKawaiiSpring } from '../hooks/useKawaiiSpring';

type ChibiAvatarProps = {
  name: string;
  size?: number;
  rank?: string;
  status?: 'win' | 'loss' | 'neutral';
  animated?: boolean;
};

export function ChibiAvatar({ name, size = 80, rank, status = 'neutral', animated = true }: ChibiAvatarProps) {
  const { triggerSpring } = useKawaiiSpring();
  const [showBurst, setShowBurst] = useState(false);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const bounce = useSharedValue(1);

  useEffect(() => {
    if (animated && status !== 'neutral') {
      const springConfig = status === 'win' ? triggerSpring('victory') : triggerSpring();
      scale.value = withSpring(status === 'win' ? 1.35 : 0.75, springConfig);
      rotation.value = withTiming(status === 'win' ? 12 : -18, { duration: 240 });
      bounce.value = withSpring(status === 'win' ? 1.15 : 0.9, { damping: 9, stiffness: 200 });

      if (status === 'win') {
        setShowBurst(true);
      }

      setTimeout(() => {
        scale.value = withSpring(1, triggerSpring());
        rotation.value = withTiming(0);
        bounce.value = withSpring(1);
        if (status === 'win') setShowBurst(false);
      }, 720);
    }
  }, [status, animated, triggerSpring]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value * bounce.value }, { rotate: `${rotation.value}deg` }],
  } as any));


  const initials = name.slice(0, 2).toUpperCase();
  const emoji = status === 'win' ? '🥋🔥' : status === 'loss' ? '💥🥋' : '🥋';
  const gradientColors: readonly [string, string, string] = rank?.includes('Yoko') 
    ? ['#ffd700', '#ffed9e', '#ff6b6b'] 
    : rank?.includes('Ozeki') 
    ? ['#c026d3', '#e879f9', '#a78bfa'] 
    : ['#ff9a9e', '#fad0c4', '#fbc2eb'];

  return (
    <View className="relative items-center justify-center">
      <Animated.View style={animatedStyle}>
        <LinearGradient
          colors={gradientColors}
          className="rounded-3xl overflow-hidden border-[6px] border-white shadow-[0_12px_40px_-10px_rgb(255,107,107,0.5)] relative"
          style={{ width: size, height: size }}
        >
          {/* Dohyo ring accent */}
          <View className="absolute inset-[3px] border-2 border-[#3a2f2f]/30 rounded-3xl" />
          
          <View className="flex-1 items-center justify-center bg-white/75 relative">
            <Text className="text-6xl mb-1">{emoji}</Text>
            <Text className="text-[11px] font-black text-[#3a2f2f] tracking-[2.5px] mt-0.5 opacity-90">{initials}</Text>
            <View className="absolute bottom-3 w-9 h-2 bg-[#3a2f2f] rounded-full" />
          </View>
        </LinearGradient>
      </Animated.View>

      {rank && (
        <View className="absolute -top-4 -right-4 bg-gradient-to-br from-red-500 to-pink-600 px-3.5 py-1 rounded-2xl border-2 border-white shadow-2xl">
          <Text className="text-white text-[10px] font-black tracking-widest drop-shadow-sm">{rank}</Text>
        </View>
      )}

      {status === 'win' && showBurst && (
        <ParticleBurst trigger={showBurst} color="#ff6b6b" onComplete={() => setShowBurst(false)} />
      )}
    </View>
  );
}
