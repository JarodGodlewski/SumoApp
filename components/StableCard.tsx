import { View, Text, TouchableOpacity } from 'react-native';
import { ChibiAvatar } from './ChibiAvatar';
import * as Haptics from 'expo-haptics';

interface StableCardProps {
  rikishi: any;
  size?: 'large' | 'medium';
  onPress?: () => void;
}

export function StableCard({ rikishi, size = 'medium', onPress }: StableCardProps) {
  const isLarge = size === 'large';

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.95}
      className={`bg-white/95 dark:bg-gray-800/95 backdrop-blur-3xl border border-white/90 dark:border-gray-700 rounded-3xl p-5 shadow-2xl ${isLarge ? 'w-[62%]' : 'w-[35%]'}`}
    >
      <View className="items-center">
        <ChibiAvatar 
          name={rikishi.name} 
          rank={rikishi.rank} 
          size={isLarge ? 145 : 100} 
          status="win" 
        />
      </View>
      
      <Text className="text-center font-black text-[#3a2f2f] dark:text-white mt-5 text-[17px] tracking-tight">
        {rikishi.name}
      </Text>
      <Text className="text-center text-[#d97757] dark:text-orange-300 text-[13px] mt-0.5 tracking-wide">
        {rikishi.rank}
      </Text>
    </TouchableOpacity>
  );
}
