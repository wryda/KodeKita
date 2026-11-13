/* 
   KodeKita - data isi.
   Tambah materi baru dengan menyalin satu objek di LESSONS.
   Tiap bab: id unik, topik (html/css/js/php/sql), judul, gambar + alt (ilustrasi), teks (daftar paragraf),
   kode (contoh), coba (opsional: kode yang dikirim ke playground bila berbeda dari contoh),
   dan hasil (khusus php/sql: keluaran contoh, karena keduanya tidak jalan di playground).
*/

const TOPIK = {
    html: 'HTML',
    css: 'CSS',
    js: 'JavaScript',
    php: 'PHP',
    sql: 'SQL'
};

/* Logo tiap bahasa (file di assets/logo/). */

const LOGO = {
    html: 'assets/logo/html.svg',
    css: 'assets/logo/css.svg',
    js: 'assets/logo/js.svg',
    php: 'assets/logo/php.svg',
    sql: 'assets/logo/sql.svg'
};

/* Video pembelajaran per topik.
   embed  : alamat embed YouTube (video: /embed/ID, daftar putar: /embed/videoseries?list=ID)
   tonton : tautan biasa, dipakai sebagai cadangan bila video tidak bisa dimuat
   Ganti dengan video pilihan guru kapan saja; isi '' pada embed untuk menyembunyikan video. */

const VIDEO = {
    html: {
        judul: 'Tutorial HTML Dasar (Bahasa Indonesia) - Programmer Zaman Now',
        embed: 'https://www.youtube-nocookie.com/embed/videoseries?list=PLFIM0718LjIX-K5eeHRImnZhPUMhsw9A7',
        tonton: 'https://www.youtube.com/playlist?list=PLFIM0718LjIX-K5eeHRImnZhPUMhsw9A7'
    },
    css: {
        judul: 'Tutorial CSS Dasar (Bahasa Indonesia) - Programmer Zaman Now',
        embed: 'https://www.youtube-nocookie.com/embed/videoseries?list=PLFIM0718LjIVCmrSWbZPKCccCkfFw-Naa',
        tonton: 'https://www.youtube.com/playlist?list=PLFIM0718LjIVCmrSWbZPKCccCkfFw-Naa'
    },
    js: {
        judul: 'Tutorial JavaScript Dasar (Bahasa Indonesia) - Programmer Zaman Now',
        embed: 'https://www.youtube-nocookie.com/embed/videoseries?list=PLFIM0718LjIWXagluzROrA-iBY9eeUt4w',
        tonton: 'https://www.youtube.com/playlist?list=PLFIM0718LjIWXagluzROrA-iBY9eeUt4w'
    },
    php: {
        judul: 'Belajar PHP untuk Pemula - Markaz Virtual',
        embed: 'https://www.youtube-nocookie.com/embed/videoseries?list=PLf1dkXeTFf6mdVpgLqw8KMoVcLjYuHwdF',
        tonton: 'https://www.youtube.com/playlist?list=PLf1dkXeTFf6mdVpgLqw8KMoVcLjYuHwdF'
    },
    sql: {
        judul: 'Tutorial MySQL Database (Bahasa Indonesia) - Programmer Zaman Now',
        embed: 'https://www.youtube-nocookie.com/embed/xYBclb-sYQ4',
        tonton: 'https://www.youtube.com/watch?v=xYBclb-sYQ4'
    }
};

