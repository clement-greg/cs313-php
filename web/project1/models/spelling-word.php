<?php
class SpellingWord{
    private $conn;

    public $id;
    public $word;
    public $spellinglistid;
    public $deletedate;
    public $createddate;
 
    public function __construct($db){
        $this->conn = $db;
    }

function read($spellingListId){
    $query = "SELECT *
                FROM spellingword 
                WHERE spellinglistid=:spellingListId 
                ORDER BY createddate";
 
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":spellingListId", $spellingListId);
    $stmt->execute();
    return $stmt;
}
function create(){
 
    // query to insert record
    $query = "INSERT INTO spellingword (id,word,spellinglistid, createddate, deletedate) VALUES ('$this->id',:word,'$this->spellinglistid',:createddate,:deletedate)";
 
    // prepare query
    $stmt = $this->conn->prepare($query);

 
    // bind values
    $stmt->bindParam(":word", $this->word);
    $stmt->bindParam(":createddate", $this->createddate);
    $stmt->bindParam(":deletedate", $this->deletedate);
 
    // execute query
    if($stmt->execute()){
        return true;
    } 

    print_r($this->conn->errorInfo());
    print_r($stmt->errorInfo());
 
    return false;
     
}
}