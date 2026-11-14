/* KodeKita - Halaman Materi. */

(() => {
    'use strict';

    const { $, $$, el, store, toast, S, simpan, keplay, buka } = window.KK;
    const KK = window.KK;
    const { TOPIK, LOGO, VIDEO, LESSONS, QUIZ, CH, HERO } = window.KODEKITA;

    /* ===== Materi ===== */

    let topik = 'html-struktur';
    let bicara = false;

    const stopSuara = () => {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }

        bicara = false;
    };

    function renderMateri() {
        const d = $('#daftar-materi');
        d.replaceChildren();

        let grup = '';

        LESSONS.forEach(L => {
            if (L.topik !== grup) {
                grup = L.topik;
                const g = el('p', 'grup');
                const lg = el('img', 'logo-grup');

                lg.src = LOGO[grup];
                lg.alt = '';
                lg.width = 20;
                lg.height = 20;

                g.append(lg, document.createTextNode(TOPIK[grup]));
                d.append(g);
            }

            const b = el('button', '', L.judul);

            b.type = 'button';
            b.setAttribute('aria-current', String(L.id === topik));

            if (S.user) {
                const s = el(
                    'small',
                    '',
                    S.prog.baca[L.id] ? 'Sudah dibaca' : 'Belum dibaca'
                );

                b.append(s);
            }

            b.onclick = () => {
                stopSuara();
                topik = L.id;
                renderMateri();
            };

            d.append(b);
        });

        const L = LESSONS.find(x => x.id === topik);
        const a = $('#isi-materi');

        a.replaceChildren();

        const kepala = el('div', 'kepala-materi');
        const lgm = el('img', 'logo-materi');

        lgm.src = LOGO[L.topik];
        lgm.alt = 'Logo ' + TOPIK[L.topik];
        lgm.width = 44;
        lgm.height = 44;

        kepala.append(lgm, el('h3', '', L.judul));
        a.append(kepala);

        if (L.gambar) {
            const fg = el('figure', 'gambar');
            const im = el('img');

            im.src = L.gambar;
            im.alt = L.alt || L.judul;
            im.loading = 'lazy';

            fg.append(im);

            if (L.alt) fg.append(el('figcaption', '', L.alt));

            a.append(fg);
        }

        L.teks.forEach(x => {
            const p = el('p');
            p.innerHTML = x;
            a.append(p);
        });

        const nm = {
            html: 'index.html',
            css: 'style.css',
            js: 'script.js',
            php: 'index.php',
            sql: 'query.sql'
        };

        const server = L.topik === 'php' || L.topik === 'sql';

        Object.keys(nm).forEach(k => {
            if (!L.kode[k]) return;

            a.append(el('p', 'nm', nm[k]));

            const pre = el('pre', 'kode');

            pre.tabIndex = 0;
            pre.setAttribute('aria-label', 'Contoh kode ' + nm[k]);

            L.kode[k].split('\n').forEach(s => {
                pre.append(el('span', 'l', s || ' '));
            });

            a.append(pre);
        });

        if (L.hasil) {
            a.append(el('p', 'nm', L.topik === 'sql' ? 'Hasil query' : 'Hasil di peramban'));

            const hs = el('pre', 'hasil', L.hasil);

            hs.tabIndex = 0;
            a.append(hs);
        }

        if (server) {
            a.append(el(
                'p',
                'catatan-server',
                'PHP dan SQL berjalan di server dan database, bukan di peramban, jadi tidak ada ' +
                'tombol playground. Untuk mencobanya, pasang XAMPP: simpan file .php di folder htdocs lalu ' +
                'buka http://localhost/, dan jalankan SQL lewat phpMyAdmin.'
            ));
        }

        const r = el('div', 'baris');

        const c = el('button', 'btn u', 'Coba di playground');

        c.type = 'button';
        c.onclick = () => keplay(L.coba || L.kode);

        const au = el('button', 'btn', 'Dengarkan penjelasan');

        au.type = 'button';

        if (!('speechSynthesis' in window)) {
            au.disabled = true;
            au.textContent = 'Audio tidak didukung peramban ini';
        }

        au.onclick = () => {
            if (bicara) {
                stopSuara();
                au.textContent = 'Dengarkan penjelasan';
                return;
            }

            const tmp = el('div');
            tmp.innerHTML = L.teks.join(' ');

            const u = new SpeechSynthesisUtterance(
                L.judul + '. ' + tmp.textContent
            );

            u.lang = 'id-ID';
            u.rate = .95;

            u.onend = u.onerror = () => {
                bicara = false;
                au.textContent = 'Dengarkan penjelasan';
            };

            bicara = true;
            au.textContent = 'Hentikan audio';

            speechSynthesis.speak(u);
        };

        const sv = el(
            'button',
            'btn',
            S.user && S.prog.baca[L.id]
                ? 'Progres tersimpan'
                : 'Simpan progres'
        );

        sv.type = 'button';

        sv.onclick = () => {
            if (!S.user) {
                toast('Masuk dulu agar progresmu tersimpan di akun.');
                return;
            }

            S.prog.baca[L.id] = true;

            simpan();

            toast('Progres "' + L.judul + '" tersimpan.');
        };

        if (server) {
            r.append(au, sv);
        } else {
            r.append(c, au, sv);
        }
        a.append(r);

        const vd = VIDEO[L.topik];

        if (vd && vd.embed) {
            const w = el('div', 'video-wrap');

            w.append(el('h4', '', 'Video pembelajaran ' + TOPIK[L.topik]));

            const v = el('div', 'video');
            const i = document.createElement('iframe');

            i.src = vd.embed;
            i.title = vd.judul || 'Video pembelajaran ' + TOPIK[L.topik];
            i.loading = 'lazy';
            i.referrerPolicy = 'strict-origin-when-cross-origin';
            i.allow = 'accelerometer; encrypted-media; picture-in-picture; fullscreen';
            i.allowFullscreen = true;

            v.append(i);
            w.append(v);

            const cap = el('p', 'sumber-video');

            cap.append(document.createTextNode((vd.judul || '') + ' · '));

            const ln = el('a', '', 'Buka di YouTube');

            ln.href = vd.tonton;
            ln.target = '_blank';
            ln.rel = 'noopener noreferrer';

            cap.append(ln);
            w.append(cap);

            a.append(w);
        }
    }

    KK.bukaBab = id => {
        stopSuara();
        topik = id;
        location.hash = 'materi';
        renderMateri();
    };

    KK.render.push(renderMateri);
    KK.onRute.push(renderMateri);
    KK.stopSuara = stopSuara;
})();
