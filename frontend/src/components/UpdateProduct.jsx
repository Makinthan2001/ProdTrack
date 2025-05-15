import React, { useEffect, useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  let [updateProduct, setUpdateProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost/project1/backend/UpdateProduct.php/${id}`)
      .then((response) => setUpdateProduct(response.data));
  }, []);

  let handleChange = (event) => {
    let { name, value, type, files } = event.target;
    setUpdateProduct({
      ...updateProduct,
      [name]: type === "file" ? files[0] : value,
    });
  };

  let handleUpdate = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("product_name", updateProduct.product_name);
    formData.append("category", updateProduct.category);
    formData.append("quantity", updateProduct.quantity);
    formData.append("price", updateProduct.price);

    if (updateProduct.image instanceof File) {
      formData.append("image", updateProduct.image);
    }

    fetch(`http://localhost/project1/backend/UpdateProduct.php/${id}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Successfully Added",
          icon: "success",
          confirmButtonText: "OK",
          draggable: true,
        }).then(() => {
          navigate("/");
        });
      });
  };

  if (updateProduct !== null) {
    return (
      <div
        className="py-5"
        style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-md-6 col-lg-5">
              <div className="card shadow p-4">
                <h4 className="text-center mb-4">Update Product</h4>
                <form onSubmit={handleUpdate}>
                  <div className="form-group mb-3">
                    <TextField
                      label="Product Name"
                      name="product_name"
                      variant="standard"
                      fullWidth
                      value={updateProduct.product_name}
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
                        value={updateProduct.category}
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
                      onChange={handleChange}
                    />
                    {updateProduct.img_url && (
                      <div className="text-center mt-3">
                        <img
                          src={updateProduct.img_url}
                          alt="Current"
                          style={{
                            maxHeight: "200px",
                            maxWidth: "100%",
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="form-group d-flex gap-3 mb-3">
                    <TextField
                      label="Quantity"
                      name="quantity"
                      variant="outlined"
                      type="number"
                      value={updateProduct.quantity}
                      onChange={handleChange}
                    />
                    <TextField
                      label="Price"
                      name="price"
                      variant="outlined"
                      type="number"
                      value={updateProduct.price}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="text-center mt-4">
                    <button
                      type="submit"
                      className="btn btn-success px-5 w-100"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    <p>Loading...</p>;
  }
};

export default UpdateProduct;
