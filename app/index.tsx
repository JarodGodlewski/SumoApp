import { ScrollView, View, Text } from 'react-native';
import { useRikishiList } from '../src/lib/sumoApi';
import { StableHeader } from '../components/StableHeader';
import { StableCard } from '../components/StableCard';
import { TorikumiCard } from '../components/TorikumiCard';
import { Button } from '../components/ui/Button';
import { ParticleBurst } from '../components/ParticleBurst';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useStable } from '../hooks/useStable';
import { useRouter } from 'expo-router';
import { Loading } from '../components/ui/Loading';
import { Error } from '../components/ui/Error';

export default function StableScreen() {
  const { data: rikishi = [], isLoading, error, refetch } = useRikishiList();
  const { stable, saveStable, loadStable } = useStable();
  const router = useRouter();
  
  // Use user's saved stable or first 8 as default
  const stableRikishi = stable.length > 0 ? rikishi.filter(r => stable.includes(r.id)) : rikishi.slice(0, 8);

  if (isLoading) {
    return <Loading message="Loading Your Stable..." />;
  }

  if (error) {
    return <Error message="Unable to load stable data. Please try again later." onRetry={refetch} />;
  }

  return (
    <ScrollView className="flex-1 bg-[#fff8f0]" showsVerticalScrollIndicator={false}>
      <StableHeader />

      <Animated.View entering={FadeIn.duration(600)} className="px-6 -mt-8">
        <Text className="font-black text-4xl text-[#3a2f2f] mb-7">Your Stable</Text>
        
        <View className="flex-row flex-wrap gap-4">
          {stableRikishi.length > 0 ? (
            stableRikishi.map((r, index) => (
              <StableCard
                key={r.id}
                rikishi={r}
                size={index % 3 === 0 ? 'large' : 'medium'}
              />
            ))
          ) : (
            <Text className="text-center text-[#3a2f2f] font-semibold">No stable loaded. Complete a draft or load from cloud to see your rikishi here.</Text>
          )}
        </View>
      </Animated.View>

      <View className="px-6 mt-14 flex-row gap-4">
        <Button
          title="CHIBI RUMBLE"
          subtitle="MINI GAME"
          variant="primary"
          onPress={() => {}}
        />
        <Button
          title="LIVE NHK"
          subtitle="WATCH NOW"
          variant="secondary"
          onPress={() => {}}
        />
        <Button
          title="LOAD LAST STABLE"
          subtitle="FROM CLOUD"
          variant="secondary"
          onPress={() => loadStable()}
        />
        <Button
          title="SAVE STABLE"
          subtitle="TO CLOUD"
          variant="primary"
          onPress={() => saveStable(stableRikishi.map(r => r.id))}
        />
      </View>

      <View className="px-6 mt-14 mb-20">
        <Text className="font-black text-4xl text-[#3a2f2f] mb-7">Today's Torikumi</Text>
        
        <View className="space-y-4">
          <TorikumiCard left="Hoshoryu" right="Ura" />
          <TorikumiCard left="Terunofuji" right="Mitakeumi" />
        </View>
      </View>

      <ParticleBurst trigger={true} />
    </ScrollView>
  );
}
