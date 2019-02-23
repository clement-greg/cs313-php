
<?php

include_once '../shared/local-db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST'){

    $db = new Database();
    $conn = $db->getConnection();

    $hashedPassword = password_hash($_POST["password"], PASSWORD_DEFAULT);
    
    $query = "INSERT INTO login (username, password) VALUES (:username, :password)";
    
    $stmt = $conn->prepare($query);

    $stmt->bindParam(":username", $_POST["userName"]);
    $stmt->bindParam(":password", $hashedPassword);
    if($stmt->execute()){
        header('Location: login.php');
        die();
    }else {
        print_r($stmt->errorInfo());
    }


}
?>

<form action="sign-up.php" method="post">

    User Name
    <input type="text" name="userName"><br>

    Password: <input type="password" name="password"><br>

    <button type="submit">Save</button>
</form>