const LESSONS = [
    /* ---------- HTML ---------- */

    {
        id: 'html-struktur',
        topik: 'html',
        judul: 'HTML: struktur dasar dokumen',
        gambar: 'assets/img/html-struktur.svg',
        alt: 'Pohon dokumen HTML: html berisi head dan body',
        teks: [
            'Setiap halaman web punya kerangka yang sama. <code>&lt;!DOCTYPE html&gt;</code> memberi tahu peramban bahwa ini HTML modern, dan <code>&lt;html lang="id"&gt;</code> membungkus seluruh halaman sambil menyebut bahasanya.',
            'Di dalamnya ada dua bagian. <code>&lt;head&gt;</code> berisi keterangan yang tidak tampil di halaman, seperti <code>&lt;title&gt;</code> (nama tab) dan <code>&lt;meta charset="UTF-8"&gt;</code> (agar huruf dan simbol terbaca benar). <code>&lt;body&gt;</code> berisi semua yang dilihat pengunjung.',
            'Di playground, kerangka ini sudah disediakan, jadi kamu cukup menulis isi <code>&lt;body&gt;</code>.'
        ],
        kode: {
            html: '<!DOCTYPE html>\n<html lang="id">\n<head>\n  <meta charset="UTF-8">\n  <title>Halaman Pertamaku</title>\n</head>\n<body>\n  <h1>Halo, dunia!</h1>\n  <p>Ini isi halaman yang tampil di layar.</p>\n</body>\n</html>',
            css: '',
            js: ''
        },
        coba: {
            html: '<h1>Halo, dunia!</h1>\n<p>Ini isi halaman yang tampil di layar.</p>',
            css: '',
            js: ''
        }
    },

    {
        id: 'html-teks',
        topik: 'html',
        judul: 'HTML: judul, daftar, dan tautan',
        gambar: 'assets/img/html-teks.svg',
        alt: 'Bagian-bagian elemen HTML: tag pembuka, atribut, isi, tag penutup',
        teks: [
            'HTML adalah rangka halaman web. Kamu menandai tiap bagian dengan tag: <code>&lt;h1&gt;</code> untuk judul, <code>&lt;p&gt;</code> untuk paragraf, dan <code>&lt;a&gt;</code> untuk tautan.',
            'Kebanyakan tag berpasangan. Tag pembuka <code>&lt;p&gt;</code> bertemu tag penutup <code>&lt;/p&gt;</code>. Keterangan tambahan ditulis sebagai atribut, misalnya <code>href</code> pada tautan.',
            'Gunakan <code>&lt;ul&gt;</code> untuk daftar bertitik dan <code>&lt;ol&gt;</code> untuk daftar bernomor. Setiap butirnya ditulis dalam <code>&lt;li&gt;</code>.'
        ],
        kode: {
            html: '<h1>Profil Saya</h1>\n<p>Aku siswa kelas X.</p>\n<ul>\n  <li>Hobi: bermain gitar</li>\n  <li>Cita-cita: pembuat aplikasi</li>\n</ul>\n<a href="https://id.wikipedia.org">Baca Wikipedia</a>',
            css: '',
            js: ''
        }
    },

    {
        id: 'html-formulir',
        topik: 'html',
        judul: 'HTML: formulir isian',
        gambar: 'assets/img/html-formulir.svg',
        alt: 'Contoh formulir dengan label, input, select, dan tombol',
        teks: [
            'Formulir mengumpulkan data dari pengunjung. Setiap kolom isian memakai <code>&lt;input&gt;</code>; jenisnya diatur lewat atribut <code>type</code>, misalnya <code>text</code>, <code>email</code>, atau <code>number</code>.',
            'Pasangkan setiap kolom dengan <code>&lt;label&gt;</code>. Atribut <code>for</code> pada label harus sama dengan <code>id</code> kolomnya, sehingga mengetuk label ikut memilih kolom dan pembaca layar bisa membacakannya.',
            'Pilihan tetap ditulis dengan <code>&lt;select&gt;</code> dan <code>&lt;option&gt;</code>, sedangkan tombol memakai <code>&lt;button&gt;</code>.'
        ],
        kode: {
            html: '<form>\n  <label for="nama">Nama</label>\n  <input id="nama" type="text" placeholder="Nama lengkap">\n  <label for="kelas">Kelas</label>\n  <select id="kelas">\n    <option>X</option>\n    <option>XI</option>\n    <option>XII</option>\n  </select>\n  <button type="button">Kirim</button>\n</form>',
            css: 'label, input, select {\n  display: block;\n  margin: 6px 0;\n}',
            js: ''
        }
    },

    /* ---------- CSS ---------- */

    {
        id: 'css-selector',
        topik: 'css',
        judul: 'CSS: selector dan properti',
        gambar: 'assets/img/css-selector.svg',
        alt: 'Aturan CSS: selector, properti, dan nilai',
        teks: [
            'CSS mengatur warna, ukuran, dan tata letak. Satu aturan CSS terdiri dari selector (siapa yang diubah), properti (apa yang diubah), dan nilai (menjadi apa).',
            'Selector <code>.judul</code> memilih elemen yang punya <code>class="judul"</code>. Selector <code>p</code> memilih semua paragraf. Ubah angkanya di playground dan lihat bedanya.'
        ],
        kode: {
            html: '<h1 class="judul">Selamat datang</h1>\n<p>CSS mengatur tampilan halaman.</p>',
            css: '.judul {\n  color: #0E6B63;\n  border-bottom: 3px solid #F0B90B;\n  padding-bottom: 4px;\n}\np {\n  font-size: 18px;\n}',
            js: ''
        }
    },

    {
        id: 'css-kotak',
        topik: 'css',
        judul: 'CSS: margin, padding, dan border',
        gambar: 'assets/img/css-kotak.svg',
        alt: 'Model kotak CSS: margin, border, padding, dan isi',
        teks: [
            'Setiap elemen HTML adalah kotak. Dari dalam ke luar: isi, <code>padding</code> (ruang di antara isi dan garis tepi), <code>border</code> (garis tepi), dan <code>margin</code> (jarak ke elemen lain).',
            'Contoh: <code>padding: 16px</code> memberi ruang 16 piksel di keempat sisi. Kamu juga bisa menulis sisi tertentu, misalnya <code>margin-top</code> atau <code>padding-left</code>.',
            'Ubah angka padding dan margin di playground, lalu amati kotaknya melebar atau bergeser.'
        ],
        kode: {
            html: '<div class="kotak">Ini sebuah kotak</div>',
            css: '.kotak {\n  width: 220px;\n  padding: 16px;\n  border: 3px solid #0E6B63;\n  margin: 20px;\n  background: #F0B90B;\n}',
            js: ''
        }
    },

    {
        id: 'css-flex',
        topik: 'css',
        judul: 'CSS: tata letak dengan flexbox',
        gambar: 'assets/img/css-flex.svg',
        alt: 'Flexbox: tiga kotak berjajar dalam satu baris',
        teks: [
            'Flexbox menyusun elemen dalam satu baris atau kolom. Beri <code>display: flex</code> pada wadah, dan anak-anaknya otomatis berjajar.',
            '<code>gap</code> mengatur jarak antaranya. <code>justify-content</code> mengatur penyebaran sepanjang baris, misalnya <code>space-between</code> atau <code>center</code>. <code>align-items</code> mengatur posisi tegak.',
            'Untuk mengubah arah menjadi kolom, tambahkan <code>flex-direction: column</code>.'
        ],
        kode: {
            html: '<div class="baris">\n  <div>Satu</div>\n  <div>Dua</div>\n  <div>Tiga</div>\n</div>',
            css: '.baris {\n  display: flex;\n  gap: 12px;\n  justify-content: space-between;\n}\n.baris div {\n  background: #0E6B63;\n  color: #fff;\n  padding: 16px;\n}',
            js: ''
        }
    },

    /* ---------- JavaScript ---------- */

    {
        id: 'js-variabel',
        topik: 'js',
        judul: 'JavaScript: variabel dan klik tombol',
        gambar: 'assets/img/js-variabel.svg',
        alt: 'Alur klik tombol: onclick mengubah variabel lalu memperbarui halaman',
        teks: [
            'JavaScript membuat halaman bereaksi pada aksi pengguna. Data disimpan dalam variabel: <code>let</code> untuk nilai yang bisa berubah, <code>const</code> untuk nilai yang tetap.',
            'Untuk mengubah halaman, pilih elemen dengan <code>document.getElementById</code>, lalu pasang aksi pada <code>onclick</code>. Di contoh ini, setiap klik menambah angka satu.'
        ],
        kode: {
            html: '<p>Hitungan: <strong id="angka">0</strong></p>\n<button id="tambah">Tambah satu</button>',
            css: '',
            js: 'const angka = document.getElementById("angka");\nlet nilai = 0;\n\ndocument.getElementById("tambah").onclick = function () {\n  nilai = nilai + 1;\n  angka.textContent = nilai;\n};'
        }
    },

    {
        id: 'js-fungsi',
        topik: 'js',
        judul: 'JavaScript: percabangan dan fungsi',
        gambar: 'assets/img/js-fungsi.svg',
        alt: 'Fungsi cekNilai: percabangan menghasilkan Lulus atau Belum lulus',
        teks: [
            'Percabangan memilih jalan berdasarkan syarat. Jika syarat di dalam <code>if</code> benar, blok pertama berjalan; jika tidak, blok <code>else</code> yang berjalan.',
            'Fungsi adalah potongan kode bernama yang bisa dipakai berulang. Pada contoh, <code>cekNilai</code> menerima angka dan mengembalikan teks dengan <code>return</code>.',
            'Operator pembanding yang sering dipakai: <code>&gt;=</code> (lebih besar atau sama), <code>===</code> (sama persis), dan <code>!==</code> (tidak sama).'
        ],
        kode: {
            html: '<input id="nilai" type="number" placeholder="Nilai (0-100)">\n<button id="cek">Cek kelulusan</button>\n<p id="hasil"></p>',
            css: '',
            js: 'function cekNilai(n) {\n  if (n >= 75) {\n    return "Lulus";\n  } else {\n    return "Belum lulus";\n  }\n}\n\ndocument.getElementById("cek").onclick = function () {\n  const n = Number(document.getElementById("nilai").value);\n  document.getElementById("hasil").textContent = cekNilai(n);\n};'
        }
    },

    {
        id: 'js-array',
        topik: 'js',
        judul: 'JavaScript: array dan perulangan',
        gambar: 'assets/img/js-array.svg',
        alt: 'Array berisi tiga bahasa diproses forEach menjadi daftar',
        teks: [
            'Array menyimpan banyak nilai dalam satu variabel, ditulis dengan kurung siku: <code>["HTML", "CSS"]</code>. Nilai pertama ada di urutan 0, jadi <code>bahasa[0]</code> adalah "HTML".',
            '<code>forEach</code> menjalankan fungsi untuk setiap isi array. Di contoh, tiap nama dibuatkan elemen <code>&lt;li&gt;</code> baru lewat <code>document.createElement</code>, lalu ditempel ke daftar.',
            'Gunakan <code>textContent</code>, bukan <code>innerHTML</code>, bila teksnya berasal dari pengguna, supaya kode asing tidak ikut dijalankan.'
        ],
        kode: {
            html: '<ul id="daftar"></ul>',
            css: '',
            js: 'const bahasa = ["HTML", "CSS", "JavaScript"];\nconst daftar = document.getElementById("daftar");\n\nbahasa.forEach(function (nama) {\n  const li = document.createElement("li");\n  li.textContent = nama;\n  daftar.append(li);\n});'
        }
    },

    /* ---------- PHP ---------- */
    /* PHP dan SQL berjalan di server/database, jadi tidak ada tombol playground.
       Pakai kode.php / kode.sql untuk contoh, dan hasil untuk keluaran yang tampil. */

    {
        id: 'php-dasar',
        topik: 'php',
        judul: 'PHP: dasar dan variabel',
        gambar: 'assets/img/php-dasar.svg',
        alt: 'Alur PHP: peramban meminta halaman, server menjalankan PHP, peramban menerima HTML',
        teks: [
            'PHP berjalan di server, bukan di peramban. Pengunjung hanya menerima hasilnya berupa HTML biasa, sehingga kode PHP-mu tidak pernah terlihat olehnya.',
            'Kode PHP ditulis di antara <code>&lt;?php</code> dan <code>?&gt;</code>, dan setiap perintah diakhiri titik koma. Variabel selalu diawali tanda <code>$</code>, misalnya <code>$nama</code>.',
            '<code>echo</code> menampilkan teks. Tanda titik <code>.</code> menyambung teks, dan di dalam tanda kutip ganda nama variabel langsung diganti dengan isinya.'
        ],
        kode: {
            php: '<?php\n$nama = "Sari";\n$umur = 16;\n\necho "Halo, " . $nama . "!<br>";\necho "Umurmu $umur tahun.";\n?>'
        },
        hasil: 'Halo, Sari!\nUmurmu 16 tahun.'
    },

    {
        id: 'php-array',
        topik: 'php',
        judul: 'PHP: percabangan, array, dan perulangan',
        gambar: 'assets/img/php-array.svg',
        alt: 'Array PHP diproses foreach menjadi daftar',
        teks: [
            'Percabangan di PHP sama seperti di JavaScript: bila syarat di dalam <code>if</code> benar, blok pertama berjalan, bila tidak maka blok <code>else</code>.',
            'Array menyimpan banyak nilai dalam satu variabel dan ditulis dengan kurung siku. Indeks pertamanya 0, jadi <code>$bahasa[0]</code> berisi \"HTML\".',
            '<code>foreach</code> mengulang kode untuk setiap isi array. Pada contoh, <code>$b</code> berisi satu nama bahasa di setiap putaran.'
        ],
        kode: {
            php: '<?php\n$nilai = 82;\n\nif ($nilai >= 75) {\n  echo "Lulus<br>";\n} else {\n  echo "Belum lulus<br>";\n}\n\n$bahasa = ["HTML", "CSS", "PHP"];\n\nforeach ($bahasa as $b) {\n  echo "- $b<br>";\n}\n?>'
        },
        hasil: 'Lulus\n- HTML\n- CSS\n- PHP'
    },

    {
        id: 'php-formulir',
        topik: 'php',
        judul: 'PHP: membaca isian formulir',
        gambar: 'assets/img/php-formulir.svg',
        alt: 'Alur formulir PHP: data dikirim dengan POST, dibaca lewat $_POST, lalu ditampilkan',
        teks: [
            'Formulir HTML dengan <code>method=\"post\"</code> mengirim isiannya ke server. Di PHP, data itu dibaca lewat <code>$_POST[\"nama\"]</code>, dengan \"nama\" sesuai atribut <code>name</code> pada input.',
            '<code>$_SERVER[\"REQUEST_METHOD\"]</code> dipakai untuk mengecek apakah formulir sudah dikirim. Tanpa pengecekan ini, kodenya berjalan juga saat halaman baru dibuka.',
            'Bungkus data dari pengguna dengan <code>htmlspecialchars()</code> sebelum ditampilkan, supaya kode asing yang diketik pengunjung tidak ikut dijalankan.'
        ],
        kode: {
            php: '<form method="post">\n  <input name="nama" placeholder="Nama">\n  <button type="submit">Kirim</button>\n</form>\n\n<?php\nif ($_SERVER["REQUEST_METHOD"] === "POST") {\n  $nama = htmlspecialchars($_POST["nama"]);\n  echo "Halo, $nama!";\n}\n?>'
        },
        hasil: 'Setelah mengetik \"Sari\" lalu menekan Kirim:\nHalo, Sari!'
    },

    /* ---------- SQL ---------- */

    {
        id: 'sql-dasar',
        topik: 'sql',
        judul: 'SQL: tabel dan data (CREATE, INSERT)',
        gambar: 'assets/img/sql-dasar.svg',
        alt: 'Tabel siswa dengan kolom id, nama, kelas, dan nilai',
        teks: [
            'Database menyimpan data dalam tabel. Kolom (field) menentukan jenis data, dan setiap baris (record) adalah satu data lengkap, misalnya satu siswa.',
            '<code>CREATE TABLE</code> membuat kerangka tabel. Tiap kolom diberi tipe, seperti <code>INT</code> untuk angka bulat dan <code>VARCHAR(50)</code> untuk teks sampai 50 huruf. <code>PRIMARY KEY</code> menandai kolom yang nilainya unik di setiap baris.',
            '<code>INSERT INTO</code> menambahkan baris. Teks ditulis dengan tanda kutip tunggal, angka tanpa kutip.'
        ],
        kode: {
            sql: 'CREATE TABLE siswa (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  nama VARCHAR(50) NOT NULL,\n  kelas VARCHAR(5),\n  nilai INT\n);\n\nINSERT INTO siswa (nama, kelas, nilai) VALUES\n  (\'Sari\', \'X\', 88),\n  (\'Budi\', \'XI\', 72),\n  (\'Dewi\', \'X\', 95);'
        },
        hasil: 'id | nama | kelas | nilai\n 1 | Sari | X     | 88\n 2 | Budi | XI    | 72\n 3 | Dewi | X     | 95'
    },

    {
        id: 'sql-select',
        topik: 'sql',
        judul: 'SQL: membaca data (SELECT)',
        gambar: 'assets/img/sql-select.svg',
        alt: 'SELECT dengan WHERE memilih baris yang sesuai syarat lalu mengurutkannya',
        teks: [
            '<code>SELECT</code> memilih kolom yang ingin ditampilkan, dan <code>FROM</code> menyebut tabelnya. Tanda <code>*</code> berarti semua kolom.',
            '<code>WHERE</code> menyaring baris berdasarkan syarat. Gabungkan beberapa syarat dengan <code>AND</code> (semuanya harus benar) atau <code>OR</code> (salah satu benar).',
            '<code>ORDER BY</code> mengurutkan hasil: <code>ASC</code> dari kecil ke besar, <code>DESC</code> dari besar ke kecil.'
        ],
        kode: {
            sql: 'SELECT nama, nilai\nFROM siswa\nWHERE kelas = \'X\' AND nilai >= 75\nORDER BY nilai DESC;'
        },
        hasil: 'nama | nilai\nDewi | 95\nSari | 88'
    },

    {
        id: 'sql-ubah',
        topik: 'sql',
        judul: 'SQL: mengubah dan menghapus (UPDATE, DELETE)',
        gambar: 'assets/img/sql-ubah.svg',
        alt: 'UPDATE mengubah satu baris dan DELETE menghapus satu baris dengan syarat WHERE',
        teks: [
            '<code>UPDATE</code> mengubah isi baris yang sudah ada, dan <code>DELETE</code> menghapus baris. Keduanya hampir selalu ditulis bersama <code>WHERE</code>.',
            'Tanpa <code>WHERE</code>, perintahnya mengenai semua baris di tabel. <code>UPDATE siswa SET nilai = 80</code> akan membuat semua siswa bernilai 80, dan <code>DELETE FROM siswa</code> mengosongkan seluruh tabel.',
            'Biasakan menulis <code>SELECT</code> dengan syarat yang sama dulu untuk memeriksa baris mana yang akan terkena.'
        ],
        kode: {
            sql: 'UPDATE siswa\nSET nilai = 80\nWHERE nama = \'Budi\';\n\nDELETE FROM siswa\nWHERE id = 3;'
        },
        hasil: 'id | nama | kelas | nilai\n 1 | Sari | X     | 88\n 2 | Budi | XI    | 80'
    },

    {
        id: 'sql-join',
        topik: 'sql',
        judul: 'SQL: menggabungkan tabel (JOIN)',
        gambar: 'assets/img/sql-join.svg',
        alt: 'JOIN menggabungkan tabel siswa dan jurusan lewat id_jurusan',
        teks: [
            'Data yang saling berkaitan sebaiknya disimpan di tabel terpisah. Tabel <code>siswa</code> cukup menyimpan <code>id_jurusan</code>, sedangkan nama jurusannya ada di tabel <code>jurusan</code>.',
            '<code>JOIN</code> menggabungkan dua tabel saat ditampilkan. Kolom penghubungnya ditulis setelah <code>ON</code>: baris digabung bila nilai kedua kolom itu sama.',
            'Awali nama kolom dengan nama tabelnya, misalnya <code>siswa.nama</code>, agar jelas kolom milik tabel yang mana.'
        ],
        kode: {
            sql: 'SELECT siswa.nama, jurusan.nama_jurusan\nFROM siswa\nJOIN jurusan\n  ON siswa.id_jurusan = jurusan.id;'
        },
        hasil: 'nama | nama_jurusan\nSari | RPL\nBudi | TKJ\nDewi | RPL'
    }
];

