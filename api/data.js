// api/data.js — Vercel Serverless Function
// Menyembunyikan API Key & Bin ID dari frontend
// Env variable yang perlu diset di Vercel:
//   JSONBIN_API_KEY  → API key dari jsonbin.io
//   JSONBIN_BIN_ID   → Bin ID dari jsonbin.io

export default async function handler(req, res) {
  const API_KEY = process.env.JSONBIN_API_KEY;
  const BIN_ID  = process.env.JSONBIN_BIN_ID;

  if (!API_KEY || !BIN_ID) {
    return res.status(500).json({ error: 'Environment variables belum dikonfigurasi di Vercel.' });
  }

  const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
  const headers  = {
    'X-Master-Key': API_KEY,
    'Content-Type': 'application/json',
  };

  // CORS — izinkan semua origin (bisa dibatasi ke domain Anda)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      // Ambil data dari JSONBin
      const response = await fetch(`${BASE_URL}/latest`, { headers });
      const json = await response.json();
      return res.status(200).json(json.record || { items: [] });
    }

    if (req.method === 'PUT') {
      // Simpan data ke JSONBin
      const body = req.body;
      const response = await fetch(BASE_URL, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
      });
      const json = await response.json();
      return res.status(200).json(json.record || body);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
