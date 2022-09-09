import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { REACT_API_KEY } from '../../api';
import { Grid, CuisineCard } from '../../styled';
import { Link } from 'react-router-dom';

function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  let params = useParams();

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  const getSearched = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${REACT_API_KEY}&query=${name}`
    )
      .then((response) => response.json())
      .catch((error) => console.error(error));

    console.log(data);
    setSearchedRecipes(data.results);
  };

  return (
    <Grid>
      {searchedRecipes.map((element) => {
        return (
          <CuisineCard key={element.id}>
            <Link to={'/recipe/' + element.id}>
              <img src={element.image} alt={element.title} />
              <h4>{element.title}</h4>
            </Link>
          </CuisineCard>
        );
      })}
    </Grid>
  );
}

export default Searched;
