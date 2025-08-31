import { createContext, useContext, useState, useEffect } from 'react';

const PotsContext = createContext();

// Custom hook for using the PotsContext
// eslint-disable-next-line react-refresh/only-export-components
export const usePots = () => useContext(PotsContext);

export const PotsProvider = ({ children }) => {
  const [pots, setPots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedPots = localStorage.getItem('pots');
    if (storedPots) {
      setPots(JSON.parse(storedPots));
    } else {
      initializePots();
    }
    setLoading(false);
  }, []);

  const initializePots = () => {
    const samplePots = [
      {
        id: 'p1',
        name: 'Ceramic Blue Pot',
        description: 'Aesthetic ceramic pot perfect for indoor plants.',
        price: 199,
        imageUrl: 'https://images.pexels.com/photos/4503262/pexels-photo-4503262.jpeg',
        category: 'Pots',
        stock: 30,
        sellerId: 'seller2',
        sellerName: 'Terracotta World',
        careInstructions: 'Wipe with a damp cloth, avoid hard impacts.'
      },
      {
        id: 'p2',
        name: 'Terracotta Pot - Small',
        description: 'Eco-friendly small terracotta pot for succulents.',
        price: 99,
        imageUrl: 'https://images.pexels.com/photos/4503259/pexels-photo-4503259.jpeg',
        category: 'Pots',
        stock: 50,
        sellerId: 'seller3',
        sellerName: 'Pottery Barn',
        careInstructions: 'Keep dry, handle with care.'
      }
    ];
    setPots(samplePots);
    localStorage.setItem('pots', JSON.stringify(samplePots));
  };


  const addPot = (newPot) => {
    const updatedPots = [...pots, newPot];
    setPots(updatedPots);
    localStorage.setItem('pots', JSON.stringify(updatedPots));
  };

  return (
    <PotsContext.Provider value={{ pots, loading, addPot }}>
      {children}
    </PotsContext.Provider>
  );
};