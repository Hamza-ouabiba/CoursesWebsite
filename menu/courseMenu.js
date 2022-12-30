let coursesMenu = document.querySelector(".content");
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

//enroll a course : 
coursesMenu.addEventListener('click',(e) => {
    if(e.target.tagName == "BUTTON") {
        let courseId = e.target.parentElement.parentElement.getAttribute('data-course-id');
        //process of adding this product to dataBase : 
        //creating a command : 
        let price  =  e.target.parentElement.previousElementSibling.textContent.replace('$','');
        let title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        let image = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling;
        let category = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
        let data = {
            CourseId: courseId,
            Title: title,
            Price: price,
            Image: image.src,
            // userId: 
        };
        var xhr = new XMLHttpRequest();
        xhr.open('POST','http://localhost/MiniProjetV2/coursesUi/addproduct/addProduct.php');
        xhr.send(JSON.stringify(data));
        xhr.onload = function() {
            if (xhr.status === 200) {
                // success*
                console.log(xhr.responseText);
                alert('Article ajoutée au Panier');
                // process the data
            } else {
                // error

            }
        };
    }
});

for(let i = 0;i<3;i++) {
    addCourseUi(courses[i].image,courses[i].title,courses[i].category,courses[i].price);
    console.log("adding");
}

