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
        // echo "commande ".$cmd_id;
    } else 
    {
        $etat = 0;
        $sql = "INSERT INTO commande(dateEffe,userid,etat) values(?,?,?)";
        $stmt = mysqli_prepare($mysqli,$sql);
        mysqli_stmt_bind_param($stmt,"sii",$registration_time,$user_id,$etat);
        $insertCommande = mysqli_stmt_execute($stmt);
        $queryCommande = "select idCmd from commande where userid = $user_id and etat = 0";
        $result = mysqli_query($mysqli, $queryCommande);
        // Fetch the rows one by one
        if(mysqli_num_rows($result) > 0)
        {
            while($row = mysqli_fetch_assoc($result))
            {
                // echo $row['idCmd'];
                $cmd_id = $row['idCmd'];
                $_SESSION['idCmd'] = $cmd_id;
            }
        } 
    }
    //getting the course id from the ajax requst : 
    $json = file_get_contents('php://input');
    // print($json);
    $obj = json_decode($json);
    $courseId = $obj->CourseId;
    // echo $_SESSION['idCmd'];
    // print($_SESSION['idCmd']);
    //check if the user already bought to this user : 
    $query = "select * from userclient join commande on userclient.userId = commande.userid join contient on commande.idCmd = contient.idCmd where contient.idCourse = $courseId and userclient.userId = $user_id";
    $res = mysqli_query($mysqli, $query);
    if(mysqli_num_rows($res) > 0)
        echo "no";
     else 
    {
        //insert course and command to contient table : 
        $sqlCart = "INSERT INTO contient(idCmd,idCourse) values(?,?)";
        $stmt = mysqli_prepare($mysqli,$sqlCart);
        mysqli_stmt_bind_param($stmt,"ii",$cmd_id,$courseId);
        $result = mysqli_stmt_execute($stmt);
        //close connection : 
        echo "yes";
        // echo $cmd_id;
    }
    mysqli_close($mysqli);
    
?>