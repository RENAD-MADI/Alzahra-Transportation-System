async function users() {
    let res = await axios.get("https://test-2-lbcq.onrender.com/user");
    console.log(res.data.user);
  
    let placeholder = document.querySelector("#data");
    let out = "";
    for (let users of res.data.user) {
      out += `
                <tr>
                <td>${users._id}</td>
                <td>${users.userName}</td>
                <td>${users.phone}</td>
                <td>${users.email}</td>
                <td>${users.gender}</td>
                <td>${users.addresses}</td>
                <td>${users.age}</td>
                <td> <button class="btn btn-danger" data-id="${users._id}" onclick="deleteUsers(event)"><i class="fa-solid fa-trash"></i></button> </td>
                </tr>
                `;
    }
    placeholder.innerHTML = out;
  }
async function deleteUsers(event) {
  const button = event.target;
  const row = button.closest('tr');
  const userId = button.getAttribute('data-id');
  const userToken = localStorage.getItem("usertoken");
  const isConfirmed = confirm('هل أنت متأكد أنك تريد حذف هذا المستخدم؟');
  if (!isConfirmed) {
      return; 
  }

  try {
      const response = await axios.delete(`https://test-2-lbcq.onrender.com/user/deleteUser/${userId}`, {
          headers: {
              'token': userToken
          }
      });

      if (response.status === 200) {
          row.remove();
          alert('تم حذف العنصر بنجاح!');
          users();
      }
  } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      alert('حدث خطأ أثناء حذف العنصر. حاول مرة أخرى.');
  }
}


window.onload = function() {
  users()
};