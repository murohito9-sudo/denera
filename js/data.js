/* ============================================================
   DENERA — Data Layer
   ------------------------------------------------------------
   SEMUA data di file ini adalah PLACEHOLDER dan aman untuk diganti.
   UI sepenuhnya di-render dari objek di bawah, jadi cukup edit
   file ini (tanpa menyentuh HTML/CSS) untuk mengganti isi website.

   Nanti, untuk membuat website dinamis, ganti sumber data di
   `window.DENERA.load()` (lihat js/main.js) dengan fetch ke
   Supabase / Firebase. Bentuk objeknya tidak perlu berubah.
   ============================================================ */

window.DENERA_DATA = {
  meta: {
    placeholder: true,
    note: "Placeholder data — edit js/data.js"
  },

  site: {
    name: "DENERA",
    tagline: "The Fourth Generation of PDF Ulya",
    taglineScript: "the forth generation of pdf ulya",
    quote: "Bersama dalam satu generasi, melangkah menuju masa depan.",
    footerQuote: "Different paths. One generation. One story.",
    year: 2026,
    logo: "assets/denera-logo.webp",
    mark: "assets/denera-mark.webp"
  },

  /* ---------- Konfigurasi yang sering diganti ---------- */
  config: {
    generation: "4th Generation",
    institution: "PDF Ulya",
    status: "Student Generation",
    vision: "Become One of the Best Generations",
    /* Tanggal countdown — cukup ubah satu nilai ini */
    countdown: {
      label: "Countdown to Our Next Chapter",
      target: "2027-06-20T08:00:00+07:00"
    },
    /* Angka statistik */
    stats: {
      students: 36,
      dreams: 36,
      memories: 120,
      generation: 1
    }
  },

  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Members", href: "#members" },
    { label: "Activities", href: "#activities" },
    { label: "Achievements", href: "#achievements" },
    { label: "Memories", href: "#memories" },
    { label: "Dreams", href: "#dreams" },
    { label: "Contact", href: "#contact" }
  ],

  about: {
    eyebrow: "Who We Are",
    title: "DENERA bukan hanya sebuah nama.",
    lead: "DENERA adalah cerita tentang satu generasi yang tumbuh bersama, belajar bersama, menghadapi tantangan bersama, dan perlahan mempersiapkan diri untuk menaklukkan masa depan.",
    body: [
      "Kami adalah generasi keempat PDF Ulya — angkatan yang lahir dari ruang kelas yang sama, cerita yang sama, dan mimpi yang saling menyilang. Setiap nama di dalamnya adalah bagian dari satu bab besar yang sedang kami tulis bersama.",
      "Di sini kami merawat persaudaraan, mengejar prestasi, dan menyiapkan langkah menuju pendidikan yang lebih tinggi — dari kota-kota di Indonesia hingga ke berbagai belahan dunia."
    ]
  },

  timeline: [
    {
      label: "The Beginning",
      year: "2024",
      title: "Awal terbentuknya generasi",
      text: "Langkah pertama DENERA dimulai dari nama-nama yang belum saling mengenal, lalu perlahan menjadi satu ruang yang sama."
    },
    {
      label: "The First Step",
      year: "2024",
      title: "Masa awal perjalanan bersama",
      text: "Hari-hari pertama belajar, saling mengingat nama, dan menemukan bahwa kami bisa berjalan lebih jauh jika bersama."
    },
    {
      label: "The Journey",
      year: "2025",
      title: "Kegiatan, pembelajaran, dan tantangan",
      text: "Kelas, kegiatan, kompetisi, dan semua hal yang membuat kami tumbuh — termasuk hari-hari yang tidak mudah."
    },
    {
      label: "The Memories",
      year: "2026",
      title: "Momen yang tidak akan dilupakan",
      text: "Tawa di jam kosong, momen kecil yang tiba-tiba terasa besar, dan semua cerita yang kami simpan rapi di sini."
    },
    {
      label: "The Future",
      year: "2027",
      title: "Perjalanan menuju cita-cita",
      text: "Setiap langkah kami arahkan menuju pendidikan yang lebih tinggi, ke kota dan negara yang berbeda, dengan cerita yang tetap satu."
    }
  ],

  /* ---------- Anggota ----------
     category: "male" | "female" | "other"
     tags: array bebas, dipakai filter "management"
     photo: null → placeholder otomatis
  */
  members: [
    { id: "m01", name: "Nama Anggota 01", nickname: "Panggilan 01", role: "Class Leader", category: "male", tags: ["management"], quote: "Grow together, remember forever.", photo: null, socials: { instagram: "#" } },
    { id: "m02", name: "Nama Anggota 02", nickname: "Panggilan 02", role: "Vice Leader", category: "female", tags: ["management"], quote: "Different dreams, one generation.", photo: null, socials: { instagram: "#" } },
    { id: "m03", name: "Nama Anggota 03", nickname: "Panggilan 03", role: "Secretary", category: "female", tags: ["management"], quote: "Every detail matters.", photo: null, socials: { instagram: "#" } },
    { id: "m04", name: "Nama Anggota 04", nickname: "Panggilan 04", role: "Treasurer", category: "female", tags: ["management"], quote: "Keep it honest, keep it simple.", photo: null, socials: { instagram: "#" } },
    { id: "m05", name: "Nama Anggota 05", nickname: "Panggilan 05", role: "Religious Division", category: "male", tags: ["management"], quote: "Ilmu yang bermanfaat adalah warisan.", photo: null, socials: { instagram: "#" } },
    { id: "m06", name: "Nama Anggota 06", nickname: "Panggilan 06", role: "Education Division", category: "male", tags: ["management"], quote: "Today we learn together.", photo: null, socials: { instagram: "#" } },
    { id: "m07", name: "Nama Anggota 07", nickname: "Panggilan 07", role: "Sports Division", category: "male", tags: ["management"], quote: "Fight for the team, not for the spotlight.", photo: null, socials: { instagram: "#" } },
    { id: "m08", name: "Nama Anggota 08", nickname: "Panggilan 08", role: "Documentation Division", category: "female", tags: ["management"], quote: "Some memories need to be kept.", photo: null, socials: { instagram: "#" } },
    { id: "m09", name: "Nama Anggota 09", nickname: "Panggilan 09", role: "Creative Division", category: "female", tags: ["management"], quote: "Ide kecil bisa jadi sesuatu yang besar.", photo: null, socials: { instagram: "#" } },
    { id: "m10", name: "Nama Anggota 10", nickname: "Panggilan 10", role: "Member", category: "male", tags: ["other"], quote: "Tomorrow we build our own path.", photo: null, socials: {} },
    { id: "m11", name: "Nama Anggota 11", nickname: "Panggilan 11", role: "Member", category: "female", tags: ["other"], quote: "Belajar tenang, tumbuh perlahan.", photo: null, socials: {} },
    { id: "m12", name: "Nama Anggota 12", nickname: "Panggilan 12", role: "Member", category: "male", tags: ["other"], quote: "One class, one story.", photo: null, socials: {} },
    { id: "m13", name: "Nama Anggota 13", nickname: "Panggilan 13", role: "Member", category: "female", tags: ["other"], quote: "Kalau bukan kita, siapa lagi.", photo: null, socials: {} },
    { id: "m14", name: "Nama Anggota 14", nickname: "Panggilan 14", role: "Member", category: "male", tags: ["other"], quote: "Jangan buru-buru, tapi jangan berhenti.", photo: null, socials: {} },
    { id: "m15", name: "Nama Anggota 15", nickname: "Panggilan 15", role: "Member", category: "female", tags: ["other"], quote: "Ada waktu untuk semua hal baik.", photo: null, socials: {} },
    { id: "m16", name: "Nama Anggota 16", nickname: "Panggilan 16", role: "Member", category: "male", tags: ["other"], quote: "Terus bergerak, terus belajar.", photo: null, socials: {} }
  ],

  memberFilters: [
    { key: "all", label: "All" },
    { key: "male", label: "Male" },
    { key: "female", label: "Female" },
    { key: "management", label: "Class Management" },
    { key: "other", label: "Other" }
  ],

  /* ---------- Struktur kepengurusan ---------- */
  leadership: [
    { level: 0, role: "Class Leader", member: "Nama Anggota 01", desc: "Memegang arah dan tanggung jawab utama angkatan." },
    { level: 1, role: "Vice Leader", member: "Nama Anggota 02", desc: "Mendampingi dan melanjutkan estafet kepemimpinan." },
    { level: 2, role: "Secretary", member: "Nama Anggota 03", desc: "Menjaga catatan, administrasi, dan cerita angkatan." },
    { level: 2, role: "Treasurer", member: "Nama Anggota 04", desc: "Mengelola keuangan kelas secara transparan." },
    { level: 3, role: "Religious Division", member: "Nama Anggota 05", desc: "Menjaga nilai dan kegiatan keagamaan." },
    { level: 3, role: "Education Division", member: "Nama Anggota 06", desc: "Menggerakkan budaya belajar dan akademik." },
    { level: 3, role: "Sports Division", member: "Nama Anggota 07", desc: "Mengelola kegiatan olahraga dan kebugaran." },
    { level: 3, role: "Documentation Division", member: "Nama Anggota 08", desc: "Merekam setiap momen untuk dikenang." },
    { level: 3, role: "Creative Division", member: "Nama Anggota 09", desc: "Merancang identitas visual dan ide kegiatan." },
    { level: 3, role: "Social Division", member: "Nama Anggota 10", desc: "Menghubungkan angkatan dengan lingkungan sekitar." }
  ],

  /* ---------- Kegiatan ---------- */
  activities: [
    { id: "a01", title: "Class Meeting DENERA", category: "Class Events", date: "2026-11-22", place: "Aula Sekolah", participants: "Seluruh anggota", desc: "Satu hari penuh perlombaan antar kelompok, dari futsal sampai lomba kreatif, ditutup dengan makan bersama.", image: null },
    { id: "a02", title: "Study Circle Mingguan", category: "Academic", date: "2026-12-05", place: "Ruang Kelas 4", participants: "Kelompok belajar", desc: "Belajar bersama membedah materi yang sulit, saling mengajari, dan menyiapkan diri untuk ujian.", image: null },
    { id: "a03", title: "Kajian & Khataman", category: "Religious", date: "2027-01-16", place: "Masjid Sekolah", participants: "Seluruh anggota", desc: "Kegiatan keagamaan rutin untuk menjaga nilai dan mempererat kebersamaan angkatan.", image: null },
    { id: "a04", title: "DENERA Cup", category: "Sports", date: "2027-02-08", place: "Lapangan Sekolah", participants: "Tim putra & putri", desc: "Turnamen persahabatan antar kelas yang menjadi ajang kebanggaan angkatan.", image: null },
    { id: "a05", title: "Olimpiade Sains & Bahasa", category: "Competition", date: "2027-02-21", place: "Tingkat Kota", participants: "Tim olimpiade", desc: "Mengirimkan perwakilan terbaik untuk berkompetisi di tingkat kota dan provinsi.", image: null },
    { id: "a06", title: "Bakti Sosial Angkatan", category: "Social", date: "2027-03-14", place: "Lingkungan sekitar sekolah", participants: "Relawan DENERA", desc: "Berbagi dan hadir untuk lingkungan sekitar sebagai bagian dari tanggung jawab generasi.", image: null },
    { id: "a07", title: "DENERA Art & Design Day", category: "Other", date: "2027-04-05", place: "Studio Kreatif", participants: "Divisi Kreatif", desc: "Menghasilkan karya visual angkatan: poster, mural kelas, dan identitas DENERA.", image: null },
    { id: "a08", title: "Class Retreat & Outbound", category: "Organization", date: "2027-04-19", place: "Villa Puncak", participants: "Seluruh anggota", desc: "Menutup tahun dengan refleksi bersama, permainan tim, dan rencana untuk langkah berikutnya.", image: null }
  ],

  activityCategories: ["All", "Academic", "Religious", "Sports", "Competition", "Organization", "Social", "Class Events", "Other"],

  /* ---------- Prestasi ---------- */
  achievements: [
    { id: "ac01", title: "Juara 1 Olimpiade Matematika", recipient: "Nama Anggota 06", year: "2026", category: "Academic", note: "Tingkat kota" },
    { id: "ac02", title: "Juara 2 Lomba Cerdas Cermat", recipient: "Tim DENERA", year: "2026", category: "Competition", note: "Tingkat provinsi" },
    { id: "ac03", title: "Juara 1 Futsal Antar Kelas", recipient: "Tim Putra DENERA", year: "2026", category: "Sports", note: "Tingkat sekolah" },
    { id: "ac04", title: "Juara 3 Lomba Kaligrafi", recipient: "Nama Anggota 05", year: "2025", category: "Religious", note: "Tingkat kabupaten" },
    { id: "ac05", title: "Best Design Angkatan", recipient: "Divisi Kreatif", year: "2026", category: "Arts", note: "Penghargaan internal" },
    { id: "ac06", title: "Ketua OSIS Terpilih", recipient: "Nama Anggota 01", year: "2026", category: "Leadership", note: "Periode 2026/2027" },
    { id: "ac07", title: "Finalis Debat Bahasa Inggris", recipient: "Nama Anggota 03", year: "2025", category: "Competition", note: "Tingkat kota" },
    { id: "ac08", title: "Juara 2 Basket Putri", recipient: "Tim Putri DENERA", year: "2025", category: "Sports", note: "Tingkat sekolah" }
  ],

  achievementCategories: ["All", "Academic", "Competition", "Sports", "Arts", "Religious", "Leadership", "Other"],

  /* ---------- Galeri ----------
     ratio dipakai untuk tinggi kartu masonry: tall | wide | square
  */
  gallery: [
    { id: "g01", title: "Class Photo", category: "Class", ratio: "tall", image: null },
    { id: "g02", title: "First Day Together", category: "Class", ratio: "wide", image: null },
    { id: "g03", title: "Class Meeting", category: "Events", ratio: "square", image: null },
    { id: "g04", title: "Study Circle", category: "Study", ratio: "square", image: null },
    { id: "g05", title: "Olimpiade", category: "Competition", ratio: "tall", image: null },
    { id: "g06", title: "After Class", category: "Friends", ratio: "square", image: null },
    { id: "g07", title: "Study Tour", category: "Events", ratio: "wide", image: null },
    { id: "g08", title: "Random Moments", category: "Random Moments", ratio: "square", image: null },
    { id: "g09", title: "Bakti Sosial", category: "Events", ratio: "square", image: null },
    { id: "g10", title: "Lomba Debat", category: "Competition", ratio: "tall", image: null },
    { id: "g11", title: "Graduation Preview", category: "Graduation", ratio: "wide", image: null },
    { id: "g12", title: "Golden Hour", category: "Random Moments", ratio: "square", image: null }
  ],

  galleryCategories: ["All", "Class", "Events", "Study", "Competition", "Friends", "Graduation", "Random Moments"],

  /* ---------- Cerita (digital magazine) ---------- */
  stories: [
    {
      number: "01",
      name: "Nama Anggota 01",
      role: "Class Leader",
      quote: "Setiap perjalanan memiliki awal, tetapi tidak semua perjalanan meninggalkan cerita.",
      body: [
        "Hari pertama masuk, saya hanya tahu satu hal: saya tidak ingin menjadi satu-satunya orang yang diam di kelas. DENERA mengubah itu. Ada tawa di jam kosong, ada teman yang mengingatkan ketika lupa, ada tangan yang terulur ketika satu di antara kami jatuh.",
        "Kami belum menjadi generasi yang sempurna. Tapi kami belajar untuk hadir — di kelas, di kegiatan, dan di saat-saat yang tidak tercatat di absensi."
      ]
    },
    {
      number: "02",
      name: "Nama Anggota 02",
      role: "Vice Leader",
      quote: "Rumah tidak selalu berupa bangunan. Kadang, rumah adalah orang-orang yang sama setiap pagi.",
      body: [
        "Ada hari-hari ketika saya ingin berhenti. Lalu ada satu pesan singkat di grup kelas: 'kamu masih ikut kan?'. Itu saja. DENERA mengajarkan bahwa persaudaraan tidak selalu berupa kalimat besar.",
        "Jika nanti kami berpisah ke kota yang berbeda, saya ingin bagian ini tetap tinggal di sini — supaya siapa pun yang membukanya tahu bahwa kami pernah benar-benar bersama."
      ]
    },
    {
      number: "03",
      name: "Nama Anggota 08",
      role: "Documentation Division",
      quote: "Kami menyimpan momen bukan karena ingin terkenal, tetapi karena tidak ingin kehilangan.",
      body: [
        "Saya yang paling sering memegang kamera. Kadang saya tertinggal dari keramaian, karena lebih sibuk mengabadikan. Tapi dari balik lensa, saya melihat hal yang tidak semua orang lihat: cara kami tertawa, cara kami saling menyemangati.",
        "Semua foto di halaman ini adalah bukti kecil bahwa satu generasi pernah tumbuh bersama."
      ]
    }
  ],

  /* ---------- Mimpi & tujuan ----------
     region dipakai untuk peta orbit:
     "Indonesia" | "Asia" | "Middle East" | "Europe" | "Australia" | "Other"
  */
  dreams: [
    { id: "d01", name: "Nama Anggota 01", university: "Universitas Indonesia", major: "Ilmu Komputer", location: "Depok, Indonesia", region: "Indonesia", dream: "Menjadi engineer yang membangun produk untuk banyak orang." },
    { id: "d02", name: "Nama Anggota 02", university: "ITB", major: "Teknik Biomedis", location: "Bandung, Indonesia", region: "Indonesia", dream: "Meneliti alat kesehatan yang terjangkau." },
    { id: "d03", name: "Nama Anggota 03", university: "UGM", major: "Hubungan Internasional", location: "Yogyakarta, Indonesia", region: "Indonesia", dream: "Menjadi diplomat yang membawa nama Indonesia." },
    { id: "d04", name: "Nama Anggota 04", university: "Universitas Airlangga", major: "Kedokteran", location: "Surabaya, Indonesia", region: "Indonesia", dream: "Melayani di daerah yang belum punya dokter." },
    { id: "d05", name: "Nama Anggota 05", university: "UIN Sunan Kalijaga", major: "Ilmu Al-Qur'an", location: "Yogyakarta, Indonesia", region: "Indonesia", dream: "Menjadi pendidik yang menjaga nilai." },
    { id: "d06", name: "Nama Anggota 06", university: "Universitas Brawijaya", major: "Statistika", location: "Malang, Indonesia", region: "Indonesia", dream: "Bekerja di bidang data science." },
    { id: "d07", name: "Nama Anggota 07", university: "Universitas Hasanuddin", major: "Teknik Sipil", location: "Makassar, Indonesia", region: "Indonesia", dream: "Membangun infrastruktur di Indonesia timur." },
    { id: "d08", name: "Nama Anggota 08", university: "Nanyang Technological University", major: "Communication", location: "Singapore", region: "Asia", dream: "Menjadi storyteller yang mendokumentasikan perubahan." },
    { id: "d09", name: "Nama Anggota 09", university: "University of Tokyo", major: "Design", location: "Tokyo, Japan", region: "Asia", dream: "Merancang identitas untuk lembaga pendidikan." },
    { id: "d10", name: "Nama Anggota 10", university: "King Saud University", major: "Islamic Studies", location: "Riyadh, Saudi Arabia", region: "Middle East", dream: "Melanjutkan studi dan mengabdi di bidang pendidikan." },
    { id: "d11", name: "Nama Anggota 11", university: "University of Amsterdam", major: "Economics", location: "Amsterdam, Netherlands", region: "Europe", dream: "Meneliti ekonomi pembangunan." },
    { id: "d12", name: "Nama Anggota 12", university: "University of Melbourne", major: "Environmental Science", location: "Melbourne, Australia", region: "Australia", dream: "Bekerja untuk lingkungan yang lebih baik." }
  ],

  dreamRegions: ["Indonesia", "Asia", "Middle East", "Europe", "Australia", "Other"],

  /* ---------- Pengumuman ---------- */
  announcements: [
    { title: "Upcoming Event — Class Retreat", date: "2027-04-19", status: "upcoming", tag: "Upcoming Event", desc: "Persiapan class retreat dimulai. Divisi acara membuka pendaftaran peserta hingga akhir bulan." },
    { title: "Class Meeting DENERA", date: "2026-11-22", status: "upcoming", tag: "Class Meeting", desc: "Seluruh anggota wajib hadir pukul 07.30 di aula sekolah. Gunakan seragam olahraga angkatan." },
    { title: "Pendaftaran Olimpiade", date: "2027-02-21", status: "ongoing", tag: "Competition", desc: "Seleksi internal tim olimpiade sedang berjalan. Hubungi Divisi Pendidikan untuk informasi." },
    { title: "Pengumpulan Foto Yearbook", date: "2026-12-10", status: "completed", tag: "Important Announcement", desc: "Pengumpulan foto individu untuk yearbook digital telah ditutup. Terima kasih untuk semua anggota." }
  ],

  /* ---------- Kalender ----------
     birthday: true → diulang setiap tahun
  */
  events: [
    { title: "Class Meeting DENERA", date: "2026-11-22", type: "Event", desc: "Aula sekolah, 07.30 – selesai." },
    { title: "Study Circle Mingguan", date: "2026-12-05", type: "Class", desc: "Ruang Kelas 4, 14.00." },
    { title: "Bakti Sosial", date: "2026-12-12", type: "Event", desc: "Lingkungan sekitar sekolah." },
    { title: "Pengumpulan Foto Yearbook", date: "2026-12-10", type: "Important", desc: "Batas akhir pengumpulan." },
    { title: "Kajian & Khataman", date: "2027-01-16", type: "Event", desc: "Masjid sekolah, 08.00." },
    { title: "DENERA Cup", date: "2027-02-08", type: "Competition", desc: "Lapangan sekolah, 07.00 – 16.00." },
    { title: "Olimpiade Sains & Bahasa", date: "2027-02-21", type: "Competition", desc: "Tingkat kota." },
    { title: "Bakti Sosial Angkatan", date: "2027-03-14", type: "Event", desc: "Relawan DENERA." },
    { title: "DENERA Art & Design Day", date: "2027-04-05", type: "Event", desc: "Studio kreatif, 09.00." },
    { title: "Class Retreat & Outbound", date: "2027-04-19", type: "Event", desc: "Villa Puncak, 2 hari." },
    { title: "Graduation Day", date: "2027-06-20", type: "Graduation", desc: "Momen penutup perjalanan angkatan." }
  ],

  /* ---------- Ulang tahun ---------- */
  birthdays: [
    { name: "Nama Anggota 01", date: "2027-01-09" },
    { name: "Nama Anggota 02", date: "2027-01-27" },
    { name: "Nama Anggota 03", date: "2027-02-14" },
    { name: "Nama Anggota 04", date: "2027-03-03" },
    { name: "Nama Anggota 05", date: "2027-03-22" },
    { name: "Nama Anggota 06", date: "2027-04-11" },
    { name: "Nama Anggota 07", date: "2027-05-05" },
    { name: "Nama Anggota 08", date: "2027-06-18" },
    { name: "Nama Anggota 09", date: "2027-07-07" },
    { name: "Nama Anggota 10", date: "2027-08-17" },
    { name: "Nama Anggota 11", date: "2027-09-02" },
    { name: "Nama Anggota 12", date: "2027-11-25" }
  ],

  /* ---------- Quote wall ---------- */
  quotes: [
    { text: "Different dreams, one generation.", author: "DENERA" },
    { text: "Grow together, remember forever.", author: "DENERA" },
    { text: "Today we learn together. Tomorrow we build our own path.", author: "DENERA" },
    { text: "Satu kelas, satu cerita, satu generasi.", author: "DENERA" },
    { text: "Kita mungkin akan berpisah, tetapi cerita ini tidak.", author: "DENERA" },
    { text: "Bukan tentang siapa yang paling cepat, tetapi siapa yang tidak berhenti.", author: "DENERA" },
    { text: "Langit yang sama, jalan yang berbeda.", author: "DENERA" },
    { text: "Four generations came before us. Now it is our chapter.", author: "DENERA" }
  ],

  /* ---------- Yearbook ---------- */
  yearbook: {
    title: "The DENERA Yearbook",
    subtitle: "Satu buku, satu generasi, satu cerita yang tidak akan selesai di halaman terakhir.",
    pages: [
      {
        type: "cover",
        title: "DENERA",
        subtitle: "The Fourth Generation of PDF Ulya",
        note: "Digital Yearbook · 2024 — 2027"
      },
      {
        type: "class",
        title: "Our Class",
        text: "Foto kelas ini adalah tempat untuk seluruh wajah DENERA. Ganti dengan foto kelas resmi angkatan.",
        image: null
      },
      {
        type: "list",
        title: "The Names",
        text: "Setiap nama adalah bagian dari cerita."
      },
      {
        type: "memories",
        title: "Our Memories",
        text: "Momen-momen yang kami pilih untuk tidak dilupakan."
      },
      {
        type: "achievements",
        title: "What We Earned",
        text: "Bukan sekadar piala, tetapi bukti bahwa kami pernah berusaha."
      },
      {
        type: "messages",
        title: "Messages",
        text: "Pesan untuk angkatan, untuk masa depan, dan untuk siapa pun yang membaca."
      },
      {
        type: "closing",
        title: "Our Story Continues...",
        text: "Halaman ini belum selesai. Akan kami tulis di tempat-tempat yang belum kami datangi."
      }
    ]
  },

  /* ---------- Guestbook ---------- */
  guestbookSeed: [
    { name: "Alumni PDF Ulya", message: "Selamat untuk DENERA. Jadilah generasi yang dikenang karena kebaikannya.", date: "2026-11-01" },
    { name: "Tamu DENERA", message: "Website-nya indah. Semoga cerita kalian berjalan jauh.", date: "2026-11-10" }
  ],

  /* ---------- Kontak & sosial ---------- */
  contact: {
    email: "denera@pdfulya.sch.id",
    instagram: "https://instagram.com/",
    tiktok: "https://tiktok.com/",
    youtube: "https://youtube.com/",
    address: "PDF Ulya — Indonesia"
  },

  easterEggs: [
    { message: "Once DENERA, Always DENERA." },
    { message: "Four generations came before us. Now it is our chapter." }
  ]
};
