/* Idriss Auto — GET catalog additions/overrides from Supabase.
   Returns [] if Supabase isn't configured, so the app falls back to its
   built-in 26 parts. All DB access is server-side (service key). */
export const config = { maxDuration: 15 };

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return res.status(200).json([]); // not configured yet

  try {
    const r = await fetch(`${url}/rest/v1/parts?select=*`, {
      headers: { apikey: key, Authorization: 'Bearer ' + key }
    });
    if (!r.ok) {
      const t = await r.text().catch(() => '');
      return res.status(502).json({ error: 'DB error (' + r.status + ')', detail: t.slice(0, 200) });
    }
    const rows = await r.json();
    const parts = (rows || []).map(x => ({
      id: x.id, partNo: x.part_no, barcode: x.barcode || undefined,
      category: x.category, name: x.name, fits: x.fits || [],
      image: x.image || undefined
    }));
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');
    return res.status(200).json(parts);
  } catch (e) {
    return res.status(500).json({ error: String(e && e.message || e) });
  }
}
