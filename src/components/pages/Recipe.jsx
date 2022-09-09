import { useEffect, useState } from 'react';
import { DetailWrapper, Button, Info } from '../../styled';
import { Link, useParams } from 'react-router-dom';
import { REACT_API_KEY } from '../../api';

function Recipe() {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');
  let params = useParams();

  useEffect(() => {
    fetchDetails();
  }, [params.id]);

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${REACT_API_KEY}`
    )
      .then((result) => result.json())
      .catch((error) => console.error(error));

    setDetails(data);
  };
  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          className={activeTab === 'instructions' ? 'active' : ''}
          onClick={() => setActiveTab('instructions')}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === 'ingredients' ? 'active' : ''}
          onClick={() => setActiveTab('ingredients')}
        >
          Ingredients
        </Button>
        {activeTab === 'instructions' && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}
        {activeTab === 'ingredients' && (
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

export default Recipe;
