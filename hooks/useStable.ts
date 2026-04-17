import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStable = () => {
  const [stable, setStable] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const loadStable = async () => {
      try {
        const stored = await AsyncStorage.getItem('userStable');
        if (stored) {
          setStable(JSON.parse(stored));
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadStable();
  }, []);

  const saveStableAsync = async (rikishiIds: string[]) => {
    try {
      setIsLoading(true);
      await AsyncStorage.setItem('userStable', JSON.stringify(rikishiIds));
      setStable(rikishiIds);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    stable,
    isLoading,
    error,
    saveStable: saveStableAsync,
  };
};