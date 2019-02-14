<?php
class Database{
 
    // specify your own database credentials
    private $host = "localhost";
    private $db_name = "Scriptures";
    private $username = "postgres";
    private $password = "Vespasian1";
    public $conn;
 
    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO('pgsql:host=$host;port=5432;dbname=$db_name;user=$username;password=$password');
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>