
(function () {
    'use strict';


    const languages = {
        es: { name: 'Español', flag: 'es.svg' },
        en: { name: 'English', flag: 'en.svg' },
        pt: { name: 'Português', flag: 'pt.svg' },
        fr: { name: 'Français', flag: 'fr.svg' },
        it: { name: 'Italiano', flag: 'it.svg' },
        de: { name: 'Deutsch', flag: 'de.svg' }
    };


    function getFlagPath(filename) {

        const pathPrefix = window.location.pathname.includes('/subCarpetas/') ||
            window.location.pathname.includes('/otrasPaginas/')
            ? '../imagenes/banderas/'
            : 'imagenes/banderas/';
        return pathPrefix + filename;
    }


    function initLanguageSelector() {
        const languageToggle = document.getElementById('language-toggle');
        const languageMenu = document.getElementById('language-menu');

        if (!languageToggle || !languageMenu) {
            console.warn('Language selector elements not found');
            return;
        }


        languageToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            languageMenu.classList.toggle('hidden');
        });


        document.addEventListener('click', (event) => {
            if (!languageToggle.contains(event.target) && !languageMenu.contains(event.target)) {
                languageMenu.classList.add('hidden');
            }
        });

        const savedLanguage = localStorage.getItem('misjhon-language') || 'es';
        changeLanguage(savedLanguage);
    }
    window.changeLanguage = function (lang) {
        if (!languages[lang]) {
            console.error('Language not supported:', lang);
            return;
        }

        const currentFlag = document.getElementById('current-flag');
        const currentLang = document.getElementById('current-lang');
        const languageMenu = document.getElementById('language-menu');

        if (currentFlag) {
            currentFlag.src = getFlagPath(languages[lang].flag);
            currentFlag.alt = languages[lang].name;
        }

        if (currentLang) {
            currentLang.textContent = lang.toUpperCase();
        }

        applyTranslations(lang);

        localStorage.setItem('misjhon-language', lang);

        document.documentElement.lang = lang;

        if (languageMenu) {
            languageMenu.classList.add('hidden');
        }
    };
    function applyTranslations(lang) {
        if (!window.translations || !window.translations[lang]) {
            console.warn('Translations not loaded for language:', lang);
            return;
        }

        const langData = window.translations[lang];

        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (langData[key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    if (element.type === 'submit' || element.type === 'button') {
                        element.value = langData[key];
                    } else {
                        element.placeholder = langData[key];
                    }
                } else {
                    element.textContent = langData[key];
                }
            }
        });

        if (langData.home_title) {
            document.title = langData.home_title;
        }
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (langData[key]) {
                element.placeholder = langData[key];
            }
        });

        document.querySelectorAll('[data-translate-value]').forEach(element => {
            const key = element.getAttribute('data-translate-value');
            if (langData[key]) {
                element.value = langData[key];
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLanguageSelector);
    } else {
        initLanguageSelector();
    }

})();
