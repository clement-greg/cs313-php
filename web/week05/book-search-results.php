<?php 
     $conn_string = "host=localhost port=5432 dbname=Scriptures user=postgres password=Vespasian1";
     $dbconn = pg_connect($conn_string)
    or die('Could not connect: ' . pg_last_error());
$qu = pg_query($dbconn, "SELECT * FROM scriptures WHERE book = '" . $_GET["book"] .  "'" )
or die('Query failed: ' . pg_last_error());



?>


<?php while($data = pg_fetch_object($qu)): ?>
<ul>
<li>
    <a href='book-details.php?bookid=<?= $data->id ?>'>

        <?= $data->book ?> <?= $data->chapter ?>:<?= $data->verse ?>
    </a>
</li>
</ul>
<?php endwhile; ?>
