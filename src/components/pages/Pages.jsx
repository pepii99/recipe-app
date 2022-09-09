import Home from './Home';
import { Route, Routes } from 'react-router-dom';
import Cuisine from './Cuisine';
import Recipe from './Recipe';
import Searched from './Searched';

function Pages() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cuisine/:type' element={<Cuisine />} />
      <Route path='/searched/:search' element={<Searched />} />
      <Route path='/recipe/:id' element={<Recipe />} />
    </Routes>
  );
}

export default Pages;
