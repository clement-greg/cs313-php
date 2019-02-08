<?php
class Student{
 

    private $conn;
 
    public $id;
    public $name;
    public $deletedate;
 
    public function __construct($db){
        $this->conn = $db;
    }

    function read(){
        $query = "SELECT *
                FROM student
                ORDER BY name";
    
        $stmt = $this->conn->prepare($query);
    
        if(!$stmt->execute()) {
            print_r($stmt->errorInfo());
        }
    
        return $stmt;
    }

function create(){
 
    $query = "INSERT INTO student (id, name, deletedate) VALUES ('$this->id', :name, :deletedate)";
 
    $stmt = $this->conn->prepare($query);
 
    $stmt->bindParam(":name", $this->name);
    $stmt->bindParam(":deletedate", $this->deletedate);
 
    if($stmt->execute()){
        return true;
    }
 
    return false;
     
}
}