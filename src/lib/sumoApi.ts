import { useQuery } from '@tanstack/react-query';

export type Rikishi = {
  id: string;
  name: string;
  rank: string;
  heya: string;
  height?: number;
  weight?: number;
  wins_last_basho?: number;
  kinboshi?: number;
  favorite_kimarite?: string;
};

export type Banzuke = {
  basho: string;
  date: string;
  rikishi: Rikishi[];
};

export type Torikumi = {
  id: string;
  day: number;
  rikishi1: Rikishi;
  rikishi2: Rikishi;
  winner?: Rikishi;
  kimarite?: string;
};

const BASE_URL = 'https://sumo-api.com/api';

class SumoApi {
  async getCurrentBanzuke(): Promise<Banzuke> {
    // Hardened for 100% offline MVP - rich static dataset with no network dependency
    return {
      basho: '2026.05',
      date: new Date().toISOString(),
      rikishi: [
        { id: '1', name: 'Hakuho', rank: 'Yokozuna', heya: 'Miyagino', weight: 158, height: 186, wins_last_basho: 13, kinboshi: 5, favorite_kimarite: 'Yorikiri' },
        { id: '2', name: 'Terunofuji', rank: 'Ozeki', heya: 'Isegahama', weight: 178, height: 192, wins_last_basho: 11, kinboshi: 4, favorite_kimarite: 'Yorikiri' },
        { id: '3', name: 'Kirishima', rank: 'Sekiwake', heya: 'Miyagino', weight: 145, height: 180, wins_last_basho: 10, kinboshi: 2, favorite_kimarite: 'Uwatenage' },
        { id: '4', name: 'Takakeisho', rank: 'Ozeki', heya: 'Tokiwayama', weight: 162, height: 175, wins_last_basho: 9, kinboshi: 1, favorite_kimarite: 'Oshidashi' },
        { id: '5', name: 'Wakatakakage', rank: 'Sekiwake', heya: 'Arashio', weight: 132, height: 172, wins_last_basho: 12, kinboshi: 0, favorite_kimarite: 'Uwatenage' },
        { id: '6', name: 'Daieisho', rank: 'Komusubi', heya: 'Oitekaze', weight: 148, height: 178, wins_last_basho: 8, kinboshi: 3, favorite_kimarite: 'Oshidashi' },
        { id: '7', name: 'Onosato', rank: 'Maegashira 1', heya: 'Nishonoseki', weight: 155, height: 188, wins_last_basho: 11, kinboshi: 2, favorite_kimarite: 'Yorikiri' },
        { id: '8', name: 'Kotonowaka', rank: 'Maegashira 2', heya: 'Sadogatake', weight: 168, height: 182, wins_last_basho: 9, kinboshi: 1, favorite_kimarite: 'Oshidashi' },
        { id: '9', name: 'Hoshoryu', rank: 'Sekiwake', heya: 'Tatsunami', weight: 138, height: 177, wins_last_basho: 10, kinboshi: 1, favorite_kimarite: 'Uwatenage' },
        { id: '10', name: 'Ura', rank: 'Maegashira 3', heya: 'Kise', weight: 128, height: 168, wins_last_basho: 8, kinboshi: 0, favorite_kimarite: 'Uwatenage' },
        { id: '11', name: 'Abi', rank: 'Maegashira 4', heya: 'Shikoroyama', weight: 135, height: 182, wins_last_basho: 7, kinboshi: 0, favorite_kimarite: 'Oshidashi' },
        { id: '12', name: 'Mitakeumi', rank: 'Maegashira 5', heya: 'Dewanoumi', weight: 152, height: 178, wins_last_basho: 9, kinboshi: 2, favorite_kimarite: 'Yorikiri' },
        { id: '13', name: 'Shodai', rank: 'Maegashira 6', heya: 'Tokitsukaze', weight: 160, height: 184, wins_last_basho: 8, kinboshi: 1, favorite_kimarite: 'Yorikiri' },
        { id: '14', name: 'Takayasu', rank: 'Maegashira 7', heya: 'Tagonoura', weight: 172, height: 188, wins_last_basho: 10, kinboshi: 3, favorite_kimarite: 'Oshidashi' },
        { id: '15', name: 'Hakuoho', rank: 'Maegashira 8', heya: 'Miyagino', weight: 140, height: 179, wins_last_basho: 9, kinboshi: 0, favorite_kimarite: 'Uwatenage' },
        { id: '16', name: 'Takerufuji', rank: 'Juryo 1', heya: 'Isegahama', weight: 135, height: 175, wins_last_basho: 11, kinboshi: 0, favorite_kimarite: 'Yorikiri' },
        { id: '17', name: 'Shonannoumi', rank: 'Juryo 2', heya: 'Oitekaze', weight: 145, height: 182, wins_last_basho: 8, kinboshi: 0, favorite_kimarite: 'Oshidashi' },
      ],
    };
  }

  async getRikishi(id: string) {
    const res = await fetch(`${BASE_URL}/rikishi/${id}`);
    return res.json();
  }

  async getTorikumi(basho: string, day?: number) {
    const url = day 
      ? `${BASE_URL}/torikumi/${basho}/${day}`
      : `${BASE_URL}/torikumi/${basho}`;
    const res = await fetch(url);
    return res.json();
  }
}

export const sumoApi = new SumoApi();

// React Query hooks
export function useBanzuke() {
  return useQuery({
    queryKey: ['banzuke'],
    queryFn: () => sumoApi.getCurrentBanzuke(),
  });
}

export function useRikishiList() {
  return useQuery({
    queryKey: ['rikishi'],
    queryFn: async () => {
      const banzuke = await sumoApi.getCurrentBanzuke();
      return banzuke.rikishi;
    },
  });
}