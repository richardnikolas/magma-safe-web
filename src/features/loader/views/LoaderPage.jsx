import React from 'react';
import { useSelector } from 'react-redux';
import MagmaLoader from './MagmaLoader';

const LoaderPage = () => {
  const loader = useSelector((state) => state.loader);

  if (!loader.isLoading) return null;

  return <MagmaLoader />;
};

export default LoaderPage;
