import React from "react";
import useFetch from "./useFetch";
import "./AllProduct.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ThreeDot } from "react-loading-indicators";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Huawei = () => {
  let navigate = useNavigate();
  let { products, error, isLoading, setProducts } = useFetch(
    "http://localhost/project1/backend/Huawei.php"
  );

  let handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          
          // inka than fetch use panni irukkan
          axios
            .delete(`http://localhost/project1/backend/DeleteProduct.php?id=${id}`)
            .then(() => {
              let newProductList = products.filter((products) => {
                return products.id !== id;
              });
              setProducts(newProductList);

              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your product has been deleted.",
                icon: "success",
              });
            })
            .catch((err) => {
              swalWithBootstrapButtons.fire({
                title: "Error",
                text: "Could not delete the product.",
                icon: "error",
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your product is safe :)",
            icon: "error",
          });
        }
      });
  };

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <ThreeDot
          variant="brick-stack"
          color="#3939f7"
          size="large"
          text="Loading"
          textColor="#4343f4"
        />
      </div>
    );
  } else {
    return (
      <div className="product-container container py-3">
        <h3 className="text-center mb-4">Huawei Products</h3>
        {products.length === 0 && !error && (
          <p className="text-center text-muted">No products available</p>
        )}

        {products.length !== 0 && (
          <div className="row">
            {products.map((products) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                key={products.id}
              >
                <div className="card h-100 shadow-sm custom-card">
                  <img
                    src={products.img_url}
                    alt={products.product_name}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h6 className="card-title">{products.product_name}</h6>
                    <p className="card-text mb-1">
                      <strong>Price:</strong> $ {products.price}
                    </p>
                    <p className="card-text mb-2">
                      <strong>Quantity:</strong> {products.quantity}
                    </p>
                    <div className="d-flex justify-content-between">
                      <button className=" edit-button btn btn-warning btn-sm" onClick={() => {
                          navigate(`/updateproduct/${products.id}`);
                        }}>
                        <FaEdit />
                      </button>
                      <button className=" delete-button btn btn-danger btn-sm" onClick={() => {
                          return handleDelete(products.id);
                        }}>
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {error && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "40vh" }}
          >
            <p className="text-danger fs-5">{error}</p>
          </div>
        )}
      </div>
    );
  }
};

export default Huawei;
