/* KodeKita - Navigasi antarhalaman dan penyalaan awal. */

(() => {
    'use strict';

    const { $, $$ } = window.KK;
    const KK = window.KK;

    /* ===== Navigasi antarhalaman ===== */

    const hal = [
        'beranda',
        'materi',
        'playground',
        'kuis',
        'tantangan',
        'progres',
        'profil'
    ];

    function rute() {
        const v = hal.includes(location.hash.slice(1))
            ? location.hash.slice(1)
            : 'beranda';

        hal.forEach(x => {
            $('#v-' + x).hidden = x !== v;
        });

        $$('.atas nav a').forEach(a => {
            if (a.getAttribute('href') === '#' + v) {
                a.setAttribute('aria-current', 'page');
                a.scrollIntoView({ inline: 'center', block: 'nearest' });
            } else {
                a.removeAttribute('aria-current');
            }
        });

        KK.stopSuara();
        KK.onRute.forEach(f => f());
        scrollTo(0, 0);
    }

    addEventListener('hashchange', rute);


    KK.renderHitung();
    KK.setUser(KK.store.get('kodekita.sesi'));
    rute();
})();
