/* KodeKita - Modal masuk dan daftar. */

(() => {
    'use strict';

    const { $, $$, el, store, toast, sha, garam, akun, S, setUser } = window.KK;
    const KK = window.KK;
    const { TOPIK, VIDEO, LESSONS, QUIZ, CH, HERO } = window.KODEKITA;

    /* ===== Modal dan validasi formulir ===== */

    const dlg = $('#dlg');
    const fm = $('#fm');
    const fd = $('#fd');

    const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const aturan = {
        nama: v => v.trim().length < 3
            ? 'Nama lengkap minimal 3 huruf.'
            : '',

        email: v => !v.trim()
            ? 'Isi alamat email kamu.'
            : !EMAIL.test(v.trim())
                ? 'Alamat email belum lengkap.'
                : '',

        sandi: v => !v
            ? 'Isi kata sandi.'
            : v.length < 8
                ? 'Kata sandi minimal 8 karakter.'
                : !(/[A-Za-z]/.test(v) && /\d/.test(v))
                    ? 'Kata sandi harus memuat huruf dan angka.'
                    : '',

        ulang: (v, s) => !v
            ? 'Ketik ulang kata sandi.'
            : v !== s.sandi
                ? 'Kata sandi ulangan belum sama.'
                : ''
    };

    const aturanMasuk = {
        email: aturan.email,
        sandi: v => v ? '' : 'Isi kata sandi.'
    };

    function err(f, n, m) {
        const i = f.elements[n];
        const pesan = $('#' + f.id + '-e-' + n);

        if (pesan) pesan.textContent = m;

        if (!i) return;

        if (m) {
            i.setAttribute('aria-invalid', 'true');
        } else {
            i.removeAttribute('aria-invalid');
        }
    }

    function cek(f, r) {
        const s = {};

        Object.keys(r).forEach(n => {
            s[n] = f.elements[n].value;
        });

        let awal = null;

        Object.keys(r).forEach(n => {
            const m = r[n](s[n], s);

            err(f, n, m);

            if (m && !awal) awal = n;
        });

        if (awal) f.elements[awal].focus();

        return awal ? null : s;
    }

    function buka(mode) {
        [fm, fd].forEach(f => {
            if (!f) return;

            f.reset();

            $$('.err', f).forEach(p => p.textContent = '');

            $$('[aria-invalid]', f).forEach(i => {
                i.removeAttribute('aria-invalid');
            });
        });

        $$('.tgl').forEach(b => {
            const input = $('#' + b.dataset.t);

            if (input) input.type = 'password';

            b.textContent = 'Tampilkan';
            b.setAttribute('aria-pressed', 'false');
        });

        fm.hidden = mode !== 'masuk';
        fd.hidden = mode !== 'daftar';

        if (!dlg.open) dlg.showModal();

        (mode === 'masuk' ? fm : fd)
            .elements[mode === 'masuk' ? 'email' : 'nama']
            .focus();
    }

    document.addEventListener('click', e => {
        const b = e.target.closest('[data-buka]');

        if (b) buka(b.dataset.buka);

        const t = e.target.closest('.tgl');

        if (t) {
            const i = $('#' + t.dataset.t);
            if (!i) return;

            const sembunyi = i.type === 'text';

            i.type = sembunyi ? 'password' : 'text';
            t.textContent = sembunyi ? 'Tampilkan' : 'Sembunyikan';

            t.setAttribute('aria-pressed', String(!sembunyi));
        }
    });

    $('#tutup').onclick = () => dlg.close();

    dlg.addEventListener('click', e => {
        if (e.target === dlg) dlg.close();
    });

    [[fm, aturanMasuk], [fd, aturan]].forEach(([f, r]) => {
        f.addEventListener('focusout', e => {
            const n = e.target.name;

            if (r[n] && e.target.value !== '') {
                const s = {
                    sandi: f.elements.sandi.value
                };

                err(f, n, r[n](e.target.value, s));
            }
        });
    });

    fd.addEventListener('submit', async e => {
        e.preventDefault();

        $('#fd-e-gagal').textContent = '';

        const v = cek(fd, aturan);
        if (!v) return;

        const email = v.email.trim().toLowerCase();
        const a = akun();

        if (a[email]) {
            err(
                fd,
                'email',
                'Email ini sudah terdaftar. Silakan masuk atau gunakan email lain.'
            );

            fd.elements.email.focus();
            return;
        }

        try {
            const g = garam();

            a[email] = {
                nama: v.nama.trim(),
                garam: g,
                hash: await sha(g + v.sandi)
            };

            store.set('kodekita.akun', JSON.stringify(a));

            dlg.close();
            setUser(email);

            toast(
                'Akun dibuat. Selamat belajar, ' +
                a[email].nama.split(' ')[0] + '!'
            );
        } catch (x) {
            $('#fd-e-gagal').textContent =
                'Peramban tidak bisa mengamankan sandi. Gunakan HTTPS atau perbarui peramban.';
        }
    });

    fm.addEventListener('submit', async e => {
        e.preventDefault();

        $('#fm-e-gagal').textContent = '';

        const v = cek(fm, aturanMasuk);
        if (!v) return;

        const email = v.email.trim().toLowerCase();
        const a = akun()[email];

        if (!a) {
            err(
                fm,
                'email',
                'Email ini belum terdaftar. Periksa penulisannya atau daftar dulu.'
            );

            fm.elements.email.focus();
            return;
        }

        try {
            if (await sha(a.garam + v.sandi) !== a.hash) {
                err(
                    fm,
                    'sandi',
                    'Kata sandi salah. Periksa kembali.'
                );

                fm.elements.sandi.focus();
                return;
            }

            dlg.close();
            setUser(email);

            toast(
                'Selamat datang kembali, ' +
                a.nama.split(' ')[0] + '.'
            );
        } catch (x) {
            $('#fm-e-gagal').textContent =
                'Peramban tidak bisa memeriksa sandi. Gunakan HTTPS atau perbarui peramban.';
        }
    });

    Object.assign(window.KK, { EMAIL, buka });
})();
