<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include("db.php");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get the ID from the URL
$requestUri = $_SERVER['REQUEST_URI'];
$parts = explode("/", $requestUri);
$id = end($parts);
$id = intval($id);

// Handle GET request (fetch product)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT id, product_name, price, quantity, img_url, category FROM products WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($row = $result->fetch_assoc()) {
            $row['img_url'] = "http://localhost/project1/backend/uploads/" . basename($row['img_url']);
            echo json_encode($row);
        } else {
            echo json_encode(["error" => "Product not found"]);
        }
    } else {
        echo json_encode(["error" => "Failed to fetch product"]);
    }
    exit();
}

// Handle POST/PUT request (update product)
if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = $_POST;
    $file = $_FILES['image'] ?? null;
    
    // Basic validation
    if (empty($data['product_name']) || empty($data['category']) || 
        empty($data['quantity']) || empty($data['price'])) {
        echo json_encode(["error" => "All fields are required"]);
        exit();
    }
    
    try {
        // If a new image was uploaded
        if ($file && $file['error'] === UPLOAD_ERR_OK) {
            $targetDir = "uploads/";
            $targetFile = $targetDir . basename($file["name"]);
            
            // Move uploaded file
            if (!move_uploaded_file($file["tmp_name"], $targetFile)) {
                throw new Exception("Failed to upload image");
            }
            
            // Update with new image
            $query = "UPDATE products SET 
                      product_name = ?, 
                      category = ?, 
                      quantity = ?, 
                      price = ?, 
                      img_url = ? 
                      WHERE id = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("ssiisi", 
                $data['product_name'], 
                $data['category'], 
                $data['quantity'], 
                $data['price'], 
                $targetFile, 
                $id);
        } else {
            // Update without changing image
            $query = "UPDATE products SET 
                      product_name = ?, 
                      category = ?, 
                      quantity = ?, 
                      price = ? 
                      WHERE id = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("ssiii", 
                $data['product_name'], 
                $data['category'], 
                $data['quantity'], 
                $data['price'], 
                $id);
        }
        
        if ($stmt->execute()) {
            echo json_encode(["success" => "Product updated successfully"]);
        } else {
            throw new Exception("Failed to update product");
        }
    } catch (Exception $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
    exit();
}
?>
