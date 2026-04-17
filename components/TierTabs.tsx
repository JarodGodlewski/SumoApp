import { View, Text, TouchableOpacity } from 'react-native';

import type { Tier } from '../../types';

interface TierTabsProps {
  tiers: Tier[];
  currentTier: Tier;
  onChange: (tier: Tier) => void;
}

export function TierTabs({ tiers, currentTier, onChange }: TierTabsProps) {
  return (
    <View className="px-6 pt-4 pb-6 bg-white dark:bg-gray-800 border-b border-[#ffe4d1] dark:border-gray-600">
      <View className="flex-row bg-[#fff1e6] dark:bg-gray-700 rounded-3xl p-1">
        {tiers.map((tier) => (
          <TouchableOpacity
            key={tier}
            onPress={() => onChange(tier)}
            className={`flex-1 py-3 rounded-[22px] items-center ${
              currentTier === tier ? 'bg-[#ff6b6b] shadow-sm' : ''
            }`}
          >
            <Text
              className={`font-medium text-sm tracking-wide ${
                currentTier === tier ? 'text-white' : 'text-[#3a2f2f] dark:text-gray-300'
              }`}
            >
              {tier}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
