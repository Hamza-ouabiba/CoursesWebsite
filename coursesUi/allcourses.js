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
    if(categorieCourse_dom != 'all') 
    {
        console.log(categorieCourse_dom);
        for(let i = 0;i<courses.length;i++) {
            if(courses[i].title.toLocaleLowerCase().includes(title) && categorieCourse_dom == courses[i].category) {
                addCourseUi(courses[i].image,courses[i].title,courses[i].category,courses[i].price);
            }
        }
    }else {
        for(let i = 0;i<courses.length;i++) {
            if(courses[i].title.toLocaleLowerCase().includes(title) ) {
                addCourseUi(courses[i].image,courses[i].title,courses[i].category,courses[i].price);
            }
        }
    }
}
//searching 
search.addEventListener('keyup',() =>{
    coursesMenu.textContent = "";
    //which means that the user is typing in real time so we should show him courses typed : 
    if(search.value != "")
        searchCourse(search.value.toLowerCase());
    else {
        //if user clicked in a category and typed a name of course : 
        coursesMenu.textContent = "";
        if(categorieCourse_dom != "all")
        {
            for(let i = 0;i<courses.length;i++) {
                if(categorieCourse_dom == courses[i].category) {
                    addCourseUi(courses[i].image,courses[i].title,courses[i].category,courses[i].price);
                }
            }
        } else 
        {
            courses.forEach(course =>{
                addCourseUi(course.image,course.title,course.category,course.price);
            })
        }
    }
});
//clicking on some categories : 
categories_.addEventListener('click',(e) => {
    categorieCourse_dom = e.target.textContent;
    dispo.style.visibility = "hidden";
    if(categorieCourse_dom != "all"){
        if(search.value == "")
        {
            if(price_change == 0.0)
            {
                coursesMenu.textContent = "";
                let categorieCourse = courses.filter(course => {
                    return course.category == categorieCourse_dom;
                });
                categorieCourse.forEach(course => {
                    addCourseUi(course.image,course.title,course.category,course.price);
                })
            } else 
            {
                coursesMenu.textContent = "";
                let categorieCourse = courses.filter(course => {
                    return course.price <= price_change && course.category == categorieCourse_dom;
                });
                if(categorieCourse.length != 0)
                {
                    categorieCourse.forEach(course => {
                        addCourseUi(course.image,course.title,course.category,course.price);
                    })
                } else {
                    console.log("visibility");
                    dispo.style.visibility = "visible";
                    dispo.style.color = "red";
                    dispo.textContent="Aucun produit dispo pour cette categorie de " + categorieCourse_dom;
                }
            }
        } else 
        {
            coursesMenu.textContent = "";
            console.log("hna");
            for(let i = 0;i<courses.length;i++) 
            {
                if(courses[i].title.toLocaleLowerCase().includes(search.value) && categorieCourse_dom == courses[i].category)
                {
                    addCourseUi(courses[i].image,courses[i].title,courses[i].category,courses[i].price);
                    console.log(courses[i].title);
                }
            }
        }
         //testing on search  : 
    } else 
    {
        coursesMenu.textContent = "";
        courses.forEach(course =>{
            addCourseUi(course.image,course.title,course.category,course.price);
        })
    }
});

//price changing : 
price.addEventListener('change',() => {
    dispo.style.visibility = "hidden";
    document.getElementById("priceVal").textContent = "Value :  "+ price.value + " $";
    price_change = price.value;
    if(categorieCourse_dom != "all")
    {
        console.log("hna cat");
        let priceCourse = courses.filter(course => {
            return course.price <= price.value && course.category == categorieCourse_dom;
        });
        coursesMenu.textContent = "";
        if(priceCourse.length != 0)
        {
            priceCourse.forEach(course =>{
                addCourseUi(course.image,course.title,course.category,course.price);
            })
        }
        else 
        {
            console.log("visibility");
            dispo.style.visibility = "visible";
            dispo.style.color = "red";
            dispo.textContent="Aucun produit dispo pour cette categorie de " + categorieCourse_dom;
        }   
    } else {
        coursesMenu.textContent = "";
        console.log(price.value);   
        let priceCourse = courses.filter(course => {
            return course.price <= price.value;
        });
        if(priceCourse.length != 0){
            priceCourse.forEach(course =>{
                addCourseUi(course.image,course.title,course.category,course.price);
            })
        } else {
            //not showing data : 

        }
    }
});