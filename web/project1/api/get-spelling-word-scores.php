<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../models/database.php';
include_once '../models/spelling-word-score.php';
 
$database = new Database();
$db = $database->getConnection();
$dataObject = new SpellingWordScore($db);

$stmt = $dataObject->read($_GET["spellingwordid"]);
$num = $stmt->rowCount();
 
if($num>0){
 
    $results=array();
    $results["records"]=array();
 

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $result=array(
            "id" => $id,
            "score" => $score,
            "spellingwordid"=>$spellingwordid,
            "scoredate"=>$scoredate,
            "deletedate"=>$deletedate
        );
 
        array_push($results["records"], $result);
    }
 
    http_response_code(200);
 
    echo json_encode($results);
}
 