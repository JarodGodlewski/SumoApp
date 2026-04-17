import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useColorScheme } from 'react-native';
import { ChibiAvatar } from './ChibiAvatar';
import { glassStyle } from '../src/utils/design';
import type { Rikishi } from '../types';

const calculateChibiStats = (rikishi: Rikishi) => {
  const power = (rikishi.weight || 150) + (rikishi.wins_last_basho || 0) * 2;
  const agility = (rikishi.height || 180) * 0.6;
  const endurance = Math.floor(((rikishi.wins_last_basho || 8) / 15) * 100);
  return {
    power: Math.min(99, Math.max(40, Math.floor(power))),
    agility: Math.min(99, Math.max(40, Math.floor(agility))),
    endurance: Math.min(99, Math.max(30, endurance)),
  };
};

type RikishiCardProps = {
  rikishi: Rikishi;
};

export function RikishiCard({ rikishi }: RikishiCardProps) {
  const stats = calculateChibiStats(rikishi);
  const colorScheme = useColorScheme();

  return (
    <Pressable className={`${glassStyle} p-5 active:scale-95`}>
      <View className="items-center">
        <ChibiAvatar
          name={rikishi.name}
          rank={rikishi.rank?.slice(0,3)}
          size={92}
        />

        <Text className={`mt-4 text-2xl font-bold ${colorScheme === 'dark' ? 'text-white' : 'text-sumo-ink'}`}>{rikishi.name}</Text>
        <Text className={`text-base font-medium ${colorScheme === 'dark' ? 'text-sumo-soft' : 'text-sumo-soft'}`}>{rikishi.rank} • {rikishi.heya}</Text>

        <View className="flex-row w-full justify-between mt-6 px-2">
          <View className="items-center">
            <Text className={`text-[10px] tracking-widest ${colorScheme === 'dark' ? 'text-gray-300' : 'text-gray-400'}`}>PWR</Text>
            <Text className="text-2xl font-mono font-bold text-red-500">{stats.power}</Text>
          </View>
          <View className="items-center">
            <Text className={`text-[10px] tracking-widest ${colorScheme === 'dark' ? 'text-gray-300' : 'text-gray-400'}`}>AGI</Text>
            <Text className="text-2xl font-mono font-bold text-emerald-500">{stats.agility}</Text>
          </View>
          <View className="items-center">
            <Text className={`text-[10px] tracking-widest ${colorScheme === 'dark' ? 'text-gray-300' : 'text-gray-400'}`}>END</Text>
            <Text className="text-2xl font-mono font-bold text-blue-500">{stats.endurance}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}