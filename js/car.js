document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.querySelector('.language-select');
    
    // Load translations
    fetch('car.json')
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
                document.getElementById('Head').textContent = translations[language].Head;




                document.getElementById('FirstName').textContent = translations[language].FirstName;
                document.getElementById('fnameAlert').textContent = translations[language].fnameAlert;
                document.getElementById('lastName').textContent = translations[language].lasttName;
                document.getElementById('lnameAlert').textContent = translations[language].lnameAlert;
                document.getElementById('Email').textContent = translations[language].Email;
                document.getElementById('phone').textContent = translations[language].phone;
                document.getElementById('PhoneAlert').textContent = translations[language].PhoneAlert;
                document.getElementById('Time').textContent = translations[language].Time;
                document.getElementById('date').textContent = translations[language].date;
                document.getElementById('addresss').textContent = translations[language].addresss;
                document.getElementById('AddressAlert').textContent = translations[language].AddressAlert;
                document.getElementById('fplace').textContent = translations[language].fplace;
                document.getElementById('lplacee').textContent = translations[language].lplacee;
                document.getElementById('lAddressAlert').textContent = translations[language].lAddressAlert;

                document.getElementById('fAddressAlert').textContent = translations[language].fAddressAlert;
                document.getElementById('numPerson').textContent = translations[language].numPerson;
                document.getElementById('returnDate').textContent = translations[language].returnDate;

                document.getElementById('returnDateAlert').textContent = translations[language].returnDateAlert;
                document.getElementById('pricee').textContent = translations[language].pricee;
                document.getElementById('type').textContent = translations[language].type;
                document.getElementById('submitBtn').textContent = translations[language].submitBtn;




                document.getElementById('Placee').textContent = translations[language].Placee;
                
                document.getElementById('desc').textContent = translations[language].desc;
                document.getElementById('address').textContent = translations[language].address;
                document.getElementById('Services').textContent = translations[language].Services;
                document.getElementById('book2').textContent = translations[language].book2;


                document.getElementById('about2').textContent = translations[language].about2;
                document.getElementById('opinion2').textContent = translations[language].opinion2;
                document.getElementById('questions2').textContent = translations[language].questions2;
                document.getElementById('contact2').textContent = translations[language].contact2;
                document.getElementById('footing').textContent = translations[language].footing;
                document.getElementById('login').textContent = translations[language].login;


        


        
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


