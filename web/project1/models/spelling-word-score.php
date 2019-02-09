<?php
class SpellingWordScore{
    private $conn;

    public $id;
    public $spellingwordid;
    public $score;
    public $scoredate;
    public $deletedate;
 
    public function __construct($db){
        $this->conn = $db;
    }

    function read($spellingwordid){
        $query = "SELECT *
                    FROM spellingwordscore 
                    WHERE spellingwordid=:spellingwordid AND deletedate IS NULL
                    ORDER BY scoredate";
    
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":spellingwordid", $spellingwordid);
        $stmt->execute();
        return $stmt;
    }


    function create(){
        $query = "INSERT INTO spellingwordscore (id, spellingwordid, score, scoredate, deletedate) VALUES ('$this->id','$this->spellingwordid',:score,:scoredate,:deletedate)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":score", $this->score);
        $stmt->bindParam(":scoredate", $this->scoredate);
        $stmt->bindParam(":deletedate", $this->deletedate);
    
        if($stmt->execute()){
            return true;
        } 

        print_r($this->conn->errorInfo());
        print_r($stmt->errorInfo());
    
        return false;
        
    }

    function delete($id){
        $this->id = $id;
        $query = "UPDATE spellingwordscore SET deletedate = NOW() WHERE id='$this->id'";

        $stmt = $this->conn->prepare($query);
        if($stmt->execute()) {
            return true;
        }

        print_r($this->conn->errorInfo());
        print_r($stmt->errorInfo());

        return $stmt;
    }

}