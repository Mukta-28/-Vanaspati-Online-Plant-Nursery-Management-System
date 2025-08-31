import { createContext, useContext, useState, useEffect } from 'react';

const PlantCareContext = createContext();


export const usePlantCare = () => useContext(PlantCareContext);

export const PlantCareProvider = ({ children }) => {
  const [plantCareItems, setPlantCareItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('plantCareItems');
    if (stored) {
      setPlantCareItems(JSON.parse(stored));
    } else {
      initializePlantCare();
    }
    setLoading(false);
  }, []);

  const initializePlantCare = () => {
    const sampleItems = [
      {
        id: 'pc1',
        name: 'Mealybug Magic Spray for Plants',
        description: 'Natural solution to remove mealybugs from your plants.',
        price: 349,
        originalPrice: 999,
        imageUrl: 'https://images.pexels.com/photos/4503262/pexels-photo-4503262.jpeg',
        category: 'Plant Care',
        stock: 25,
        sellerId: 'seller5',
        sellerName: 'Ugaoo Care',
        careInstructions: 'Spray directly on affected areas. Repeat every 7 days.'
      },
      {
        id: 'pc2',
        name: 'Plant Food Fertilizer Green Sticks',
        description: 'All-purpose fertilizer sticks for foliage plants.',
        price: 299,
        originalPrice: 399,
        imageUrl: 'https://images.pexels.com/photos/4503259/pexels-photo-4503259.jpeg',
        category: 'Plant Care',
        stock: 40,
        sellerId: 'seller5',
        sellerName: 'Ugaoo Care',
        careInstructions: 'Insert sticks into the soil near roots. Replace every 60 days.'
      },
      {
        id: 'pc3',
        name: 'Vermicompost',
        description: 'Organic compost ideal for all types of plants.',
        price: 199,
        originalPrice: 299,
        imageUrl: 'https://images.pexels.com/photos/4503260/pexels-photo-4503260.jpeg',
        category: 'Plant Care',
        stock: 60,
        sellerId: 'seller5',
        sellerName: 'Ugaoo Care',
        careInstructions: 'Mix with soil in a 1:3 ratio. Use once every 2 weeks.'
      },
      {
        id: 'pc4',
        name: 'Cocopeat Block',
        description: 'Compressed cocopeat for improved soil aeration.',
        price: 199,
        originalPrice: 249,
        imageUrl: 'https://images.pexels.com/photos/4503261/pexels-photo-4503261.jpeg',
        category: 'Plant Care',
        stock: 35,
        sellerId: 'seller5',
        sellerName: 'Ugaoo Care',
        careInstructions: 'Soak block in water before use. Mix with potting soil.'
      }
    ];
    setPlantCareItems(sampleItems);
    localStorage.setItem('plantCareItems', JSON.stringify(sampleItems));
  };

  return (
    <PlantCareContext.Provider value={{ plantCareItems, loading }}>
      {children}
    </PlantCareContext.Provider>
  );
};
