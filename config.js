/* Supabase browser config. This file is public; never use a secret/service-role key here. */
(() => {
  const SUPABASE_URL = 'https://jdilbwzpnfrzuliimgdc.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_v1V0LgHVR_KDQZyI2_fJrg_TWZMwhjY';

  if (!window.supabase?.createClient) {
    window.ljaiSupabaseMessage = 'The Supabase library did not load. Check your internet connection or CDN access, then reload.';
    console.error(window.ljaiSupabaseMessage);
    return;
  }
  try {
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
    window.ljaiSupabaseMessage = '';
  } catch (error) {
    window.ljaiSupabaseMessage = 'Supabase could not start. Check the Project URL and Publishable key in the website root config.js.';
    console.error(window.ljaiSupabaseMessage, error);
  }
})();