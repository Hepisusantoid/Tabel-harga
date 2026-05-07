// api/data.js — Vercel Serverless Function
// Menyembunyikan API Key & Bin ID dari frontend

export default async function handler(req, res) {
  const API_KEY = process.env.JSONBIN_API_KEY;
  const BIN_ID  = process.env.JSONBIN_BIN_ID;

  // ── CORS ───────────────────────────────────────────────
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ── VALIDASI ENV ───────────────────────────────────────
  if (!API_KEY || !BIN_ID) {
    return res.status(500).json({
      error: 'Environment variables belum dikonfigurasi di Vercel.'
    });
  }

  const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

  const headers = {
    'X-Master-Key': API_KEY,
    'Content-Type': 'application/json'
  };

  try {
    // ── GET DATA ─────────────────────────────────────────
    if (req.method === 'GET') {
      const response = await fetch(`${BASE_URL}/latest`, {
        method: 'GET',
        headers
      });

      if (!response.ok) {
        throw new Error(`JSONBin error ${response.status}`);
      }

      const json = await response.json();

      return res.status(200).json(
        json.record || { items: [] }
      );
    }

    // ── SAVE DATA ────────────────────────────────────────
    if (req.method === 'PUT') {
      const body = req.body;

      // Validasi format data
      if (!body || !Array.isArray(body.items)) {
        return res.status(400).json({
          error: 'Format data tidak valid. Gunakan: { items: [] }'
        });
      }

      const response = await fetch(BASE_URL, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`JSONBin error ${response.status}`);
      }

      const json = await response.json();

      return res.status(200).json(
        json.record || body
      );
    }

    // ── METHOD INVALID ───────────────────────────────────
    return res.status(405).json({
      error: 'Method not allowed'
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message || 'Internal server error'
    });
  }
}
