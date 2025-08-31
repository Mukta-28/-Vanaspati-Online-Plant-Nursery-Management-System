import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faSignOutAlt,
  faSearch,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const { currentUser, logout, isAdmin, isSeller, isBuyer } = useAuth();
  const { getCartItemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar expand="lg" bg="white" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <span className="fw-bold fs-4 text-success">🌿वनस्पति</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          {/* Main Navigation Links */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {!isSeller() && (
              <>
                <Nav.Link as={Link} to="/plants">
                  Plants
                </Nav.Link>
                <Nav.Link as={Link} to="/seeds">
                  Seeds
                </Nav.Link>
                <Nav.Link as={Link} to="/pots">
                  Pots & Planters
                </Nav.Link>
                <Nav.Link as={Link} to="/plantcare">
                  Plant Care
                </Nav.Link>

                <Nav.Link as={Link} to="/about">
                  AboutUs
                </Nav.Link>

                <Nav.Link as={Link} to="/contact">
                  ContactUS
                </Nav.Link>
              </>
            )}
          </Nav>

          {/* User Navigation */}
          <Nav>
            {currentUser ? (
              <>
                {/* Role-specific Dashboard Links */}
                {isAdmin() && (
                  <Nav.Link as={Link} to="/admin/dashboard">
                    Admin Dashboard
                  </Nav.Link>
                )}


                {isBuyer() && (
                  <Nav.Link as={Link} to="/cart" className="position-relative">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    {getCartItemCount() > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {getCartItemCount()}
                      </span>
                    )}
                  </Nav.Link>
                )}

                {/* User Profile Dropdown */}
                <NavDropdown
                  title={<FontAwesomeIcon icon={faUser} />}
                  id="user-dropdown"
                  align="end"
                >
                  <NavDropdown.Item disabled>
                    <small>Signed in as</small>
                    <br />
                    <strong>{currentUser.email}</strong>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />

                  {isBuyer() && (
                    <>
                      <NavDropdown.Item as={Link} to="/buyer/profile">
                        My Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/buyer/dashboard">
                        My Dashboard
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/buyer/orders">
                        My Orders
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                    </>
                  )}

                  {isSeller() && currentUser?.role === 'seller' && (
                  <>    
                    <NavDropdown.Item as={Link} to="/seller-profile">
                      My Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/seller/dashboard">
                      Dashboard
                    </NavDropdown.Item>
                   </>
                )}

                  <NavDropdown.Item onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <NavDropdown
                  title={
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="rounded-pill px-3"
                    >
                      Register
                    </Button>
                  }
                  id="register-dropdown"
                  align="end"
                >
                  <NavDropdown.Item onClick={() => navigate("/buyerSignUp")}>
                    Buyer
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/sellerSignUp")}>
                    Seller
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
