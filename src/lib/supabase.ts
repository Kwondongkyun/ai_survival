import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('leaderboard_entries')
      .select('count')
      .limit(1);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
