<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include("db.php");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$query = "SELECT id,product_name, price, quantity, img_url FROM products WHERE category = 'Huawei'";
$stmt = $conn->prepare($query);

if ($stmt->execute()) {
    $result = $stmt->get_result();

    $products = [];

    while ($row = $result->fetch_assoc()) {
        $row['img_url'] = "http://localhost/project1/backend/uploads/" . basename($row['img_url']);
        $products[] = $row;
    }

    echo json_encode($products);
} else {
    echo json_encode(["error" => "Failed to fetch products"]);
}
