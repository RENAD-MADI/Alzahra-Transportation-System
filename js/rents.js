

async function rents() {
  let res = await axios.get("https://test-2-lbcq.onrender.com/rent");
  let placeholder = document.querySelector("#data");
  let out = "";
  res.data.rent.forEach((user, index) => {
    out += `
      <tr data-index="${index}">
        <td>${user._id}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.car}</td>
        <td>${user.Time}</td>
        <td>${user.rentDate}</td>
        <td>${user.startingPoint}</td>
        <td>${user.arrivalPoint}</td>
        <td>${user.price}</td>
        <td>${user.status}</td>
        <td class="d-flex flex-column gap-1 p-2">
          <button class="bg-danger p-3 rounded-1 deleteButton" data-id="${user._id}">حذف</button>
          <button type="button" class="btn btn-info p-3 rounded-1 updateButton" data-id="${user._id}" onclick="setFormForUpdate(${index})">تعديل</button>
        </td>
      </tr>
    `;
  });
  placeholder.innerHTML = out;
  document.querySelectorAll('.deleteButton').forEach((button, index) => {
    button.addEventListener('click', deleteRow);
  });
}

window.onload = function() {
  rents();
};

async function deleteRow(event) {
  const button = event.target;
  const row = button.closest('tr');
  const rentId = button.getAttribute('data-id');
  const userToken = localStorage.getItem("usertoken");
  const isConfirmed = confirm('هل أنت متأكد أنك تريد حذف هذا العنصر؟');
  if (!isConfirmed) {
      return; 
  }
  console.log(`Attempting to delete row with ID: ${rentId}`); 

  try {
      const response = await axios.delete(`https://test-2-lbcq.onrender.com/rent/deleteRent/${rentId}`, {
          headers: {
              'token': userToken
          }
      });
      console.log(response)

      if (response.status === 200) {
          row.remove();
          alert('تم حذف العنصر بنجاح!');
          rents();
      } else {
          console.error("Error:", response.data);
          alert('حدث خطأ أثناء حذف العنصر. حاول مرة أخرى.');
      }
  } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      alert('حدث خطأ أثناء حذف العنصر. حاول مرة أخرى.');
  }
}




// update.js
let indexUpdate=0;
async function setFormForUpdate(index){
  indexUpdate=index
  document.getElementById('updateForm').classList.replace('d-none' , 'd-block');
  let res = await axios.get("https://test-2-lbcq.onrender.com/rent");
  const rent = res.data.rent[index];
    document.getElementById('IDD').value = rent._id;
    document.getElementById('firstName').value = rent.firstName ;
    document.getElementById('lastName').value = rent.lastName ;
    document.getElementById('email').value = rent.email ;
    document.getElementById('phone').value = rent.phone ;
    document.getElementById('car').value = rent.car ;
    document.getElementById('Time').value = rent.Time ;
    document.getElementById('Date').value = rent.rentDate;
    document.getElementById('startingPoint').value = rent.startingPoint ;
    document.getElementById('arrivalPoint').value = rent.arrivalPoint ;
    document.getElementById('price').value = rent.price ;
    document.getElementById('status').value = rent.status ;
}

async function updateRent(event) {
  event.preventDefault();
  
  const id = document.getElementById('IDD').value;
  const updatedRent = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    car: document.getElementById('car').value,
    Time: document.getElementById('Time').value,
    rentDate: document.getElementById('Date').value,
    startingPoint: document.getElementById('startingPoint').value,
    arrivalPoint: document.getElementById('arrivalPoint').value,
    price: document.getElementById('price').value,
    status: document.getElementById('status').value
  };
  
  const userToken = localStorage.getItem("usertoken");

  try {
    const response =await axios.put(`https://test-2-lbcq.onrender.com/rent/updateRent/${id}`, updatedRent, {
      headers: {
        'token': userToken
      }
    });
    if(response.data.message==="Rent Updated successfully"){
      alert('تم تحديث البيانات بنجاح');
      rents() ;
      document.getElementById('updateForm').classList.replace('d-block' , 'd-none');

    }
    console.log(response.data)
  } catch (error) {
    console.error('حدث خطأ أثناء تحديث البيانات برجاء المحاوله مرة أخري:', error);
    alert('Failed to update rent.');
  }
}












