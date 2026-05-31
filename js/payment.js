
async function arrivalPayment() {
    const loadingSpinner = document.getElementById('loading');
    let container = document.getElementById('arrivalData');
    try {
        loadingSpinner.classList.remove('d-none');
        let token = localStorage.getItem("usertoken");
        let response = await axios.get('https://test-2-lbcq.onrender.com/rent/getCurrentuserRents', {
            headers: {
                token: token
            }
        });
        // console.log(response.data);
        loadingSpinner.classList.remove('d-none');
        if (response.data && response.data.User && response.data.User.length > 0) {
            let latestBooking = response.data.User[response.data.User.length - 1];
            container.innerHTML = `
                <div class="col-md-6">
                    <div class="mb-2 fs-5">
                        <span class="fw-bold">رقم الطلب : </span>
                        <span>${latestBooking.rentalCode}</span>
                    </div>
                    <div class="mb-2 fs-5">
                        <span class="fw-bold">نوع السيارة: </span>
                        <span>${latestBooking.car}</span>
                    </div>
                    <div class="mb-2 fs-5">
                        <span class="fw-bold">نقطة الاقلال  : </span>
                        <span>${latestBooking.startingPoint}</span>
                    </div>
                    <div class="mb-2 fs-5">
                        <span class="fw-bold">نقطة النزول : </span>
                        <span>${latestBooking.arrivalPoint}</span>
                    </div>
                    <div class="mb-2 fs-5">
                        <span class="fw-bold">السعر الاجمالي : </span>
                        <span>${latestBooking.price}</span>
                    </div>
                </div>
                <div class="col-md-6 left">
                    <h3 class="fw-bold main-color mb-2 ">شكرا لاستكمال طلبك!</h3>
                    <span class="fs-5">الدفع عند الوصول</span>
                    <button class="btn"><a href="index.html">العودة للصفحه الرئيسية</a></button>
                </div>
            `;
        } else {
            console.log('No bookings found');
        }
    } catch (err) {
        // console.error('Error:', err);
    }
    finally {
        loadingSpinner.classList.add('d-none');
    }
}

async function bankPayment() {
    const loadingSpinner = document.getElementById('loading');
    let container = document.getElementById('bankData');
    try {
        loadingSpinner.classList.remove('d-none');
        let token = localStorage.getItem("usertoken");
        let response = await axios.get('https://test-2-lbcq.onrender.com/rent/getCurrentuserRents', {
            headers: {
                token: token
            }
        });
        loadingSpinner.classList.remove('d-none');

        console.log(response.data);
        
        if (response.data && response.data.User && response.data.User.length > 0) {
            let latestBooking = response.data.User[response.data.User.length - 1];

            container.innerHTML = `
                <div class="col-md-6">
                    <div class="mb-2 fs-5">
                        <span class="fw-bold">رقم الطلب : </span>
                        <span>${latestBooking.rentalCode}</span>
                    </div>
                    <div class="mb-2 fs-5">
                        <span class="fw-bold">نوع السيارة: </span>
                        <span>${latestBooking.car}</span>
                    </div>
                    <div class="mb-2 fs-5">
                        <span class="fw-bold">نقطة الاقلال  : </span>
                        <span>${latestBooking.startingPoint}</span>
                    </div>
                    <div class="mb-2 fs-5">
                        <span class="fw-bold">نقطة النزول : </span>
                        <span>${latestBooking.arrivalPoint}</span>
                    </div>
                    <div class="mb-2 fs-5">
                        <span class="fw-bold">السعر الاجمالي : </span>
                        <span>${latestBooking.price}</span>
                    </div>
                </div>
                <div class="col-md-6 left">
                    <h3 class="fw-bold main-color mb-2 ">شكرا لاستكمال طلبك!</h3>
                    <span class=" fs-5 d-block ">تحويل بنكي</span>
                    <div class="data d-flex gap-3 align-items-center">
                        <p class="my-2 fs-6">  تم إستلام حجزك يرجى إرفاق إيصالك التحويل عبر الواتس مباشرة  </p>
                        <a href="https://wa.me/+966554128325" target="_blank" class="d-block m-auto d-flex justify-content-center align-content-center">
                            <i class="fa-brands fa-whatsapp"></i>
                        </a>
                    </div>
                        <button class="btn mt-3"><a href="index.html">العودة للصفحه الرئيسية</a></button>
                </div>
            `;
        } else {
            console.log('No bookings found');
        }
        container.classList.remove('d-none');
    } catch (err) {
        // console.error('Error:', err);
    }
    finally {
        loadingSpinner.classList.add('d-none');
    }
}
window.onload = function() {
    bankPayment();
    arrivalPayment();

}


async function handlePaymentChoice() {
    const bank = document.getElementById('bank');
    const arrival = document.getElementById('arrival');
    const token = localStorage.getItem("usertoken");
    let bookingId=localStorage.getItem('bookingId')
    if (!bank.checked && !arrival.checked) {
        alert('من فضلك اختر طريقة الدفع');
        return;
    }
    const paymentType = bank.checked ? 'bank' : 'arrival';
    console.log(paymentType)
    try {
        const response = await axios.put(
            `https://test-2-lbcq.onrender.com/rent/addPayment/${bookingId}`,
            {paymentType  },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                },
            }
        );
        console.log(response.data);
        if (bank.checked) {
            window.location.href = 'bank.html';
        } else if (arrival.checked) {
            window.location.href = 'arrival.html';
        }
    }catch (error){
        console.error('Error:', error);
        alert(error.message || 'حدث خطأ أثناء معالجة الدفع. يرجى المحاولة مرة أخرى.');
    }
}


