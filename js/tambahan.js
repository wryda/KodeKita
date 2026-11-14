/* KodeKita - Tambahan: mode gelap serta ekspor dan impor progres. */

(() => {
    'use strict';

    const { $, el, store, toast, S, simpan } = window.KK;
    const KK = window.KK;
    const { LESSONS, QUIZ, CH } = window.KODEKITA;

    /* ===== Mode gelap ===== */

    const root = document.documentElement;
    const tombol = $('#tema');

    const tandai = () => {
        const gelap = root.dataset.tema === 'gelap';
        const aksi = gelap ? 'Ganti ke mode terang' : 'Ganti ke mode gelap';

        tombol.setAttribute('aria-pressed', String(gelap));
        tombol.setAttribute('aria-label', aksi);
        tombol.title = aksi;
    };

    tombol.onclick = () => {
        root.dataset.tema = root.dataset.tema === 'gelap' ? 'terang' : 'gelap';
        store.set('kodekita.tema', root.dataset.tema);
        tandai();
    };

    tandai();

    /* Menu atas di HP: tautan halaman aktif digeser ke tengah supaya tidak terpotong */

    const tengahkan = () => {
        const a = $('.atas nav a[aria-current="page"]');

        if (a) a.scrollIntoView({ inline: 'center', block: 'nearest' });
    };

    KK.onRute.push(() => setTimeout(tengahkan, 0));

    /* ===== Ekspor dan impor progres (di halaman Profil) ===== */

    const wadah = $('#v-profil .profil-container');

    if (!wadah) return;

    const kotak = el('div', 'kotak');

    kotak.id = 'profil-cadangan';

    const baris = el('div', 'baris');
    const ek = el('button', 'btn', 'Ekspor progres');
    const im = el('button', 'btn u', 'Impor progres');
    const f = el('input');

    ek.type = im.type = 'button';
    f.type = 'file';
    f.accept = 'application/json,.json';
    f.hidden = true;
    f.setAttribute('aria-label', 'Pilih file cadangan progres');

    baris.append(ek, im, f);

    kotak.append(
        el('h3', '', 'Cadangan progres'),
        el(
            'p',
            'catatan',
            'Unduh progresmu sebagai file, atau pulihkan dari file cadangan. Berguna saat pindah perangkat.'
        ),
        baris
    );

    wadah.append(kotak);

    ek.onclick = () => {
        const data = {
            app: 'kodekita',
            versi: 1,
            nama: S.user.nama,
            email: S.user.email,
            waktu: new Date().toISOString(),
            progres: S.prog
        };

        const url = URL.createObjectURL(
            new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        );

        const a = el('a');

        a.href = url;
        a.download = 'progres-kodekita.json';

        document.body.append(a);
        a.click();
        a.remove();

        setTimeout(() => URL.revokeObjectURL(url), 1000);
    };

    im.onclick = () => f.click();

    /* Hanya terima data yang dikenal, supaya file buatan tangan tidak merusak progres */

    const bersih = p => {
        const ada = (o, ids) => Object.fromEntries(
            ids.filter(i => o && o[i] === true).map(i => [i, true])
        );

        const nilai = v => Number.isInteger(v) && v >= 0 && v <= QUIZ.length ? v : null;
        const k = p.kuis || {};

        return {
            baca: ada(p.baca, LESSONS.map(x => x.id)),
            tantangan: ada(p.tantangan, CH.map(x => x.id)),
            kuis: { terbaik: nilai(k.terbaik), terakhir: nilai(k.terakhir) }
        };
    };

    const maks = (x, y) => x == null ? y : y == null ? x : Math.max(x, y);

    f.onchange = async () => {
        const berkas = f.files[0];

        f.value = '';

        if (!berkas) return;

        try {
            if (berkas.size > 100000) throw new Error('terlalu besar');

            const d = JSON.parse(await berkas.text());

            if (d.app !== 'kodekita' || !d.progres) throw new Error('bukan file KodeKita');

            const b = bersih(d.progres);

            S.prog.baca = { ...S.prog.baca, ...b.baca };
            S.prog.tantangan = { ...S.prog.tantangan, ...b.tantangan };
            S.prog.kuis.terbaik = maks(S.prog.kuis.terbaik, b.kuis.terbaik);
            S.prog.kuis.terakhir = b.kuis.terakhir ?? S.prog.kuis.terakhir;

            simpan();
            toast('Progres berhasil dipulihkan.');
        } catch (e) {
            toast('File tidak valid. Pilih file hasil ekspor KodeKita.');
        }
    };

    KK.render.push(() => { kotak.hidden = !S.user; });
})();
