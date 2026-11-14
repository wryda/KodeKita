/* KodeKita - Sinkronisasi dengan server (opsional).
   Bila /api tersedia (server/server.js berjalan), akun dan progres disimpan di server.
   Bila tidak, aplikasi tetap bekerja seperti biasa dengan localStorage. */

(() => {
    'use strict';

    const KK = window.KK;
    const { store, S, setUser, akun } = KK;

    const TOKEN = 'kodekita.token';
    const MILIK = 'kodekita.token.email';

    const srv = KK.server = { aktif: false };

    const panggil = async (jalur, opsi = {}) => {
        const t = store.get(TOKEN);

        try {
            const res = await fetch('/api' + jalur, {
                ...opsi,
                headers: {
                    'Content-Type': 'application/json',
                    ...(t ? { Authorization: 'Bearer ' + t } : {})
                }
            });

            const data = await res.json().catch(() => ({}));

            return res.ok
                ? data
                : { galat: data.galat || 'Terjadi kesalahan (' + res.status + ').', status: res.status };
        } catch (e) {
            return { galat: 'Server tidak bisa dihubungi.' };
        }
    };

    /* Salinan lokal: nama dan progres, tanpa sandi */

    const simpanLokal = d => {
        const a = akun();

        a[d.email] = { nama: d.nama, peran: d.peran };

        store.set('kodekita.akun', JSON.stringify(a));
        store.set('kodekita.progres.' + d.email, JSON.stringify(d.progres || {}));
        store.set(TOKEN, d.token);
        store.set(MILIK, d.email);
    };

    const auth = async (jalur, badan) => {
        const d = await panggil(jalur, { method: 'POST', body: JSON.stringify(badan) });

        if (!d.galat) simpanLokal(d);

        return d;
    };

    let tunda;

    Object.assign(srv, {
        daftar: (nama, email, sandi) => auth('/daftar', { nama, email, sandi }),
        masuk: (email, sandi) => auth('/masuk', { email, sandi }),

        /* Dipanggil setiap simpan(); dikirim setelah 1 detik tanpa perubahan */
        kirim() {
            if (!srv.aktif || !S.user || store.get(MILIK) !== S.user.email) return;

            clearTimeout(tunda);

            tunda = setTimeout(() => {
                panggil('/progres', { method: 'PUT', body: JSON.stringify(S.prog) });
            }, 1000);
        }
    });

    /* Cek server, lalu tarik progres terbaru untuk sesi yang sedang aktif */

    (async () => {
        const p = await panggil('/ping');

        if (p.galat || !p.ok) return;

        srv.aktif = true;

        const email = store.get(MILIK);

        if (!store.get(TOKEN) || !S.user || S.user.email !== email) return;

        const d = await panggil('/saya');

        if (d.galat) {
            if (d.status === 401) {
                store.del(TOKEN);
                store.del(MILIK);
            }

            return;
        }

        store.set('kodekita.progres.' + email, JSON.stringify(d.progres));
        setUser(email);
    })();
})();
