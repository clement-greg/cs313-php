<?php
    // required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../models/database.php';
    include_once '../models/spelling-word-score.php';

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        
        http_response_code(200);
    }
    else { 

    
    $database = new Database();
    $db = $database->getConnection();
    
    $dataObject = new SpellingWordScore($db);
    
    $data = json_decode(file_get_contents("php://input"));
    
    if(
        !empty($data->id)
    ){
    
        $dataObject->score = $data->score;
        $dataObject->id = $data->id;
        $dataObject->spellingwordid = $data->spellingwordid;
        $dataObject->scoredate = $data->scoredate;
        $dataObject->deletedate = $data->deletedate;
    
        if($dataObject->create()){
    
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