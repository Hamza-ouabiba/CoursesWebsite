var coursesMenu = document.querySelector(".content");
var signOutBtn = document.getElementById("signOut");
signOutBtn.addEventListener('click',(e) => {
    e.preventDefault();
    var xhr = new XMLHttpRequest();
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

xhr.open('POST', 'http://localhost/MiniProjetV2/logout.php');
xhr.setRequestHeader('Content-Type', 'application/xml');
xhr.send('<request><type>logout</type></request>');

})
for(let i = 0;i<3;i++) {
    addCourseUi(courses[i].image,courses[i].title,courses[i].category,courses[i].price);
}

