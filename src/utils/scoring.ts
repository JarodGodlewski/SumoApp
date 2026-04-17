export const calculateFantasyScore = (wins: number, kimarite: string = '', rank: string = ''): number => {
  let score = wins * 5;

  // Kimarite bonuses
  if (kimarite.toLowerCase().includes('nage')) score += 12;
  if (kimarite.toLowerCase().includes('dashi')) score += 8;
  if (kimarite.toLowerCase().includes('koshi')) score += 6;

  // Rank bonuses
  if (rank.includes('Yokozuna')) score += 25;
  else if (rank.includes('Ozeki')) score += 18;
  else if (rank.includes('Sekiwake') || rank.includes('Komusubi')) score += 12;
  else if (rank.includes('Maegashira')) score += 5;

  return Math.floor(score);
};

export const calculateChibiStats = (rikishi: any) => {
  const power = (rikishi.weight || 150) + (rikishi.wins_last_basho || 0) * 3;
  const agility = (rikishi.height || 180) * 0.55 + (rikishi.favorite_kimarite?.toLowerCase().includes('nage') ? 25 : 0);
  const endurance = Math.floor(((rikishi.wins_last_basho || 8) / 15) * 100);
  const spirit = (rikishi.kinboshi || 0) * 12;

  return {
    power: Math.min(99, Math.max(35, Math.floor(power))),
    agility: Math.min(99, Math.max(35, Math.floor(agility))),
    endurance: Math.min(99, Math.max(25, endurance)),
    spirit: Math.min(99, Math.max(15, spirit)),
  };
};