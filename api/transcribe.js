/* Idriss Auto — voice transcription (OpenAI Whisper) for Ask Idriss.
   Uses OPENAI_API_KEY (server-side secret). Idea & developed by Idriss Romdhani. */
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

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ error: 'Server not configured: missing OPENAI_API_KEY' });

  try {
    const b = body(req);
    let audio = b.audio || '';
    const mime = (b.mime || 'audio/webm').split(';')[0];
    if (!audio) return res.status(400).json({ error: 'No audio' });
    // strip data URL prefix if present
    const comma = audio.indexOf('base64,');
    if (comma >= 0) audio = audio.slice(comma + 7);
    const buf = Buffer.from(audio, 'base64');
    if (!buf.length) return res.status(400).json({ error: 'Empty audio' });
    if (buf.length > 20 * 1024 * 1024) return res.status(413).json({ error: 'Audio too large' });

    const ext = mime.includes('mp4') ? 'mp4' : mime.includes('mpeg') ? 'mp3' : mime.includes('ogg') ? 'ogg' : mime.includes('wav') ? 'wav' : 'webm';
    const form = new FormData();
    form.append('file', new Blob([buf], { type: mime }), 'audio.' + ext);
    form.append('model', process.env.TRANSCRIBE_MODEL || 'whisper-1');
    if (b.lang) form.append('language', String(b.lang).slice(0, 5));

    const r = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + key },
      body: form
    });
    if (!r.ok) {
      const t = await r.text().catch(() => '');
      return res.status(502).json({ error: 'Transcription error (' + r.status + ')', detail: t.slice(0, 300) });
    }
    const json = await r.json();
    return res.status(200).json({ text: (json.text || '').trim() });
  } catch (e) {
    return res.status(500).json({ error: String(e && e.message || e) });
  }
}
