








async function categoryList() {
    try {
      let res = await axios.get("https://test-2-lbcq.onrender.com/category");
      console.log(res.data.cat);
  
      let placeholder = document.querySelector("#data");
      let out = "";
      res.data.cat.forEach((cat, index) => {
        out += `
          <tr>
            <td>${cat._id}</td>
            <td>${cat.name}</td>
            <td>
              <button class="btn btn-danger mb-2" cat-id="${cat._id}" category-id="${cat.categoryId}" onclick="deleteCategory(event)">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>`;
      });
      placeholder.innerHTML = out;
    } catch (error) {
      console.error("Error fetching car list:", error.response ? error.response.data : error.message);
    }
  }
  
 
  
  async function deleteCategory(event) {
    const button = event.target.closest('button');
    const row = button.closest('tr');
    const catId = button.getAttribute('cat-id');
    const userToken = localStorage.getItem("usertoken");

    const isConfirmed = confirm('هل أنت متأكد أنك تريد حذف هذا العنصر؟');
    if (!isConfirmed) {
        return;
    }

    try {
        const response = await axios.delete(`https://test-2-lbcq.onrender.com/category/deleteCategory/${catId}`, {
            headers: {
                'token': userToken
            }
        });

        if (response.status === 200) {
            row.remove();
            alert('تم حذف العنصر بنجاح!');
            categoryList();
        } else {
            console.error("Error:", response.data);
            alert('حدث خطأ أثناء حذف العنصر. حاول مرة أخرى.');
        }
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        alert('حدث خطأ أثناء حذف العنصر. حاول مرة أخرى.');
    }
}




  window.onload = function() {
    categoryList() 
  };