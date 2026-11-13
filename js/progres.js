/* KodeKita - Halaman Progres. */

(() => {
    'use strict';

    const { $, $$, el, S, buka } = window.KK;
    const KK = window.KK;
    const { TOPIK, VIDEO, LESSONS, QUIZ, CH, HERO } = window.KODEKITA;

    /* ===== Progres ===== */

    function renderProgres() {
        const b = $('#isi-progres');

        b.replaceChildren();

        if (!S.user) {
            b.append(
                el(
                    'p',
                    '',
                    'Kamu belum masuk. Masuk atau daftar agar materi yang dibaca, skor kuis, dan tantangan yang selesai tersimpan di akunmu.'
                )
            );

            const m = el('button', 'btn u', 'Masuk');

            m.type = 'button';
            m.dataset.buka = 'masuk';

            b.append(m);
            return;
        }

        b.append(
            el('p', '', 'Halo, ' + S.user.nama + '. Ini progresmu.')
        );

        const baris = (j, n, m, t) => {
            const l = el('label', '', j + ': ' + t);
            l.style.marginTop = '0';

            const g = document.createElement('progress');

            g.max = m;
            g.value = n;
            g.id = 'pr-' + j;

            l.htmlFor = g.id;

            b.append(l, g);
        };

        const nb = LESSONS.filter(x => S.prog.baca[x.id]).length;
        const nt = CH.filter(x => S.prog.tantangan[x.id]).length;

        baris(
            'Materi',
            nb,
            LESSONS.length,
            nb + ' dari ' + LESSONS.length + ' sudah dibaca'
        );

        baris(
            'Kuis',
            S.prog.kuis.terbaik || 0,
            QUIZ.length,
            S.prog.kuis.terbaik == null
                ? 'belum dikerjakan'
                : 'skor terbaik ' +
                    S.prog.kuis.terbaik +
                    ' dari ' +
                    QUIZ.length +
                    ', terakhir ' +
                    S.prog.kuis.terakhir
        );

        baris(
            'Tantangan',
            nt,
            CH.length,
            nt + ' dari ' + CH.length + ' selesai'
        );
    }

    KK.render.push(renderProgres);
})();
