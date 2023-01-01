let coursesMenu = document.querySelector(".content");
let search = document.getElementById("search");
let categories_ = document.querySelector('ul#categorie');
let price = document.getElementById("price");
let categorieCourse_dom = "all";
let price_change = 0.0;
let dispo = document.querySelector(".error-dispo");
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


console.log(price.max);
let max = Math.max(...courses.map(course => course.price));
let min = Math.min(...courses.map(course => course.price));
price.max = max;
price.min = min;
const addCategorie = (categorie) =>
{
    let li = document.createElement('li');
    let button = document.createElement('button');
    button.textContent = categorie;
    button.setAttribute('class','btn shadow-none')
    li.appendChild(button);
    document.getElementById("categorie").appendChild(li);
}
//setting the max of a input : 
console.log(max);
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
        let xhr = new XMLHttpRequest();
        xhr.open('POST','http://localhost/MiniProjetV2/coursesUi/addproduct/addProduct.php');
        xhr.send(JSON.stringify(data));
        xhr.onload = function() {
            if (xhr.status === 200) {
                // success*
                console.log(xhr.responseText);
                if(xhr.responseText == "yes")
                    alert('Article Added to Cart :)');
                else if(xhr.responseText == "no")
                    alert("you have already bought this product check the My products section to view your course :)");
                // process the data
            } else {

                // error
            }
        };
    }
});

const checkOccurence = () =>{
    let tab = [];
    let flag = false;
    for(let i =0;i<courses.length;i++) {
        flag = false;
        if(tab.length == 0)
            tab.push(courses[i].category);
        else
        {
           for(let j=0;j<tab.length;j++){
              if(tab[j].toLowerCase() == courses[i].category.toLocaleLowerCase())
                flag = true;
           }
           if(!flag)
             tab.push(courses[i].category);
        }
    }
    return tab;
}

courses = courses.filter((item,index,self) =>{
      return self.findIndex(t => t.title === item.title) === index
});

courses.forEach(course =>{
    addCourseUi(course.image,course.title,course.category,course.price);
})
let t = checkOccurence();
t= ['all',...checkOccurence()];
//afficher les categories : 
t.forEach(categorie => {
    addCategorie(categorie);
});


const searchCourse = (title) => {
    for(let i = 0;i<courses.length;i++) {
        if(courses[i].title.toLocaleLowerCase().includes(title) ) {
            addCourseUi(courses[i].image,courses[i].title,courses[i].category,courses[i].price);
        }
    }
}
//searching 
search.addEventListener('keyup',() =>{
    coursesMenu.textContent = "";
    //which means that the user is typing in real time so we should show him courses typed : 
    if(search.value != "")
    {
        if(categorieCourse_dom == "all")
        {
            searchCourse(search.value.toLocaleLowerCase());
        } else 
        {
            checkByCategorie(categorieCourse_dom,search.value);
        }
    } else 
    {
        console.log("im at : " + categorieCourse_dom);
        if(categorieCourse_dom == "all")
        {
            for(let i = 0;i<courses.length;i++) {
                addCourseUi(courses[i].image,courses[i].title,courses[i].category,courses[i].price);
             }
        } else 
        {
            checkByCategorie(categorieCourse_dom,search.value);
        }
    }
});

function checkByCategorie(categorie,search)
{
    dispo.style.visibility = "hidden";
    if(search != "")
    {
        let categorieCourse = courses.filter(course => {
            return course.category == categorie && course.title.toLocaleLowerCase().includes(search);
        });
        categorieCourse.forEach(course => {
            addCourseUi(course.image,course.title,course.category,course.price);
        })
    } else 
    {
        let categorieCourse = courses.filter(course => {
            return course.category == categorie;
        });
        categorieCourse.forEach(course => {
            addCourseUi(course.image,course.title,course.category,course.price);
        })
    }
}

//clicking on some categories : 
categories_.addEventListener('click',(e) => {
    categorieCourse_dom = e.target.textContent;
    coursesMenu.textContent = "";
    if(e.target.textContent != "all")
       checkByCategorie(e.target.textContent,search.value);   
     else 
    {
        if(search.value != "")
        {
            let categorieCourse = courses.filter(course => {
                return course.title.toLocaleLowerCase().includes(search.value);
            });
            categorieCourse.forEach(course => {
                addCourseUi(course.image,course.title,course.category,course.price);
            })
        } else 
        {
            courses.forEach(course => {
                addCourseUi(course.image,course.title,course.category,course.price);
            })
        }
    }
});

//price changing : 
price.addEventListener('change',() => {
    dispo.style.visibility = "hidden";
    coursesMenu.textContent = "";
    document.getElementById("priceVal").textContent = "Value :  "+ price.value + " $";
    price_change = price.value;
    if(search.value == "" && categorieCourse_dom == "all")
    {
        let priceCourse = courses.filter(course => {
            return course.price <= parseFloat(price.value) ;
        });
        priceCourse.forEach(course =>{
            addCourseUi(course.image,course.title,course.category,course.price);
        })
    }
});