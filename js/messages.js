async function messages() {
  let res = await axios.get("https://test-2-lbcq.onrender.com/message");
  console.log(res.data.messages);
  let placeholder = document.querySelector("#data");
  let out = "";
  for (let users of res.data.messages) {
    out += `
                <tr>
                <td>${users._id}</td>
                <td>${users.name}</td>
                <td> <a href="${users.email}"> ${users.email}</a></td>
                <td>${users.description}</td>
              
  
                </tr>
                `;
  }
  placeholder.innerHTML = out;
}
window.onload = function() {
  messages()
};
