<?php
    //connect to database : 
    session_start();
    $host = "localhost";
    $username = "root";
    $dbName = "courses";
    $mysqli = mysqli_connect($host,$username,'',$dbName);
    $registration_time = date("Y-m-d H:i:s");  // current date and time
    // Get the current user's ID
    $user_id = $_SESSION['userId'];
    if(!$mysqli)
        die("connction failed " . mysqli_connect_error());
    function checkCourseData($id_cmd,$_courseId) 
    {
        $sql = "SELECT * from contient where idCourse = $id_cmd AND idCmd = $courseId";
        $stmt = mysqli_prepare($mysqli,$sql);
        mysqli_stmt_bind_param($stmt,"sii",$registration_time,$user_id,$etat);
        $result = mysqli_stmt_execute($stmt); 
        if(mysqli_num_rows($result) > 0)
            return true;
        return false;
    }
    //check if the session variable has only one order if so then just keep the order id : 
    //insert data to database : 
    
    //inserting product to table product : 
    $sql = "select idCmd from commande where userid = $user_id and etat = 0";
    $result = mysqli_query($mysqli, $sql);
    // Fetch the rows one by one
    if(mysqli_num_rows($result) > 0)
    {
        $row = $result->fetch_assoc();
        $cmd_id = $row['idCmd'];
        $_SESSION['idCmd'] = $cmd_id;
        
    } else 
    {
        $etat = 0;
        $sql = "INSERT INTO commande(dateEffe,userid,etat) values(?,?,? )";
        $stmt = mysqli_prepare($mysqli,$sql);
        mysqli_stmt_bind_param($stmt,"sii",$registration_time,$user_id,$etat);
        $result = mysqli_stmt_execute($stmt);
        $sql = "select idCmd from commande where userid = $user_id and etat = 0";
        $result = mysqli_query($mysqli, $sql);
        // Fetch the rows one by one
        if(mysqli_num_rows($result) > 0)
        {
            $row = $result->fetch_assoc();
            $cmd_id = $row['idCmd'];
            $_SESSION['idCmd'] = $cmd_id;
        }
    }
    //getting the course id from the ajax requst : 
    $json = file_get_contents('php://input');
    print($json);
    $obj = json_decode($json);
    $courseId = $obj->CourseId;
    //insert course and command to contient table : 
    $sql = "INSERT INTO contient(idCmd,idCourse) values(?,?)";
    $stmt = mysqli_prepare($mysqli,$sql);
    mysqli_stmt_bind_param($stmt,"ii",$cmd_id,$courseId);
    $result = mysqli_stmt_execute($stmt);
    //close connection : 
    echo $cmd_id;
    mysqli_close($mysqli);
?>