var username = document.getElementById("username");
var passCon = document.getElementById("pass_con");
var password = document.getElementById("pass");
var email = document.getElementById("email");
var form = document.querySelector('#m-form');
var feedback = document.querySelector('.feedback');
var patternUsername = /[a-zA-Z]{7,}/;
var patternEmail = /[a-zA-Z]*@[a-zA-Z0-9_+-]*.[a-zA-Z0-9]*/;
var patternPass = /[a-zA-Z0-9+]{8,}/;
const clearFields = () =>{
    username.style.border = "1px solid rgb(206, 206, 206)";
    email.style.border = "1px solid rgb(206, 206, 206)";
    password.style.border = "1px solid rgb(206, 206, 206)";
    passCon.style.border = "1px solid rgb(206, 206, 206)";
    username.value = "";
    email.value = "";
    passCon.value = "";
    password.value = "";
}
//test on username : 
username.addEventListener('keyup',(e) => {
    let errorDiv = document.querySelector('.erroruser');
    if(!patternUsername.test(username.value)){
        username.style.border ="1px solid red";
        errorDiv.style.color = "red";
        errorDiv.textContent = "username must contain in minimum 7 chars "
    } else {
        username.style.border ="1px solid green";
        errorDiv.textContent = "";
    }
});

//test on email : 
email.addEventListener('keyup',(e) => {
    let errorDiv = document.querySelector('.errorEmail');
    if(!patternEmail.test(email.value)){
        email.style.border ="1px solid red";
        errorDiv.style.color = "red";
        errorDiv.textContent = "Email not valid Try again";
    } else 
        email.style.border ="1px solid green";
        errorDiv.textContent = "";
});

//test on password : 
password.addEventListener('keyup',(e) => {
    let errorDiv = document.querySelector('.errorPass');
    if(!patternPass.test(password.value)){
        password.style.border ="1px solid red";
        errorDiv.style.color = "red";
        errorDiv.textContent = "password must contain in minimum 8 chars";
    } else {
         password.style.border ="1px solid green";
         errorDiv.textContent = "";
    }
});
passCon.addEventListener('keyup',(e) => {
    let errorDiv = document.querySelector('.errorPassCon');
    if(password.value != passCon.value){
        passCon.style.border ="1px solid red";
        errorDiv.style.color = "red";
        errorDiv.textContent = "password not matching";
    } else {
         passCon.style.border ="1px solid green";
         errorDiv.textContent = "";
    }
});

//submitting form test all fields : 
form.addEventListener('submit',(e) => {
    e.preventDefault(); //to prevent the form from being submitted : 
    let flag = false;
    if(!patternPass.test(password.value)){
        password.style.border = "1px solid red";
        flag = true;
    } else 
    {
       //test if the password = confirm password : 
       if(password.value != passCon.value)
       {
           flag = true;
           passCon.style.border = "1px solid red";
       }
    }
    if(!patternEmail.test(email.value)){
       email.style.border = "1px solid red";
       flag = true;
    }
    if(!patternUsername.test(username.value)){
       username.style.border = "1px solid red";
       flag = true;
    }
    //if data is verified => sending data via xmlhttpsrequest : 
    if(!flag) {
        let formData = new FormData(form);
        formData.append('email',email.value);
        formData.append('username',username.value);
        formData.append('password',password.value);
        // Send the FormData object as an AJAX request
        var xhr = new XMLHttpRequest();
        //clear fields:  
        clearFields();
        var xhr = new XMLHttpRequest();
        xhr.open('POST','http://localhost/emsiProjetPhp/signup.php');
        xhr.send(formData);
        xhr.onload = function() {
            if (xhr.status === 200) {
                // success*
                console.log(xhr.responseText);
                alert('Compte crée');
                // process the data
            } else {
                // error
                alert('Compte non crée');
            }
        };
        setTimeout(() => {
            feedback.textContent = "Compte crée avec succés";
             feedback.style.backgroundColor = "rgb(124, 250, 124)";
        },2);
        feedback.textContent = "";
        feedback.style.backgroundColor = "none";
    } 
})