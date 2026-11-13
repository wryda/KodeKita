/* KodeKita - Inti: pembantu, penyimpanan, akun, dan header. */

(() => {
    'use strict';

    const { TOPIK, VIDEO, LESSONS, QUIZ, CH, HERO } = window.KODEKITA;

    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => [...r.querySelectorAll(s)];

    const el = (t, c, x) => {
        const e = document.createElement(t);
        if (c) e.className = c;
        if (x != null) e.textContent = x;
        return e;
    };

    
    /* ===== Penyimpanan ===== */

    const mem = {};

    const store = {
        get(k) {
            try {
                return localStorage.getItem(k);
            } catch (e) {
                return mem[k] ?? null;
            }
        },

        set(k, v) {
            try {
                localStorage.setItem(k, v);
            } catch (e) {
                mem[k] = v;
            }
        },

        del(k) {
            try {
                localStorage.removeItem(k);
            } catch (e) {
                delete mem[k];
            }
        }
    };

    const baca = (k, d) => {
        try {
            return JSON.parse(store.get(k)) ?? d;
        } catch (e) {
            return d;
        }
    };

    let tt;

    const toast = m => {
        const t = $('#toast');
        if (!t) return;

        t.textContent = m;
        t.hidden = false;

        clearTimeout(tt);
        tt = setTimeout(() => t.hidden = true, 3500);
    };

    /* ===== Akun ===== */

    const hex = b => [...new Uint8Array(b)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');

    const sha = async t => hex(
        await crypto.subtle.digest(
            'SHA-256',
            new TextEncoder().encode(t)
        )
    );

    const garam = () => hex(
        crypto.getRandomValues(new Uint8Array(16))
    );

    const akun = () => baca('kodekita.akun', {});

    const kosong = () => ({
        baca: {},
        kuis: {
            terbaik: null,
            terakhir: null
        },
        tantangan: {}
    });

    const S = { user: null, prog: kosong() };
    const KK = window.KK = { render: [], onRute: [] };

    function setUser(email) {
        const a = email && akun()[email];

        S.user = a ? {
            email,
            nama: a.nama,
            kelas: a.kelas
        } : null;

        if (S.user) {
            store.set('kodekita.sesi', email);

            S.prog = Object.assign(
                kosong(),
                baca('kodekita.progres.' + email, {})
            );

            S.prog.baca ||= {};
            S.prog.kuis ||= { terbaik: null, terakhir: null };
            S.prog.tantangan ||= {};
        } else {
            store.del('kodekita.sesi');
            S.prog = kosong();
        }

        document.body.dataset.auth = S.user ? 'masuk' : 'tamu';

        renderAkun();
        renderSemua();
    }

    function simpan() {
        if (S.user) {
            store.set(
                'kodekita.progres.' + S.user.email,
                JSON.stringify(S.prog)
            );
        }

        renderSemua();
    }

    const IKON_PROFIL =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
        'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ' +
        'aria-hidden="true"><circle cx="12" cy="8" r="4"/>' +
        '<path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>';

    function renderAkun() {
        const a = $('#akun');
        if (!a) return;

        a.replaceChildren();

        if (S.user) {
            const n = el('a', 'ikon-profil');
            n.href = '#profil';
            n.title = S.user.nama;
            n.setAttribute('aria-label', 'Profil ' + S.user.nama);
            n.innerHTML = IKON_PROFIL;

            const o = el('button', 'btn', 'Keluar');
            o.type = 'button';

            o.onclick = () => {
                setUser(null);
                toast('Kamu sudah keluar.');
            };

            a.append(n, o);
        } else {
            const m = el('button', 'btn', 'Masuk');
            m.type = 'button';
            m.dataset.buka = 'masuk';

            const d = el('button', 'btn u', 'Daftar');
            d.type = 'button';
            d.dataset.buka = 'daftar';

            a.append(m, d);
        }
    }

    const renderSemua = () => KK.render.forEach(f => f());

    Object.assign(window.KK, { $, $$, el, store, baca, toast, sha, garam, akun, S, setUser, simpan, renderSemua });
})();
