
<?php

include_once '../shared/local-db.php';


if ($_SERVER['REQUEST_METHOD'] == 'POST'){

    $db = new Database();
    $conn = $db->getConnection();

    $hashedPassword = password_hash($_POST["password"], PASSWORD_DEFAULT);
    
    $query = "SELECT * FROM login WHERE username=:username";
    
    $stmt = $conn->prepare($query);

    $stmt->bindParam(":username", $_POST["userName"]);

    if($stmt->execute()){
        $count = $stmt->rowCount();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);


            $result=array(
                "password" => $password
            );
     
            if(password_verify($_POST["password"], $password)) {
                header('Location: welcome.php');
                die();
            }
        }
        echo "invalid user name or password!";
    }else {
        print_r($stmt->errorInfo());
    }


}
?>

<form action="login.php" method="post">

    User Name
    <input type="text" name="userName"><br>

    Password: <input type="password" name="password"><br>

    <button type="submit">Log In</button>
</form>