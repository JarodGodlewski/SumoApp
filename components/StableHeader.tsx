import { View, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export function StableHeader() {
  return (
    <Animated.View 
      entering={FadeIn.duration(700)}
      className="pt-16 pb-14 px-6 bg-gradient-to-b from-[#fff1e6] via-[#fff1e6] to-[#fff8f0] relative"
    >
      <View className="flex-row justify-between items-start">
        <View>
          <Text className="text-7xl font-black text-[#3a2f2f] tracking-[-5px]">CHIBI SUMO</Text>
          <Text className="text-[#d97757] text-4xl -mt-3 tracking-tight">かわいい力士の幻想</Text>
        </View>
        
        <View className="items-end mt-2">
          <Text className="text-xs uppercase tracking-[4px] text-[#d97757]">NATSU BASHO 2026</Text>
          <Text className="text-[#ff6b6b] text-2xl font-bold">Day 8</Text>
        </View>
      </View>

      <View className="mt-12 flex-row justify-between items-end">
        <View>
          <Text className="text-5xl font-black text-[#3a2f2f]">Victorious</Text>
          <Text className="text-[#ff6b6b] text-3xl -mt-1">Stable 🔥</Text>
        </View>
        
        <View className="items-end">
          <Text className="text-xs uppercase tracking-[3px] text-[#d97757]">TABLE POWER</Text>
          <Text className="text-[72px] font-black text-[#ff6b6b] tracking-[-6px] -mt-4">248</Text>
        </View>
      </View>
    </Animated.View>
  );
}
