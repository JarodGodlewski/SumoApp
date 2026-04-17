import { Rikishi } from './rikishi';

export type Tier = 'Yokozuna/Ozeki' | 'Sekiwake/Komusubi' | 'Maegashira' | 'Juryo';

export type DraftState = {
  selected: string[];
  currentTier: Tier;
  isMyTurn: boolean;
  tiers: Tier[];
  filteredRikishi: Rikishi[];
  makePick: (rikishiId: string) => void;
  setCurrentTier: (tier: Tier) => void;
  resetDraft: () => void;
};
