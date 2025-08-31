import { useLocation } from 'react-router-dom';
import PlantForm from '../../components/Forms/PlantForm';
import SeedForm from '../../components/Forms/SeedForm';
import PotForm from '../../components/Forms/PotForm';
import PlantCareForm from '../../components/Forms/PlantCareForm';

const ProductForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");

  return (
    <div className="container mt-4">
      <h2>Add Product - {type?.toUpperCase()}</h2>

      {type === "plant" && <PlantForm />}
      {type === "seed" && <SeedForm />}
      {type === "pot" && <PotForm />}
      {type === "plantcare" && <PlantCareForm />}

      {!type && <p>Please select a product type from the dropdown.</p>}
    </div>
  );
};

export default ProductForm;