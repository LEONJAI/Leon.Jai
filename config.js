/* L JAI Supabase connection settings.
   Paste your Project URL and publishable key from Supabase here.
   This file is public in the browser: never paste a secret/service-role key. */
(() => {
  const SUPABASE_URL = 'https://YOUR_PROJECT_REF.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_REPLACE_WITH_YOUR_KEY';

  const needsSetup = SUPABASE_URL.includes('YOUR_PROJECT_REF') ||
    SUPABASE_PUBLISHABLE_KEY.includes('REPLACE_WITH_YOUR_KEY');
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
