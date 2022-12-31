<?php
    //connect to database : 
    session_start();
    $flag = false;
    $host = "localhost";
    $username = "root";
    $dbName = "courses";
    $mysqli = mysqli_connect($host,$username,'',$dbName);
    if(!$mysqli)
        die("connction failed " . mysqli_connect_error());
    $user_id = $_SESSION['userId'];
    $sql = "select idCmd from commande where userid = $user_id and etat = 0";
    $result = mysqli_query($mysqli, $sql);
    // Fetch the rows one by one
    if(mysqli_num_rows($result) > 0)
    {
        $row = $result->fetch_assoc();
        $cmd_id = $row['idCmd'];
        $query = "SELECT * FROM contient where idCmd = $cmd_id";
        // Select all rows from the table
        $res = mysqli_query($mysqli, $query);
        // Fetch the rows one by one
        if(mysqli_num_rows($res) > 0)
        {
            while ($row = mysqli_fetch_assoc($res))
            {
                $idCo = $row['idCourse'];
                $querCourse = "select * from course where courseId = $idCo";
                $result2 = mysqli_query($mysqli, $querCourse);
                if($rowCourse = mysqli_fetch_assoc($result2))
                {
                    $data[] = $rowCourse;
                }
            }
            $_SESSION['cart'] = $data;
            $json_data = json_encode($data);
            echo $json_data; 
        } 
        
    }
    //close connection : 
    mysqli_close($mysqli);
?>