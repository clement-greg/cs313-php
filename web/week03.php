<html>
<body>

<div>
Welcome <?php echo $_POST["name"]; ?><br>
</div>

<div>
Your email address is: <a href="mailto:<?php echo $_POST["email"]; ?>"> <?php echo $_POST["email"]; ?></a>
</div>

<div>
Your major is: <?php echo $_POST["major"]; ?>
<div>
Your comments: <?php echo $_POST["comments"]; ?>
</div>

<div>Continents Visited:</div>

<ul>
<?php
$continentMap = array(
    "NA" => "North America",
    "SA" => "South America",
    "EU" => "Europe",
    "AS" => "Asia",
    "AU" => "Australia",
    "AF" => "Africa",
    "AT" => "Antarctica",
);


    foreach( $_POST["continents"] as $continent ) {
        print "<li>" . $continentMap[$continent] . "</li>";
        }
?>


</ul>
</body>
</html>