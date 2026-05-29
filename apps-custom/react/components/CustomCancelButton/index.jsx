import React, { useState, useEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import ModalCancelForm from './ModalCancelForm'
import './styles.css'

// Definição dos handles CSS para customização
const CSS_HANDLES = ['cancelButtonContainer', 'cancelButton', 'cancelIcon']

/**
 * Componente CustomCancelButton
 * Exibe um botão de cancelamento customizado após 60 minutos e 2 segundos da criação do pedido.
 */
const CustomCancelButton = ({
  label = "Solicitar cancelamento",
  order
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const [shouldShow, setShouldShow] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Log para debug conforme solicitado
  console.log('[CustomCancelButton] Renderizando componente para o pedido:', order?.orderId)

  useEffect(() => {
    if (!order || !order.creationDate) {
      console.log('[CustomCancelButton] Dados do pedido não encontrados ou incompletos.')
      return
    }

    const checkTime = () => {
      const creationDate = new Date(order.creationDate).getTime()
      const now = new Date().getTime()
      const diffInSeconds = (now - creationDate) / 1000

      // Regra: Se passou mais de 60 minutos e 2 segundos (3602 segundos)
      const threshold = 60 * 60 + 2

      console.log(`[CustomCancelButton] Pedido: ${order.orderId} | Status: ${order.status} | Segundos desde criação: ${diffInSeconds.toFixed(0)} | Threshold: ${threshold}`)

      // Regra de elegibilidade: Não deve aparecer para pedidos já cancelados ou em estados finais que não permitem cancelamento
      // Normalmente pedidos 'canceled', 'invoiced' (se a regra de negócio impedir) não devem mostrar o botão.
      const isEligibleStatus = !['canceled', 'cancel-requested'].includes(order.status)

      if (diffInSeconds >= threshold && isEligibleStatus) {
        setShouldShow(true)
        console.log(`[CustomCancelButton] Exibindo botão para o pedido: ${order.orderId}`)
      } else {
        setShouldShow(false)
      }
    }

    // Executa imediatamente
    checkTime()

    // Intervalo para verificar a cada minuto se deve aparecer
    const interval = setInterval(checkTime, 30000)

    return () => clearInterval(interval)
  }, [order])

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsModalOpen(true)
  }

  // Se não atingiu o tempo, não exibe nada
  if (!shouldShow) return null

  return (
    <div className={handles.cancelButtonContainer}>
      <button className={handles.cancelButton} onClick={handleButtonClick}>
        <span className={handles.cancelIcon}>
          {/* Ícone de alerta (SVG simples) */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </span>
        {label}
      </button>

      <ModalCancelForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orderId={order.orderId}
      />
    </div>
  )
}

// Schema para permitir edição no Site Editor se necessário
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
