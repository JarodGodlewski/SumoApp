import { View, Text, ScrollView } from 'react-native';

export default function LiveScreen() {
  return (
    <View className="flex-1 bg-[#0a0a0a]">
      <View className="bg-[#1a120b] pt-16 pb-8 px-6">
        <Text className="text-white text-4xl font-black text-center">LIVE BASHO</Text>
        <Text className="text-[#d4af37] text-center text-sm mt-2">Natsu Basho 2026 • Day 8</Text>
      </View>

      <ScrollView className="flex-1 p-6">
        <View className="bg-[#1f1f1f] rounded-3xl p-8 items-center">
          <Text className="text-6xl mb-6">📺</Text>
          <Text className="text-white text-2xl font-semibold mb-2">NHK World Sumo</Text>
          <Text className="text-gray-400 text-center">Livestream would appear here.</Text>
          <Text className="text-gray-500 text-xs mt-8 text-center">Offline mode: Latest highlights and cached matches would be shown.</Text>
        </View>

        <View className="mt-8 bg-[#1f1f1f] rounded-3xl p-6">
          <Text className="text-[#d4af37] text-sm font-medium mb-4">YOUR CHIBIS REACTING LIVE</Text>
          <View className="flex-row gap-4 justify-center">
            <View className="items-center">
              <Text className="text-4xl">🔥</Text>
              <Text className="text-white text-xs mt-1">Hakuho</Text>
            </View>
            <View className="items-center">
              <Text className="text-4xl">💪</Text>
              <Text className="text-white text-xs mt-1">Terunofuji</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}