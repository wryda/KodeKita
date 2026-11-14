# KodeKita

Media belajar web untuk siswa SMA/SMK: HTML, CSS, JavaScript, PHP, dan SQL.
Berisi materi, playground kode, kuis, tantangan coding, dan pelacak progres.
Dibuat dengan HTML, CSS, dan JavaScript biasa tanpa framework.

## Fitur

- 16 materi dengan contoh kode, ilustrasi, video, dan audio penjelasan
- Playground HTML/CSS/JS dengan pratinjau langsung
- Kuis 25 soal (urutan soal dan pilihan diacak), soal salah menaut ke materinya
- 7 tantangan: HTML/CSS/JS dijalankan di iframe, PHP/SQL berupa isian dan pilihan
- Akun dan progres (localStorage, atau server bila tersedia)
- Ekspor dan impor progres, mode gelap

## Menjalankan

Pilih salah satu. Aplikasi tidak bisa dibuka dengan klik dua kali pada `index.html`
karena memuat potongan HTML lewat `fetch`.

**Server lokal sederhana** (akun dan progres di peramban):

    python -m http.server 8000

lalu buka http://localhost:8000. Alternatif: ekstensi Live Server di VS Code.

**Dengan server KodeKita** (akun dan nilai tersimpan di server, perlu Node.js 18+):

    GURU=guru@sekolah.sch.id node server/server.js

lalu buka http://localhost:3000. Di Windows PowerShell:

    $env:GURU="guru@sekolah.sch.id"; node server/server.js

Daftarkan akun dengan email guru tersebut, lalu buka http://localhost:3000/guru.html
untuk melihat nilai siswa dan mengunduhnya sebagai CSV.

## Struktur

    index.html          kerangka halaman
    guru.html           halaman nilai untuk guru
    html/               potongan HTML tiap bagian
    css/                gaya (tambahan.css: mode gelap dan tantangan)
    js/data.js          materi, kuis, tantangan dasar
    js/data-tambahan.js bab tiap soal, soal baru, tantangan PHP/SQL
    js/muat.js          pemuat; urutan skrip di sini penting
    js/sinkron.js       sinkronisasi ke server (otomatis nonaktif bila tidak ada)
    server/server.js    server akun dan nilai (tanpa dependensi)
    assets/             ilustrasi dan logo

## Menambah isi

- **Materi:** salin satu objek di `LESSONS` pada `js/data.js`.
- **Soal kuis:** tambahkan objek `{ t, o, a, b, bab }` di `js/data-tambahan.js`
  (`a` = nomor jawaban benar mulai 0, `bab` = id materi untuk tautan "Baca lagi").
- **Tantangan:** tambahkan di `CH`. Web memakai `mulai` dan `uji`; PHP/SQL memakai
  `jenis: 'isian'` (dengan `uji`) atau `jenis: 'pilihan'` (dengan `pilihan` dan `benar`).

## Keamanan dan batasan

- Sandi di server disimpan dengan scrypt dan garam; token ditandatangani HMAC dan berlaku 7 hari.
- Skor kuis dan tantangan dinilai di peramban, jadi siswa yang paham DevTools bisa
  memalsukannya. Cukup untuk latihan, tidak untuk ujian bernilai.
- Pakai HTTPS bila server dipasang di internet (misalnya di belakang Nginx atau Caddy).
- Data server ada di `server/data/db.json`. Cadangkan berkala; folder ini tidak masuk Git.
- Tanpa server, akun hanya ada di peramban: progres hilang bila data situs dihapus,
  gunakan Ekspor progres di halaman Profil.
