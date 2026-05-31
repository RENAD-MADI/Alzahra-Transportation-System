document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.querySelector('.language-select');
    
    // Load translations
    fetch('register.json')
        .then(response => response.json())
        .then(translations => {
            function updateTextsAndDirection(language) {
                document.getElementById('heading').textContent = translations[language].heading;
                document.getElementById('namee').textContent = translations[language].namee;
                document.getElementById('usernameAlert').textContent = translations[language].usernameAlert;
                document.getElementById('emaile').textContent = translations[language].emaile;
                document.getElementById('userEmailAlert').textContent = translations[language].userEmailAlert;
                document.getElementById('pass').textContent = translations[language].pass;
                document.getElementById('userPasswordAlert').textContent = translations[language].userPasswordAlert;
                document.getElementById('agee').textContent = translations[language].agee;
                document.getElementById('userAgeAlert').textContent = translations[language].userAgeAlert;
                document.getElementById('phonee').textContent = translations[language].phonee;
                document.getElementById('userPhoneAlert').textContent = translations[language].userPhoneAlert;
                document.getElementById('addressss').textContent = translations[language].addressss;
                document.getElementById('userAddressAlert').textContent = translations[language].userAddressAlert;
                document.getElementById('genderr').textContent = translations[language].genderr;
                document.getElementById('maleLabel').innerText = translations[language].maleLabel;
                document.getElementById('femaleLabel').innerText = translations[language].femaleLabel;
                document.getElementById('confirmMsg').textContent = translations[language].confirmMsg;
                document.getElementById('accountExistMsg').textContent = translations[language].accountExistMsg;
                document.getElementById('tryAgainMsg').textContent = translations[language].tryAgainMsg;
                document.getElementById('signupBtn').textContent = translations[language].signupBtn;
                document.getElementById('signin').textContent = translations[language].signin;
                document.getElementById('haveEmailLabel').childNodes[0].nodeValue = translations[language].haveEmailLabel + ' ';
                document.getElementById('loginLink').innerText = translations[language].loginLink;


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


