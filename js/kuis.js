/* KodeKita - Halaman Kuis. */

(() => {
    'use strict';

    const { $, $$, el, S, simpan } = window.KK;
    const KK = window.KK;
    const { TOPIK, VIDEO, LESSONS, QUIZ, CH, HERO } = window.KODEKITA;

    /* ===== Kuis ===== */

    let q = {
        i: 0,
        skor: 0,
        jaw: [],
        pilih: null,
        selesai: false
    };

    function renderKuis() {
        const b = $('#kuis-isi');
        b.replaceChildren();

        const total = QUIZ.length;

        $('#info-kuis').textContent =
            S.user && S.prog.kuis.terbaik != null
                ? 'Skor terbaikmu: ' + S.prog.kuis.terbaik + ' dari ' + total + '.'
                : total + ' soal dari tiga topik. Setiap jawaban langsung dibahas.';

        const bar = nilai => {
            const t = el('div', 'progress');
            const i = el('div', 'progress-bar');

            i.style.width = Math.round(nilai / total * 100) + '%';
            t.append(i);

            return t;
        };

        const ulangi = () => {
            q = { i: 0, skor: 0, jaw: [], pilih: null, selesai: false };
            renderKuis();
        };

        /* ----- Halaman hasil ----- */

        if (q.selesai) {
            const rasio = q.skor / total;

            b.append(
                el('p', 'nm', 'Hasil kuis'),
                el('p', 'skor', q.skor + ' / ' + total),
                bar(q.skor),
                el(
                    'p',
                    'pesan-hasil',
                    rasio === 1
                        ? 'Sempurna. Lanjutkan ke tantangan coding.'
                        : rasio >= 0.7
                            ? 'Bagus. Baca lagi pembahasan soal yang salah, lalu coba tantangan.'
                            : 'Masih ada yang perlu dipelajari. Buka lagi materinya, lalu ulangi kuis.'
                )
            );

            if (!S.user) {
                b.append(
                    el('p', 'catatan', 'Skor ini belum tersimpan karena kamu belum masuk.')
                );
            }

            const ul = el('ul', 'hasil');

            QUIZ.forEach((x, n) => {
                const ok = q.jaw[n] === x.a;
                const li = el('li', ok ? 'ok' : 'no');
                const isi = el('span');

                isi.append(
                    el('b', '', 'Soal ' + (n + 1) + ': ' + (ok ? 'benar' : 'salah'))
                );

                isi.append(
                    el(
                        'small',
                        '',
                        ok
                            ? x.o[x.a]
                            : 'Jawabanmu: ' + x.o[q.jaw[n]] + '. Yang tepat: ' + x.o[x.a]
                    )
                );

                li.append(isi);
                ul.append(li);
            });

            const r = el('button', 'btn', 'Ulangi kuis');
            r.type = 'button';
            r.onclick = ulangi;

            const baris = el('div', 'baris');
            baris.append(r);

            b.append(ul, baris);
            return;
        }

        /* ----- Soal ----- */

        const Q = QUIZ[q.i];

        const atas = el('div', 'kuis-atas');
        atas.append(
            el('p', 'nm', 'Soal ' + (q.i + 1) + ' dari ' + total),
            el('span', 'kuis-skor', 'Benar: ' + q.skor)
        );

        b.append(atas, bar(q.i + (q.pilih != null ? 1 : 0)));

        const h = el('h3', 'kuis-tanya');
        h.innerHTML = Q.t;
        b.append(h);

        const opsi = el('div', 'opsi-kuis');
        opsi.setAttribute('role', 'group');
        opsi.setAttribute('aria-label', 'Pilihan jawaban');

        Q.o.forEach((o, n) => {
            const x = el('button', 'opsi');
            x.type = 'button';

            x.append(
                el('span', 'huruf', String.fromCharCode(65 + n)),
                el('span', 'teks', o)
            );

            if (q.pilih != null) {
                x.disabled = true;

                if (n === Q.a) {
                    x.classList.add('benar');
                    x.append(el('span', 'ket', 'Jawaban tepat'));
                } else if (n === q.pilih) {
                    x.classList.add('salah');
                    x.append(el('span', 'ket', 'Jawabanmu'));
                }
            }

            x.onclick = () => {
                q.pilih = n;
                q.jaw[q.i] = n;

                if (n === Q.a) q.skor++;

                renderKuis();
                $('#lanjut').focus();
            };

            opsi.append(x);
        });

        b.append(opsi);

        if (q.pilih == null) return;

        const p = el('div', 'bahas');
        p.setAttribute('role', 'status');

        p.append(
            el('b', '', q.pilih === Q.a ? 'Benar.' : 'Kurang tepat.'),
            document.createTextNode(' ' + Q.b)
        );

        b.append(p);

        const l = el(
            'button',
            'btn',
            q.i < total - 1 ? 'Soal berikutnya' : 'Lihat skor'
        );

        l.type = 'button';
        l.id = 'lanjut';

        l.onclick = () => {
            if (q.i < total - 1) {
                q.i++;
                q.pilih = null;
            } else {
                q.selesai = true;

                if (S.user) {
                    S.prog.kuis.terakhir = q.skor;
                    S.prog.kuis.terbaik = Math.max(S.prog.kuis.terbaik ?? 0, q.skor);

                    simpan();
                    return;
                }
            }

            renderKuis();
        };

        const baris = el('div', 'baris');
        baris.append(l);
        b.append(baris);
    }

    KK.render.push(renderKuis);
})();
