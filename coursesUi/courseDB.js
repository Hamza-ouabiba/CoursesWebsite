var courses = [
    {
        image: '/images/javascriptDef.png',
        title: 'what is javascript?',
        category: 'JS',
        price: 9.9
    },
    {
        image: '/images/htmlBasics.PNG',
        title: 'basics of HTML',
        category: 'HTML',
        price: 5.9
    },
    {
        image: '/images/htmlElements.png',
        title: 'HTML elements and tags',
        category: 'HTML',
        price: 9.9
    },
    {
        image: '/images/cssSelectors.jpg',
        title: 'CSS selectors',
        category: 'CSS',
        price: 69.9
    },
    {
        image: '/images/javascriptVariables.png',
        title: 'variables and data type of javascript',
        category: 'JS',
        price: 19.9
    },
    {
        image: '/images/javascriptOperators.png',
        title: 'Javascript operators and conditions',
        category: 'JS',
        price: 29.9
    },
    {
        image: '/images/htmlAttrVal.jpg',
        title: 'HTML attributes and values',
        category: 'HTML',
        price: 19.9
    },
    {
        image: '/images/cssProperties.png',
        title: 'CSS properties',
        category: 'CSS',
        price: 29.9
    },
    {
        image: '/images/javascriptObjects.png',
        title: 'Javascript objects and arrays',
        category: 'JS',
        price: 39.9
    },
    {
        image: '/images/cssMesures.png',
        title: 'mesures and unites of CSS',
        category: 'CSS',
        price: 19.9
    },
    {
        image: '/images/cssAnimation.png',
        title: 'CSS animations',
        category: 'CSS',
        price: 19.9
    },
    {
        image: '/images/javascriptFunctions.png',
        title: 'The basics of javascript',
        category: 'JS',
        price: 29.9
    },
    {
        image: '/images/javascriptEvents.png',
        title: 'javascript events',
        category: 'JS',
        price: 59.9
    },
    {
        image: '/images/cssColors.png',
        title: 'css colors',
        category: 'css',
        price: 29.9
    },
    {
        image: '/images/phpBasics.png',
        title: 'getting started with php',
        category: 'php',
        price: 15.9
    },
    {
        image: '/images/javascriptFunctions2.png',
        title: 'functions and loops with javascript',
        category: 'JS',
        price: 19.9
    },
    {
        image: '/images/phpDataBase.png',
        title: 'connecting to database using PHP',
        category: 'PHP',
        price: 29.9
    },
    {
        image: '/images/phpCRUD.png',
        title: 'manipulating crud using php',
        category: 'php',
        price: 45.9
    },
    {
        image: '/images/javascriptDOM.png',
        title: 'DOM the power of javascript',
        category: 'JS',
        price: 23.9
    },
    {
        image: '/images/javascriptDOM.png',
        title: 'DOM the power of javascript',
        category: 'JS_g4',
        price: 23.9
    }
];

// const addCourseDataBase = (course) =>
// {
//     console.log(course.image);
//     var xhr = new XMLHttpRequest();
//     xhr.open('POST','http://localhost/emsiProjetPhp/addCourses.php');
//     xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//     xhr.onload = function() {
//         if (xhr.status === 200) {
//             // success
//             var data = xhr.responseText;
//             console.log(data);
//             if(data == 'true') {
//                 console.log('data sent');
//             } else {console.log('jqzd')}
//         } 
//     };
//     xhr.send(JSON.stringify(course));
// }
// courses = courses.filter((item,index,self) =>{
//     return self.findIndex(t => t.title === item.title) === index
// });
// courses.forEach(course => {
//     console.log("course 1");
//     addCourseDataBase(course);
// })


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
