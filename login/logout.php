<?php
    $xml = file_get_contents('php://input');
    $obj = simplexml_load_string($xml);

    // Now you can access the elements of the XML document using the arrow operator (->)
    if ($obj->type == 'logout') {
        // Perform logout actions
        session_destroy();
        header('Location: http://localhost/MiniProjetV2/login/index.html');
        exit();
    }
?>