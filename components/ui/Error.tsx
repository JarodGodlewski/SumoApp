import { View, Text, TouchableOpacity } from 'react-native';

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function Error({ message = 'Something went wrong.', onRetry }: ErrorProps) {
  return (
    <View className="flex-1 justify-center items-center bg-[#fff8f0]">
      <Text className="font-black text-2xl text-red-500 mb-4">Oops!</Text>
      <Text className="text-center text-[#3a2f2f] mb-6">{message}</Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          className="bg-[#ff6b6b] px-6 py-3 rounded-3xl"
        >
          <Text className="text-white font-black text-lg">Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}