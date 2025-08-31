import { useState, useEffect } from "react";
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ContactPage from "./pages/ContactPage";
import About from "./pages/About";

import BuyerSignUp from "./pages/BuyerSignUp";
import SellerSignUp from "./pages/SellerSignUp";
import AdminDashboard from "./pages/admin/Dashboard";
import SellerDashboard from "./pages/seller/Dashboard";
import ProductForm from "./pages/seller/ProductForm";
import BuyerDashboard from "./pages/buyer/Dashboard";
import BuyerOrders from "./pages/buyer/Orders";
import ProductDetail from "./pages/ProductDetail";
import SeedDetail from "./pages/SeedDetail";
import Seeds from "./pages/Seeds";
import Pots from "./pages/Pots";
import PotDetail from "./pages/PotDetail";
import PlantCare from "./pages/PlantCare";
import PlantCareDetail from "./pages/PlantCareDetail";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import SellerLogin from "./pages/SellerLogin";

import PlantForm from "./components/Forms/PlantForm";
import SeedForm from "./components/Forms/SeedForm";
import PotForm from "./components/Forms/PotForm";
import PlantCareForm from "./components/Forms/PlantCareForm";

import BuyerProfile from "./pages/buyer/BuyerProfile";
import BuyerProfileEdit from "./pages/buyer/BuyerProfileEdit";
import SellerProfile from "./pages/seller/SellerProfile";
import SellerProfileEdit from "./pages/seller/SellerProfileEdit";
import SellerOrderDetails from "./pages/seller/SellerOrderDetails";
import SellerEditProduct from "./pages/seller/SellerEditProduct";

// Context
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { SeedsProvider } from "./context/SeedsContext";
import { PotsProvider } from "./context/PotsContext";
import { PlantCareProvider } from "./context/PlantCareContext";

// Protected Route Component
const ProtectedRoute = ({ element, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem("user")) || null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return element;
};



function App() {
  

  return (
    <AuthProvider>
      <PlantCareProvider>
        <PotsProvider>
          <SeedsProvider>
            <ProductProvider>
              <CartProvider>
                <Router>
                  <div className="app-container">
                    <Header />
                    <Container fluid className="main-content">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/buyerSignUp" element={<BuyerSignUp />} />
                        <Route
                          path="/sellerSignUp"
                          element={<SellerSignUp />}
                        />
                        <Route path="/seller-profile" element={<SellerProfile />} />
                         <Route path="/seller-profile/edit" element={<SellerProfileEdit />} />

                        <Route path="/plants" element={<Products />} />
                        <Route
                          path="/product/:productId"
                          element={<ProductDetail />}
                        />

                        <Route path="/seeds" element={<Seeds />} />
                        <Route path="/seed/:seedId" element={<SeedDetail />} />
                        <Route path="/pots" element={<Pots />} />
                        <Route path="/pot/:potId" element={<PotDetail />} />

                        <Route path="/plantcare" element={<PlantCare />} />
                        <Route path="/plantcare/:itemId" element={<PlantCareDetail />} />
                        <Route path="/sellers-login" element={<SellerLogin />} />


                        <Route
                          path="/admin/dashboard"
                          element={
                            <ProtectedRoute
                              element={<AdminDashboard />}
                              requiredRole="admin"
                            />
                          }
                        />

                        <Route
                          path="/seller/dashboard"
                          element={
                            <ProtectedRoute
                              element={<SellerDashboard />}
                              requiredRole="seller"
                            />
                          }
                        />
                        <Route
                          path="/seller/add-product"
                          element={
                            <ProtectedRoute
                              element={<ProductForm />}
                              requiredRole="seller"
                            />
                          }
                        />
                        <Route
                          path="/seller/edit-product/:productId"
                          element={
                            <ProtectedRoute
                              element={<SellerEditProduct />}
                              requiredRole="seller"
                            />
                          }
                        />
                         
                        <Route path="/seller/orders/:id" element={<SellerOrderDetails />} />
                        {/* Buyer Routes */}
                        <Route
                          path="/buyer/dashboard"
                          element={
                            <ProtectedRoute
                              element={<BuyerDashboard />}
                              requiredRole="buyer"
                            />
                          }
                        />

                        <Route
                          path="/buyer/orders"
                          element={
                            <ProtectedRoute
                              element={<BuyerOrders />}
                              requiredRole="buyer"
                            />
                          }
                        />
                        <Route
                          path="/cart"
                          element={
                            <ProtectedRoute
                              element={<Cart />}
                              requiredRole="buyer"
                            />
                          }
                        />

                     
                         
                        <Route path="/buyer/profile" element={<BuyerProfile />} />
                        <Route path="/Edit" element={<BuyerProfileEdit />} />
                        <Route path="/about" element={<About/>} />
                        <Route path="/contact" element={<ContactPage/>} />
             
                        <Route path="*" element={<Home />} />
                      </Routes>
                    </Container>
                    <Footer />
                  </div>
                </Router>
              </CartProvider>
            </ProductProvider>
          </SeedsProvider>
        </PotsProvider>
      </PlantCareProvider>
    </AuthProvider>
  );
}

export default App;
