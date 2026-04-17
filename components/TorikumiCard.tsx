import { View, Text } from 'react-native';

interface TorikumiCardProps {
  left: string;
  right: string;
}

export function TorikumiCard({ left, right }: TorikumiCardProps) {
  return (
    <View className="bg-white/95 backdrop-blur-3xl border border-white/90 rounded-3xl p-7 flex-row justify-between items-center shadow-xl">
      <Text className="font-bold text-[18px]">{left}</Text>
      <View className="items-center">
        <Text className="text-[#d97757] text-xs tracking-[2px]">VS</Text>
      </View>
      <Text className="font-bold text-[18px] text-right">{right}</Text>
    </View>
  );
}
