import React from 'react';
import { View, ScrollView } from 'react-native';
import { RikishiCard } from './RikishiCard';
import type { Rikishi } from '../types';

type BentoGridProps = {
  rikishi: Rikishi[];
};

export function BentoGrid({ rikishi }: BentoGridProps) {
  const cardSizes = ['w-[48%]', 'w-[48%]', 'w-[31%]', 'w-[65%]', 'w-[48%]', 'w-[48%]', 'w-[48%]', 'w-[48%]', 'w-[31%]', 'w-[65%]', 'w-[48%]', 'w-[48%]'];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="pb-12"
    >
      <View className="flex-row flex-wrap gap-4 justify-center">
        {rikishi.slice(0, 12).map((r, index) => (
          <View key={r.id} className={cardSizes[index % cardSizes.length]}>
            <RikishiCard rikishi={r} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}