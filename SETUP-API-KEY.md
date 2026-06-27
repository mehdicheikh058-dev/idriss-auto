# Connecting the AI key the SECURE way (clients never see it)

Your app is a front-end PWA. **Any key placed in the app files is visible to every user** (View Source / DevTools) and, in a public GitHub repo, sits in plain text. So we do NOT put the key in the app.

Instead, the app already includes a tiny backend "proxy" — `api/analyze.js` — that keeps the key as a **server-only secret**. The phone sends the photo to your proxy, the proxy adds the secret key and calls OpenAI, and only the result comes back. The key never reaches the browser and never goes in the repo. This is exactly how to let clients use AI without ever seeing the key.

Because GitHub Pages can't run backend code, deploy on **Vercel** (free) — it hosts the static app *and* the `api/` function together.

---

## Step 1 — Get an OpenAI API key
1. Go to **https://platform.openai.com** and sign in (create an account if needed).
2. Add a payment method / credits under **Billing** (vision models need a paid balance).
3. Open **API keys** → **Create new secret key** → copy it (starts with `sk-...`).
4. Keep it somewhere private for a moment. **Do NOT paste it into the app, the code, GitHub, or chat.**

## Step 2 — Put the code on GitHub
1. Create a repo (e.g. `idriss-auto`) and upload the whole `idriss-mecano` folder (including the `api/` folder).
2. Commit.

## Step 3 — Deploy on Vercel
1. Go to **https://vercel.com**, sign in with GitHub.
2. **Add New → Project → Import** your `idriss-auto` repo.
3. Framework preset: **Other**. Leave build settings default. Click **Deploy**.

## Step 4 — Add the secret key (this is where the key "goes")
1. In Vercel, open your project → **Settings → Environment Variables**.
2. Add:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** *paste your `sk-...` key here*
   - Environments: **Production, Preview, Development** (check all)
3. *(Optional)* add `VISION_MODEL` = `gpt-4o-mini` to choose the model.
4. Click **Save**.
5. Go to **Deployments → ⋯ on the latest → Redeploy** so the new variable takes effect.

That's it. The key lives only inside Vercel's encrypted settings. The app calls `/api/analyze`; users never see the key.

---

## How do *I* give you the key?
**You don't — and you shouldn't.** Don't send it in this chat or put it in any file. You enter it yourself in **Vercel → Settings → Environment Variables** (Step 4). I've already written the code that reads it from there (`process.env.OPENAI_API_KEY`). Nothing else is needed from you.

If you ever pasted a key somewhere public, delete it on the OpenAI dashboard and create a new one.

---

## Testing locally (optional, for you only)
```
npm i -g vercel
cd idriss-mecano
vercel dev        # then open the printed localhost URL
```
`vercel dev` will prompt for env vars, or it reads a local `.env` file containing `OPENAI_API_KEY=sk-...` (never commit that file — it's for your machine only).

## Protecting your bill (recommended)
- Set a **monthly usage limit** in OpenAI Billing.
- After deploying, set `ALLOWED_ORIGIN` in Vercel to your site URL (e.g. `https://idriss-auto.vercel.app`) so only your app can call the proxy.

Idea & developed by Idriss Romdhani.
