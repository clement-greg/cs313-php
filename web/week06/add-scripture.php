
<form action="save-scripture.php" method="post">

Book<br>
<input type="text" name="book">
<br>
Chapter<br>
<input type="number" name="chapter">
<br>
Verse<br>
<input type="number" name="verse">
<br>
Content
<textarea name="content" rows="6"></textarea>

<?php
    $conn;
    include_once '../shared/local-db.php';

    // $database = new Database();
    // $db = $database->getConnection();

    $conn = new PDO("pgsql:host=localhost;port=5432;dbname=Scriptures;user=postgres;password=Vespasian1");
    $conn->exec("set names utf8");

    $query = "SELECT * FROM topic ORDER BY name";

    $statement = $conn->prepare($query);

    if($statement->execute()) {
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)){
            extract($row);


            $result=array(
                "id" => $id,
                "name" => $name
            );
     
            echo "<input type='checkbox' name='topic[]' value='$id'> $name <br>";
        }
    } else {
        print_r($statement->errorInfo());
    }
?>

<button type="submit">Save</button>
</form>