import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { useRikishiList } from '../src/lib/sumoApi';
import { ChibiAvatar } from '../components/ChibiAvatar';
import { GlassCard } from '../components/GlassCard';
import { KineticHeader } from '../components/KineticHeader';
import { ParticleBurst } from '../components/ParticleBurst';
import { useKawaiiSpring } from '../hooks/useKawaiiSpring';
import { supabase, joinDraftLeague } from '../src/lib/supabase';
import { Link } from 'expo-router';

type Tier = 'Yokozuna/Ozeki' | 'Sekiwake/Komusubi' | 'Maegashira' | 'Juryo';

const LEAGUE_ID = 'league-natsu-2026';
const TOTAL_PICKS = 8;

export default function DraftScreen() {
  const { data: rikishi = [] } = useRikishiList();
  const [selected, setSelected] = useState<string[]>([]);
  const [currentTier, setCurrentTier] = useState<Tier>('Yokozuna/Ozeki');
  const [isMyTurn, setIsMyTurn] = useState(true);
  const [timeLeft, setTimeLeft] = useState('');
  const [showPickBurst, setShowPickBurst] = useState(false);
  const { triggerSpring } = useKawaiiSpring();

  const tiers: Tier[] = ['Yokozuna/Ozeki', 'Sekiwake/Komusubi', 'Maegashira', 'Juryo'];

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = joinDraftLeague(LEAGUE_ID, () => setShowPickBurst(true));
      return unsubscribe;
    }, [])
  );

  useEffect(() => {
    const target = new Date('2026-05-10T00:00:00Z').getTime();
    const timer = setInterval(() => {
      const diff = target - Date.now();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setTimeLeft(`${days}d ${hours}h`);
      } else {
        setTimeLeft('Basho Started!');
      }
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const filteredRikishi = rikishi
    .filter((r) => {
      if (currentTier === 'Yokozuna/Ozeki') return r.rank.includes('Yokozuna') || r.rank.includes('Ozeki');
      if (currentTier === 'Sekiwake/Komusubi') return r.rank.includes('Sekiwake') || r.rank.includes('Komusubi');
      if (currentTier === 'Maegashira') return r.rank.includes('Maegashira');
      return r.rank.includes('Juryo');
    })
    .sort((a, b) => (a.rank || '').localeCompare(b.rank || ''));

  const makePick = async (rikishiId: string) => {
    if (!isMyTurn || selected.includes(rikishiId) || selected.length >= TOTAL_PICKS) return;

    const newSelected = [...selected, rikishiId];
    setSelected(newSelected);
    setIsMyTurn(false);
    setShowPickBurst(true);

    const { error } = await supabase.from('draft_picks').insert({
      league_id: LEAGUE_ID,
      rikishi_id: rikishiId,
      pick_number: newSelected.length,
      user_id: 'current-user-id',
    });

    if (error) Alert.alert('Draft Error', error.message);

    if (newSelected.length === TOTAL_PICKS) {
      Alert.alert('Draft Complete', 'Stable saved to league!');
      return;
    }

    setTimeout(() => {
      const available = filteredRikishi.filter((r) => !newSelected.includes(r.id));
      if (available.length > 0) {
        const aiPick = available[0].id;
        setSelected([...newSelected, aiPick]);
        setIsMyTurn(true);
      }
    }, 650);
  };

  return (
    <ScrollView className="flex-1 bg-[#fff8f0]">
      <View className="pt-14 pb-8 px-6 bg-gradient-to-b from-[#fff1e6] to-[#fff8f0]">
        <KineticHeader>Natsu Snake Draft</KineticHeader>
        <Text className="text-center text-[#d97757] text-xl -mt-2">8 Rikishi • {timeLeft}</Text>

        <GlassCard className="mt-8 p-4">
          <View className="flex-row flex-wrap gap-2 justify-center">
            {selected.map((id) => {
              const r = rikishi.find((x) => x.id === id);
              return r ? <ChibiAvatar key={id} name={r.name} rank={r.rank} size={52} status="win" /> : null;
            })}
          </View>
        </GlassCard>
      </View>

      <View className="flex-row bg-white/90 border-b border-[#ffe4d1] shadow-sm sticky top-0 z-10">
        {tiers.map((tier) => (
          <TouchableOpacity
            key={tier}
            onPress={() => setCurrentTier(tier)}
            className={`flex-1 py-5 items-center border-b-4 ${currentTier === tier ? 'border-[#ff6b6b] bg-red-50/50' : 'border-transparent'}`}
          >
            <Text className={`font-black text-sm tracking-widest ${currentTier === tier ? 'text-[#ff6b6b]' : 'text-[#d97757]'}`}>
              {tier}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="p-6">
        <View className="flex-row flex-wrap gap-4 justify-center pb-24">
          {filteredRikishi.map((r) => {
            const isPicked = selected.includes(r.id);
            return (
              <GlassCard key={r.id} className={`w-[47%] p-5 ${isPicked ? 'ring-2 ring-[#ff6b6b]' : ''}`}>
                <TouchableOpacity onPress={() => makePick(r.id)} disabled={isPicked} className="active:scale-95">
                  <ChibiAvatar name={r.name} rank={r.rank} size={88} status={isPicked ? 'win' : 'neutral'} />
                  <Text className="text-center font-black text-2xl text-[#3a2f2f] mt-5 tracking-tight">{r.name}</Text>
                  <Text className="text-center text-[#d97757] text-sm mt-1">{r.rank} • {r.heya}</Text>
                </TouchableOpacity>
              </GlassCard>
            );
          })}
        </View>
      </View>

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
            className={`py-6 rounded-3xl font-black text-2xl tracking-widest shadow-2xl transition-all ${selected.length === TOTAL_PICKS 
              ? 'bg-gradient-to-r from-[#ff6b6b] to-pink-500 text-white active:scale-[0.97]' 
              : 'bg-gray-200 text-gray-400'}`}
          >
            COMPLETE DRAFT
          </TouchableOpacity>
        </Link>
      </View>

      <ParticleBurst trigger={showPickBurst} count={22} onComplete={() => setShowPickBurst(false)} />
    </ScrollView>
  );
}
