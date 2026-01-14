let currentLanguage = 'en';

document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = navigator.language.startsWith('pt') ? 'pt-br' : 'en';
    const initialLang = savedLang || browserLang; // ← Usa navegador
    
    loadDocument(initialLang);
    document.getElementById('lang-select').value = initialLang;
});


function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang); // Salva preferência
    loadDocument(lang);
    
    document.getElementById('lang-select').value = lang;
    document.documentElement.lang = lang;
}

async function loadDocument(lang) {
    try {
        const response = await fetch(`content/${lang}.json`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Atualiza título da página
        document.getElementById('subtitle').textContent = data.pageTitle;
        document.title = `${data.pageTitle} - Idle Crypto Tycoon`;
        
        // Atualiza data de atualização
        document.getElementById('last-updated').textContent = `📅 ${data.lastUpdated}`;
        
        // Gera conteúdo HTML
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
        
        document.getElementById('main-content').innerHTML = contentHTML;
        
    } catch (error) {
        console.error('Error loading document:', error);
        document.getElementById('main-content').innerHTML = 
            `<p style="color: #f87171;">Error loading content. Please reload the page.</p>`;
    }
}
