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
}