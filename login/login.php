<?php
    //connect to database :
    session_start();
    $host = "localhost";
    $username = "root";
    $dbName = "courses";
    $mysqli = mysqli_connect($host,$username,'',$dbName);
    if(!$mysqli)
        die("connction failed " . mysqli_connect_error());
    //get data from form : 
    
    $username = $_POST["username"];
    $password = $_POST["password"];
    //insert data to database : 
    $sql = "SELECT * FROM userclient WHERE name = '$username' and passwordC = '$password'";
    // Select all rows from the table
    $result = mysqli_query($mysqli, $sql);
    // Fetch the rows one by one
    if(mysqli_num_rows($result) > 0)
    {
        $row = $result->fetch_assoc();
        $user_id = $row['userId'];
        $_SESSION['userId'] = $user_id;
        echo '1';
    }
    else
        echo '0';
        
    //close connection : 
    mysqli_close($mysqli);
?>