<?php
class SpellingList{
    private $conn;
    public $id;
    public $name;
    public $studentid;
    public $deletedate;
    public $createddate;
 
    public function __construct($db){
        $this->conn = $db;
    }

function read($studentid){
    $query = "SELECT
                *
            FROM spellinglist WHERE studentid=:studentid ORDER BY createddate";
 
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":studentid", $studentid);
    $stmt->execute();
    return $stmt;
}
function create(){
 
    // query to insert record
    $query = "INSERT INTO spellinglist (id,name,studentid,createddate) VALUES ('$this->id',:name,'$this->studentid',:createddate)";
 
    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->name=htmlspecialchars(strip_tags($this->name));
    //$this->id=htmlspecialchars(strip_tags($this->id));
    //$this->studentid=htmlspecialchars(strip_tags($this->studentid));
    $this->studentid=htmlspecialchars(strip_tags($this->createddate));

 
    // bind values
    $stmt->bindParam(":name", $this->name);
    $stmt->bindParam(":id", $this->id);
    $stmt->bindParam(":studentid", $this->studentid);
    $stmt->bindParam(":createddate", $this->createddate);
 
    // execute query
    if($stmt->execute()){
        return true;
    } 

    print_r($this->conn->errorInfo());
    print_r($stmt->errorInfo());
 
    return false;
     
}
}