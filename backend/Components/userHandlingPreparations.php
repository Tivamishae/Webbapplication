<?php

function makeSaltHash($password): string
{
    $salt = openssl_digest(
        random_bytes(64),
        'sha256'
    );

    $hash = openssl_digest(
        $password . $salt,
        'sha256'
    );

    return $salt . $hash;
}

function verifySaltHash(
    string $password,
    string $saltHash
): bool {
    $salt = substr($saltHash, 0, 64);
    $hash = substr($saltHash, 64, 64);

    $newHash = openssl_digest(
        $password . $salt,
        'sha256'
    );

    if ($newHash == $hash) {
        return true;
    }
    return false;
}

function checkIfDBContainsUsername($db, $username) {
    $checker = $db->prepare('SELECT COUNT(*) FROM Users WHERE Username = :username');
    $checker->bindValue(':username', $username);
    $checker->execute();
    $count = $checker->fetchColumn();
    if ($count > 0) {
        echo "Username has already been used for another account";
        return true;
    } else {
        return false;
    }
}

function checkIfDBContainsEmail($db, $email) {
    $checker = $db->prepare('SELECT COUNT(*) FROM Users WHERE Email = :email');
    $checker->bindValue(':email', $email);
    $checker->execute();
    $count = $checker->fetchColumn();
    if ($count > 0) {
        echo "Email has already been used for another account.";
        return true;
    } else {
        return false;
    }
}

function verifyAttemptCreateAccount($username, $email, $password) {
    $verifier = 0;
    if (!(strlen($username) > 4 && strlen($username) < 21)) {
        $verifier = $verifier + 1;
    }
    if (!(strpos($email, "@gmail.com") || strpos($email, "@outlook.com") || strpos($email, "@yahoo.com") || strpos($email, "@hotmail.com"))) {
        $verifier = $verifier + 1;
    }
    if (!(strlen($password) > 7 && strlen($password) < 41 && preg_match('/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[0-9A-Za-z!@#$%]+$/', $password))) {
        $verifier = $verifier + 1;
    }
    if ($verifier == 0) {
        return true;
    } else {
        return false;
    }

}

function retrieveUserInformationUsername($db, $username) {
    $db_user = $db->prepare("SELECT * FROM Users WHERE Username = :username");
    $db_user->bindParam(':username', $username);
    $db_user->execute();
    $row = $db_user->fetch();

    return $row;
}

function retrieveUserInformationEmail($db, $email) {
    $db_user = $db->prepare("SELECT * FROM Users WHERE Email = :email");
    $db_user->bindParam(':email', $email);
    $db_user->execute();
    $row = $db_user->fetch();

    return $row;
}

function checkPassword($row, $password) {
    if (verifySaltHash($password, $row['Password'])) {
        return true;
    }
    return false;
}