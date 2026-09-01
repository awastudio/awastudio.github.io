let englishContent = '';
let englishSubtitle = '';
let englishLastUpdated = '';
let englishDocumentTitle = '';

document.addEventListener('DOMContentLoaded', function() {
    englishContent = document.getElementById('main-content').innerHTML;
    englishSubtitle = document.getElementById('subtitle').textContent;
    englishLastUpdated = document.getElementById('last-updated').textContent;
    englishDocumentTitle = document.title;

    const savedLang = localStorage.getItem('preferredLanguage');

    const browserLang =
        navigator.language.startsWith('pt') ? 'pt-br' : 'en';

    const initialLang = savedLang || browserLang;

    document.getElementById('lang-select').value = initialLang;

    if (initialLang === 'pt-br') {
        loadPortuguese();
    }
});

function switchLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);

    if (lang === 'pt-br') {
        loadPortuguese();
    } else {
        loadEnglish();
    }

    document.getElementById('lang-select').value = lang;
}

function loadEnglish() {
    document.documentElement.lang = 'en';

    document.getElementById('subtitle').textContent =
        englishSubtitle;

    document.getElementById('last-updated').textContent =
        englishLastUpdated;

    document.getElementById('main-content').innerHTML =
        englishContent;

    document.title = englishDocumentTitle;
}

async function loadPortuguese() {
    try {
        const response = await fetch('content/pt-br.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        document.documentElement.lang = 'pt-BR';

        document.getElementById('subtitle').textContent =
            data.pageTitle;

        document.title =
            `${data.pageTitle} - Idle Crypto Tycoon`;

        document.getElementById('last-updated').textContent =
            `📅 ${data.lastUpdated}`;

        let contentHTML = '';

        data.sections.forEach(section => {
            contentHTML += `<h2>${section.title}</h2>`;
            contentHTML += `<p>${section.content}</p>`;

            if (section.items) {
                contentHTML += '<ul>';

                section.items.forEach(item => {
                    contentHTML += `<li>${item}</li>`;
                });

                contentHTML += '</ul>';
            }
        });

        document.getElementById('main-content').innerHTML =
            contentHTML;

    } catch (error) {
        console.error('Error loading Portuguese document:', error);

        loadEnglish();

        document.getElementById('lang-select').value = 'en';
    }
}
