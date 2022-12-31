let coursesMenu = document.querySelector('.content');
let errorMessage = document.getElementById('nonePro');
let categorieCourse_dom = "all";
let coursesObject;
let price = document.getElementById('price');

const addCourseUi = (img,title,categorie,price) =>
{
    let div = document.createElement('div');
    let image = document.createElement('img');
    let p  = document.createElement('p');
    let span = document.createElement('span');
    let divBut = document.createElement('div');
    image.src = "http://localhost/MiniProjetV2" + img;
    image.height = 140;
    image.setAttribute('class','card-img');
    div.setAttribute('class','card col-sm-12 col-lg-2 me-2 mb-2 text-center');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/MiniProjetV2/MyProducts/retrieveCourseUser.php");
    xhr.onload = function() {
        if (xhr.status === 200) {
            // success
            var data = JSON.parse(xhr.responseText);
            for(let i = 0;i<data.length;i++)
            {
                if(data[i].title == title)
                    div.setAttribute('data-course-id',data[i].courseId);
            }
            // process the data
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
let xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost/MiniProjetV2/MyProducts/retrieveCourseUser.php");
xhr.onload = function() {
    if (xhr.status === 200) {
        // success
        // var data = ;
        if(xhr.responseText != "")
        {
             coursesObject = JSON.parse(xhr.responseText);
             let max = Math.max(...coursesObject.map(course => course.price));
            let min = Math.min(...coursesObject.map(course => course.price));
            price.max = max;
            price.min = min;
            // process the data
            coursesObject.forEach(course => {
                
                addCourseUi(course.image,course.title,course.category,course.price,course.courseId);
            })
        } else 
            errorMessage.textContent = "No product available try to enroll a course :)";
    } else {
        // error
    }
};
xhr.send();
console.log("hna : "+ coursesObject);
const searchCourse = (title) => {
    if(categorieCourse_dom != 'all') 
    {
        console.log(categorieCourse_dom);
        for(let i = 0;i<coursesObject.length;i++) {
            if(coursesObject[i].title.toLocaleLowerCase().includes(title) && categorieCourse_dom == coursesObject[i].category) {
                addCourseUi(coursesObject[i].image,coursesObject[i].title,coursesObject[i].category,coursesObject[i].price);
            }
        }
    }else {
        for(let i = 0;i<coursesObject.length;i++) {
            if(coursesObject[i].title.toLocaleLowerCase().includes(title) ) {
                addCourseUi(coursesObject[i].image,coursesObject[i].title,coursesObject[i].category,coursesObject[i].price);
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
            for(let i = 0;i<coursesObject.length;i++) {
                if(categorieCourse_dom == courses[i].category) {
                    addCourseUi(coursesObject[i].image,coursesObject[i].title,coursesObject[i].category,coursesObject[i].price);
                }
            }
        } else 
        {
            coursesObject.forEach(course =>{
                addCourseUi(course.image,course.title,course.category,course.price);
            })
        }
    }
});

//price changing : 
price.addEventListener('change',() => {
    document.getElementById("priceVal").textContent = "Value :  "+ price.value + " $";
    price_change = price.value;
    if(categorieCourse_dom != "all")
    {
        console.log("hna cat");
        let priceCourse = coursesObject.filter(course => {
            return course.price <= price.value && course.category == categorieCourse_dom;
        });
        coursesMenu.textContent = "";
        if(priceCourse.length != 0)
        {
            priceCourse.forEach(course =>{
                addCourseUi(course.image,course.title,course.category,course.price);
            })
        }
    } else {
        coursesMenu.textContent = "";
        console.log(price.value);   
        let priceCourse = coursesObject.filter(course => {
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