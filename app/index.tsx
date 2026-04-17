import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useEffect } from 'react';
import { useRikishiList } from '../src/lib/sumoApi';
import { ChibiAvatar } from '../components/ChibiAvatar';
import { ParticleBurst } from '../components/ParticleBurst';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function StableScreen() {
  const { data: rikishi = [] } = useRikishiList();
  const stableRikishi = rikishi.slice(0, 8);

  return (
    <ScrollView className="flex-1 bg-[#fff8f0]" showsVerticalScrollIndicator={false}>
      {/* Premium Header */}
      <Animated.View 
        entering={FadeIn.duration(600)}
        className="pt-14 pb-12 px-6 bg-gradient-to-b from-[#fff1e6] to-[#fff8f0]"
      >
        <Text className="text-6xl font-black text-[#3a2f2f] tracking-[-4px]">CHIBI SUMO</Text>
        <Text className="text-[#d97757] text-3xl -mt-1">かわいい力士の幻想</Text>

        <View className="mt-10 flex-row justify-between items-end">
          <View>
            <Text className="text-4xl font-black text-[#3a2f2f]">Natsu Basho 2026</Text>
            <Text className="text-[#ff6b6b] text-2xl mt-1">Day 8 • Victorious 🔥</Text>
          </View>
          
          <View className="items-end">
            <Text className="text-xs uppercase tracking-[3px] text-[#d97757]">TABLE POWER</Text>
            <Text className="text-7xl font-black text-[#ff6b6b] tracking-[-5px]">248</Text>
          </View>
        </View>
      </Animated.View>

      {/* Your Stable */}
      <View className="px-6 -mt-6">
        <Text className="font-black text-3xl text-[#3a2f2f] mb-6">Your Stable</Text>
        
        <View className="flex-row flex-wrap gap-4">
          {stableRikishi.map((r: any, index) => (
            <Animated.View 
              key={r.id} 
              entering={FadeInDown.delay(index * 80).duration(500)}
              className={`bg-white/95 backdrop-blur-2xl border border-white/80 rounded-3xl p-4 shadow-2xl ${index % 3 === 0 ? 'w-[62%]' : 'w-[35%]'}`}
            >
              <ChibiAvatar 
                name={r.name} 
                rank={r.rank} 
                size={index % 3 === 0 ? 135 : 100} 
                status="win" 
              />
              <Text className="text-center font-black text-[#3a2f2f] mt-4 text-[17px]">{r.name}</Text>
              <Text className="text-center text-[#d97757] text-[13px] mt-0.5 tracking-wide">{r.rank}</Text>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View className="px-6 mt-12 flex-row gap-4">
        <TouchableOpacity className="flex-1 bg-[#ff6b6b] py-8 rounded-3xl items-center active:opacity-90 shadow-xl">
          <Text className="text-white font-black text-[22px]">🔥 CHIBI RUMBLE</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-1 bg-white border-2 border-[#ff6b6b] py-8 rounded-3xl items-center active:opacity-90 shadow-xl">
          <Text className="text-[#ff6b6b] font-black text-[22px]">📺 LIVE NHK</Text>
        </TouchableOpacity>
      </View>

      {/* Today's Torikumi */}
      <View className="px-6 mt-12 mb-20">
        <Text className="font-black text-3xl text-[#3a2f2f] mb-6">Today's Torikumi</Text>
        
        <View className="space-y-4">
          <View className="bg-white/95 backdrop-blur-2xl border border-white/80 rounded-3xl p-6 flex-row justify-between items-center">
            <Text className="font-bold text-[17px]">Hoshoryu</Text>
            <Text className="text-[#d97757] text-sm font-medium">VS</Text>
            <Text className="font-bold text-[17px] text-right">Ura</Text>
          </View>
          
          <View className="bg-white/95 backdrop-blur-2xl border border-white/80 rounded-3xl p-6 flex-row justify-between items-center">
            <Text className="font-bold text-[17px]">Terunofuji</Text>
            <Text className="text-[#d97757] text-sm font-medium">VS</Text>
            <Text className="font-bold text-[17px] text-right">Mitakeumi</Text>
          </View>
        </View>
      </View>

      <ParticleBurst trigger={true} />
    </ScrollView>
  );
}
