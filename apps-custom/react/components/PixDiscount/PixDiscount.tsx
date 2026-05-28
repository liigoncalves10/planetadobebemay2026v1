import React, { memo } from 'react'
import style from './PixDiscount.css';
import useProduct from 'vtex.product-context/useProduct';
import { FormattedCurrency } from 'vtex.format-currency'

interface Props {
    porcentagem?: string
}

/**
 * PixDiscount Component
 * Optimizations:
 * 1. Wrapped in React.memo to avoid unnecessary re-renders.
 * 2. Added safety checks for productContextValue.
 */
const PixDiscount: StorefrontFunctionComponent<Props> = memo(({
    porcentagem = "10"
}:Props) => {

    const productContextValue  = useProduct();
    const price = productContextValue?.selectedItem?.sellers?.[0]?.commertialOffer?.Price;

    if (!productContextValue?.selectedItem || !price) {
        return null;
    }

    const discount = Number(porcentagem) || 0;
    const PixPrice = price - (price * discount) / 100;

    return (
        <span className={style.pixComponent}>
            <span className={style.pixPriceProductPage + ' vtex-product-price-1-x-sellingPriceValue'}>
            <FormattedCurrency value={Number(PixPrice)} /> <span className={style.noPix} > no pix</span>
            </span>
        </span>
    )
}) as any

PixDiscount.schema = {
    title: 'PixDiscount',
    description: 'conf label PixDiscount',
    type: 'object',
    properties: {
        porcentagem: {
            title: 'Total Porcentagem desconto pix',
            description: 'Por mostra 10',
            type: 'string',
            default: '5'
        }
    },
}

export default PixDiscount;
