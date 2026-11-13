/* L JAI Supabase connection settings.
   Paste your Project URL and publishable key from Supabase here.
   This file is public in the browser: never paste a secret/service-role key. */
(() => {
   
  SUPABASE_URL: 'https://jdilbwzpnfrzuliimgdc.supabase.co', 
  SUPABASE_ANON_KEY: 'sb_publishable_v1V0LgHVR_KDQZyI2_fJrg_TWZMwhjY', 
  CONTACT_EMAIL: 'real.leonjai@gmail.com', 
  SITE_URL: 'https://jeisaru.com/',

  const needsSetup = SUPABASE_URL.includes('https://jdilbwzpnfrzuliimgdc.supabase.co') ||
    SUPABASE_PUBLISHABLE_KEY.includes('sb_publishable_v1V0LgHVR_KDQZyI2_fJrg_TWZMwhjY');
  if (needsSetup) {
    console.info('Supabase is not connected yet. Edit config.js with your project URL and publishable key.');
    return;
  }
  if (!window.supabase?.createClient) {
    console.error('Supabase library did not load. Check your internet connection or CDN access.');
    return;
  }
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
})();
