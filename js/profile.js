function updateLoginStatus() {
    let logoutNavItem = document.getElementById("navItem1");
    let loginNavItem = document.getElementById("navItem2");
    let userToken = localStorage.getItem('usertoken');

    if (userToken) {
        logoutNavItem.classList.remove("d-none");
        logoutNavItem.classList.add("d-block");

        loginNavItem.classList.remove("d-block");
        loginNavItem.classList.add("d-none");
    } else {
        logoutNavItem.classList.remove("d-block");
        logoutNavItem.classList.add("d-none");

        loginNavItem.classList.remove("d-none");
        loginNavItem.classList.add("d-block");
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    updateLoginStatus();
});




function loadTranslations() {
    return fetch('profile.json')
        .then(response => response.json());
}

function applyTranslations(translations, language) {
    const elementsToTranslate = document.querySelectorAll('[data-translate]');

    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });

    if (language === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.querySelector('.language-select');

    function updateTextsAndDirection(language) {
        loadTranslations().then(translations => {
            applyTranslations(translations, language);

            // If you have specific elements to update directly, do it here
            // Example:
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
            document.getElementById('personal').textContent = translations[language].personal;

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
            document.getElementById('chooice').textContent = translations[language].chooice;



        });
    }

    // Initialize with stored or default language
    const storedLanguage = localStorage.getItem('language') || 'en';
    updateTextsAndDirection(storedLanguage);
    languageSelect.value = storedLanguage;

    languageSelect.addEventListener('change', function() {
        const selectedLanguage = this.value;
        console.log('Language changed to:', selectedLanguage);
        localStorage.setItem('language', selectedLanguage);
        updateTextsAndDirection(selectedLanguage);
    });
});



async function bookingData() {
    try {
        let token = localStorage.getItem("usertoken");
        let response = await axios.get('https://test-2-lbcq.onrender.com/rent/getCurrentuserRents', {
            headers: {
                token: token
            }
        });
        let bookingsContainer = document.getElementById('bookings');
        if (response.data && response.data.User && response.data.User.length > 0) {
            for (let booking of response.data.User) {
                let bookingElement = document.createElement('div');
                bookingElement.className = 'col-md-12 bg-main-color rounded-3 d-flex justify-content-between flex-column mb-3';
                bookingElement.id = `booking-${booking._id}`;
                bookingElement.innerHTML = `
                    <div class="top py-3 px-3 dataRent d-flex justify-content-between" id="profile">
                        <div class="w-50 p-2 d-flex justify-content-start flex-column">
                            <div class="text-white mb-2 fs-5">
                                <span class="fw-bold" data-translate="orderNumber">رقم الطلب : </span>
                                <span>${booking.rentalCode}</span>
                            </div>
                            <div class="text-white mb-2 fs-5">
                                <span class="fw-bold" data-translate="name">الاسم : </span>
                                <span>${booking.firstName} ${booking.lastName}</span>
                            </div>
                            <div class="text-white mb-2 fs-5">
                                <span class="fw-bold" data-translate="price">السعر : </span>
                                <span>${booking.price}</span>
                            </div>
                            <div class="text-white mb-2 fs-5">
                                <span class="fw-bold" data-translate="serviceDate">تاريخ الخدمة : </span>
                                <span>${booking.rentDate}</span>
                            </div>
                            <div class="text-white mb-2 fs-5">
                                <span class="fw-bold" data-translate="carName">اسم السيارة : </span>
                                <span>${booking.car}</span>
                            </div>
                        </div>
                        <div class="w-50 p-2 d-flex justify-content-start flex-column">
                            <div class="text-white mb-2 fs-5">
                                <span class="fw-bold" data-translate="phone">الهاتف:</span>
                                <span>${booking.phone}</span>
                            </div>
                            <div class="text-white mb-2 fs-5">
                                <span class="fw-bold" data-translate="pickupPoint">نقطة الاقلال : </span>
                                <span>${booking.startingPoint}</span>
                            </div>
                            <div class="text-white mb-2 fs-5">
                                <span class="fw-bold" data-translate="dropoffPoint">نقطة النزول : </span>
                                <span>${booking.arrivalPoint}</span>
                            </div>
                            <div class="text-white mb-2 fs-5">
                                <span class="fw-bold" data-translate="numberOfPeople">عدد الاشخاص : </span>
                                <span>${booking.capacity}</span>
                            </div>
                        </div>
                    </div>
                    <div class="text-white w-25 text-center mb-2 fw-bold bg-success p-2 d-flex justify-content-start flex-column" data-translate="status">
                        ${booking.status}
                    </div>
                `;
                bookingsContainer.appendChild(bookingElement);
            }
            updatePageTranslations(); // Apply translations to the new elements
        } else {
            // console.log('No bookings found');
        }
    } catch (err) {
        // console.error('Error:', err);
    }
}

function updatePageTranslations() {
    let lang = localStorage.getItem('language') || 'en';
    loadTranslations().then(translations => {
        applyTranslations(translations, lang);
    });
}




// imgage for profile
async function selectImage() {
    const fileInput = document.getElementById('file-input');
    fileInput.click();

    fileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('pp', file);

            try {
                const response = await axios.post('https://test-2-lbcq.onrender.com/user/pic', formData, {
                    headers: {
                        token: localStorage.getItem("usertoken")
                    }
                });

                // Display the uploaded image URL if available
                if (response.data && response.data.secure_url) {
                    document.getElementById('preview-image').src = response.data.secure_url;
                } else {
                    console.error('Unexpected response structure:', response.data);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    });
}

function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const previewImage = document.getElementById('preview-image');
            previewImage.src = event.target.result;
        };

        reader.readAsDataURL(file);
    }
}

const fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', previewImage);



async function userImage() {
    let image=document.getElementById('personphoto')
    try {
        let token = localStorage.getItem("usertoken");
        let response = await axios.get('https://test-2-lbcq.onrender.com/user/currentUserProfile', {
            headers: {
                token: token
            }
        });
        image.innerHTML=`
        <div class="image-preview overflow-hidden">
                    <img id="preview-image" src="${response.data.User.profileImage?.secure_url}" alt="أضف صورتك الشخصية">
       </div>`
    }catch (err) {
        console.error('Error:', err);
    }
}

async function userData() {
    let data=document.getElementById('userData')
    try {
        let token = localStorage.getItem("usertoken");
        let response = await axios.get('https://test-2-lbcq.onrender.com/user/currentUserProfile', {
            headers: {
                token: token
            }
        });
        data.innerHTML=`
        <div class="data-user flex-fill">
                        <h3 class="fs-4"><span class="fw-bold " data-translate="Name">الاسم: </span> <span>${response.data.User.userName}</span></h3>
                        <div class=" d-flex flex-column gap-1">
                            <p class="fs-6">
                                <span class="fw-bold" data-translate="Email">الايميل: </span> 
                                <span>${response.data.User.email}</span> 
                            </p>
                            <p class="fs-6">
                                <span class="fw-bold" data-translate="Phone">الهاتف المحمول: </span>
                                <span>${response.data.User.phone}</span> 
                            </p>
                        </div>
                    </div>
                    <div class="address bg-body-secondary d-flex align-items-center gap-2 justify-content-center p-2 rounded mb-2">
                        <i class="fa-solid fa-location-dot main-color"></i>
                        <p class="fs-6">  ${response.data.User.addresses} </p>
                    </div>
    `      
    updatePageTranslations(); 

    } 
    catch (err) {
        console.error('Error:', err);
    }
}

window.onload = function() {
    bookingData();

    userData();
    userImage()

};

