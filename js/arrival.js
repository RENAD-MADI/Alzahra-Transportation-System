document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.querySelector('.language-select');
    
    // Load translations
    fetch('arrival.json')
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
                document.getElementById('complett').textContent = translations[language].complett;
                document.getElementById('desc').textContent = translations[language].desc;
                document.getElementById('address').textContent = translations[language].address;
                document.getElementById('Services').textContent = translations[language].Services;
                document.getElementById('book2').textContent = translations[language].book2;
                // document.getElementById('orderNumber').textContent = translations[language].orderNumber;
                document.getElementById('about2').textContent = translations[language].about2;
                document.getElementById('opinion2').textContent = translations[language].opinion2;
                document.getElementById('questions2').textContent = translations[language].questions2;
                document.getElementById('contact2').textContent = translations[language].contact2;
                document.getElementById('footing').textContent = translations[language].footing;
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
                console.log('Language changed to:', selectedLanguage); 
                localStorage.setItem('language', selectedLanguage);
                updateTextsAndDirection(selectedLanguage);
            });
        })
});

async function loadTranslations() {
    const contentResponse = await fetch('arrival.json');
    const translations = await contentResponse.json();

    const storedLanguage = localStorage.getItem('language') || 'ar';
    const successMessage = translations[storedLanguage];

    return successMessage;
}

function updateTexts(successMessage) {
    document.getElementById('orderNumber').textContent = successMessage.orderNumber;
    document.getElementById('carType').textContent = successMessage.carType;
    document.getElementById('startingPoint').textContent = successMessage.startingPoint;
    document.getElementById('arrivalPoint').textContent = successMessage.arrivalPoint;
    document.getElementById('totalPrice').textContent = successMessage.totalPrice;
    document.getElementById('heading').textContent = successMessage.heading;
    document.getElementById('paymentMethod').textContent = successMessage.paymentMethod;
    document.getElementById('instructions').textContent = successMessage.instructions;
    document.getElementById('whatsappLink').href = successMessage.whatsappLink;
    document.getElementById('returnButton').textContent = successMessage.returnButton;

    if (localStorage.getItem('language') === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
}

async function changeLanguage(language) {
    localStorage.setItem('language', language);
    const successMessage = await loadTranslations();
    updateTexts(successMessage);
}
