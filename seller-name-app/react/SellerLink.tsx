import React from 'react'
import { useProduct } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'seller-p',
  'seller-link'
] as const

interface Sellers {
  sellerName: string
}

interface Items {
  sellers: Sellers[]
}

interface Product {
  items: Items[]
}

interface ProductContext {
  product: Product | undefined
}

function SellerName() {
  const handles = useCssHandles(CSS_HANDLES)

  const contextValue: ProductContext | any = useProduct()
  return (
    <>
      <p className={handles['seller-p']}>Vendido e entregue por: <span className={handles['seller-link']}>{ contextValue.product.items[0].sellers[0].sellerName }</span></p>
    </>
  );
}

export default SellerName
