import React from 'react'
import { schema } from './schema'
import { ShareProps } from './types'

/* --- Vtex --- */
import { useCssHandles } from 'vtex.css-handles'
/* --- Styles --- */
import styles from './styles/index.css'

/* --- Handles --- */
const CSS_HANDLES = [
  'button-share-mobile-facebook',
  'button-share-mobile-twitter',
  'button-share-mobile-whatsapp',
  'button-share-mobile-pinterest',
  'button-share-mobile-email',
  'container-share',
] as const

const CustomSharePdp: React.FC<ShareProps> & { schema?: any } = ({
  emailAssunto = 'Estou compartilhando esse produto de Planeta do Bebê',
  emailMensagem = 'Aqui está o link para ter acesso direto ao produto que eu estou compartilhando:',
  whatsappText = '',
}) => {
  /* --- CSS Handles --- */
  const handles = useCssHandles(CSS_HANDLES)
  /* --- Selectors --- */
  const productUrl = window.location.href

  return (
    <div
      className={`${handles['container-share']} ${styles.buttonShareMobile}`}
    >
      <span>Compartilhe:</span>

      <a
        className={`${handles['button-share-mobile-facebook']} ${styles.buttonShareMobile}`}
        href={`https://www.facebook.com/sharer/sharer.php?u=${productUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      ></a>

      <a
        className={`${handles['button-share-mobile-twitter']} ${styles.buttonShareMobile}`}
        href={`https://twitter.com/intent/tweet?url=${productUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      ></a>

      <a
        className={`${handles['button-share-mobile-whatsapp']} ${styles.buttonShareMobile}`}
        href={`https://api.whatsapp.com/send?text=${whatsappText} ${productUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      ></a>

      <a
        className={`${handles['button-share-mobile-pinterest']} ${styles.buttonShareMobile}`}
        href={`https://br.pinterest.com/pin/create/button/?url=${productUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      ></a>

      <a
        className={`${handles['button-share-mobile-email']} ${styles.buttonShareMobile}`}
        href={`mailto:test@example.com?subject=${emailAssunto}&body=${emailMensagem} ${productUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    </div>
  )
}

/* --- Schema --- */
CustomSharePdp.schema = schema

export default CustomSharePdp
