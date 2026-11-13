# Supabase authentication setup for L JAI

The account dialog is wired to a Supabase JavaScript client when it is available as `window.supabaseClient` before `js/main.js` loads. Until you add that client, the forms display a setup message and do not save credentials in the browser.

## Connect the client

Create a Supabase project and load `@supabase/supabase-js` v2 before `js/main.js`. Initialize `window.supabaseClient` with your project URL and publishable/anon key. Never put a Supabase service-role key in browser code.

The forms call these Auth methods:

- Create account: `auth.signUp`, with `username`, `birthday`, and `address` sent as user metadata.
- Sign in: `auth.signInWithPassword` using email and password.
- Forgot password: `auth.resetPasswordForEmail`; the site handles the `PASSWORD_RECOVERY` event and saves the new password with `auth.updateUser`.
- Sign out: `auth.signOut`.

## Username sign-in

Supabase password sign-in expects an email or phone number. To allow the “Username / email” field to accept usernames, define `window.resolveSupabaseUsernameToEmail(username)` in a trusted integration layer. Use a server-side Edge Function with rate limiting and avoid exposing email addresses through a public profile query or putting a service-role key in the browser. Until that resolver is configured, users can sign in with email.

Add the deployed site URL to Supabase Auth's allowed redirect URLs so password reset links return to this site.
