import React from 'react';
import FiltersProduct from '../../components/FiltersProduct';
import ProductListClient from '../../components/ProductListClient';

function ClientProducts(props) {
  return (
    <div>
      <h1>Day la danh sach dung useContext,reducer </h1>
      <FiltersProduct />
      <ProductListClient />
    </div>
  );
}

export default ClientProducts;
