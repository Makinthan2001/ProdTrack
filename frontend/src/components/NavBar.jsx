import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="md" className="bg-body-tertiary sticky-top">
      <Container>
      <Navbar.Brand as={Link} to="/">ProdTrack</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="custom-toggle"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Products List
            </Nav.Link>
            <Nav.Link as={Link} to="/addproduct">
              Add Product
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
