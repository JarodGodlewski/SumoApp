import { View, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface DraftHeaderProps {
  timeLeft: string;
}

export function DraftHeader({ timeLeft }: DraftHeaderProps) {
  return (
    <Animated.View 
      entering={FadeIn.duration(600)}
      className="pt-12 pb-8 px-6 bg-gradient-to-b from-[#fff1e6] to-[#fff8f0]"
    >
      <Text className="text-5xl font-black text-[#3a2f2f] tracking-[-3px]">SNAKE DRAFT</Text>
      <Text className="text-[#d97757] text-2xl mt-1">Natsu Basho 2026</Text>
      
      <View className="mt-8 flex-row justify-between items-center bg-white/70 backdrop-blur-xl rounded-3xl px-6 py-4 border border-white/50">
        <View>
          <Text className="text-xs uppercase tracking-widest text-[#d97757]">TIME LEFT</Text>
          <Text className="text-4xl font-black text-[#3a2f2f]">{timeLeft}</Text>
        </View>
        <View className="text-right">
          <Text className="text-xs uppercase tracking-widest text-[#d97757]">ROUND</Text>
          <Text className="text-3xl font-black text-[#ff6b6b]">1</Text>
        </View>
      </View>
    </Animated.View>
  );
}
