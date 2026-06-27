/* Idriss Auto — serverless AI proxy (Vercel / Node 18+).
   The OpenAI key is read from the server environment variable OPENAI_API_KEY.
   It is NEVER sent to the browser and must NOT be placed in any front-end file.
   Idea & developed by Idriss Romdhani. */

export const config = { maxDuration: 30 };

export default async function handler(req, res) {
  // CORS (so the PWA can call it even if hosted on another domain)
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ error: 'Server not configured: missing OPENAI_API_KEY' });

  try {
    // Vercel parses JSON bodies automatically; fall back just in case.
    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
    const image = body && body.image;
    if (!image || typeof image !== 'string') {
      return res.status(400).json({ error: 'No image provided' });
    }

    const model = process.env.VISION_MODEL || 'gpt-4o-mini';
    const prompt = [
      'You are an expert auto-parts identifier. Identify the car part in the image.',
      'Respond ONLY with strict JSON, no markdown, in this exact shape:',
      '{"partName":"","category":"","partNumber":"","confidence":"high|medium|low","vehicles":[{"make":"","model":"","years":""}],"notes":""}',
      'List the most common vehicles that use this part. If unsure, set confidence "low" with best guesses.'
    ].join('\n');

    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
      body: JSON.stringify({
        model,
        max_tokens: 700,
        temperature: 0.2,
        messages: [{
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: image } }
          ]
        }]
      })
    });

    if (!aiRes.ok) {
      const txt = await aiRes.text().catch(() => '');
      return res.status(502).json({ error: 'AI service error (' + aiRes.status + ')', detail: txt.slice(0, 300) });
    }

    const json = await aiRes.json();
    let content = (json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content) || '';
    content = content.replace(/```json|```/g, '').trim();
    const a = content.indexOf('{'), b = content.lastIndexOf('}');
    if (a >= 0 && b >= 0) content = content.slice(a, b + 1);

    let parsed;
    try { parsed = JSON.parse(content); }
    catch { parsed = { partName: 'Unknown part', confidence: 'low', vehicles: [], notes: content.slice(0, 300) }; }

    return res.status(200).json(parsed);
  } catch (e) {
    return res.status(500).json({ error: 'Proxy error', detail: String(e && e.message || e) });
  }
}
