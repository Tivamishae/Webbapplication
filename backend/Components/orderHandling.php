<?php

function getOrders($db, $userID) {
    $db_orders = $db->prepare("SELECT * FROM FullOrder WHERE UserID = :userId");
    $db_orders->bindParam(':userId', $userID);
    $db_orders->execute();
    $rows = $db_orders->fetchAll();
    $orderIDs = array();
    foreach ($rows as $row) {
        $orderIDs[] = $row['OrderID'];
    }

    return $orderIDs;
}

function getPartOrders($db, $fullOrderIds) {
    $db_partOrders = $db->prepare("SELECT * FROM PartOfOrder WHERE FullOrderID = :orderId");
    $result = [];

    foreach ($fullOrderIds as $orderID) {
        $db_partOrders->bindParam(':orderId', $orderID);
        $db_partOrders->execute();
        $rows = $db_partOrders->fetchAll();
        $result = array_merge($result, $rows);
    }

    return json_encode($result);
}

function insertFullOrder($db, $userID) {
        $prepIns = $db->prepare("INSERT INTO FullOrder(UserID) VALUES(:userID)");
        $prepIns->bindParam(':userID', $userID);
        $prepIns->execute();
}

function insertOrderParts($db, $userID, $orderPartsArray) {
$db_orders = $db->prepare("SELECT * FROM FullOrder WHERE UserID = :userId ORDER BY OrderID DESC LIMIT 1");
$db_orders->bindParam(':userId', $userID);
$db_orders->execute();
$row = $db_orders->fetch();
$fullOrderID = $row[0];

foreach ($orderPartsArray as $orderPart) {
        $orderPartImage = $orderPart[0];
        $orderPartQuantity = $orderPart[1];
        $prepIns = $db->prepare("INSERT INTO PartOfOrder(FullOrderID, WareImage, Quantity) VALUES(:fullOrderId, :wareImage, :quantity)");
        $prepIns->bindParam(':fullOrderId', $fullOrderID);
        $prepIns->bindParam(':wareImage', $orderPartImage);
        $prepIns->bindParam(':quantity', $orderPartQuantity);
        $prepIns->execute();
}
}