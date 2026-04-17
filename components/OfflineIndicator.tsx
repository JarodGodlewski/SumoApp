import React, { useState, useEffect } from 'react';
import { View, Text, Platform } from 'react-native';

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleOnline = () => setIsOffline(false);
      const handleOffline = () => setIsOffline(true);

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      setIsOffline(!navigator.onLine);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  if (!isOffline) return null;

  return (
    <View className="bg-orange-500 py-2 px-4 flex-row items-center justify-center">
      <Text className="text-white text-sm font-medium">📴 OFFLINE MODE • Data is cached</Text>
    </View>
  );
}