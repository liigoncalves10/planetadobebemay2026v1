import React from 'react'
import styles from './styles.css'
const ModalImageContainer = () => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={styles.modalLeadImageContainer}
    >
      <img
        className={styles.modalLeadImage}
        alt="Controle remoto"
        src="/banners/banner-home-mobile-two.png"
      />
    </div>
  )
}
export default ModalImageContainer
