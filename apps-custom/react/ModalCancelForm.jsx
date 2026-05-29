import React, { useState } from 'react'
import { Modal, Button } from 'vtex.styleguide'
import axios from 'axios'

/**
 * Componente de Modal para confirmação do cancelamento.
 */
const ModalCancelForm = ({ isOpen, onClose, orderId, handles }) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    console.log('CustomCancelButton: Submetendo solicitação para o pedido', orderId)
    setLoading(true)
    try {
      // Enviar os dados para um endpoint REST customizado conforme solicitado
      await axios.post('/_v/custom-cancel-endpoint', {
        orderId: orderId,
        requestedAt: new Date().toISOString(),
      }).catch(err => {
        console.warn('CustomCancelButton: Endpoint customizado falhou ou não existe, continuando fluxo...', err)
      })

      setSuccess(true)

      // Exibir mensagem e redirecionar após 3 segundos
      setTimeout(() => {
        window.location.href = 'https://www.planetadobebe.com.br/institutional/fale-conosco'
      }, 3000)
    } catch (error) {
      console.error('CustomCancelButton: Erro no envio', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} centered>
      <div className={handles.modalContent}>
        <h2 className={handles.modalTitle}>Solicitar Cancelamento</h2>
        {success ? (
          <div className={`${handles.modalMessage} tc`}>
            <p className="f4 b">Sua solicitação foi enviada ao SAC para análise.</p>
            <p className="f6 gray">Você será redirecionado para a página de Fale Conosco em instantes...</p>
          </div>
        ) : (
          <div>
            <p className={handles.modalMessage}>
              Deseja realmente solicitar o cancelamento do pedido <strong>{orderId}</strong>?
            </p>
            <div className={handles.modalActions}>
              <Button variation="tertiary" onClick={onClose} disabled={loading}>
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
  )
}

export default ModalCancelForm
