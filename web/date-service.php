<?php 

    $dateObj->date = date("h:i:sa");

    $dateJSON = json_encode($dateObj);

    echo $dateJSON;
?>