import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setNavigateRef } from '../config/navigateRef';

const HomePage = () => {
  const navigate = useNavigate();
  setNavigateRef(navigate)
  return (
    <>
      <h1>Accueil</h1>
    </>
  );
};

export default HomePage;
