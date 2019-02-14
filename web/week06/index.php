<?php

    
    include_once '../shared/spelling-list.php';

    $database = new Database();
    $db = $database->getConnection();


    $query = "INSERT INTO s (id, name, deletedate) VALUES ('$this->id', :name, :deletedate)";
    
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(":name", $this->name);
    $stmt->bindParam(":deletedate", $this->deletedate);

    if($stmt->execute()){
        return true;
    }
?>

<form action="index.php" method="post">

    Book
    <input type="text" name="book">
    <br>

    Chapter
    <input type="number" name="chapter">
    
    <br>
    Verse
    <input type="number" name="verse">
    
    <br>

    Content
    <textarea name="content" rows="10"></textarea>

    <br>

    <button type="submit">Submit</button>
</form>