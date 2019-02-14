<?php
    $conn;
    include_once '../shared/local-db.php';

    // $database = new Database();
    // $db = $database->getConnection();

    $conn = new PDO("pgsql:host=localhost;port=5432;dbname=Scriptures;user=postgres;password=Vespasian1");
    $conn->exec("set names utf8");



    $book = $_POST["book"];
    $chapter = $_POST["chapter"];
    $number = $_POST["number"];
    $content = $_POST["content"];
    $verse = $_POST["verse"];
    $topics = $_POST["topic"];


    $query = "INSERT INTO Scriptures (Book, Chapter, Verse, Content) VALUES (:book, :chapter, :verse, :content)";
    $stmt = $conn->prepare($query);
    
    $stmt->bindParam(":book", $book);
    $stmt->bindParam(":chapter", $chapter);
    $stmt->bindParam(":verse", $verse);
    $stmt->bindParam(":content", $content);

    if($stmt->execute()){
        $newid = $conn->lastInsertId();

        foreach($topics as $value) {
            $query = "INSERT INTO ScriptureTopics (ScriptureId, TopicId) VALUES (:scriptureid, :topicid)";

            $stmt = $conn->prepare($query);
            $stmt->bindParam(":scriptureid", $newid);
            $stmt->bindParam(":topicid", $value);

            if($stmt->execute()) {

            } else {
                print_r($stmt->errorInfo());
            }
        }
        
    } else {
        print_r($stmt->errorInfo());
    }



    $query = "SELECT * FROM Scriptures";
    $stmt = $conn->prepare($query);
    if($stmt->execute()) {
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            echo "Echo!!";
            extract($row);


            $result=array(
                "chapter" => $chapter,
                "verse" => $verse,
                "book" => $book,
                "content" => $content,
                "id" => $id
            );
     
            echo "$chapter, $verse, $book, $content";

            $query = "SELECT name FROM Topic INNER JOIN ScriptureTopics ON Topic.id = ScriptureTopics.TopicId WHERE ScriptureTopics.scriptureid = :scriptureid";
            $innerStatement = $conn->prepare($query);
            $innerStatement->bindParam(":scriptureid", $id);
            if($innerStatement->execute()) {
                while($innerRow = $innerStatement->fetch(PDO::FETCH_ASSOC)){
                    extract($innerRow);

                    $innerResults = array(
                        "name" => $name
                    );

                    echo("topic: $name");
                }
            } else {
                print_r($innerStatement->errorInfo());

            }
        }
    } else {
        print_r($stmt->errorInfo());
    }

    ?>