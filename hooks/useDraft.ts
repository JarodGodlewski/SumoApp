import { useState, useCallback } from 'react';
import { useRikishiList } from '../src/lib/sumoApi';
import type { Rikishi } from '../types';
import type { Tier } from '../types/draft';

export const useDraft = (): {
  selected: string[];
  currentTier: Tier;
  isMyTurn: boolean;
  tiers: Tier[];
  filteredRikishi: Rikishi[];
  makePick: (rikishiId: string) => void;
  setCurrentTier: (tier: Tier) => void;
  resetDraft: () => void;
} => {
  const { data: rikishi = [] } = useRikishiList();
  const [selected, setSelected] = useState<string[]>([]);
  const [currentTier, setCurrentTier] = useState<Tier>('Yokozuna/Ozeki');
  const [isMyTurn, setIsMyTurn] = useState(true);

  const tiers: Tier[] = ['Yokozuna/Ozeki', 'Sekiwake/Komusubi', 'Maegashira', 'Juryo'];

  const filteredRikishi: Rikishi[] = rikishi
    .filter((r: Rikishi) => {
      if (currentTier === 'Yokozuna/Ozeki') return r.rank.includes('Yokozuna') || r.rank.includes('Ozeki');
      if (currentTier === 'Sekiwake/Komusubi') return r.rank.includes('Sekiwake') || r.rank.includes('Komusubi');
      if (currentTier === 'Maegashira') return r.rank.includes('Maegashira');
      return r.rank.includes('Juryo');
    })
    .sort((a: Rikishi, b: Rikishi) => (a.rank || '').localeCompare(b.rank || ''));

  const makePick = useCallback((rikishiId: string) => {
    if (!isMyTurn || selected.includes(rikishiId) || selected.length >= 8) return;

    const newSelected = [...selected, rikishiId];
    setSelected(newSelected);
    setIsMyTurn(false);

    setTimeout(() => {
      const available = filteredRikishi.filter((r) => !newSelected.includes(r.id));
      if (available.length > 0) {
        setSelected([...newSelected, available[0].id]);
        setIsMyTurn(true);
      }
    }, 800);
  }, [isMyTurn, selected, filteredRikishi]);

  const resetDraft = () => {
    setSelected([]);
    setIsMyTurn(true);
    setCurrentTier('Yokozuna/Ozeki');
  };

  return {
    selected,
    currentTier,
    isMyTurn,
    tiers,
    filteredRikishi,
    makePick,
    setCurrentTier,
    resetDraft,
  };
};
