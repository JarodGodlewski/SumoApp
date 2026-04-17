import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useEffect } from 'react';
import { useRikishiList } from '../src/lib/sumoApi';
import { ChibiAvatar } from '../components/ChibiAvatar';
import { ParticleBurst } from '../components/ParticleBurst';
import Animated, { 
  FadeIn, 
  FadeInDown, 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

export default function StableScreen() {
  const { data: rikishi = [] } = useRikishiList();
  const stableRikishi = rikishi.slice(0, 8);

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleCardPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    scale.value = withSpring(0.96, { damping: 12, stiffness: 300 }, () => {
      scale.value = withSpring(1, { damping: 12, stiffness: 300 });
    });
  };

  return (
    <ScrollView className="flex-1 bg-[#fff8f0]" showsVerticalScrollIndicator={false}>
      {/* Ultra Premium Header */}
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

      {/* Your Stable - World Class Bento */}
      <View className="px-6 -mt-8">
        <Text className="font-black text-4xl text-[#3a2f2f] mb-7 tracking-tight">Your Stable</Text>
        
        <View className="flex-row flex-wrap gap-4">
          {stableRikishi.map((r: any, index) => (
            <TouchableOpacity 
              key={r.id} 
              onPress={handleCardPress}
              activeOpacity={0.95}
              className={`rounded-3xl overflow-hidden ${index % 3 === 0 ? 'w-[62%]' : 'w-[35%]'}`}
            >
              <Animated.View 
                entering={FadeInDown.delay(index * 60).duration(550)}
                className="bg-white/95 backdrop-blur-3xl border border-white/90 p-5 shadow-[0_20px_60px_-15px_rgb(0,0,0,0.25)]"
                style={[{ borderRadius: 24 }, animatedStyle]}
              >
                <View className="items-center">
                  <ChibiAvatar 
                    name={r.name} 
                    rank={r.rank} 
                    size={index % 3 === 0 ? 145 : 108} 
                    status="win" 
                  />
                </View>
                
                <Text className="text-center font-black text-[#3a2f2f] mt-5 text-[19px] tracking-[-0.3px]">
                  {r.name}
                </Text>
                <Text className="text-center text-[#d97757] text-[13px] mt-0.5 tracking-wide">
                  {r.rank}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Actions - Elevated */}
      <View className="px-6 mt-14 flex-row gap-4">
        <TouchableOpacity 
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
          className="flex-1 bg-[#ff6b6b] py-9 rounded-3xl items-center shadow-2xl active:opacity-90"
        >
          <Text className="text-white font-black text-[23px]">🔥 CHIBI RUMBLE</Text>
          <Text className="text-white/80 text-sm mt-1 tracking-widest">MINI GAME</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
          className="flex-1 bg-white border-[1.5px] border-[#ff6b6b] py-9 rounded-3xl items-center shadow-2xl active:opacity-90"
        >
          <Text className="text-[#ff6b6b] font-black text-[23px]">📺 LIVE NHK</Text>
          <Text className="text-[#d97757] text-sm mt-1 tracking-widest">WATCH NOW</Text>
        </TouchableOpacity>
      </View>

      {/* Today's Torikumi - Elevated */}
      <View className="px-6 mt-14 mb-24">
        <Text className="font-black text-4xl text-[#3a2f2f] mb-7 tracking-tight">Today's Torikumi</Text>
        
        <View className="space-y-4">
          <View className="bg-white/95 backdrop-blur-3xl border border-white/90 rounded-3xl p-7 flex-row justify-between items-center shadow-xl">
            <Text className="font-bold text-[18px]">Hoshoryu</Text>
            <View className="items-center">
              <Text className="text-[#d97757] text-xs tracking-[2px]">VS</Text>
            </View>
            <Text className="font-bold text-[18px] text-right">Ura</Text>
          </View>
          
          <View className="bg-white/95 backdrop-blur-3xl border border-white/90 rounded-3xl p-7 flex-row justify-between items-center shadow-xl">
            <Text className="font-bold text-[18px]">Terunofuji</Text>
            <View className="items-center">
              <Text className="text-[#d97757] text-xs tracking-[2px]">VS</Text>
            </View>
            <Text className="font-bold text-[18px] text-right">Mitakeumi</Text>
          </View>
        </View>
      </View>

      <ParticleBurst trigger={true} />
    </ScrollView>
  );
}
