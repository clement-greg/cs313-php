<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../models/database.php'; 
include_once '../models/spelling-list.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    
    http_response_code(200);
}
else { 

 
$database = new Database();
$db = $database->getConnection();
 
$spellingList = new SpellingList($db);
 
$data = json_decode(file_get_contents("php://input"));
 
if(
    !empty($data->name) &&
    !empty($data->id)
){
 
    $spellingList->name = $data->name;
    $spellingList->id = $data->id;
    $spellingList->studentid = $data->studentid;
    $spellingList->createddate = $data->createddate;
 
    if($spellingList->create()){
 
        http_response_code(201);
 
        echo json_encode(array("message" => "Created"));
    }
 
    else{
        http_response_code(503);

        echo json_encode(array("message" => "Unable to create"));
    }
}
 
else{
    http_response_code(400);
 
    echo json_encode(array("message" => "Unable to create. Data is incomplete."));
}
}
?>