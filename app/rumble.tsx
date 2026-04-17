import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function RumbleScreen() {
  const [score, setScore] = useState(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.6;
      rotation.value = event.translationX * 0.1;
    })
    .onEnd(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      rotation.value = withSpring(0);
      if (Math.abs(translateX.value) > 60) {
        setScore(s => s + 10);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  return (
    <View className="flex-1 bg-[#0a0a0a] items-center justify-center relative overflow-hidden">
      {/* Dohyo Ring */}
      <View className="w-80 h-80 rounded-full border-8 border-[#d4af37] relative items-center justify-center">
        <View className="w-64 h-64 rounded-full border-4 border-[#8b5a2b] bg-[#1a120b]" />

        {/* Chibi Fighter */}
        <GestureDetector gesture={gesture}>
          <Animated.View 
            style={animatedStyle}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#ff6b6b] rounded-2xl items-center justify-center shadow-2xl border-4 border-white"
          >
            <Text className="text-5xl">🥋</Text>
            <Text className="text-[10px] text-white font-black -mt-1">CHIBI</Text>
          </Animated.View>
        </GestureDetector>

        {/* Opponent Chibi */}
        <View className="absolute top-2/3 right-1/3 w-20 h-20 bg-[#4ade80] rounded-2xl items-center justify-center shadow-xl border-4 border-white">
          <Text className="text-4xl">🥋</Text>
        </View>
      </View>

      <View className="absolute bottom-12 left-0 right-0 items-center">
        <Text className="text-white text-5xl font-mono font-black mb-2">{score}</Text>
        <Text className="text-[#d4af37] text-sm tracking-widest">PUSH POWER</Text>
        
        <TouchableOpacity 
          onPress={() => setScore(s => s + 25)}
          className="mt-8 bg-white px-10 py-4 rounded-2xl"
        >
          <Text className="text-[#0a0a0a] font-bold">STRONG PUSH</Text>
        </TouchableOpacity>
      </View>

      <Text className="absolute bottom-6 text-white/50 text-xs">Swipe to push the chibi • Real stats coming soon</Text>
    </View>
  );
}