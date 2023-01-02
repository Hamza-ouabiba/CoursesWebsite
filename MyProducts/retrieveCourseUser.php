<?php
    //connect to database : 
    session_start();    
    $host = "localhost";
    $username = "root";
    $dbName = "courses";
    $mysqli = mysqli_connect($host,$username,'',$dbName);
    if(!$mysqli)
        die("connction failed " . mysqli_connect_error());
    $user_id = $_SESSION['userId'];
    $sql = "select * from userclient u join commande c on u.userId = c.userid join contient co on c.idCmd = co.idCmd join course on co.idCourse = course.courseId where u.userId = $user_id and etat = 1";
    // Select all rows from the table
    $result = mysqli_query($mysqli, $sql);
    // Fetch the rows one by one

   if(mysqli_num_rows($result) > 0)
   {
       
        while ($row = mysqli_fetch_assoc($result))
            $data[] = $row;
        $json_data = json_encode($data);
       
        echo $json_data;        
       
   } else echo "";
    //close connection : 
    mysqli_close($mysqli);
?>
