<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");

include_once '../models/database.php';
include_once '../models/spelling-list.php';

$database = new Database();
$db = $database->getConnection();
 
$spellingList = new SpellingList($db);

$spellingList->delete($_GET["id"]);
http_response_code(200);