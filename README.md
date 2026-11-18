# DENERA — The Fourth Generation of PDF Ulya

Website angkatan digital DENERA. Static site (HTML + CSS + JS), tanpa framework, tanpa dependency build. Data terpisah dari UI.

## Struktur

```
denera/
├── index.html          # markup semantik, semua section
├── css/style.css       # design system + komponen + responsive
├── js/data.js          # SEMUA data (members, activities, achievements, gallery, events, ...)
├── js/main.js          # render + interaksi (nav, filter, lightbox, kalender, countdown, dst)
├── assets/             # logo, mark, langit (webp, sudah dikompres)
└── README.md
```

## Menjalankan

Buka `index.html` langsung di browser, atau jalankan static server:

```bash
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

Versi satu file (`DENERA.html`) juga tersedia: semua CSS, JS, dan gambar sudah di-inline, cukup dibuka tanpa server.

## Mengganti data

Semua konten ada di `js/data.js` dan di-render oleh `js/main.js`. Yang paling sering diganti:

| Bagian | Lokasi |
| --- | --- |
| Statistik (Students, Dreams, Memories) | `config.stats` |
| Tanggal countdown | `config.countdown.target` |
| Anggota | `members` (foto: isi `photo: "assets/nama.jpg"`, `null` = placeholder) |
| Kegiatan | `activities` |
| Prestasi | `achievements` |
| Galeri | `gallery` (`ratio`: `tall` / `wide` / `square`) |
| Kalender | `events` + `birthdays` |
| Pengumuman | `announcements` |
| Mimpi & kampus | `dreams` |
| Quote wall | `quotes` |
| Kepengurusan | `leadership` |
| Cerita | `stories` |
| Guestbook awal | `guestbookSeed` |
| Kontak & sosial | `contact` |
| Yearbook | `yearbook.pages` |

Semua data yang ada sekarang adalah **placeholder** (nama "Nama Anggota 01", foto `null`) — ganti dengan data asli angkatan.

## Menyambungkan backend (Supabase / Firebase)

Data layer sengaja dipisah. Di `js/main.js` ada fungsi `loadData()`:

```js
async function loadData() {
  if (window.DENERA_DATA) return window.DENERA_DATA;
  // ganti dengan:
  // const res = await fetch("/api/site"); return await res.json();
}
```

Bentuk objek yang dikembalikan harus sama dengan `js/data.js`. Untuk Supabase, tabel yang disarankan:
`members`, `activities`, `achievements`, `gallery`, `events`, `birthdays`, `announcements`, `quotes`, `dreams`, `leadership`, `stories`, `guestbook`.
Aktifkan Row Level Security di semua tabel; `guestbook` butuh policy `insert` untuk anon dan `select` terbatas.

Guestbook saat ini memakai `localStorage` (`denera_guestbook_v1`) sebagai prototype — siap diganti dengan `insert` ke tabel `guestbook`.

## Aksesibilitas & performa

- Semantic HTML, skip link, `aria-*` seperlunya, fokus terlihat.
- `prefers-reduced-motion`: semua animasi dimatikan, konten langsung tampil.
- Gambar `loading="lazy"` + format WebP; CSS/JS tanpa library eksternal.
- Responsif dari 320px sampai ultra-wide; tidak ada horizontal overflow.

## Easter egg

- Klik logo DENERA 5x → "Once DENERA, Always DENERA."
- Ketik `denera` di halaman → hidden message.

## Muncul di pencarian Google/Chrome

Situs ini sudah siap dirayapi: ada `robots.txt`, `sitemap.xml`, meta `robots: index, follow`, dan structured data JSON-LD (`WebSite` + `EducationalOrganization`).

Agar benar-benar terindeks, langkah berikut butuh akun Google pemilik situs (tidak bisa dilakukan otomatis):

1. Buka [Google Search Console](https://search.google.com/search-console) → **Add property** → **URL prefix** → `https://murohito9-sudo.github.io/denera/`.
2. Verifikasi dengan metode **HTML tag**: salin tag dari Google, tempel di `<head>` `index.html`, commit. (Alternatif: verifikasi DNS hanya jika memakai domain sendiri.)
3. Setelah terverifikasi: **Sitemaps** → kirim `sitemap.xml`. Lalu **URL Inspection** → tempel URL situs → **Request indexing**.
4. Ulangi di [Bing Webmaster Tools](https://www.bing.com/webmasters) bila ingin muncul di Bing/Edge.

Catatan realistis: kata kunci tunggal "denera" sudah dipakai PT Daya Energi Bersih Nusantara (anak perusahaan Danantara) yang diberitakan Antara, Jakarta Post, dan Bloomberg — angkatan sekolah tidak akan menang di kata kunci itu. Yang realistis adalah kata kunci panjang seperti "DENERA PDF Ulya" atau "website angkatan DENERA". Indeks pertama biasanya 3–14 hari setelah request indexing.

---

© 2026 DENERA — The Fourth Generation of PDF Ulya
