import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { DraftHeader } from '../components/DraftHeader';
import { TierTabs } from '../components/TierTabs';
import { DraftCard } from '../components/DraftCard';
import { ParticleBurst } from '../components/ParticleBurst';
import { useRouter } from 'expo-router';
import { useDraft } from '../hooks/useDraft';
import { useStable } from '../hooks/useStable';
import { Loading } from '../components/ui/Loading';
import { Error } from '../components/ui/Error';

export default function DraftScreen() {
  const {
    selected,
    currentTier,
    isMyTurn,
    tiers,
    filteredRikishi,
    makePick,
    setCurrentTier,
    isLoading,
    error,
    refetch,
  } = useDraft();
  const { saveStable } = useStable();
  const router = useRouter();

  if (isLoading) {
    return <Loading message="Loading Rikishi..." />;
  }

  if (error) {
    return <Error message="Unable to load rikishi data. Please try again later." onRetry={refetch} />;
  }

  return (
    <ScrollView className="flex-1 bg-[#fff8f0] dark:bg-gray-900">
      <DraftHeader timeLeft="2d 14h" />

      <TierTabs 
        tiers={tiers} 
        currentTier={currentTier} 
        onChange={setCurrentTier} 
      />

      <View className="px-6 py-6 max-w-4xl mx-auto">
        <View className="flex-row flex-wrap gap-6 justify-center pb-24">
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

      <View className="fixed bottom-0 left-0 right-0 p-6 bg-white dark:bg-gray-800 border-t-4 border-[#ff6b6b] shadow-2xl">
        <View className="flex-row justify-between mb-4">
          <Text className="font-black text-3xl text-[#3a2f2f] dark:text-white">STABLE {selected.length}/8</Text>
          <Text className={`font-black text-xl ${isMyTurn ? 'text-emerald-500' : 'text-amber-500'}`}>
            {isMyTurn ? 'YOUR PICK' : 'WAITING'}
          </Text>
        </View>

        <TouchableOpacity
          disabled={selected.length !== 8}
          onPress={() => { if (selected.length === 8) { saveStable(selected); router.push('/'); } }}
          className={`py-6 rounded-3xl font-black text-2xl tracking-widest shadow-2xl ${
            selected.length === 8
              ? 'bg-[#ff6b6b] text-white active:scale-[0.97]'
              : 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500'
          }`}
        >
          <Text className="text-center">COMPLETE DRAFT</Text>
        </TouchableOpacity>
      </View>

      <ParticleBurst trigger={selected.length > 0} />
    </ScrollView>
  );
}
