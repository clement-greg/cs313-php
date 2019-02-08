<?php
class Database{
 
    // specify your own database credentials
    private $host = "localhost";
    private $db_name = "api_db";
    private $username = "root";
    private $password = "";
    public $conn;
 
    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO('pgsql:host=ec2-107-20-183-142.compute-1.amazonaws.com;port=5432;dbname=ds7cisu21aeil;user=dqcpqyfmbwvsjb;password=46f69c31bacaa758a39f212f85f8fbf05ade706d7e5abb50e108225424194641');
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>