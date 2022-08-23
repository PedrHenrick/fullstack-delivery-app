import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import { ThemeProvider } from 'styled-components';

import Login from './pages/Login/Login';

// import GlobalStyles from './styles/global';
// import defaultTheme from './styles/themes/default';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
    </Routes>
  );
}

export default App;
