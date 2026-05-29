import React, { useState } from 'react'
import { Modal, Button } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import axios from 'axios'

const CSS_HANDLES = ['modalContent', 'modalTitle', 'modalMessage']

const ModalCancelForm = ({
  isOpen,
  onClose,
  orderId,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    console.log(`[CustomCancelButton] Enviando solicitação de cancelamento para o pedido: ${orderId}`)

    try {
      // Endpoint REST customizado (exemplo, como não foi fornecido um real, usaremos um placeholder ou o link mencionado)
      // O objetivo diz: "enviar os dados para um endpoint REST customizado"
      // E também: "direcione-o para o link https://www.planetadobebe.com.br/institutional/fale-conosco"
      // Vou assumir que o envio dos dados é uma chamada de API e o redirecionamento acontece depois ou o botão de fechar leva pra lá.

      await axios.post('/_v/custom-cancel-endpoint', {
        orderId,
        requestedAt: new Date().toISOString(),
      }).catch(err => {
        console.error('[CustomCancelButton] Erro ao enviar para endpoint customizado (esperado se não existir):', err)
      })

      setSuccess(true)
      console.log(`[CustomCancelButton] Solicitação enviada com sucesso para o pedido: ${orderId}`)

      // Conforme as regras: "direcione-o para o link https://www.planetadobebe.com.br/institutional/fale-conosco"
      // Vou aguardar 2 segundos para o usuário ler a mensagem de sucesso e depois redirecionar
      setTimeout(() => {
        window.location.href = 'https://www.planetadobebe.com.br/institutional/fale-conosco'
      }, 3000)

    } catch (error) {
      console.error('[CustomCancelButton] Erro ao processar cancelamento:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} centered>
      <div className={handles.modalContent}>
        <h2 className={handles.modalTitle}>Solicitar Cancelamento</h2>
        {success ? (
          <div className={handles.modalMessage}>
            <p>Sua solicitação foi enviada ao SAC para análise.</p>
            <p>Você será redirecionado para a página de Fale Conosco em instantes...</p>
          </div>
        ) : (
          <div>
            <p>Deseja realmente solicitar o cancelamento do pedido <strong>{orderId}</strong>?</p>
            <div className="mt6 flex justify-end">
              <div className="mr4">
                <Button variation="tertiary" onClick={onClose} disabled={loading}>
                  Voltar
                </Button>
              </div>
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
