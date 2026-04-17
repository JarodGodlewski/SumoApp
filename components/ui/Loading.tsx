import { View, Text, ActivityIndicator } from 'react-native';

interface LoadingProps {
  message?: string;
}

export function Loading({ message = 'Loading...' }: LoadingProps) {
  return (
    <View className="flex-1 justify-center items-center bg-[#fff8f0] dark:bg-gray-900">
      <ActivityIndicator size="large" color="#ff6b6b" />
      <Text className="mt-4 font-black text-xl text-[#3a2f2f] dark:text-white">{message}</Text>
    </View>
  );
}