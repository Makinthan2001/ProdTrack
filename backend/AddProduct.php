<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include("db.php");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$productName = $_POST['productName'] ?? '';
$category = $_POST['category'] ?? '';
$quantity = $_POST['quantity'] ?? '';
$price = $_POST['price'] ?? '';

$targetDir = "uploads/";
$imageName = basename($_FILES["image"]["name"]);
$targetFile = __DIR__ . "/" . $targetDir . $imageName;

if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
    $imgPathInDB = $targetDir . $imageName;
} else {
    echo json_encode(["status" => "error", "message" => "Image upload failed"]);
    exit();
}

$stmt = $conn->prepare("INSERT INTO products (product_name, category, price, quantity, img_url) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("ssdis", $productName, $category, $price, $quantity, $targetFile);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Product added successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Insert failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>


