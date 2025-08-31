import React from "react";
import { Link } from "react-router-dom"; // Make sure react-router-dom is installed
import { Button } from "react-bootstrap"; // Make sure react-bootstrap is installed

const SellerProfile = () => {
  const seller = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="container mt-5">
      <div
        className="bg-white p-4 rounded-3 shadow-sm"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <h4 className="mb-4 fw-bold text-success">Seller Profile</h4>

        <p><strong>Name:</strong> {seller.ownerName || "N/A"}</p>
        <p><strong>Nursery Name:</strong> {seller.nurseryName || "N/A"}</p>
        <p><strong>Email:</strong> {seller.email || "N/A"}</p>
        <p><strong>Phone:</strong> {seller.contactNumber || "N/A"}</p>
        <p><strong>GSTIN:</strong> {seller.gstin || "N/A"}</p>
      </div>

      {/* Update Button */}
      <div className="text-center mt-3">
        <Link to="/seller-profile/edit">
          <Button variant="outline-success">Update Profile</Button>
        </Link>
      </div>
    </div>
  );
};

export default SellerProfile;
