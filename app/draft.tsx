import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useRikishiList } from '../src/lib/sumoApi';
import { DraftHeader } from '../components/DraftHeader';
import { TierTabs } from '../components/TierTabs';
import { DraftCard } from '../components/DraftCard';
import { ParticleBurst } from '../components/ParticleBurst';
import { Link } from 'expo-router';

type Tier = 'Yokozuna/Ozeki' | 'Sekiwake/Komusubi' | 'Maegashira' | 'Juryo';

const TOTAL_PICKS = 8;

export default function DraftScreen() {
  const { data: rikishi = [] } = useRikishiList();
  const [selected, setSelected] = useState<string[]>([]);
  const [currentTier, setCurrentTier] = useState<Tier>('Yokozuna/Ozeki');
  const [isMyTurn, setIsMyTurn] = useState(true);

  const tiers: Tier[] = ['Yokozuna/Ozeki', 'Sekiwake/Komusubi', 'Maegashira', 'Juryo'];

  const filteredRikishi = rikishi
    .filter((r) => {
      if (currentTier === 'Yokozuna/Ozeki') return r.rank.includes('Yokozuna') || r.rank.includes('Ozeki');
      if (currentTier === 'Sekiwake/Komusubi') return r.rank.includes('Sekiwake') || r.rank.includes('Komusubi');
      if (currentTier === 'Maegashira') return r.rank.includes('Maegashira');
      return r.rank.includes('Juryo');
    })
    .sort((a, b) => (a.rank || '').localeCompare(b.rank || ''));

  const makePick = (rikishiId: string) => {
    if (!isMyTurn || selected.includes(rikishiId) || selected.length >= TOTAL_PICKS) return;

    const newSelected = [...selected, rikishiId];
    setSelected(newSelected);
    setIsMyTurn(false);

    // Simulate AI pick after delay
    setTimeout(() => {
      const available = filteredRikishi.filter((r) => !newSelected.includes(r.id));
      if (available.length > 0) {
        setSelected([...newSelected, available[0].id]);
        setIsMyTurn(true);
      }
    }, 800);
  };

  return (
    <ScrollView className="flex-1 bg-[#fff8f0]">
      <DraftHeader timeLeft="2d 14h" />

      <TierTabs 
        tiers={tiers} 
        currentTier={currentTier} 
        onChange={setCurrentTier} 
      />

      <View className="p-6">
        <View className="flex-row flex-wrap gap-4 justify-center pb-24">
          {filteredRikishi.map((r) => {
            const isPicked = selected.includes(r.id);
            return (
              <DraftCard 
                key={r.id} 
                rikishi={r} 
                isPicked={isPicked}
                onPress={() => makePick(r.id)}
              />
            );
          })}
        </View>
      </View>

      {/* Bottom Bar */}
      <View className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t-4 border-[#ff6b6b] shadow-2xl">
        <View className="flex-row justify-between mb-4">
          <Text className="font-black text-3xl text-[#3a2f2f]">STABLE {selected.length}/8</Text>
          <Text className={`font-black text-xl ${isMyTurn ? 'text-emerald-500' : 'text-amber-500'}`}>
            {isMyTurn ? 'YOUR PICK' : 'WAITING'}
          </Text>
        </View>

        <Link href="/" asChild>
          <TouchableOpacity 
            disabled={selected.length !== TOTAL_PICKS}
            className={`py-6 rounded-3xl font-black text-2xl tracking-widest shadow-2xl ${
              selected.length === TOTAL_PICKS 
                ? 'bg-[#ff6b6b] text-white active:scale-[0.97]' 
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            COMPLETE DRAFT
          </TouchableOpacity>
        </Link>
      </View>

      <ParticleBurst trigger={selected.length > 0} />
    </ScrollView>
  );
}
