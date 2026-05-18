# Authentication for a GitHub Pages (Static) React Site

This project is a **static** React site (Vite + React). It can be hosted on **GitHub Pages**, which serves HTML/CSS/JS but **does not run a backend** for you.

So: **you can have sign-in/sign-up**, but only by using an external authentication provider (or a separately hosted backend).

## What’s possible (and what isn’t)

### ✅ Possible
- User **sign-up / sign-in UI** in React (email+password, Google, etc.)
- Persisting a session in the browser (tokens)
- Showing **user-only UI** (e.g., “Dashboard” link after login)
- Calling a protected API / database **hosted elsewhere**, using the user’s auth token

### ❌ Not possible on GitHub Pages alone
- Running your own server-side auth (sessions, password hashing, account storage)
- Truly “protecting” a page route (people can still load your JS bundle)

> The real security boundary is **protecting data & actions** (API/database rules),
> not hiding UI routes.

## “Always free” answer (important)

There is **no provider that can be guaranteed “always free forever”**—pricing and quotas can change.

However, for a portfolio site with a small number of users, you can choose providers that are **very likely to remain free in practice** as long as you stay under their free-tier limits.

## Recommended options (good for GitHub Pages)

### Option A — Supabase Auth (recommended if you’ll store user data)
Best if you want:
- Auth now **and** a database later (profiles, contact submissions, gated content)

Typical flow:
1. React app calls Supabase Auth for signup/login
2. Supabase returns a session (JWT)
3. You store/read user data via Supabase (Row Level Security policies protect tables)

Docs:
- Supabase Auth: https://supabase.com/docs/guides/auth

### Option B — Firebase Authentication (recommended if you want “auth only” quickly)
Best if you want:
- Fast setup for email/password and social login
- Minimal backend thinking

Notes:
- **Avoid phone/SMS auth** unless you’re okay with potential costs.

Docs:
- Firebase Auth: https://firebase.google.com/docs/auth
- Firebase pricing: https://firebase.google.com/pricing

### Option C — Auth0 / Clerk (polished, but more “SaaS plan” constraints)
These are great products and have free tiers, but you’re more likely to hit plan limits
depending on features and scale.

## Keeping it “free in practice” for a portfolio

To minimize the chance of ever paying:
- **Disable public signups** (invite-only / allowlist emails) if you don’t need the public creating accounts.
- Avoid **SMS/phone verification**.
- Keep auth features simple (email/password + optionally Google).
- Only store minimal user data.

## Implementation checklist (for this repo: Vite + React)

### 1) Pick an auth provider
Choose **Supabase** or **Firebase** (recommended).

### 2) Configure allowed domains
In your provider dashboard, add:
- Your GitHub Pages domain (e.g., `https://<username>.github.io`)
- Your project path (e.g., `https://<username>.github.io/<repo>/`) if applicable
- Your local dev URL (usually `http://localhost:5173`)

OAuth providers (like Google login) require **exact redirect/callback URLs**.

### 3) Add environment variables
In Vite, client env vars are typically exposed via `import.meta.env`.

Common examples:
- Supabase: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- Firebase: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, etc.

> Never commit secrets. Client “public” keys (like Supabase anon key / Firebase config)
> are expected to be shipped to the browser. The security comes from server-side rules.

### 4) Add auth UI + state
Typical UI pieces:
- `Login` / `Signup` form
- “Logout” button
- Conditional UI in `Header` (show “Login” vs “Account”)

Typical state:
- `user` (or `session`) stored in React state/context
- provider SDK listener to react to login/logout

### 5) Protect data/actions (not pages)
If you add a database or API later:
- Supabase: enable **RLS** and write policies
- Firebase: use Firestore/Storage security rules
- Serverless API: verify JWT on the server before doing anything sensitive

## Suggested decision for Ekara portfolio

If the goal is simply “optional login for a small set of people”:
- Pick **Supabase Auth** (auth + easy future database) or **Firebase Auth** (fastest).
- Make signup **invite-only** unless there’s a strong reason for public signups.

