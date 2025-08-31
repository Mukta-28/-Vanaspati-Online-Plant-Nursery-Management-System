// import React, { useState } from "react";
// import { Form, Button, InputGroup, Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";

// const SellerSignUp = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     shopName: "",
//     email: "",
//     mobile: "",
//     gstNumber: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     const [formData, setFormData] = useState({
//       name: "",
//       shopName: "",
//       email: "",
//       mobile: "",
//       gstNumber: "",
//       password: "",
//       confirmPassword: "",
//       address: "",
//     });


//     const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
//     const phoneRegex = /^[0-9]{10}$/;
//     const gstRegex = /^[0-9A-Z]{15}$/;

//     if (!name || !shopName || !email || !mobile || !gstNumber || !password || !confirmPassword) {
//       setError("Please fill in all the fields.");
//       return;
//     }

//     if (!emailRegex.test(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     if (!phoneRegex.test(mobile)) {
//       setError("Please enter a 10-digit mobile number.");
//       return;
//     }

//     if (!gstRegex.test(gstNumber)) {
//       setError("Please enter a valid 15-digit GST number.");
//       return;
//     }

//     if (password.length !== 6) {
//       setError("Password must be exactly 6 characters.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     const newUser = {
//       name,
//       shopName,
//       email,
//       mobile,
//       gstNumber,
//       password,
//       address, // include address here
//       role: "seller", // optional, only if backend uses this
//     };

//     try {
//       const response = await axios.post("http://localhost:8080/api/sellers/signup", newUser);
//       if (response.status === 201 || response.status === 200) {
//         alert("Registration successful! Please login.");
//         navigate("/login");
//       } else {
//         setError("Registration failed. Please try again.");
//       }
//     } catch (err) {
//       console.error("Registration error:", err.response?.data || err.message);
//       setError(err.response?.data?.message || "Something went wrong during registration.");
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center">
//       <div className="bg-white p-5 rounded-3 shadow" style={{ width: "100%", maxWidth: "500px" }}>
//         <h2 className="text-center mb-2 fw-bold">Join as a Seller</h2>

//         {error && <Alert variant="danger">{error}</Alert>}

//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Nursery Name</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter your nursery name"
//               name="shopName"
//               value={formData.shopName}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Enter email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Contact Number</Form.Label>
//             <Form.Control
//               type="tel"
//               placeholder="Enter contact number"
//               name="mobile"
//               value={formData.mobile}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>GSTIN</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter 15-digit GSTIN"
//               name="gstNumber"
//               value={formData.gstNumber}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Address</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter address"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//             />
//           </Form.Group>


//           <Form.Group className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <InputGroup>
//               <Form.Control
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </InputGroup>
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Confirm Password</Form.Label>
//             <Form.Control
//               type={showPassword ? "text" : "password"}
//               placeholder="Re-enter password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           <div className="d-grid">
//             <Button type="submit" variant="success">
//               Create Seller Account
//             </Button>
//           </div>

//           <div className="text-center mt-3">
//             Already have an account?{" "}
//             <span
//               className="text-primary"
//               style={{ cursor: "pointer", textDecoration: "underline" }}
//               onClick={() => navigate("/login")}
//             >
//               Login here
//             </span>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default SellerSignUp;



import React, { useState } from "react";
import { Form, Button, InputGroup, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const SellerSignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    shopName: "",
    email: "",
    mobile: "",
    gstNumber: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const {
      name,
      shopName,
      email,
      mobile,
      gstNumber,
      password,
      confirmPassword,
      address,
    } = formData;

    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const gstRegex = /^[0-9A-Z]{15}$/;

    if (!name || !shopName || !email || !mobile || !gstNumber || !password || !confirmPassword || !address) {
      setError("Please fill in all the fields.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!phoneRegex.test(mobile)) {
      setError("Please enter a 10-digit mobile number.");
      return;
    }

    if (!gstRegex.test(gstNumber)) {
      setError("Please enter a valid 15-digit GST number.");
      return;
    }

    if (password.length !== 6) {
      setError("Password must be exactly 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const newUser = {
      name,
      shopName,
      email,
      mobile,
      gstNumber,
      password,
      address,
      role: "seller", 
    };

    try {
      const response = await axios.post("http://localhost:8080/api/sellers/signup", newUser);
      if (response.status === 201 || response.status === 200) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong during registration.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="bg-white p-5 rounded-3 shadow" style={{ width: "100%", maxWidth: "500px" }}>
        <h2 className="text-center mb-2 fw-bold">Join as a Seller</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nursery Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your nursery name"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter contact number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>GSTIN</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter 15-digit GSTIN"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-grid">
            <Button type="submit" variant="success">
              Create Seller Account
            </Button>
          </div>

          <div className="text-center mt-3">
            Already have an account?{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SellerSignUp;

