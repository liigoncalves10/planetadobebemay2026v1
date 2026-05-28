import React, { useState } from 'react'
import { useProduct } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'
import GiftInfoModal from './GiftInfoModal'
import '../../css/custom-pdp.css'

const CSS_HANDLES = ['giftTagContainer', 'giftTagIcon', 'giftTagText'] as const

const GiftTag: React.FC = () => {
  const handles = useCssHandles(CSS_HANDLES)
  const productContext = useProduct()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const product = productContext?.product

  const gifts = product?.items?.reduce((acc: any[], item: any) => {
    if (item.benefits && item.benefits.length > 0) {
      item.benefits.forEach((benefit: any) => {
        if (benefit.items && benefit.items.length > 0) {
          benefit.items.forEach((giftItem: any) => {
            acc.push(giftItem)
          })
        }
      })
    }
    return acc
  }, [])

  if (!gifts || gifts.length === 0) return null

  return (
    <>
      <div
        className={handles.giftTagContainer}
        onClick={() => setIsModalOpen(true)}
        style={{ cursor: 'pointer' }}
      >
        <span className={handles.giftTagIcon}>🎁</span>
        <span className={handles.giftTagText}>
          {gifts.length === 1 ? '+1 brinde' : `+ ${gifts.length} brindes`}
        </span>
      </div>
      <GiftInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        gifts={gifts}
      />
    </>
  )
}

export default GiftTag
