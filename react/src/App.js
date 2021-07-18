import React from 'react';
import './App.css';

import MyContextProvider from './contexts/MyContext';
import Home from './components/Home'

function App() {
  return (
    <MyContextProvider>
        <Home/>
    </MyContextProvider>
  );
}

export default App;
