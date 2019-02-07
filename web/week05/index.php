<?php
// phpinfo(); 
 $conn_string = "host=ec2-107-20-183-142.compute-1.amazonaws.com port=5432 dbname=ds7cisu21aeil user=dqcpqyfmbwvsjb password=46f69c31bacaa758a39f212f85f8fbf05ade706d7e5abb50e108225424194641";
// $dbconn4 = pg_connect($conn_string);
//echo extension_loaded('pgsql') ? 'yes':'no';

// $conn_string = "host=ec2-107-20-183-142.compute-1.amazonaws.com port=5432 dbname=ds7cisu21aeil user=dqcpqyfmbwvsjb password=46f69c31bacaa758a39f212f85f8fbf05ade706d7e5abb50e108225424194641";
$dbconn4 = pg_connect($conn_string)
    or die('Could not connect: ' . pg_last_error());
$qu = pg_query($dbconn4, "SELECT * FROM student")
or die('Query failed: ' . pg_last_error());;



while ($data = pg_fetch_object($qu)) {
    echo "also works";
  echo $data->id . " (";
  echo $data->name . "): ";
  //echo $data->deletedate . "<br />";
}
echo "Done Here";

pg_free_result($qu);
pg_close($db_conn);
?>
<h1>Test</h1>