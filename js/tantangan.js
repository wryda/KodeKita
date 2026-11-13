/* KodeKita - Halaman Tantangan. */

(() => {
    'use strict';

    const { $, $$, el, toast, S, simpan, makePG, buildDoc, buka } = window.KK;
    const KK = window.KK;
    const { TOPIK, VIDEO, LESSONS, QUIZ, CH, HERO } = window.KODEKITA;

    /* ===== Tantangan ===== */

    let ta = 0;

    const kodeT = CH.map(c => ({ ...c.mulai }));

    const pgT = makePG($('#pg-tan'), {
        code: CH[0].mulai,
        h: 260,
        lebar: true
    });

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
                kodeT[ta] = pgT.get();
                ta = i;

                pgT.set(kodeT[i]);

                $('#t-hasil').replaceChildren();

                renderTantangan();
            };

            d.append(b);
        });

        $('#t-judul').textContent = CH[ta].judul;
        $('#t-petunjuk').innerHTML = CH[ta].pet;
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

    $('#periksa').onclick = () => {
        const c = CH[ta];

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