/* ---------- Kuis, tantangan, dan contoh beranda ---------- */

const QUIZ = [
    {
        t: 'Tag HTML mana yang dipakai untuk judul terbesar di halaman?',
        o: ['<h1>', '<title>', '<header>', '<big>'],
        a: 0,
        b: '<h1> adalah judul tingkat pertama. <title> hanya muncul di tab peramban, dan <header> adalah pembungkus kepala halaman.'
    },
    {
        t: 'Atribut apa yang menyimpan alamat tujuan pada tag <code>&lt;a&gt;</code>?',
        o: ['src', 'href', 'link', 'target'],
        a: 1,
        b: 'href (hypertext reference) berisi alamat tujuan. src dipakai untuk gambar dan skrip, bukan tautan.'
    },
    {
        t: 'Bagaimana menulis selector CSS untuk elemen ber-class "kartu"?',
        o: ['#kartu', '*kartu', '.kartu', '@kartu'],
        a: 2,
        b: 'Class diawali titik. Tanda # dipakai untuk id, dan tanda * memilih semua elemen.'
    },
    {
        t: 'Properti CSS mana yang mengubah warna latar sebuah elemen?',
        o: ['color', 'fill', 'bg', 'background-color'],
        a: 3,
        b: 'background-color mengatur warna latar. Properti color hanya mengubah warna teks.'
    },
    {
        t: 'Kata kunci mana yang cocok untuk nilai yang tidak akan diberi nilai baru?',
        o: ['let', 'const', 'if', 'new'],
        a: 1,
        b: 'const membuat variabel tetap. Memberi nilai baru pada const akan menimbulkan galat.'
    },
    {
        t: 'Apa yang dilakukan <code>document.querySelector("#judul")</code>?',
        o: [
            'Membuat elemen baru bernama judul',
            'Menghapus elemen judul',
            'Memilih elemen yang ber-id judul',
            'Mengubah warna judul'
        ],
        a: 2,
        b: 'querySelector memilih elemen pertama yang cocok dengan selector. Tanda # berarti id.'
    },
    {
        t: 'Properti CSS mana yang mengatur jarak di luar batas elemen?',
        o: ['padding', 'margin', 'border', 'gap'],
        a: 1,
        b: 'margin adalah jarak di luar border. padding adalah ruang di dalam border, antara isi dan garis tepi.'
    },
    {
        t: 'Deklarasi mana yang mengubah sebuah wadah menjadi tata letak flexbox?',
        o: [
            'display: flex;',
            'position: flex;',
            'flex: wrap;',
            'layout: flex;'
        ],
        a: 0,
        b: 'Flexbox aktif ketika wadah diberi display: flex. Anak-anaknya lalu tersusun sebaris dan bisa diatur dengan justify-content dan gap.'
    },
    {
        t: 'Apa fungsi <code>forEach</code> pada sebuah array?',
        o: [
            'Menghapus semua isi array',
            'Menjalankan fungsi untuk setiap isi array',
            'Mengurutkan isi array',
            'Menghitung jumlah isi array'
        ],
        a: 1,
        b: 'forEach memanggil fungsi sekali untuk setiap elemen array, cocok untuk membuat daftar di halaman.'
    },
    {
        t: 'Tanda apa yang selalu mengawali nama variabel di PHP?',
        o: ['$', '@', '#', '&'],
        a: 0,
        b: 'Variabel PHP diawali tanda dolar, misalnya $nama. Tanpa tanda itu, PHP menganggapnya bukan variabel.'
    },
    {
        t: 'Variabel superglobal mana yang menyimpan isian formulir ber-<code>method=\"post\"</code>?',
        o: ['$_GET', '$_POST', '$_FORM', '$_DATA'],
        a: 1,
        b: '$_POST berisi data yang dikirim lewat method post. $_GET berisi data dari alamat URL, sedangkan $_FORM dan $_DATA tidak ada di PHP.'
    },
    {
        t: 'Perintah SQL mana yang dipakai untuk membaca data dari tabel?',
        o: ['GET', 'SELECT', 'READ', 'FETCH'],
        a: 1,
        b: 'SELECT memilih kolom yang ditampilkan, dipasangkan dengan FROM untuk menyebut tabelnya.'
    },
    {
        t: 'Apa yang terjadi bila <code>UPDATE siswa SET nilai = 80;</code> dijalankan tanpa WHERE?',
        o: [
            'Hanya baris pertama yang berubah',
            'Semua baris di tabel berubah',
            'Perintah ditolak karena tidak lengkap',
            'Tabel siswa dihapus'
        ],
        a: 1,
        b: 'Tanpa WHERE, UPDATE mengenai semua baris. Karena itu selalu tambahkan syarat, dan periksa dulu dengan SELECT.'
    }
];

