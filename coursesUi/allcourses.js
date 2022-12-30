let coursesMenu = document.querySelector(".content");
let search = document.getElementById("search");
let categories_ = document.querySelector('ul#categorie');
let price = document.getElementById("price");
let categorieCourse_dom = "all";
let price_change = 0.0;
let dispo = document.querySelector(".error-dispo");
const addCategorie = (categorie) =>
{
    let li = document.createElement('li');
    let button = document.createElement('button');
    button.textContent = categorie;
    button.setAttribute('class','btn shadow-none')
    li.appendChild(button);
    document.getElementById("categorie").appendChild(li);
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
        let xhr = new XMLHttpRequest();
        xhr.open('POST','http://localhost/MiniProjetV2/coursesUi/addproduct/addProduct.php');
        xhr.send(JSON.stringify(data));
        xhr.onload = function() {
            if (xhr.status === 200) {
                // success*
                console.log(xhr.responseText);
                alert('commande ajoutée');
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
    if(search.value != "")
        searchCourse(search.value.toLowerCase());
    else {
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
         if(price_change == 0.0)
         {
            coursesMenu.textContent = "";
            let categorieCourse = courses.filter(course => {
                return course.category == categorieCourse_dom;
            });
            categorieCourse.forEach(course => {
                addCourseUi(course.image,course.title,course.price,course.price);
            })
         } else 
         {
            coursesMenu.textContent = "";
            let categorieCourse = courses.filter(course => {
                return course.price == price_change && course.category == categorieCourse_dom;
            });
            if(categorieCourse.length != 0)
            {
                categorieCourse.forEach(course => {
                    addCourseUi(course.image,course.title,course.price,course.price);
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
            return course.price == price.value && course.category == categorieCourse_dom;
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
        let priceCourse = courses.filter(course => {
            return course.price == price.value;
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