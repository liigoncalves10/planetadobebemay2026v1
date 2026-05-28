import React from 'react'
import { Modal } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'

interface Props {
  isOpen: boolean
  onClose: () => void
  gifts: any[]
}

const CSS_HANDLES = [
  'modalContainer',
  'giftInfoWrapper',
  'giftItem',
  'giftImageContainer',
  'giftImage',
  'giftTitle',
  'giftName',
  'giftDescription',
] as const

const GiftInfoModal: React.FC<Props> = ({ isOpen, onClose, gifts }) => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={handles.modalContainer}>
        <h2 className={handles.giftTitle}>
          {gifts.length > 1 ? '🎁 Brindes desta compra' : '🎁 Brinde desta compra'}
        </h2>
        <div className={handles.giftInfoWrapper}>
          {gifts.map((gift, index) => (
            <div key={`${gift.id}-${index}`} className={handles.giftItem}>
              {gift.imageUrl && (
                <div className={handles.giftImageContainer}>
                  <img
                    src={gift.imageUrl}
                    alt={gift.name}
                    className={handles.giftImage}
                  />
                </div>
              )}
              <div className={handles.giftName}>{gift.name}</div>
              {gift.description && (
                <div className={handles.giftDescription}>{gift.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default GiftInfoModal
