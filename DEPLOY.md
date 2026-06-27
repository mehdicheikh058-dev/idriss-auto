# Idriss Auto — Deploy on Vercel + Supabase (full walkthrough)

This sets up the live app with AI scanning **and** a database that collects data —
while keeping every secret on the server (never in the app/browser).

## How it fits together

```
 Phone / browser  ──►  Vercel (hosts the app + /api functions)
                          │
                          ├─ /api/analyze   ──► OpenAI (uses OPENAI_API_KEY secret)
                          ├─ /api/parts     ──► Supabase  (read catalog additions)
                          ├─ /api/scan-log  ──► Supabase  (save every scan)
                          ├─ /api/submit    ──► Supabase  (user part suggestions)
                          └─ /api/feedback  ──► Supabase  (feedback / contact)
                                                   ▲
                          All DB access uses the SERVICE-ROLE key (server-only).
```

The browser never holds the OpenAI key **or** any Supabase key. Tables have Row
Level Security ON with no public policies, so only your serverless functions
(which use the service-role key) can touch them. That matches "only you write data."

---

## What you'll need (free)
- A **GitHub** account
- A **Vercel** account (sign in with GitHub)
- A **Supabase** account
- An **OpenAI** API key with a little billing credit (for photo AI)

---

## PART A — Supabase (database)

1. Go to **https://supabase.com** → **New project**. Pick a name, a strong DB
   password, and a region near your users. Wait ~2 min for it to provision.
2. Open **SQL Editor** → **New query**. Open the file **`db/schema.sql`** from this
   project, copy everything, paste it in, and click **Run**. You should see the
   four tables created: `parts`, `submissions`, `scan_logs`, `feedback`.
3. Get your credentials → **Project Settings → API**:
   - **Project URL** (looks like `https://abcxyz.supabase.co`) → this is `SUPABASE_URL`
   - **Project API keys → `service_role` (secret)** → this is `SUPABASE_SERVICE_ROLE_KEY`
   - ⚠️ The `service_role` key is **admin-level**. Treat it like a password. Only
     paste it into Vercel's env vars (Part D). Never in the app, the repo, or chat.

---

## PART B — Put the code on GitHub
1. Create a repository (e.g. `idriss-auto`).
2. Upload the **whole `idriss-mecano` folder**, keeping structure — especially the
   `api/` and `db/` folders. Commit.

> The `db/schema.sql` is just a reference file; it's harmless to keep in the repo.
> Do **not** put any keys in the repo.

---

## PART C — Deploy on Vercel
1. Go to **https://vercel.com** → **Add New → Project → Import** your repo.
2. Framework Preset: **Other**. Leave build settings default. Click **Deploy**.
3. After it builds you'll get a URL like `https://idriss-auto.vercel.app`.

---

## PART D — Add the secrets (this is where the keys go)
In Vercel: **Project → Settings → Environment Variables**. Add these, each for
**Production + Preview + Development**:

| Name | Value | Required |
|------|-------|----------|
| `OPENAI_API_KEY` | your `sk-...` key | yes (for photo AI) |
| `SUPABASE_URL` | your Project URL | yes (for data) |
| `SUPABASE_SERVICE_ROLE_KEY` | your `service_role` secret | yes (for data) |
| `VISION_MODEL` | `gpt-4o-mini` | optional |
| `ALLOWED_ORIGIN` | your site URL, e.g. `https://idriss-auto.vercel.app` | recommended |

Click **Save**, then **Deployments → ⋯ (latest) → Redeploy** so the variables load.

---

## PART E — Verify it works
1. Open your Vercel URL on a phone or desktop.
2. **Scan tab** → take a photo of a part → **Analyze**. You should get an AI result.
3. In Supabase → **Table Editor → `scan_logs`** → you should see a new row. ✅
4. **About tab** → write a feedback message → **Send**. Check the `feedback` table. ✅
5. **About tab** → "Suggest a part" → submit. Check the `submissions` table. ✅
6. If AI says "Couldn't analyze": re-check `OPENAI_API_KEY` and that you redeployed.
   If data isn't saving: re-check the two `SUPABASE_*` vars and that the schema ran.

---

## PART F — Your admin workflow (managing the data)

**Add or fix a part** (shows up in everyone's catalog, merged over the built-in 26):
- Supabase → **Table Editor → `parts` → Insert row**:
  - `id`: a unique id, e.g. `p100`
  - `category`: one of `engine, brakes, filters, electrical, suspension, ignition, cooling, belts, transmission, exhaust`
  - `name` (JSON): `{"en":"Front brake pad set","fr":"Plaquettes avant","ar":"تيل أمامي"}`
  - `fits` (JSON): `[{"make":"Toyota","model":"Corolla","years":"2014-2019"}]`
  - `part_no`, `barcode`: optional
- Save. The app picks it up within ~1 minute (or on next open).

**Review user suggestions:** open the `submissions` table, read `payload`, and if good,
copy it into a new `parts` row. Set `status` to `approved`/`rejected` to track it.

**See what people scan:** open `scan_logs`, sort by `created_at` — this is your growing
dataset of real-world demand.

---

## Local testing (optional, for you only)
```
npm i -g vercel
cd idriss-mecano
vercel dev
```
`vercel dev` lets you set the same env vars locally (or use a local `.env` file with
the four variables — never commit it). Then open the printed `localhost` URL.

---

## Security checklist
- ✅ `service_role` key and `OPENAI_API_KEY` live **only** in Vercel env vars.
- ✅ RLS is ON for all tables, no public policies → anon/browser can't read or write.
- ✅ Set `ALLOWED_ORIGIN` so only your site can call the functions.
- ✅ Set a monthly spend limit in the OpenAI dashboard.
- ✅ If a key ever leaks, rotate it (OpenAI dashboard / Supabase → reset service key).

Idea & developed by Idriss Romdhani.
