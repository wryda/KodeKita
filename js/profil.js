/* KodeKita - Halaman Profil. */

(() => {
    'use strict';

    const { $, $$, el, store, toast, sha, garam, akun, S, setUser, simpan, EMAIL, buka } = window.KK;
    const KK = window.KK;
    const { TOPIK, VIDEO, LESSONS, QUIZ, CH, HERO } = window.KODEKITA;

    /* ===== Profil ===== */

    const profilForm = $('#form-profil');
    const fmProfil = $('#fm-profil');
    const fmPassword = $('#fm-password');

    function renderProfil() {
        if (!$('#profil-nama')) return;

        const masuk = !!S.user;

        $('#profil-nama').textContent = masuk ? S.user.nama : 'Belum masuk';

        $('#profil-email').textContent = masuk
            ? S.user.email
            : 'Masuk untuk melihat profil dan progresmu.';

        $('#profil-status').hidden = !masuk;
        $('#profil-info').hidden = !masuk;
        $('#btn-edit-profil').hidden = !masuk;
        $('#profil-masuk').hidden = masuk;
        $('#profil-keamanan').hidden = !masuk;

        if (!masuk) {
            if (profilForm) profilForm.hidden = true;
            return;
        }

        const nb = LESSONS.filter(x => S.prog.baca[x.id]).length;
        const nt = CH.filter(x => S.prog.tantangan[x.id]).length;

        $('#profil-materi').textContent = nb + '/' + LESSONS.length;

        $('#profil-kuis').textContent = S.prog.kuis.terbaik == null
            ? '–'
            : S.prog.kuis.terbaik + '/' + QUIZ.length;

        $('#profil-tantangan').textContent = nt + '/' + CH.length;

        $('#profil-input-nama').value = S.user.nama;
        $('#profil-input-email').value = S.user.email;
    }

    function bukaEditProfil() {
        if (!S.user) {
            toast('Masuk terlebih dahulu untuk mengedit profil.');
            buka('masuk');
            return;
        }

        renderProfil();

        if (profilForm) {
            profilForm.hidden = false;
            fmProfil.hidden = false;
        }

        $('#profil-input-nama').focus();
    }

    function tutupEditProfil() {
        if (profilForm) profilForm.hidden = true;

        if (fmProfil) fmProfil.reset();
        if (fmPassword) fmPassword.reset();

        if ($('#profil-error')) {
            $('#profil-error').textContent = '';
        }

        if ($('#profil-password-error')) {
            $('#profil-password-error').textContent = '';
        }

        renderProfil();
    }

    $('#btn-edit-profil')?.addEventListener('click', bukaEditProfil);

    $('#btn-batal-profil')?.addEventListener('click', tutupEditProfil);

    /* Simpan profil */

    fmProfil?.addEventListener('submit', e => {
        e.preventDefault();

        $('#profil-error').textContent = '';

        if (!S.user) {
            toast('Masuk terlebih dahulu.');
            return;
        }

        const nama = $('#profil-input-nama').value.trim();
        const email = $('#profil-input-email').value.trim().toLowerCase();
        if (nama.length < 3) {
            $('#profil-error').textContent =
                'Nama minimal 3 karakter.';
            return;
        }

        if (!EMAIL.test(email)) {
            $('#profil-error').textContent =
                'Masukkan alamat email yang valid.';
            return;
        }

        const semuaAkun = akun();
        const emailLama = S.user.email;

        if (email !== emailLama && semuaAkun[email]) {
            $('#profil-error').textContent =
                'Email tersebut sudah digunakan akun lain.';
            return;
        }

        const dataLama = semuaAkun[emailLama];

        if (!dataLama) {
            $('#profil-error').textContent =
                'Data akun tidak ditemukan.';
            return;
        }

        semuaAkun[email] = {
            ...dataLama,
            nama
        };

        if (email !== emailLama) {
            delete semuaAkun[emailLama];

            const progresLama = store.get(
                'kodekita.progres.' + emailLama
            );

            if (progresLama !== null) {
                store.set(
                    'kodekita.progres.' + email,
                    progresLama
                );

                store.del('kodekita.progres.' + emailLama);
            }
        }

        store.set('kodekita.akun', JSON.stringify(semuaAkun));
        store.set('kodekita.sesi', email);

        setUser(email);
        tutupEditProfil();

        toast('Profil berhasil diperbarui.');
    });

    /* Ganti kata sandi */

    fmPassword?.addEventListener('submit', async e => {
        e.preventDefault();

        const error = $('#profil-password-error');
        error.textContent = '';

        if (!S.user) {
            error.textContent = 'Silakan masuk terlebih dahulu.';
            return;
        }

        const lama = $('#profil-sandi-lama').value;
        const baru = $('#profil-sandi-baru').value;
        const ulang = $('#profil-sandi-ulang').value;

        if (!lama || !baru || !ulang) {
            error.textContent =
                'Semua kolom kata sandi wajib diisi.';
            return;
        }

        if (
            baru.length < 8 ||
            !(/[A-Za-z]/.test(baru) && /\d/.test(baru))
        ) {
            error.textContent =
                'Kata sandi minimal 8 karakter dan harus mengandung huruf serta angka.';
            return;
        }

        if (baru !== ulang) {
            error.textContent =
                'Ulangan kata sandi baru tidak sama.';
            return;
        }

        if (lama === baru) {
            error.textContent =
                'Kata sandi baru harus berbeda dari kata sandi lama.';
            return;
        }

        try {
            const semuaAkun = akun();
            const data = semuaAkun[S.user.email];

            if (!data) {
                error.textContent = 'Data akun tidak ditemukan.';
                return;
            }

            const hashLama = await sha(data.garam + lama);

            if (hashLama !== data.hash) {
                error.textContent =
                    'Kata sandi lama yang kamu masukkan salah.';
                return;
            }

            const g = garam();

            semuaAkun[S.user.email] = {
                ...data,
                garam: g,
                hash: await sha(g + baru)
            };

            store.set(
                'kodekita.akun',
                JSON.stringify(semuaAkun)
            );

            fmPassword.reset();

            toast('Kata sandi berhasil diperbarui.');
        } catch (x) {
            error.textContent =
                'Gagal memperbarui kata sandi. Coba lagi.';
        }
    });

    KK.render.push(renderProfil);
    KK.onRute.push(renderProfil);
})();
