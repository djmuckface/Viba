'use client';

import Header from '../Header';
import { useState } from 'react';

export default function HeaderWrapper() {
  const [showFavorites, setShowFavorites] = useState(false);

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleStartOver = () => {
    // Reset app state here
  };

  return (
    <Header 
      onShowFavorites={handleShowFavorites} 
      onStartOver={handleStartOver}
    />
  );
} 