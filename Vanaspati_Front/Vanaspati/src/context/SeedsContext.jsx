import { createContext, useContext, useState, useEffect } from 'react';

const SeedsContext = createContext();



export const useSeeds = () => useContext(SeedsContext);

export const SeedsProvider = ({ children }) => {
  const [seeds, setSeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    fetchSeeds();
    setLoading(false);
  }, []);

  
  const initializeSeeds = () => {
    const sampleSeeds = [
      {
        id: 's1',
        name: 'Bitter Gourd Seeds',
        description: 'High-quality bitter gourd seeds for kitchen gardening',
        price: 59,
        imageUrl: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
        category: 'Seeds',
        stock: 50,
        sellerId: 'seller3',
        sellerName: 'Urbano Seeds Co.',
        careInstructions: 'Sow directly in warm soil, water regularly, needs sunlight.',
      },
      {
        id: 's2',
        name: 'Tomato Hybrid Seeds',
        description: 'Juicy, large hybrid tomatoes ideal for pots and gardens',
        price: 79,
        imageUrl: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
        category: 'Seeds',
        stock: 60,
        sellerId: 'seller3',
        sellerName: 'Urbano Seeds Co.',
        careInstructions: 'Plant in seed trays first, transplant when 3 inches tall.',
      },
      {
        id: 's3',
        name: 'Sunflower Seeds',
        description: 'Bright sunflowers to enhance your garden aesthetics',
        price: 49,
        imageUrl: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
        category: 'Seeds',
        stock: 100,
        sellerId: 'seller4',
        sellerName: 'Green Harvest',
        careInstructions: 'Full sun, sow directly in soil, water moderately.',
      },
    ];

    setSeeds(sampleSeeds);
    localStorage.setItem('seeds', JSON.stringify(sampleSeeds));
  };

 
  const fetchSeeds = () => {
    const storedSeeds = localStorage.getItem('seeds');
    if (storedSeeds) {
      setSeeds(JSON.parse(storedSeeds));
    } else {
      initializeSeeds();
    }
  };

  
  const addSeed = (newSeed) => {
    const seedToAdd = {
      ...newSeed,
      id: `s${Date.now()}`,
    };
    const updatedSeeds = [...seeds, seedToAdd];
    setSeeds(updatedSeeds);
    localStorage.setItem('seeds', JSON.stringify(updatedSeeds));
    return seedToAdd;
  };


  const updateSeed = (updatedSeed) => {
    const updatedSeeds = seeds.map((seed) =>
      seed.id === updatedSeed.id ? updatedSeed : seed
    );
    setSeeds(updatedSeeds);
    localStorage.setItem('seeds', JSON.stringify(updatedSeeds));
    return updatedSeed;
  };

  
  const getSeed = (seedId) => {
    return seeds.find((seed) => seed.id === seedId);
  };

  const value = {
    seeds,
    loading,
    addSeed,
    updateSeed,
    getSeed,
    fetchSeeds, 
  };

  return (
    <SeedsContext.Provider value={value}>
      {children}
    </SeedsContext.Provider>
  );
};