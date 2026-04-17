import { ScrollView, View, Text } from 'react-native';
import { useRikishiList } from '../src/lib/sumoApi';
import { StableHeader } from '../components/StableHeader';
import { StableCard } from '../components/StableCard';
import { TorikumiCard } from '../components/TorikumiCard';
import { Button } from '../components/ui/Button';
import { ParticleBurst } from '../components/ParticleBurst';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function StableScreen() {
  const { data: rikishi = [] } = useRikishiList();
  
  // Use real data from the API (no more fake demo data)
  const stableRikishi = rikishi.slice(0, 8);

  return (
    <ScrollView className="flex-1 bg-[#fff8f0]" showsVerticalScrollIndicator={false}>
      <StableHeader />

      <Animated.View entering={FadeIn.duration(600)} className="px-6 -mt-8">
        <Text className="font-black text-4xl text-[#3a2f2f] mb-7">Your Stable</Text>
        
        <View className="flex-row flex-wrap gap-4">
          {stableRikishi.map((r, index) => (
            <StableCard 
              key={r.id} 
              rikishi={r} 
              size={index % 3 === 0 ? 'large' : 'medium'} 
            />
          ))}
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
