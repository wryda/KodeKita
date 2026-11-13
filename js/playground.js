/* KodeKita - Playground (editor kode) yang dipakai beranda, materi, dan tantangan. */

(() => {
    'use strict';

    const { $, $$, el, S } = window.KK;
    const KK = window.KK;
    const { TOPIK, VIDEO, LESSONS, QUIZ, CH, HERO } = window.KODEKITA;

    /* ===== Playground ===== */

    const buildDoc = (f, extra = '') =>
        '<!doctype html><html lang="id"><head><meta charset="utf-8"><style>' +
        'body{font:16px/1.5 system-ui,sans-serif;margin:0;padding:12px;background:#fff;color:#111}' +
        f.css +
        '</style></head><body>' +
        f.html +
        '<script>' +
        f.js.replace(/<\/script/gi, '<\\/script') +
        '<\/script>' +
        extra +
        '</body></html>';

    function makePG(root, { code, h = 220, lebar = false }) {
        let awal = { ...code };
        let f = { ...code };
        let cur = 'html';
        let t;

        root.classList.add('pg');

        if (lebar) root.classList.add('lebar');

        root.style.setProperty('--h', h + 'px');

        root.innerHTML =
            '<div class="pg-tabs"></div>' +
            '<div class="pg-body">' +
                '<div class="gut" aria-hidden="true"></div>' +
                '<textarea spellcheck="false" autocomplete="off" autocapitalize="off" wrap="off"></textarea>' +
            '</div>' +
            '<iframe sandbox="allow-scripts" title="Pratinjau hasil kode"></iframe>';

        const tabs = $('.pg-tabs', root);
        const ta = $('textarea', root);
        const gut = $('.gut', root);
        const fr = $('iframe', root);

        const nama = {
            html: 'index.html',
            css: 'style.css',
            js: 'script.js'
        };

        const lab = {
            html: 'HTML',
            css: 'CSS',
            js: 'JavaScript'
        };

        Object.keys(nama).forEach(k => {
            const b = el('button', '', nama[k]);

            b.type = 'button';
            b.dataset.k = k;

            b.onclick = () => {
                cur = k;
                tampil();
            };

            tabs.append(b);
        });

        const rs = el('button', 'reset', 'Reset');

        rs.type = 'button';
        rs.setAttribute('aria-label', 'Reset kode ke contoh awal');

        rs.onclick = () => {
            f = { ...awal };
            tampil();
            render();
        };

        tabs.append(rs);

        const baris = () => {
            gut.textContent = Array.from(
                { length: ta.value.split('\n').length },
                (_, i) => i + 1
            ).join('\n');
        };

        function tampil() {
            $$('button[data-k]', tabs).forEach(b => {
                b.setAttribute(
                    'aria-pressed',
                    String(b.dataset.k === cur)
                );
            });

            ta.value = f[cur];
            ta.setAttribute('aria-label', 'Editor kode ' + lab[cur]);

            baris();
        }

        const render = () => {
            fr.srcdoc = buildDoc(f);
        };

        ta.addEventListener('input', () => {
            f[cur] = ta.value;

            baris();

            clearTimeout(t);
            t = setTimeout(render, 300);
        });

        ta.addEventListener('scroll', () => {
            gut.scrollTop = ta.scrollTop;
        });

        tampil();
        render();

        return {
            get: () => ({ ...f }),

            set(c) {
                awal = { ...c };
                f = { ...c };
                cur = 'html';

                tampil();
                render();
            }
        };
    }

    const pgMain = makePG($('#pg-main'), {
        code: {
            html: '<h1>Halo!</h1>\n<p>Tulis kodemu di sini.</p>',
            css: 'h1 {\n  color: #0E6B63;\n}',
            js: ''
        },
        h: 380,
        lebar: true
    });

    const keplay = c => {
        pgMain.set(c);
        location.hash = 'playground';
    };

    Object.assign(window.KK, { buildDoc, makePG, keplay });
})();
