import React, { memo } from 'react'
import style from './PixDiscountShelf.css'
import useProduct from 'vtex.product-context/useProduct'
import { FormattedCurrency } from 'vtex.format-currency'

interface Props {
  porcentagem?: string
}

/**
 * PixDiscountShelf Component
 * Optimizations:
 * 1. Wrapped in React.memo to avoid unnecessary re-renders in shelves.
 * 2. Removed unused useRef.
 * 3. Added safety checks for product data.
 */
const PixDiscountShelf: StorefrontFunctionComponent<Props> = memo(({
  porcentagem = "10",
}: Props) => {
  const { product } = useProduct()
  const price = product?.sku?.seller?.commertialOffer?.Price

  if (!product || !price) {
    return null
  }

  const discount = Number(porcentagem) || 0
  const PixShelfPrice = price - (price * discount) / 100

  return (
    <span
      className={`${style.pixComponent} prod${product.productId}`}
    >
      <span
        className={
          `${style.pixPrice} vtex-product-price-1-x-sellingPriceValue--summary`
        }
      >
        <FormattedCurrency value={Number(PixShelfPrice)} /> no pix
      </span>
    </span>
  )
}) as any

PixDiscountShelf.schema = {
  title: 'PixDiscount Vitrine',
  description: 'conf label PixDiscount',
  type: 'object',
  properties: {
    porcentagem: {
      title: 'Total Porcentagem desconto pix',
      description: 'Por mostra 10',
      type: 'string',
      default: '10',
    },
  },
}

export default PixDiscountShelf
