import { useState } from 'react';
import { useRikishiList } from '../src/lib/sumoApi';

type Tier = 'Yokozuna/Ozeki' | 'Sekiwake/Komusubi' | 'Maegashira' | 'Juryo';

export const useDraft = () => {
  const { data: rikishi = [] } = useRikishiList();
  const [selected, setSelected] = useState<string[]>([]);
  const [currentTier, setCurrentTier] = useState<Tier>('Yokozuna/Ozeki');
  const [isMyTurn, setIsMyTurn] = useState(true);

  const tiers: Tier[] = ['Yokozuna/Ozeki', 'Sekiwake/Komusubi', 'Maegashira', 'Juryo'];

  const filteredRikishi = rikishi
    .filter((r) => {
      if (currentTier === 'Yokozuna/Ozeki') return r.rank.includes('Yokozuna') || r.rank.includes('Ozeki');
      if (currentTier === 'Sekiwake/Komusubi') return r.rank.includes('Sekiwake') || r.rank.includes('Komusubi');
      if (currentTier === 'Maegashira') return r.rank.includes('Maegashira');
      return r.rank.includes('Juryo');
    })
    .sort((a, b) => (a.rank || '').localeCompare(b.rank || ''));

  const makePick = (rikishiId: string) => {
    if (!isMyTurn || selected.includes(rikishiId) || selected.length >= 8) return;

    const newSelected = [...selected, rikishiId];
    setSelected(newSelected);
    setIsMyTurn(false);

    // Simulate AI opponent pick
    setTimeout(() => {
      const available = filteredRikishi.filter((r) => !newSelected.includes(r.id));
      if (available.length > 0) {
        setSelected([...newSelected, available[0].id]);
        setIsMyTurn(true);
      }
    }, 800);
  };

  const resetDraft = () => {
    setSelected([]);
    setIsMyTurn(true);
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
