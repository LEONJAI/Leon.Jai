/* L JAI Supabase connection settings.
   This file is public in the browser. Use only the publishable key here. */
(() => {
  SUPABASE_URL: 'https://jdilbwzpnfrzuliimgdc.supabase.co', 
  SUPABASE_ANON_KEY: 'sb_publishable_v1V0LgHVR_KDQZyI2_fJrg_TWZMwhjY',       	
  CONTACT_EMAIL: 'real.leonjai@gmail.com', 
  SITE_URL: 'https://jeisaru.com/',

  const needsSetup = SUPABASE_URL.includes('YOUR_PROJECT_REF') ||
    SUPABASE_PUBLISHABLE_KEY.includes('REPLACE_WITH_YOUR_KEY');
  if (needsSetup) {
    window.ljaiSupabaseMessage = 'In the website root config.js, add BOTH your Supabase Project URL and Publishable key, save, then reload the website.';
    return;
  }
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