document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.querySelector('.language-select');
    
    // Load translations
    fetch('login.json')
        .then(response => response.json())
        .then(translations => {
            function updateTextsAndDirection(language) {
                document.getElementById('heading').textContent = translations[language].heading;
                document.getElementById('mail').textContent = translations[language].mail;
                document.getElementById('passwordd').textContent = translations[language].passwordd;
                document.getElementById('fillMsg').textContent = translations[language].fillMsg;
                document.getElementById('wrongMsg').textContent = translations[language].wrongMsg;
                document.getElementById('loginBtn').textContent = translations[language].loginBtn;
                document.getElementById('never').childNodes[0].nodeValue = translations[language].never + ' ';
                document.getElementById('login').innerText = translations[language].login;
                document.getElementById('forget').innerText = translations[language].forget;
                if (language === 'ar') {
                    document.documentElement.setAttribute('dir', 'rtl');
                } else {
                    document.documentElement.setAttribute('dir', 'ltr');
                }
            }
            const storedLanguage = localStorage.getItem('language') || 'en';
            updateTextsAndDirection(storedLanguage);
            languageSelect.value = storedLanguage;

            languageSelect.addEventListener('change', function() {
                const selectedLanguage = this.value;
                console.log('Language changed to:', selectedLanguage); // Debugging line
                localStorage.setItem('language', selectedLanguage);
                updateTextsAndDirection(selectedLanguage);
            });
        })
});


