<?php
    session_start();
    $host = "localhost";
    $username = "root";
    $dbName = "courses";
    $mysqli = mysqli_connect($host,$username,'',$dbName);
    if(!$mysqli)
        die("connction failed " . mysqli_connect_error());
    $etat = 1;
    // $queryListe = "INSERT INTO listeProduit(courseId,)"
    echo $_SESSION['idCmd'];
    //changer the state of the order to true : 
    $sql = "update commande set etat = ? where idCmd = ?";
    $stmt = mysqli_prepare($mysqli,$sql);
    mysqli_stmt_bind_param($stmt,"ii",$etat,$_SESSION['idCmd']);
    $result = mysqli_stmt_execute($stmt);
    //add this products to list of products : 
    //searching for these products in contient table : 
    $cmdId = $_SESSION['idCmd'];
    $queryContient = "SELECT * from contient where idCmd = $cmdId";
    $resultQuery = mysqli_query($mysqli, $queryContient);
    // Fetch the rows one by one
    if(mysqli_num_rows($resultQuery) > 0)
    {
        echo "contient db hna";
        while($row = mysqli_fetch_assoc($resultQuery))
        {
            // echo $row['idCmd'];
            $queryListe = "INSERT INTO listeProduit(courseId,userId) values(?,?)";
            $stmt = mysqli_prepare($mysqli,$queryListe);
            mysqli_stmt_bind_param($stmt,"ii",$row['idCourse'],$_SESSION['userId']);
            $insertCommande = mysqli_stmt_execute($stmt);
        }
    } 
    echo "commande payée";
?>  