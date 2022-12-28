$(document).ready(function() {
$('#m-form').submit(function(event) {
    event.preventDefault();
    var username = $('#username').val();
    var password = $('#password').val();
    $.ajax({
    type: 'POST',
    url: 'http://localhost/emsiProjetPhp/login.php',
    data: { 
        username: username,
        password: password
    },
    success: function(data) {
        console.log(data);
        if (data == '1') {
            alert('Login successful!');
            window.location = "http://localhost/MiniProjetV2/menu/menu.html";
        } else {
        alert(data);
        }
    }
    });
});
});
//to logout : 

$('#signOut').click(function(event) {
    event.preventDefault();
})