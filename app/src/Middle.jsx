import React, { useState } from 'react';
import App from './App';
import HomePage from './pages/Dispaly/HomePage/HomePage';

function Middle() {
  const [isHomePage, setIsHomePage] = useState(false); // State to track if on HomePage

  // Function to toggle the HomePage state
  const handleNavigateToHomePage = () => {
    setIsHomePage(true);
  };

  const handleNavigateToApp = () => {
    setIsHomePage(false);
  };

  return (
    <>
      {/* Render App or HomePage based on isHomePage state */}
      {isHomePage ? (
        <HomePage handleNavigateToApp={handleNavigateToApp} /> // Pass the function to navigate back
      ) : (
        <App handleNavigateToHomePage={handleNavigateToHomePage} /> // Pass the function to navigate to HomePage
      )}
    </>
  );
}

export default Middle;
