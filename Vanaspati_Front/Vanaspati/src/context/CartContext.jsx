import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
   
    if (currentUser) {
      const userCart = localStorage.getItem(`cart-${currentUser.id}`);
      if (userCart) {
        setCartItems(JSON.parse(userCart));
      } else {
        setCartItems([]);
      }
    } else {
      setCartItems([]);
    }
    setLoading(false);
  }, [currentUser]);

  
  useEffect(() => {
    if (currentUser && !loading) {
      localStorage.setItem(`cart-${currentUser.id}`, JSON.stringify(cartItems));
    }
  }, [cartItems, currentUser, loading]);

  
  const addToCart = (product, quantity = 1) => {
    if (!currentUser) return false;
    
    setCartItems(prevItems => {
 
      const existingItem = prevItems.find(item => item.productId === product.id);
      
      if (existingItem) {
       
        return prevItems.map(item => 
          item.productId === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
       
        return [...prevItems, {
          productId: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity,
          sellerId: product.sellerId,
          sellerName: product.sellerName
        }];
      }
    });
    
    return true;
  };


  const removeFromCart = (productId) => {
    if (!currentUser) return false;
    
    setCartItems(prevItems => 
      prevItems.filter(item => item.productId !== productId)
    );
    
    return true;
  };

  const updateQuantity = (productId, quantity) => {
    if (!currentUser) return false;
    
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.productId === productId 
          ? { ...item, quantity } 
          : item
      )
    );
    
    return true;
  };

  
  const clearCart = () => {
    if (!currentUser) return false;
    
    setCartItems([]);
    return true;
  };

  
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

 
  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};