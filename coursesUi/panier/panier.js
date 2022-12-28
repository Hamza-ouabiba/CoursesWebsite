var ola = document.querySelector(".content");
var buyButton = document.querySelector('#buy');
console.log(ola);
const addCourseUi = (img,title,categorie,price) =>
{
    let div = document.createElement('div');
    let image = document.createElement('img');
    let p  = document.createElement('p');
    let span = document.createElement('span');
    image.src = "http://localhost/emsiProjetPhp" + img;
    image.setAttribute('class','card-img');
    div.setAttribute('class','card col-sm-3 col-lg-3 me-2 mb-2 text-center');
    p.setAttribute('class','card-title mt-2');
    p.textContent = title;
    span.setAttribute('class','card-text');
    span.style.color = "red";
    span.textContent = price + " $";
    div.appendChild(image);
    div.appendChild(p);
    div.appendChild(span);
    ola.appendChild(div);
}
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost/emsiProjetPhp/panier.php");
xhr.onload = function() {
    if (xhr.status === 200) {
        // success
        // var data = ;
        console.log(xhr.responseText);
        let coursesObject = JSON.parse(xhr.responseText);
        // process the data
        coursesObject.forEach(course => {
            addCourseUi(course.image,course.title,course.category,course.price);
        })
    } else {
        // error
    }
};
xhr.send();

//buy an item: 
buyButton.addEventListener('click',() => {
    var xhr = new XMLHttpRequest();
        xhr.open('POST','http://localhost/emsiProjetPhp/commandeCh.php');
        xhr.send();
        xhr.onload = function() {
            if (xhr.status === 200) {
                // success*
                alert(xhr.responseText);
                // process the data
            } else {
                // error
                alert("error");
            }
        };
})


