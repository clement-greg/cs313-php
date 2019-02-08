<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 

include_once '../models/database.php';
include_once '../models/student.php';
 
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    http_response_code(200);
} 
else {
$database = new Database();
$db = $database->getConnection();
 
$dataObject = new Student($db);
 
$data = json_decode(file_get_contents("php://input"));
 
if(
    !empty($data->name) 
){
 
    // set product property values
    $dataObject->id = $data->id;
    $dataObject->name = $data->name;
    $dataObject->deletedate = $data->deletedate;
 
    if($dataObject->create()){
        http_response_code(201);
        echo json_encode(array("message" => "Created."));
    }
    else{
        http_response_code(503);
        echo json_encode(array("message" => "Unable to create product."));
    }
}
 
else{
 
    http_response_code(400);
 
    echo json_encode(array("message" => "Data is incomplete."));
}
}
?>