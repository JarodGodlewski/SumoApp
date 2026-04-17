import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { saveStable, loadStable } from '../src/lib/supabase';

export const useStable = () => {
  const [stable, setStable] = useState<string[]>([]);

  const { data: loadedStable, isLoading: loadLoading, error: loadError, refetch } = useQuery({
    queryKey: ['stable'],
    queryFn: loadStable,
  });

  useEffect(() => {
    if (loadedStable) setStable(loadedStable);
  }, [loadedStable]);

  const saveMutation = useMutation({
    mutationFn: saveStable,
    onSuccess: () => refetch(),
  });

  const saveCurrentStable = (rikishiIds: string[]) => {
    setStable(rikishiIds);
    saveMutation.mutate(rikishiIds);
  };

  return {
    stable,
    isLoading: loadLoading || saveMutation.isPending,
    error: loadError || saveMutation.error,
    saveStable: saveCurrentStable,
    loadStable: refetch,
  };
};