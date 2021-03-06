<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT, OPTIONS");

include_once '../models/database.php';
include_once '../models/spelling-word.php';

$database = new Database();
$db = $database->getConnection();
 
$student = new SpellingWord($db);

$student->undoDelete($_GET["id"]);
http_response_code(200);