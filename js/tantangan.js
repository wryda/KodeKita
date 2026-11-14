/* KodeKita - Halaman Tantangan. */

(() => {
    'use strict';

    const { $, $$, el, toast, S, simpan, makePG, buildDoc, buka } = window.KK;
    const KK = window.KK;
    const { TOPIK, VIDEO, LESSONS, QUIZ, CH, HERO } = window.KODEKITA;

    /* ===== Tantangan ===== */

    let ta = 0;

    const server = c => c.jenis === 'isian' || c.jenis === 'pilihan';

    const kodeT = CH.map(c => server(c) ? null : { ...c.mulai });
    const jwb = {};

    const pgT = makePG($('#pg-tan'), {
        code: CH[0].mulai,
        h: 260,
        lebar: true
    });

    const area = el('div', 'tan-server');
    $('#pg-tan').after(area);

    function renderTantangan() {
        const d = $('#daftar-tantangan');
        d.replaceChildren();

        CH.forEach((c, i) => {
            const b = el('button', '', c.judul);

            b.type = 'button';
            b.setAttribute('aria-current', String(i === ta));

            if (S.user) {
                b.append(
                    el(
                        'small',
                        '',
                        S.prog.tantangan[c.id] ? 'Selesai' : 'Belum selesai'
                    )
                );
            }

            b.onclick = () => {
                if (!server(CH[ta])) kodeT[ta] = pgT.get();

                ta = i;

                if (!server(CH[i])) pgT.set(kodeT[i]);

                $('#t-hasil').replaceChildren();

                renderTantangan();
            };

            d.append(b);
        });

        const c = CH[ta];

        $('#t-judul').textContent = c.judul;
        $('#t-petunjuk').innerHTML = c.pet;

        $('#pg-tan').hidden = server(c);
        area.hidden = !server(c);
        area.replaceChildren();

        if (c.jenis === 'isian') {
            const t = el('textarea', 'tan-isian');

            t.rows = 6;
            t.spellcheck = false;
            t.setAttribute('aria-label', 'Jawaban isian');
            t.value = jwb[c.id] ?? c.awal ?? '';
            t.oninput = () => { jwb[c.id] = t.value; };

            area.append(t);
        }

        if (c.jenis === 'pilihan') {
            const g = el('div', 'opsi-kuis');

            g.setAttribute('role', 'group');
            g.setAttribute('aria-label', 'Pilihan jawaban');

            c.pilihan.forEach((o, n) => {
                const x = el('button', 'opsi');

                x.type = 'button';
                x.setAttribute('aria-pressed', String(jwb[c.id] === n));
                x.append(
                    el('span', 'huruf', String.fromCharCode(65 + n)),
                    el('span', 'teks', o)
                );

                x.onclick = () => {
                    jwb[c.id] = n;

                    $$('button', g).forEach((y, k) => {
                        y.setAttribute('aria-pressed', String(k === n));
                    });
                };

                g.append(x);
            });

            area.append(g);
        }
    }

    function tampilHasil(c, r) {
        const w = $('#t-hasil');

        w.replaceChildren();

        const ul = el('ul', 'hasil');
        let semua = true;

        r.forEach(([l, ok]) => {
            if (!ok) semua = false;

            const li = el('li', ok ? 'ok' : 'no');

            li.append(
                el('b', '', ok ? 'Lulus' : 'Belum'),
                document.createTextNode(l)
            );

            ul.append(li);
        });

        w.append(ul);

        if (semua) {
            if (c.bahas) w.append(el('p', '', c.bahas));

            w.append(
                el(
                    'p',
                    '',
                    S.user
                        ? 'Tantangan selesai dan tersimpan di akunmu.'
                        : 'Tantangan selesai. Masuk ke akunmu agar hasil ini tersimpan.'
                )
            );

            if (S.user) {
                S.prog.tantangan[c.id] = true;
                simpan();
            }
        } else {
            w.append(
                el(
                    'p',
                    '',
                    r.length && r[0][0].startsWith('Kode selesai')
                        ? 'Kodemu tidak selesai dijalankan. Cari perulangan tanpa akhir.'
                        : 'Baca bagian yang bertanda Belum, perbaiki kodenya, lalu periksa lagi.'
                )
            );
        }
    }

    function periksaServer(c) {
        if (c.jenis === 'isian') {
            tampilHasil(c, c.uji(jwb[c.id] ?? c.awal ?? ''));
            return;
        }

        const p = jwb[c.id];

        if (p == null) {
            toast('Pilih satu jawaban dulu.');
            return;
        }

        tampilHasil(c, [[
            p === c.benar ? 'Jawabanmu tepat' : 'Jawabanmu belum tepat',
            p === c.benar
        ]]);
    }

    $('#periksa').onclick = () => {
        const c = CH[ta];

        if (server(c)) {
            periksaServer(c);
            return;
        }

        const fr = el('iframe', 'pemeriksa');

        fr.sandbox = 'allow-scripts';
        fr.title = 'Pemeriksa jawaban';

        let selesai = false;

        const akhir = r => {
            if (selesai) return;

            selesai = true;

            removeEventListener('message', on);
            fr.remove();

            tampilHasil(c, r);
        };

        const on = e => {
            if (
                e.source === fr.contentWindow &&
                e.data &&
                e.data.kk
            ) {
                akhir(e.data.r);
            }
        };

        addEventListener('message', on);
        document.body.append(fr);

        fr.srcdoc = buildDoc(
            pgT.get(),
            '<script>' +
            'addEventListener("load",function(){' +
                'var r;' +
                'try{' +
                    'r=(' + c.uji.toString() + ')()' +
                '}catch(e){' +
                    'r=[["Kode berjalan tanpa galat",false]]' +
                '}' +
                'parent.postMessage({kk:1,r:r},"*")' +
            '})' +
            '<\/script>'
        );

        setTimeout(
            () => akhir([['Kode selesai dijalankan dalam 3 detik', false]]),
            3000
        );
    };

    KK.render.push(renderTantangan);
})();
