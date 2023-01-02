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
    $sql = "select * from listeproduit join userclient on listeproduit.userId = userclient.userId join course on listeproduit.courseId = course.courseId where userclient.userId = 
   $user_id";
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
