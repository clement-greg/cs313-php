<?php 
     $conn_string = "host=localhost port=5432 dbname=Scriptures user=postgres password=Vespasian1";
     $dbconn = pg_connect($conn_string)
        or die('Could not connect: ' . pg_last_error());

    $qu = pg_query($dbconn, "SELECT * FROM scriptures WHERE id = " . $_GET["bookid"] .  "" )
        or die('Query failed: ' . pg_last_error());

    $data = pg_fetch_object($qu);
?>

<h1><?= $data->book; ?> <?= $data->chapter ?>:<?= $data->verse ?></h1>
<br>

<?= $data->content ?>