document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.querySelector('.language-select');
  
    // Load translations
    fetch('resetpassword.json')
        .then(response => response.json())
        .then(translations => {
            function updateTextsAndDirection(language) {
                document.getElementById('mail').textContent = translations[language].mail;
                document.getElementById('codee').textContent = translations[language].codee;
                document.getElementById('newPassword').textContent = translations[language].newPassword;
                document.getElementById('changePass').textContent = translations[language].changePass;
                document.getElementById('loginBtn').textContent = translations[language].loginBtn;
            


                if (language === 'ar') {
                    document.documentElement.setAttribute('dir', 'rtl');
                } else {
                    document.documentElement.setAttribute('dir', 'ltr');
                }
            }

            // Get language from localStorage or default to 'ar'
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


