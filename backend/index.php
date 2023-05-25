<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

$db = new PDO('sqlite:Webbapplication.db');

include './Components/userHandling.php';
include './Components/OrderHandling.php';
include './Components/email.php';



if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode (file_get_contents('php://input'));
    $type = $data->type;

    switch ($type) {
        case 'loginRequest':
            $loginVariable = $data->loginVariable;
            $password = $data->password;
            checkIfLoginRequestValid($db, $loginVariable, $password);
            break;

        case 'logoutRequest':
            endSession();
            break;

        case 'createAccount':
            $username = $data->username;
            $email = $data->email;
            $password = $data->password;
            insertUser($db, $username, $password, $email);
            break;

        case 'getOrders':
            $userID = $data->userID;
            echo getPartOrders($db, getOrders($db, $userID));
            break;

        case 'insertOrder':
            $userID = $data->userID;
            $orderPartsArray = $data->orderPartsArray;
            insertFullOrder($db, $userID);
            insertOrderParts($db, $userID, $orderPartsArray);
            $user = retrieveUserInformationUserID($db, $userID);
            $userEmail = $user['Email'];
            sendEmail($userEmail, "Apollo Order", "Hello there, you have just made an order on Apollo.");
    }
}