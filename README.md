# 🌿 Harga Pestisida — Panduan Deploy ke Vercel

## Struktur File
```
pestisida-vercel/
├── index.html        ← Frontend utama
├── api/
│   └── data.js       ← Serverless API (menyembunyikan API Key)
└── vercel.json       ← Konfigurasi Vercel
```

---

## Langkah 1 — Buat Bin di JSONBin.io

1. Buka https://jsonbin.io dan daftar akun gratis
2. Klik **"Create Bin"**
3. Isi dengan JSON kosong: `{ "items": [] }`
4. Klik **Create** → salin **BIN ID** (contoh: `65f2a1b3...`)
5. Pergi ke **API Keys** → salin **Master Key** (contoh: `$2a$10$...`)

---

## Langkah 2 — Upload ke GitHub

1. Buat repository baru di GitHub (misal: `harga-pestisida`)
2. Upload ketiga file di atas ke repository tersebut

---

## Langkah 3 — Deploy ke Vercel

1. Buka https://vercel.com → login dengan GitHub
2. Klik **"Add New Project"** → pilih repository `harga-pestisida`
3. Klik **Deploy** (biarkan pengaturan default)

---

## Langkah 4 — Set Environment Variables ⬅ PENTING

Di Vercel dashboard, buka project Anda:

1. Klik tab **"Settings"** → **"Environment Variables"**
2. Tambahkan **dua variabel** berikut:

| Name | Value |
|------|-------|
| `JSONBIN_API_KEY` | `$2a$10$xxxxxxxxxxxx` (Master Key dari JSONBin) |
| `JSONBIN_BIN_ID`  | `65f2a1b3xxxxxxxxxx` (Bin ID dari JSONBin) |

3. Klik **Save** lalu **Redeploy** project

---

## Selesai! ✅

Website Anda sekarang aktif di URL Vercel seperti:
`https://harga-pestisida.vercel.app`

Data tersimpan di JSONBin dan aman — API Key tidak terlihat di browser.
