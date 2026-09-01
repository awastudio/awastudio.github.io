let currentLanguage = 'en';

let englishContent = {
    subtitle: '',
    heroText: '',
    featuresTitle: '',
    featuresGrid: '',
    whyPlayTitle: '',
    whyPlayList: '',
    communityTitle: '',
    ctaTitle: '',
    ctaText: '',
    documentTitle: ''
};

document.addEventListener('DOMContentLoaded', function() {
    saveEnglishContent();

    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = navigator.language.toLowerCase().startsWith('pt')
        ? 'pt-br'
        : 'en';

    const initialLang =
        savedLang === 'pt-br' || savedLang === 'en'
            ? savedLang
            : browserLang;

    const langSelect = document.getElementById('lang-select');

    if (langSelect) {
        langSelect.value = initialLang;
    }

    if (initialLang === 'pt-br') {
        loadPortuguese();
    } else {
        loadEnglish();
    }
});

function saveEnglishContent() {
    englishContent.subtitle =
        document.getElementById('subtitle')?.textContent || '';

    englishContent.heroText =
        document.getElementById('hero-text')?.textContent || '';

    englishContent.featuresTitle =
        document.getElementById('features-title')?.textContent || '';

    englishContent.featuresGrid =
        document.getElementById('features-grid')?.innerHTML || '';

    englishContent.whyPlayTitle =
        document.getElementById('why-play-title')?.textContent || '';

    englishContent.whyPlayList =
        document.getElementById('why-play-list')?.innerHTML || '';

    englishContent.communityTitle =
        document.getElementById('community-title')?.textContent || '';

    englishContent.ctaTitle =
        document.getElementById('cta-title')?.textContent || '';

    englishContent.ctaText =
        document.getElementById('cta-text')?.textContent || '';

    englishContent.documentTitle = document.title;
}

function switchLanguage(lang) {
    if (lang !== 'en' && lang !== 'pt-br') {
        return;
    }

    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);

    const langSelect = document.getElementById('lang-select');

    if (langSelect) {
        langSelect.value = lang;
    }

    if (lang === 'pt-br') {
        loadPortuguese();
    } else {
        loadEnglish();
    }
}

function loadEnglish() {
    currentLanguage = 'en';

    document.documentElement.lang = 'en';

    const subtitle = document.getElementById('subtitle');
    const heroText = document.getElementById('hero-text');
    const featuresTitle = document.getElementById('features-title');
    const featuresGrid = document.getElementById('features-grid');
    const whyPlayTitle = document.getElementById('why-play-title');
    const whyPlayList = document.getElementById('why-play-list');
    const communityTitle = document.getElementById('community-title');
    const ctaTitle = document.getElementById('cta-title');
    const ctaText = document.getElementById('cta-text');

    if (subtitle) {
        subtitle.textContent = englishContent.subtitle;
    }

    if (heroText) {
        heroText.textContent = englishContent.heroText;
    }

    if (featuresTitle) {
        featuresTitle.textContent = englishContent.featuresTitle;
    }

    if (featuresGrid) {
        featuresGrid.innerHTML = englishContent.featuresGrid;
    }

    if (whyPlayTitle) {
        whyPlayTitle.textContent = englishContent.whyPlayTitle;
    }

    if (whyPlayList) {
        whyPlayList.innerHTML = englishContent.whyPlayList;
    }

    if (communityTitle) {
        communityTitle.textContent = englishContent.communityTitle;
    }

    if (ctaTitle) {
        ctaTitle.textContent = englishContent.ctaTitle;
    }

    if (ctaText) {
        ctaText.textContent = englishContent.ctaText;
    }

    updatePlayStoreBadges('en');

    document.title = englishContent.documentTitle;
}


async function loadPortuguese() {
    try {
        const response = await fetch('content/pt-br.json');

        if (!response.ok) {
            throw new Error(
                `HTTP error! status: ${response.status}`
            );
        }

        const data = await response.json();

        currentLanguage = 'pt-br';

        document.documentElement.lang = 'pt-BR';

        const subtitle = document.getElementById('subtitle');
        const heroText = document.getElementById('hero-text');
        const featuresTitle = document.getElementById('features-title');
        const featuresGrid = document.getElementById('features-grid');
        const whyPlayTitle = document.getElementById('why-play-title');
        const whyPlayList = document.getElementById('why-play-list');
        const communityTitle = document.getElementById('community-title');
        const ctaTitle = document.getElementById('cta-title');
        const ctaText = document.getElementById('cta-text');

        if (subtitle) {
            subtitle.textContent = data.subtitle;
        }

        if (heroText) {
            heroText.textContent = data.heroText;
        }

        if (featuresTitle) {
            featuresTitle.textContent = data.featuresTitle;
        }

        if (whyPlayTitle) {
            whyPlayTitle.textContent = data.whyPlayTitle;
        }

        if (communityTitle) {
            communityTitle.textContent = data.communityTitle;
        }

        if (ctaTitle) {
            ctaTitle.textContent = data.ctaTitle;
        }

        if (ctaText) {
            ctaText.textContent = data.ctaText;
        }


        if (featuresGrid) {
            featuresGrid.innerHTML = '';

            if (Array.isArray(data.features)) {
                data.features.forEach(feature => {
                    const card = document.createElement('div');
                    card.className = 'feature-card';

                    const title = document.createElement('h3');
                    title.textContent =
                        `${feature.icon} ${feature.title}`;

                    const description = document.createElement('p');
                    description.textContent = feature.description;

                    card.appendChild(title);
                    card.appendChild(description);

                    featuresGrid.appendChild(card);
                });
            }
        }


        if (whyPlayList) {
            whyPlayList.innerHTML = '';

            if (Array.isArray(data.whyPlayItems)) {
                data.whyPlayItems.forEach(item => {
                    const listItem = document.createElement('li');

                    listItem.innerHTML = item;

                    whyPlayList.appendChild(listItem);
                });
            }
        }

        updatePlayStoreBadges('pt-br');

        document.title =
            `Idle Crypto Tycoon - ${data.subtitle}`;

    } catch (error) {
        console.error(
            'Error loading Portuguese homepage content:',
            error
        );

        loadEnglish();

        const langSelect =
            document.getElementById('lang-select');

        if (langSelect) {
            langSelect.value = 'en';
        }
    }
}


function updatePlayStoreBadges(lang) {
    const badgeHero =
        document.getElementById('play-badge-hero');

    const badgeCta =
        document.getElementById('play-badge-cta');

    const badgeImage =
        lang === 'pt-br'
            ? 'images/google-play-badge-pt.png'
            : 'images/google-play-badge-en.png';

    const badgeAlt =
        lang === 'pt-br'
            ? 'Disponível no Google Play'
            : 'Get it on Google Play';

    if (badgeHero) {
        badgeHero.src = badgeImage;
        badgeHero.alt = badgeAlt;
    }

    if (badgeCta) {
        badgeCta.src = badgeImage;
        badgeCta.alt = badgeAlt;
    }
}
