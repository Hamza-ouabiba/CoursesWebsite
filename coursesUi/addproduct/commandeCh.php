<?php
    session_start();
    $host = "localhost";
    $username = "root";
    $dbName = "coursedb";
    $mysqli = mysqli_connect($host,$username,'',$dbName);
    if(!$mysqli)
        die("connction failed " . mysqli_connect_error());
    $etat = 1;
    $sql = "update commande set etat = ? where idCmd = ?";
    $stmt = mysqli_prepare($mysqli,$sql);
    mysqli_stmt_bind_param($stmt,"ii",$etat,$_SESSION['idCmd']);
    $result = mysqli_stmt_execute($stmt);

    echo "commande payée";
?>  