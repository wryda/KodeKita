/* KodeKita - Pemuat: menyisipkan potongan HTML (folder html/) ke index.html,
   lalu memuat semua skrip secara berurutan. Urutan skrip penting; router paling akhir. */

(() => {
    'use strict';

    const SKRIP = [
        'js/data.js',
        'js/data-tambahan.js',
        'js/inti.js',
        'js/akun.js',
        'js/playground.js',
        'js/beranda.js',
        'js/materi.js',
        'js/kuis.js',
        'js/tantangan.js',
        'js/progres.js',
        'js/profil.js',
        'js/tambahan.js',
        'js/sinkron.js',
        'js/router.js'
    ];

    const muatHtml = async tempat => {
        const res = await fetch(tempat.dataset.muat);
        if (!res.ok) throw new Error(tempat.dataset.muat + ' (' + res.status + ')');
        const t = document.createElement('template');
        t.innerHTML = await res.text();
        tempat.replaceWith(t.content);
    };

    const muatSkrip = src => new Promise((ok, gagal) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = ok;
        s.onerror = () => gagal(new Error(src));
        document.body.appendChild(s);
    });

    const galat = e => {
        const p = document.createElement('p');
        p.style.cssText = 'padding:24px;font:16px sans-serif;max-width:640px;margin:auto';
        p.textContent = location.protocol === 'file:'
            ? 'KodeKita perlu dibuka lewat server lokal (bukan klik dua kali pada index.html), '
              + 'misalnya ekstensi Live Server di VS Code atau perintah: python -m http.server'
            : 'Gagal memuat: ' + e.message;
        document.body.prepend(p);
    };

    (async () => {
        try {
            await Promise.all([...document.querySelectorAll('[data-muat]')].map(muatHtml));
            for (const s of SKRIP) await muatSkrip(s);
        } catch (e) {
            galat(e);
        }
    })();
})();
