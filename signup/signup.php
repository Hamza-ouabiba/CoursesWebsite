<?php
    //connect to database : 
    $host = "localhost";
    $username = "root";
    $dbName = "courses";
    $mysqli = mysqli_connect($host,$username,'',$dbName);
    if(!$mysqli)
        die("connction failed " . mysqli_connect_error());
    //get data from form : 
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    //insert data to database : 
    $sql = "INSERT INTO USERCLIENT (email,name,passwordC) values(?,?,?)";
    $stmt = mysqli_prepare($mysqli,$sql);
    mysqli_stmt_bind_param($stmt,"sss",$email,$username,$password);
    $result = mysqli_stmt_execute($stmt);

    if($result){
        echo "Data stored";
    } else 
        echo "error ";

    //close connection : 
    mysqli_close($mysqli);
?>
