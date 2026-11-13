/* KodeKita - Halaman Beranda. */

(() => {
    'use strict';

    const { $, $$, el, makePG, keplay } = window.KK;
    const KK = window.KK;
    const { TOPIK, VIDEO, LESSONS, QUIZ, CH, HERO } = window.KODEKITA;

    const pgHero = makePG($('#pg-hero'), {
        code: HERO,
        h: 240,
        lebar: true
    });

    $('#ke-pg').onclick = () => keplay(pgHero.get());

    function renderHitung() {
        const n = {
            materi: LESSONS.length,
            kuis: QUIZ.length,
            tantangan: CH.length,
            topik: Object.keys(TOPIK).length
        };

        $$('[data-hitung]').forEach(e => {
            e.textContent = n[e.dataset.hitung] ?? e.textContent;
        });
    }

    Object.assign(window.KK, { renderHitung });
})();
