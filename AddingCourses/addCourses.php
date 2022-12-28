<?php
    $host = "localhost";
    $username = "root";
    $dbName = "courses";
    $mysqli = mysqli_connect($host,$username,'',$dbName);
    $data = json_decode(file_get_contents("php://input"));
    // $query = "INSERT INTO course(title, category,image,price) VALUES ('" . $data->title . "', '" . $data->category . "', '" . $data->image . "', '" . $data->price . "')";
    // mysqli_query($mysqli, $query);
    // $result = mysqli_stmt_execute($stmt);
    $query = "INSERT INTO course(title, category,image,price) VALUES (?,?,?,?)";
    $stmt = mysqli_prepare($mysqli,$query);
    mysqli_stmt_bind_param($stmt, "sssd", $data->title, $data->category,$data->image,$data->price);
    $result = mysqli_stmt_execute($stmt);
    echo "true";
    mysqli_close($mysqli);
?>