import React, { useState, useRef } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

const AddProduct = () => {
  const [products, setProducts] = useState({
    productName: "",
    category: "",
    image: null,
    quantity: "",
    price: "",
  });

  const fileInputRef = useRef(null); 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProducts({ ...products, [name]: value });
  };

  const handleFileChange = (event) => {
    setProducts({ ...products, image: event.target.files[0] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("productName", products.productName);
    formData.append("category", products.category);
    formData.append("quantity", products.quantity);
    formData.append("price", products.price);
    formData.append("image", products.image);

    axios
      .post("http://localhost/project1/backend/AddProduct.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: "Successfully Added",
          icon: "success",
          draggable: true,
        });

        
        setProducts({
          productName: "",
          category: "",
          image: null,
          quantity: "",
          price: "",
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      })
      .catch((err) => {
        console.error("Upload error", err);
      });
  };

  return (
    <div
      className="py-5"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-6 col-lg-5">
            <div className="card shadow p-4">
              <h4 className="text-center mb-4">Add Product</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <TextField
                    label="Product Name"
                    name="productName"
                    variant="standard"
                    fullWidth
                    value={products.productName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group mb-3">
                  <FormControl
                    variant="standard"
                    sx={{ m: 1, minWidth: 120, width: "100%" }}
                  >
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      id="category-select"
                      name="category"
                      value={products.category}
                      onChange={handleChange}
                      fullWidth
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Apple">Apple</MenuItem>
                      <MenuItem value="Huawei">Huawei</MenuItem>
                      <MenuItem value="Google">Google</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="form-group mb-3">
                  <label>Image Upload</label>
                  <input
                    type="file"
                    name="image"
                    className="form-control"
                    onChange={handleFileChange}
                    ref={fileInputRef} 
                  />
                </div>

                <div className="form-group d-flex gap-3 mb-3">
                  <TextField
                    label="Quantity"
                    name="quantity"
                    variant="outlined"
                    type="number"
                    value={products.quantity}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Price"
                    name="price"
                    variant="outlined"
                    type="number"
                    value={products.price}
                    onChange={handleChange}
                  />
                </div>

                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-primary px-5 w-100">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
