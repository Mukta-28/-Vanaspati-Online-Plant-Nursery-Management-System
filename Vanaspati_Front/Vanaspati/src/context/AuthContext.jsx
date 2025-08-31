// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// // eslint-disable-next-line react-refresh/only-export-components
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check if a user is stored in localStorage
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setCurrentUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   // Login function
//   const login = (userData) => {
//     // In a real app, we would call an API here
//     // For this demo, we'll just store in localStorage
//     localStorage.setItem('user', JSON.stringify(userData));
//     setCurrentUser(userData);
//     return true;
//   };

//   // Register function
//   const register = (userData) => {
//     const newUser = {
//       ...userData,
//       id: Date.now().toString(), 
//     };

//     // Store in localStorage
//     const users = JSON.parse(localStorage.getItem('users')) || [];
//     users.push(newUser);
//     localStorage.setItem('users', JSON.stringify(users));

//     // Log the user in
//     return login(newUser);
//   };

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem('user');
//     setCurrentUser(null);
//   };

//   // Check if a user is an admin
//   const isAdmin = () => {
//     return currentUser?.role === 'admin';
//   };

//   // Check if a user is a seller
//   const isSeller = () => {
//     return currentUser?.role === 'seller';
//   };

//   // Check if a user is a buyer
//   const isBuyer = () => {
//     return currentUser?.role === 'buyer';
//   };

//   const value = {
//     currentUser,
//     login,
//     register,
//     logout,
//     isAdmin,
//     isSeller,
//     isBuyer,
//     loading
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };


// import { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios'; // ✅ Make sure axios is installed

// const AuthContext = createContext();

// // eslint-disable-next-line react-refresh/only-export-components
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check if a user is stored in localStorage
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setCurrentUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);


//   const login = (userData) => {
//   try {
//     localStorage.setItem('user', JSON.stringify(userData));
//     setUser(userData);
//     return true;
//   } catch {
//     return false;
//   }
// };


//   const register = async (userData) => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/seller/signup', {
//         name: userData.name,
//         email: userData.email,
//         password: userData.password,
//         mobile: userData.mobile, 
//         address: userData.address,
//         role: 'Seller' 
//       });

//       const registeredUser = response.data;
//       localStorage.setItem('user', JSON.stringify(registeredUser));
//       setCurrentUser(registeredUser);
//       return true;
//     } catch (error) {
//       console.error("Registration failed:", error.response?.data || error.message);
//       return false;
//     }
//   };

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem('user');
//     setCurrentUser(null);
//   };

//   // Check if a user is an admin
//   const isAdmin = () => {
//     return currentUser?.role === 'admin';
//   };

//   // Check if a user is a seller
//   const isSeller = () => {
//     return currentUser?.role === 'seller';
//   };

//   // Check if a user is a buyer
//   const isBuyer = () => {
//     return currentUser?.role === 'buyer';
//   };

//   const value = {
//     currentUser,
//     login,
//     register,
//     logout,
//     isAdmin,
//     isSeller,
//     isBuyer,
//     loading
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };



// import { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios'; 
// const AuthContext = createContext();


// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setCurrentUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);


//   const login = (userData) => {
//     try {

//       const normalizedUser = {
//         ...userData,
//         role: userData.role?.toLowerCase()
//       };

//       localStorage.setItem('user', JSON.stringify(normalizedUser));
//       setCurrentUser(normalizedUser);
//       return true;
//     } catch (err) {
//       console.error("Login failed:", err);
//       return false;
//     }
//   };


//   const register = async (userData) => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/auth/register', {
//         name: userData.name,
//         email: userData.email,
//         password: userData.password,
//         mobile: userData.mobile,
//         address: userData.address,
//         role: userData.role 
//       });

//       const registeredUser = {
//         id: response.data.userId,
//         name: response.data.userName,
//         email: response.data.userEmail,
//         role: response.data.userRole?.toLowerCase(),
//         token: response.data.accessToken
//       };

//       localStorage.setItem('user', JSON.stringify(registeredUser));
//       setCurrentUser(registeredUser);
//       return true;
//     } catch (error) {
//       console.error("Registration failed:", error.response?.data || error.message);
//       return false;
//     }
//   };


//   const logout = () => {
//     localStorage.removeItem('user');
//     setCurrentUser(null);
//   };


//   const isAdmin = () => currentUser?.role === 'admin';
//   const isSeller = () => currentUser?.role === 'seller';
//   const isBuyer = () => currentUser?.role === 'buyer';

//   const value = {
//     currentUser,
//     login,
//     register,
//     logout,
//     isAdmin,
//     isSeller,
//     isBuyer,
//     loading
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Hook to use Auth
export const useAuth = () => useContext(AuthContext);

// Provider
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on startup
  useEffect(() => {
    const storedUser = localStorage.getItem('users');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login
  const login = (userData) => {
  try {
    const normalizedUser = {
      ...userData,
      role: userData.role?.toLowerCase()
    };
    localStorage.setItem('user', JSON.stringify(normalizedUser));
    setCurrentUser(normalizedUser);
    return true;
  } catch (err) {
    console.error("Login failed:", err);
    return false;
  }
};

  // Register (if used)
  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        mobile: userData.mobile,
        address: userData.address,
        role: userData.role
      });

      const registeredUser = {
        id: response.data.userId,
        name: response.data.userName,
        email: response.data.userEmail,
        role: response.data.userRole?.toLowerCase(),
        token: response.data.accessToken
      };

      localStorage.setItem('user', JSON.stringify(registeredUser));
      setCurrentUser(registeredUser);
      return true;
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      return false;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  // Role helpers
  const isBuyer = () => currentUser?.role === 'buyer';
  const isSeller = () => currentUser?.role === 'seller';
  const isAdmin = () => currentUser?.role === 'admin';

  const value = {
    currentUser,
    login,
    register,
    logout,
    isAdmin,
    isSeller,
    isBuyer,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
