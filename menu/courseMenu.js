let coursesMenu = document.querySelector(".content");
let tabIndex = [];
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
//random number : 
function randomInt()
{
    return Math.floor(Math.random() * (courses.length)-1) + 0;
}
function checkRepetitive()
{
    for(let i = 0;i<3;i++)
    {
        if(tabIndex[i] >= 0)
        {
            for(let j = i+1;j<3;j++)
            {
                if(tabIndex[i] == tabIndex[j])
                {
                    return true;
                }
            }
        } else return true;
    }
    return false;
}

do{
    for(let i = 0;i<3;i++)
    {
        tabIndex[i] = randomInt();
    }
} while(checkRepetitive());

//adding course to UI : 
const addCourseUi = (img,title,categorie,price) =>
{
    let div = document.createElement('div');
    let image = document.createElement('img');
    let p  = document.createElement('p');
    let span = document.createElement('span');
    let divBut = document.createElement('div');
    let button = document.createElement('button');
    button.setAttribute('class','btn btn-info p-2 mb-3 w-50 mt-3');
    button.textContent = "Enroll Now";
    divBut.setAttribute('class','text-center');
    divBut.appendChild(button);
    image.src = "http://localhost/MiniProjetV2" + img;
    image.height = 140;
    image.setAttribute('class','card-img');
    div.setAttribute('class','card col-sm-12 col-lg-3 me-2 mb-2 text-center');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/MiniProjetV2/coursesUi/retrieveCourse.php");
    xhr.onload = function() {
        if (xhr.status === 200) {
            // success
            var data = JSON.parse(xhr.responseText);
            console.log(data);
            for(let i = 0;i<data.length;i++)
            {
                if(data[i].title == title)
                    div.setAttribute('data-course-id',data[i].courseId);
            }
            // process the data
        } else {
            // error
        }
    };
    xhr.send();
    p.setAttribute('class','card-title mt-2');
    p.textContent = title;
    span.setAttribute('class','card-text');
    span.style.color = "red";
    span.textContent = price + " $";
    div.appendChild(image);
    div.appendChild(p);
    div.appendChild(span);
    div.appendChild(divBut);
    coursesMenu.appendChild(div);
}


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
                if(xhr.responseText == "yes")
                     alert('Article Added to Cart :)');
                else (xhr.responseText == "no")
                     alert("you have already bought this product check the My products section to view your course :)");
            } else {
                // error

            }
        };
    }
});

for(let i = 0;i<tabIndex.length;i++)
{
    addCourseUi(courses[tabIndex[i]].image,courses[tabIndex[i]].title,courses[tabIndex[i]].category,courses[tabIndex[i]].price);
}