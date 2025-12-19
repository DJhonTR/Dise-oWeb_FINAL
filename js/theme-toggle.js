(function () {
    'use strict';

    function initTheme() {
        const themeToggleBtn = document.getElementById('theme-toggle');
        const htmlElement = document.documentElement;
        const themeText = document.getElementById('theme-text');

        if (!themeToggleBtn || !themeText) return;

        function updateThemeUI(isDark) {
            const lang = localStorage.getItem('misjhon-language') || 'es';
            const t = (window.translations && window.translations[lang]) || (window.translations && window.translations['es']);

            if (isDark) {
                if (t && t.theme_dark) {
                    themeText.textContent = t.theme_dark;
                }
                themeText.setAttribute('data-translate', 'theme_dark');
            } else {
                if (t && t.theme_light) {
                    themeText.textContent = t.theme_light;
                }
                themeText.setAttribute('data-translate', 'theme_light');
            }
        }

        const savedTheme = localStorage.getItem('theme');
        const osPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && osPrefersDark)) {
            htmlElement.classList.add('dark');
            updateThemeUI(true);
        } else {
            htmlElement.classList.remove('dark');
            updateThemeUI(false);
        }

        themeToggleBtn.addEventListener('click', () => {
            const isDark = htmlElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeUI(isDark);
        });


    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();
