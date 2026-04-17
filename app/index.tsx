import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { ChibiAvatar } from '../components/ChibiAvatar';
import { useRikishiList } from '../src/lib/sumoApi';
import { ParticleBurst } from '../components/ParticleBurst';

export default function StableScreen() {
  const { data: rikishi = [] } = useRikishiList();
  const demoStable = ['1', '9', '12', '14', '15', '16', '3', '7']; // Terunofuji, Hoshoryu, etc.

  const stableRikishi = demoStable
    .map(id => rikishi.find(r => r.id === id))
    .filter(Boolean);

  useEffect(() => {
    // Trigger confetti on load for "victorious" feel
  }, []);

  return (
    <ScrollView className="flex-1 bg-[#fff8f0]">
      {/* Kawaii Header */}
      <View className="pt-12 pb-8 px-6 bg-gradient-to-b from-[#fff1e6] to-[#fff8f0]">
        <Text className="text-5xl font-black text-[#3a2f2f] tracking-[-3px]">CHIBI SUMO</Text>
        <Text className="text-[#d97757] text-2xl">かわいい力士の幻想</Text>
        <Text className="text-3xl font-black text-[#ff6b6b] mt-6">Natsu Basho 2026 • Day 8</Text>
        <Text className="text-[#3a2f2f] text-6xl font-black tracking-tighter">248 PTS</Text>
        <Text className="text-emerald-500 text-xl">Victorious Stable 🔥</Text>
      </View>

      {/* Your Stable - Bento Grid */}
      <View className="px-6">
        <Text className="font-black text-2xl text-[#3a2f2f] mb-4">Your Stable</Text>
        <View className="flex-row flex-wrap gap-4">
          {stableRikishi.map((r: any) => (
            <View key={r.id} className="w-[47%]">
              <View className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-4 shadow-xl">
                <ChibiAvatar name={r.name} rank={r.rank} size={110} status="win" />
                <Text className="text-center font-black text-[#3a2f2f] mt-3 text-lg">{r.name}</Text>
                <Text className="text-center text-[#d97757] text-sm">{r.rank}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View className="px-6 mt-8 flex-row gap-3">
        <TouchableOpacity className="flex-1 bg-[#ff6b6b] py-6 rounded-3xl items-center">
          <Text className="text-white font-black text-xl">🔥 MINI GAME</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-white border-2 border-[#ff6b6b] py-6 rounded-3xl items-center">
          <Text className="text-[#ff6b6b] font-black text-xl">📺 LIVE NHK</Text>
        </TouchableOpacity>
      </View>

      {/* Today's Torikumi */}
      <View className="px-6 mt-10">
        <Text className="font-black text-2xl text-[#3a2f2f] mb-4">Today's Torikumi</Text>
        <View className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-5 space-y-4">
          <Text className="text-[#d97757]">Hoshoryu vs Ura • LIVE</Text>
          <Text className="text-[#d97757]">Terunofuji vs Mitakeumi • LIVE</Text>
        </View>
      </View>

      <ParticleBurst trigger={true} />
    </ScrollView>
  );
}
