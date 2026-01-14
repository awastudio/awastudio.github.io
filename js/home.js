let currentLanguage = 'en';

document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = navigator.language.startsWith('pt') ? 'pt-br' : 'en';
    const initialLang = savedLang || browserLang;
    
    loadHomepage(initialLang);
    document.getElementById('lang-select').value = initialLang;
});

function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    loadHomepage(lang);
    
    document.getElementById('lang-select').value = lang;
    document.documentElement.lang = lang;
}

async function loadHomepage(lang) {
    try {
        const response = await fetch(`content/${lang}.json`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Atualiza textos
        document.getElementById('subtitle').textContent = data.subtitle;
        document.getElementById('hero-text').textContent = data.heroText;
        document.getElementById('features-title').textContent = data.featuresTitle;
        document.getElementById('why-play-title').textContent = data.whyPlayTitle;
        document.getElementById('community-title').textContent = data.communityTitle;
        document.getElementById('cta-title').textContent = data.ctaTitle;
        document.getElementById('cta-text').textContent = data.ctaText;
        
        // Atualiza Google Play Badges (NOVO - para trocar entre EN e PT-BR)
        const badgeHero = document.getElementById('play-badge-hero');
        const badgeCta = document.getElementById('play-badge-cta');
        const badgeImage = lang === 'pt-br' ? 'images/google-play-badge-pt.png' : 'images/google-play-badge-en.png';
        
        if (badgeHero) badgeHero.src = badgeImage;
        if (badgeCta) badgeCta.src = badgeImage;
        
        // Atualiza features
        const featuresGrid = document.getElementById('features-grid');
        featuresGrid.innerHTML = '';
        data.features.forEach(feature => {
            featuresGrid.innerHTML += `
                <div class="feature-card">
                    <h3>${feature.icon} ${feature.title}</h3>
                    <p>${feature.description}</p>
                </div>
            `;
        });
        
        // Atualiza why play
        const whyPlayList = document.getElementById('why-play-list');
        whyPlayList.innerHTML = '';
        data.whyPlayItems.forEach(item => {
            whyPlayList.innerHTML += `<li>${item}</li>`;
        });
        
        // Atualiza título
        document.title = `Idle Crypto Tycoon - ${data.subtitle}`;
        
    } catch (error) {
        console.error('Error loading homepage content:', error);
    }
}
