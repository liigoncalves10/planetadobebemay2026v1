import React from "react"
import styles from "./styles.css"
import ModalForm from "./ModalForm"
import ModalCupom from "./ModalCupom"
interface ModalContentProps {
    cupomName: string
    cupomValue: number
    bgPopupForm: string
    logo: string
    title: string
    text: string
    subTitle: string
    bgPopupCupon: string
    placeName: string
    placeEmail: string
    textTermos: string
    showCupom: boolean
    setShowCupom: React.Dispatch<React.SetStateAction<boolean>>
}
const ModalContent = ({ cupomName, bgPopupForm, logo, bgPopupCupon, title, subTitle, cupomValue, text, textTermos, placeName, placeEmail, showCupom, setShowCupom }: ModalContentProps) => {

    return (
        <div  className={styles.modalLeadContent}>
          {showCupom ? 
            <ModalCupom logo={logo} cupomName={cupomName} bgPopupCupon={bgPopupCupon} />
          : <ModalForm logo={logo} title={title} subTitle={subTitle} setShowCupom={setShowCupom} bgPopupForm={bgPopupForm} cupomValue={cupomValue} text={text} textTermos={textTermos} placeName={placeName} placeEmail={placeEmail} /> }
        </div>
    )
}
export default ModalContent