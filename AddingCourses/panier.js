let ola = document.querySelector(".content");
let buyButton = document.querySelector('#buy');
let table = document.querySelector('#tableBod');
let deleteConfir = document.querySelector('#confirmDelete');
let courseId = -1;
let total = document.getElementById('total');
let signOutBtn = document.getElementById("signOut");
signOutBtn.addEventListener('click',(e) => {
    console.log("hna")
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('Logout successful');
                window.location = "http://localhost/MiniProjetV2/login/index.html";
            } else {
                console.error('Error: ' + xhr.status);
            }
        }
};

xhr.open('POST', 'http://localhost/MiniProjetV2/login/logout.php');
xhr.setRequestHeader('Content-Type', 'application/xml');
xhr.send('<request><type>logout</type></request>');

});

const addCourseUi = (img,title,categorie,price,courseId) =>
{
    let tr = document.createElement("tr");
    let itemTitle = document.createElement("td");
    let itemImage = document.createElement('td');
    let itemCat = document.createElement('td');
    let image = document.createElement('img');
    let itemPrice = document.createElement('td');
    let deleteRow = document.createElement('tr');
    let deleteIcon = document.createElement('i');
    deleteIcon.setAttribute('class','fa fa-trash btn btn-danger mt-4');
    deleteIcon.setAttribute('data-toggle','modal');
    deleteIcon.setAttribute('data-target',"#exampleModalCenter");
    deleteRow.appendChild(deleteIcon);
    itemImage.appendChild(image);
    itemPrice.textContent = price + "$";
    image.width = 60;
    image.height = 60;
    image.src = "http://localhost/MiniProjetV2" + img;
    tr.setAttribute('data-course-id',courseId);
    itemCat.textContent = categorie;
    itemTitle.textContent = title;
    tr.appendChild(itemImage);
    tr.appendChild(itemTitle);
    tr.appendChild(itemCat);
    tr.appendChild(itemPrice);
    tr.appendChild(deleteRow);
    table.appendChild(tr);
    table.style.visibility = "visible";
}
const calculTotal = (courses) =>
{
   let total = 0.0;
   for(let i = 0;i<courses.length;i++)
        total+= parseFloat(courses[i].price);
    return total.toFixed(2);
}
let xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost/MiniProjetV2/AddingCourses/panier.php");
xhr.onload = function() {
    if (xhr.status === 200) {
        // success
        // var data = ;
        console.log(xhr.responseText);
        if(xhr.responseText != "")
        {
            console.log("hna");
          
            let coursesObject = JSON.parse(xhr.responseText);
            // process the data
            coursesObject.forEach(course => {
                addCourseUi(course.image,course.title,course.category,course.price,course.courseId);
            })
            total.textContent = "Amount of : " + calculTotal(coursesObject) + "$";
        } else 
        {
            buyButton.disabled = "false";
        }
    } else {
        // error
    }
};
xhr.send();

//buy all items: 
buyButton.addEventListener('click',(e) => {
    e.preventDefault();
    console.log("hna");
    var xhr = new XMLHttpRequest();
        xhr.open('POST','http://localhost/MiniProjetV2/AddingCourses/CommandeCh.php');
        xhr.send();
        xhr.onload = function() {
            if (xhr.status === 200) {
                // success*
                // alert(xhr.responseText);
                setTimeout(() => {
                    window.location = "http://localhost/MiniProjetV2/AddingCourses/panier.html";
                },2000);
                // process the data
            } else {
                // error
                alert("error");
            }
        };
})
function deleteProduct()
{
   if(courseId != -1)
   {
        var xhr = new XMLHttpRequest();
        xhr.open('POST','http://localhost/MiniProjetV2/coursesUi/deleteproduct/delete.php');
        xhr.send(JSON.stringify(courseId));
        console.log(JSON.stringify(courseId));
        xhr.onload = function() {
            if (xhr.status === 200) {
                // success*
                // alert(xhr.responseText);
                window.location = "http://localhost/MiniProjetV2/AddingCourses/panier.html";
                // process the data
            } else {
                // error
                alert("error");
            }
        };  
   }
}
deleteConfir.addEventListener('click',(event) => {
    event.preventDefault();
    //delete process : 
    deleteProduct();
})
//delete an item : 
table.addEventListener('click',(event) => {
    if(event.target.tagName == "I")
    {
        let courseIdButton = event.target.parentElement.parentElement.getAttribute('data-course-id');
        courseId = courseIdButton;
    }
})