import supabase from './supabaseClient';

/**
 * เช็คการเชื่อมต่อกับ Supabase โดยเรียก auth.getSession()
 */
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
    } else if (data.session) {
      console.log('✅ Supabase connection successful. Session found:', data.session);
    } else {
      console.log('✅ Supabase connection successful. No active session.');
    }
  } catch (err) {
    console.error('❌ Unexpected error connecting to Supabase:', err);
  }
};
