import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { ChibiAvatar } from './ChibiAvatar';

import type { Rikishi } from '../../types';

interface DraftCardProps {
  rikishi: Rikishi;
  isPicked: boolean;
  onPress: () => void;
}

export function DraftCard({ rikishi, isPicked, onPress }: DraftCardProps) {
  return (
    <Pressable 
      onPress={onPress}
      disabled={isPicked}
      className={`w-[47%] bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/70 dark:border-gray-600 rounded-3xl p-4 shadow-xl ${isPicked ? 'opacity-60' : 'active:scale-[0.98]'}`}
    >
      <View className="items-center">
        <ChibiAvatar 
          name={rikishi.name} 
          rank={rikishi.rank} 
          size={110} 
          status={isPicked ? 'win' : 'neutral'} 
        />
        
        <Text className="mt-4 text-center font-black text-[#3a2f2f] dark:text-white text-xl tracking-tight">
          {rikishi.name}
        </Text>
        <Text className="text-[#d97757] dark:text-orange-300 text-sm font-medium mt-0.5">
          {rikishi.rank}
        </Text>
      </View>
    </Pressable>
  );
}
