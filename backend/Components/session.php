<?php

function startSessionFunction($username, $userID, $userEmail) {
    $_SESSION['Username'] = $username;

    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'user' => $username, 'userEmail' => $userEmail, 'userID' => $userID,  'sessionStatus' => session_status()]);
    exit();
};

function endSession() {
    session_destroy();
    echo json_encode(['success' => true]);
}