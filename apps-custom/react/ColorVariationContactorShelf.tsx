import React from 'react';
import { useProduct } from 'vtex.product-context';

/**
 * ColorVariationContactorShelf Component
 * Optimization: Wrapped in React.memo to prevent unnecessary re-renders in product shelves.
 */
const ColorVariationContactorShelf = React.memo(() => {
  const productContext = useProduct();
  const skuSpecifications = productContext?.product?.skuSpecifications?.[0];

  if (!skuSpecifications || skuSpecifications.field?.name !== "Cor") {
    return (
      <div style={{minHeight: "21px"}}></div>
    )
  }

  const values = skuSpecifications?.values;
  const numColors = values?.length;

  if (!values || numColors === undefined || numColors === 0) {
    return null;
  }

  const message =
    numColors === 1 ? `Disponível em 1 cor` : `Disponível em ${numColors} cores`;

  return (
    <div style={{
        display: "flex",
        justifyContent: "center",
        fontSize: "14px",
        textAlign: "center",
        color: "#727273",
        minHeight: "21px",
        fontWeight: 600
      }}>
      {message}
    </div>
  )
});

export default ColorVariationContactorShelf;
