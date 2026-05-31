

async function loadCategories() {
    try {
        const response = await axios.get('https://test-2-lbcq.onrender.com/category');
        const categories = response.data.cat; 
        const placesDiv = document.querySelector('.places');
        placesDiv.innerHTML = ''; 
        categories.forEach((category, index) => {
            const button = document.createElement('button');
            button.className = 'btn buttonOne';
            button.textContent = category.name; 
            button.onclick = () => handleCategoryClick(category._id);  
            placesDiv.appendChild(button);
            if (index === 0) {
                handleCategoryClick(category._id);
            }
        });
    } catch (error) {
        // console.error('حدث خطأ أثناء تحميل الفئات:', error);
        // alert('حدث خطأ أثناء تحميل الفئات. حاول مرة أخرى.');
    }
}

async function handleCategoryClick(categoryId) {
    try {
        const response = await axios.get(`https://test-2-lbcq.onrender.com/car/carByCatId/${categoryId}`);
        const cars = response.data.car;
        const dataContentDiv = document.getElementById('data-content-car');
        let htmlContent = ''; 
        cars.forEach(car => {
            htmlContent += `
                <div class="col">
                    <div class="card border-0 data" id="data">
                        <div class="d-flex flex-column p-3">
                            <div class="image">
                                <a  onclick="storeCarId('${car._id}', '${car.prices}', '${car.name}')">
                                    <img src="${car.carImage[0].secure_url}" alt="Car Image" class="w-100">
                                </a>
                            </div>
                            <div class="text">
                                <div class="txt">
                                    <h1 class="my-2 p-0"><a href="Car.html" class="main-color">${car.name}</a></h1>
                                    <p class="dark-color fw-bold">${car.description}</p>
                                    <p class="dark-color fw-bold">عدد الأشخاص:${car.capacity}</p>
                                </div>
                                <div class="price d-flex align-items-center justify-content-between">
                                    <span class="fw-bold main-color">${car.prices} ريال</span>
                                    <button class="btn booknowBtn" id="bookingBtn"  onclick="storeCarIdAndRedirect('${car._id}', '${car.prices}', '${car.name}')"><a>احجز الان</a></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
        });
        dataContentDiv.innerHTML = htmlContent;

    } catch (error) {
        console.error('حدث خطأ أثناء جلب بيانات السيارات:', error);
        alert('حدث خطأ أثناء جلب بيانات السيارات. حاول مرة أخرى.');
    }
}
function storeCarId(carId,price,name) {
    localStorage.setItem('selectedCarId', carId);
    localStorage.setItem('carPrice', price);
    localStorage.setItem('carType', name);
}



function storeCarIdAndRedirect(carId,price,name) {
    storeCarId(carId,price,name);

    if(localStorage.getItem('usertoken')!=null){
        window.location.href = '../Car.html';
    }
    else{
        window.location.href = '../login.html';

    }
}
async function loadCategoriesData() {
    let carId = localStorage.getItem('selectedCarId');
    try {
        const response = await axios.get(`https://test-2-lbcq.onrender.com/car/carById/${carId}`);
        document.getElementById('price').value = response.data.car.prices;
        document.getElementById('car').value = response.data.car.name;

        const placesDiv = document.querySelector('.info');
        let htmlContent = ''; 
        htmlContent .innerHTML = '';
        htmlContent +=`
            <p class="demo fs-5" id="One">${response.data.car.description} </p>
            <span class="fs-6" id="big"><span class="one" id="Two">الفئة: </span> ${response.data.car.addresses} </span>
            <p class="fs-6" id="big2"> <span class="one" id="Three">نوع السيارة : </span>${response.data.car.name}</p>
            <p class="fs-6" id="big4"> <span class="one" id="Six">السعر : </span>  ${response.data.car.prices} ريال</p>
        `
        placesDiv.innerHTML=htmlContent;
        
        
    
    } catch (error) {
        // console.error('حدث خطأ أثناء تحميل الفئات:', error);
        // alert('حدث خطأ أثناء تحميل الفئات. حاول مرة أخرى.');
    }
}


async function loadCategoriesImage() {
    const carId = localStorage.getItem('selectedCarId');
    try {
        const response = await axios.get(`https://test-2-lbcq.onrender.com/car/carById/${carId}`);
        const images = response.data.car.carImage;
        console.log(images);
        const data = document.querySelector('.swiper-container-wrapper');
        let htmlContent = '';
        let imageSlides = '';
        let thumbnailSlides = '';
        images.forEach(image => {
            imageSlides += `
                <swiper-slide>
                    <img src="${image.secure_url}" alt="Car Image" />
                </swiper-slide>`;
            thumbnailSlides += `
                <swiper-slide>
                    <img src="${image.secure_url}" alt="Car Image" />
                </swiper-slide>`;
        });
        htmlContent += `
            <swiper-container
                style="
                --swiper-navigation-color: #fff;
                --swiper-pagination-color: #fff;
                "
                class="mySwiper"
                thumbs-swiper=".mySwiper2"
                space-between="10"
                navigation="true"
            >
                ${imageSlides}
            </swiper-container>
            <swiper-container
                class="mySwiper2 mt-2"
                space-between="10"
                slides-per-view="4"
                free-mode="true"
                watch-slides-progress="true"
            >
                ${thumbnailSlides}
            </swiper-container>
        `;

        data.innerHTML = htmlContent;
        const swiper = new Swiper('.mySwiper', {
            navigation: true,
            thumbs: {
                swiper: new Swiper('.mySwiper2', {
                    slidesPerView: 3,
                    spaceBetween: 10,
                    freeMode: true,
                    watchSlidesProgress: true,
                })
            }
        });

    } catch (error) {
        // console.error('حدث خطأ أثناء جلب بيانات السيارة:', error);
        // alert('حدث خطأ أثناء جلب بيانات السيارة. حاول مرة أخرى.');
    }
}




async function completeBooking() {
    let carPrice = localStorage.getItem('carPrice');
    let carType = localStorage.getItem('carType');
    let firstName = document.getElementById('Fname').value;
    let lastName = document.getElementById('Lname').value;
    let email = document.getElementById('emailInput').value;
    let phone = document.getElementById('phoneInput').value;
    let time = document.getElementById('TimeInput').value;
    let date = document.getElementById('Date').value;
    let address = document.getElementById('addersesss').value;
    let fPlace = document.getElementById('fPlacee').value;
    let lPlace = document.getElementById('lPlacee').value;
    let personNum = document.getElementById('num').value;
    let returnDate = document.getElementById('datee').value;
    document.getElementById('price').value = carPrice;
    document.getElementById('car').value = carType;
    let rentDateObj = new Date(date);
    let returnDateObj = new Date(returnDate);
    
    if (returnDateObj <= rentDateObj) {
        document.getElementById('returnDateAlert').style.display = 'block'; 
        return; 
    } else {
        document.getElementById('returnDateAlert').style.display = 'none'; 
    }

    let completeData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        Time: time,
        rentDate: date,
        address: address,
        startingPoint: fPlace,
        arrivalPoint: lPlace,
        backDate: returnDate,
        capacity: personNum,
        price: carPrice,
        car: carType
    };
    console.log(carPrice)
    console.log(carType)

    var inputs = document.querySelectorAll('input[required]');
    var allFilled = true;
    inputs.forEach(function(input) {
        if (!input.value) {
            allFilled = false;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid'); 
        }
    });
    if (!allFilled) {
        alert('من فضلك يرجي ادخال البيانات المطلوبه');
        return; 
    }

    try {
        let response = await axios.post('https://test-2-lbcq.onrender.com/rent/addRent', completeData, {
            headers: {
                token: localStorage.getItem("usertoken")
            }
        });
        console.log(response)
        if (response.data.message === "Rent created successfully") {
            document.getElementById('success-alert').classList.replace('d-none', 'd-block');
            window.location.href = '/payment.html';
            setTimeout(function() {
                document.getElementById('success-alert').classList.replace('d-block', 'd-none');
            }, 3000);
        }
        localStorage.setItem('userID', response.data.rent.addedBy);
        localStorage.setItem('bookingId', response.data.rent._id);
        console.log(response.data);
    } catch (err) {
        console.error("Error details:", err.response ? err.response.data : err);
    }
}



function validateInput(input) {
    let regex;
    let minLength = 2;
    switch (input.id) {
        case 'Fname':
        case 'Lname':
            regex = /^[a-zA-Z\u0600-\u06FF\s]+$/;
            if (!regex.test(input.value) || input.value.length < minLength) {
                return false;
            }
            break;
        case 'emailInput':
            regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(input.value)) {
                return false;
            }
            break;
        case 'phone':
            const phoneRegex = /^((\+966|966|0)?5\d{8})$/;
            if (!phoneRegex.test(input.value)) {
                return false;
            }
            break;
        case 'addersess':
        case 'fPlace':
        case 'lPlace':
            if (input.value.trim().length < minLength) {
                return false;
            }
            break;
        default:
            if (input.value.trim() === '') {
                return false;
            }
    }
    return true;
}





window.onload = function() {
    loadCategories();
    loadCategoriesData()
    loadCategoriesImage() 
};