/* Idriss Auto — "Ask Idriss" chat proxy (Vercel / Node 18+).
   Uses OPENAI_API_KEY (server-side secret). Never exposes the key.
   Idea & developed by Idriss Romdhani. */
export const config = { maxDuration: 30 };

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

const SYSTEM = [
  'You are "Idriss", a friendly, expert auto mechanic assistant inside the Idriss Auto app.',
  'You help with vehicle mechanics: diagnostics, repairs, parts and fitment, maintenance,',
  'dashboard warning lights, OBD-II codes, fluids, tyres and tools.',
  'Give clear, practical, SAFE, step-by-step guidance. Mention safety precautions when relevant.',
  'IMPORTANT: reply in the SAME language as the user\'s latest message — English, French (français) or Arabic (العربية).',
  'Keep answers focused and well-structured; avoid unnecessary length.',
  'If a request is unrelated to vehicles, or unsafe (e.g. defeating safety systems), politely steer back to mechanics.',
  'You are not a substitute for a professional inspection on safety-critical issues — say so when appropriate.'
].join(' ');

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ error: 'Server not configured: missing OPENAI_API_KEY' });

  try {
    const b = body(req);
    const raw = Array.isArray(b.messages) ? b.messages.slice(-24) : [];
    const msgs = raw
      .filter(m => m && (m.role === 'user' || m.role === 'assistant') &&
        (typeof m.content === 'string' ? m.content.trim() : Array.isArray(m.content) && m.content.length))
      .map(m => {
        if (Array.isArray(m.content)) {
          const parts = m.content
            .filter(p => p && (p.type === 'text' || p.type === 'image_url'))
            .map(p => p.type === 'text'
              ? { type: 'text', text: String(p.text || '').slice(0, 4000) }
              : { type: 'image_url', image_url: { url: (p.image_url && p.image_url.url) || '' } })
            .filter(p => p.type !== 'image_url' || p.image_url.url);
          return { role: m.role, content: parts };
        }
        return { role: m.role, content: String(m.content).slice(0, 4000) };
      });
    if (!msgs.length) return res.status(400).json({ error: 'No message' });

    const model = process.env.CHAT_MODEL || 'gpt-4o-mini';
    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
      body: JSON.stringify({
        model, max_tokens: 800, temperature: 0.4,
        messages: [{ role: 'system', content: SYSTEM }, ...msgs]
      })
    });
    if (!aiRes.ok) {
      const t = await aiRes.text().catch(() => '');
      return res.status(502).json({ error: 'AI service error (' + aiRes.status + ')', detail: t.slice(0, 300) });
    }
    const json = await aiRes.json();
    const reply = (json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content) || '';
    return res.status(200).json({ reply: reply.trim() });
  } catch (e) {
    return res.status(500).json({ error: String(e && e.message || e) });
  }
}
