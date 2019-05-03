import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// components
import MainRouter from './MainRouter';

const App = () => (
  <BrowserRouter>
    <MainRouter />
  </BrowserRouter>
)

export default App;
