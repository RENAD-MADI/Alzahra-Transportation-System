document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.querySelector('.language-select');
    
    // Load translations
    fetch('payment.json')
        .then(response => response.json())
        .then(translations => {
            function updateTextsAndDirection(language) {
                document.getElementById('home').textContent = translations[language].home;
                document.getElementById('book').textContent = translations[language].book;
                document.getElementById('service').textContent = translations[language].service;
                document.getElementById('about').textContent = translations[language].about;
                document.getElementById('hotel').textContent = translations[language].hotel;
                document.getElementById('opinion').textContent = translations[language].opinion;
                document.getElementById('questions').textContent = translations[language].questions;
                document.getElementById('contact').textContent = translations[language].contact;
                document.getElementById('profile').textContent = translations[language].profile;
                document.getElementById('logout').textContent = translations[language].logout;
                document.getElementById('arabic').textContent = translations[language].arabic;
                document.getElementById('Placee').textContent = translations[language].Placee;

                document.getElementById('choice').textContent = translations[language].choice;
                document.getElementById('bankk').textContent = translations[language].bankk;
                document.getElementById('arrivall').textContent = translations[language].arrivall;
                document.getElementById('subBtn').textContent = translations[language].subBtn;
               
      


                document.getElementById('desc').textContent = translations[language].desc;
                document.getElementById('address').textContent = translations[language].address;
                document.getElementById('Services').textContent = translations[language].Services;
                document.getElementById('book2').textContent = translations[language].book2;


                document.getElementById('about2').textContent = translations[language].about2;
                document.getElementById('opinion2').textContent = translations[language].opinion2;
                document.getElementById('questions2').textContent = translations[language].questions2;
                document.getElementById('contact2').textContent = translations[language].contact2;
                document.getElementById('footing').textContent = translations[language].footing;

        


        
                // Update direction
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


