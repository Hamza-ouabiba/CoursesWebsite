<?php
    //connect to database : 
    session_start();
    $flag = false;
    $host = "localhost";
    $username = "root";
    $dbName = "coursedb";
    $mysqli = mysqli_connect($host,$username,'',$dbName);
    if(!$mysqli)
        die("connction failed " . mysqli_connect_error());
    $user_id = $_SESSION['userid'];
    $sql = "select idCmd from commande where userid = $user_id and etat = 0";
    $result = mysqli_query($mysqli, $sql);
    // Fetch the rows one by one
    if(mysqli_num_rows($result) > 0)
    {
        $row = $result->fetch_assoc();
        $cmd_id = $row['idCmd'];
        $sql = "SELECT * FROM contient where idCmd = $cmd_id";
        // Select all rows from the table
        $result = mysqli_query($mysqli, $sql);
        // Fetch the rows one by one
    
        while ($row = mysqli_fetch_assoc($result))
        {
            // echo $row['idCourse'] . " ";
            $idCo = $row['idCourse'];
            $sql = "select * from course where idCourse = $idCo";
            $result2 = mysqli_query($mysqli, $sql);
            if($rowCourse = mysqli_fetch_assoc($result2))
            {
                $data[] = $rowCourse;
            }
        }
        $_SESSION['cart'] = $data;
        $json_data = json_encode($data);
        echo $json_data; 
    }
    //close connection : 
    mysqli_close($mysqli);
?>