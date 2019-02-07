<style>
    .bold {
        font-weight: bold;
    }
</style>
<?php 
     $conn_string = "host=localhost port=5432 dbname=Scriptures user=postgres password=Vespasian1";
     $dbconn = pg_connect($conn_string)
    or die('Could not connect: ' . pg_last_error());
$qu = pg_query($dbconn, "SELECT * FROM scriptures")
or die('Query failed: ' . pg_last_error());

while ($data = pg_fetch_object($qu)) {
    echo "<span class='bold'>";
  echo $data->book . " ";
  echo $data->chapter . ":";
  echo $data->verse . ":";

  echo "</span> - ";
  
  echo $data->content;
  echo "<br><br>";
  //echo $data->deletedate . "<br />";
}
?>