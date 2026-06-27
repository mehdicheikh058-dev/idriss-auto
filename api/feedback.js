/* Idriss Auto — store user feedback / contact (server-side). */
export const config = { maxDuration: 15 };

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
function body(req) {
  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch { b = {}; } }
  return b || {};
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return res.status(200).json({ ok: false, skipped: true });

  try {
    const b = body(req);
    const message = String(b.message || '').trim().slice(0, 2000);
    if (message.length < 2) return res.status(400).json({ error: 'Empty message' });
    const row = { message, contact: String(b.contact || '').slice(0, 160) || null };
    const r = await fetch(`${url}/rest/v1/feedback`, {
      method: 'POST',
      headers: { apikey: key, Authorization: 'Bearer ' + key, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify(row)
    });
    if (!r.ok) { const t = await r.text().catch(() => ''); return res.status(502).json({ error: 'DB error', detail: t.slice(0, 200) }); }
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: String(e && e.message || e) });
  }
}
