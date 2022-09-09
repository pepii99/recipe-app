import { useEffect, useState } from 'react';
import { REACT_API_KEY } from '../api';
import { Gradient, Wrapper, Card } from '../styled';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from 'react-router-dom';

function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const check = localStorage.getItem('veggie');
    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      const result = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${REACT_API_KEY}&number=10&tags=vegetarian`
      )
        .then((response) => response.json())
        .catch((error) => console.log(error));

      localStorage.setItem('veggie', JSON.stringify(result.recipes));
      setVeggie(result.recipes);
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Veggie picks</h3>
        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: 'free',
            gap: '5rem',
          }}
        >
          {veggie.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={'/recipe/' + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

export default Veggie;
