# ZAYDS website (Next.js 14 + Supabase)
1. Supabase: run supabase/schema.sql, then supabase/schema-v2.sql. Add an admin user (Authentication > Users) and disable public sign-ups.
2. cp .env.example .env.local and fill it in.
3. npm install && npm run dev. Admin: /admin.
Email alerts: create a free Resend account, set RESEND_API_KEY. Until you verify your domain there, Resend only delivers to the email you signed up with.
Analytics: set NEXT_PUBLIC_GA_ID. Search Console: choose "HTML tag", paste the token into NEXT_PUBLIC_GSC_VERIFICATION, then submit /sitemap.xml.
Company profile PDF: replace public/ZAYDS-Company-Profile.pdf any time.
