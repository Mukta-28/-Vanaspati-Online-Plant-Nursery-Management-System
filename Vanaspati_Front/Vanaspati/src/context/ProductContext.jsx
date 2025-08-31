import { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();


export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  
  const fetchProducts = () => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      initializeProducts();
    }
    setLoading(false);
  };

  const initializeProducts = () => {
    const sampleProducts = [
      {
        id: '1',
        name: 'Peace Lily',
        description: 'Beautiful indoor plant that purifies air',
        price: 299,
        imageUrl: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        category: 'Indoor Plants',
        stock: 15,
        sellerId: 'seller1',
        sellerName: 'Green Thumb Nursery',
        careInstructions: 'Keep soil moist, place in indirect light, mist leaves occasionally'
      },
      {
        id: '2',
        name: 'Snake Plant',
        description: 'Low-maintenance indoor plant perfect for beginners',
        price: 249,
        imageUrl: 'https://images.pexels.com/photos/2123482/pexels-photo-2123482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        category: 'Indoor Plants',
        stock: 20,
        sellerId: 'seller1',
        sellerName: 'Green Thumb Nursery',
        careInstructions: 'Water sparingly, tolerates low light, let soil dry between waterings'
      },
      {
        id: '3',
        name: 'Monstera Deliciosa',
        description: 'Trendy tropical plant with unique split leaves',
        price: 599,
        imageUrl: 'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        category: 'Indoor Plants',
        stock: 8,
        sellerId: 'seller2',
        sellerName: 'Exotic Plant Haven',
        careInstructions: 'Medium indirect light, water when top inch of soil is dry'
      },
    ];

    setProducts(sampleProducts);
    localStorage.setItem('products', JSON.stringify(sampleProducts));
  };

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    return newProduct;
  };

  const updateProduct = (updatedProduct) => {
    const updatedProducts = products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );

    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    return updatedProduct;
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    return true;
  };

  const getProduct = (productId) => {
    return products.find(product => product.id === productId) || null;
  };

  const getProductsBySeller = (sellerId) => {
    return products.filter(product => product.sellerId === sellerId);
  };

  const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  const searchProducts = (query) => {
    const searchTerm = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  };


  const value = {
    products,
    loading,
    fetchProducts, 
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getProductsBySeller,
    getProductsByCategory,
    searchProducts
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};