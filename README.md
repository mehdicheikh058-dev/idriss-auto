# Idriss Auto 🚗🔧

A trendy Progressive Web App (PWA) for vehicle-mechanics lovers. Scan a car part with your phone camera and find **which vehicles need it** — plus a parts catalog, maintenance guides, dashboard warning lights, OBD-II codes, fluids guide, a tools glossary, and a personal garage.

**Idea & developed by Idriss Romdhani.**

Installable on **iPhone (iOS / Safari)** and **Android (Chrome)**, runs **offline**, with **light/dark themes** and **EN / FR / AR** (right-to-left Arabic).

---

## ✨ Features

- **AI part scanner** — snap a photo of a part; an AI vision model identifies it and lists compatible vehicles.
- **Parts catalog** — search 26 sample parts across 10 categories by name, number, barcode or car. Offline, no key needed.
- **Learn hub** — maintenance guides, dashboard warning lights, common OBD-II fault codes, fluids reference, and a tools glossary.
- **My Garage** — save vehicles and instantly see matching parts; bookmark parts for later.
- **Appearance toggle** — Light / Dark / System, remembered on your device.
- **Multi-language** — English / Français / العربية with RTL layout.
- **Modern UX** — glassmorphism, gradient accents, animated scan line, shimmer loaders, sliding tab bar, smooth transitions.

---

## 🔑 Turning on photo AI recognition

Photo recognition calls an AI vision service, so it needs an API key. Everything else works **without** a key.

1. Open the app → tap the **⚙️ gear** (top-right).
2. Paste an **OpenAI-compatible API key** (e.g. an OpenAI key for `gpt-4o-mini`).
3. (Optional) change the endpoint/model for another provider.
4. Tap **Save settings**.

Your key is stored **only on your device** and is sent **only** to the AI endpoint you configure.

---

## 🖼 Images

The app looks great out of the box using crisp emoji/SVG icons — **no images are required**.

To make it your own you only need **one image**:

- **`icons/icon-192.png` and `icons/icon-512.png`** — the app logo/icon (used in the header and when installed). Replace the included placeholder gear icon with your generated logo. Provide a **square PNG, 512×512**, and a 192×192 copy (or just drop a 512 and rename a copy).

**Optional (nice-to-have) category photos** — if you want photos behind the catalog categories later, you can add square JPGs to an `images/` folder named: `cat-engine.jpg, cat-brakes.jpg, cat-filters.jpg, cat-electrical.jpg, cat-suspension.jpg, cat-ignition.jpg, cat-cooling.jpg, cat-belts.jpg, cat-transmission.jpg, cat-exhaust.jpg`. (Wiring them in is a small follow-up — ask and I'll add it.)

---

## 🚀 Deploy on GitHub Pages (free)

1. Create a repo, e.g. `idriss-auto`.
2. Upload **all files in this folder** (keep `icons/`, `.nojekyll`, everything).
3. Repo **Settings → Pages**.
4. **Source → Deploy from a branch** → branch `main`, folder `/ (root)` → **Save**.
5. Live in ~1 min at `https://<your-username>.github.io/idriss-auto/`.

### Command line
```bash
git init
git add .
git commit -m "Idriss Auto PWA — idea & developed by Idriss Romdhani"
git branch -M main
git remote add origin https://github.com/<your-username>/idriss-auto.git
git push -u origin main
```

---

## 📲 Install on a phone

- **Android (Chrome):** open the URL → menu **⋮** → **Install app**.
- **iPhone (Safari):** open the URL → **Share** → **Add to Home Screen**.

---

## 🛠 Customizing the data

All content lives in **`data.js`**:

- `PARTS` — `partNo`, optional `barcode`, `category`, multilingual `name`, and `fits` `{make, model, years}`.
- `GUIDES`, `WARNING_LIGHTS`, `OBD_CODES`, `FLUIDS`, `TOOLS_GLOSSARY` — multilingual reference content.
- `CATEGORIES` — catalog filters (each has an emoji `icon` and optional `img`).

The starter data is a small sample so the app works immediately — extend it with real fitment data for production.

---

## 📁 Structure

```
index.html              App shell + screens
styles.css              Themeable design (light/dark, RTL, animations)
app.js                  Logic: scan, search, learn hub, garage, theme, i18n
i18n.js                 EN / FR / AR translations
data.js                 Parts + mechanics knowledge base (edit me!)
manifest.webmanifest    PWA metadata
sw.js                   Service worker (offline cache)
icons/                  App icons (replace with your logo)
.nojekyll               GitHub Pages: serve files as-is
```

Made with ❤️ for the mechanics community — **idea & developed by Idriss Romdhani.**
