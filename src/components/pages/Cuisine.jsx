import { useEffect, useState } from 'react';
import { Grid, CuisineCard } from '../../styled';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { REACT_API_KEY } from '../../api';

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${REACT_API_KEY}&cuisine=${name}`
    )
      .then((response) => response.json())
      .catch((error) => console.error(error));

    console.log(data);
    setCuisine(data.results);
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  return (
    <Grid>
      {cuisine.map((item) => {
        return (
          <CuisineCard key={item.id}>
            <Link to={'/recipe/' + item.id}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
            </Link>
          </CuisineCard>
        );
      })}
    </Grid>
  );
}

export default Cuisine;
