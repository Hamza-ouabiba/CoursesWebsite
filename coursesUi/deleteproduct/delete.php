<?php
    session_start();
    $host = "localhost";
    $username = "root";
    $dbName = "courses";
    $mysqli = mysqli_connect($host,$username,'',$dbName);
    $data = json_decode(file_get_contents("php://input"));
    $_idcmd = $_SESSION['idCmd'];
    $query = "DELETE from contient where idCourse = ? and idCmd = ?";
    $stmt = mysqli_prepare($mysqli,$query);
    mysqli_stmt_bind_param($stmt, "ii", $data,$_idcmd);
    $result = mysqli_stmt_execute($stmt);
    echo $_idcmd;
    mysqli_close($mysqli);
?>