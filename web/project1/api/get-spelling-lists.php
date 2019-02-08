<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../models/database.php';
include_once '../models/spelling-list.php';
 
$database = new Database();
$db = $database->getConnection();
$spellingList = new SpellingList($db);

$stmt = $spellingList->read($_GET["studentid"]);
$num = $stmt->rowCount();
 
if($num>0){
 
    $results=array();
    $results["records"]=array();
 

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $result=array(
            "id" => $id,
            "name" => $name,
            "studentid"=>$studentid,
            "createddate"=>$createddate,
        );
 
        array_push($results["records"], $result);
    }
 
    http_response_code(200);
 
    echo json_encode($results);
}
 