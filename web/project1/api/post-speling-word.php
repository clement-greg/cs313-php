<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../models/database.php';
include_once '../models/spelling-word.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    
    http_response_code(200);
}
else { 

 
$database = new Database();
$db = $database->getConnection();
 
$spellingWord = new SpellingWord($db);
 
$data = json_decode(file_get_contents("php://input"));
 
if(
    !empty($data->id)
){
 
    $spellingWord->word = $data->word;
    $spellingWord->id = $data->id;
    $spellingWord->spellinglistid = $data->spellinglistid;
    $spellingWord->createddate = $data->createddate;
    $spellingWord->deletedate = $data->deletedate;
 
    if($spellingWord->create()){
 
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