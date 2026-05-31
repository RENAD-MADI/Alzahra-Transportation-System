document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.querySelector('.language-select');
    
    // Load translations
    fetch('translations.json')
        .then(response => response.json())
        .then(translations => {
            // Function to update texts and direction
            function updateTextsAndDirection(language) {
                // Update header texts
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
                document.querySelector('#content span').textContent = translations[language].welcome_message;
                document.querySelector('#content h1').textContent = translations[language].company_name;
                document.querySelector('.item:nth-child(1)').textContent = translations[language].item_1;
                document.querySelector('.item:nth-child(2)').textContent = translations[language].item_2;
                document.querySelector('.item:nth-child(3)').textContent = translations[language].item_3;
                document.querySelector('.item:nth-child(4)').textContent = translations[language].item_4;
                document.querySelector('.item:nth-child(5)').innerHTML = `${translations[language].item_5} <a href="#booking" class="second-color">${translations[language].click_here}</a>`;
                document.querySelector('#booking .heading h1').textContent = translations[language].booking_heading;
                document.querySelector('#card-section p').textContent = translations[language].choose_destination;

                document.getElementById('services_heading').textContent = translations[language].services_heading;
                document.getElementById('service1').textContent = translations[language].service1;
                document.getElementById('service2').textContent = translations[language].service2;
                document.getElementById('service3').textContent = translations[language].service3;
                document.getElementById('service4').textContent = translations[language].service4;
                document.getElementById('service5').textContent = translations[language].service5;
                document.getElementById('service6').textContent = translations[language].service6;
                document.getElementById('login').textContent = translations[language].login;

                document.getElementById('About').textContent = translations[language].About;
                document.getElementById('icon1').textContent = translations[language].icon1;
                document.getElementById('head1').textContent = translations[language].head1;
                document.getElementById('para1').textContent = translations[language].para1;

                document.getElementById('icon2').textContent = translations[language].icon2;
                document.getElementById('head2').textContent = translations[language].head2;
                document.getElementById('para2').textContent = translations[language].para2;
                document.getElementById('icon3').textContent = translations[language].icon3;
                document.getElementById('head3').textContent = translations[language].head3;
                document.getElementById('txt1').textContent = translations[language].txt1;
                document.getElementById('txt2').textContent = translations[language].txt2;
                document.getElementById('txt3').textContent = translations[language].txt3;
                document.getElementById('txt4').textContent = translations[language].txt4;

                document.getElementById('Opinion').textContent = translations[language].Opinion;
                document.getElementById('name').textContent = translations[language].name;
                document.getElementById('description').textContent = translations[language].description;
                document.getElementById('name1').textContent = translations[language].name1;
                document.getElementById('description1').textContent = translations[language].description1;
                document.getElementById('commonquestions').textContent = translations[language].commonquestions;



                document.getElementById('Book').textContent = translations[language].Book;
                document.getElementById('itm1').textContent = translations[language].itm1;
                document.getElementById('itm2').textContent = translations[language].itm2;
                document.getElementById('itm3').textContent = translations[language].itm3;
                document.getElementById('itm4').textContent = translations[language].itm4;
                document.getElementById('how1').textContent = translations[language].how1;
                document.getElementById('how2').textContent = translations[language].how2;
                document.getElementById('itm5').textContent = translations[language].itm5;
                document.getElementById('itm6').textContent = translations[language].itm6;
                document.getElementById('itm7').textContent = translations[language].itm7;
                document.getElementById('itm8').textContent = translations[language].itm8;
                document.getElementById('itm9').textContent = translations[language].itm9;
                document.getElementById('itmm').textContent = translations[language].itmm;

                document.getElementById('two').textContent = translations[language].two;
                document.getElementById('how3').textContent = translations[language].how3;
                document.getElementById('twoo').textContent = translations[language].twoo;
                document.getElementById('three').textContent = translations[language].three;
                document.getElementById('four').textContent = translations[language].four;
                document.getElementById('five').textContent = translations[language].five;
                document.getElementById('how4').textContent = translations[language].how4;
                document.getElementById('six').textContent = translations[language].six;
                document.getElementById('seven').textContent = translations[language].seven;

                document.getElementById('conyactUs').textContent = translations[language].conyactUs;
                document.getElementById('text').textContent = translations[language].text;
                document.getElementById('sub').textContent = translations[language].sub;
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
                document.getElementById('arabic').textContent = translations[language].arabic;

        


        
                // Update direction
                if (language === 'ar') {
                    document.documentElement.setAttribute('dir', 'rtl');
                    document.getElementById('Name').placeholder = 'الاسم:';
                    document.getElementById('Email').placeholder = 'البريد الالكتروني:';
                    document.getElementById('Message').placeholder = 'نص الرساله :';
                } else {
                    document.documentElement.setAttribute('dir', 'ltr');
                    document.getElementById('Name').placeholder = 'Name:';
                    document.getElementById('Email').placeholder = 'Email:';
                    document.getElementById('Message').placeholder = 'Message:';
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


