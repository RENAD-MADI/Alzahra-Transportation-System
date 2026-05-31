async function addCategory(e) {
    e.preventDefault();
    let t = document.getElementById("name").value;
    if (!t) {
        alert("يرجى ملء جميع الحقول.");
        return
    }
    let a = localStorage.getItem("usertoken");
    try {
        let n = await axios.post("https://test-2-lbcq.onrender.com/category/addCategory", {
            name: t
        },
        {
            headers: {
                token: a,
                "Content-Type": "application/json"
            }
        });
        console.log(n.data),
        "Category created successfully" === n.data.message ? alert("تمت إضافة الفئة بنجاح") : alert("حدث خطأ أثناء إضافة الفئة. حاول مرة أخرى.")
    } catch(r) {
        console.error("حدث خطأ أثناء إضافة الفئة:", r),
        alert("حدث خطأ أثناء إضافة الفئة. حاول مرة أخرى.")
    }
}
async function loadCategories() {
    try {
        let e = await axios.get("https://test-2-lbcq.onrender.com/category"),
        t = e.data.cat,
        a = document.getElementById("categoryId");
        t.forEach(e => {
            let t = document.createElement("option");
            t.value = e._id,
            t.textContent = `$ {
                e.name
            } $ {
                e._id
            }`,
            a.appendChild(t)
        })
    } catch(n) {
        console.error("حدث خطأ أثناء تحميل الفئات:", n),
        alert("حدث خطأ أثناء تحميل الفئات. حاول مرة أخرى.")
    }
}
function addCar() {
    let e = document.getElementById("Name").value,
    t = document.getElementById("capacity").value,
    a = document.getElementById("description").value,
    n = document.getElementById("addresses").value,
    r = document.getElementById("prices").value,
    d = document.getElementById("categoryId").value.trim(),
    o = document.getElementById("images").files,
    l = localStorage.getItem("usertoken");
    if (!e || !t || !a || !n || !r || !d || 0 === o.length) {
        alert("الرجاء ملء جميع الحقول المطلوبة.");
        return
    }
    console.log(d);
    let p = new FormData;
    p.append("name", e),
    p.append("capacity", t),
    p.append("description", a),
    p.append("addresses", n),
    p.append("prices", r),
    p.append("categoryId", d);
    let s = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    for (let c = 0; c < o.length; c++) {
        let g = o[c].name.toLowerCase().split(".").pop();
        if (!s.includes(g)) {
            alert("الرجاء تحميل صورة بصيغة معتمدة فقط (jpg, jpeg, png, gif, bmp, webp).");
            return
        }
        p.append("carImage", o[c])
    }
    axios.post("https://test-2-lbcq.onrender.com/car/addCar", p, {
        headers: {
            "Content-Type": "multipart/form-data",
            token: l
        }
    }).then(e => {
        "Car created successfully" === e.data.message && alert("تم اضافة العربية بنجاح"),
        console.log(e.data)
    }).
    catch(e => {
        console.error("Error:", e.response ? e.response.data : e.message),
        alert("حدث خطأ. حاول مرة أخرى.")
    })
}
window.onload = function() {
    loadCategories()
};