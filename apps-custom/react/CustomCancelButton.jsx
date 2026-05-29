import React, { useState, useEffect, memo } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import ModalCancelForm from './ModalCancelForm'

const CSS_HANDLES = [
  'cancelButtonContainer',
  'cancelButton',
  'cancelIcon',
  'modalContent',
  'modalTitle',
  'modalMessage',
  'modalActions'
]

const CustomCancelButton = memo(({
  label = "Solicitar cancelamento",
  order
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [shouldShow, setShouldShow] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!order || !order.creationDate) return

    const checkTime = () => {
      const creationDate = new Date(order.creationDate).getTime()
      const now = Date.now()
      const diffInSeconds = (now - creationDate) / 1000
      const threshold = 3602
      const isEligibleStatus = !['canceled', 'cancel-requested'].includes(order.status)

      if (diffInSeconds >= threshold && isEligibleStatus) {
        setShouldShow(true)
      } else {
        setShouldShow(false)
      }
    }

    checkTime()
    const interval = setInterval(checkTime, 10000)
    return () => clearInterval(interval)
  }, [order])

  const handleButtonClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsModalOpen(true)
  }

  if (!shouldShow) return null

  return (
    <div className={handles.cancelButtonContainer}>
      <button className={handles.cancelButton} onClick={handleButtonClick}>
        <span className={handles.cancelIcon}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </span>
        {label}
      </button>

      <ModalCancelForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orderId={order?.orderId}
        handles={handles}
      />
    </div>
  )
})

CustomCancelButton.schema = {
  title: "Botão Cancelar Customizado",
  type: "object",
  properties: {
    label: {
      title: "Label do Botão",
      type: "string",
      default: "Solicitar cancelamento"
    }
  }
}

export default CustomCancelButton
