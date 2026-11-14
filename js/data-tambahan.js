/* KodeKita - Data tambahan: bab tiap soal, soal baru, dan tantangan PHP/SQL.
   Dimuat setelah data.js, jadi data.js tidak perlu diubah. */

(() => {
    'use strict';

    const { QUIZ, CH } = window.KODEKITA;

    /* Bab untuk 13 soal lama, urutannya sama dengan di data.js */

    const BAB_LAMA = [
        'html-teks', 'html-teks',
        'css-selector', 'css-selector',
        'js-variabel', 'js-variabel',
        'css-kotak', 'css-flex',
        'js-array',
        'php-dasar', 'php-formulir',
        'sql-select', 'sql-ubah'
    ];

    QUIZ.forEach((s, i) => { s.bab = BAB_LAMA[i]; });

    /* 12 soal baru: total 25 soal, masing-masing topik 5 soal */

    QUIZ.push(
        {
            t: 'Atribut <code>for</code> pada <code>&lt;label&gt;</code> harus sama dengan apa?',
            o: ['Atribut name pada form', 'Atribut id pada input', 'Atribut type pada input', 'Teks di dalam label'],
            a: 1,
            b: 'Nilai for harus sama dengan id kolomnya. Dengan begitu mengetuk label ikut memilih kolom, dan pembaca layar bisa membacakannya.',
            bab: 'html-formulir'
        },
        {
            t: 'Tag mana yang dipakai untuk daftar bernomor?',
            o: ['<ul>', '<ol>', '<li>', '<nl>'],
            a: 1,
            b: '<ol> membuat daftar bernomor, <ul> daftar bertitik, dan <li> adalah satu butir di dalam keduanya.',
            bab: 'html-teks'
        },
        {
            t: 'Bagian dokumen HTML mana yang berisi <code>&lt;title&gt;</code> dan tidak tampil di halaman?',
            o: ['<body>', '<head>', '<footer>', '<main>'],
            a: 1,
            b: '<head> berisi keterangan seperti title dan meta. Semua yang dilihat pengunjung ada di <body>.',
            bab: 'html-struktur'
        },
        {
            t: 'Pada model kotak CSS, urutan dari dalam ke luar yang benar adalah ...',
            o: [
                'isi, padding, border, margin',
                'isi, margin, border, padding',
                'isi, border, padding, margin',
                'padding, isi, margin, border'
            ],
            a: 0,
            b: 'Dari dalam: isi, padding, border, lalu margin sebagai jarak ke elemen lain.',
            bab: 'css-kotak'
        },
        {
            t: 'Bila <code>const bahasa = ["HTML", "CSS", "JS"];</code>, apa isi <code>bahasa[0]</code>?',
            o: ['"HTML"', '"CSS"', 'undefined', '0'],
            a: 0,
            b: 'Indeks array dimulai dari 0, jadi bahasa[0] adalah nilai pertama, yaitu "HTML".',
            bab: 'js-array'
        },
        {
            t: 'Operator mana yang berarti "sama persis" (nilai dan tipenya)?',
            o: ['=', '===', '!==', '>='],
            a: 1,
            b: '=== membandingkan nilai sekaligus tipe. Satu tanda = adalah pemberian nilai, bukan perbandingan.',
            bab: 'js-fungsi'
        },
        {
            t: 'Bagaimana cara menyambung dua teks di PHP?',
            o: ['Dengan tanda +', 'Dengan tanda titik (.)', 'Dengan tanda &', 'Dengan tanda ::'],
            a: 1,
            b: 'PHP memakai titik, misalnya echo "Halo " . $nama; Tanda + dipakai untuk menjumlah angka.',
            bab: 'php-dasar'
        },
        {
            t: 'Perulangan mana yang dipakai untuk mengulang kode pada setiap isi array di PHP?',
            o: ['foreach', 'forin', 'loopall', 'repeat'],
            a: 0,
            b: 'foreach ($daftar as $b) menjalankan blok kode sekali untuk setiap isi array.',
            bab: 'php-array'
        },
        {
            t: 'Fungsi mana yang dipakai agar teks dari pengguna aman ditampilkan di halaman?',
            o: ['htmlspecialchars()', 'strtoupper()', 'trim()', 'count()'],
            a: 0,
            b: 'htmlspecialchars() mengubah tanda < dan > menjadi teks biasa, sehingga kode asing tidak ikut dijalankan.',
            bab: 'php-formulir'
        },
        {
            t: 'Kolom yang nilainya unik di setiap baris tabel ditandai dengan ...',
            o: ['FOREIGN KEY', 'PRIMARY KEY', 'UNIQUE TEXT', 'INDEX ROW'],
            a: 1,
            b: 'PRIMARY KEY menandai kolom pengenal, misalnya id, yang tidak boleh sama di dua baris.',
            bab: 'sql-dasar'
        },
        {
            t: 'Bagaimana mengurutkan hasil dari nilai terbesar ke terkecil?',
            o: ['ORDER BY nilai ASC', 'ORDER BY nilai DESC', 'SORT nilai DESC', 'GROUP BY nilai'],
            a: 1,
            b: 'ORDER BY mengurutkan hasil. DESC dari besar ke kecil, ASC dari kecil ke besar.',
            bab: 'sql-select'
        },
        {
            t: 'Apa fungsi <code>ON</code> pada perintah <code>JOIN</code>?',
            o: [
                'Menyebut kolom penghubung kedua tabel',
                'Menghapus baris yang sama',
                'Mengurutkan hasil gabungan',
                'Membuat tabel baru'
            ],
            a: 0,
            b: 'ON menyebut kolom penghubung. Baris digabung bila nilai kedua kolom itu sama.',
            bab: 'sql-join'
        }
    );

    /* Tantangan PHP dan SQL: tidak bisa dijalankan di peramban,
       jadi dinilai lewat isian (diperiksa pola jawabannya) atau pilihan. */

    CH.push(
        {
            id: 'c4',
            jenis: 'isian',
            judul: 'PHP: tampilkan nama',
            pet: 'Tulis kode PHP yang menyimpan namamu ke variabel <code>$nama</code>, lalu menampilkannya dengan <code>echo</code>. Akhiri tiap perintah dengan titik koma.',
            awal: '<?php\n\n?>',
            uji: v => {
                const baris = v.replace(/<\?php|\?>/g, '')
                    .split('\n').map(x => x.trim()).filter(Boolean);

                return [
                    ['Variabel $nama diberi nilai teks', /\$nama\s*=\s*(["']).+\1\s*;/.test(v)],
                    ['Ada echo yang menampilkan $nama', /echo\s[^;]*\$nama[^;]*;/.test(v)],
                    ['Setiap perintah diakhiri titik koma', baris.length > 0 && baris.every(x => x.endsWith(';'))]
                ];
            }
        },
        {
            id: 'c5',
            jenis: 'pilihan',
            judul: 'PHP: baca kodenya',
            pet: 'Perhatikan kode berikut.<pre class="kode-kecil">&lt;?php\n$b = ["HTML", "CSS", "PHP"];\necho $b[2];\n?&gt;</pre>Apa yang tampil di halaman?',
            pilihan: ['HTML', 'CSS', 'PHP', 'Terjadi galat'],
            benar: 2,
            bahas: 'Indeks dimulai dari 0, jadi $b[2] adalah nilai ketiga, yaitu "PHP".'
        },
        {
            id: 'c6',
            jenis: 'isian',
            judul: 'SQL: nilai tertinggi',
            pet: 'Tabel <code>siswa</code> punya kolom id, nama, kelas, dan nilai. Tulis satu query yang menampilkan <b>nama</b> siswa yang nilainya <b>lebih dari 80</b>, diurutkan dari nilai tertinggi.',
            awal: '',
            uji: v => {
                const q = v.toLowerCase().replace(/\s+/g, ' ');

                return [
                    ['Memilih kolom nama dari tabel siswa', /select nama from siswa/.test(q)],
                    ['Menyaring dengan WHERE nilai > 80', /where nilai ?> ?80\b/.test(q)],
                    ['Mengurutkan dengan ORDER BY nilai DESC', /order by nilai desc/.test(q)]
                ];
            }
        },
        {
            id: 'c7',
            jenis: 'pilihan',
            judul: 'SQL: gabung tabel',
            pet: 'Tabel <code>siswa</code> (id, nama, id_jurusan) dan <code>jurusan</code> (id, nama_jurusan). Query mana yang benar untuk menampilkan nama siswa beserta nama jurusannya?',
            pilihan: [
                'SELECT siswa.nama, jurusan.nama_jurusan FROM siswa JOIN jurusan ON siswa.id_jurusan = jurusan.id;',
                'SELECT siswa.nama, jurusan.nama_jurusan FROM siswa JOIN jurusan ON siswa.id = jurusan.id;',
                'SELECT nama, nama_jurusan FROM siswa, jurusan WHERE nama = nama_jurusan;',
                'SELECT siswa.nama, jurusan.nama_jurusan FROM siswa ON jurusan;'
            ],
            benar: 0,
            bahas: 'Kolom penghubungnya id_jurusan di tabel siswa dengan id di tabel jurusan, ditulis setelah ON.'
        }
    );
})();
