import React from "react"
import styles from "./styles.css"
interface ModalCupomProps {
    cupomName: string
    bgPopupCupon: string
    logo: string
}
const ModalCupom = ({ cupomName, bgPopupCupon, logo }: ModalCupomProps) => {
    const validCupomName = cupomName ?? "PRIMEIRACOMPRA"
    const handleCopyToClipBoard = () => {
        navigator.clipboard.writeText(validCupomName)
        alert("O CUPOM FOI COPIADO!")
    }
    return (
        <div className={styles.modalLeadShowCupom} style={{backgroundImage: `url(${bgPopupCupon})`}}>
          <div className={styles.modalLeadShowCupomContent}>
              <img src={logo} alt="pop-up-logo" className={styles.modalLeadLogo} />
              <h6 className={styles.modalLeadShowCupomTitle}> OBRIGADO PELO SEU CADASTRO</h6>
              <p className={styles.modalLeadShowCupomSubTitle}> APROVEITE O NOSSO SITE <br />
                10% DE DESCONTO PARA <br/>
                PRIMEIRA COMPRA
              </p>
              <strong className={styles.modalLeadShowCupomSubTitle}> SEU CUPOM </strong>
              <button type="button" onClick={() => handleCopyToClipBoard()} className={styles.copyButton}>{validCupomName}</button>
              <h4 className={styles.condition}> *Adicione o código no<br /> seu carrinho de compras </h4>
          </div>
        </div>
    )
}
export default ModalCupom