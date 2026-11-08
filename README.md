# LeonJai deployment folder

- `index.html` is the site entry point.
- `signup.html` is the account registration page.
- `app/assets/css` and `app/assets/js` contain the separate stylesheets and scripts.
- `app/database/schema.sql` creates the Supabase profile table and profile trigger.

## Enable account registration
1. Create a Supabase project and run `app/database/schema.sql` in its SQL Editor.
2. In Supabase Authentication, enable email/password sign-up and choose whether email confirmation is required.
3. Add your project URL and anon/public key to `app/assets/js/config.js`.
4. Upload the folder contents to your static host, preserving this folder structure.

The signup form creates a Supabase Auth user. A database trigger saves the submitted name, studio, email, and service interest in `public.profiles`. The password is handled only by Supabase Auth and is never written to the profiles table. The public key can be used in browser code; never place a service-role key here.

Update the sample site URLs in `sitemap.xml` if deploying to a different domain. Add your own `CNAME` file only if your hosting provider requires one.


The site header, footer, and favicon use the supplied LeonjAI logo artwork.
