import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Realtime draft channel helper
export const joinDraftLeague = (leagueId: string, onPickUpdate: (picks: any[]) => void) => {
  const channel = supabase.channel(`draft:${leagueId}`);
  channel
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'draft_picks', filter: `league_id=eq.${leagueId}` }, (payload) => {
      onPickUpdate([payload.new]);
    })
    .subscribe();
  return () => supabase.removeChannel(channel);
};

// Stable persistence
export const saveStable = async (rikishiIds: string[]) => {
  const { data, error } = await supabase
    .from('stables')
    .insert([{ rikishi_ids: rikishiIds }]);
  if (error) throw error;
  return data;
};

export const loadStable = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from('stables')
    .select('rikishi_ids')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  if (error) throw error;
  return data?.rikishi_ids || [];
};
