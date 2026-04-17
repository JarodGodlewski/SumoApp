import { TouchableOpacity, Text } from 'react-native';
import * as Haptics from 'expo-haptics';

interface ButtonProps {
  title: string;
  subtitle?: string;
  variant?: 'primary' | 'secondary';
  onPress: () => void;
}

export function Button({ title, subtitle, variant = 'primary', onPress }: ButtonProps) {
  const isPrimary = variant === 'primary';

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`flex-1 py-8 rounded-3xl items-center shadow-2xl active:opacity-90 ${
        isPrimary ? 'bg-[#ff6b6b]' : 'bg-white border-2 border-[#ff6b6b]'
      }`}
    >
      <Text className={`font-black text-[22px] ${isPrimary ? 'text-white' : 'text-[#ff6b6b]'}`}>
        {title}
      </Text>
      {subtitle && (
        <Text className={`text-sm mt-1 tracking-widest ${isPrimary ? 'text-white/80' : 'text-[#d97757]'}`}>
          {subtitle}
        </Text>
      )}
    </TouchableOpacity>
  );
}