const CH = [
    {
        id: 'c1',
        judul: 'HTML: profil singkat',
        pet: 'Di tab HTML, tulis satu judul <code>&lt;h1&gt;</code> berisi namamu, satu daftar <code>&lt;ul&gt;</code> dengan minimal dua <code>&lt;li&gt;</code> (hobimu), dan satu tautan <code>&lt;a&gt;</code> yang punya <code>href</code>.',

        mulai: {
            html: '<!-- Tulis profil singkatmu di sini -->',
            css: '',
            js: ''
        },

        uji: () => {
            const d = document;
            const h = d.querySelector('h1');
            const a = d.querySelector('a[href]');

            return [
                [
                    'Ada <h1> yang berisi teks',
                    !!h && h.textContent.trim().length > 0
                ],
                [
                    'Ada <ul> dengan minimal 2 <li>',
                    d.querySelectorAll('ul li').length >= 2
                ],
                [
                    'Ada <a> dengan atribut href',
                    !!a && a.getAttribute('href').length > 0
                ]
            ];
        }
    },

    {
        id: 'c2',
        judul: 'CSS: gaya tombol',
        pet: 'Di tab CSS, beri gaya pada selector <code>.tombol</code>: warna latar, sudut membulat minimal 6px, dan padding kiri minimal 12px.',

        mulai: {
            html: '<button class="tombol">Daftar sekarang</button>',
            css: '.tombol {\n  /* tulis aturanmu di sini */\n}',
            js: ''
        },

        uji: () => {
            const b = document.querySelector('.tombol');

            if (!b) {
                return [
                    ['Elemen .tombol masih ada di HTML', false]
                ];
            }

            const s = getComputedStyle(b);
            const g = s.backgroundColor;

            return [
                [
                    'Warna latar diubah (background-color)',
                    ['rgba(0, 0, 0, 0)', 'rgb(239, 239, 239)', 'rgb(233, 233, 237)'].indexOf(g) < 0
                ],
                [
                    'Sudut membulat (border-radius minimal 6px)',
                    parseFloat(s.borderTopLeftRadius) >= 6
                ],
                [
                    'Padding kiri minimal 12px',
                    parseFloat(s.paddingLeft) >= 12
                ]
            ];
        }
    },

    {
        id: 'c3',
        judul: 'JavaScript: penghitung klik',
        pet: 'Di tab JavaScript, buat tombol <code>#hitung</code> menambah angka pada <code>#angka</code> setiap kali diklik. Petunjuk: pakai <code>onclick</code> lalu ubah <code>textContent</code>.',

        mulai: {
            html: '<p>Hitungan: <strong id="angka">0</strong></p>\n<button id="hitung">Tambah satu</button>',
            css: '',
            js: '// Tulis kodemu di sini\n'
        },

        uji: () => {
            const b = document.getElementById('hitung');
            const n = document.getElementById('angka');

            if (!b || !n) {
                return [
                    ['Elemen #hitung dan #angka masih ada', false]
                ];
            }

            n.textContent = '0';

            b.click();

            const a = n.textContent.trim();

            b.click();
            b.click();

            return [
                [
                    'Satu klik mengubah angka menjadi 1',
                    a === '1'
                ],
                [
                    'Tiga klik menghasilkan angka 3',
                    n.textContent.trim() === '3'
                ]
            ];
        }
    }
];

const HERO = {
    html: '<div class="kartu-sapa">\n  <h1>Halo, KodeKita!</h1>\n  <p id="pesan">Ubah teks ini, lalu lihat hasilnya.</p>\n  <button id="sapa">Sapa saya</button>\n</div>',

    css: '.kartu-sapa {\n  padding: 20px;\n  border-radius: 12px;\n  background: #f3f8f7;\n  border-left: 6px solid #087f70;\n}\n\nh1 {\n  margin: 0 0 8px;\n  color: #0E6B63;\n}\n\nbutton {\n  padding: 8px 16px;\n  border: 0;\n  border-radius: 8px;\n  background: #087f70;\n  color: #fff;\n  cursor: pointer;\n}',

    js: 'const pesan = document.getElementById("pesan");\n\ndocument.getElementById("sapa").onclick = function () {\n  pesan.textContent = "Halo juga! Kodemu berjalan.";\n};'
};

window.KODEKITA = {
    TOPIK,
    LOGO,
    VIDEO,
    LESSONS,
    QUIZ,
    CH,
    HERO
};