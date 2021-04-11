import React from 'react';
import { useSelector } from 'react-redux';
import { LoaderThreeDots } from 'src/shared/components';

const LoaderPage = () => {
  const loader = useSelector((state) => state.loader);

  if (!loader.isLoading) return null;

  return <LoaderThreeDots />;
};

export default LoaderPage;
