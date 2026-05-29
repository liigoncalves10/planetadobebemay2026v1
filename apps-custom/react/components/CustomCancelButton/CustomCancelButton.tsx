import React, { useState, useEffect, memo } from 'react'
import { Modal, Button } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import axios from 'axios'
import style from './CustomCancelButton.css'

const CSS_HANDLES = [
  'cancelButtonContainer',
  'cancelButton',
  'cancelIcon',
  'modalContent',
  'modalTitle',
  'modalMessage',
  'modalActions'
] as const

const CustomCancelButton: any = memo(({
  label = "Solicitar cancelamento",
  order
}: any) => {
  const handles = useCssHandles(CSS_HANDLES)
  const [shouldShow, setShouldShow] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    console.log('CustomCancelButton: Order received', order?.orderId)
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

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsModalOpen(true)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await axios.post('/_v/custom-cancel-endpoint', {
        orderId: order?.orderId,
        requestedAt: new Date().toISOString(),
      }).catch(() => {})

      setSuccess(true)
      setTimeout(() => {
        window.location.href = 'https://www.planetadobebe.com.br/institutional/fale-conosco'
      }, 3000)
    } catch (error) {
      console.error('CustomCancelButton error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!shouldShow) return null

  return (
    <div className={`${handles.cancelButtonContainer} ${style.cancelButtonContainer}`}>
      <button className={`${handles.cancelButton} ${style.cancelButton}`} onClick={handleButtonClick}>
        <span className={`${handles.cancelIcon} ${style.cancelIcon}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </span>
        {label}
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} centered>
        <div className={`${handles.modalContent} ${style.modalContent}`}>
          <h2 className={`${handles.modalTitle} ${style.modalTitle}`}>Solicitar Cancelamento</h2>
          {success ? (
            <div className={`${handles.modalMessage} ${style.modalMessage} tc`}>
              <p className="f4 b">Sua solicitação foi enviada ao SAC para análise.</p>
              <p className="f6 gray">Você será redirecionado para a página de Fale Conosco em instantes...</p>
            </div>
          ) : (
            <div>
              <p className={`${handles.modalMessage} ${style.modalMessage}`}>
                Deseja realmente solicitar o cancelamento do pedido <strong>{order?.orderId}</strong>?
              </p>
              <div className={`${handles.modalActions} ${style.modalActions}`}>
                <Button variation="tertiary" onClick={() => setIsModalOpen(false)} disabled={loading}>
                  Voltar
                </Button>
                <Button variation="danger" onClick={handleSubmit} isLoading={loading}>
                  Confirmar Solicitação
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
})

export default CustomCancelButton
