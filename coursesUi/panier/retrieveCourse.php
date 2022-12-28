<?php
    //connect to database : 
    $host = "localhost";
    $username = "root";
    $dbName = "coursedb";
    $mysqli = mysqli_connect($host,$username,'',$dbName);
    if(!$mysqli)
        die("connction failed " . mysqli_connect_error());
    $sql = "SELECT * FROM course";
    // Select all rows from the table
    $result = mysqli_query($mysqli, $sql);
    // Fetch the rows one by one

    while ($row = mysqli_fetch_assoc($result))
    {
        $data[] = $row;
    }

    $json_data = json_encode($data);
    echo $json_data;        
    //close connection : 
    mysqli_close($mysqli);
?>